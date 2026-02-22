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
# What is an AI Agent?

An AI Agent is a sophisticated system that can perceive its environment, reason about how to achieve a specific goal, and autonomously take actions to realize that goal. Unlike traditional software that follows a strict programmatic path (if X then Y), AI agents leverage Large Language Models (LLMs) as their core reasoning engine to handle dynamic, unpredictable tasks.

## Anatomy of an AI Agent

To understand agents, we must look at their core components:
*   **The Brain (LLM):** The reasoning engine that processes inputs, formulates plans, and decides on the next steps.
*   **Memory:** 
    * *Short-term:* Context window of the current conversation or task.
    * *Long-term:* Vector databases allowing the agent to recall past experiences or retrieve specific knowledge.
*   **Tools (Actuators):** Extensions that allow the agent to interact with the outside world. This can include Web Browsers, Calculators, Code Interpreters, and external APIs (like Google Calendar, Slack, or GitHub).

## Chatbots vs. AI Agents

It is crucial to differentiate between standard Chatbots and true AI Agents:

| Feature | Chatbot | AI Agent |
| :--- | :--- | :--- |
| **Role** | Passive responder. | Active executor. |
| **Capability** | "Here is the answer to your question." | "I have researched the topic, booked the meeting, and sent the invite." |
| **Reasoning** | Single-turn response based on prompt. | Multi-step reasoning loops, planning, and self-correction. |
| **Tools** | Usually none (or text-retrieval only). | Has access to software tools and web APIs. |

## The Core Agentic Loop

Agents operate on continuous reasoning and execution loops, the most famous being the **ReAct (Reason + Act)** framework:

1.  **Observe:** The agent receives input or reads the current state of its environment (e.g., reading an email, checking a calendar).
2.  **Think:** The LLM processes the observation and formulates a thought. *"I need to schedule a meeting with John next Tuesday, but I need to check my availability first."*
3.  **Act:** The agent selects a tool and executes it with specific parameters. *Calls Google Calendar API to check Tuesday's schedule.*
4.  **Repeat:** The outcome of the action becomes the new observation. The loop repeats until the ultimate goal is achieved.
          `
        },
        { 
          id: "c8-m1-l2",
          title: "Workflow Automation Tools", 
          duration: "24 min",
          type: "reading",
          content: `
# No-Code Automation: Zapier & Make

Before diving into complex, code-based autonomous agents, it is essential to master deterministic workflow automation. No-code tools like Zapier and Make allow you to connect different apps and weave AI into standard business processes.

## Core Concepts of Automation

Regardless of the platform, automation relies on three fundamental blocks:
1.  **Triggers:** The event that starts the automation. (e.g., *When a new email arrives*, *When a new row is added to Google Sheets*, *When a webhook is received*).
2.  **Searches/Filters:** Conditions that must be met to proceed, or looking up additional necessary data.
3.  **Actions:** The task performed by the automation. (e.g., *Send a Slack message*, *Create a CRM contact*).

## Deep Dive: Zapier

Zapier is the most popular, user-friendly automation platform. It works using Linear workflows called "Zaps".

**Example Zap with AI:**
*   **Trigger:** "New Lead submitted via Facebook Ads."
*   **Action 1 (Formatter):** Extract the first name and company.
*   **Action 2 (OpenAI):** Send the company name to ChatGPT with the prompt: *"Draft a personalized welcoming email for [First Name] highlighting how our services can help [Company]."*
*   **Action 3 (Gmail):** Send the generated email directly to the lead.

## Deep Dive: Make (formerly Integromat)

Make provides a powerful, visual canvas that is favored for complex, non-linear workflows.

**Advantages of Make:**
*   **Branching (Routers):** Send data down different paths based on conditions (e.g., if lead score > 50, send to Sales; otherwise, add to Newsletter).
*   **Iterators and Aggregators:** Process lists of items (like a batch of emails) individually, and summarize them back into a single output.
*   **Cost-Effective:** Often more scalable for high-volume tasks compared to Zapier.

By integrating OpenAI API modules inside Make, you can create "mini-agents" that process customer support tickets, generate reports, and translate content fully automatically.
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
# LangChain Agents

**LangChain** is the industry-standard developer framework for building context-aware, reasoning applications powered by LLMs.

## Decoding the Agent Architecture

In LangChain, an Agent isn't just a basic prompt; it involves several orchestrated abstractions:

1.  **The Agent Core:** The logic that powers decision making. This includes parsing the prompt, injecting variables, and deciding what tool to use.
2.  **Tools:** Functions explicitly defined for the agent. A tool has a 'name', a 'description' (which the LLM reads to know *when* to use it), and the executable code.
    *   *Example Tool:* 'get_weather(location)' - "Use this tool to get the current weather for a specific city."
3.  **AgentExecutor:** The runtime environment that runs the agent. It manages the loop of passing the prompt to the LLM, taking the requested action, running the tool, observing the result, and feeding it back to the LLM.

## Common Agent Types

*   **Zero-shot ReAct:** The standard agent. It decides what to do based solely on the current prompt and the descriptions of the tools available. It does not remember past interactions inherently.
*   **Conversational Agent:** Ideal for chatbots that can take action. It injects conversational memory (chat history) into the prompt alongside the reasoning steps.
*   **OpenAI Functions Agent:** Leverages OpenAI's native "function calling" API, making it extremely reliable and fast at structuring JSON outputs for tool execution.

