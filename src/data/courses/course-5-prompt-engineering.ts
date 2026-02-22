import { Course } from "../course-types";

export const course5: Course = {
  id: 5,
  title: "Advanced Prompt Engineering",
  description: "Master advanced prompting techniques, frameworks, and programmatic optimization strategies.",
  longDescription: "Become a prompt engineering expert. Move beyond basic chatbots and learn programmatic prompting. Master advanced techniques like Chain-of-Thought (CoT), Tree-of-Thought (ToT), ReAct, and DSPy to build reliable, scalable AI pipelines that don't break when model versions change.",
  progress: 0,
  lessons: 28,
  completedLessons: 0,
  duration: "9 hours",
  category: "Skills",
  prerequisites: ["LLM Deep Dive"],
  learningOutcomes: [
    "Master multi-step reasoning frameworks (CoT, ToT)",
    "Build systematic, version-controlled prompt libraries",
    "Implement programmatic prompting using DSPy",
    "Design agentic workflows using the ReAct framework"
  ],
  modules: [
    {
      title: "Module 1: Systematic Prompting",
      lessons: [
        { 
          id: "c5-m1-l1",
          title: "The Anatomy of a Production Prompt", 
          duration: "20 min",
          type: "reading",
          content: `
# Moving Beyond ChatGPT

When chatting with a bot, if it gives a bad answer, you just re-prompt it. But when you build software that relies on an LLM in the background (e.g., an automated email summarizer), the prompt *must* work correctly on the first try, every single time.

## The 5 Pillars of a Production Prompt

1.  **System Persona (The "Act As"):** Radically changes the internal probability weights. "You are a senior data scientist auditing code for security flaws" yields vastly different results than "Review this code."
2.  **Context (The Boundary Constraints):** Telling the model what it *cannot* do is as important as telling it what it *must* do. Example: "Rely ONLY on the provided text. Never hallucinate external facts."
3.  **Instruction (The Task):** Use explicit, imperative verbs. Produce, Extract, Classify, Translate.
4.  **Few-Shot Examples (The Pattern):** LLMs are pattern matchers. Providing 3 examples of the exact input-output pairing you want reduces hallucination by up to 50%.
5.  **Output Format (The Schema):** "Return ONLY valid JSON. Do not include markdown formatting or conversational filler."
          `
        },
        { 
          id: "c5-m1-l2",
          title: "Zero-Shot vs Few-Shot Scaling", 
          duration: "24 min",
          type: "reading",
          content: `
# In-Context Learning (Few-Shot)

LLMs learn incredibly well "in-context." This means you don't need to retrain the underlying model; you just show it examples in the prompt.

## The Scaling Law of Examples
*   **Zero-Shot:** "Classify the sentiment of this review." (Works okay for simple tasks).
*   **One-Shot:** Providing a single example. Greatly improves formatting compliance.
*   **Few-Shot (5-10 examples):** This is where models learn *logic*. 

## Dynamic Few-Shotting
In production, you don't hardcode the same 5 examples. You use a vector database to search for the 5 *most similar* past examples to the current user's input, and inject those into the prompt dynamically before sending it to the LLM.
          `
        },
        {
            id: "c5-m1-l3",
            title: "Quiz: Production Prompts",
            duration: "10 min",
            type: "quiz",
            questions: [
                {
                    id: "q1",
                    text: "Why is 'Dynamic Few-Shotting' superior to hardcoding examples in a prompt?",
                    options: ["It saves token costs", "It allows the LLM to see examples that are highly relevant to the specific edge-case the user is asking about", "It prevents the LLM from hallucinating entirely", "It is required by the OpenAI API"],
                    correctAnswer: "B",
                    explanation: "By retrieving and injecting examples that closely match the user's current query, the LLM has a highly tailored template for how to respond to that specific scenario."
                }
            ]
        }
      ]
    },
    {
      title: "Module 2: Advanced Reasoning Frameworks",
      lessons: [
        { 
          id: "c5-m2-l1",
          title: "Chain-of-Thought (CoT) Deep Dive", 
          duration: "28 min",
          type: "reading",
          content: `
# Chain-of-Thought (CoT)

Large Language Models do not possess working memory in the way humans do. If you ask an LLM a complex math question and tell it to output *only* the final number, it tries to compute the entire multi-step equation in a single forward pass of its neural network. It will almost certainly fail.

## Forcing the LLM to "Think Out Loud"

**Chain-of-Thought** solves this by forcing the model to print its intermediate reasoning steps to the screen before generating the final answer. Because the model can "read" its own previous output, printing the steps effectively acts as a scratchpad working memory.

*   *Zero-Shot CoT:* "Take a deep breath and work on this problem step-by-step."
*   *Few-Shot CoT:* Providing examples where the answer includes the full reasoning path.

*Note: In production workflows, you simply hide the "thought" output from the final user, only showing them the final aggregated result.*
          `
        },
        { 
          id: "c5-m2-l2",
          title: "Tree-of-Thought (ToT)", 
          duration: "30 min",
          type: "reading",
          content: `
# Tree-of-Thought (ToT)

CoT is linear. If the model makes a mistake in step 2, steps 3, 4, and 5 will be wrong (a hallucination cascade).

**Tree-of-Thought** models human decision-making by evaluating multiple parallel paths and allowing the model to backtrack.

1.  **Generate:** The LLM generates 3 different possible next steps for solving a problem.
2.  **Evaluate:** A secondary prompt asks the LLM to rate each of those 3 steps (e.g., "Highly Likely to Succeed", "Dead End").
3.  **Search:** The system branches down the most promising path. If it hits a dead end, it goes back up the tree to the second-best option.

This is computationally expensive but necessary for complex logical tasks like writing a bug-free script from scratch or solving puzzles.
          `
        }
      ]
    },
    {
      title: "Module 3: Programmatic Prompting (DSPy)",
      lessons: [
        { 
          id: "c5-m3-l1",
          title: "Compiling Prompts with DSPy", 
          duration: "35 min",
          type: "reading",
          content: `
# The End of Manual Prompt Tuning

Imagine you spend 40 hours crafting the perfect prompt for GPT-4. Then, GPT-5 comes out. Your prompt is now obsolete because GPT-5 reacts to words differently. This is the "fragility" of string-based prompt engineering.

## Enter DSPy (Demonstrate, Search, Predict)
Developed by Stanford, DSPy shifts prompting from *writing text* to *writing code*. 
Instead of tweaking adjectives ("Be very very helpful"), you define the **signature** (Input: Question -> Output: SQL Query).

You provide DSPy with a dataset of 50 correct Question/SQL pairs. DSPy then automatically "compiles" the optimal prompt. It tests hundreds of prompt variations against your dataset, finding the exact mathematical combination of words that produces the highest accuracy for the specific model you are using. 

If you switch from OpenAI to Anthropic, you just re-compile, and DSPy writes a brand new, optimized prompt specifically for Claude.
          `
        },
        { 
          id: "c5-m3-l2", // Quiz
          title: "Quiz: Programmatic Prompting",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "What fundamental problem with traditional prompt engineering does DSPy attempt to solve?",
              options: ["It makes the API calls faster", "It eliminates the fragility of hardcoded text prompts breaking when underlying model versions change", "It reduces the cost of tokens to zero", "It prevents all hallucinations"],
              correctAnswer: "B",
              explanation: "DSPy treats prompts as compilable code that can be optimized programmatically against a metric, abstracting away the need to manually tweak text strings."
            }
          ]
        }
      ]
    }
  ],
  projects: [
    {
      title: "Capstone: The Self-Optimizing Pipeline",
      description: "Build a DSPy pipeline that takes a crude baseline prompt and automatically compiles it into a highly optimized, few-shot reasoning chain.",
      duration: "8 hours",
      difficulty: "advanced"
    }
  ]
};
