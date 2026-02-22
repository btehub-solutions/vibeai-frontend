import { Course } from "../course-types";

export const course7: Course = {
  id: 7,
  title: "AI Chatbots: From Rule-Based to Intelligent Agents",
  description: "Build sophisticated chatbots from scratch using no-code tools and AI platforms.",
  longDescription: "Master chatbot development from fundamentals to advanced AI-powered conversational agents. Learn rule-based systems, NLP-powered bots, no-code builders, custom knowledge training, and deployment strategies for enterprise use-cases.",
  progress: 0,
  lessons: 26,
  completedLessons: 0,
  duration: "9 hours",
  category: "Business",
  prerequisites: ["NLP Mastery"],
  learningOutcomes: [
    "Build chatbots with modern no-code platforms",
    "Train LLM bots on completely custom knowledge",
    "Deploy chatbots across multiple channels (Web, WhatsApp, Slack)",
    "Optimize conversation flows and handle edge cases gracefully"
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
# Chatbot Architectures: A Brief History

A chatbot is a software application designed to simulate human-like conversations over text or voice. However, the technology powering them has evolved drastically over the last decade.

## 1. Rule-Based Chatbots (Decision Trees)
The earliest bots operated on rigid, flowchart-like paths. They are entirely deterministic.
*   *Interaction:* "Press 1 for Sales, Press 2 for Support."
*   *Pros:* Extremely reliable, easy to build.
*   *Cons:* Not conversational, highly frustrating if the user's issue isn't listed.

## 2. Intent-Based NLP Chatbots (E.g., Dialogflow)
These bots use Natural Language Understanding (NLU) to guess the user's *Intent* from a pre-trained list of phrases.
*   *Interaction:* User types "I want a refund." Bot matches this to the \`Intent: Refund\` and triggers a hardcoded script.
*   *Pros:* Can handle varied phrasing ("Money back please").
*   *Cons:* Can't handle unexpected tangents. Requires constant manual training.

## 3. Generative AI Chatbots (LLMs)
The modern era. These are powered by massive models like GPT-4 or Llama 3.
*   *Interaction:* The bot understands the entirety of the conversational context and *generates* a completely new response on the fly.
*   *Pros:* Human-like, infinitely flexible, handles typos and slang natively.
*   *Cons:* Prone to "hallucinations" (making things up) without strong guardrails.

## Key Terminology
*   **Intent:** The goal the user is trying to achieve (e.g., \`Book_Flight\`).
*   **Entity:** Specific data points extracted from the message (e.g., Destination: \`Paris\`, Date: \`Tomorrow\`).
*   **Utterance:** Anything the user says or types.
          `
        },
        { 
          id: "c7-m1-l2",
          title: "Conversation Design", 
          duration: "26 min",
          type: "reading",
          content: `
# Conversation Design Principles (CxD)

Designing a conversation is fundamentally harder than designing a graphical user interface (GUI) because users can type *anything*. You don't have definitive buttons to restrict them.

## Core Principles

1.  **Set Clear Expectations (The Welcome Message):**
    Never pretend the bot is human. Users get angry when tricked. 
    *✅ Good:* "Hi! I'm an AI assistant. I can help you track your order or process a return. How can I help?"
2.  **Be Cooperative (Grice's Maxims):**
    Make your bot's answers as informative as required, but no more. Keep sentences short. Nobody wants to read an essay in a chat window.
3.  **Offer Explicit Choices:**
    Instead of an open-ended "What do you want?", lead the user.
    *✅ Good:* "Would you like me to check stock for the Blue or Red model?"

## Managing Failure (The Repair Path)

The true test of a chatbot designer is what happens when the bot fails to understand the user.

*   **The Happy Path:** User asks a perfect question -> Bot gives the perfect answer. (Only happens 40% of the time).
*   **The Repair Path:** User asks an ambiguous or off-topic question. The bot must elegantly guide them back.
    *   *❌ Bad Error:* "I didn't understand that."
    *   *✅ Good Repair:* "I'm not sure I caught that. Were you asking about **Shipping Times** or **Returns**? You can also type 'Agent' to speak to a human."
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
              text: "In traditional NLP chatbots, what does the term 'Entity' represent?",
              options: ["The overarching goal of the user", "Specific extracted data points like dates, locations, or names from the user's message", "The personality assigned to the bot", "The backend database"],
              correctAnswer: "B",
              explanation: "While 'Intent' refers to the goal (e.g., Book a Flight), an 'Entity' is the specific parameter required to achieve it (e.g., To: Paris, Date: Friday)."
            },
            {
              id: "q2",
              text: "Which of the following is considered an excellent conversational design practice?",
              options: ["Programming the bot to insist it is a real human named Sarah", "Giving the user completely open-ended prompts with no guidance", "Explicitly setting expectations in the welcome message about what the bot can and cannot do", "Responding with dense, multi-paragraph text blocks to ensure all information is covered"],
              correctAnswer: "C",
              explanation: "Setting clear boundaries and acknowledging that the bot is an AI manages user expectations and reduces frustration."
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
          title: "Voiceflow for Visual Design", 
          duration: "30 min",
          type: "reading",
          content: `
# Visualizing Conversations with Voiceflow

Before writing any code, professional conversational designers map out the flows visually. **Voiceflow** is the industry standard for prototyping and building conversational interfaces.

## The Canvas Workflow

Voiceflow uses a node-based architecture. You drag blocks onto a canvas and connect them to create logical paths.

1.  **Response Blocks:** What the bot says (Text, Images, Cards).
2.  **Listen Blocks:** Waiting for the user.
    *   *Buttons/Choices:* Forces the user down a specific path.
    *   *Capture/Prompt:* Listens for open text and extracts it to a variable (e.g., \`user_email\`).
3.  **Logic Blocks:**
    *   *Conditions:* If \`user_intent == 'refund'\`, route left. If \`user_intent == 'sales'\`, route right.
    *   *API Steps:* Connect to external tools (like a Stripe database) to fetch real-world info dynamically.

## Prototyping and Handoff
Once designed, Voiceflow allows you to hit 'Play' and test the chat interface in your browser. You can then share this prototype link with stakeholders before a developer writes a single line of Python. Modern Voiceflow can also deploy directly to web widgets.
          `
        },
        { 
          id: "c7-m2-l2",
          title: "Botpress and Omnichannel Deployment", 
          duration: "24 min",
          type: "reading",
          content: `
# Platform Native Building with Botpress

**Botpress** is a powerful visual chatbot builder that seamlessly blends Generative AI with deterministic fallback paths. It is incredibly popular for enterprise deployments.

## The GenAI Native Interface
Unlike older tools that relied purely on training phrases, Botpress is built from the ground up for LLMs.
*   **Knowledge Bases:** You can upload your entire website URL or PDF manuals directly into Botpress, and it will automatically answer questions using that data without you having to map out the Q&A pairs manually.
*   **AI Tasks:** You can use LLMs to evaluate data inside the flow. Example: User submits a query -> AI Task evaluates if the tone is 'Angry' -> If Angry, bypass the bot and route directly to a human support agent.

## Omnichannel Deployment
You shouldn't have to build three separate bots for the Web, WhatsApp, and Slack. 
Modern platforms allow you to build the logic once in a central canvas, and toggle integrations on. The platform automatically formats the UI (converting a visual Card deck on the web into a numbered text list on WhatsApp).
          `
        }
      ]
    },
    {
      title: "Module 3: LLM-Powered Chatbots",
      lessons: [
        { 
          id: "c7-m3-l1",
          title: "RAG: Grounding Chatbots in Truth", 
          duration: "28 min",
          type: "reading",
          content: `
# Retrieval-Augmented Generation (RAG)

If you hook a chatbot directly to an empty ChatGPT API, it will give generic answers and confidently hallucinate facts about your company ("Yes, we offer free shipping to Mars!").

To build an enterprise chatbot, you must use **RAG**. RAG combines the reasoning power of an LLM with a search engine tied to your specific, secure documents.

## The RAG Architecture

1.  **Ingestion:** Take your proprietary data (Employee Handbooks, Customer Support Logs, Product Specs).
2.  **Chunking & Embedding:** Break the documents into small paragraphs (chunks). Run them through an embedding model (like \`text-embedding-3-small\`) which converts the text into a massive array of numbers (a vector) representing the semantic meaning. Store this in a **Vector Database** (like Pinecone or Weaviate).
3.  **Retrieval:** When a user asks: "What is the return policy?", the system converts that question into a vector and searches the database for the mathematically "closest" paragraph.
4.  **Augmented Generation:** The system grabs that paragraph and injects it into a prompt behind the scenes: 
    *   *System Prompt:* "You are a helpful assistant. Answer the user's question, but ONLY use the provided context below. If the answer is not in the context, say 'I don't know'."
    *   *Context:* [Paragraph about 30-day returns retrieved from DB].
    *   *User:* "What is the return policy?"
5.  **Output:** The LLM reads the context, synthesizes an answer, and delivers it to the user.

**Result:** A highly intelligent chatbot that speaks fluent English, but only operates on the grounded truth of your company's data.
          `
        },
        {
          id: "c7-m3-l2",
          title: "Quiz: Modern Deep-Dive",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "What does the 'Retrieval' step in RAG actually do?",
              options: ["It retrieves an answer directly from the LLM's pre-trained weights", "It searches a specialized database (often a vector DB) for specific company documents relevant to the user's query", "It re-generates the user prompt", "It retrieves analytics on bot performance"],
              correctAnswer: "B",
              explanation: "The retrieval step aims to find relevant external facts from a database to inject into the LLM's context window, grounding its response."
            },
            {
              id: "q2",
              text: "What is a primary benefit of using a unified builder platform like Botpress for multi-channel deployment?",
              options: ["You only have to build the conversational logic once, and it deploys universally across Web, Slack, and WhatsApp", "It makes the bot answer faster", "It eliminates the need for any LLM", "It is entirely open-source"],
              correctAnswer: "A",
              explanation: "Omnichannel deployment allows you to maintain single-source logic while the platform handles the UI translation for different channels."
            }
          ]
        }
      ]
    }
  ],
  projects: [
    {
      title: "Capstone: Enterprise Support Solutions",
      description: "Build a robust customer support RAG chatbot using a no-code visual builder, integrate it with a custom knowledge base, and deploy the widget to a live website.",
      duration: "6 hours",
      difficulty: "advanced"
    }
  ]
};

