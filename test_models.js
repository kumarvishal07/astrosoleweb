import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

// Read API key from .env file
const envFile = fs.readFileSync(".env", "utf8");
const match = envFile.match(/VITE_GEMINI_API_KEY\s*=\s*(.*)/);
let apiKey = match ? match[1].trim() : "";
if ((apiKey.startsWith('"') && apiKey.endsWith('"')) || (apiKey.startsWith("'") && apiKey.endsWith("'"))) {
  apiKey = apiKey.slice(1, -1).trim();
}

console.log("Using API Key:", apiKey.substring(0, 8) + "..." + apiKey.substring(apiKey.length - 4));

const genAI = new GoogleGenerativeAI(apiKey);

const modelsToTry = [
  "gemini-2.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-2.5-flash"
];

// Load sample.png as base64
const imageBuffer = fs.readFileSync("src/assets/sample.png");
const base64Data = imageBuffer.toString("base64");
const mimeType = "image/png";

const prompt = "Analyze this image. You must determine if it contains a human foot or human foot sole. Respond with 'yes' or 'no' in lowercase.";

async function testWithTimeout(model, content, timeoutMs) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`TIMEOUT: Request took longer than ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([
      model.generateContent(content),
      timeoutPromise
    ]);
    return result;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function testModels() {
  for (const modelName of modelsToTry) {
    const start = Date.now();
    try {
      console.log(`Testing model: ${modelName} with 5s timeout...`);
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: { temperature: 0 }
      });
      const result = await testWithTimeout(model, [
        prompt,
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType
          }
        }
      ], 5000); // 5 second timeout

      const text = result.response.text().trim().toLowerCase();
      const duration = Date.now() - start;
      console.log(`Result: SUCCESS | Duration: ${duration}ms | Response: "${text}"`);
    } catch (err) {
      const duration = Date.now() - start;
      console.log(`Result: FAILED  | Duration: ${duration}ms | Error: ${err.message || err}`);
    }
  }
}

testModels();
