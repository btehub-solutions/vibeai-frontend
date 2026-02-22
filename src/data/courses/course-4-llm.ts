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
# The Transformer Architecture

Before 2017, NLP relied on Recurrent Neural Networks (RNNs) and LSTMs. These processed text sequentially (word-by-word), which was incredibly slow and prone to forgetting early context in long paragraphs.

The seminal paper *"Attention Is All You Need"* (Google, 2017) introduced the **Transformer**.

## Parallel Processing
Transformers process the *entire sequence* of words all at once. This parallelization is what allowed researchers to train models on thousands of GPUs simultaneously, scaling them up to trillions of words.

## Encoders and Decoders
*   **Encoder-Only Models (e.g., BERT):** Specialized in reading and understanding text (Classification, Sentiment). They read the whole sentence simultaneously to gather deep bidirectional context.
*   **Decoder-Only Models (e.g., GPT series, Llama 3):** Specialized in *generating* text. They predict the next token based strictly on the prior tokens (autoregression).
          `
        },
        { 
          id: "c4-m1-l2",
          title: "Self-Attention Mechanism", 
          duration: "35 min",
          type: "reading",
          content: `
# The Core Innovation: Self-Attention

How does an AI know that in the sentence *"The bark of the tree was rough,"* the word "bark" means wood, but in *"The bark of the dog was loud,"* it means a sound?

**Self-Attention** allows the model to look at every other word in the sentence while processing the current word, assigning numerical "attention weights" to them.

1.  When processing "bark" in the first sentence, the model calculates math vectors (Query, Key, Value) that heavily associate it with the word "tree".
2.  **Multi-Head Attention:** The model doesn't just do this once. It has multiple "heads" doing this simultaneously. Head 1 might look for grammatical relationships (nouns/verbs). Head 2 might look for emotional tone. Head 8 might track proper nouns.
3.  Combine these math vectors, and the model now holds a rich, multi-dimensional mathematical representation of the exact contextual meaning of the word in that specific sentence.
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
# Pre-Training the Foundation

The secret to LLMs is **Self-Supervised Learning**. You don't need humans to label the data.

*   Take a massive dataset (e.g., an entire Wikipedia dump).
*   Hide the last word of every sentence.
*   Ask the initialized (blank) neural network to guess the word.
*   It guesses wrong. The model updates its parameters (weights and biases) via backpropagation to be slightly less wrong next time.
*   Repeat this trillions of times across petabytes of text using clusters of H100 GPUs (costing tens of millions of dollars).

**The Result: A Base Model (e.g., Llama-3-Base).**
Base models do NOT answer questions. If you prompt a Base Model with: *"What is the capital of France?"*, it might autocomplete it with: *"What is the capital of Germany? What is the capital of Italy?"* It simply continues the pattern.
          `
        },
        { 
          id: "c4-m2-l2",
          title: "Stage 2 & 3: SFT and RLHF", 
          duration: "30 min",
          type: "reading",
          content: `
# Supervised Fine-Tuning (SFT)
To make the Base Model useful, we conduct SFT. Humans write thousands of high-quality Question/Answer pairs. We train the model on this formatting so it learns that when it sees a Prompt, it should generate a helpful Response rather than just rambling on.

# Reinforcement Learning from Human Feedback (RLHF)
Even after SFT, models can be rude, biased, or overly verbose.
1.  **Reward Model:** The LLM generates 3 different answers to a prompt. Human workers rank them from best (1) to worst (3). Another neural network (the Reward Model) learns what humans prefer.
2.  **PPO Update:** The LLM plays a "game." It generates an answer, the Reward Model grades it automatically, and the LLM updates its weights to maximize its score (using PPO - Proximal Policy Optimization).
This creates the highly aligned, safe, conversational models we use today (like ChatGPT).
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
# You Cannot Fine-Tune an LLM (Normally)

A 70 Billion parameter model requires hundreds of gigabytes of VRAM just to load into memory for training. Modifying all 70B weights requires multi-GPU server clusters.

## The Solution: LoRA (Low-Rank Adaptation)
Instead of tweaking all 70B weights, LoRA freezes the original Base Model entirely. 
It injects a tiny "adapter" (a pair of small mathematical matrices) alongside each neural layer.
During training, *only* the tiny adapter is trained.

*   **Impact:** You reduce the number of trainable parameters by 10,000x. You can fine-tune an adapter on a single consumer GPU (like an RTX 4090) in a few hours.
*   **Swappability:** You can train an adapter for "Medical Data" and an adapter for "Legal Data". Keep the massive Base Model loaded in RAM, and hot-swap the tiny 50MB adapters depending on the task.

*(QLoRA takes this a step further by quantizing—compressing—the Base model into 4-bit precision to save even more VRAM).*
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
