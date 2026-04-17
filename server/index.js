import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://vibeaihub.vercel.app'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY || '');

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'VibeAI Backend is running' });
});

app.post('/api/generate-lesson', async (req, res) => {
  const { courseTitle, lessonTitle, objectives } = req.body;

  if (!courseTitle || !lessonTitle) {
    return res.status(400).json({ error: 'Missing courseTitle or lessonTitle' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
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
Write professionally, without extra conversational padding. Output the markdown content directly starting with a # H1 title.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ content: text });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ error: 'Failed to generate lesson content' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
