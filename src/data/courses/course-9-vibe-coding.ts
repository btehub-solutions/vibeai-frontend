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
# MODULE 1 — AI Coding Fundamentals
**Learning Objectives:**
* Differentiate between traditional manual programming and the new "vibe coding" paradigm.
* Understand the role shift from "typist" to "architect".
* Set up a modern AI-native development environment.

---

## Lesson 1 — The Shift to AI-Assisted Coding

### Definition / Explanation:

**Point 1: The End of Syntactic Labor**
The role of a software engineer is undergoing a massive transformation. Historically, coding involved a tremendous amount of manual labor: memorizing exact language syntaxes, writing repetitive boilerplate codes (like getters and setters), and spending hours on StackOverflow hunting down missing semicolons. 

**Point 2: The Rise of Intent**
With the advent of Large Language Models (LLMs) specifically trained on code repositories (like OpenAI's Codex and Anthropic's Claude 3.5 Sonnet), the paradigm has shifted. "Vibe Coding" refers to an almost conversational workflow where you write natural language prompts and the AI translates your pure intent into functioning code.

### Key Points:
*   **Intent-Driven:** You describe *what* you want the code to do in plain English, rather than manually typing *how* it should do it.
*   **Instant Prototyping:** Entire functions, complex React components, and comprehensive unit test suites can be generated instantly.
*   **Architectural Focus:** You transition from being a syntactical "Typist" to being the "Architect" and "Reviewer." Your job is to design the system, review the AI's output, guide it, and iterate.

### Examples / Use Cases:

*   **Example 1: The Old Way (Manual Typing):** Spending an hour reading complex Redux documentation just to wire up a basic state management slice for a single variable.
*   **Example 2: The New Way (Vibe Coding):** Pressing a hotkey and typing: "Generate a Redux slice managing the user's authentication state with login and logout actions" and receiving perfect code in 5 seconds.

### Visuals:


### Implementation / Hands-On:

*   **Step 1:** Reflect on a recent coding task that felt incredibly tedious and repetitive.
*   **Step 2:** Write down the English instructions you would give to an intern to complete that exact same task.
*   **Step 3:** Paste those instructions into an LLM (like ChatGPT or Claude) and review the code it generates based purely on your natural language.

### Summary / Key Takeaways:

*   AI coding assistants are not meant to replace engineers, but to drastically augment them by removing boilerplate labor.
*   The essential skill of the modern developer is communicating clear intent and architectural vision, not memorizing syntax.

### Optional Exercises / Prompts:

*   **Exercise 1:** Identify three repetitive tasks in your current codebase that could be fully delegated to an AI assistant.
          `
        },
        { 
          id: "c9-m1-l2",
          title: "Setup: GitHub Copilot & Cursor", 
          duration: "25 min",
          type: "reading",
          content: `
## Lesson 2 — Setup: GitHub Copilot & Cursor

### Definition / Explanation:

**Point 1: Essential Tooling**
To code effectively with AI, you can't rely on copy-pasting code blocks from a browser tab back and forth into your IDE. You need AI deeply integrated into your environment so it has context of your active files. The two leading tools are GitHub Copilot and Cursor.

**Point 2: Two Distinct Paradigms**
GitHub Copilot is an *extension* that adds autocomplete capabilities into existing IDEs like VS Code or IntelliJ. Cursor, conversely, is an entirely *AI-native IDE* built specifically to allow LLMs to index and edit your entire codebase autonomously.

