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
# MODULE 1 — Chatbot Fundamentals
**Learning Objectives:**
* Understand the technological evolution of chatbots from rigid decision trees to generative AI.
* Differentiate between Intents, Entities, and Utterances in conversational architecture.
* Design robust conversation flows with distinct "Happy Paths" and "Repair Paths."

---

## Lesson 1 — Introduction to Chatbots

### Definition / Explanation:

**Point 1: The Evolution of Conversational Agents**
A chatbot is a software application designed to simulate human-like conversations over text or voice. However, the technology powering them has evolved drastically over the last decade, transitioning from rigid logic trees to infinitely flexible generative models.

**Point 2: Core Architectures**
1.  **Rule-Based Chatbots (Decision Trees):** The earliest bots operated on flowchart-like paths. They are entirely deterministic ("Press 1 for Sales, Press 2 for Support"). They are highly reliable but very frustrating if the user's issue isn't heavily scripted.
2.  **Intent-Based NLP Chatbots (E.g., Dialogflow):** These bots use Natural Language Understanding (NLU) to guess a user's *Intent* from predefined training phrases. (e.g., "I want my money back" triggers the \`Refund_Intent\` script). They require constant manual training and fail gracefully outside set parameters.
3.  **Generative AI Chatbots (LLMs):** The modern era, powered by massive models like GPT-4. They understand full conversational context and generate completely new, unscripted responses on the fly. They are human-like but prone to hallucinations without guardrails.