## Example Execution Trace

User Prompt: *"Who is likely to win the next Superbowl? Calculate the square root of their star quarterback's jersey number."*

1.  **Thought:** I need to find out who is favorite to win the upcoming Superbowl, find their quarterback, get his jersey number, and calculate the square root.
2.  **Action:** Use Tool 'Search_Google' with input "Superbowl favorites".
3.  **Observation:** "The Kansas City Chiefs are current favorites."
4.  **Thought:** The Chiefs are the favorites. Now I need to find their star quarterback.
5.  **Action:** Use Tool 'Search_Google' with input "Kansas City Chiefs star quarterback".
6.  **Observation:** "Patrick Mahomes is the quarterback."
7.  **Thought:** I need Patrick Mahomes' jersey number.
8.  **Action:** Use Tool 'Search_Google' with input "Patrick Mahomes jersey number".
9.  **Observation:** "15".
10. **Thought:** I have the number 15. I need to calculate its square root.
11. **Action:** Use Tool 'Calculator' with input "sqrt(15)".
12. **Observation:** "3.8729".
13. **Final Answer:** The Chiefs are favorites, led by Patrick Mahomes (#15). The square root of his jersey number is approximately 3.87.
          `
        },
        { 
          id: "c8-m2-l2",
          title: "AutoGPT and Autonomous Goal Seekers", 
          duration: "28 min",
          type: "reading",
          content: `
# AutoGPT and Fully Autonomous Agents

While LangChain agents often execute specific, bounded requests, projects like **AutoGPT** and **BabyAGI** introduced the concept of open-ended, autonomous goal seekers.

## The AutoGPT Paradigm

Instead of giving the AI a specific task, you provide it with an overarching **Role** and a final **Goal**.

*   **Role:** "You are an automated marketing assistant."
*   **Goal:** "Increase my Twitter followers to 10k by researching trending topics and drafting daily thread ideas."

The agent recursively breaks down this monumental goal into smaller, achievable tasks without human intervention.

## The Cognitive Architecture

1.  **Task Creation:** The LLM looks at the Goal and generates an initial list of tasks required to achieve it.
2.  **Task Prioritization:** A secondary LLM call evaluates the task list and reorders them based on logical dependency and importance.
3.  **Execution (The Worker):** The agent takes the top task and executes it using its available tools (search, file writing, API calls).
4.  **Observation & Memory:** The result of the task is saved to a Vector Database (Long-term memory).
5.  **Loop:** The agent critically evaluates whether the original Goal is met. If not, it creates *new* tasks based on the previous results and loops back to prioritization.

## Challenges and Limitations

While phenomenal in concept, fully autonomous agents face severe hurdles in production:
*   **Infinite Loops:** Agents can easily get stuck executing the exact same failed Google search indefinitely.
*   **Hallucinations compounding:** A slight hallucination in step 2 can completely derail step 50.
*   **Cost:** Running recursive loops on models like GPT-4 can consume massive amounts of API credits in minutes.
*   **Reliability:** For enterprise use-cases, unpredictable autonomous behavior is often too risky compared to deterministic workflows or single-task agents.
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
# Multi-Agent Systems (CrewAI & AutoGen)

The major limitation of a single AI agent is cognitive overload. Trying to prompt one LLM to be an expert researcher, a creative writer, and a meticulous editor simultaneously dilutes its performance. 

The solution is **Multi-Agent Systems (MAS)**.

## Role-Playing Agents

Systems like **CrewAI** and Microsoft's **AutoGen** solve complex problems by orchestrating a "team" of specialized agents. Each agent is given a specific persona.

**Key Components of CrewAI:**

1.  **Agents:** Standalone entities with a defined 'Role', a detailed 'Backstory' (to guide their tone and focus), and specific 'Goal'.
2.  **Tasks:** Granular assignments given to specific agents. Tasks define what needs to be done and what the expected output looks like.
3.  **Tools:** Specific capabilities granted *only* to the relevant agents (e.g., only the Researcher gets the Web Search tool; only the Editor gets the File Write tool).
4.  **The Crew:** The orchestrator that binds agents and tasks together and defines how they collaborate.

## Example: The Content Machine Crew

Imagine building a fully autonomous blog publishing team:

*   **Agent 1: Senior Tech Researcher.** 
    * *Goal:* Find the latest news on AI advancements. 
    * *Tools:* Google Search, Web Scraper.
*   **Agent 2: Creative Copywriter.** 
    * *Goal:* Transform research notes into an engaging blog post. 
    * *Tools:* None (relies on internal LLM reasoning).
*   **Agent 3: Chief Editor.** 
    * *Goal:* Review the blog draft for grammatical perfection and brand alignment. 
    * *Tools:* File System Write (to save the final draft).

## Processing Modes

*   **Sequential Mode:** The typical workflow. The Researcher finishes task 1, passes the data to the Copywriter for task 2, who passes it to the Editor for task 3.
*   **Hierarchical Mode:** Introduces an "Agent Manager" (an LLM functioning as a project manager) that dynamically delegates tasks to its subordinates based on their expertise, evaluates their work, and asks for revisions if necessary.
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
