import { GoogleGenerativeAI } from "@google/generative-ai";
import type { GenerativeModel, GenerateContentResult } from "@google/generative-ai";

const rawApiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

export const getCleanApiKey = (): string => {
  let key = typeof rawApiKey === 'string' ? rawApiKey.trim() : "";
  // Auto-strip surrounding single or double quotes
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1).trim();
  }
  return key;
};

const apiKey = getCleanApiKey();

export const hasGeminiApiKey = (): boolean => {
  return apiKey.length > 0;
};

async function generateContentWithTimeout(
  model: GenerativeModel,
  content: Parameters<GenerativeModel['generateContent']>[0],
  timeoutMs: number = 6000
): Promise<GenerateContentResult> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Timeout: Request took longer than ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([
      model.generateContent(content),
      timeoutPromise
    ]);
  } finally {
    clearTimeout(timeoutId);
  }
}

export const checkApiKeyStatus = async (): Promise<{ status: 'valid' | 'invalid' | 'expired' | 'error'; message: string }> => {
  if (!hasGeminiApiKey()) {
    return { status: 'invalid', message: 'API key is not configured (missing in environment).' };
  }

  const rawTrimmed = rawApiKey.trim();
  const hasQuotes = (rawApiKey.startsWith('"') && rawApiKey.endsWith('"')) || (rawApiKey.startsWith("'") && rawApiKey.endsWith("'"));

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await generateContentWithTimeout(model, "test", 6000);
    if (result.response) {
      return { 
        status: 'valid', 
        message: `API key is valid. Key length: ${apiKey.length}. Starts with: '${apiKey.substring(0, 5)}', ends with: '${apiKey.substring(apiKey.length - 3)}'` 
      };
    }
    return { status: 'error', message: 'Empty response received from API.' };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    const lowerMsg = msg.toLowerCase();
    
    let advice = "";
    if (hasQuotes) {
      advice = " (System detected quotes around your key in the config. Please remove them.)";
    } else if (rawApiKey.length !== rawTrimmed.length) {
      advice = " (System detected leading/trailing spaces in your key. Please clean them.)";
    }

    const debugInfo = ` [Key length: ${apiKey.length}. Starts with: '${apiKey.substring(0, 4)}', ends with: '${apiKey.substring(apiKey.length - 4)}'${advice}]`;

    if (lowerMsg.includes('api_key_invalid') || lowerMsg.includes('not valid') || lowerMsg.includes('invalid') || lowerMsg.includes('api key not found')) {
      return { status: 'invalid', message: `API key is invalid.${debugInfo}` };
    }
    if (lowerMsg.includes('expired') || lowerMsg.includes('expiration')) {
      return { status: 'expired', message: `API key is expired.${debugInfo}` };
    }
    if (lowerMsg.includes('400') || lowerMsg.includes('403') || lowerMsg.includes('401')) {
      return { status: 'invalid', message: `API Authorization failed: ${msg}.${debugInfo}` };
    }
    return { status: 'error', message: `${msg}.${debugInfo}` };
  }
};

/**
 * Compresses an image file on the client side using a canvas.
 * Reduces dimension to max 800px and saves as JPEG with 70% quality.
 * This shrinks typical mobile photos from ~5MB to ~80KB, ensuring fast upload speeds.
 */
function compressImage(file: File, maxDimension: number = 800, quality: number = 0.7): Promise<{ base64Data: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error("Could not get 2d context from canvas"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        const base64Str = dataUrl.split(',')[1];
        resolve({ base64Data: base64Str, mimeType: 'image/jpeg' });
      };
      img.onerror = () => reject(new Error("Failed to load image for compression"));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });
}

/**
 * Checks if the provided image shows a bare human foot or bare human foot sole.
 * Uses a robust rotation of gemini multimodal models to aggregate daily quotas and provide redundancy.
 */
export const verifyIsFootImage = async (imageFile: File): Promise<boolean> => {
  if (!hasGeminiApiKey()) {
    throw new Error("Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  // Compress and convert File to base64
  const { base64Data, mimeType } = await compressImage(imageFile, 800, 0.7);

  const prompt = "Analyze this image. You must determine if it contains a human foot or human foot sole (this can be a real photo, a drawing, or a stylized illustration of a human foot/sole). Respond with 'yes' if there is a human foot, foot sole, or foot silhouette/illustration present. Respond with 'no' if there is no human foot or foot sole present at all (for example, if the image shows only a logo, a laptop, a face, a hand, animal, abstract chart/map, or other objects without a foot). Reply with exactly 'yes' or 'no' in lowercase, and nothing else.";

  const modelsToTry = [
    "gemini-2.5-flash-lite",
    "gemini-3.1-flash-lite",
    "gemini-2.5-flash"
  ];

  let lastError: unknown = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`Attempting foot verification with model: ${modelName}`);
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: { temperature: 0 }
      });

      // Run with a 6-second timeout to prevent sequential hangs
      const result = await generateContentWithTimeout(model, [
        prompt,
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType
          }
        }
      ], 6000);

      const text = result.response.text().trim().toLowerCase();
      console.log(`Gemini ${modelName} Verification Response:`, text);
      return text.includes('yes');
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error(`Gemini verification failed with model ${modelName}:`, errMsg);
      lastError = err;
      // Continue loop to try next model
    }
  }

  // If we exhaust all models, throw the last error encountered
  throw lastError || new Error("All Gemini models failed during image verification.");
};
