import { GoogleGenAI } from '@google/genai';

let ai: GoogleGenAI | null = null;

export const getGenAIClient = () => {
  if (ai) return ai;

  // Uses the user's provided VITE_GEMINI_API_KEY environment variable. 
  // It will fall back to localStorage if they add it in via some quick UI later (future-proofing)
  const key = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('GEMINI_API_KEY');
  
  if (!key) {
    throw new Error("Missing Gemini API Key. Please add VITE_GEMINI_API_KEY to your .env or set GEMINI_API_KEY in localStorage.");
  }

  ai = new GoogleGenAI({ apiKey: key });
  return ai;
};

export const generateLessonContent = async (courseTitle: string, lessonTitle: string, objectives?: string[]): Promise<string> => {
  try {
    const client = getGenAIClient();
    
    const prompt = `You are a professional technical instructor creating course content for a popular modern AI learning platform called VibeAI. 
Write a detailed, comprehensive, and engaging lesson in Markdown format.

Course Title: ${courseTitle}
Lesson Topic: ${lessonTitle}
${objectives && objectives.length > 0 ? `Learning Objectives:\n- ${objectives.join('\n- ')}\n` : ''}

The lesson should include:
1. An engaging overview/introduction to the topic
2. Detailed and clear explanations of core concepts with examples
3. Practical applications or real-world scenarios
4. A brief summary to conclude

Format the text beautifully using markdown headers (#, ##, ###), bullet points, bolding for emphasis, and code blocks if any technical examples are required.
Write professionally, without extra conversational padding (do NOT say "Here is your lesson"). Output the markdown content directly starting with a # H1 title.`;
    
    const response = await client.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });

    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Failed to generate AI lesson:", error);
    throw error;
  }
};
