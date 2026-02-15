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

An AI Agent is a system that can perceive its environment, reason about how to achieve a goal, and take actions to achieve that goal.

## Chatbot vs Agent
*   **Chatbot**: Passive. "Here is the answer."
*   **Agent**: Active. "I have booked the meeting and sent the invite."

## Core Loop
1.  **Observe**: Read email, check calendar.
2.  **Think**: "I need to schedule a meeting."
3.  **Act**: Call Google Calendar API.
4.  **Repeat**.
          `
        },
        { 
          id: "c8-m1-l2",
          title: "Workflow Automation Tools", 
          duration: "24 min",
          type: "reading",
          content: `
# No-Code Automation: Zapier & Make

Before building custom code agents, master the no-code tools.

## Zapier
*   **Trigger**: "New Lead in Facebook Ads"
*   **Action**: "Add row to Google Sheets"
*   **AI Step**: "Use ChatGPT to generate a personalized email."
*   **Action**: "Send Email via Gmail."

## Make (formerly Integromat)
More powerful, visual workflow builder. Supports branching, loops, and complex transformations.
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
              options: ["Chatbots are smarter", "Agents can take actions autonomously", "Chatbots process voice", "Agents are only for robotics"],
              correctAnswer: "B",
              explanation: "While chatbots provide information, agents have the agency to execute tasks and interact with the outside world."
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
          title: "LangChain Agents", 
          duration: "30 min",
          type: "reading",
          content: `
# LangChain Agents

LangChain is the standard framework for building LLM applications.

## Key Concepts
*   **Tools**: Functions the agent can call (e.g., Google Search, Calculator, Python REPL).
*   **Toolkit**: A collection of tools.
*   **Agent Type**:
    *   **Zero-shot ReAct**: Decides what to do based on the prompt alone.
    *   **Conversational**: Remembers history.

**Example**:
"Who is likely to win the next Superbowl? Calculate the square root of their jersey number."
1.  **Action**: Search Google "Superbowl favorites".
2.  **Observation**: "Chiefs are favorites."
3.  **Action**: Search "Patrick Mahomes jersey number". "15".
4.  **Action**: Calculator "sqrt(15)".
5.  **Final Answer**: "3.87"
          `
        },
        { 
          id: "c8-m2-l2",
          title: "AutoGPT and Autonomous Goal Seekers", 
          duration: "28 min",
          type: "reading",
          content: `
# AutoGPT

AutoGPT is an experimental open-source application showcasing the capabilities of the GPT-4 language model.
You give it a **Goal** (e.g., "Increase my Twitter followers to 10k"), and it recursively generates tasks to achieve it.

## Loop
1.  **Task List**: Maintains a list of to-dos.
2.  **Prioritization**: Re-orders tasks based on new info.
3.  **Execution**: Executes the top task.
4.  **Creation**: Adds new tasks based on results.
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
# Multi-Agent Systems (CrewAI)

Sometimes one agent isn't enough. You need a team.

## Concept: Role-Playing Agents
Assign specific personas to different agents.
*   **Researcher Agent**: Searches the web for info.
*   **Writer Agent**: Writes a blog post based on research.
*   **Editor Agent**: Reviews the blog post for tone and accuracy.

**CrewAI** is a framework for orchestrating these role-playing agents to work together.
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
              text: "What framework is popular for creating teams of role-playing agents?",
              options: ["CrewAI", "TeamGPT", "SquadNet", "MultiBot"],
              correctAnswer: "A",
              explanation: "CrewAI is designed specifically to orchestrate role-playing autonomous AI agents."
            }
          ]
        }
      ]
    }
  ],
  projects: [
    {
      title: "Capstone: Enterprise Automation Platform",
      description: "Build a multi-agent workflow that automates a complex business process (e.g., hiring, market research).",
      duration: "8 hours",
      difficulty: "advanced"
    }
  ]
};
