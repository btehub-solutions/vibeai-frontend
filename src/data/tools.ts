
import { Bot, Image, Video, Code, Search, Mic, FileText, Github } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface Tool {
  id: number;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  trending: boolean;
  rating: number;
  link: string;
  icon?: LucideIcon;
  isInternal?: boolean;
  features?: string[];
  pricing?: string;
  useCases?: string[];
  pros?: string[];
  cons?: string[];
  bestFor?: string;
  gettingStarted?: string[];
}

export const tools: Tool[] = [
  { 
    id: 1, 
    name: "ChatGPT", 
    category: "Conversational AI", 
    description: "OpenAI's advanced language model for conversation, writing, analysis, and creative tasks.", 
    longDescription: "ChatGPT by OpenAI is one of the most capable AI models available. It can assist with writing, coding, reasoning, and creative projects. The latest models, like GPT-4o, offer multimodal capabilities.",
    trending: true, 
    rating: 4.9, 
    link: "https://chat.openai.com",
    features: ["Natural conversational ability", "Code generation", "Data analysis", "Image understanding"],
    pricing: "Free / Plus ($20/mo)",
    useCases: [
      "Write and debug code across multiple languages",
      "Analyze data and create visualizations",
      "Generate creative content and marketing copy",
      "Understand and describe images"
    ],
    pros: [
      "Extremely versatile and capable",
      "Multimodal (text, images, voice)",
      "Large knowledge base",
      "Regular updates and improvements"
    ],
    cons: [
      "Can be expensive for heavy use",
      "Knowledge cutoff date",
      "Occasional hallucinations"
    ],
    bestFor: "General-purpose AI assistance across writing, coding, analysis, and creative tasks",
    gettingStarted: [
      "Sign up at chat.openai.com",
      "Start with simple questions to understand capabilities",
      "Use clear, specific prompts for best results",
      "Explore GPT-4 for advanced reasoning (Plus subscription)"
    ]
  },
  { 
    id: 2, 
    name: "Claude", 
    category: "Conversational AI", 
    description: "Anthropic's AI assistant known for nuanced, thoughtful responses and long-context analysis.", 
    longDescription: "Claude 3 is a family of models from Anthropic. It excels at complex reasoning, coding, and handling very large amounts of text (context window).",
    trending: true, 
    rating: 4.8, 
    link: "https://claude.ai",
    features: ["Large context window (200k+ tokens)", "Nuanced writing", "Safe and steerable"],
    pricing: "Free / Pro ($20/mo)"
  },
  { 
    id: 3, 
    name: "Midjourney", 
    category: "Image Generation", 
    description: "Create stunning visuals from text descriptions. Industry-leading image quality.", 
    longDescription: "Midjourney is an independent research lab capable of producing widespread, high-quality images from text descriptions. It operates primarily through Discord.",
    trending: false, 
    rating: 4.7, 
    link: "https://www.midjourney.com",
    features: ["Photorealistic images", "Artistic styles", "Discord-based interface"],
    pricing: "Subscription (starts at $10/mo)"
  },
  { 
    id: 4, 
    name: "Runway ML", 
    category: "Video Generation", 
    description: "Generate and edit videos using AI. Revolutionary creative tool for motion.", 
    longDescription: "Runway is an applied AI research company shaping the next era of art, entertainment and human creativity. Their tools allow you to generate and edit video with text prompts.",
    trending: true, 
    rating: 4.6, 
    link: "https://runwayml.com",
    features: ["Text-to-video", "Image-to-video", "Video painting"],
    pricing: "Free / Standard ($12/mo)"
  },
  { 
    id: 5, 
    name: "Cursor", 
    category: "Code Assistant", 
    description: "AI-powered code editor that helps you write, understand, and refactor code faster.", 
    longDescription: "Cursor is a fork of VS Code with AI baked into the core. It allows you to chat with your codebase, generate code, and fix bugs seamlessly.",
    trending: true, 
    rating: 4.8, 
    link: "https://cursor.sh",
    features: ["Codebase chat", "Smart autocomplete", "VS Code compatible"],
    pricing: "Free / Pro ($20/mo)"
  },
  { 
    id: 6, 
    name: "Perplexity", 
    category: "Research", 
    description: "AI-powered search engine that provides cited, comprehensive answers to complex questions.", 
    longDescription: "Perplexity AI is a conversational search engine that answers queries using natural language predictive text. It cites its sources, making it a powerful research tool.",
    trending: false, 
    rating: 4.7, 
    link: "https://www.perplexity.ai",
    features: ["Real-time search", "Source citations", "Pro search with GPT-4/Claude"],
    pricing: "Free / Pro ($20/mo)"
  },
  { 
    id: 7, 
    name: "ElevenLabs", 
    category: "Voice AI", 
    description: "Generate realistic voiceovers and clone voices with remarkable accuracy.", 
    longDescription: "ElevenLabs offers the most realistic and versatile AI speech software. It brings the most compelling, rich and lifelike voices to creators and publishers.",
    trending: false, 
    rating: 4.6, 
    link: "https://elevenlabs.io",
    features: ["Voice cloning", "Text-to-speech", "Dubbing"],
    pricing: "Free / Starter ($5/mo)"
  },
  { 
    id: 8, 
    name: "Notion AI", 
    category: "Productivity", 
    description: "AI-powered writing, summarization, and task management integrated into Notion.", 
    longDescription: "Notion AI is an AI assistant connected directly to your notes and docs. It can summarize meetings, generate text, and help brainstorm ideas.",
    trending: false, 
    rating: 4.5, 
    link: "https://www.notion.so/product/ai",
    features: ["Summarization", "Writing assistance", "Q&A on your docs"],
    pricing: "Add-on ($10/mo)"
  },
  { 
    id: 9, 
    name: "GitHub Copilot", 
    category: "Code Assistant", 
    description: "AI pair programmer that suggests code completions in real-time.", 
    longDescription: "GitHub Copilot uses OpenAI Codex to suggest code and entire functions in real-time, right from your editor.",
    trending: true, 
    rating: 4.7, 
    link: "https://github.com/features/copilot",
    features: ["Code completion", "Chat in IDE", "Pull request summaries"],
    pricing: "Individual ($10/mo)"
  },
];

export const categories = ["All", "Conversational AI", "Image Generation", "Video Generation", "Code Assistant", "Research", "Voice AI", "Productivity"];
