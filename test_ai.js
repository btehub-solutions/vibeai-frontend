import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });
async function test() {
  try {
    const res = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Hello',
      config: {
        maxOutputTokens: 256,
        temperature: 0.7,
      }
    });
    console.log(res.text);
  } catch (e) {
    console.error("ERROR:", e);
  }
}
test();
