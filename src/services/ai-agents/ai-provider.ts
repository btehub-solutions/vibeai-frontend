// ═══════════════════════════════════════════════════════════════════════
// AI Provider — Gemini API integration with rich conversation context
// ═══════════════════════════════════════════════════════════════════════

import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from './types';

let genAIClient: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (genAIClient) return genAIClient;
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('GEMINI_API_KEY') || '';
  if (!apiKey) throw new Error('Missing AI API Key. Set VITE_GEMINI_API_KEY in .env.');
  genAIClient = new GoogleGenAI({ apiKey });
  return genAIClient;
}

export async function generateAIResponse(
  systemPrompt: string,
  userMessage: string,
  conversationHistory: ChatMessage[] = [],
  options: { maxTokens?: number; temperature?: number; model?: string } = {}
): Promise<string> {
  const client = getClient();
  const model = options.model || 'gemini-2.5-flash';

  // Build rich conversation context — include more history for better context
  const recentHistory = conversationHistory.slice(-12);
  const contextMessages = recentHistory
    .map(msg => `[${msg.role === 'user' ? 'LEARNER' : 'VIBEAI'}]: ${msg.content}`)
    .join('\n\n');

  const fullPrompt = contextMessages
    ? `${systemPrompt}\n\n--- CONVERSATION SO FAR ---\n${contextMessages}\n\n--- NEW MESSAGE ---\n[LEARNER]: ${userMessage}\n\n[VIBEAI]:`
    : `${systemPrompt}\n\n[LEARNER]: ${userMessage}\n\n[VIBEAI]:`;

  try {
    const response = await client.models.generateContent({
      model,
      contents: fullPrompt,
      config: {
        maxOutputTokens: options.maxTokens || 4096,
        temperature: options.temperature || 0.7,
      },
    });
    return response.text || 'I apologize, I couldn\'t generate a response. Please try again.';
  } catch (error) {
    console.error('[VibeAI Provider] Error:', error);
    if (error instanceof Error) {
      throw new Error(`AI API Error: ${error.message}`);
    }
    throw new Error('AI response failed with an unknown error.');
  }
}

export async function generateStructuredResponse<T>(
  systemPrompt: string,
  userMessage: string,
  fallback: T
): Promise<T> {
  try {
    const raw = await generateAIResponse(systemPrompt, userMessage, [], { temperature: 0.2, maxTokens: 256 });
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return fallback;
    return JSON.parse(jsonMatch[0]) as T;
  } catch {
    return fallback;
  }
}

export function isAIAvailable(): boolean {
  return !!(import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('GEMINI_API_KEY'));
}
