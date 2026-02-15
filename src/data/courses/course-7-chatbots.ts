import { Course } from "../course-types";

export const course7: Course = {
  id: 7,
  title: "AI Chatbots: From Rule-Based to Intelligent Agents",
  description: "Build sophisticated chatbots from scratch using no-code tools and AI platforms.",
  longDescription: "Master chatbot development from fundamentals to advanced AI-powered conversational agents. Learn rule-based systems, NLP-powered bots, no-code builders, custom knowledge training, and deployment strategies.",
  progress: 0,
  lessons: 26,
  completedLessons: 0,
  duration: "9 hours",
  category: "Business",
  prerequisites: ["NLP Mastery"],
  learningOutcomes: [
    "Build chatbots with no-code platforms",
    "Train bots on custom knowledge",
    "Deploy chatbots across channels",
    "Optimize conversation flows"
  ],
  modules: [
    {
      title: "Module 1: Chatbot Fundamentals",
      lessons: [
        { 
          id: "c7-m1-l1",
          title: "Introduction to Chatbots", 
          duration: "20 min",
          type: "reading",
          content: `
# Chatbot Fundamentals

A chatbot is software that simulates human-like conversations with users via text or voice.

## Evolution
1.  **Rule-Based (Tree)**: "Press 1 for Sales, 2 for Support." (Strict, limited).
2.  **Keyword-Based**: "If user types 'refund', show refund policy." (Slightly better).
3.  **Conversational AI (NLP)**: Understands intent ("I want my money back") using NLU.
4.  **Generative AI (LLMs)**: Generates completley new responses, handles nuance (ChatGPT).

## Key Components
*   **NLU (Natural Language Understanding)**: Understanding what the user *means* (Intent + Entities).
*   **Dialog Manager**: Deciding what to say next (State machine).
*   **NLG (Natural Language Generation)**: Creating the response text.
          `
        },
        { 
          id: "c7-m1-l2",
          title: "Conversation Design", 
          duration: "26 min",
          type: "reading",
          content: `
# Conversation Design Principles

Designing a conversation is harder than designing a GUI because users can say *anything*.

## Principles
1.  **Be Cooperative**: Follow Grice's Maxim of Quantity (Make your contribution as informative as required).
2.  **Manage Expectations**: Let the user know they are talking to a bot and what the bot can do.
3.  **Handle Errors Gracefully**: "I didn't quite catch that" is frustrating. Use "Did you mean X?" or rephrase.

## Happy Path vs Repair Path
*   **Happy Path**: User asks perfect question -> Bot gives perfect answer.
*   **Repair Path**: User asks ambiguous question -> Bot clarifies -> User confirms -> Bot answers.
          `
        },
        {
          id: "c7-m1-l3",
          title: "Quiz: Chatbot Basics",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "Which component is responsible for understanding the user's intent?",
              options: ["Dialog Manager", "NLU", "NLG", "TTS"],
              correctAnswer: "B",
              explanation: "Natural Language Understanding (NLU) is the part of AI that deals with machine reading comprehension."
            }
          ]
        }
      ]
    },
    {
      title: "Module 2: Building with No-Code Tools",
      lessons: [
        { 
          id: "c7-m2-l1",
          title: "Dialogflow Essentials", 
          duration: "30 min",
          type: "reading",
          content: `
# Google Dialogflow

Dialogflow is a natural language understanding platform that makes it easy to design and integrate a conversational user interface into your mobile app, web application, device, bot, interactive voice response system, and so on.

## Key Concepts
*   **Agent**: The chatbot itself.
*   **Intent**: What the user wants (e.g., "BookFlight").
*   **Training Phrases**: Examples of what users might say ("I need to fly to NY", "Book a ticket").
*   **Parameters (Entities)**: Extracted data (e.g., "New York" is a @sys.geo-city).
*   **Fulfillment**: Code (Webhook) to execute the action (e.g., check database for flights).
          `
        },
        { 
          id: "c7-m2-l2",
          title: "Voiceflow for Visual Design", 
          duration: "24 min",
          type: "reading",
          content: `
# Voiceflow

Voiceflow is a collaborative design platform for conversation design. It allows you to visually map out conversations with drag-and-drop blocks.

## Workflow
1.  **Drag Blocks**: Speak, Choice, Capture Input, API Call.
2.  **Connect**: Draw lines to connect the flow.
3.  **Prototype**: Test the conversation immediately in the browser.
4.  **Export**: Export to Alexa, Google Assistant, or Dialogflow.
          `
        }
      ]
    },
    {
      title: "Module 3: LLM-Powered Chatbots",
      lessons: [
        { 
          id: "c7-m3-l1",
          title: "RAG for Chatbots", 
          duration: "28 min",
          type: "reading",
          content: `
# Retrieval-Augmented Generation (RAG)

Traditional chatbots require manual entry of every Q&A pair. LLM chatbots can hallucinate.
**RAG** solves both.

## How it works:
1.  **Ingest**: Take your company documents (PDFs, Notion, Website).
2.  **Chunk & Embed**: Split text into chunks and convert to vectors (Store in Vector DB like Pinecone).
3.  **Retrieve**: When user asks a question, search Vector DB for relevant chunks.
4.  **Generate**: Send chunks + question to LLM (GPT-4) with prompt: "Answer the question using only the context below."

**Result**: An AI chatbot that knows your specific data and cites its sources.
          `
        },
        {
          id: "c7-m3-l2",
          title: "Quiz: Modern Chatbots",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "What does RAG stand for?",
              options: ["Real-time Analysis Graph", "Retrieval-Augmented Generation", "Recursive Attention Generator", "Random Access Generation"],
              correctAnswer: "B",
              explanation: "Retrieval-Augmented Generation combines retrieval (searching documents) with generation (LLMs) to provide accurate, grounded answers."
            }
          ]
        }
      ]
    }
  ],
  projects: [
    {
      title: "Capstone: Enterprise Chatbot Solution",
      description: "Build a customer support bot integrated with a knowledge base.",
      duration: "6 hours",
      difficulty: "advanced"
    }
  ]
};
