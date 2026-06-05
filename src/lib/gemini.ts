import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const hasGeminiApiKey = (): boolean => {
  return typeof apiKey === 'string' && apiKey.trim().length > 0;
};

export const checkApiKeyStatus = async (): Promise<{ status: 'valid' | 'invalid' | 'expired' | 'error'; message: string }> => {
  if (!hasGeminiApiKey()) {
    return { status: 'invalid', message: 'API key is not configured.' };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent("test");
    if (result.response) {
      return { status: 'valid', message: 'API key is valid.' };
    }
    return { status: 'error', message: 'Empty response received from API.' };
  } catch (error: any) {
    const msg = error?.message || String(error);
    const lowerMsg = msg.toLowerCase();
    
    if (lowerMsg.includes('api_key_invalid') || lowerMsg.includes('not valid') || lowerMsg.includes('invalid') || lowerMsg.includes('api key not found')) {
      return { status: 'invalid', message: 'API key is invalid.' };
    }
    if (lowerMsg.includes('expired') || lowerMsg.includes('expiration')) {
      return { status: 'expired', message: 'API key is expired.' };
    }
    if (lowerMsg.includes('400') || lowerMsg.includes('403')) {
      return { status: 'invalid', message: `API Authorization failed: ${msg}` };
    }
    return { status: 'error', message: msg };
  }
};

/**
 * Checks if the provided image shows a bare human foot or bare human foot sole.
 * Uses gemini-2.5-flash multimodal classification.
 */
export const verifyIsFootImage = async (imageFile: File): Promise<boolean> => {
  if (!hasGeminiApiKey()) {
    throw new Error("Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Convert File to base64
  const base64Data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const res = reader.result as string;
      const base64Str = res.split(',')[1];
      resolve(base64Str);
    };
    reader.onerror = reject;
    reader.readAsDataURL(imageFile);
  });

  const prompt = "Analyze this image. You must determine if it contains a human foot or human foot sole (this can be a real photo, a drawing, or a stylized illustration of a human foot/sole). Respond with 'yes' if there is a human foot, foot sole, or foot silhouette/illustration present. Respond with 'no' if there is no human foot or foot sole present at all (for example, if the image shows only a logo, a laptop, a face, a hand, animal, abstract chart/map, or other objects without a foot). Reply with exactly 'yes' or 'no' in lowercase, and nothing else.";

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: base64Data,
        mimeType: imageFile.type
      }
    }
  ]);

  const text = result.response.text().trim().toLowerCase();
  console.log("Gemini Verification Response:", text);
  return text.includes('yes');
};
