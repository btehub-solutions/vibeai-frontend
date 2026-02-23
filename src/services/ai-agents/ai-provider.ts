// ═══════════════════════════════════════════════════════════════════════
// AI Provider Service — Connects to AI backend (Gemini/OpenAI)
// Environment-variable driven, error-safe, streaming-ready
// ═══════════════════════════════════════════════════════════════════════

import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from './types';

// ─── Provider Singleton ──────────────────────────────────────────────

let genAIClient: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (genAIClient) return genAIClient;
  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY 
    || localStorage.getItem('GEMINI_API_KEY')
    || '';
  
  if (!apiKey) {
    throw new Error(
      'Missing AI API Key. Set VITE_GEMINI_API_KEY in .env or GEMINI_API_KEY in localStorage.'
    );
  }
  
  genAIClient = new GoogleGenAI({ apiKey });
  return genAIClient;
}

// ─── Generate Response ───────────────────────────────────────────────

export async function generateAIResponse(
  systemPrompt: string,
  userMessage: string,
  conversationHistory: ChatMessage[] = [],
  options: {
    maxTokens?: number;
    temperature?: number;
    model?: string;
  } = {}
): Promise<string> {
  const client = getClient();
  const model = options.model || 'gemini-2.5-flash';
  
  // Build conversation context
  const contextMessages = conversationHistory
    .slice(-10) // Keep last 10 messages for context
    .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
    .join('\n\n');
  
  const fullPrompt = `${systemPrompt}

${contextMessages ? `CONVERSATION HISTORY:\n${contextMessages}\n\n` : ''}User: ${userMessage}

Respond thoughtfully and helpfully:`;

  try {
    const response = await client.models.generateContent({
      model,
      contents: fullPrompt,
      config: {
        maxOutputTokens: options.maxTokens || 2048,
        temperature: options.temperature || 0.7,
      },
    });
    
    return response.text || 'I apologize, I wasn\'t able to generate a response. Please try again.';
  } catch (error) {
    console.error('[VibeAI Provider] Generation error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Invalid API key. Please check your VITE_GEMINI_API_KEY.');
      }
      if (error.message.includes('quota') || error.message.includes('rate')) {
        throw new Error('API rate limit reached. Please wait a moment and try again.');
      }
    }
    
    throw new Error('Failed to generate AI response. Please try again.');
  }
}

// ─── Generate Structured Response (JSON) ─────────────────────────────

export async function generateStructuredResponse<T>(
  systemPrompt: string,
  userMessage: string,
  fallback: T
): Promise<T> {
  try {
    const raw = await generateAIResponse(systemPrompt, userMessage, [], {
      temperature: 0.3, // Lower temperature for structured output
      maxTokens: 512,
    });
    
    // Extract JSON from response
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return fallback;
    
    return JSON.parse(jsonMatch[0]) as T;
  } catch {
    return fallback;
  }
}

// ─── Stream Response (for future use) ────────────────────────────────

export async function* streamAIResponse(
  systemPrompt: string,
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): AsyncGenerator<string, void, unknown> {
  // For now, yield the full response at once
  // This can be upgraded to true streaming when the Gemini SDK supports it better
  const response = await generateAIResponse(
    systemPrompt, 
    userMessage, 
    conversationHistory
  );
  
  // Simulate streaming by yielding chunks
  const words = response.split(' ');
  let chunk = '';
  
  for (let i = 0; i < words.length; i++) {
    chunk += (i > 0 ? ' ' : '') + words[i];
    
    if (chunk.length >= 20 || i === words.length - 1) {
      yield chunk;
      chunk = '';
    }
  }
}

// ─── Check API Availability ──────────────────────────────────────────

export function isAIAvailable(): boolean {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY 
    || localStorage.getItem('GEMINI_API_KEY')
    || '';
  return !!apiKey;
}
