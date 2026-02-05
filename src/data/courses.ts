
import { BookOpen, Calendar, Rocket, Lightbulb, Palette, Database } from "lucide-react";

export interface Course {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  progress: number;
  lessons: number;
  completedLessons: number;
  duration: string;
  category: string;
  image?: string;
  chapters?: {
    title: string;
    lessons: { title: string; duration: string; completed?: boolean }[];
  }[];
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Introduction to Large Language Models",
    description: "Understand the fundamentals of LLMs, how they work, and their real-world applications.",
    longDescription: "This comprehensive course takes you on a journey through the world of Large Language Models. You'll learn the history of LLMs, the transformer architecture, and how models like GPT-4 are trained. We'll also cover ethical considerations, bias, and the future of generative AI.",
    progress: 65,
    lessons: 12,
    completedLessons: 8,
    duration: "4 hours",
    category: "Fundamentals",
    chapters: [
      {
        title: "Module 1: The Basics",
        lessons: [
          { title: "What is Generative AI?", duration: "15 min", completed: true },
          { title: "History of NLP", duration: "20 min", completed: true },
          { title: "The Transformer Architecture", duration: "30 min", completed: true },
        ]
      },
      {
        title: "Module 2: How LLMs Work",
        lessons: [
          { title: "Training vs. Fine-tuning", duration: "25 min", completed: true },
          { title: "Tokenization Explained", duration: "15 min", completed: true },
          { title: "Attention Mechanisms", duration: "35 min", completed: false },
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Prompt Engineering Fundamentals",
    description: "Master the art of crafting effective prompts to get the best results from AI systems.",
    longDescription: "Prompt engineering is the key to unlocking the full potential of AI. In this course, you will learn diverse prompting techniques including zero-shot, few-shot, and chain-of-thought prompting. By the end, you'll be able to optimize prompts for text generation, coding, and creative writing.",
    progress: 40,
    lessons: 10,
    completedLessons: 4,
    duration: "3 hours",
    category: "Skills",
  },
  {
    id: 3,
    title: "AI for Business Applications",
    description: "Learn how to implement AI solutions in business contexts for maximum impact.",
    progress: 20,
    lessons: 15,
    completedLessons: 3,
    duration: "5 hours",
    category: "Business",
  },
  {
    id: 4,
    title: "Understanding Neural Networks",
    description: "A deep dive into the architecture and mathematics behind neural networks.",
    progress: 0,
    lessons: 8,
    completedLessons: 0,
    duration: "3 hours",
    category: "Fundamentals",
  },
  {
    id: 5,
    title: "AI Image Generation Masterclass",
    description: "Create stunning visuals using AI tools like Midjourney and DALL-E.",
    progress: 0,
    lessons: 14,
    completedLessons: 0,
    duration: "4.5 hours",
    category: "Creative",
  },
  {
    id: 6,
    title: "RAG Systems and Vector Databases",
    description: "Build intelligent retrieval systems that combine AI with your own data.",
    progress: 0,
    lessons: 11,
    completedLessons: 0,
    duration: "4 hours",
    category: "Advanced",
  },
];

export const categories = ["All", "Fundamentals", "Skills", "Business", "Creative", "Advanced"];
