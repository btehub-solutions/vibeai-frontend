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
# MODULE 1 — Systematic Prompting
**Learning Objectives:**
* Differentiate between conversational prompting and production-grade software prompting.
* Master the 5 core pillars of a robust prompt structure.
* Understand the importance of systematic boundary constraints to prevent hallucination.

---

## Lesson 1 — The Anatomy of a Production Prompt

### Definition / Explanation:

**Point 1: Moving Beyond Chatbots**
When casually chatting with a web-based AI, if it gives a bad answer, you simply re-prompt it. However, when you build software that relies on an LLM in the background (e.g., an automated email summarizer processing thousands of documents), the prompt *must* work correctly on the first try, every single time. 

**Point 2: The 5 Pillars of a Production Prompt**
To achieve near 100% reliability, you must structure prompts methodically rather than conversationally.
1. **System Persona (The "Act As"):** Radically changes the internal probability weights. "You are a senior data scientist auditing code for security flaws" yields vastly different results than a generic "Review this code."
2. **Context (The Boundary Constraints):** Telling the model what it *cannot* do is as important as telling it what it *must* do. 
3. **Instruction (The Task):** Use explicit, imperative verbs (e.g., Produce, Extract, Classify, Translate) rather than vague requests.
4. **Few-Shot Examples (The Pattern):** Providing 3 exact examples of the input-output pairing you want reduces formatting errors massively.
5. **Output Format (The Schema):** Explicitly demanding "Return ONLY valid JSON" to ensure the output can be parsed by your downstream code.

