import { Course } from "../course-types";

export const course3: Course = {
  id: 3,
  title: "Natural Language Processing Mastery",
  description: "Master NLP techniques from tokenization to transformers, with real-world applications.",
  longDescription: "Explore the fascinating world of Natural Language Processing. Learn how AI understands, processes, and generates human language. Cover core NLP tasks, pipelines, modern tools, and applications including African language processing.",
  progress: 0,
  lessons: 26,
  completedLessons: 0,
  duration: "9 hours",
  category: "Skills",
  prerequisites: ["AI Foundations"],
  learningOutcomes: [
    "Understand core NLP concepts and techniques",
    "Build NLP pipelines for text processing",
    "Apply NLP to real-world problems",
    "Work with multilingual and low-resource languages"
  ],
  modules: [
    {
      title: "Module 1: NLP Foundations",
      lessons: [
        { 
          id: "c3-m1-l1",
          title: "Introduction to Natural Language Processing", 
          duration: "20 min",
          type: "reading",
          content: `
# Introduction to Natural Language Processing (NLP)

NLP is a field of AI that gives machines the ability to read, understand, and derive meaning from human languages.

## What is NLP used for?

*   **Sentiment Analysis**: Determining if a review is positive or negative.
*   **Chatbots**: Conversing with users (e.g., Customer Service).
*   **Machine Translation**: Converting text from one language to another (e.g., Google Translate).
*   **Text Summarization**: Automatically generating a summary of a long document.

## How does it work?

Natural language is complex and ambiguous. "I saw the man on the hill with a telescope."
*   Did I have the telescope?
*   Did the man have the telescope?
*   Was the telescope on the hill?

NLP algorithms break down language into smaller, more manageable pieces using techniques like tokenization, stemming, and lemmatization.
          `
        },
        { 
          id: "c3-m1-l2",
          title: "Text Preprocessing Pipeline", 
          duration: "24 min",
          type: "reading",
          content: `
# Text Preprocessing Pipeline

Before we can feed text into a machine learning model, we must clean and prepare it.

## Key Steps

1.  **Tokenization**: Breaking text into individual words or sub-words ("tokens").
    *   "I love AI" -> ["I", "love", "AI"]
2.  **Lowercasing**: Converting all characters to lowercase to treat "Apple" and "apple" as the same word.
3.  **Stop Word Removal**: Identifying and removing common words that carry little meaning (e.g., "is", "the", "and").
4.  **Stemming**: Reducing words to their root form by chopping off the suffix (e.g., "running" -> "run").
5.  **Lemmatization**: Reducing words to their dictionary root form (e.g., "better" -> "good").

## Why pre-process?
It simplifies the data, reduces noise, and makes the model more accurate and faster.
          `
        },
        { 
          id: "c3-m1-l3",
          title: "Part-of-Speech Tagging", 
          duration: "20 min",
          type: "reading",
          content: `
# Part-of-Speech (POS) Tagging

POS tagging is the process of marking up a word in a text as corresponding to a particular part of speech, based on both its definition and its context.

## Common Tags
*   **NN**: Noun, singular or mass
*   **VB**: Verb, base form
*   **JJ**: Adjective
*   **RB**: Adverb

## Why is it important?
It helps in disambiguating words. For example, "book" can be a noun ("read a book") or a verb ("book a flight"). POS tagging tells the computer which one is meant in a given sentence.
          `
        },
        {
          id: "c3-m1-l4",
          title: "Quiz: NLP Basics",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "Which process breaks text down into individual words?",
              options: ["Stemming", "Tokenization", "Lemmatization", "Parsing"],
              correctAnswer: "B",
              explanation: "Tokenization is the process of breaking a stream of text up into words, phrases, symbols, or other meaningful elements called tokens."
            }
          ]
        }
      ]
    },
    {
      title: "Module 2: Text Representation",
      lessons: [
        { 
          id: "c3-m2-l1",
          title: "Bag of Words & TF-IDF", 
          duration: "24 min",
          type: "reading",
          content: `
# Text Representation: Bag of Words (BoW)

Computers don't understand words; they understand numbers. We need to convert text into numerical vectors.

## Bag of Words (BoW)
Imagine a bag where you throw all the words from a document. You count how many times each word appears.
*   "The cat sat on the mat" -> {"the": 2, "cat": 1, "sat": 1, "on": 1, "mat": 1}

**Problem**: It ignores grammar and word order. "The cat chased the dog" and "The dog chased the cat" have the same BoW vector, but opposite meanings.

## Term Frequency-Inverse Document Frequency (TF-IDF)
A statistical measure used to evaluate how important a word is to a document in a collection or corpus.
*   **TF**: How frequently a term occurs in a document.
*   **IDF**: How rare a term is across all documents.
*   **Result**: Words that are common in a single document but rare elsewhere get a high score (e.g., "algorithm" in a tech paper). Common words like "the" get a low score.
          `
        },
        { 
          id: "c3-m2-l2",
          title: "Word Embeddings: Word2Vec which captures meaning", 
          duration: "28 min",
          type: "reading",
          content: `
# Word Embeddings

While BoW and TF-IDF capture word frequency, they don't capture **meaning**.
"King" and "Queen" are just different words to BoW.

## Word2Vec & GloVe
These algorithms map words to dense vectors of real numbers.
*   Words with similar meanings map to similar vectors.
*   Relationships are preserved: vector("King") - vector("Man") + vector("Woman") ≈ vector("Queen").

This was a massive breakthrough in NLP, allowing models to understand semantic relationships.
          `
        },
        {
          id: "c3-m2-l3",
          title: "Transformer Architecture & BERT",
          duration: "30 min",
          type: "reading",
          content: `
# Transformers & BERT

Word embeddings were great, but they had a limitation: a word always had the same vector, regardless of context.
"I went to the **bank**" vs "I sat on the river **bank**".

## The Transformer (2017)
Introduced by Google, the Transformer architecture uses a mechanism called **Self-Attention** to weigh the importance of different words in a sentence. It allows the model to look at the entire sentence at once, rather than processing it word by word.

## BERT (Bidirectional Encoder Representations from Transformers)
BERT reads text in both directions (left-to-right and right-to-left). This allows it to understand the full context of a word.
It set new records for accuracy on almost every NLP task.
          `
        }
      ]
    },
    {
      title: "Module 3: NLP Applications",
      lessons: [
        {
          id: "c3-m3-l1",
          title: "Building a Sentiment Analyzer",
          duration: "28 min",
          type: "reading",
          content: `
# Sentiment Analysis

Sentiment Analysis is the task of classifying the polarity of a given text.
*   **Positive**: "I loved this movie!"
*   **Negative**: "This was a terrible experience."
*   **Neutral**: "I arrived at 5pm."

## Challenge
Sarcasm is difficult for machines. "Oh great, my flight is delayed again."
A simple model sees "great" and thinks positive. A transformer model understands the context.
          `
        }
      ]
    }
  ],
  projects: [
    {
      title: "Mini-Project 1: Sentiment Analysis Dashboard",
      description: "Build a sentiment analysis tool for social media posts or product reviews.",
      duration: "3 hours",
      difficulty: "intermediate"
    },
    {
      title: "Capstone: End-to-End NLP Application",
      description: "Build a complete NLP solution (e.g., news summarizer, QA system, or translation tool) from data collection to deployment.",
      duration: "6 hours",
      difficulty: "advanced"
    }
  ]
};
