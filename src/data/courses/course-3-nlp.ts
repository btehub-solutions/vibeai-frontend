import { Course } from "../course-types";

export const course3: Course = {
  id: 3,
  title: "Natural Language Processing Mastery",
  description: "Master NLP techniques from tokenization to transformers, with real-world applications.",
  longDescription: "Explore the fascinating world of Natural Language Processing. Move beyond basic chatbots and learn how AI actually reads human language. Cover core NLP pipelines, statistical text representation (TF-IDF), dense vector embeddings (Word2Vec, GloVe), and the profound shift to Attention mechanisms and BERT.",
  progress: 0,
  lessons: 26,
  completedLessons: 0,
  duration: "9 hours",
  category: "Skills",
  prerequisites: ["AI Foundations"],
  learningOutcomes: [
    "Clean and normalize raw text using standard NLP pipelines",
    "Convert text into mathematical distributions using TF-IDF",
    "Understand how neural networks map semantic meaning via dense embeddings",
    "Implement bidirectional transformer architectures like BERT"
  ],
  modules: [
    {
      title: "Module 1: The NLP Pipeline",
      lessons: [
        { 
          id: "c3-m1-l1",
          title: "Introduction to NLP and Ambiguity", 
          duration: "20 min",
          type: "reading",
          content: `
# Reading Between the Lines

NLP is a field of AI that gives machines the ability to read, understand, and derive meaning from human languages.

## The Problem of Ambiguity

If you ask a computer to code "2 + 2", the answer is deterministically 4. 
But if you feed a computer the sentence: **"I saw the man on the hill with a telescope."**
*   Did I use a telescope to see the man?
*   Was the man carrying a telescope?
*   Was the telescope physically on the hill?

Humans use context to instantly resolve ambiguity. NLP algorithms must mathematically break down language to replicate this contextual understanding through Syntax (grammar) and Semantics (meaning).
          `
        },
        { 
          id: "c3-m1-l2",
          title: "Text Preprocessing", 
          duration: "24 min",
          type: "reading",
          content: `
# Cleaning the Data

Before we can feed text into a machine learning model, we must clean and prepare it. Raw text is extremely noisy.

## Key Steps in the Pipeline

1.  **Tokenization**: Breaking text into individual atomic units (usually words or sub-words).
    *   *Raw:* "Don't jump!" -> *Tokens:* ["Do", "n't", "jump", "!"]
2.  **Stop Word Removal**: Filtering out highly frequent words that carry zero semantic weight (e.g., "the", "a", "is", "and"). This shrinks the dataset size.
3.  **Stemming**: A brute-force algorithmic approach that chops off the ends of words to find the root. ("Running" -> "Run"). It's fast but often results in non-words ("Universe" -> "Univers").
4.  **Lemmatization**: A dictionary-based approach that maps words back to their actual linguistic root. ("Better" -> "Good"). It is slower but far more accurate than stemming.
          `
        },
        {
          id: "c3-m1-l3",
          title: "Quiz: NLP Basics",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "Which text preprocessing technique uses a dictionary to accurately return a word to its base, linguistically correct root?",
              options: ["Stemming", "Tokenization", "Lemmatization", "Stop Word Removal"],
              correctAnswer: "C",
              explanation: "Lemmatization uses a vocabulary and morphological analysis of words, aiming to return the base or dictionary form of a word (the lemma)."
            }
          ]
        }
      ]
    },
    {
      title: "Module 2: Text Representation (Math)",
      lessons: [
        { 
          id: "c3-m2-l1",
          title: "Bag of Words & TF-IDF", 
          duration: "24 min",
          type: "reading",
          content: `
# Converting Words to Math

Neural networks only understand numbers. We must vectorize the text.

## Bag of Words (BoW)
Imagine throwing all words from a sentence into a bag and simply counting them.
*   "The dog chases the cat" -> {"the": 2, "dog": 1, "chase": 1, "cat": 1}
*   *Flaw:* Count-based methods completely destroy word order and grammar.

## TF-IDF (Term Frequency-Inverse Document Frequency)
TF-IDF tries to find the most *important* words in a document, not just the most frequent.
*   **TF (Term Frequency):** How often does the word "Algorithm" appear in Document A? (Say, 10 times. High score).
*   **IDF (Inverse Document Frequency):** How often does the word "Algorithm" appear across *all 10,000* documents in our database? (Say, it only appears in 5 documents. This makes it rare, giving it a massive multiplier).

Words like "The" have high TF but very low IDF (because they appear everywhere), so their final score is 0. Words like "Algorithm" get high TF and high IDF, telling the model: "This document is highly associated with Algorithms."
          `
        },
        { 
          id: "c3-m2-l2",
          title: "Word Embeddings: Capturing Semantic Meaning", 
          duration: "28 min",
          type: "reading",
          content: `
# Dense Vector Embeddings

TF-IDF knows that "car" and "automobile" are different words, but it doesn't know they mean the same thing.

## Enter Word2Vec

Word2Vec (created by Google in 2013) is a neural network that predicts a word based on its surrounding neighbors. By doing this millions of times, it creates a 300-dimensional mathematical coordinate (a vector) for every word.

Because words with similar meanings appear in similar contexts, their coordinates end up grouped physically close together in this 300-dimensional space.

*   The distance between the coordinate for "Cat" and "Dog" is very small.
*   You can do math on meanings: \`Vector("King") - Vector("Man") + Vector("Woman")\` lands exactly on the coordinate for \`"Queen"\`.
          `
        }
      ]
    },
    {
      title: "Module 3: The Transformer Shift",
      lessons: [
        {
          id: "c3-m3-l1",
          title: "Contextual Embeddings with BERT",
          duration: "28 min",
          type: "reading",
          content: `
# The Problem with Word2Vec

Word2Vec assigns a single, static vector to every word. 
But consider the word "Bank":
1.  "I deposited money at the **bank**."
2.  "I sat on the river **bank**."

Word2Vec averaged these two meanings together, meaning its vector for "bank" was always slightly inaccurate.

## BERT (Bidirectional Encoder Representations from Transformers)
Google revolutionized search in 2018 with BERT. 
BERT is *contextual*. It reads the entire sentence forwards and backwards (Bidirectional) simultaneously using the Transformer's Attention mechanism. 

When it sees the word "bank", it looks at "deposited" and "money" and generates a temporary, dynamic math vector representing a *financial institution*. When it sees "river", it generates a completely different vector for *landmass*.
          `
        },
         {
          id: "c3-m3-l2",
          title: "Quiz: Advanced NLP",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "What specific limitation of Word2Vec did BERT solve?",
              options: ["Word2Vec was too slow to train", "Word2Vec generated static embeddings that could not distinguish between words with multiple meanings (polysemy)", "Word2Vec could not handle languages other than English", "Word2Vec could not do vector mathematics"],
              correctAnswer: "B",
              explanation: "BERT generates contextual embeddings dynamically based on the surrounding words in the sentence, solving the polysemy problem."
            }
          ]
        }
      ]
    }
  ],
  projects: [
    {
      title: "Capstone: Semantic Search Engine",
      description: "Build a search engine that doesn't just match keywords, but uses embedding models (like Sentence-BERT) to return documents that match the semantic meaning of the user's query.",
      duration: "6 hours",
      difficulty: "advanced"
    }
  ]
};