### Key Points:
*   **GitHub Copilot (Ghost Text):** Excels at inline autocomplete. As you type a function name (e.g., \`function calculateDistance(x, y)\`), it predicts the body of the function in grey "ghost" text that you can accept with the Tab key.
*   **Cursor (Cmd+K Generation):** Highlight any block of code, press Cmd+K, and type an instruction like *"Make this table responsive and add Tailwind classes for a dark mode."* The AI rewrites the code directly in your file.
*   **Global Context (Cursor Composer):** Truly advanced tools can index your entire repository. You can instruct Cursor to "Add a new 'Settings' page" and it will create the frontend component, wire the route, and update the backend API file simultaneously.

### Examples / Use Cases:

*   **Example 1: Using Copilot:** A developer types a comment \`// fetch latest weather data\` and hits enter. Copilot instantly writes the \`fetch()\` request using async/await.
*   **Example 2: Using Cursor Composer:** A developer types "Implement user authentication via Supabase" and Composer edits 7 different files across the frontend, auth middleware, and utility folders all at once.

### Visuals:



### Implementation / Hands-On:

*   **Step 1:** Download and install the Cursor IDE.
*   **Step 2:** Open an existing project (Cursor can import all your VS Code extensions and settings).
*   **Step 3:** Highlight a function, press Cmd+K, and instruct the AI to: "Add comprehensive JSDoc comments to this code." 
*   **Step 4:** Review the unified diff and accept the changes.

### Summary / Key Takeaways:

*   Integrating AI directly into your IDE is mandatory for high-speed "vibe coding."
*   GitHub Copilot specializes in highly accurate, micro-level autocomplete.
*   Cursor specializes in macro-level, codebase-wide generation and refactoring.

### Optional Exercises / Prompts:

*   **Exercise 1:** If using Cursor, press Cmd+L (Cursor Chat) and ask: "Where is the authentication logic handled in this project, and how can I add a new OAuth provider?"
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
              text: "Which tool is built as an entirely custom fork of VS Code focusing on deep, codebase-wide AI integration?",
              options: ["GitHub Copilot", "Cursor", "WebStorm", "Visual Studio Community"],
              correctAnswer: "B",
              explanation: "Cursor is a dedicated fork of VS Code designed specifically for AI-native coding workflows, including full-repo context indexing."
            },
            {
              id: "q2",
              text: "What does the term 'Vibe Coding' primarily refer to?",
              options: ["Coding while listening to music", "Using natural language intent to guide AI assistants in generating code", "Writing code using only the VIM editor", "A specific frontend framework"],
              correctAnswer: "B",
              explanation: "Vibe coding is the modern workflow of using natural language statements of intent to instruct an AI to write the underlying logic and syntax."
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
# MODULE 2 — Prompt-Driven Development
**Learning Objectives:**
* Structure precise and reliable prompts for code generation.
* Utilize codebase context tags effectively.
* Leverage AI as an advanced debugging and refactoring engine.

---

## Lesson 1 — Writing Effective Code Prompts

### Definition / Explanation:

**Point 1: The Precision Requirement**
Generating reliable, production-ready code using AI is not magic; it requires structured, precise prompting. Poor, vague prompts lead to hallucinated logic, deprecated libraries, and buggy code. The AI is only as good as the specificity of your instructions.

**Point 2: The Anatomy of an Excellent Prompt**
To prevent the LLM from making assumptions, your prompt must explicitly state the goal, define the exact technologies/versions to use, provide existing files as architectural context, and outline the expected inputs and outputs.

### Key Points:
*   **State the Goal clearly:** Don't be vague. (❌ Bad: "Make a signup component." | ✅ Good: "Create a scalable, responsive React signup component.")
*   **Define constraints and technologies:** Explicitly name your stack. (✅ Good: "Use functional React components, TypeScript interfaces, and Tailwind CSS for styling.")
*   **Provide Context (@ symbols):** In IDEs like Cursor, use the '@' symbol to reference existing files so the AI mirrors your established design patterns. (✅ Good: "Follow the styling patterns established in @Button.tsx.")
*   **The Iterative Approach:** Never expect architectural perfection on the first try. Generate the foundation, review, and then prompt again for styling, and finally interactivity.

### Examples / Use Cases:

*   **Example 1: Initial Foundation:** "Generate a basic HTML table component displaying user data representing Name, Email, and Roles."
*   **Example 2: Refining Styling:** "Now, add Tailwind classes to make the table look modern, with striped rows and a sticky header."
*   **Example 3: Adding Logic:** "Add sorting capabilities so that clicking the header of the 'Email' column alphabetizes the dataset."

### Visuals:


### Implementation / Hands-On:

*   **Step 1:** Create an empty file named \`UserProfile.tsx\`.
*   **Step 2:** Write a multi-line prompt via your AI tool asking it to create the component.
*   **Step 3:** Ensure your prompt explicitly mentions the framework (React), styling (CSS/Tailwind), and details the specific props (name, avatar URL, bio).
*   **Step 4:** Generate, review the code, and ask the AI to "Refactor this to include a fallback image if the avatar URL fails to load."

### Summary / Key Takeaways:

*   Vague inputs result in unusable, hallucinated code.
*   Always define your tools, constraints, and provide relevant context files.
*   Prompt-driven development is an iterative conversation with the AI, layering complexity step by step.

### Optional Exercises / Prompts:

*   **Exercise 1:** Take a poorly performing prompt you've written in the past, and rewrite it applying the 4 step anatomy (Goal, Constraints, Context, Inputs/Outputs).
          `
        },
        { 
          id: "c9-m2-l2",
          title: "Debugging & Refactoring with AI", 
          duration: "26 min",
          type: "reading",
          content: `
## Lesson 2 — Debugging & Refactoring with AI

### Definition / Explanation:

**Point 1: Rubber Duck Debugging on Steroids**
While code generation gets all the hype, AI assistants are arguably even more powerful as deep-dive debuggers and senior-level code-reviewers. When you encounter vague console errors, the AI can cross-reference the stack trace against your actual file logic instantaneously.

**Point 2: Modernization and Optimization**
Beyond fixing broken code, AI excels at improving working code. You can mandate the AI to refactor outdated legacy patterns into modern standards, or instruct it to optimize algorithms from O(n^2) nested loops into highly performant O(n) Hash Maps.

### Key Points:
*   **Automated Error Resolution:** Paste the exact error stack trace to the AI alongside the breaking code block for an instant diagnosis.
*   **Modernizing Legacy Frameworks:** Feed the AI an old Class-based React component and ask it to convert it to a modern Functional component utilizing hooks.
*   **Instant Documentation:** Highlight complex, undocumented files and instruct the AI to "Add comprehensive JSDoc comments detailing parameters, return types, and potential side-effects."
*   **Security Auditing:** Ask the AI to act as a "Red Team Engineer" and review your SQL queries or Authentication logic for injection flaws or vulnerabilities.

### Examples / Use Cases:

*   **Example 1: The Race Condition Bug:** A developer hits a \`TypeError: Cannot read property 'map' of undefined\` error. The developer feeds the code to the AI. The AI identifies that the mapping function is executing before the asynchronous API call finishes, and suggests implementing optional chaining (\`data?.map()\`) and a loading state.
*   **Example 2: Refactoring Speed:** "Refactor this 300-line monolithic controller into three smaller, distinct utility functions."

### Visuals:


### Implementation / Hands-On:

*   **Step 1:** Find a messy, overly complex function in an old project.
*   **Step 2:** Highlight it and ask the AI: "Explain what this code does in plain English."
*   **Step 3:** Next, prompt: "Refactor this to be more performant and readable. Use modern ES6 syntax (like destructuring and arrow functions)."
*   **Step 4:** Review the changes and run your tests to verify it didn't break functionality.

### Summary / Key Takeaways:

*   AI is faster at pinpointing standard coding errors than manual stack trace hunting.
*   It serves as an excellent tool for paying down technical debt and continuously refactoring.
*   When a bug occurs, feed the AI both the raw error message and the surrounding context files.

### Optional Exercises / Prompts:

*   **Exercise 1:** Trigger an intentional error in your code (e.g., misname a variable). Copy the terminal output, paste it to your AI assistant, and see if it can point out exactly which line you sabotaged without telling it.
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
# MODULE 3 — Rapid Prototyping
**Learning Objectives:**
* Apply vibe coding workflows sequentially across the full stack.
* Architect robust data schemas rapidly.
* Bootstrap production-ready Minimum Viable Products in hours.

---

## Lesson 1 — Building a Full-Stack App in 1 Hour

### Definition / Explanation:

**Point 1: Speed-Running Development**
With tools like Cursor combined with high-velocity frameworks (Next.js, Supabase, Tailwind), you can bootstrap full-stack architectures almost instantly. Projects that historically required a full engineering weekend to merely set up the database and routing boilerplates can now be spun up in an hour.

**Point 2: Ground-Up Orchestration**
The key to building massive apps quickly with AI is proceeding in a logical vertical sequence: Database -> Backend APIs -> Frontend UI. If you ask the AI to build the entire app at once, it will hallucinate dependencies. If you stay in the Architect role and guide it step-by-step up the stack, you leverage its speed while maintaining structural integrity.

### Key Points:
*   **Step 1: The Database Layer:** Begin by defining a strong, relational structural foundation (e.g., "Design a SQL schema using Prisma for Users, Projects, and Tasks with a 1-to-many relationship.").
*   **Step 2: The API/Routing Layer:** Once schemas exist, prompt the AI to generate the CRUD (Create, Read, Update, Delete) routes targeting that exact schema.
*   **Step 3: The Frontend Core:** Ask the AI to create UI components that consume the specific API routes it just designed.
*   **Step 4: Polish & Edge Cases:** Focus on loading states, error toast notifications, and dark-mode styling only after the core data pipelines operate correctly.

### Examples / Use Cases:

*   **Example 1: The AI Bootstrapping Workflow:** An entrepreneur wants to build a project management tool. They first use the AI to generate the Supabase migration files. Second, they use it to write server actions fetching the board data. Lastly, they prompt the AI to build a drag-and-drop Kanban board React component styled perfectly with Tailwind.

### Visuals:


### Implementation / Hands-On:

*   **Step 1:** Define the core idea of an app you want to build (e.g., A minimalist Habit Tracker).
*   **Step 2:** Prompt your IDE AI to generate the database schema (e.g., "Write a Prisma schema for a User who has multiple Habits. A Habit tracks the title, frequency, and an array of completion dates.").
*   **Step 3:** Direct the AI to create a serverless API function to "Fetch all habits for a specific user ID."
*   **Step 4:** Ask the AI to build a React Card component that displays a Habit's title and a button to mark it 'done'.

### Summary / Key Takeaways:

*   "Vibe Coding" unlocks unprecedented speed for solo developers.
*   Never prompt an AI to "Build a whole app." Build sequentially upward from the database.
*   Manage the AI's context window. Provide it only the files relevant to the specific layer you are currently having it code.

### Optional Exercises / Prompts:

*   **Exercise 1:** Use Cursor Composer (or an equivalent multi-file agent) to give the prompt: "I need a 'Contact Us' page. Build the frontend form UI, the server-side API route that handles the POST request, and add basic email validation logic. Update my navigation bar file to include a link to this new page."
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
