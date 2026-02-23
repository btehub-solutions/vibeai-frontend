// ═══════════════════════════════════════════════════════════════════════
// AI Provider — OpenAI API integration with rich conversation context
// ═══════════════════════════════════════════════════════════════════════

import OpenAI from 'openai';
import { ChatMessage } from './types';

let openaiClient: OpenAI | null = null;

function getClient(): OpenAI {
  if (openaiClient) return openaiClient;
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || localStorage.getItem('OPENAI_API_KEY') || '';
  
  if (!apiKey) throw new Error('Missing AI API Key.');
  openaiClient = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
  return openaiClient;
}

export async function generateAIResponse(
  systemPrompt: string,
  userMessage: string,
  conversationHistory: ChatMessage[] = [],
  options: { maxTokens?: number; temperature?: number; model?: string } = {}
): Promise<string> {
  const client = getClient();
  const model = options.model || 'gpt-4o';

  // Build OpenAI messages array for maximum intelligence context
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt }
  ];

  // Include recent history
  const recentHistory = conversationHistory.slice(-15);
  for (const msg of recentHistory) {
    messages.push({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    });
  }

  messages.push({ role: 'user', content: userMessage });

  try {
    const response = await client.chat.completions.create({
      model,
      messages,
      max_tokens: options.maxTokens || 4096,
      temperature: options.temperature || 0.7,
    });
    return response.choices[0]?.message?.content || 'I apologize, I couldn\'t generate a response. Please try again.';
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
  const client = getClient();
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt + '\n\nIMPORTANT: Return ONLY a raw, perfectly valid JSON object string. Do not use Markdown code blocks (like ```json). Just the JSON object itself.' },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.2,
      max_tokens: 1024,
      response_format: { type: 'json_object' }
    });
    
    const raw = response.choices[0]?.message?.content || '';
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return fallback;
    return JSON.parse(jsonMatch[0]) as T;
  } catch (err) {
    console.error('[VibeAI Provider] Structured Response Error:', err);
    return fallback;
  }
}

export function isAIAvailable(): boolean {
  return true;
}
