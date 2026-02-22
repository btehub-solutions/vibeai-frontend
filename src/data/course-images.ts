// Maps normalized image descriptions to actual generated image file paths.
// The key is a simplified version of the [IMAGE: ...] description from course content.
// The renderer will fuzzy-match against these keys.

export const courseImageMap: Record<string, string> = {
  // ===== COURSE 1: AI Foundations =====
  // M1L1: What is AI
  "comparative diagram automation rigid straight gear pathway ai branching glowing neural network": "/images/courses/c1/automation-vs-ai.png",
  // M1L2: History of AI
  "timeline graphic 1950 turing test 1956 dartmouth 1980s ai winter 1997 deep blue 2012 deep learning boom 2022 generative ai": "/images/courses/c1/ai-history-timeline.png",
  // M1L3: Types of AI
  "concentric circle diagram innermost smallest circle ani current reality middle circle agi human-level massive outer circle asi super-intelligence": "/images/courses/c1/ai-types-circles.png",
  // M2L1: Healthcare & Finance
  "dual-panel dashboard left panel ai bounding box anomaly chest x-ray right panel financial graph anomaly detected spike fraudulent transaction": "/images/courses/c1/healthcare-finance-ai.png",
  // M2L2: E-commerce
  "conceptual mockup user screen shoes glowing algorithmic web customers also bought correlated accessories": "/images/courses/c1/ecommerce-ai.png",
  // M3L1: Data & ML
  "visual sorting diagram pile diverse raw data three paths supervised learning unsupervised clustering reinforcement learning": "/images/courses/c1/ml-types-diagram.png",

  // ===== COURSE 2: Machine Learning =====
  // M1L1: What is ML
  "comparative block diagram data rules computer answers data answers computer rules model": "/images/courses/c2/programming-vs-ml.png",
  // M1L2: Data Science Workflow
  "linear flowchart 6 steps data science workflow data cleaning eda proportion model training": "/images/courses/c2/data-science-workflow.png",
  // M2L1: Linear Regression
  "standard x/y scatterplot blue dots data points single red line linear regression model": "/images/courses/c2/linear-regression.png",
  "3d bowl-shaped graph gradient descent ball high rim high error rolling minimum error": "/images/courses/c2/gradient-descent.png",
  // M2L2: Classification
  "s-shaped logistic regression curve x-axis push prediction 1 true 0 false": "/images/courses/c2/logistic-decision-tree.png",
  "flowchart decision tree splitting data nodes logical conditions color-coded leaf nodes": "/images/courses/c2/logistic-decision-tree.png",
  // M3L1: Unsupervised
  "2d scatterplot disorganized cloud grey dots k-means algorithm circles three groupings red blue green": "/images/courses/c2/kmeans-clustering.png",
  // M3L2: RL
  "conceptual loop diagram agent takes action environment generates state reward agent": "/images/courses/c2/reinforcement-learning.png",

  // ===== COURSE 3: NLP =====
  // M1L1: Ambiguity
  "infographic ambiguity sentence i saw man telescope branching three distinct cartoon illustrations three possible meanings": "/images/courses/c3/nlp-ambiguity.png",
  // M1L2: Preprocessing
  "step-by-step visual pipeline raw text tokenization stop word removal lemmatization clean data array": "/images/courses/c3/nlp-ambiguity.png",
  // M2L1: TF-IDF
  "mathematical formula graphic tf-idf equation number times term appears document log total documents": "/images/courses/c3/tfidf-formula.png",
  // M2L2: Embeddings
  "3d graph visualization semantic clustering dog cat wolf clustered quadrant car bus train clustered another": "/images/courses/c3/word-embeddings.png",
  // M3L1: BERT
  "split diagram word2vec word bank single vector coordinate bert two instances bank two different coordinates context": "/images/courses/c3/word-embeddings.png",

  // ===== COURSE 4: LLM Architecture =====
  // M1L1: Transformer Architecture
  "architectural diagram simplified attention is all you need paper encoder stack decoder stack": "/images/courses/c4/transformer-architecture.png",
  // M1L2: Self-Attention (reuse transformer image)
  "heatmap diagram self-attention connecting words sentence varying line thicknesses attention weights": "/images/courses/c4/transformer-architecture.png",
  // M2L1: Pre-training (reuse transformer for now)
  "flowchart compute lifecycle unstructured text data h100 gpu cluster backpropagation base model": "/images/courses/c4/transformer-architecture.png",
  // M2L2: RLHF pipeline (reuse transformer for now)
  "infographic mapping 3-stage pipeline pre-training sft rlhf human ranking reward model": "/images/courses/c4/transformer-architecture.png",
  // M3L1: LoRA (reuse transformer for now)
  "conceptual diagram massive frozen pre-trained weights bypass arrow trainable lora matrix blocks": "/images/courses/c4/transformer-architecture.png",
};

/**
 * Tries to find a matching image for a given description.
 * Uses fuzzy matching by normalizing and checking for keyword overlap.
 */
export function findCourseImage(description: string): string | null {
  const normalizedDesc = description.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  
  let bestMatch: string | null = null;
  let bestScore = 0;
  
  for (const [key, path] of Object.entries(courseImageMap)) {
    const normalizedKey = key.toLowerCase();
    // Check if most words in the key appear in the description
    const keyWords = normalizedKey.split(/\s+/).filter(w => w.length > 3);
    const matchCount = keyWords.filter(w => normalizedDesc.includes(w)).length;
    const matchRatio = matchCount / keyWords.length;
    
    // Keep track of the best match
    if (matchRatio > bestScore && matchRatio > 0.4) {
      bestScore = matchRatio;
      bestMatch = path;
    }
  }
  
  return bestMatch;
}
