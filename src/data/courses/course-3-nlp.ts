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
# MODULE 1 — The NLP Pipeline
**Learning Objectives:**
* Define Natural Language Processing and its role in modern AI.
* Understand the fundamental problem of linguistic ambiguity.
* Map out the standard text preprocessing pipeline.

---

## Lesson 1 — Introduction to NLP and Ambiguity

### Definition / Explanation:

**Point 1: Reading Between the Lines**
Natural Language Processing (NLP) is the subfield of Artificial Intelligence concerned with giving computers the ability to read, understand, and derive semantic meaning from human languages.

**Point 2: The Problem of Ambiguity**
Computers excel at deterministic tasks (e.g., "2 + 2 = 4"). However, human language is highly ambiguous, relying heavily on unspoken context. Consider the sentence: *"I saw the man on the hill with a telescope."*
Does this mean:
1. I used a telescope to see the man?
2. I saw a man who was carrying a telescope?
3. The man was on a hill that had a telescope built on it?

### Key Points:
*   **Syntax vs Semantics:** NLP algorithms must mathematically break down language to replicate human contextual understanding through Syntax (the grammatical structure) and Semantics (the actual meaning).
*   **Pragmatics:** The highest level of NLP, understanding the intended effect of a sentence (e.g., recognizing sarcasm).
*   **Rule-Based vs Statistical:** Early NLP tried to hardcode grammar rules. Modern NLP succeeds by using statistics and massive data to predict meanings based on probability.

### Examples / Use Cases:

*   **Example 1: Sentiment Analysis:** Determining if a tweet about a new movie is positive or negative, despite it containing slang or sarcasm like "Yeah right, great movie."
*   **Example 2: Named Entity Recognition (NER):** Reading a 50-page legal contract and automatically highlighting all the Names, Dates, Locations, and Monetary amounts without human intervention.

### Visuals:

[IMAGE: An infographic mapping the ambiguity of the sentence "I saw a man with a telescope", branching into three distinct cartoon illustrations representing the three possible meanings.]

### Implementation / Hands-On:

*   **Step 1:** Write down a short, seemingly simple English sentence that could be interpreted in two completely different ways depending on context.
*   **Step 2:** Next to it, clearly write out the two distinct grammatical structural reasons why a computer parsing the sentence might fail to understand you.

### Summary / Key Takeaways:

*   Human language is inherently ambiguous, unstructured data.
*   NLP attempts to structure this data mathematically to extract syntax and semantics.
*   The primary challenge of NLP is disambiguating meaning based on context.

### Optional Exercises / Prompts:

*   **Exercise 1:** Act as a basic intent parser. Read the sentence "Time flies like an arrow; fruit flies like a banana." Explain why the word "flies" has a completely different syntactic role in the front half versus the back half.
          `
        },
        { 
          id: "c3-m1-l2",
          title: "Text Preprocessing", 
          duration: "24 min",
          type: "reading",
          content: `
## Lesson 2 — Text Preprocessing

### Definition / Explanation:

**Point 1: Cleaning the Noise**
Before we can ever feed text into a machine learning model, we must clean and prepare it. Raw text from the internet is extremely noisy (containing HTML tags, typos, emojis, and vast differences in capitalization). Machine Learning models are highly sensitive to this noise.

**Point 2: The Standardization Pipeline**
Preprocessing forces all text into a uniform, standardized format, reducing the complexity of the dataset so the model can focus purely on the core vocabulary.

### Key Points:
*   **Tokenization:** Breaking a sentence down into individual atomic units (usually words or sub-words). 
    *   *Raw:* "Don't jump!" -> *Tokens:* ["Do", "n't", "jump", "!"]
*   **Stop Word Removal:** Filtering out highly frequent words that carry zero semantic weight (e.g., "the", "a", "is", "and"). This massively shrinks the computational size of a dataset.
*   **Stemming:** A brute-force algorithmic approach that chops the ends off words to find the root. ("Running" -> "Run"). It is computationally fast but often results in non-words ("Universe" -> "Univers").
*   **Lemmatization:** A dictionary-based approach that maps words back to their actual, linguistically correct root. ("Better" -> "Good"). It is slower but far more accurate than stemming.

### Examples / Use Cases:

*   **Example 1: E-Discovery in Law:** A law firm processes 10,000 emails. The NLP pipeline tokenizes the text, removes all stop words ("the", "and"), and lemmatizes variations of verbs (e.g., "bankrupted", "bankrupting" both become "bankrupt"), allowing algorithms to group related emails efficiently.

### Visuals:

[IMAGE: A step-by-step visual pipeline: Raw Text -> (Tokenization) -> (Stop Word Removal) -> (Lemmatization) -> Clean Data Array.]

### Implementation / Hands-On:

*   **Step 1:** Take the sentence: "The quickly running foxes jumped over the lazier dogs."
*   **Step 2:** Manually perform 'Stop Word Removal' and write down the remaining words.
*   **Step 3:** Manually apply 'Lemmatization' to those remaining verbs and nouns, reducing them to their base dictionary forms.

