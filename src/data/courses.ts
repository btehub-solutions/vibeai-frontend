
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
    chapters: [
      {
        title: "Module 1: Prompt Basics",
        lessons: [
          { title: "Introduction to Prompt Engineering", duration: "12 min", completed: true },
          { title: "Anatomy of a Good Prompt", duration: "18 min", completed: true },
          { title: "Common Prompting Mistakes", duration: "15 min", completed: true },
        ]
      },
      {
        title: "Module 2: Advanced Techniques",
        lessons: [
          { title: "Zero-Shot Prompting", duration: "20 min", completed: true },
          { title: "Few-Shot Learning", duration: "25 min", completed: false },
          { title: "Chain-of-Thought Prompting", duration: "30 min", completed: false },
        ]
      },
      {
        title: "Module 3: Practical Applications",
        lessons: [
          { title: "Prompts for Code Generation", duration: "22 min", completed: false },
          { title: "Creative Writing Prompts", duration: "18 min", completed: false },
          { title: "Data Analysis with Prompts", duration: "20 min", completed: false },
          { title: "Debugging and Optimization", duration: "25 min", completed: false },
        ]
      }
    ]
  },
  {
    id: 3,
    title: "AI for Business Applications",
    description: "Learn how to implement AI solutions in business contexts for maximum impact.",
    longDescription: "Transform your business with AI! This course covers practical AI implementation strategies, from automating workflows to enhancing customer experiences. Learn how to identify AI opportunities, build business cases, and deploy AI solutions that deliver measurable ROI.",
    progress: 20,
    lessons: 15,
    completedLessons: 3,
    duration: "5 hours",
    category: "Business",
    chapters: [
      {
        title: "Module 1: AI Strategy",
        lessons: [
          { title: "AI Landscape for Business", duration: "20 min", completed: true },
          { title: "Identifying AI Opportunities", duration: "25 min", completed: true },
          { title: "Building an AI Business Case", duration: "22 min", completed: true },
        ]
      },
      {
        title: "Module 2: Customer Experience",
        lessons: [
          { title: "AI-Powered Chatbots", duration: "28 min", completed: false },
          { title: "Personalization at Scale", duration: "24 min", completed: false },
          { title: "Sentiment Analysis", duration: "20 min", completed: false },
          { title: "Customer Service Automation", duration: "26 min", completed: false },
        ]
      },
      {
        title: "Module 3: Operations & Analytics",
        lessons: [
          { title: "Process Automation with AI", duration: "30 min", completed: false },
          { title: "Predictive Analytics", duration: "28 min", completed: false },
          { title: "AI for Decision Making", duration: "22 min", completed: false },
        ]
      },
      {
        title: "Module 4: Implementation",
        lessons: [
          { title: "Choosing the Right AI Tools", duration: "18 min", completed: false },
          { title: "Integration Strategies", duration: "25 min", completed: false },
          { title: "Measuring AI ROI", duration: "20 min", completed: false },
          { title: "Scaling AI Solutions", duration: "22 min", completed: false },
          { title: "Ethics and Compliance", duration: "24 min", completed: false },
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Understanding Neural Networks",
    description: "A deep dive into the architecture and mathematics behind neural networks.",
    longDescription: "Unlock the mathematical foundations of AI. This course provides a comprehensive understanding of neural network architectures, from perceptrons to deep learning. You'll learn the calculus behind backpropagation, activation functions, and optimization algorithms that power modern AI.",
    progress: 0,
    lessons: 8,
    completedLessons: 0,
    duration: "3 hours",
    category: "Fundamentals",
    chapters: [
      {
        title: "Module 1: Foundations",
        lessons: [
          { title: "Introduction to Neural Networks", duration: "18 min", completed: false },
          { title: "The Perceptron Model", duration: "22 min", completed: false },
          { title: "Activation Functions", duration: "20 min", completed: false },
        ]
      },
      {
        title: "Module 2: Deep Learning",
        lessons: [
          { title: "Feedforward Networks", duration: "25 min", completed: false },
          { title: "Backpropagation Explained", duration: "30 min", completed: false },
          { title: "Gradient Descent Optimization", duration: "28 min", completed: false },
        ]
      },
      {
        title: "Module 3: Advanced Architectures",
        lessons: [
          { title: "Convolutional Neural Networks", duration: "26 min", completed: false },
          { title: "Recurrent Neural Networks", duration: "24 min", completed: false },
        ]
      }
    ]
  },
  {
    id: 5,
    title: "AI Image Generation Masterclass",
    description: "Create stunning visuals using AI tools like Midjourney and DALL-E.",
    longDescription: "Become an AI artist! Master the leading image generation tools including Midjourney, DALL-E, and Stable Diffusion. Learn advanced prompting techniques for creating photorealistic images, artistic styles, and commercial-grade visuals. Perfect for designers, marketers, and creative professionals.",
    progress: 0,
    lessons: 14,
    completedLessons: 0,
    duration: "4.5 hours",
    category: "Creative",
    chapters: [
      {
        title: "Module 1: Getting Started",
        lessons: [
          { title: "Introduction to AI Art", duration: "15 min", completed: false },
          { title: "Overview of Image Generation Tools", duration: "20 min", completed: false },
          { title: "Setting Up Your Workspace", duration: "12 min", completed: false },
        ]
      },
      {
        title: "Module 2: Midjourney Mastery",
        lessons: [
          { title: "Midjourney Basics", duration: "18 min", completed: false },
          { title: "Advanced Prompting Techniques", duration: "25 min", completed: false },
          { title: "Style References and Parameters", duration: "22 min", completed: false },
          { title: "Creating Consistent Characters", duration: "28 min", completed: false },
        ]
      },
      {
        title: "Module 3: DALL-E & Stable Diffusion",
        lessons: [
          { title: "DALL-E 3 Deep Dive", duration: "20 min", completed: false },
          { title: "Stable Diffusion Fundamentals", duration: "24 min", completed: false },
          { title: "ControlNet and Advanced Control", duration: "26 min", completed: false },
        ]
      },
      {
        title: "Module 4: Professional Applications",
        lessons: [
          { title: "Commercial Use and Licensing", duration: "18 min", completed: false },
          { title: "Creating Marketing Materials", duration: "22 min", completed: false },
          { title: "Building a Portfolio", duration: "20 min", completed: false },
          { title: "Monetizing AI Art", duration: "24 min", completed: false },
        ]
      }
    ]
  },
  {
    id: 6,
    title: "RAG Systems and Vector Databases",
    description: "Build intelligent retrieval systems that combine AI with your own data.",
    longDescription: "Master Retrieval-Augmented Generation (RAG) to build AI systems that can access and reason over your own data. Learn about vector databases, embeddings, and semantic search. Build production-ready chatbots and knowledge assistants that provide accurate, source-backed responses.",
    progress: 0,
    lessons: 11,
    completedLessons: 0,
    duration: "4 hours",
    category: "Advanced",
    chapters: [
      {
        title: "Module 1: RAG Fundamentals",
        lessons: [
          { title: "What is RAG?", duration: "16 min", completed: false },
          { title: "Understanding Embeddings", duration: "24 min", completed: false },
          { title: "Vector Similarity Search", duration: "22 min", completed: false },
        ]
      },
      {
        title: "Module 2: Vector Databases",
        lessons: [
          { title: "Introduction to Vector Databases", duration: "20 min", completed: false },
          { title: "Pinecone, Weaviate, and Chroma", duration: "26 min", completed: false },
          { title: "Indexing Strategies", duration: "24 min", completed: false },
        ]
      },
      {
        title: "Module 3: Building RAG Systems",
        lessons: [
          { title: "Document Processing Pipeline", duration: "28 min", completed: false },
          { title: "Chunking Strategies", duration: "22 min", completed: false },
          { title: "Retrieval Optimization", duration: "20 min", completed: false },
        ]
      },
      {
        title: "Module 4: Production Deployment",
        lessons: [
          { title: "Building a Knowledge Assistant", duration: "30 min", completed: false },
          { title: "Scaling and Performance", duration: "24 min", completed: false },
        ]
      }
    ]
  },
];

export const categories = ["All", "Fundamentals", "Skills", "Business", "Creative", "Advanced"];