### Key Points:
*   **Determinism:** While LLMs are probabilistic, strict structural prompting forces them into highly deterministic behavior patterns.
*   **Separation of Concerns:** Keep your instructions cleanly separated from the user data injected into the prompt using delimiters (like \`###\` or \`<data>\`).
*   **Negative Constraints:** "Never hallucinate external facts" or "If the answer is not present in the text, output 'NULL'."

### Examples / Use Cases:

*   **Example 1: The Bad Prompt:** "Read this review and tell me if they liked the product or not, and what their name is." (Result: Unpredictable paragraph response).
*   **Example 2: The Production Prompt:** 
    \`\`\`
    System: Act as an expert sentiment analyst.
    Instruction: Analyze the <text>. Output ONLY valid JSON with keys "sentiment" (String: Positive, Negative, Neutral) and "user_name" (String).
    Constraint: If no name is found, use "Anonymous". Do not include markdown.
    <text>: "The shoes broke after two days. - Sarah"
    \`\`\`

### Visuals:


### Implementation / Hands-On:

*   **Step 1:** Select a common task you use ChatGPT for (e.g., summarizing articles).
*   **Step 2:** Rewrite your standard prompt to rigidly include all 5 pillars (Persona, Context, Instruction, Examples, Schema).
*   **Step 3:** Test the prompt and observe how the output instantly becomes machine-readable rather than conversational.

### Summary / Key Takeaways:

*   Production prompting requires engineering rigor, not just conversational fluency.
*   Explicitly defining the exact data schema (e.g., JSON) is mandatory for software integration.
*   Boundary constraints (telling the AI what not to do) drastically lower hallucination rates.

### Optional Exercises / Prompts:

*   **Exercise 1:** Write a production prompt instructing an LLM to read a raw block of meeting notes and extract action items. Mandate that the output must be a Markdown table with columns: 'Assignee', 'Task', and 'Deadline'.
          `
        },
        { 
          id: "c5-m1-l2",
          title: "Zero-Shot vs Few-Shot Scaling", 
          duration: "24 min",
          type: "reading",
          content: `
## Lesson 2 — Zero-Shot vs Few-Shot Scaling

### Definition / Explanation:

**Point 1: In-Context Learning**
Large Language Models exhibit a remarkable emergent property called "in-context learning." This means you do not need to retrain or fine-tune the underlying neural network weights to teach it a new formatting trick; you simply show it examples directly inside the prompt's context window.

**Point 2: The Scaling Law of Examples**
The amount of context you provide directly correlates to the accuracy of the output.
*   **Zero-Shot:** Giving an instruction with no examples ("Classify the sentiment of this review"). Works decently for simple, generalized tasks.
*   **One-Shot:** Providing a single example. Greatly improves formatting compliance.
*   **Few-Shot (3-10 examples):** This is where models learn *complex logic*. If a task has subtle rules, providing 5 diverse examples of the input-output mapping allows the LLM to deduce the underlying pattern perfectly.

### Key Points:
*   **The Power of Patterns:** LLMs are ultimately massive pattern-matching engines. Few-shotting triggers their strongest capability.
*   **Dynamic Few-Shotting:** In a production app, you don't hardcode the same 5 examples forever. You use a Vector Database to search for the 5 past examples *most semantically similar* to the current user's input, and inject those dynamically before sending the prompt to the API.

### Examples / Use Cases:

*   **Example 1: Zero-Shot Failure:** Prompt: "Translate this slang into formal English: 'That logic is totally fugazi.'" Output: LLM hallucinates or refuses.
*   **Example 2: Few-Shot Success:** Prompt: 
    *   Input: "He's capping." -> Output: "He is lying."
    *   Input: "That's drippy." -> Output: "That is stylish."
    *   Input: "That logic is totally fugazi." -> Output: "That logic is completely fake."

### Visuals:


### Implementation / Hands-On:

*   **Step 1:** Create a prompt designed to classify customer support tickets into 'Urgent', 'Standard', or 'Low Priority' based on subtle nuance.
*   **Step 2:** Test it Zero-Shot with an ambiguous ticket. Note the result.
*   **Step 3:** Add 3 Few-Shot examples to the prompt that explicitly demonstrate how to handle ambiguous wording, then re-test.

### Summary / Key Takeaways:

*   In-context learning is the fastest way to improve model accuracy without expensive fine-tuning.
*   Providing 3 to 5 diverse examples is the sweet spot for maximum ROI on prompt engineering.
*   Dynamic Few-Shotting involves retrieving the most relevant examples programmatically on the fly.

### Optional Exercises / Prompts:

*   **Exercise 1:** Write a Few-Shot prompt to teach an LLM a completely made-up language or logic puzzle (e.g., "If I say BEEP, you say BOOP. If I say BOP, you say BAM"). Provide 4 examples, and see if it correctly answers the 5th prompt.
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
# MODULE 2 — Advanced Reasoning Frameworks
**Learning Objectives:**
* Implement Chain-of-Thought (CoT) to dramatically improve LLM logic and math capabilities.
* Understand the concept of "computational scratchpads."
* Explore parallel reasoning through Tree-of-Thought (ToT) strategies.

---

## Lesson 1 — Chain-of-Thought (CoT) Deep Dive

### Definition / Explanation:

**Point 1: The Working Memory Deficit**
Large Language Models do not possess working memory in the way humans do. If you ask an LLM a complex math equation and demand it output *only* the final number instantly, it attempts to compute the entire multi-step process in a single forward pass of its neural network. It will almost certainly fail or hallucinate.

**Point 2: Forcing the LLM to "Think Out Loud"**
**Chain-of-Thought (CoT)** solves this hardware limitation by forcing the model to print its intermediate reasoning steps to the screen before generating the final answer. Because the model can "read" its own previous output tokens, printing the steps effectively acts as a computational scratchpad, allowing it to perform complex logic sequentially.

### Key Points:
*   **Zero-Shot CoT:** The simplest implementation. Simply appending "Take a deep breath and work on this problem step-by-step" to the end of your prompt forces the model to break it down.
*   **Few-Shot CoT:** Providing examples in your prompt where the 'Output' includes the full step-by-step reasoning path before the final answer.
*   **Production Implementation:** In consumer apps, users don't want to read the AI's math. Developers use CoT under the hood to ensure accuracy, but programmatically parse out and *hide* the "thought" text, displaying only the final aggregated result to the end user.

### Examples / Use Cases:

*   **Example 1: The Failure:** Prompt: "If John has 5 apples, gives 2 to Mary, buys 3x what he has left, and drops 1, how many does he have? ONLY give the number." -> Output: "7" (Incorrect).
*   **Example 2: The CoT Success:** Prompt: "Solve step by step." -> Output: "1. John starts with 5. 2. Gives 2 to Mary (5-2=3). 3. Buys 3x what he has left (3*3=9. Total is 3+9=12). 4. Drops 1 (12-1=11). Answer: 11."

### Visuals:


### Implementation / Hands-On:

*   **Step 1:** Find a complex logic riddle online (e.g., Einstein's Riddle or a tricky algebra word problem).
*   **Step 2:** Ask an LLM to solve it, but strictly demand it only outputs the final one-word answer.
*   **Step 3:** Ask the exact same riddle, but mandate it uses Chain-of-Thought to write out every logical deduction before giving the answer. Compare the accuracy.

### Summary / Key Takeaways:

*   LLMs require sequential token generation to perform complex logic accurately.
*   CoT acts as a "scratchpad" for the AI's working memory.
*   Always use CoT for math, coding, or multi-step reasoning tasks.

### Optional Exercises / Prompts:

*   **Exercise 1:** Write a system prompt that mandates the LLM wrap its reasoning process in \`<thought>\` XML tags, and its final answer in \`<answer>\` tags, so that a python script could easily hide the thoughts from a user.
          `
        },
        { 
          id: "c5-m2-l2",
          title: "Tree-of-Thought (ToT)", 
          duration: "30 min",
          type: "reading",
          content: `
## Lesson 2 — Tree-of-Thought (ToT)

### Definition / Explanation:

**Point 1: The Flaw in Linear CoT**
Chain-of-Thought is strictly linear. If the model makes a slight logical mistake in step 2 of its reasoning, steps 3, 4, and 5 will compound that error (known as a hallucination cascade), guaranteeing a wrong final answer.

**Point 2: Parallel Search and Backtracking**
**Tree-of-Thought (ToT)** is a framework designed to model deliberate human decision-making by evaluating multiple parallel paths recursively. It allows the model to explore options, realize a path is flawed, "backtrack", and try a different route.

### Key Points:
*   **Generate (The Branches):** The LLM is prompted to generate 3 to 5 different *possible* next steps for solving a problem, rather than just committing to one.
*   **Evaluate (The Judge):** A secondary prompt asks the LLM to critically rate each of those generated steps (e.g., "Highly Likely to Succeed", "Sure", "Impossible Dead End").
*   **Search (The Recursion):** A programmatic system (using Python or LangChain) branches down the most promising path. If that path hits a dead end later, the script traverses back up the "tree" to explore the second-best option.

### Examples / Use Cases:

*   **Example 1: Creative Writing:** A ToT system writing a novel first generates 3 different plot outlines for Chapter 1. It self-evaluates which outline introduces the most tension, selects it, and then generates 3 options for how the protagonist reacts, building a highly optimized structural tree.
*   **Example 2: Complex Software Engineering:** When asked to write a complex sorting algorithm, the ToT framework evaluates using a Hash Map versus a Binary Tree, tests the logic of both in parallel, and commits to the most performant path.

### Visuals:


### Implementation / Hands-On:

*   **Step 1:** Act as the programmatic ToT controller manually. Give ChatGPT a difficult prompt (e.g., "Write a marketing strategy for a B2B SaaS tool").
*   **Step 2:** Tell it to generate 3 high-level concepts.
*   **Step 3:** Reply: "Evaluate the pros and cons of those 3 concepts, and rank them."
*   **Step 4:** Reply: "Proceed with the #1 ranked concept and build out the next 3 tactical steps."

### Summary / Key Takeaways:

*   ToT prevents linear hallucination cascades by introducing self-evaluation and backtracking.
*   It is highly computationally expensive (requiring many API calls) compared to standard CoT.
*   Reserve ToT for tasks requiring highest-order executive planning, coding, or deep creative structuring.

### Optional Exercises / Prompts:

*   **Exercise 1:** Write a prompt that explicitly demands the LLM simulate a ToT process inside a single response (e.g., "Brainstorm 3 approaches, evaluate them internally, and only output the full execution of the best one").
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
# MODULE 3 — Programmatic Prompting (DSPy)
**Learning Objectives:**
* Understand the fragility of manual string-based prompt tuning.
* Introduce DSPy and the paradigm of compiling prompts like code.
* Define prompt "Signatures" and automated optimization.

---

## Lesson 1 — Compiling Prompts with DSPy

### Definition / Explanation:

**Point 1: The End of Manual Prompt Tweaking**
Imagine you spend 40 hours meticulously crafting the perfect conversational prompt for GPT-4. You carefully select adjectives and format constraints. Suddenly, OpenAI releases GPT-5. Your prompt is now obsolete, because the new model reacts to those specific words differently. This highlights the inherent "fragility" of string-based manual prompt engineering.

**Point 2: Enter DSPy (Demonstrate, Search, Predict)**
Developed by researchers at Stanford, DSPy fundamentally shifts prompting from *writing text* into *writing code*. Instead of tweaking English adjectives ("Be extremely helpful and concise"), you define the architectural **Signature** of the task (e.g., \`Question -> SQL Query\`).

### Key Points:
*   **Separating Logic from Language:** You define the logic pipeline (e.g., CoT -> RAG Retrieval -> Final Answer) programmatically, independent of the actual words used to prompt the LLM.
*   **The Compiler (The Optimizer):** You provide DSPy with a dataset of correct Input/Output pairings (e.g., 50 questions mapped to 50 correct SQL queries). DSPy then automatically "compiles" the optimal prompt.
*   **Automated Search:** DSPy tests hundreds of prompt wording variations against your dataset autonomously. It mathematically determines the exact combination of words and Few-Shot examples that produces the highest accuracy for the *specific model* you are using.

### Examples / Use Cases:

*   **Example 1: The Model Migration:** An enterprise company uses a highly complex prompt to extract medical data using Claude 3 Opus. They decide to switch to a cheaper, open-source model like Llama-3. Instead of rewriting the prompt manually for weeks, they simply run their DSPy script. The compiler tests the dataset against Llama-3 and automatically outputs a brand new, hyper-optimized prompt tailored perfectly for the new model's quirks.

### Visuals:


### Implementation / Hands-On:

*   **Step 1:** Search GitHub or the DSPy documentation for a basic "Hello World" tutorial.
*   **Step 2:** Review how a \`dspy.Signature\` is defined (it looks like a simple Python class declaration rather than a block of English text).
*   **Step 3:** Conceptually understand that DSPy is the equivalent of PyTorch for prompting—treating the prompt as parameters to be optimized rather than static strings.

### Summary / Key Takeaways:

*   Manual prompt engineering is fragile and model-dependent.
*   DSPy treats prompt engineering as a machine learning optimization problem.
*   You supply the metric (the correct answers), and the DSPy compiler discovers the best possible prompt to achieve that metric automatically.

### Optional Exercises / Prompts:

*   **Exercise 1:** If you had to provide a dataset of 20 "Golden Examples" to a DSPy optimizer to train an AI on how to evaluate the tone of customer emails, write out 3 distinct examples (Input text + the exact desired Output) you would include in that set.
          `
        },
        { 
          id: "c5-m3-l2",
          title: "Quiz: Programmatic Prompting",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "What fundamental problem with traditional prompt engineering does DSPy attempt to solve?",
              options: ["It makes the API calls faster", "It eliminates the fragility of hardcoded text prompts breaking when underlying model versions change", "It reduces the cost of tokens to zero", "It prevents all hallucinations"],
              correctAnswer: "B",
              explanation: "DSPy treats prompts as compilable parameters that can be optimized programmatically against a metric, abstracting away the need to manually tweak static English sentences."
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