### Summary / Key Takeaways:

*   Raw text must be heavily cleaned and standardized before algorithmic processing.
*   Tokenization breaks sentences into computable chunks.
*   Lemmatization is generally preferred over Stemming for maintaining actual vocabulary integrity.

### Optional Exercises / Prompts:

*   **Exercise 1:** Search for the "NLTK Python library" documentation online and read the definitions for their specific Tokenizer and Lemmatizer functions.
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
# MODULE 2 — Text Representation (Math)
**Learning Objectives:**
* Convert text data into numerical matrices for machine learning.
* Calculate Term Frequency-Inverse Document Frequency (TF-IDF).
* Explain how dense vector embeddings capture semantic similarity mapping.

---

## Lesson 1 — Bag of Words & TF-IDF

### Definition / Explanation:

**Point 1: The Vectorization Mandate**
Neural networks only intrinsically understand numbers, not strings of text. Therefore, we must convert our cleaned text tokens into mathematical vectors. This process is called Vectorization or Feature Extraction.

**Point 2: Bag of Words (BoW)**
The simplest form of vectorization. Imagine throwing all words from a sentence into a bag, shaking it, and simply counting how many times each word appears.
*   "The dog chases the cat" -> \`{"the": 2, "dog": 1, "chase": 1, "cat": 1}\`
*   *The Fatal Flaw:* Count-based methods completely destroy word order, grammar, and context. "The dog chases the cat" and "The cat chases the dog" have the exact same mathematical representation in BoW.

### Key Points:
*   **TF-IDF Methodology:** TF-IDF (Term Frequency-Inverse Document Frequency) tries to identify the most *important* words in a specific document, not just the most frequent.
*   **TF (Term Frequency):** How often does the word "Algorithm" appear in Document A? (Say, 10 times. High score).
*   **IDF (Inverse Document Frequency):** How often does the word "Algorithm" appear across *all 10,000* documents in our database? (Say, it only appears in 5 documents. This makes it rare globally, giving it a massive multiplier).

### Examples / Use Cases:

*   **Example 1: Finding Keywords:** In a medical corpus, words like "The" have high TF but very low IDF (because they appear everywhere), so their final score mathematically zeroes out. Words like "Leukemia" get high TF in specific files and high IDF globally, telling the search algorithm: "This specific document is highly associated with Leukemia."

### Visuals:

[IMAGE: A mathematical formula graphic breaking down the TF-IDF equation: \`(Number of times term t appears in a document) * log(Total number of documents / Number of documents with term t in it)\`.]

### Implementation / Hands-On:

*   **Step 1:** Create three short sentences. Sentence 1: "I love coding." Sentence 2: "Coding is hard." Sentence 3: "I love coffee."
*   **Step 2:** Act as a Bag-of-Words algorithm and create a Master Vocabulary list of all unique words across the three sentences.
*   **Step 3:** Build a matrix (a table) representing how many times each word in the Master Vocabulary appears in each of the three sentences.

### Summary / Key Takeaways:

*   Words must be translated into arrays of numbers to perform machine learning.
*   Bag of Words loses all word order and context.
*   TF-IDF statistically weighs the importance of a word to a specific document relative to an entire corpus.

### Optional Exercises / Prompts:

*   **Exercise 1:** Manually calculate a hypothetical TF-IDF score. If the word "Python" appears 5 times in Document A, but Document A is only 100 words long, and the word "Python" appears in 10 out of 1000 total documents, map out why its score would be exceptionally high.
          `
        },
        { 
          id: "c3-m2-l2",
          title: "Word Embeddings: Capturing Semantic Meaning", 
          duration: "28 min",
          type: "reading",
          content: `
## Lesson 2 — Word Embeddings: Capturing Semantic Meaning

### Definition / Explanation:

**Point 1: The Curse of Dimensionality**
Methods like TF-IDF treat every word as mathematically distinct. It knows that "car" and "automobile" are different words, but it has no mathematical way of knowing they mean the exact same thing. Furthermore, if you have a vocabulary of 50,000 words, every sentence becomes a sparse 50,000-column array filled mostly with zeros. 

**Point 2: Enter Dense Vector Embeddings (Word2Vec)**
Word Embeddings (like Word2Vec, created by Google in 2013) solved this. Word2Vec is a shallow neural network that predicts a word based on its surrounding neighbors (or vice versa). By doing this millions of times over Wikipedia, it creates a dense, fixed-size mathematical coordinate (e.g., a 300-dimensional vector) for every unique word.

### Key Points:
*   **Semantic Proximity:** Because words with similar meanings frequently appear in similar contexts, their coordinates end up being grouped physically close together in this 300-dimensional space.
*   **Vector Mathematics:** You can actually perform arithmetic on linguistic meanings. 
    *   The classic example: If you take the coordinates for \`Vector("King")\`, subtract \`Vector("Man")\`, and add \`Vector("Woman")\`, the resulting coordinate lands almost exactly on the vector for \`"Queen"\`.
*   **GloVe:** Another popular embedding model (Global Vectors for Word Representation) created by Stanford, relying on matrix factorization instead of neural prediction, but achieving similar semantic mapping.

### Examples / Use Cases:

*   **Example 1: Improved Search:** A user searches an e-commerce site for "sneakers". The search engine uses Word Embeddings to realize that the vector for "sneakers" is mathematically adjacent to "running shoes", and returns results for both, even though the text strings don't match.

### Visuals:

[IMAGE: A 3D graph visualization showing semantic clustering. Words like "Dog", "Cat", "Wolf" are clustered tightly in one quadrant, while words like "Car", "Bus", "Train" are clustered tightly in another.]

### Implementation / Hands-On:

*   **Step 1:** Search online for a "Word2Vec visualizer" or "Embedding Projector" (Google provides a famous 3D tool for this).
*   **Step 2:** Type in an abstract concept like "Justice" or "Freedom".
*   **Step 3:** Observe the 10 closest neighboring vectors. Are they synonyms, or words that simply appear in similar contexts (like "Law")?

### Summary / Key Takeaways:

*   Embeddings solve the semantic problem of TF-IDF by mapping words into spatial coordinates based on context.
*   Words with similar meanings live close together in high-dimensional space.
*   Dense embeddings encode deep relationships (gender, geography, tense) that allow for vector arithmetic.

### Optional Exercises / Prompts:

*   **Exercise 1:** Write out a hypothetical vector math equation representing capitals and countries (e.g., \`Paris - France + Italy = Rome\`). Brainstorm two more equations that would work using relationship mapping (like CEO to Company).
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
# MODULE 3 — The Transformer Shift
**Learning Objectives:**
* Identify the critical flaw of static word embeddings (Polysemy).
* Understand how Bidirectional Transformers revolutionized contextual parsing.
* Implement the concepts of BERT for modern semantic search.

---

## Lesson 1 — Contextual Embeddings with BERT

### Definition / Explanation:

**Point 1: The Polysemy Problem (Multiple Meanings)**
Models like Word2Vec and GloVe were massive leaps forward, but they suffered from one fatal flaw: they assigned a single, static vector coordinate to every word. 
Consider the word "Bank":
1.  "I deposited my money at the **bank**."
2.  "I sat down on the grassy river **bank**."
Word2Vec mathematically averaged these two totally divergent meanings together, meaning its spatial vector for "bank" was always slightly muddy and inaccurate regardless of the context.

**Point 2: BERT (Bidirectional Encoder Representations from Transformers)**
Google revolutionized search fundamentally in 2018 with the release of BERT. BERT generates *contextual* embeddings. It utilizes the Transformer architecture's Attention mechanism to read the entire sentence simultaneously (forwards and backwards—hence, Bidirectional). 

### Key Points:
*   **Dynamic Generation:** When BERT sees the word "bank", it does not retrieve a static dictionary vector. It intensely looks at ("attends to") the surrounding words like "deposited" and "money" and generates a temporary, highly targeted math vector representing a *financial institution*.
*   **Masked Language Modeling (MLM):** BERT was pre-trained by randomly hiding 15% of the words in a sentence and forcing the model to guess what they were based entirely on the surrounding Bidirectional context.
*   **Context over Keywords:** Google deployed BERT to its core search engine in 2019, marking the shift from matching literal keywords on webpages to understanding the genuine semantic intent behind a user's query.

### Examples / Use Cases:

*   **Example 1: Question Answering (QA):** Providing a BERT-based model with a lengthy PDF manual, and asking it "How do I reset the device?". The model uses contextual embeddings to highlight the exact sentence in the manual containing the answer, ignoring instances of "reset" that refer to factory software rather than hardware.

### Visuals:

[IMAGE: A split diagram. Top: Word2Vec showing the word 'Bank' bound to a single vector coordinate. Bottom: BERT showing two identical instances of the word 'Bank' mapping to two vastly different coordinates depending on their surrounding sentence context.]

### Implementation / Hands-On:

*   **Step 1:** Write three sentences using a polysemous word (a word with multiple meanings, like "match", "right", or "current").
*   **Step 2:** Next to each sentence, describe the specific surrounding words that give the ambiguous word its distinct context. Note how a standard dictionary would fail to capture this without the surrounding words.

### Summary / Key Takeaways:

*   Static embeddings (Word2Vec) fail to comprehend words with multiple meanings.
*   BERT solves this by generating dynamic, contextual embeddings based on the entire surrounding sentence simultaneously.
*   Bidirectional context enables systems to perform highly accurate Document Classification, Sentiment Analysis, and Semantic Search.

### Optional Exercises / Prompts:

*   **Exercise 1:** Imagine you are engineering a spam-detection filter for emails. Explain why a BERT model would be significantly more effective at catching highly deceptive Phishing emails than a TF-IDF Bag-of-Words model.
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
