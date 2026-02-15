import { Course } from "../course-types";

export const course5: Course = {
  id: 5,
  title: "Advanced Prompt Engineering",
  description: "Master advanced prompting techniques, frameworks, and optimization strategies.",
  longDescription: "Become a prompt engineering expert. Learn advanced techniques like chain-of-thought, tree-of-thought, ReAct, and more. Master prompt frameworks, create reusable templates, and optimize prompts systematically.",
  progress: 0,
  lessons: 28,
  completedLessons: 0,
  duration: "9 hours",
  category: "Skills",
  prerequisites: ["LLM Deep Dive"],
  learningOutcomes: [
    "Master advanced prompting techniques",
    "Create effective prompt templates",
    "Optimize prompts systematically",
    "Build prompt libraries for reuse"
  ],
  modules: [
    {
      title: "Module 1: Prompt Engineering Fundamentals",
      lessons: [
        { 
          id: "c5-m1-l1",
          title: "Introduction to Prompting", 
          duration: "20 min",
          type: "reading",
          content: `
# What is a Prompt?

A prompt is the input you provide to an LLM to generate a specific output.

## The Art of Prompting
"Garbage In, Garbage Out." A poorly written prompt will yield a poor response.

## Prompt Components
1.  **Instruction**: Specific task you want the model to perform.
2.  **Context**: Background information or constraints.
3.  **Input Data**: The input you want it to process.
4.  **Output Indicator**: The format you want the output in.

**Example**:
"Summarize the text below in 3 sentences (Instruction). Focus on key financial metrics (Context). Text: [Report] (Input Data). Summary: (Output Indicator)."
          `
        },
        { 
          id: "c5-m1-l2",
          title: "Zero-Shot vs Few-Shot Prompting", 
          duration: "24 min",
          type: "reading",
          content: `
# Zero-Shot vs Few-Shot Prompting

## Zero-Shot
Asking the model to do something without any examples.
"Translate 'cheese' to French." -> "Fromage"

## Few-Shot (In-Context Learning)
Providing examples in the prompt to guide the model.
"Translate English to French:
Sea otter => Loutre de mer
Peppermint => Menthe poivrée
Plush giraffe => Girafe en peluche
Cheese =>"

**Effectiveness**: Few-shot prompting dramatically improves performance on complex tasks.
          `
        },
        {
            id: "c5-m1-l3",
            title: "Quiz: Basics",
            duration: "10 min",
            type: "quiz",
            questions: [
                {
                    id: "q1",
                    text: "What is Few-Shot Prompting?",
                    options: ["Prompting with zero examples", "Prompting with a few examples", "Prompting with a single example", "None of the above"],
                    correctAnswer: "B",
                    explanation: "Providing a few examples (shots) in the prompt helps the model understand the desired output format."
                }
            ]
        }
      ]
    },
    {
      title: "Module 2: Advanced Techniques",
      lessons: [
        { 
          id: "c5-m2-l1",
          title: "Chain-of-Thought (CoT) Prompting", 
          duration: "28 min",
          type: "reading",
          content: `
# Chain-of-Thought (CoT) Prompting

Chain-of-Thought prompting encourages the model to explain its reasoning step-by-step before giving the final answer.

## Standard Prompt
Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each can has 3 tennis balls. How many tennis balls does he have now?
A: The answer is 11.

## CoT Prompt
Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each can has 3 tennis balls. How many tennis balls does he have now?
A: Roger started with 5 balls. 2 cans of 3 balls each is 6 balls. 5 + 6 = 11. The answer is 11.

**Usage**: "Let's think step by step." This simple phrase significantly improves reasoning capabilities.
          `
        },
        { 
          id: "c5-m2-l2",
          title: "Tree-of-Thought (ToT) Prompting", 
          duration: "30 min",
          type: "reading",
          content: `
# Tree-of-Thought (ToT) Prompting

Tree-of-Thought builds on CoT. Instead of a single linear thought process, the model explores multiple branches of reasoning.

1.  **Generate Thoughts**: Generate multiple possible next steps.
2.  **Evaluate States**: Evaluate the progress of each partial solution.
3.  **Search**: Use BFS (Breadth-First Search) or DFS (Depth-First Search) to find the best path.

It allows the model to look ahead and backtrack if necessary.
          `
        },
        { 
          id: "c5-m2-l3",
          title: "Generated Knowledge Prompting", 
          duration: "26 min",
          type: "reading",
          content: `
# Generated Knowledge Prompting

Sometimes the model needs to retrieve knowledge before answering.

**Technique**:
1.  Ask the model to generate knowledge about the question.
2.  Ask the model to answer the question using the generated knowledge.

**Example**:
Q: Part of golf is trying to get a higher point total than others. Yes or No?
Knowledge: The objective of golf is to play a set of holes in the least number of strokes.
Answer: No.
          `
        }
      ]
    },
    {
      title: "Module 3: Frameworks",
      lessons: [
        { 
          id: "c5-m3-l1",
          title: "ReAct: Reasoning + Acting", 
          duration: "28 min",
          type: "reading",
          content: `
# ReAct (Reasoning + Acting)

ReAct combines reasoning (Chain-of-Thought) with action taking (Tool Use).

**Process**:
1.  **Thought**: The model reasons about what to do. "I need to search for the weather in London."
2.  **Action**: The model executes an action. [Search: "Weather London"]
3.  **Observation**: The model receives the output. "Result: 15°C, Cloudy."
4.  **Repeat**: "The weather is 15°C."

This is the foundation of autonomous agents like AutoGPT.
          `
        },
        { 
            id: "c5-m3-l2", // Quiz
            title: "Quiz: Advanced Techniques",
            duration: "10 min",
            type: "quiz",
            questions: [
                {
                    id: "q1",
                    text: "What is the key phrase often used to trigger Chain-of-Thought reasoning?",
                    options: ["Thinking Cap On", "Let's think step by step", "Show me the money", "Compute"],
                    correctAnswer: "B",
                    explanation: "This zero-shot prompt encourages the model to break down the problem into steps."
                }
            ]
        }
      ]
    }
  ],
  projects: [
    {
      title: "Capstone: Advanced Prompt System",
      description: "Build a sophisticated prompt-based system using chains, agents, or multi-step reasoning.",
      duration: "6 hours",
      difficulty: "advanced"
    }
  ]
};
