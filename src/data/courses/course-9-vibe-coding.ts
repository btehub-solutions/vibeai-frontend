import { Course } from "../course-types";

export const course9: Course = {
  id: 9,
  title: "Vibe Coding: AI-Assisted Development",
  description: "Learn to code faster and smarter with AI tools like GitHub Copilot and Cursor.",
  longDescription: "Coding has changed forever. Learn 'Vibe Coding' - the art of using AI assistants to handle the boilerplate while you focus on architecture and logic. Master prompt-driven development, debugging with AI, and rapid prototyping.",
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
# Coding is Changing

"It's not about replacing programmers. It's about augmenting them."

## The Old Way
Reading documentation for hours, writing boilerplate (setters/getters), struggling with syntax errors.

## The New Way (Vibe Coding)
Describing what you want in English, reviewing generated code, iterating.
Your role shifts from "Typist" to "Architect" and "Reviewer".
          `
        },
        { 
          id: "c9-m1-l2",
          title: "Setup: GitHub Copilot & Cursor", 
          duration: "25 min",
          type: "reading",
          content: `
# Tools of the Trade

## GitHub Copilot
The AI pair programmer.
*   **Autocomplete**: Suggests whole lines or functions as you type.
*   **Chat**: Ask questions specific to your codebase.

## Cursor (The AI IDE)
A VS Code fork built for AI.
*   **Command+K**: "Edit this selection to handle errors".
*   **Context**: Cursor indexes your whole codebase, so it knows about files you haven't even opened.
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
              text: "Which IDE is specifically built with AI integration as a primary feature?",
              options: ["Cursor", "Notepad++", "Vim", "Sublime Text"],
              correctAnswer: "A",
              explanation: "Cursor is a fork of VS Code designed specifically for AI-native coding workflows."
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

Generating code requires precision.

## Tips
*   **Be Specific**: "Create a React component" vs "Create a responsive React dashboard card component with a title, value, and trend indicator using Tailwind CSS."
*   **Provide Context**: Paste relevant interfaces or database schemas.
*   **Iterate**: "Great, now add error handling." "Now make it mobile responsive."
          `
        },
        { 
          id: "c9-m2-l2",
          title: "Debugging & Refactoring with AI", 
          duration: "26 min",
          type: "reading",
          content: `
# Debugging & Refactoring

AI is an incredible debugger.

## Debugging
Paste the error stack trace + the relevant code block.
"Fix this error: TypeError: Cannot read property 'map' of undefined."
**AI**: "You need to initialize the array or check if it exists before mapping."

## Refactoring
"Refactor this function to be more readable and performant."
"Convert this Class component to a Functional component with Hooks."
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

With AI, you can bootstrap projects instantly.

## Workflow
1.  **Database**: "Create a Supabase schema for a Todo app."
2.  **Backend**: "Generate API routes for CRUD operations."
3.  **Frontend**: "Create a Next.js page that fetches and displays the todos."
4.  **Polish**: "Add a dark mode toggle."

What used to take a weekend now takes an hour.
          `
        }
      ]
    }
  ],
  projects: [
    {
      title: "Capstone: Production SaaS Application",
      description: "Build and deploy a fully functional SaaS application using AI-assisted coding tools.",
      duration: "10 hours",
      difficulty: "advanced"
    }
  ]
};
