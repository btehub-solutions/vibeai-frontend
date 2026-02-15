import { Course } from "../course-types";

export const course4: Course = {
  id: 4,
  title: "Large Language Models Deep Dive",
  description: "Understand LLM architecture, training, fine-tuning, and practical applications.",
  longDescription: "Master Large Language Models from the ground up. Learn transformer architecture, attention mechanisms, how LLMs are trained and fine-tuned, and how to use them effectively in no-code and low-code scenarios. Understand limitations and best practices.",
  progress: 0,
  lessons: 24,
  completedLessons: 0,
  duration: "8 hours",
  category: "Advanced",
  prerequisites: ["NLP Mastery"],
  learningOutcomes: [
    "Understand LLM architecture and training",
    "Use LLMs effectively for various tasks",
    "Fine-tune models for specific use cases",
    "Recognize LLM limitations and risks"
  ],
  modules: [
    {
      title: "Module 1: LLM Foundations",
      lessons: [
        { 
          id: "c4-m1-l1",
          title: "Introduction to Large Language Models", 
          duration: "20 min",
          type: "reading",
          content: `
# What are Large Language Models (LLMs)?

LLMs are massive neural networks trained on vast amounts of text data. They are capable of understanding and generating human-like text.

## How large is "Large"?
*   **Parameters**: The internal variables the model uses to make predictions. GPT-3 has 175 billion parameters.
*   **Training Data**: Trillions of words from the internet, books, and code.
*   **Capabilities**: Summarization, Translation, Q&A, Code Generation, Creative Writing.

## How do they work?
At their core, LLMs area just next-token predictors. Given a sequence of words, they predict the most likely next word.
"The cat sat on the..." -> "mat" (Prob: 0.8), "chair" (Prob: 0.1).
          `
        },
        { 
          id: "c4-m1-l2",
          title: "Transformer Architecture Deep Dive", 
          duration: "30 min",
          type: "reading",
          content: `
# Transformer Architecture

The Transformer is the engine behind all modern LLMs.

## Key Components
1.  **Encoder**: Reads the input text.
2.  **Decoder**: Generates the output text.
3.  **Self-Attention**: Allows the model to weigh the importance of different words in a sentence relative to each other.

## Why is it better than older models (RNNs/LSTMs)?
*   **Parallelization**: Can be trained on massive datasets much faster.
*   **Long-Range Dependencies**: Can remember context from thousands of words ago.
*   **Scalability**: Performance improves predictably with more data and compute.
          `
        },
        {
          id: "c4-m1-l3",
          title: "Quiz: LLM Architecture",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "What is the core mechanism that allows Transformers to handle context effectively?",
              options: ["Convolution", "Self-Attention", "Recurrence", "Pooling"],
              correctAnswer: "B",
              explanation: "Self-Attention (specifically, Multi-Head Attention) allows the model to capture relationships between words regardless of their distance."
            }
          ]
        }
      ]
    },
    {
      title: "Module 2: Training & Fine-Tuning",
      lessons: [
        { 
          id: "c4-m2-l1",
          title: "Pre-Training vs. Fine-Tuning", 
          duration: "28 min",
          type: "reading",
          content: `
# How LLMs are Trained

## Stage 1: Pre-Training
*   **Objective**: Predict the next token.
*   **Data**: The entire internet (Common Crawl, Wikipedia, GitHub).
*   **Result**: A "Base Model" that understands language but isn't very helpful (it just completes sentences).
*   **Cost**: Millions of dollars.

## Stage 2: Fine-Tuning (Instruction Tuning)
*   **Objective**: Follow instructions.
*   **Data**: Curated Q&A pairs written by humans.
*   **Result**: An "Instruct Model" (like ChatGPT) that answers questions.

## Stage 3: RLHF (Reinforcement Learning from Human Feedback)
*   **Objective**: Align closely with human preferences (Helpful, Honest, Harmless).
*   **Process**: Humans rank model outputs, and a reward model is trained to predict which answer is better.
          `
        },
        { 
          id: "c4-m2-l2",
          title: "Parameter-Efficient Fine-Tuning (PEFT)", 
          duration: "24 min",
          type: "reading",
          content: `
# Parameter-Efficient Fine-Tuning (PEFT)

Fine-tuning a 70B parameter model requires massive GPU memory. PEFT allows us to fine-tune large models on consumer hardware.

## LoRA (Low-Rank Adaptation)
Instead of updating all weights, LoRA freezes the pre-trained model and injects trainable rank decomposition matrices into each layer.
*   **Result**: Reduces the number of trainable parameters by 10,000x.
*   **Benefits**: Faster training, less memory, separation of base model and adapter.
          `
        },
        {
          id: "c4-m2-l3",
          title: "Quiz: Training Process",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "What is the main goal of RLHF?",
              options: ["To make the model faster", "To align the model with human values", "To increase the vocabulary size", "To reduce training cost"],
              correctAnswer: "B",
              explanation: "Reinforcement Learning from Human Feedback (RLHF) aligns the model's outputs with human intent (Helpful, Honest, Harmless)."
            }
          ]
        }
      ]
    },
    {
      title: "Module 3: Using LLMs",
      lessons: [
        { 
          id: "c4-m3-l1",
          title: "Context Windows & Token Limits", 
          duration: "24 min",
          type: "reading",
          content: `
# Context Windows

The "Context Window" is the maximum amount of text an LLM can process at once (Input + Output).

## Limitations
*   GPT-4 (Original): 8k tokens (~6,000 words).
*   Claude 3: 200k tokens (~150,000 words).
*   Gemini 1.5 Pro: 1 million+ tokens.

If you exceed the context window, the model "forgets" the beginning of the conversation.

## Strategies
1.  **Summarization**: Summarize previous turns to fit in context.
2.  **RAG (Retrieval-Augmented Generation)**: Retrieve only relevant chunks of documents.
          `
        },
        { 
          id: "c4-m3-l2",
          title: "Hallucinations", 
          duration: "20 min",
          type: "reading",
          content: `
# Hallucinations

An "AI Hallucination" occurs when an LLM generates false information confidently.

## Why do they happen?
*   LLMs are probabilistic. They don't "know" facts; they predict words.
*   They prioritize fluency over accuracy.

## Mitigation
*   **Grounding**: Providing the model with reference text (RAG).
*   **Temperature**: Lowering temperature (e.g., to 0) reduces randomness.
*   **Verification**: Adding a step to verify facts against a trusted source.
          `
        }
      ]
    }
  ],
  projects: [
    {
      title: "Mini-Project 1: LLM Comparison Study",
      description: "Compare 3 different LLMs on the same tasks and analyze their strengths and weaknesses.",
      duration: "3 hours",
      difficulty: "intermediate"
    },
    {
      title: "Capstone: LLM-Powered Application",
      description: "Build a complete application powered by LLMs, addressing real-world needs with proper safety measures.",
      duration: "6 hours",
      difficulty: "advanced"
    }
  ]
};
