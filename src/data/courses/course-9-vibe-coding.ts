import { Course } from "../course-types";

export const course9: Course = {
  id: 9,
  title: "Vibe Coding: AI-Assisted Development",
  description: "Learn to code faster and smarter with AI tools like GitHub Copilot and Cursor.",
  longDescription: "Coding has changed forever. Learn 'Vibe Coding' - the art of using AI assistants to handle the boilerplate while you focus on architecture and logic. Master prompt-driven development, debugging with AI, and rapid prototyping. In this comprehensive course, you will learn the new paradigm of software development where the AI handles syntax and you serve as the chief architect.",
  progress: 0,
  lessons: 30,
  completedLessons: 0,
  duration: "11 hours",
  category: "Skills",
  prerequisites: ["Advanced Prompt Engineering"],
  learningOutcomes: [
    "Accelerate coding speed by 5x",
    "Master prompt-driven development",
    "Debug complex issues with AI",
    "Build full-stack apps in hours, not weeks"
  ],
  modules: [
    {
      title: "Module 1: AI Coding Fundamentals",
      lessons: [
        { 
          id: "c9-m1-l1",
          title: "The Shift to AI-Assisted Coding", 
          duration: "20 min",
          type: "reading",
          content: `
# Coding is Changing Forever

"It's not about replacing programmers. It's about augmenting them."

The role of a software engineer is undergoing a massive transformation. Historically, coding involved a tremendous amount of manual labor: memorizing syntax, writing boilerplate codes, spending hours on StackOverflow, and hunting down missing semicolons.

With the advent of Large Language Models (LLMs) tuned for code (like OpenAI's Codex and Anthropic's Claude 3.5 Sonnet), the paradigm has shifted.

## The Old Way vs The New Way

### 📉 The Old Way (Manual Typing)
*   **Time-consuming Research:** Reading complex documentation for hours before writing a single line of code.
*   **Boilerplate Fatigue:** Writing repetitive code structures (getters, setters, loops, Redux slices).
*   **Syntactic Struggles:** Losing hours to minor syntax errors or missing brackets.

### 📈 The New Way ("Vibe Coding")
*   **Intent-Driven:** Describing *what* you want the code to do in plain English.
*   **Instant Prototyping:** Generating entire functions, components, and tests instantly.
*   **Architectural Focus:** Your role shifts from being a "Typist" to being an "Architect" and "Reviewer." You design the system, review the AI's output, guide it, and iterate.

## What is "Vibe Coding"?
Coined by the tech community, "Vibe Coding" refers to an almost conversational workflow where you write natural language prompts and comments, and the AI translates your thoughts into functioning code. The "vibe" is the seamless synchrony between human intent and machine execution.
          `
        },
        { 
          id: "c9-m1-l2",
          title: "Setup: GitHub Copilot & Cursor", 
          duration: "25 min",
          type: "reading",
          content: `
# Tools of the Trade

To code with AI, you need the right environment. We will focus on the two most impactful tools in the modern developer's arsenal: **GitHub Copilot** and **Cursor**.

## GitHub Copilot: The OG AI Pair Programmer
GitHub Copilot is an extension for IDEs like VS Code, IntelliJ, and Visual Studio.

*   **Ghost Text Autocomplete:** Copilot shines in predicting what you want to write next. As you type, it offers multi-line autocomplete suggestions in grey text. E.g., if you type \`function calculateDistance(x1, y1, x2, y2) {\`, Copilot will instantly generate the Pythagorean theorem formula.
*   **Copilot Chat:** A conversational interface directly in your sidebar where you can highlight code and ask, "Explain this to me," or "Write unit tests for this function."

## Cursor: The AI-Native IDE
Cursor is a completely custom fork of VS Code built entirely around AI. It is currently considered the gold standard for "vibe coding."

*   **Command+K (Cmd+K):** The magic shortcut. Highlight code, hit Cmd+K, and type instructions. E.g., *"Make this button responsive and change it to dark mode."* Cursor will generate a unified diff for you to Accept or Reject.
*   **Global Context (Codebase Indexing):** Unlike standard extensions, Cursor indexes your entire codebase. You can ask Cursor Chat (Cmd+L), *"Where is the authentication logic handled?"* and it will scan dozens of files it knows about to give you an accurate answer.
*   **Composer:** A powerful feature that allows the AI to edit multiple files simultaneously across your project, building whole features end-to-end.
          `
        },
        {
          id: "c9-m1-l3",
          title: "Quiz: AI Coding Tools",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "Which IDE is specifically built as a fork of VS Code with deep AI integration as its primary feature?",
              options: ["Cursor", "WebStorm", "Visual Studio Community", "Sublime Text"],
              correctAnswer: "A",
              explanation: "Cursor is a dedicated fork of VS Code designed specifically for AI-native coding workflows and entire codebase context tracking."
            },
            {
              id: "q2",
              text: "What does the term 'Vibe Coding' primarily refer to?",
              options: ["Coding while listening to music", "Using natural language intent to guide AI assistants in generating code", "Writing code using only the VIM editor", "A specific frontend framework"],
              correctAnswer: "B",
              explanation: "Vibe coding is the modern workflow of using natural language and intent-based prompting to guide an AI in writing the underlying code."
            }
          ]
        }
      ]
    },
    {
      title: "Module 2: Prompt-Driven Development",
      lessons: [
        { 
          id: "c9-m2-l1",
          title: "Writing Effective Code Prompts", 
          duration: "28 min",
          type: "reading",
          content: `
# Prompting for Code

Generating reliable code using AI is not magic; it requires structured, precise prompting. Poor prompts lead to hallucinated logic and buggy code. 

## The Anatomy of an Excellent Code Prompt

1.  **State the Goal clearly:** Don't be vague.
    *   ❌ *Bad:* "Make a signup component."
    *   ✅ *Good:* "Create a responsive React signup component."
2.  **Define constraints and technologies:** 
    *   ✅ *Good:* "Use functional React components, TypeScript interfaces, and Tailwind CSS for styling."
3.  **Provide Context (@ files):** In IDEs like Cursor, use the '@' symbol to reference existing files so the AI knows your design patterns.
    *   ✅ *Good:* "Follow the styling patterns established in @Button.tsx and @Theme.ts."
4.  **Define inputs and expected outputs (for logic):**
    *   ✅ *Good:* "Write a function that accepts an array of User objects and returns a sorted array based on their 'lastLogin' timestamp, descending."

## The Iterative Approach

Never expect perfection on the first try. Code prompting is highly iterative:
1.  **Prompt 1 (Foundation):** "Generate a basic HTML table displaying user data."
2.  **Prompt 2 (Styling):** "Now, add Tailwind classes to make it look modern with striped rows."
3.  **Prompt 3 (Interactivity):** "Add sorting capabilities when clicking the headers."
          `
        },
        { 
          id: "c9-m2-l2",
          title: "Debugging & Refactoring with AI", 
          duration: "26 min",
          type: "reading",
          content: `
# Debugging & Refactoring

AI assistants are arguably more powerful as debuggers and code-reviewers than they are as code generators.

## Rubber Duck Debugging on Steroids

When you hit a bug, instead of spending hours scratching your head, feed the context to the AI:
1.  **Copy the exact error stack trace.**
2.  **Highlight the relevant code block.**
3.  Prompt: *"I am getting this TypeError: Cannot read property 'map' of undefined. Why is this happening and how do I fix it?"*

**Expected AI Behavior:** The AI will immediately spot that you are likely mapping over an array before it has received data from an asynchronous API call. It will suggest adding optional chaining (e.g., \`data?.map()\`) or a loading state.

## Refactoring Legacy Code

You can use AI to modernize older codebases or improve time/space complexities:
*   **Modernization:** *"Convert this legacy React Class component into a modern Functional component using Hooks (useState, useEffect)."*
*   **Optimization:** *"This nested loop is O(n^2) time complexity. Refactor this algorithm to use a Hash Map for O(n) performance."*
*   **Documentation:** *"Add JSDoc comments to all the functions in this file, explaining their parameters, return types, and potential side-effects."*
          `
        }
      ]
    },
    {
      title: "Module 3: Rapid Prototyping",
      lessons: [
        { 
          id: "c9-m3-l1",
          title: "Building a Full-Stack App in 1 Hour", 
          duration: "40 min",
          type: "reading",
          content: `
# Speed Running Development

With tools like Cursor, Next.js, and Supabase (or Firebase), you can bootstrap fullstack projects almost instantly. What used to take a whole weekend of setting up boilerplate can now be done in an hour.

## The AI-Assisted Prototyping Workflow

Follow this logical sequence to map out an application quickly:

### 1. The Database & Schema Layer
Start at the foundation. 
*   **Prompt:** *"I am building a project management app. Design a SQL schema for Users, Projects, and Tasks with foreign key relationships. Tasks should have a status enum (Todo, In Progress, Done)."*

### 2. The Backend / API Layer
Once the schema is established, you need routes.
*   **Prompt:** *"Based on the schema we just created, generate Next.js API route handlers to perform CRUD operations on the Tasks table using Prisma ORM."*

### 3. The Frontend Core
Now, bind the data to a UI.
*   **Prompt:** *"Create a React dashboard component using Tailwind CSS. It should fetch the Tasks from the API we just made, and display them in three columns based on their status."*

### 4. Polish and Edge Cases
*   **Prompt:** *"Add a sleek dark mode toggle using Context provider."*
*   **Prompt:** *"Handle loading states with skeleton loaders and create a toast notification for error handling if the API fails."*

By staying in the architect role and guiding the AI step-by-step up the stack, you leverage the machine's speed while maintaining structural integrity.
          `
        }
      ]
    }
  ],
  projects: [
    {
      title: "Capstone: Production SaaS Application",
      description: "Build and deploy a fully functional MVP SaaS application from scratch in under 4 hours strictly using AI-assisted coding tools and prompt-driven development workflows.",
      duration: "10 hours",
      difficulty: "advanced"
    }
  ]
};
