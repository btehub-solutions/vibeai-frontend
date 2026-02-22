import { Course } from "../course-types";

export const course8: Course = {
  id: 8,
  title: "AI Automation Agents (AAA): Workflow Automation",
  description: "Build robust AI agents that can plan, execute, and automate complex workflows.",
  longDescription: "Step into the future of work. Learn to build AI agents that don't just chat, but *do*. Master automation tools like Zapier and Make, and build custom agents with LangChain that can browse the web, use tools, and autonomous complete tasks.",
  progress: 0,
  lessons: 28,
  completedLessons: 0,
  duration: "10 hours",
  category: "Business",
  prerequisites: ["Chatbots", "Advanced Prompt Engineering"],
  learningOutcomes: [
    "Design automated workflows",
    "Build autonomous AI agents",
    "Integrate AI with external tools (APIs)",
    "Deploy multi-agent systems"
  ],
  modules: [
    {
      title: "Module 1: Automation Fundamentals",
      lessons: [
        { 
          id: "c8-m1-l1",
          title: "Introduction to AI Agents", 
          duration: "20 min",
          type: "reading",
          content: `
# MODULE 1 — Automation Fundamentals
**Learning Objectives:**
* Differentiate between passive Chatbots and active AI Agents.
* Understand the core anatomy of an agent (Brain, Memory, Tools).
* Master the ReAct (Reason + Act) loop execution framework.

---

## Lesson 1 — Introduction to AI Agents

### Definition / Explanation:

**Point 1: The Active Executor**
An AI Agent is a sophisticated system that can perceive its environment, reason about how to achieve a specific goal, and autonomously take actions to realize that goal. Unlike traditional software that follows a strict programmatic path (if X then Y), AI agents leverage Large Language Models (LLMs) as their core reasoning engine to handle dynamic, unpredictable tasks.

**Point 2: Anatomy of an Agent**
To understand agents, we must look at their core components:
1. **The Brain (LLM):** The reasoning engine that processes inputs, formulates plans, and decides on the next steps.
2. **Memory:** Short-term (the context window of the current task) and Long-term (Vector databases allowing the agent to recall past experiences).
3. **Tools (Actuators):** Extensions that allow the agent to interact with the outside world, such as Web Browsers, Calculators, Code Interpreters, and external APIs (Google Calendar, Slack).

### Key Points:
*   **Chatbot vs Agent:** A Chatbot is a passive responder ("Here is the answer"). An Agent is an active executor ("I have researched the topic, booked the meeting, and sent the calendar invite").
*   **The ReAct Framework:** Agents operate on continuous loops of reasoning and execution: Observe -> Think -> Act -> Repeat.
*   **Autonomy:** Agents can self-correct. If a tool fails (e.g., a web search returns an error), the agent can read the error, rethink, and try a different tool.

### Examples / Use Cases:

*   **Example 1: The Research Agent:** A user asks, "What was Apple's Q3 revenue?" The agent uses a Web Search tool, reads the financial report, extracts the number, and delivers the final validated answer.
*   **Example 2: The Scheduling Agent:** An agent reads an inbound email, checks the user's Google Calendar for free slots, drafting a reply proposing three times, and creating a draft calendar event.

### Visuals:

[IMAGE: A comparative table illustrating the differences between Chatbots (passive, single-turn, no tools) and AI Agents (active, multi-step, tool-equipped).]

[IMAGE: A workflow diagram illustrating the ReAct (Reason + Act) loop: Observe -> Think -> Act -> Observe Result.]

### Implementation / Hands-On:

*   **Step 1:** Define a tedious multi-step task you perform weekly (e.g., pulling reports from Shopify and emailing them to a team).
*   **Step 2:** Break that task down into pseudo-code following the ReAct framework. Write out exactly what an agent would need to Observe, Think, and what Tools it would need to Act.

### Summary / Key Takeaways:

*   Agents are a paradigm shift from generative text to autonomous action.
*   An LLM acts as the "brain," but tools act as the "hands."
*   The ReAct loop allows agents to handle unforeseen errors gracefully.

### Optional Exercises / Prompts:

*   **Exercise 1:** Act as the "Brain" of an agent. You have two tools: [Search_Google] and [Calculator]. A user asks: "If I buy 3 shares of Tesla at their current price, how much will it cost?" Write out your step-by-step Thought and Action process to reach the answer.
          `
        },
        { 
          id: "c8-m1-l2",
          title: "Workflow Automation Tools", 
          duration: "24 min",
          type: "reading",
          content: `
## Lesson 2 — Workflow Automation Tools

### Definition / Explanation:

**Point 1: Deterministic No-Code Automation**
Before diving into complex, code-based autonomous AI agents (which can be unpredictable), it is essential to master deterministic workflow automation. No-code tools like Zapier and Make allow you to connect different apps and weave AI into standard, reliable business processes.

**Point 2: Core Concepts of Automation**
Regardless of the platform, automation relies on three fundamental blocks: 
1. **Triggers:** The event that starts the automation (e.g., "When a new lead is added to Salesforce"). 
2. **Filters/Searches:** Conditions that route the data (e.g., "Only continue if Lead Score > 50").
3. **Actions:** The task performed by the automation (e.g., "Send a Slack message").

### Key Points:
*   **Zapier:** The most popular, user-friendly platform. It relies predominantly on linear workflows (Zaps). Excellent for simple A-to-B data transfers with an AI step in the middle.
*   **Make (formerly Integromat):** Provides a powerful visual canvas favored for complex, non-linear workflows. It supports advanced Branching (Routers) and Iterators (processing lists of items).
*   **Integrating AI capabilities:** By embedding OpenAI API modules inside Zapier or Make workflows, you can create deterministic "mini-agents" that process customer support tickets, categorize data, or draft personalized emails securely.

### Examples / Use Cases:

*   **Example 1: The Zapier Auto-Responder:** Trigger: "New Lead submitted via Facebook Ads." -> Action 1: Extract Name. -> Action 2: Send Name to OpenAI to draft a welcoming email. -> Action 3: Send that email via Gmail automatically.
*   **Example 2: The Make Router:** Trigger: "New Support Ticket." -> Action 1: OpenAI analyzes sentiment. -> Router: If sentiment is 'Angry', escalate to Slack channel #urgent-support. If sentiment is 'Neutral', auto-reply with documentation link.

### Visuals:

[IMAGE: An interface mockup comparing a linear Zapier workflow (straight line of blocks) versus a complex Make scenario with a Router branching out to three different paths.]

### Implementation / Hands-On:

*   **Step 1:** Create a free account on Zapier or Make.
*   **Step 2:** Build a simple automation that triggers when you receive a specific email (e.g., subject contains "Invoice").
*   **Step 3:** Have the automation extract the attachment and automatically upload it to a specific Google Drive folder.

### Summary / Key Takeaways:

*   No-code automation is the reliable foundation upon which business AI is built.
*   Zapier is excellent for simple, linear tasks, while Make excels at complex, visual branching.
*   Using LLMs as intermediate "Actions" within these workflows unlocks massive efficiency.

### Optional Exercises / Prompts:

*   **Exercise 1:** Draw an automation flowchart on paper for your current job. Identify the Trigger, the necessary contextual Data, the AI action required (like summarizing or translating), and the final output Destination.
          `
        },
        {
          id: "c8-m1-l3",
          title: "Quiz: Automation Basics",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "What is the primary difference between a chatbot and an agent?",
              options: ["Chatbots are smarter", "Agents can take actions autonomously and use tools", "Chatbots process voice", "Agents are only for physical robotics"],
              correctAnswer: "B",
              explanation: "While standard chatbots simply provide conversational information, AI agents have the agency to use tools, execute tasks, and interact with the outside world autonomously."
            },
            {
              id: "q2",
              text: "In the ReAct framework, what does the 'Think' step primarily represent?",
              options: ["Executing a python script", "The LLM reasoning about the current observation to decide the next step", "Waiting for user input", "Triggering a Zapier webhook"],
              correctAnswer: "B",
              explanation: "The 'Think' step is where the LLM evaluates the observation and plans its next action."
            }
          ]
        }
      ]
    },
    {
      title: "Module 2: Building Agents with LangChain",
      lessons: [
        { 
          id: "c8-m2-l1",
          title: "LangChain Agents in Depth", 
          duration: "30 min",
          type: "reading",
          content: `
# MODULE 2 — Building Agents with LangChain
**Learning Objectives:**
* Architect custom agents using the LangChain developer framework.
* Define and bind custom Tools to an AgentExecutor.
* Understand the cognitive architecture behind AutoGPT and autonomous goal-seeking.

---

## Lesson 1 — LangChain Agents in Depth

### Definition / Explanation:

**Point 1: The Developer Standard**
**LangChain** is the industry-standard software framework (available in Python and JavaScript) for building context-aware, reasoning applications powered by LLMs. It standardizes the chaotic process of chaining LLM calls, memory, and tools together.

**Point 2: Decoding the Architecture**
In LangChain, an Agent involves several orchestrated abstractions working in harmony:
1. **The Agent Core:** The core logic that parses the prompt, injects variables, and decides what tool to select.
2. **Tools:** Functions explicitly defined for the agent. A tool has a 'name', a 'description' (which the LLM reads to know when to use it), and the executable python/JS code.
3. **AgentExecutor:** The runtime environment that manages the loop. It passes the prompt to the LLM, executes the requested tool, observes the result, and feeds the result back to the LLM.

### Key Points:
*   **Zero-Shot ReAct Agents:** The most standard formulation. They decide what to do based solely on the current prompt and the descriptions of the tools available. Good for stateless execution.
*   **OpenAI Functions Agent:** Leverages OpenAI's native "function calling" API, making the framework extremely reliable and fast at structuring JSON outputs for precise tool execution.
*   **Conversational Agents:** Includes chat history memory into the execution loop, allowing for follow-up questions and ongoing contextual dialogue while still maintaining the ability to use tools.

### Examples / Use Cases:

*   **Example 1: The Execution Trace:**
    *   *User Prompt:* "Calculate the square root of Patrick Mahomes' jersey number."
    *   *Thought 1:* I need to find Patrick Mahomes' jersey number.
    *   *Action 1:* Use Tool [Search_Google] -> Output: "15".
    *   *Thought 2:* I need to calculate the square root of 15.
    *   *Action 2:* Use Tool [Calculator] -> Output: "3.87".
    *   *Final Answer:* "The square root of his jersey number is 3.87."

### Visuals:

[IMAGE: A flowchart showing the LangChain AgentExecutor loop mapping the interaction between the LLM Core, the Tool library, and the Output Parser.]

### Implementation / Hands-On:

*   **Step 1:** Review the LangChain documentation regarding "Tools".
*   **Step 2:** Write a functional Python or JavaScript method definition for a custom tool (e.g., \`def fetch_stock_price(ticker): ...\`).
*   **Step 3:** Write the docstring for this method carefully. Remember, the LLM reads the docstring to understand *when* it should invoke this tool.

### Summary / Key Takeaways:

*   LangChain abstracts the complex loops required to make LLMs interact with external APIs.
*   Tools must have extremely explicit descriptions so the LLM reasoning engine knows how and when to use them.
*   The AgentExecutor manages the multi-step reasoning pathway until a final answer is achieved.

### Optional Exercises / Prompts:

*   **Exercise 1:** If you were building a "Customer Support Agent" in LangChain, list three distinct Tools you would need to build for it to successfully handle order tracking and refunds.
          `
        },
        { 
          id: "c8-m2-l2",
          title: "AutoGPT and Autonomous Goal Seekers", 
          duration: "28 min",
          type: "reading",
          content: `
## Lesson 2 — AutoGPT and Autonomous Goal Seekers

### Definition / Explanation:

**Point 1: The Shift to General Autonomy**
While LangChain agents often execute specific, bounded requests ("Check the weather and email it to me"), projects like **AutoGPT** and **BabyAGI** introduced the concept of open-ended, fully autonomous goal seekers. You do not give them a specific step-by-step task; you give them an overarching **Role** and a final **Goal**.

**Point 2: The Cognitive Architecture**
An autonomous goal seeker dynamically breaks down a monumental goal into smaller tasks without human intervention:
1. **Task Creation:** The agent looks at the Goal and generates a prioritized list of tasks required to achieve it.
2. **Execution (The Worker):** The agent takes the top task and executes it using its available tools.
3. **Observation & Memory:** The result of the task is saved to a Vector Database (Long-term memory).
4. **Recursive Loop:** The agent evaluates the result against the original Goal, creates *new* tasks based on what it learned, prioritizes the queue, and continues working until the Goal is explicitly met.

### Key Points:
*   **Goal vs Task:** A human sets the broad Goal ("Increase my Twitter following"). The AI generates the sub-tasks ("Research trends", "Draft tweets", "Post tweets").
*   **Infinite Loops:** The greatest risk of autonomous agents. They can easily get stuck executing the exact same failed web search indefinitely if not properly constrained through coding.
*   **Compounding Errors (Hallucination Drift):** A slight hallucination in step 2 of a 50-step autonomous loop can completely derail the entire project by step 40, rendering the output useless.

### Examples / Use Cases:

*   **Example 1: The Auto-Researcher:** Goal: "Compile a 5-page report on the competitive landscape of AI startups in agriculture." The agent dynamically browses funding sites, reads company websites, synthesizes summaries, and outputs a formatted file without any intermediate human prompting.

### Visuals:

[IMAGE: A loop diagram illustrating the BabyAGI architecture: Task Prioritizer -> Task Executor -> Result Evaluator -> Task Creator -> Back to Prioritizer.]

### Implementation / Hands-On:

*   **Step 1:** Download an open-source autonomous agent framework (like AutoGPT) from GitHub or use a cloud-hosted version like AgentGPT.
*   **Step 2:** Provide it with a safe, non-destructive Goal (e.g., "Research the history of the Apollo 11 mission and summarize the key engineering challenges into a text file").
*   **Step 3:** Watch the agent's thought process live in the terminal to observe how it creates and executes its own task queue.

### Summary / Key Takeaways:

*   Autonomous goal seekers move beyond step-by-step instructions into holistic problem-solving.
*   They rely on recursive loops of task generation, prioritization, and execution.
*   For enterprise use cases, fully autonomous behavior is often too unpredictable and expensive compared to tightly scoped LangChain agents.

### Optional Exercises / Prompts:

*   **Exercise 1:** Act as the "Task Creator" node. The overarching Goal is: "Plan a 3-day vacation to Tokyo for under $1000." Write down the first five prioritized sub-tasks you would assign to the Execution node.
          `
        }
      ]
    },
    {
      title: "Module 3: Multi-Agent Systems",
      lessons: [
        { 
          id: "c8-m3-l1",
          title: "Swarm Intelligence & CrewAI", 
          duration: "28 min",
          type: "reading",
          content: `
# MODULE 3 — Multi-Agent Systems
**Learning Objectives:**
* Overcome individual LLM cognitive overload using Multi-Agent Systems (MAS).
* Define distinct Agent roles, tasks, and tools within CrewAI.
* Orchestrate hierarchical and sequential workflows for complex automation.

---

## Lesson 1 — Swarm Intelligence & CrewAI

### Definition / Explanation:

**Point 1: The Problem of Cognitive Overload**
The major limitation of a single AI agent is cognitive overload. Attempting to prompt one single LLM to simultaneously act as an expert researcher, an imaginative creative writer, and a meticulous editor dilutes its performance. It loses focus, hallucinates, and produces generic results. The solution is dividing the labor into **Multi-Agent Systems (MAS)**.

**Point 2: Role-Playing Agents**
Systems like **CrewAI** and Microsoft's **AutoGen** solve highly complex business problems by orchestrating a "team" of specialized, role-playing agents. Each agent is given a specific, narrow persona and communicates back and forth with other agents to complete a massive overarching goal.

### Key Points:
*   **Agents (The Workers):** Standalone entities configured with a defined 'Role', a detailed 'Backstory' (to guide their tone), and a specific 'Goal'.
*   **Tasks (The Assignments):** Granular assignments mapped to specific agents. Tasks explicitly define what needs to be done and what the final output must look like.
*   **Tools (Capabilities):** Specific capabilities granted *only* to the relevant agents (e.g., only the Researcher gets the Web Search tool; the Editor does not need it).
*   **The Crew (The Manager):** The orchestrator that binds the agents and tasks together, dictating the workflow (Sequential or Hierarchical).

### Examples / Use Cases:

*   **Example 1: The Content Machine:** Consider building an autonomous blog publishing crew:
    *   *Agent 1 (Researcher):* Goal: Find latest AI news. Tools: Web Scraper.
    *   *Agent 2 (Copywriter):* Goal: Draft an engaging post from the research. Tools: None.
    *   *Agent 3 (Editor):* Goal: Review grammar and save to file. Tools: File Writer.
*   **Example 2: Sequential Workflow:** The Researcher finishes Task 1, and passes the output to the Copywriter for Task 2, who passes it to the Editor for Task 3.

### Visuals:

[IMAGE: A hierarchical flowchart showing a 'Manager Agent' dynamically delegating distinct tasks to a 'Researcher Agent', 'Coder Agent', and 'QA Testing Agent', and reviewing their collective output.]

### Implementation / Hands-On:

*   **Step 1:** Outline a complex workflow in your industry (e.g., Software Development Lifecycle, Legal Contract Review, Marketing Campaign Launch).
*   **Step 2:** Break that workflow down into three distinct human roles.
*   **Step 3:** Define the parameters for those three Agents in a CrewAI structure: Write their exact 'Role', 'Backstory', and the 'Tools' they would require.

### Summary / Key Takeaways:

*   Multi-Agent Systems solve the context limitation and hallucination problems inherent in monolithic, single-agent setups.
*   Narrow framing and specific backstories ensure high-quality, specialized outputs.
*   Tools should be distributed strictly on a need-to-use basis to prevent agents from attempting tasks outside their expertise.

### Optional Exercises / Prompts:

*   **Exercise 1:** Write the system prompt (Backstory and Goal) for an incredibly strict, unforgiving "Chief Editor" agent designed to aggressively flag any marketing copy that sounds generic or "AI-generated."
          `
        },
        {
          id: "c8-m3-l2",
          title: "Quiz: Advanced automation",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "What framework is widely popular for creating teams of specialized, role-playing agents?",
              options: ["CrewAI", "LangChain Base", "Zapier", "Flowise"],
              correctAnswer: "A",
              explanation: "CrewAI is designed specifically to orchestrate role-playing autonomous AI agents into collaborative teams."
            },
            {
              id: "q2",
              text: "Why is a Multi-Agent System often preferable to a single, monolithic agent for complex workflows?",
              options: ["It runs faster on local machines", "It reduces cognitive overload by allowing specialized focus per agent", "It bypasses API rate limits", "It completely eliminates LLM hallucinations"],
              correctAnswer: "B",
              explanation: "Assigning specific, narrow personas and goals to individual agents prevents a single agent from losing context and diluting its performance over a complex, multi-step task."
            }
          ]
        }
      ]
    }
  ],
  projects: [
    {
      title: "Capstone: Enterprise Automation Platform",
      description: "Build a multi-agent workflow that automates a complex business process (e.g., hiring lifecycle, market research generation) utilizing CrewAI and external APIs.",
      duration: "8 hours",
      difficulty: "advanced"
    }
  ]
};
