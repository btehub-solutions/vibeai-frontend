export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'quiz';
  content?: string; // Markdown content for text lessons
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface CourseMetadata {
  id: string;
  title: string;
  description: string;
  category: string;
  totalDurationMin: number;
  totalLessons: number;
  longDescription?: string;
  modules: Module[];
}

export const CATEGORIES = ["All", "Foundations", "Engineering", "Business", "Development"];

export const COURSES_METADATA: Record<string, CourseMetadata> = {
  'course-101': {
    id: 'course-101',
    title: "AI Foundations: The New Literacy",
    description: "A comprehensive deep dive into what AI is, why it matters, and how to become fluent in the tools of the future.",
    longDescription: "This course establishes the bedrock of your AI knowledge. We move beyond buzzwords to rigorously define Artificial Intelligence, explore its history, and map out the current ecosystem of tools. You will attain 'AI Fluency'—the ability to understand, discuss, and effectively use AI technologies.",
    category: "Foundations",
    totalDurationMin: 180,
    totalLessons: 9,
    modules: [
      {
        title: "Module 1: Introduction to AI",
        lessons: [
            {
                id: '101-1-1',
                title: "What is Artificial Intelligence?",
                duration: "20 min",
                type: 'text',
                content: `# What is Artificial Intelligence?

Artificial Intelligence (AI) is not just a technology; it is a transformative force comparable to electricity or the internet. At its core, AI is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning (the acquisition of information and rules for using the information), reasoning (using rules to reach approximate or definite conclusions), and self-correction.

### The Spectrum of AI

To understand AI, we must distinguish between its distinct types:

1.  **Narrow AI (ANI):** This is the AI responsible for the "smart" features we see today. It is designed to perform a narrow task, such as facial recognition, internet searches, or driving a car. It operates under a limited set of constraints and cannot perform outside its specific programming. Siri, Alexa, and even sophisticated systems like AlphaGo are examples of Narrow AI.
2.  **General AI (AGI):** This is the theoretical future of AI—a machine with the ability to apply intelligence to any problem, much like a human being. AGI would have a self-aware consciousness and the ability to solve problems, plan, and learn in uncertain environments. We are not there yet.
3.  **Superintelligent AI (ASI):** A hypothetical stage where machine intelligence surpasses human intelligence across all fields, including scientific creativity, general wisdom, and social skills.

### Key Components

*   **Algorithms:** A set of instructions that a computer follows to solve a problem.
*   **Data:** The fuel for AI. Systems need vast amounts of data to 'learn' patterns.
*   **Compute Power:** The processing capability required to analyze data and run algorithms.

In this lesson, we will focus on **Narrow AI**, as it is the reality of the current technological landscape. It is the engine behind recommendations on Netflix, fraud detection in banks, and the medical imaging software detecting diseases with superhuman accuracy.`
            },
            {
                id: '101-1-2',
                title: "A Brief History of Intelligence",
                duration: "25 min",
                type: 'text',
                content: `# A Brief History of Intelligence

The quest to create thinking machines is as old as storytelling itself, but the scientific pursuit began in earnest in the 20th century.

### The Logic Theorists (1950s)
The term "Artificial Intelligence" was coined in 1956 at the Dartmouth Conference. Early optimism was high. Researchers like Alan Turing asked, "Can machines think?" (The Turing Test). They built systems that could solve logic puzzles and play checkers. These were "Rule-Based Systems"—if X happens, do Y.

### The AI Winters (1970s - 1990s)
Expectations outpaced reality. Machines couldn't handle the ambiguity of the real world. Funding dried up. This period is known as an 'AI Winter'. Rule-based systems were too brittle; they couldn't learn.

### The Rise of Machine Learning (1990s - 2000s)
A paradigm shift occurred. Instead of programming rules, scientists began programming systems to *learn* rules from data. The explosion of the internet provided the data, and Moore's Law provided the computing power. IBM's Deep Blue defeated Garry Kasparov in chess in 1997, a landmark moment for symbolic AI.

### The Deep Learning Revolution (2010s - Present)
In 2012, a neural network named AlexNet crushed the competition in image recognition. This proved the power of "Deep Learning"—layered neural networks that mimic the human brain. This triggered the current boom, leading to AlphaGo, self-driving cars, and eventually, the Large Language Models like GPT-4 we see today.`
            },
            {
                id: '101-1-3',
                title: "Types of AI: Predictive vs Generative",
                duration: "15 min",
                type: 'text',
                content: `# Predictive vs. Generative AI

Understanding the distinction between these two is critical for modern AI fluency.

### Predictive AI
For the last decade, most corporate AI was **Predictive**.
*   **Goal:** Analyze past data to make a prediction about the future or categorize current data.
*   **Function:** It takes an input (e.g., a credit card transaction) and maps it to a class (e.g., Fraud or Not Fraud).
*   **Use Cases:**
    *   Forecasting stock prices.
    *   Recommending products (Amazon, Netflix).
    *   Predicting equipment failure (Predictive Maintenance).

### Generative AI
The recent wave, led by models like GPT and Midjourney, is **Generative**.
*   **Goal:** Create *new* data that resembles the training data.
*   **Function:** It learns the underlying structure and patterns of the data (e.g., the structure of English sentences or the pixels in a photo) to generate novel outputs.
*   **Use Cases:**
    *   Writing marketing copy or code.
    *   Designing logos and art.
    *   Composing music.

**Key Difference:** Predictive AI acts as an Analyst. Generative AI acts as a Creator.`
            }
        ]
      },
      {
        title: "Module 2: AI Fluency",
        lessons: [
             {
                id: '101-2-1',
                title: "Thinking Algorithmically",
                duration: "20 min",
                type: 'text',
                content: `# Thinking Algorithmically

AI Fluency isn't just about using tools; it's about understanding how the machine thinks so you can guide it.

### The Black Box Problem
Modern AI, especially Deep Learning, is often a "Black Box". We know the input and the output, but the internal decision-making is complex and opaque. However, we know it relies on **Probabilistic Thinking**.
AI doesn't deal in certainties. It deals in probabilities. When a model says "This is a cat," it's actually calculating, "There is a 99.4% probability this arrangement of pixels matches the pattern of a cat."

### Garbage In, Garbage Out (GIGO)
This is the golden rule. If you train a model on biased data, you get a biased model. If you verify a fact with a hallucinating AI, you get misinformation.
*   **Fluency Skill:** Always evaluate the source data and the training cutoff of the model you are using.

### The Human-in-the-Loop
AI is a tool for augmentation, not just automation. The most effective workflow is often:
1.  **AI Drafts:** The AI generates ideas, code, or text.
2.  **Human Refines:** The human applies judgment, context, and ethics.
3.  **AI Polishes:** The AI fixes grammar or formats the output.
This recursive loop is where true productivity lies.`
             },
             {
                 id: '101-2-2',
                 title: "Hype vs. Reality",
                 duration: "15 min",
                 type: 'text',
                 content: `# Navigating Hype vs. Reality

To be AI fluent is to be a skeptic and an optimist simultaneously.

### The Hype Cycle
Gartner's Hype Cycle explains how technology matures.
1.  **Innovation Trigger:** A breakthrough (e.g., ChatGPT launch).
2.  **Peak of Inflated Expectations:** "AI will solve world hunger and replace all writers by Tuesday."
3.  **Trough of Disillusionment:** "AI makes mistakes, it's useless."
4.  **Slope of Enlightenment:** "Oh, it's actually really good for X and Y."
5.  **Plateau of Productivity:** Mainstream adoption.

We are currently fluctuating between the Peak and the Trough depending on the specific tool.

### Common Myths
*   **Myth:** AI actually "knows" things.
*   **Reality:** AI predicts the next word based on statistical patterns. It has no concept of truth, only likely patterns.
*   **Myth:** AI is objective.
*   **Reality:** AI reflects the biases of the internet data it was trained on.`
             }
        ]
      },
      {
        title: "Module 3: AI Tools & Ecosystem",
        lessons: [
            {
                id: '101-3-1',
                title: "The Modern AI Stack",
                duration: "20 min",
                type: 'text',
                content: `# The Modern AI Tech Stack

The AI ecosystem is vast. Here is how it is structured:

### 1. The Foundation Models (The Brains)
These are the massive models trained on the internet.
*   **Proprietary:** OpenAI (GPT-4), Anthropic (Claude 3), Google (Gemini).
*   **Open Source:** Meta (Llama 3), Mistral.

### 2. The Infrastructure (The Hardware)
Where the models run.
*   **NVIDIA:** The absolute king of AI hardware (GPUs).
*   **Cloud Providers:** AWS, Azure, Google Cloud.

### 3. The Application Layer (The Interfaces)
How we interact with the models.
*   **Chatbots:** ChatGPT, Perplexity.
*   **Coding Assistants:** GitHub Copilot, Cursor.
*   **Creative Suites:** Midjourney, Runway ML, Adobe Firefly.

### 4. Orchestration (The Glue)
Tools that connect LLMs to data.
*   **LangChain:** A framework for chaining AI commands.
*   **Vector Databases:** Pinecone, Weaviate (for storing memory).`
            },
            {
                id: '101-3-2',
                title: "Choosing the Right Tool",
                duration: "15 min",
                type: 'text',
                content: `# Choosing the Right Tool for the Job

Not all AIs are created equal.

### For Reasoning and Writing
*   **Claude 3 Opus:** Currently top-tier for nuance, creative writing, and large context (reading whole books).
*   **GPT-4o:** Best for general logic, reasoning, and being a "Jack of all trades."

### For Coding
*   **Claude 3.5 Sonnet:** Extremely capable at writing and debugging code.
*   **GPT-4o:** Very strong, especially with Python and boilerplate.

### For Research
*   **Perplexity:** The go-to for factual queries. It searches the web in real-time and cites sources. Do not use standard ChatGPT for current events without web browsing enabled.

### For Visuals
*   **Midjourney:** The highest aesthetic quality for artistic generation.
*   **DALL-E 3:** Best for following complex prompt instructions effortlessly.`
            }
        ]
      }
    ]
  },
  'course-102': {
    id: 'course-102',
    title: "Core Mechanics: ML & Deep Learning",
    description: "Peeling back the layers of the neural network. Understand how machines actually learn.",
    category: "Engineering",
    totalDurationMin: 150,
    totalLessons: 6,
    modules: [
        {
            title: "Module 1: Machine Learning",
            lessons: [
                {
                    id: '102-1-1',
                    title: "Supervised vs Unsupervised Learning",
                    duration: "25 min",
                    type: 'text',
                    content: `# Supervised vs Unsupervised Learning

Machine Learning (ML) is the subset of AI where computers learn from data without being explicitly programmed.

### Supervised Learning
This is the most common type. It's like learning with a teacher.
*   **The Setup:** You have input data (X) and correct output labels (Y).
*   **The Goal:** Learn the mapping function from X to Y.
*   **Example:** Spam Filters.
    *   *Input:* Email text.
    *   *Label:* "Spam" or "Not Spam".
    *   The model looks at thousands of labeled emails and figures out that "Buy Rolex Now!!" usually maps to "Spam".

### Unsupervised Learning
Learning without a teacher.
*   **The Setup:** You only have input data (X). No labels.
*   **The Goal:** Find hidden structures or patterns in the data.
*   **Example:** Customer Segmentation.
    *   *Input:* Customer purchasing history.
    *   *Output:* Grouping customers into clusters (e.g., "Weekend Shoppers", "Tech Enthusiasts") without being told these groups exist beforehand.`
                },
                {
                    id: '102-1-2',
                    title: "Reinforcement Learning",
                    duration: "20 min",
                    type: 'text',
                    content: `# Reinforcement Learning (RL)

This is learning by trial and error, inspired by behavioral psychology.

### The Loop
1.  **Agent:** The AI (e.g., a chess bot).
2.  **Environment:** The world it operates in (e.g., the chess board).
3.  **Action:** A move the agent takes.
4.  **Reward/Penalty:** The feedback. (Win = +10 pts, Lose = -10 pts).

### How it Works
The agent plays millions of games against itself. At first, it moves randomly. Eventually, it discovers that certain sequences of moves lead to a "Reward". It reinforces these pathways.
This is how **AlphaGo** learned to beat the world champion at Go. It wasn't taught "good strategy" by humans; it discovered independent strategies by maximizing its reward function.`
                }
            ]
        },
        {
            title: "Module 2: Deep Learning",
            lessons: [
                {
                    id: '102-2-1',
                    title: "Neural Networks Explained",
                    duration: "30 min",
                    type: 'text',
                    content: `# Neural Networks Explained

Deep Learning relies on Artificial Neural Networks (ANNs), inspired by biological neurons in the brain.

### The Perceptron
The simplest unit.
1.  **Inputs:** Numbers entering the neuron.
2.  **Weights:** How important each input is.
3.  **Activation Function:** Decides if the neuron "fires" (outputs a signal).

### The Network
Imagine layers of these neurons:
1.  **Input Layer:** Takes the raw data (e.g., pixels of an image).
2.  **Hidden Layers:** Where the magic happens. In "Deep" learning, there are many of these. Each layer abstracts the data further.
    *   *Layer 1* might detect edges.
    *   *Layer 2* detects shapes (circles, squares).
    *   *Layer 3* detects features (eyes, noses).
3.  **Output Layer:** The final decision ("It's a cat").

### Backpropagation: The Secret Sauce
How does it "learn"?
1.  The network makes a guess.
2.  We calculate the **Error** (how wrong was it?).
3.  We use calculus/math to go *backward* through the network, adjusting the **Weights** of every connection slightly to reduce that error next time.
4.  Repeat millions of times.`
                },
                {
                    id: '102-2-2',
                    title: "The Transformer Architecture",
                    duration: "30 min",
                    type: 'text',
                    content: `# The Transformer Architecture

This is the architecture that changed everything. Published by Google in 2017 ("Attention Is All You Need"), it is the "T" in GPT.

### The Problem with RNNs
Before Transformers, we used Recurrent Neural Networks (RNNs) for language. They read words one by one: "The", "cat", "sat"...
They tended to forget the beginning of a long sentence by the time they reached the end. They couldn't handle context well.

### The Solution: "Attention"
Transformers read the entire sentence at once (parallel processing).
The **Self-Attention Mechanism** allows the model to look at every word and decide how much "attention" to pay to every other word.

*Example:* "The animal didn't cross the street because **it** was too tired."
*   When the model processes "it", the Attention mechanism links it strongly to "animal".
*   If the sentence was "The animal didn't cross the street because **it** was too wide," the Attention links "it" to "street".

This ability to understand context and relationships between distant words is why modern LLMs are so coherent.`
                }
            ]
        },
        {
            title: "Module 3: Natural Language Processing",
            lessons: [
                {
                    id: '102-3-1',
                    title: "Tokenization & Embeddings",
                    duration: "25 min",
                    type: 'text',
                    content: `# Tokenization & Embeddings

How do computers read? They don't understand letters; they understand numbers.

### Tokenization
The process of breaking text into chunks called Tokens.
*   A token can be a word ("apple"), part of a word ("ing"), or a character.
*   Rough rule of thumb: 1,000 tokens ≈ 750 words.
*   The model processes these tokens as integers (e.g., "Apple" = ID 4521).

### Embeddings (Vector Space)
This is one of the most beautiful concepts in AI.
Once we have tokens, how do we represent their *meaning*?
We turn them into **Vectors** (lists of numbers coordinates).
Imagine a 3D graph.
*   The coordinates for "King" might be close to "Queen".
*   The coordinates for "Apple" are far away from "King" but close to "Orange".
*   **Vector Math:** The concept allows for math with meaning:
    *   *King - Man + Woman = Queen*
    *   In the vector space, if you subtract the "Man-ness" vector from "King" and add "Woman-ness", you mathematically arrive at the coordinates for "Queen".`
                }
            ]
        }
    ]
  },
  'course-103': {
    id: 'course-103',
    title: "Generative AI Masterclass",
    description: "From LLMs to Diffusion models. Mastering the engines of creation.",
    category: "Development",
    totalDurationMin: 200,
    totalLessons: 8,
    modules: [
        {
            title: "Module 1: Large Language Models",
            lessons: [
                 {
                    id: '103-1-1',
                    title: "How LLMs are Trained",
                    duration: "30 min",
                    type: 'text',
                    content: `# How LLMs are Trained

Training a model like GPT-4 happens in stages.

### Stage 1: Pre-training (The Costly Part)
*   **Data:** Trillions of words from the internet (Common Crawl, Wikipedia, Books, Code).
*   **Task:** Next-Token Prediction. "The sky is [?]."
*   The model creates its internal understanding of the world solely by trying to guess the next word.
*   **Result:** A "Base Model". It is very smart but unruly. If you ask "How to make a cake?", it might respond with "How to make a pie?" because it thinks it's completing a list of questions.

### Stage 2: Fine-Tuning (Instruction Tuning)
*   Humans curate high-quality datasets of (Question, Answer) pairs.
*   The model creates a behavior layer: "When asked a question, provide a helpful answer."

### Stage 3: RLHF (Reinforcement Learning from Human Feedback)
*   The model generates several answers.
*   Humans rank them: "Answer A is better than Answer B."
*   This aligns the model with human values (helpfulness, honesty, safety).`
                 },
                 {
                    id: '103-1-2',
                    title: "Context Windows & Hallucinations",
                    duration: "20 min",
                    type: 'text',
                    content: `# Context Windows & Hallucinations

### The Context Window
This is the "Short-Term Memory" of the AI.
When you chat with ChatGPT, it re-reads the entire conversation every time you send a new message.
*   **Limit:** There is a limit to how much text it can process at once.
*   **Evolution:** Early models handled ~3,000 words. GPT-4 Turbo handles ~128,000 tokens (300 pages of a book). Gemini 1.5 Pro handles millions (video/audio).
*   Once the conversation exceeds the window, the AI "forgets" the beginning.

### Hallucinations
When an LLM makes things up confidently.
*   **Why?** Remember, it is a probabilistic engine, not a database. It is trying to complete a pattern. If the most likely pattern for a bio of a fake person includes "graduated from Harvard," it will say that.
*   **Mitigation:**
    *   Use Retrieval-Augmented Generation (RAG) to provide facts.
    *   Ask the model to "think step-by-step".`
                 }
            ]
        },
         {
            title: "Module 2: Prompt Engineering",
            lessons: [
                 {
                    id: '103-2-1',
                    title: "Principles of Prompting",
                    duration: "25 min",
                    type: 'text',
                    content: `# Principles of Prompting

Prompt Engineering is the art of talking to the latent space.

### The Core Elements of a Mega-Prompt
1.  **Persona:** Who is the AI? ("Act as a Senior Python Engineer...")
2.  **Context:** What is the background? ("I am building a web app for...")
3.  **Task:** What exactly do you want? ("Write a function to...")
4.  **Constraints:** What should it avoid? ("Do not use external libraries...")
5.  **Format:** How should the output look? ("Output as a markdown code block...")
6.  **Exemplars (Few-Shot Prompting):** Give examples. ("Input: A, Output: B. Input: C, Output: D.")

### Chain of Thought (CoT)
Ask the model to "Think step by step."
This forces the model to generate more tokens (reasoning) before arriving at the final answer, significantly reducing logic errors.`
                 }
            ]
        },
        {
           title: "Module 3: Generative AI (Images & Video)",
           lessons: [
               {
                   id: '103-3-1',
                   title: "Diffusion Models Explained",
                   duration: "20 min",
                   type: 'text',
                   content: `# Diffusion Models Explained

How do tools like Midjourney create images?

### The Noise Process
Imagine taking a clear photograph and slowly adding static (noise) to it until it is just random grey snow.
Diffusion models learn to reverse this process.
1.  **Training:** They look at millions of images and learn how to "denoise" them.
2.  **Generation:** To create an image, they start with pure random static.
3.  **Guidance:** They slowly remove the noise, guided by your text prompt ("A cat in space").
4.  **Result:** A crisp, new image emerges from the chaos.`
               }
           ]
        }
    ]
  },
  'course-104': {
    id: 'course-104',
    title: "Future Skills: Automation & Vibe Coding",
    description: "The cutting edge. How to code with AI and build autonomous agentic workflows.",
    category: "Development",
    totalDurationMin: 180,
    totalLessons: 5,
    modules: [
        {
            title: "Module 1: Automation & Agents",
            lessons: [
                 {
                    id: '104-1-1',
                    title: "What are AI Agents?",
                    duration: "25 min",
                    type: 'text',
                    content: `# What are AI Agents?

A Chatbot talks. An Agent **does**.

### The Anatomy of an Agent
1.  **Brain (LLM):** The core reasoning engine (e.g., GPT-4).
2.  **Tools:** Functions the agent can call (Calculator, Web Search, API requests).
3.  **Planning:** The ability to break a goal into steps.
    *   *Goal:* "Book me a flight to toxicity."
    *   *Plan:* Search flights -> Check calendar -> Compare prices -> Execute booking.
4.  **Memory:** Remembering past interactions.

### Agentic Workflows
Instead of one AI doing everything, we are moving to multi-agent functional teams.
*   *Agent A (Researcher):* Scours the web for info.
*   *Agent B (Writer):* Drafts a report based on Agent A's notes.
*   *Agent C (Editor):* Critiques Agent B's work.
This mimics human organizational structures.`
                 },
                 {
                     id: '104-1-2',
                     title: "Building Automations (Zapier/Make)",
                     duration: "20 min",
                     type: 'text',
                     content: `# Building Automations

You don't need to be a coder to build AI apps.
Tools like **Zapier** and **Make.com** allow you to chain AI into workflows.

### Example Workflow
1.  **Trigger:** A new email arrives in Gmail.
2.  **Step 1 (Parser):** Send email body to ChatGPT. Prompt: "Summarize this and extract action items."
3.  **Step 2 (Router):**
    *   If "Urgent": Send Slack DM to me.
    *   If "Sales": Add to CRM (HubSpot).
    *   If "Newsletter": draft a reply.

This is the essence of "Invisible AI"—AI that works in the background of your business.`
                 }
            ]
        },
        {
            title: "Module 2: Vibe Coding",
             lessons: [
                 {
                    id: '104-2-1',
                    title: "Intro to Vibe Coding",
                    duration: "25 min",
                    type: 'text',
                    content: `# Introduction to Vibe Coding

"Vibe Coding" is a new philosophy of software development where the human acts as the **Architect** and **Reviewer**, while the AI acts as the **Typist** and **Implementer**.

### The Shift
*   **Old Way:** Memorize syntax, write every bracket, debug missing semicolons.
*   **New Way:** Describe the "Vibe" (Functionality + Aesthetic), iterate on the output, handle the logic.

### Cursor & Composer
The tool that defines Vibe Coding is **Cursor** (and specifically its 'Composer' feature).
It allows you to edit multiple files simultaneously using natural language.
*   *Prompt:* "Change the authentication page to look like a glassmorphic dashboard, and ensure the login button spins while loading."
*   The AI understands the context of your entire codebase and applies the changes.

### Mastery in Vibe Coding
It is not "no-code". It requires **higher-level technical literacy**.
You need to know:
1.  **System Design:** How pieces fit together.
2.  **Debugging:** How to read error logs to paste them back into the AI.
3.  **Code Review:** Knowing when the AI is writing insecure or inefficient code.`
                 }
             ]
        }
    ]
  }
};

export const COURSES_LIST = Object.values(COURSES_METADATA);

export const getCourseMetadata = (courseId: string) => {
  return COURSES_METADATA[courseId] || {
    id: courseId,
    title: "Unknown Course",
    description: "Course details not available",
    category: "Unknown",
    totalDurationMin: 0,
    totalLessons: 0,
    modules: []
  };
};
