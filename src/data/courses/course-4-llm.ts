import { Course } from "../course-types";

export const course4: Course = {
  id: 4,
  title: "Large Language Models Deep Dive",
  description: "Understand LLM architecture, training paradigms, fine-tuning, and practical limitations.",
  longDescription: "Master Large Language Models from the mathematical ground up. Learn the intricacies of the Transformer architecture, attention mechanisms, the three-stage training pipeline (Pre-training, SFT, RLHF), and how to fine-tune massive models on consumer hardware using LoRA and QLoRA.",
  progress: 0,
  lessons: 24,
  completedLessons: 0,
  duration: "8 hours",
  category: "Advanced",
  prerequisites: ["NLP Mastery"],
  learningOutcomes: [
    "Deconstruct the Transformer architecture and Self-Attention",
    "Understand the distinction between Base Models and Instruct Models",
    "Implement Parameter-Efficient Fine-Tuning (PEFT/LoRA)",
    "Diagnose and mitigate LLM hallucinations via architectural constraints"
  ],
  modules: [
    {
      title: "Module 1: LLM Architecture",
      lessons: [
        { 
          id: "c4-m1-l1",
          title: "The Transformer Engine", 
          duration: "30 min",
          type: "reading",
          content: `
# MODULE 1 — LLM Architecture
**Learning Objectives:**
* Understand the historical shift from sequential RNNs to parallel Transformers.
* Differentiate between Encoder-only and Decoder-only architectures.
* Define tokenization and embedding spaces in neural networks.

---

## Lesson 1 — The Transformer Engine

### Definition / Explanation:

**Point 1: The Bottleneck of the Past**
Before 2017, Natural Language Processing (NLP) relied heavily on Recurrent Neural Networks (RNNs) and Long Short-Term Memory networks (LSTMs). These architectures processed text sequentially (word-by-word). This was incredibly slow to train, and more importantly, they suffered from the "vanishing gradient" problem—by the time the model read the end of a long paragraph, it mathematically "forgot" the context of the first sentence.

**Point 2: The Parallel Revolution**
The seminal paper *"Attention Is All You Need"* (Google, 2017) changed everything by introducing the **Transformer** architecture. Transformers do not read sequentially; they process the *entire sequence* of words all at once. This mathematical parallelization is what allowed researchers to train models on thousands of GPUs simultaneously, scaling them up from reading megabytes of text to petabytes.

### Key Points:
*   **Tokens:** LLMs do not read letters or whole words; they read Tokens (roughly chunks of 3-4 characters). A token is mapped to a massive numerical vector (an Embedding) representing its semantic meaning.
*   **Encoders:** Models (like BERT) specialized in reading and understanding text (Classification, Sentiment). They look at the whole sentence bidirectionally to gather deep context.
*   **Decoders:** Models (like the GPT series, Llama 3) specialized in *generating* text. They predict the next token based strictly on the prior tokens (autoregression) iteratively.

### Examples / Use Cases:

*   **Example 1: Encoder Use Case:** A bank uses an Encoder model to read thousands of legal contracts to classify them as "Compliant" or "Non-Compliant" instantaneously.
*   **Example 2: Decoder Use Case:** A user prompts ChatGPT with "Once upon a..." and the Decoder model calculates the highest probability token to follow is "time", and appends it to the sequence.

### Visuals:

[IMAGE: An architectural diagram simplified from the "Attention Is All You Need" paper, highlighting the Encoder stack on the left and Decoder stack on the right.]

### Implementation / Hands-On:

*   **Step 1:** Go to the OpenAI Tokenizer website (platform.openai.com/tokenizer).
*   **Step 2:** Type in a complex sentence with compound words, slang, and emojis.
*   **Step 3:** Observe how the text is highlighted in different colors. Count how many tokens your text breaks down into compared to how many words it has.

### Summary / Key Takeaways:

*   Transformers revolutionized AI by allowing parallel processing of text.
*   Decoder-only models are the foundation of modern Generative AI chatbots.
*   Text is converted into numerical tokens before a model can perform matrix math on it.

### Optional Exercises / Prompts:

*   **Exercise 1:** Write a prompt to an LLM asking it to explain how an Autoregressive Decoder generates a sentence, requiring it to limit the explanation to a single short paragraph.
          `
        },
        { 
          id: "c4-m1-l2",
          title: "Self-Attention Mechanism", 
          duration: "35 min",
          type: "reading",
          content: `
## Lesson 2 — Self-Attention Mechanism

### Definition / Explanation:

**Point 1: Solving the Context Problem**
How does an AI engine know that in the sentence *"The bark of the tree was rough,"* the word "bark" means wood, but in the sentence *"The bark of the dog was loud,"* it means a sound? The answer is the **Self-Attention** mathematical mechanism. 

**Point 2: Query, Key, and Value Matrices**
When a Transformer processes a sequence, it allows every token to mathematically "look" at every other token in the sentence simultaneously. It assigns numerical "attention weights" between words. 
*   **Query:** What the current token is looking for.
*   **Key:** What other tokens contain.
*   (When the Query of "bark" matches the Key of "tree", a strong Attention Weight is formed).
*   **Value:** The actual semantic meaning that gets passed forward.

### Key Points:
*   **Multi-Head Attention:** The model doesn't just calculate attention once per layer. It has multiple "heads" doing this simultaneously in parallel.
*   **Specialization of Heads:** Head 1 might calculate grammatical relationships (nouns touching verbs). Head 2 might calculate emotional tone. Head 8 might track proper nouns across paragraphs.
*   **Contextual Embeddings:** By combining the math from all these heads, the model updates the numerical vector for the word "bark" so that it now holds the rich, multi-dimensional mathematical representation of "rough wood" rather than "loud noise."

### Examples / Use Cases:

*   **Example 1: Pronoun Resolution:** "The cat didn't cross the street because **it** was too tired." Self-attention connects the pronoun "it" heavily to "cat" (based on the adjective tired). "The cat didn't cross the street because **it** was too wide." Self-attention connects "it" heavily to "street" (based on the adjective wide).

### Visuals:

[IMAGE: A heatmap diagram illustrating Self-Attention connecting the words in a sentence with varying line thicknesses representing the mathematical attention weights.]

### Implementation / Hands-On:

*   **Step 1:** Write a paragraph containing 5 ambiguous words (e.g., bat, right, bank, match).
*   **Step 2:** Manually draw connecting lines from those ambiguous words to the surrounding context words that define their meaning. You are illustrating standard Self-Attention weights.

### Summary / Key Takeaways:

*   Self-attention allows LLMs to process words contextually instead of in isolation.
*   Multi-head attention assigns multiple simultaneous calculations (grammar, tone, syntax) to a single word.
*   The mechanism relies on calculating the dot-product of Query and Key vectors.

### Optional Exercises / Prompts:

*   **Exercise 1:** Use an AI to generate a complex paragraph filled with pronouns ("he", "it", "they") referencing different subjects. Note how easily the AI tracks the entities compared to older software parsers.
          `
        },
        {
          id: "c4-m1-l3",
          title: "Quiz: Architecture",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "Which model architecture is the GPT (Generative Pre-trained Transformer) series built upon?",
              options: ["Encoder-only", "Decoder-only", "RNN-LSTMs", "Convolutional Neural Networks"],
              correctAnswer: "B",
              explanation: "GPT models are autoregressive, Decoder-only models built to predict the next token in sequence."
            }
          ]
        }
      ]
    },
    {
      title: "Module 2: Training Pipeline",
      lessons: [
        { 
          id: "c4-m2-l1",
          title: "Stage 1: Pre-Training (The World Model)", 
          duration: "28 min",
          type: "reading",
          content: `
# MODULE 2 — Training Pipeline
**Learning Objectives:**
* Differentiate between the three distinct stages of LLM training.
* Understand Self-Supervised Learning and Base Models.
* Explore how RLHF aligns dangerous statistical engines into helpful chatbots.

---

## Lesson 1 — Stage 1: Pre-Training (The World Model)

### Definition / Explanation:

**Point 1: The Massive Scale of Self-Supervised Learning**
The foundational secret to LLMs is **Self-Supervised Learning**. Engineers do not need human workers to painstakingly label millions of data points to teach the model English. Instead, they algorithmically mask the data.
The process: Take a massive dataset (e.g., an entire Wikipedia dump). Hide the last word of every sentence. Ask the initialized (blank) neural network to guess the word.

**Point 2: Backpropagation at Scale**
On loop 1, the model guesses wrong. The architecture calculates the "loss" (how wrong it was) and uses a calculus algorithm called Backpropagation to update its billions of internal parameters (weights and biases) to be slightly less wrong next time. This repeats trillions of times across petabytes of text using clusters of H100 GPUs (costing tens of millions of dollars).

### Key Points:
*   **The Output: A Base Model:** The result of this millions-of-dollars compute run is a "Base Model" (e.g., Llama-3-Base or GPT-3).
*   **Base Models don't Converse:** Base models do NOT answer questions. They are pure statistical completion engines.
*   **The Completion Problem:** If you prompt a Base Model with: *"What is the capital of France?"*, it might autocomplete the text with: *"What is the capital of Germany? What is the capital of Italy?"* It simply continues the structural pattern it saw most often on the internet (a list of trivia questions), rather than answering you.

### Examples / Use Cases:

*   **Example 1: The Code Base Model:** A model pre-trained exclusively on GitHub repositories. It cannot talk about history, but if you give it half a python script, it will flawlessly autocomplete the other half.

### Visuals:

[IMAGE: A flowchart showing the compute lifecycle. Huge unstructured text data -> H100 GPU Cluster -> Backpropagation Loop -> Base Model generation.]

### Implementation / Hands-On:

*   **Step 1:** Go to a site hosting base models (like HuggingFace). Find a model explicitly marked as "Base" (not "-Instruct" or "-Chat").
*   **Step 2:** Provide it a prompt formatted as a question.
*   **Step 3:** Observe how it fails to "answer" and instead simply continues the syntactic pattern of your prompt.

### Summary / Key Takeaways:

*   Pre-training is the most expensive and time-consuming stage of AI development.
*   It utilizes self-supervised next-token prediction to learn grammar, facts, and code.
*   A Base Model is a pattern continuator, not a helpful assistant.

### Optional Exercises / Prompts:

*   **Exercise 1:** Write a paragraph explaining the mathematical concept of "Loss" in neural network training using an analogy of a person throwing darts at a dartboard while blindfolded.
          `
        },
        { 
          id: "c4-m2-l2",
          title: "Stage 2 & 3: SFT and RLHF", 
          duration: "30 min",
          type: "reading",
          content: `
## Lesson 2 — Stage 2 & 3: SFT and RLHF

### Definition / Explanation:

**Point 1: Supervised Fine-Tuning (SFT)**
To turn a wild, rambling Base Model into a useful assistant, we conduct Supervised Fine-Tuning. This requires highly paid human experts (PhDs, coders, doctors) to write thousands of perfect "Question/Answer" pairs. We train the Base Model on this formatted structured dataset. The model learns that when it sees a Prompt (User token), it should generate a comprehensive Response (Assistant token). This creates an "Instruct" model.

**Point 2: Reinforcement Learning from Human Feedback (RLHF)**
Even after SFT, models can be rude, politically biased, or overly verbose. They need behavioral alignment. 
In RLHF:
1. The SFT model generates 3 different answers to a prompt. Human annotators rank them from best to worst.
2. A secondary neural network (the **Reward Model**) is trained on these rankings to learn what humans "prefer" (usually polite, helpful, harmless text).
3. The LLM then plays a game against the Reward Model, generating answers and attempting to maximize its score using Proximal Policy Optimization (PPO).

### Key Points:
*   **Alignment Tax:** The intensive RLHF process makes models exceptionally polite and safe (refusing to tell you how to build a bomb), but often reduces their raw creative edge or coding capability (known in the industry as the Alignment Tax).
*   **Safety vs Uncensored:** Closed models (OpenAI, Anthropic) undergo heavy RLHF. Open-source communities often strip this out to build "Uncensored" models that have zero behavioral guardrails.
*   **The Final Product:** Pre-training + SFT + RLHF = The modern ChatGPT-style assistant.

### Examples / Use Cases:

*   **Example 1: The RLHF Refusal:** Prompt: "Write a script to automate spamming an email list." Output: "I cannot fulfill this request. I am programmed to be a helpful assistant and cannot write code intended for malicious spam or harassment."

### Visuals:

[IMAGE: An infographic mapping the 3-stage pipeline: 1. Pre-training (Petabytes of raw text) -> 2. SFT (Thousands of Human Q/A pairs) -> 3. RLHF (Human Ranking & Reward Model loop).]

### Implementation / Hands-On:

*   **Step 1:** Compare the response of heavily aligned models (like Claude) with less aligned open-source models (like Grok, if accessible, or uncensored LLaMA runs) on a controversial topic.
*   **Step 2:** Note the specific phrasing the aligned model uses to "hedge" its answers (e.g., "It is important to consider multiple perspectives...").

### Summary / Key Takeaways:

*   SFT teaches the model the "Question and Answer" conversational format.
*   RLHF aligns the model to be helpful, honest, and harmless using secondary reward networks.
*   Heavily aligned models suffer from safety refusals and the "alignment tax."

### Optional Exercises / Prompts:

*   **Exercise 1:** Act as the Reward Model. Write out a difficult, ambiguous prompt. Then write 3 different variations of a response. Rank those 3 responses logically based on criteria like formatting, politeness, and conciseness, explaining your rationale for each ranking.
          `
        }
      ]
    },
    {
      title: "Module 3: Customizing Models",
      lessons: [
        { 
          id: "c4-m3-l1",
          title: "Parameter-Efficient Fine-Tuning (LoRA)", 
          duration: "32 min",
          type: "reading",
          content: `
# MODULE 3 — Customizing Models
**Learning Objectives:**
* Overcome hardware limitations when attempting to train large AI models.
* Implement techniques to freeze base weights and inject tunable adapters.
* Define and utilize LoRA and QLoRA for consumer-grade fine-tuning.

---

## Lesson 1 — Parameter-Efficient Fine-Tuning (LoRA)

### Definition / Explanation:

**Point 1: The VRAM Hardware Crisis**
A 70 Billion parameter open-source model (like Llama-3 70B) requires hundreds of gigabytes of VRAM just to load its weights into memory for calculation. If an enterprise wants to fine-tune that model on their private corporate data, modifying all 70B weights simultaneously requires a massive multi-GPU server cluster (which costs thousands of dollars a day to rent). Standard fine tuning is inaccessible to smaller developers.

**Point 2: The LoRA (Low-Rank Adaptation) Breakthrough**
Instead of attempting to tweak all 70B weights, **LoRA** introduces a brilliant mathematical shortcut. 
1. It completely *freezes* the original Base Model. 
2. It injects a tiny, empty "adapter" (represented as a pair of small singular value decomposition matrices) alongside every neural layer.
3. During the training run, the data passes through the frozen model, but the gradient updates *only* train the tiny adapter weights.

### Key Points:
*   **Massive Cost Reduction:** You reduce the number of trainable parameters by up to 10,000x. You can fine-tune a specialized adapter for a massive LLM on a single high-end consumer GPU (like an RTX 4090) in just a few hours.
*   **Hot-Swappability:** You don't create multiple huge copies of the model. You keep one 140GB Base Model on your server. When the Legal department makes a query, you instantly hot-swap the tiny 50MB "Legal LoRA adapter." When Marketing queries it, you swap to the "Marketing LoRA."
*   **QLoRA (Quantized LoRA):** Takes this a step further by violently compressing (quantizing) the frozen Base model down from 16-bit to 4-bit precision to save even more VRAM during the training process, mathematically ensuring almost zero degradation in performance.

### Examples / Use Cases:

*   **Example 1: The Coding Specialist:** A developer takes an open-source 8B model. They create a dataset of 10,000 perfectly formatted Python scripts using their company's proprietary framework. They train a LoRA on this dataset. The output is a tiny 30MB adapter file that forces the LLM to output perfect proprietary code.

### Visuals:

[IMAGE: A conceptual diagram showing the massive 'Frozen Pre-Trained Weights' block, with a bypass arrow moving through two tiny, trainable 'LoRA Matrix' blocks before summing the output together.]

### Implementation / Hands-On:

*   **Step 1:** Browse the HuggingFace model hub and filter your search specifically for "LoRA" or "Adapter" models.
*   **Step 2:** Notice how small the file sizes of the adapters are (often under 100MB) compared to the underlying base models (often over 10GB).
*   **Step 3:** Review documentation for the \`PEFT\` (Parameter-Efficient Fine-Tuning) python library to see the 3 lines of code required to inject an adapter into an architecture.

### Summary / Key Takeaways:

*   Full-parameter fine-tuning of modern LLMs is financially impossible for individuals.
*   LoRA freezes the base intelligence and only trains a tiny subset of injected weights.
*   LoRAs are highly modular, lightweight files that can be swapped dynamically at runtime depending on the application task.

### Optional Exercises / Prompts:

*   **Exercise 1:** Imagine you are architecting a SaaS application that writes highly tailored cover letters for 10 different industries (Nursing, Tech, Law, etc). Write a technical architecture summary explaining why you would use one Master LLM loaded in VRAM with 10 hot-swappable LoRAs, rather than maintaining 10 completely fine-tuned heavy models.
          `
        },
        {
          id: "c4-m3-l2",
          title: "Quiz: Advanced tuning",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "Why is LoRA considered a breakthrough for open-source AI developers?",
              options: ["It makes the model perfectly hallucination-free", "It allows developers to customize massive models on single consumer GPUs by only updating a tiny subset of injected weights", "It writes the code for the developer", "It replaces the Attention mechanism"],
              correctAnswer: "B",
              explanation: "LoRA dramatically democratized AI by lowering the compute barrier required to fine-tune models from enterprise-level server farms down to consumer gaming PCs."
            }
          ]
        }
      ]
    }
  ],
  projects: [
    {
      title: "Capstone: Train a Custom LoRA Adapter",
      description: "Using a Google Colab notebook, prepare a dataset of Python code, configure a QLoRA training script using HuggingFace libraries, and fine-tune an open-source 8B model to write in your specific coding style.",
      duration: "8 hours",
      difficulty: "advanced"
    }
  ]
};
