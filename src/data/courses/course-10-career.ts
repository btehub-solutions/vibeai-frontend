import { Course } from "../course-types";

export const course10: Course = {
  id: 10,
  title: "AI Careers, Freelancing, and Entrepreneurship",
  description: "Navigate the AI job market, build a portfolio, and launch your own AI business.",
  longDescription: "Turn your AI skills into a career or business. Learn how to position yourself in the job market, build a compelling portfolio, find freelance clients, and identify entrepreneurial opportunities in the AI space.",
  progress: 0,
  lessons: 32,
  completedLessons: 0,
  duration: "10 hours",
  category: "Career",
  prerequisites: [],
  learningOutcomes: [
    "Navigate the AI job market successfully",
    "Build a standout AI portfolio",
    "Launch a freelance AI business",
    "Identify and validate AI startup ideas"
  ],
  modules: [
    {
      title: "Module 1: The AI Career Landscape",
      lessons: [
        { 
          id: "c10-m1-l1",
          title: "In-Demand AI Roles", 
          duration: "20 min",
          type: "reading",
          content: `
# AI Career Paths

The AI revolution has created entirely new job titles.

## Key Roles
1.  **AI Engineer / ML Engineer**: Builds and deploys models. Strong coding (Python) required.
2.  **Prompt Engineer**: Designs and optimizes prompts for LLMs. Requires language skills and logic.
3.  **AI Product Manager**: Defines the "Why" and "What" of AI products.
4.  **AI Ethics Officer**: Ensures responsible development.
5.  **Data Scientist**: Extracts insights from data.
          `
        },
        { 
          id: "c10-m1-l2",
          title: "Building Your Portfolio", 
          duration: "25 min",
          type: "reading",
          content: `
# Your AI Portfolio

Employers act on proof, not promises.

## What to Include
*   **Case Studies**: Don't just show code. Show the problem, your solution, and the *impact*.
*   **Live Demos**: Deploy your apps to Vercel/Streamlit so people can click and play.
*   **GitHub**: Clean, well-documented code.
*   **Blog/Writing**: Explain your thought process. Teaching proves mastery.
          `
        },
        {
          id: "c10-m1-l3",
          title: "Quiz: Career Strategy",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "Which is more important for an AI portfolio?",
              options: ["Listing every programming language you know", "Showing real-world problem solving with case studies", "Having a fancy logo", "Using the most expensive cloud provider"],
              correctAnswer: "B",
              explanation: "Demonstrating that you can solve real problems is the most valuable signal to employers."
            }
          ]
        }
      ]
    },
    {
      title: "Module 2: Freelancing & Consulting",
      lessons: [
        { 
          id: "c10-m2-l1",
          title: "Finding Your Niche", 
          duration: "28 min",
          type: "reading",
          content: `
# Freelance AI Niche

"I do AI" is too broad. Specialization pays.

## Niche Ideas
*   **Chatbot Implementation for Real Estate**: "I build bots that qualify leads for realtors."
*   **Content Automation for Agencies**: "I automate blog writing workflows."
*   **Custom Image Generation for E-commerce**: "I create AI product photos."
          `
        },
        { 
          id: "c10-m2-l2",
          title: "Pricing Your Services", 
          duration: "24 min",
          type: "reading",
          content: `
# Pricing Models

## Don't Charge Hourly
Charging hourly punishes efficiency. If AI makes you 10x faster, you shouldn't earn 10x less.

## Value-Based Pricing
Charge based on the value you create.
*   "If this bot saves you 20 hours a week ($500 value), I will build it for $2,000 (one month of savings)."
*   **Retainers**: Ongoing maintenance and optimization.
          `
        }
      ]
    },
    {
      title: "Module 3: Entrepreneurship",
      lessons: [
        { 
          id: "c10-m3-l1",
          title: "Identifying AI Opportunities", 
          duration: "30 min",
          type: "reading",
          content: `
# Spotting Startup Opportunities

Look for "Boring" Industries.
Tech companies are already saturated with AI. Look at:
*   Legal (Contract review)
*   Construction (Project planning)
*   Logistics (Route optimization)
*   Healthcare (Admin automation)

**Framework**: Find a process that involves expensive human cognitive labor (reading, writing, analyzing) and automate 80% of it.
          `
        },
         {
          id: "c10-m3-l2",
          title: "Quiz: Business",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "Which pricing model is generally recommended for AI services?",
              options: ["Hourly rate", "Value-based pricing", "Cost-plus pricing", "Working for exposure"],
              correctAnswer: "B",
              explanation: "Value-based pricing aligns your incentives with the client's success and doesn't penalize you for using AI efficiency."
            }
          ]
        }
      ]
    }
  ],
  projects: [
    {
      title: "Capstone: Launch Your AI Business",
      description: "Create a business plan and MVP for an AI-powered product or service.",
      duration: "10 hours",
      difficulty: "advanced"
    }
  ]
};