### Key Points:
*   **Intent:** The underlying goal the user is trying to achieve (e.g., \`Book_Flight\`).
*   **Entity:** The specific data variables extracted from the user's message required to complete the intent (e.g., Destination: \`Paris\`, Date: \`Tomorrow\`).
*   **Utterance:** Anything the user says or types into the chat window.
*   **Deterministic vs Probabilistic:** Traditional bots operate on exact logical paths (deterministic), while modern LLMs predict the best conversational response (probabilistic).

### Examples / Use Cases:

*   **Example 1: The Rule-Based IVR:** A telecom phone menu saying, "Say 'Billing' to speak to someone about your bill. Say 'Technical Support' for..."
*   **Example 2: The Modern E-Commerce Copilot:** A Shopify LLM bot handling, "Hey, I bought the red shoes last week but they're too tight. Can I swap them for a blue pair in size 10?", instantly extracting the entities, querying the database, and issuing an RMA.

### Visuals:


### Implementation / Hands-On:

*   **Step 1:** Define the core purpose of a bot you want to build (e.g., A Pizza Ordering Bot).
*   **Step 2:** Write down 3 primary Intents for that bot (e.g., \`Order_Pizza\`, \`Check_Status\`, \`Speak_To_Human\`).
*   **Step 3:** For the \`Order_Pizza\` intent, list the Entities you must collect before completing the order (e.g., \`Size\`, \`Toppings\`, \`Address\`).

### Summary / Key Takeaways:

*   Chatbot technology has moved from scripted, frustrating menus to intelligent, generative assistants.
*   Understanding the difference between what a user wants (Intent) and the specific details provided (Entities) is the foundation of conversational engineering.

### Optional Exercises / Prompts:

*   **Exercise 1:** Open ChatGPT and write this prompt: "Act as an NLP parser. I am going to give you user utterances. Identify the core 'Intent' and any 'Entities' present." Then, feed it sample customer support questions.
          `
        },
        { 
          id: "c7-m1-l2",
          title: "Conversation Design", 
          duration: "26 min",
          type: "reading",
          content: `
## Lesson 2 — Conversation Design

### Definition / Explanation:

**Point 1: The Difficulty of Conversational UI (CUI)**
Designing a conversation is fundamentally harder than designing a graphical user interface (GUI). In a GUI, you restrict the user to specific, clicking buttons. In a CUI, the user is presented with a blank text box, meaning they can type absolutely anything. Unstructured input requires rigorous conversational design (CxD).

**Point 2: Core Design Principles**
The goal is never to trick a user into thinking they are talking to a human—users hate being deceived. A good CUI establishes immediate expectations, handles failures elegantly, and gently guides the user without writing overly long, dense paragraphs.

### Key Points:
*   **Set Clear Expectations (The Welcome Message):** Acknowledge the bot is AI. List exactly what it can and cannot do immediately.
*   **Be Cooperative (Grice's Maxims):** Make your bot's answers informative, but brief. Keep sentences short. Nobody wants to read an essay in a 300px wide chat widget.
*   **Offer Explicit Choices:** Instead of an open-ended "What do you want?", lead the user. Explicit choices reduce the cognitive load.

### Examples / Use Cases:

*   **Example 1: Managing Failure (The Happy vs Repair Path):**
    *   *The Happy Path:* User asks a perfect question -> Bot gives the perfect answer. (Rarely happens perfectly).
    *   *The Repair Path:* User asks an ambiguous off-topic question. The bot must elegantly guide them back.
*   **Example 2: A Good Repair Prompt:** An angry user says, "You guys are terrible." A bad bot says, "I didn't understand that." A well-designed repair path says, "I'm sorry you're frustrated. Let me get you to a human so we can resolve this. Are you asking about **Shipping** or **Billing**?"

### Visuals:


### Implementation / Hands-On:

*   **Step 1:** Draft a Welcome Message for a customer support bot for a shoe store.
*   **Step 2:** Ensure the message clearly states it is an AI, sets boundaries for what it can do, and offers three distinct clickable options to the user.
*   **Step 3:** Draft the "Fallback Message" the bot will say if the user asks a completely unrelated question (like "What's the meaning of life?").

### Summary / Key Takeaways:

*   Users are unpredictable; design for the Repair Path, not just the Happy Path.
*   Transparency is vital. Never pretend the bot is human.
*   Lead the conversation with structured options rather than relying purely on open-ended text input.

### Optional Exercises / Prompts:

*   **Exercise 1:** Interact with an enterprise bot (like an airline or bank website). Intentionally mistype words or ask confusing questions to see how their "Repair Paths" are designed. Note if it was helpful or frustrating.
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
# MODULE 2 — Building with No-Code Tools
**Learning Objectives:**
* Architect complete conversation flows visually before coding.
* Understand the core logic operations: Response, Listen, and Logic paths.
* Implement robust platforms to deploy bots multi-channel.

---

## Lesson 1 — Voiceflow for Visual Design

### Definition / Explanation:

**Point 1: The Importance of Visual Mapping**
Professional conversational designers rarely start by writing code. They begin by mapping out the flows visually. **Voiceflow** is currently the industry standard for prototyping, testing, and ultimately building complex conversational interfaces without requiring deep programming knowledge.

**Point 2: The Node-Based Canvas Architecture**
Voiceflow operates on a drag-and-drop canvas. You connect visual "nodes" to represent the logical flow of the conversation. This allows developers and non-technical stakeholders (like marketing managers) to collaborate on the bot's behavior in real-time.

### Key Points:
*   **Response Blocks:** These nodes represent what the bot says or outputs (Text bubbles, Images, interactive Cards, carousels).
*   **Listen Blocks:** These nodes represent the bot pausing and waiting for the user to do something.
    *   *Buttons/Choices:* Forces the user down a specific, safe visual path.
    *   *Capture/Prompt:* Listens for open text input and extracts it to a saved system variable (e.g., capturing the user's email).
*   **Logic Blocks:** The neural system of the bot.
    *   *Conditions:* "If \`user_intent == 'sales'\`, route path left. If \`user_intent == 'support'\`, route path right."
    *   *API Steps:* Reach out to external tools (like checking a real-world Shopify database to see if an order number is valid).

### Examples / Use Cases:

*   **Example 1: The Visual Prototype Handoff:** A designer builds a complex flow in Voiceflow, hits the 'Play' button to test it natively in the browser, and sends a prototype link to the client for approval before any engineering hours are spent writing Python scripts.

### Visuals:


### Implementation / Hands-On:

*   **Step 1:** Create a free account on Voiceflow.com.
*   **Step 2:** Start a new blank Web Chat project.
*   **Step 3:** Drag a Text block to create a welcome message, followed by a Buttons block with two choices: "Sales" and "Support".
*   **Step 4:** Connect each button to a different specific Text response. Press "Run" to test your interactive flow.

### Summary / Key Takeaways:

*   Always map the conversational logic visually before committing to code.
*   Voiceflow utilizes Response, Listen, and Logic nodes to build interactive, state-managed dialogues.
*   Prototyping allows for rapid stakeholder feedback and iteration.

### Optional Exercises / Prompts:

*   **Exercise 1:** Modify your Voiceflow prototype from the Implementation step to include a "Capture" block that asks for the user's name, stores it in a \`user_name\` variable, and then dynamically prints their name in the following response.
          `
        },
        { 
          id: "c7-m2-l2",
          title: "Botpress and Omnichannel Deployment", 
          duration: "24 min",
          type: "reading",
          content: `
## Lesson 2 — Botpress and Omnichannel Deployment

### Definition / Explanation:

**Point 1: AI-Native Platforms**
**Botpress** is a highly powerful visual chatbot builder that, unlike legacy tools, was rebuilt from the ground up specifically to harness Generative AI models. It effortlessly blends the reliability of deterministic fallback paths with the fluidity of LLM interactions.

**Point 2: The End of Multi-Builds**
A massive pain point in the past was deployment. A company might need a bot on their Website, one in Slack, and a WhatsApp number for international clients. You shouldn't have to build three separate bots. Modern tools are **Omnichannel**.

### Key Points:
*   **Knowledge Bases (RAG included):** With Botpress, you can upload your entire website URL structure or upload gigantic PDF manuals. The bot instantly "knows" this information and will automatically answer questions using that data without you having to map out rigid Q&A pairs manually.
*   **AI Tasks / LLM Evaluation:** You can use an LLM purely as a background worker evaluating state. (e.g., User submits a query -> AI Task silently evaluates if the tone is 'Angry' -> If angry, immediately bypass the standard bot flow and route the chat to a high-priority human queue).
*   **Write Once, Deploy Everywhere:** You build the core conversational logic centrally once. When you toggle integrations on, the platform automatically translates the UI (changing a visual clickable Card deck on the web into a formatted text-list representation for WhatsApp).

### Examples / Use Cases:

*   **Example 1: Generative Knowledge Base Automation:** An HR manager uploads the 500-page employee handbook PDF into Botpress. Without taking any further action, the bot can instantly answer questions like "What is the parental leave policy for part-time workers?", synthesizing the exact paragraphs into a concise answer.

### Visuals:


### Implementation / Hands-On:

*   **Step 1:** Identify a public FAQ page for a prominent service (like an airline's baggage policy).
*   **Step 2:** Outline how you would create an "AI Task" condition in Botpress to determine if a customer is complaining vs. simply inquiring. If the AI detects a complaint, what response should it give?
*   **Step 3:** List the three main deployment channels your specific business/project would rely heavily on (e.g., Instagram DMs vs. SMS vs. Website Widget).

### Summary / Key Takeaways:

*   Botpress allows developers to ingest massive knowledge bases and let LLMs handle the Q&A generation securely.
*   Omnichannel platforms save thousands of engineering hours by translating core logic to the specific UI limitations of different chat interfaces (WhatsApp vs Web).
*   LLMs can be used to evaluate metadata (like user sentiment) outside of just chatting.

### Optional Exercises / Prompts:

*   **Exercise 1:** Create an account on Botpress, initiate a new Knowledge Base-focused bot, and give it the URL of the Wikipedia page for "Apollo 11". Then ask it detailed questions about the moon landing to test its RAG capabilities.
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
# MODULE 3 — LLM-Powered Chatbots
**Learning Objectives:**
* Prevent AI hallucinations using RAG architectures.
* Define vector databases, embeddings, and semantic search.
* Engineer the full conversational RAG pipeline.

---

## Lesson 1 — RAG: Grounding Chatbots in Truth

### Definition / Explanation:

**Point 1: The Hallucination Problem**
If you connect an empty ChatGPT API framework directly to your website widget, it will confidently give generic answers and hallucinate dangerous facts about your company (e.g., "Yes, we offer free shipping to Mars!"). LLMs are massive statistical engines; they want to predict the next word to please the user, even if it has to invent data.

**Point 2: Retrieval-Augmented Generation (RAG)**
To build a reliable enterprise chatbot, you must use RAG. RAG combines the natural language reasoning power of an LLM with a strictly controlled search engine tied to your specific, secure internal documents. It stops the LLM from relying on its global internet training data.

### Key Points:
*   **Ingestion & Chunking:** Take your proprietary massive data files (Employee Handbooks, Customer Support Logs, Product Tables) and break them into small paragraphs (chunks).
*   **Embedding Models & Vector DBs:** Run those text chunks through an embedding API (like \`text-embedding-3-small\`), which converts English text into an array of thousands of numbers (a vector). Store these vectors in a specialized Vector Database (like Pinecone, Milvus, or Weaviate).
*   **Semantic Retrieval:** When a user types a query ("What is the return policy?"), the system converts that exact phrase into a number vector, measures the mathematical distance against your database, and grabs the semantically closest paragraph.
*   **Augmented Generation (The Final Act):** The system injects that paragraph into a hidden prompt alongside the user's question, instructing the LLM: "Answer the user, but ONLY use the provided paragraph below as truth."

### Examples / Use Cases:

*   **Example 1: The Context Injection Prompt:**
    *   *Hidden System Prompt:* "You are a helpful assistant. Answer the user's question, but ONLY using the provided Context below. If the answer is not in the context, say 'I don't know'."
    *   *Context Retrieved from DB:* [Paragraph detailing a 30-day money-back guarantee for unused electronics].
    *   *User Question:* "Can I return a TV after 40 days?"
    *   *Final LLM Output:* "I apologize, but we only offer returns within a 30-day window."

### Visuals:


### Implementation / Hands-On:

*   **Step 1:** Outline the specific proprietary documents (e.g., 2024 Product Catalog PDF, Zendesk ticket CSVs) you would need to ingest to make an enterprise bot useful for a specific company.
*   **Step 2:** Write the strict "System Prompt" you would enforce on the LLM to ensure it never hallucinates data outside of the database (e.g., instructing it on the exact phrase to use when it cannot find an answer).

### Summary / Key Takeaways:

*   RAG is the mandatory architecture for making LLMs safe for public, business-critical interactions.
*   RAG relies on converting linguistic meaning into mathematical embeddings to perform "semantic search" rather than basic keyword search.
*   The final LLM response is heavily constrained by injecting factual context directly into the prompt.

### Optional Exercises / Prompts:

*   **Exercise 1:** Open ChatGPT and act out a manual RAG process. Say: "I am going to give you Context, and then ask a Question. You must answer solely based on the Context." Provide a paragraph about a fictional company policy, and ask a question.
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
