import { Course } from "../course-types";

export const course10: Course = {
  id: 10,
  title: "AI Careers, Freelancing, and Entrepreneurship",
  description: "Navigate the AI job market, build a portfolio, and launch your own AI business.",
  longDescription: "Turn your AI skills into a lucrative career or business. Learn how to position yourself in the competitive job market, build a compelling and verifiable portfolio, find high-paying freelance clients, and identify major entrepreneurial opportunities in the AI space.",
  progress: 0,
  lessons: 32,
  completedLessons: 0,
  duration: "10 hours",
  category: "Career",
  prerequisites: [],
  learningOutcomes: [
    "Navigate the AI job market successfully",
    "Build a standout, verifiable AI portfolio",
    "Launch a profitable freelance AI business",
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
# The Exploding AI Job Market

The AI revolution has not just changed how we work; it has created entirely new categories of jobs. While traditional software engineering is still highly in demand, understanding AI creates a massive multiplier on your salary potential.

## Key Technical & Non-Technical Roles

1.  **AI/ML Engineer**: The builders. They don't just use APIs; they fine-tune models, optimize weights, and deploy them to the cloud. 
    * *Requirements:* Deep Python expertise, PyTorch/TensorFlow, MLOps, math/statistics.
2.  **AI Solutions Architect**: The strategists. They look at a company's data and infrastructure and figure out how to integrate LLMs securely.
    * *Requirements:* Cloud architecture (AWS/GCP), API mastery, RAG implementation knowledge.
3.  **Prompt Engineer / AI Writer**: A role that bridges logic and linguistics. These experts craft systematic prompts to prevent hallucinations and extract precise data formats from LLMs. 
    * *Requirements:* High language proficiency, logic mapping, domain expertise.
4.  **AI Product Manager**: Defines the "Why" and "What." They figure out what AI features users actually want (e.g., adding an AI summarizer vs. an entire chatbot).
    * *Requirements:* Agile methodology, UI/UX understanding, basic AI capability awareness.
5.  **AI Ethics & Compliance Officer**: As governments regulate AI (like the EU AI Act), companies need experts to audit models for bias and copyright infringement.
          `
        },
        { 
          id: "c10-m1-l2",
          title: "Building Your Portfolio", 
          duration: "25 min",
          type: "reading",
          content: `
# Your AI Portfolio

In the AI space, traditional resumes are losing value. Employers and clients want to see exactly what you can build. They act on proof, not promises.

## How to structure an undeniable portfolio:

### 1. Shift from "Code" to "Case Studies"
Don't just link to a GitHub repo with a \`README.md\` that says "A Chatbot." Write a case study:
*   **The Problem:** "Customer support agents were spending 5 hours a week answering password reset questions."
*   **The Solution:** "I built a LangChain agent using open-source models to triage inquiries."
*   **The Impact:** "Reduced ticket volume by 40%."

### 2. Live, Clickable Demos
Hiring managers don't have time to clone your repo and install dependencies. Deploy your applications!
*   Use **Vercel** or **Netlify** for Next.js/React frontend apps.
*   Use **Streamlit** or **Gradio** for quick Python/Model prototypes.

### 3. Open Source Contributions
Show that you can work in a team. Submitting bug fixes or documentation updates to major frameworks like LangChain, LlamaIndex, or huggingface/transformers is an instant credibility booster.
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
              text: "Which is the most persuasive element to include in a modern AI portfolio?",
              options: ["A list of every programming language you watched a tutorial on", "Case studies demonstrating real-world problem solving and business impact", "A highly designed PDF resume", "Screenshots of terminal outputs passing tests"],
              correctAnswer: "B",
              explanation: "Demonstrating that you can solve real business problems and articulate the impact is the most valuable signal to employers and clients."
            },
            {
              id: "q2",
              text: "What is the primary role of an AI Solutions Architect?",
              options: ["Training core foundation models from scratch", "Designing how LLMs integrate securely into a company's existing data infrastructure", "Writing blog posts about AI", "Managing the marketing budget for an AI tool"],
              correctAnswer: "B",
              explanation: "Solutions Architects focus on system-level design, secure integration, and infrastructure (like RAG systems and cloud deployments)."
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
# Discovering Your Freelance AI Niche

Saying "I do AI" is a guaranteed way to get ignored. It's too broad, and clients don't know how to buy "AI" generally. They buy solutions to specific headaches.

## The Power of Specialization

Specializing allows you to charge higher rates because you are the perceived expert for a specific problem.

### Examples of Profitable Niches:

*   **RAG for Law Firms:** "I build secure, private chat interfaces that allow paralegals to query hundreds of legal case files instantly."
*   **E-Commerce Image Generation:** "I use ComfyUI and Midjourney to create photorealistic product lifestyle shots for Shopify owners, saving them thousands on photoshoots."
*   **Marketing Agency Automation:** "I connect Make.com with OpenAI to automate content drafts, SEO metadata generation, and social media scheduling."

### How to Pick:
Combine your AI skills with your past experience. If you used to be a teacher, build AI grading assistants. If you worked in accounting, build invoice data-extraction bots.
          `
        },
        { 
          id: "c10-m2-l2",
          title: "Pricing Your Services", 
          duration: "24 min",
          type: "reading",
          content: `
# Pricing AI Services: Ditch the Hourly Rate

When it comes to AI development, charging by the hour is a trap. AI makes you incredibly fast. If you write a python script in 2 hours with Copilot that used to take 20 hours, an hourly rate punishes you for your efficiency.

## 1. Value-Based Pricing (The Gold Standard)
Charge based on the financial outcome you create for the client, not the time it takes you.
*   **Scenario:** A client spends $4,000/month on manual data entry.
*   **Your Pitch:** "I can build an AI automation to do this flawlessly. It will cost you a one-time fee of $8,000. It pays for itself in two months."
*   *Note how your time (whether it takes you 1 day or 1 week) is irrelevant to the pitch.*

## 2. Productized Services
Offer a specific outcome for a flat fee.
*   "I will build and deploy a custom trained Customer Support Chatbot to your website for $2,500."

## 3. Retainers (Recurring Revenue)
AI software requires maintenance. APIs change, models deprecate, and prompts need refining.
*   Charge a monthly retainer ($500 - $2,000) to keep their AI systems running, monitored for errors, and updated with the latest models.
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

Building another "AI Wrapper" that just chats with a PDF is a fast track to failure today. To build a valuable AI startup, you need to solve hard, "boring" problems.

## The "Boring Industry" Framework

Big tech companies are obsessing over general intelligence. You should obsess over niche industries that still use fax machines and messy Excel sheets.

Look closely at:
*   **Logistics & Freight:** Extracting data from messy Bills of Lading.
*   **Construction:** Ensuring daily site reports match compliance regulations using vision models and LLMs.
*   **Local Healthcare:** Automating patient intake and insurance verification workflows.

## The 80/20 Automation Rule
Don't try to replace the human entirely; that requires 100% accuracy, which LLMs struggle with. 
Instead, build tools that automate 80% of the cognitive labor (reading, sorting, drafting) and leave the final 20% (reviewing, approving, signing) to the human expert. You turn a Junior employee into a Senior employee.
          `
        },
         {
          id: "c10-m3-l2",
          title: "Quiz: Business & Strategy",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "Why is charging an hourly rate often detrimental for an AI freelancer?",
              options: ["Clients prefer longer timelines", "AI drastically increases your speed, meaning you earn less money for delivering results faster", "It makes taxes too complicated", "You cannot track time accurately when coding"],
              correctAnswer: "B",
              explanation: "Since AI accelerates development, an hourly rate essentially punishes you for efficiency. Value-based pricing aligns your pay with the benefit the client receives."
            },
            {
              id: "q2",
              text: "When looking for AI startup ideas, which approach is recommended?",
              options: ["Build a general-purpose clone of ChatGPT", "Focus on building foundational LLM models to compete with Google", "Target 'boring', niche industries with heavy manual data processing workflows", "Only build tools for other software engineers"],
              correctAnswer: "C",
              explanation: "Niche, traditional industries often have high-value problems that can be solved with relatively simple AI integrations, facing far less competition than broad tech applications."
            }
          ]
        }
      ]
    }
  ],
  projects: [
    {
      title: "Capstone: Launch Your AI Business",
      description: "Create a comprehensive business proposal, define your pricing model, and build a functioning MVP (Minimum Viable Product) for an AI-powered service targeting a specific niche.",
      duration: "10 hours",
      difficulty: "advanced"
    }
  ]
};

