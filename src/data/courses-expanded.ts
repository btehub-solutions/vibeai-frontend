
import { BookOpen, Calendar, Rocket, Lightbulb, Palette, Database } from "lucide-react";

export interface Lesson {
  title: string;
  duration: string;
  completed?: boolean;
  objectives?: string[];
  activity?: string;
  quiz?: string;
}

export interface Chapter {
  title: string;
  lessons: Lesson[];
}

export interface Project {
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Course {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  progress: number;
  lessons: number;
  completedLessons: number;
  duration: string;
  category: string;
  image?: string;
  chapters?: Chapter[];
  projects?: Project[];
  prerequisites?: string[];
  learningOutcomes?: string[];
}

export const expandedCourses: Course[] = [
  {
    id: 1,
    title: "AI Foundations: From Concepts to Applications",
    description: "Master the fundamentals of Artificial Intelligence, from history and core concepts to modern applications.",
    longDescription: "Begin your AI journey with a comprehensive foundation. Explore AI's evolution, understand different types of AI systems, learn how AI differs from traditional programming, and discover real-world applications across industries. No prior technical knowledge required.",
    progress: 0,
    lessons: 28,
    completedLessons: 0,
    duration: "8 hours",
    category: "Fundamentals",
    prerequisites: [],
    learningOutcomes: [
      "Understand what AI is and how it differs from traditional programming",
      "Identify different types of AI and their applications",
      "Recognize AI use cases across various industries",
      "Evaluate ethical considerations in AI development"
    ],
    chapters: [
      {
        title: "Module 1: Introduction to Artificial Intelligence",
        lessons: [
          { 
            title: "What is Artificial Intelligence?", 
            duration: "18 min",
            objectives: ["Define AI in simple terms", "Understand the difference between AI and automation"],
            activity: "Identify AI vs non-AI systems in daily life",
            quiz: "5-question multiple choice on AI basics"
          },
          { 
            title: "The History of AI: From Turing to Today", 
            duration: "22 min",
            objectives: ["Trace AI's evolution from the 1950s to present", "Understand key milestones in AI development"],
            activity: "Create a timeline of major AI breakthroughs",
            quiz: "Match historical events with their significance"
          },
          { 
            title: "Types of AI: Narrow, General, and Super AI", 
            duration: "20 min",
            objectives: ["Differentiate between ANI, AGI, and ASI", "Identify current AI capabilities and limitations"],
            activity: "Categorize real-world AI systems by type",
            quiz: "Classification exercise with examples"
          },
          { 
            title: "AI vs Traditional Programming", 
            duration: "25 min",
            objectives: ["Understand rule-based vs learning-based systems", "Recognize when to use AI vs traditional code"],
            activity: "Compare solutions for the same problem using both approaches",
            quiz: "Scenario-based decision making"
          },
          { 
            title: "How AI Systems Learn", 
            duration: "28 min",
            objectives: ["Grasp the concept of machine learning", "Understand data's role in AI"],
            activity: "Visualize how an AI learns from examples",
            quiz: "Concept check on learning mechanisms"
          },
        ]
      },
      {
        title: "Module 2: AI Applications Across Industries",
        lessons: [
          { 
            title: "AI in Healthcare: Diagnosis and Treatment", 
            duration: "20 min",
            objectives: ["Explore medical imaging AI", "Understand drug discovery applications"],
            activity: "Case study analysis of AI in radiology",
            quiz: "Healthcare AI use cases"
          },
          { 
            title: "AI in Finance: Trading and Fraud Detection", 
            duration: "22 min",
            objectives: ["Learn about algorithmic trading", "Understand fraud detection systems"],
            activity: "Analyze a fraud detection scenario",
            quiz: "Financial AI applications quiz"
          },
          { 
            title: "AI in E-commerce and Retail", 
            duration: "18 min",
            objectives: ["Explore recommendation systems", "Understand inventory optimization"],
            activity: "Design a simple recommendation flow",
            quiz: "Retail AI scenarios"
          },
          { 
            title: "AI in Transportation and Autonomous Vehicles", 
            duration: "24 min",
            objectives: ["Understand self-driving car technology", "Learn about route optimization"],
            activity: "Map out autonomous vehicle decision-making",
            quiz: "Transportation AI concepts"
          },
          { 
            title: "AI in Education and Personalized Learning", 
            duration: "20 min",
            objectives: ["Explore adaptive learning platforms", "Understand AI tutoring systems"],
            activity: "Design a personalized learning path",
            quiz: "EdTech AI applications"
          },
          { 
            title: "AI in Agriculture and Climate", 
            duration: "22 min",
            objectives: ["Learn about precision agriculture", "Understand climate modeling with AI"],
            activity: "Analyze crop monitoring use case",
            quiz: "AgTech and climate AI"
          },
        ]
      },
      {
        title: "Module 3: Core AI Concepts and Technologies",
        lessons: [
          { 
            title: "Understanding Data: The Fuel of AI", 
            duration: "25 min",
            objectives: ["Learn about structured vs unstructured data", "Understand data quality importance"],
            activity: "Evaluate dataset quality for AI training",
            quiz: "Data fundamentals assessment"
          },
          { 
            title: "Introduction to Machine Learning", 
            duration: "28 min",
            objectives: ["Understand ML as a subset of AI", "Learn the basic ML workflow"],
            activity: "Map out an ML project lifecycle",
            quiz: "ML basics quiz"
          },
          { 
            title: "Introduction to Deep Learning", 
            duration: "26 min",
            objectives: ["Understand neural networks at a high level", "Differentiate ML from deep learning"],
            activity: "Visualize a simple neural network",
            quiz: "Deep learning concepts"
          },
          { 
            title: "Natural Language Processing Overview", 
            duration: "24 min",
            objectives: ["Understand how AI processes language", "Learn about NLP applications"],
            activity: "Explore NLP in chatbots and translation",
            quiz: "NLP fundamentals"
          },
          { 
            title: "Computer Vision Basics", 
            duration: "22 min",
            objectives: ["Learn how AI 'sees' images", "Understand image recognition applications"],
            activity: "Analyze image classification examples",
            quiz: "Computer vision concepts"
          },
          { 
            title: "Reinforcement Learning Introduction", 
            duration: "26 min",
            objectives: ["Understand reward-based learning", "Explore RL in games and robotics"],
            activity: "Simulate a simple RL scenario",
            quiz: "RL fundamentals"
          },
        ]
      },
      {
        title: "Module 4: AI Ethics, Bias, and Responsible AI",
        lessons: [
          { 
            title: "Understanding AI Bias and Fairness", 
            duration: "24 min",
            objectives: ["Recognize sources of bias in AI", "Understand fairness metrics"],
            activity: "Identify bias in real-world AI systems",
            quiz: "Bias detection exercise"
          },
          { 
            title: "Privacy and Data Protection in AI", 
            duration: "22 min",
            objectives: ["Learn about data privacy regulations", "Understand privacy-preserving AI"],
            activity: "Evaluate privacy implications of an AI system",
            quiz: "Privacy and compliance"
          },
          { 
            title: "Transparency and Explainable AI", 
            duration: "26 min",
            objectives: ["Understand the black box problem", "Learn about explainability techniques"],
            activity: "Compare transparent vs opaque AI systems",
            quiz: "XAI concepts"
          },
          { 
            title: "AI Safety and Security", 
            duration: "24 min",
            objectives: ["Understand adversarial attacks", "Learn about AI safety principles"],
            activity: "Analyze AI security vulnerabilities",
            quiz: "AI safety assessment"
          },
          { 
            title: "The Future of AI and Society", 
            duration: "28 min",
            objectives: ["Explore AI's societal impact", "Understand job displacement and creation"],
            activity: "Debate AI's role in future society",
            quiz: "Future of AI scenarios"
          },
        ]
      },
      {
        title: "Module 5: Hands-On AI Exploration",
        lessons: [
          { 
            title: "Exploring AI Tools and Platforms", 
            duration: "30 min",
            objectives: ["Survey popular AI platforms", "Understand no-code AI tools"],
            activity: "Test 3 different AI tools",
            quiz: "AI tools comparison"
          },
          { 
            title: "Building Your First AI Project Concept", 
            duration: "35 min",
            objectives: ["Learn project scoping", "Understand problem-solution fit"],
            activity: "Draft an AI project proposal",
            quiz: "Project planning assessment"
          },
          { 
            title: "AI Career Paths and Opportunities", 
            duration: "25 min",
            objectives: ["Explore AI job roles", "Understand skill requirements"],
            activity: "Map your AI learning path",
            quiz: "Career readiness check"
          },
        ]
      }
    ],
    projects: [
      {
        title: "Mini-Project 1: AI Use Case Analysis",
        description: "Research and present an AI application in an industry of your choice, analyzing its impact, benefits, and challenges.",
        duration: "2 hours",
        difficulty: "beginner"
      },
      {
        title: "Mini-Project 2: Ethics Case Study",
        description: "Analyze a real-world AI ethics dilemma and propose solutions to address bias, privacy, or fairness concerns.",
        duration: "2 hours",
        difficulty: "beginner"
      },
      {
        title: "Capstone: AI Solution Proposal",
        description: "Identify a real-world problem and design a comprehensive AI solution, including data requirements, technology stack, ethical considerations, and implementation roadmap.",
        duration: "4 hours",
        difficulty: "intermediate"
      }
    ]
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    description: "Learn the core concepts of machine learning, from supervised learning to model evaluation and deployment.",
    longDescription: "Dive into machine learning with a practical, hands-on approach. Master supervised and unsupervised learning, understand the ML workflow, work with popular algorithms, and learn to evaluate and deploy models. Perfect for aspiring ML practitioners.",
    progress: 0,
    lessons: 30,
    completedLessons: 0,
    duration: "10 hours",
    category: "Fundamentals",
    prerequisites: ["AI Foundations"],
    learningOutcomes: [
      "Understand the complete machine learning workflow",
      "Apply supervised and unsupervised learning techniques",
      "Evaluate model performance using appropriate metrics",
      "Deploy ML models for real-world use"
    ],
    chapters: [
      {
        title: "Module 1: Machine Learning Foundations",
        lessons: [
          { title: "What is Machine Learning?", duration: "18 min", objectives: ["Define ML and its types", "Understand when to use ML"], activity: "Identify ML vs non-ML problems", quiz: "ML fundamentals" },
          { title: "The Machine Learning Workflow", duration: "25 min", objectives: ["Learn the end-to-end ML process", "Understand each workflow stage"], activity: "Map an ML project workflow", quiz: "Workflow stages quiz" },
          { title: "Types of Machine Learning", duration: "22 min", objectives: ["Differentiate supervised, unsupervised, and reinforcement learning"], activity: "Categorize ML problems by type", quiz: "ML types classification" },
          { title: "Understanding Features and Labels", duration: "20 min", objectives: ["Learn about input features and target variables"], activity: "Identify features in datasets", quiz: "Features and labels" },
          { title: "Training, Validation, and Test Sets", duration: "24 min", objectives: ["Understand data splitting", "Learn about overfitting and underfitting"], activity: "Split a dataset properly", quiz: "Data splitting concepts" },
        ]
      },
      {
        title: "Module 2: Supervised Learning",
        lessons: [
          { title: "Introduction to Supervised Learning", duration: "20 min", objectives: ["Understand supervised learning paradigm"], activity: "Explore classification vs regression", quiz: "Supervised learning basics" },
          { title: "Linear Regression Explained", duration: "28 min", objectives: ["Learn linear regression concepts", "Understand the cost function"], activity: "Visualize linear regression", quiz: "Regression concepts" },
          { title: "Logistic Regression for Classification", duration: "26 min", objectives: ["Understand binary classification", "Learn the sigmoid function"], activity: "Apply logistic regression", quiz: "Classification fundamentals" },
          { title: "Decision Trees and Random Forests", duration: "30 min", objectives: ["Learn tree-based models", "Understand ensemble methods"], activity: "Build a decision tree", quiz: "Tree models quiz" },
          { title: "Support Vector Machines (SVM)", duration: "28 min", objectives: ["Understand margin-based classification"], activity: "Visualize SVM decision boundaries", quiz: "SVM concepts" },
          { title: "K-Nearest Neighbors (KNN)", duration: "22 min", objectives: ["Learn instance-based learning"], activity: "Implement KNN logic", quiz: "KNN fundamentals" },
        ]
      },
      {
        title: "Module 3: Unsupervised Learning",
        lessons: [
          { title: "Introduction to Unsupervised Learning", duration: "20 min", objectives: ["Understand learning without labels"], activity: "Identify unsupervised learning use cases", quiz: "Unsupervised basics" },
          { title: "K-Means Clustering", duration: "26 min", objectives: ["Learn clustering algorithms", "Understand centroids"], activity: "Perform K-means clustering", quiz: "Clustering concepts" },
          { title: "Hierarchical Clustering", duration: "24 min", objectives: ["Learn dendrogram-based clustering"], activity: "Build a hierarchical cluster", quiz: "Hierarchical methods" },
          { title: "Principal Component Analysis (PCA)", duration: "28 min", objectives: ["Understand dimensionality reduction"], activity: "Apply PCA to high-dimensional data", quiz: "PCA fundamentals" },
          { title: "Anomaly Detection", duration: "22 min", objectives: ["Learn outlier detection methods"], activity: "Detect anomalies in data", quiz: "Anomaly detection" },
        ]
      },
      {
        title: "Module 4: Model Evaluation and Optimization",
        lessons: [
          { title: "Evaluation Metrics for Classification", duration: "26 min", objectives: ["Learn accuracy, precision, recall, F1"], activity: "Calculate metrics from confusion matrix", quiz: "Classification metrics" },
          { title: "Evaluation Metrics for Regression", duration: "22 min", objectives: ["Understand MAE, MSE, RMSE, R²"], activity: "Evaluate regression models", quiz: "Regression metrics" },
          { title: "Cross-Validation Techniques", duration: "24 min", objectives: ["Learn k-fold cross-validation"], activity: "Implement cross-validation", quiz: "Validation methods" },
          { title: "Hyperparameter Tuning", duration: "28 min", objectives: ["Understand grid search and random search"], activity: "Tune model hyperparameters", quiz: "Hyperparameter optimization" },
          { title: "Handling Imbalanced Data", duration: "26 min", objectives: ["Learn SMOTE and undersampling"], activity: "Balance an imbalanced dataset", quiz: "Imbalanced data techniques" },
          { title: "Feature Engineering and Selection", duration: "30 min", objectives: ["Create meaningful features", "Select important features"], activity: "Engineer features for a dataset", quiz: "Feature engineering" },
        ]
      },
      {
        title: "Module 5: ML Tools and Deployment",
        lessons: [
          { title: "Introduction to ML Libraries", duration: "24 min", objectives: ["Explore scikit-learn, TensorFlow, PyTorch"], activity: "Compare ML frameworks", quiz: "ML tools overview" },
          { title: "No-Code ML Platforms", duration: "22 min", objectives: ["Learn about AutoML tools"], activity: "Build a model with no-code platform", quiz: "AutoML concepts" },
          { title: "Model Deployment Basics", duration: "28 min", objectives: ["Understand model serving", "Learn about APIs"], activity: "Deploy a simple ML model", quiz: "Deployment fundamentals" },
          { title: "Monitoring ML Models in Production", duration: "26 min", objectives: ["Learn about model drift", "Understand monitoring strategies"], activity: "Set up model monitoring", quiz: "Production ML" },
        ]
      }
    ],
    projects: [
      {
        title: "Mini-Project 1: Customer Churn Prediction",
        description: "Build a classification model to predict customer churn using supervised learning techniques.",
        duration: "3 hours",
        difficulty: "intermediate"
      },
      {
        title: "Mini-Project 2: Customer Segmentation",
        description: "Use clustering algorithms to segment customers based on purchasing behavior.",
        duration: "3 hours",
        difficulty: "intermediate"
      },
      {
        title: "Capstone: End-to-End ML Pipeline",
        description: "Build a complete ML solution from data collection to model deployment, including evaluation and monitoring.",
        duration: "6 hours",
        difficulty: "advanced"
      }
    ]
  },
  {
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
    chapters: [
      {
        title: "Module 1: NLP Foundations",
        lessons: [
          { title: "Introduction to Natural Language Processing", duration: "20 min", objectives: ["Understand what NLP is", "Learn NLP applications"], activity: "Identify NLP in everyday apps", quiz: "NLP basics" },
          { title: "Text Preprocessing and Tokenization", duration: "24 min", objectives: ["Learn text cleaning techniques", "Understand tokenization methods"], activity: "Preprocess a text dataset", quiz: "Preprocessing concepts" },
          { title: "Stopwords, Stemming, and Lemmatization", duration: "22 min", objectives: ["Remove noise from text", "Normalize words"], activity: "Apply stemming and lemmatization", quiz: "Text normalization" },
          { title: "Part-of-Speech Tagging", duration: "20 min", objectives: ["Understand POS tagging", "Learn grammatical roles"], activity: "Tag parts of speech in sentences", quiz: "POS tagging quiz" },
          { title: "Named Entity Recognition (NER)", duration: "26 min", objectives: ["Extract entities from text", "Understand NER applications"], activity: "Build a simple NER system", quiz: "NER concepts" },
        ]
      },
      {
        title: "Module 2: Text Representation",
        lessons: [
          { title: "Bag of Words and TF-IDF", duration: "24 min", objectives: ["Learn traditional text vectorization", "Understand term importance"], activity: "Create TF-IDF vectors", quiz: "Text representation" },
          { title: "Word Embeddings: Word2Vec and GloVe", duration: "28 min", objectives: ["Understand semantic word vectors", "Learn embedding techniques"], activity: "Visualize word embeddings", quiz: "Word embeddings" },
          { title: "Contextual Embeddings with BERT", duration: "30 min", objectives: ["Learn about transformer-based embeddings", "Understand context in NLP"], activity: "Use BERT embeddings", quiz: "Contextual embeddings" },
          { title: "Sentence and Document Embeddings", duration: "26 min", objectives: ["Represent longer text sequences", "Learn aggregation methods"], activity: "Create document vectors", quiz: "Document representation" },
        ]
      },
      {
        title: "Module 3: NLP Tasks and Applications",
        lessons: [
          { title: "Text Classification and Sentiment Analysis", duration: "28 min", objectives: ["Build text classifiers", "Analyze sentiment"], activity: "Create a sentiment analyzer", quiz: "Classification tasks" },
          { title: "Machine Translation Fundamentals", duration: "26 min", objectives: ["Understand translation systems", "Learn seq2seq models"], activity: "Explore translation APIs", quiz: "Translation concepts" },
          { title: "Question Answering Systems", duration: "24 min", objectives: ["Build QA systems", "Understand extractive vs generative QA"], activity: "Create a simple QA bot", quiz: "QA systems" },
          { title: "Text Summarization Techniques", duration: "26 min", objectives: ["Learn extractive and abstractive summarization"], activity: "Summarize documents", quiz: "Summarization methods" },
          { title: "Information Extraction and Relation Extraction", duration: "28 min", objectives: ["Extract structured data from text", "Identify relationships"], activity: "Build an information extractor", quiz: "IE concepts" },
        ]
      },
      {
        title: "Module 4: Advanced NLP and Transformers",
        lessons: [
          { title: "Introduction to Transformer Architecture", duration: "30 min", objectives: ["Understand self-attention", "Learn transformer components"], activity: "Visualize attention mechanisms", quiz: "Transformer basics" },
          { title: "BERT and Its Variants", duration: "28 min", objectives: ["Explore BERT family models", "Understand bidirectional encoding"], activity: "Fine-tune BERT for classification", quiz: "BERT concepts" },
          { title: "GPT and Autoregressive Models", duration: "28 min", objectives: ["Learn about GPT architecture", "Understand text generation"], activity: "Generate text with GPT", quiz: "Autoregressive models" },
          { title: "T5, BART, and Seq2Seq Transformers", duration: "26 min", objectives: ["Explore encoder-decoder models", "Learn unified text-to-text approach"], activity: "Use T5 for multiple tasks", quiz: "Seq2seq transformers" },
        ]
      },
      {
        title: "Module 5: Multilingual NLP and African Languages",
        lessons: [
          { title: "Multilingual NLP Challenges", duration: "24 min", objectives: ["Understand cross-lingual NLP", "Learn about language diversity"], activity: "Explore multilingual models", quiz: "Multilingual NLP" },
          { title: "Low-Resource Language Processing", duration: "26 min", objectives: ["Work with limited data", "Learn transfer learning for NLP"], activity: "Apply transfer learning to low-resource language", quiz: "Low-resource NLP" },
          { title: "African Language NLP Applications", duration: "28 min", objectives: ["Explore NLP for African languages", "Understand unique challenges"], activity: "Build a simple Swahili/Yoruba NLP tool", quiz: "African language NLP" },
          { title: "Building Multilingual Chatbots", duration: "30 min", objectives: ["Create language-agnostic bots", "Handle code-switching"], activity: "Design a multilingual bot", quiz: "Multilingual applications" },
        ]
      },
      {
        title: "Module 6: NLP Tools and Deployment",
        lessons: [
          { title: "NLP Libraries: spaCy, NLTK, Hugging Face", duration: "26 min", objectives: ["Master popular NLP libraries", "Compare tools"], activity: "Build pipelines with different libraries", quiz: "NLP tools" },
          { title: "Deploying NLP Models", duration: "28 min", objectives: ["Serve NLP models via API", "Optimize for production"], activity: "Deploy an NLP model", quiz: "NLP deployment" },
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
        title: "Mini-Project 2: Multilingual Text Classifier",
        description: "Create a text classifier that works across multiple languages including an African language.",
        duration: "4 hours",
        difficulty: "advanced"
      },
      {
        title: "Capstone: End-to-End NLP Application",
        description: "Build a complete NLP solution (e.g., news summarizer, QA system, or translation tool) from data collection to deployment.",
        duration: "6 hours",
        difficulty: "advanced"
      }
    ]
  },
  {
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
    chapters: [
      {
        title: "Module 1: LLM Foundations",
        lessons: [
          { title: "What are Large Language Models?", duration: "20 min", objectives: ["Define LLMs", "Understand scale and capabilities"], activity: "Compare LLM vs traditional NLP", quiz: "LLM basics" },
          { title: "The Transformer Revolution", duration: "28 min", objectives: ["Deep dive into transformer architecture", "Understand self-attention"], activity: "Visualize transformer layers", quiz: "Transformer architecture" },
          { title: "Attention is All You Need", duration: "30 min", objectives: ["Master attention mechanisms", "Learn multi-head attention"], activity: "Calculate attention scores", quiz: "Attention mechanisms" },
          { title: "Encoder vs Decoder vs Encoder-Decoder Models", duration: "26 min", objectives: ["Differentiate model architectures", "Understand use cases"], activity: "Match models to tasks", quiz: "Model architectures" },
        ]
      },
      {
        title: "Module 2: Training and Fine-Tuning LLMs",
        lessons: [
          { title: "Pre-training Large Language Models", duration: "28 min", objectives: ["Understand pre-training objectives", "Learn about training data"], activity: "Explore pre-training datasets", quiz: "Pre-training concepts" },
          { title: "Fine-Tuning vs Prompt Engineering", duration: "24 min", objectives: ["Compare adaptation methods", "Understand when to fine-tune"], activity: "Decide: fine-tune or prompt?", quiz: "Adaptation strategies" },
          { title: "Instruction Tuning and RLHF", duration: "30 min", objectives: ["Learn instruction following", "Understand reinforcement learning from human feedback"], activity: "Analyze RLHF process", quiz: "RLHF concepts" },
          { title: "Parameter-Efficient Fine-Tuning (LoRA, Adapters)", duration: "28 min", objectives: ["Learn efficient fine-tuning methods", "Understand LoRA and adapters"], activity: "Compare fine-tuning approaches", quiz: "PEFT techniques" },
          { title: "Domain Adaptation and Custom Models", duration: "26 min", objectives: ["Adapt LLMs to specific domains", "Create specialized models"], activity: "Plan a domain-specific fine-tuning", quiz: "Domain adaptation" },
        ]
      },
      {
        title: "Module 3: Popular LLM Families",
        lessons: [
          { title: "GPT Family: GPT-3, GPT-4, and Beyond", duration: "26 min", objectives: ["Explore GPT evolution", "Understand capabilities"], activity: "Test GPT models", quiz: "GPT family" },
          { title: "Claude and Constitutional AI", duration: "24 min", objectives: ["Learn about Claude's approach", "Understand safety mechanisms"], activity: "Compare Claude with other LLMs", quiz: "Claude concepts" },
          { title: "Gemini and Multimodal LLMs", duration: "26 min", objectives: ["Explore multimodal capabilities", "Understand vision-language models"], activity: "Use multimodal LLM", quiz: "Multimodal LLMs" },
          { title: "Open-Source LLMs: LLaMA, Mistral, Falcon", duration: "28 min", objectives: ["Explore open-source alternatives", "Understand licensing"], activity: "Compare open vs closed LLMs", quiz: "Open-source LLMs" },
          { title: "Specialized LLMs: Code, Math, Medical", duration: "24 min", objectives: ["Learn about domain-specific LLMs", "Understand specialization benefits"], activity: "Test specialized models", quiz: "Specialized LLMs" },
        ]
      },
      {
        title: "Module 4: Using LLMs Effectively",
        lessons: [
          { title: "No-Code LLM Interfaces", duration: "22 min", objectives: ["Master ChatGPT, Claude, Gemini interfaces", "Understand platform features"], activity: "Explore LLM platforms", quiz: "LLM interfaces" },
          { title: "LLM APIs and Integration", duration: "26 min", objectives: ["Use LLM APIs", "Integrate into applications"], activity: "Make API calls to LLMs", quiz: "LLM APIs" },
          { title: "Context Windows and Token Limits", duration: "24 min", objectives: ["Understand context limitations", "Manage long conversations"], activity: "Optimize for context length", quiz: "Context management" },
          { title: "Temperature, Top-p, and Generation Parameters", duration: "26 min", objectives: ["Control LLM output", "Understand sampling methods"], activity: "Experiment with parameters", quiz: "Generation control" },
        ]
      },
      {
        title: "Module 5: LLM Limitations and Safety",
        lessons: [
          { title: "Hallucinations and Factual Accuracy", duration: "24 min", objectives: ["Understand hallucination problem", "Learn mitigation strategies"], activity: "Identify hallucinations", quiz: "Hallucination detection" },
          { title: "Bias and Fairness in LLMs", duration: "26 min", objectives: ["Recognize LLM biases", "Understand debiasing approaches"], activity: "Test for bias in LLM outputs", quiz: "LLM bias" },
          { title: "Prompt Injection and Security", duration: "28 min", objectives: ["Understand security risks", "Learn defensive prompting"], activity: "Test prompt injection attacks", quiz: "LLM security" },
          { title: "Responsible LLM Usage", duration: "24 min", objectives: ["Follow best practices", "Understand ethical guidelines"], activity: "Create responsible use policy", quiz: "Responsible AI" },
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
        title: "Mini-Project 2: Fine-Tuned Specialist",
        description: "Fine-tune an open-source LLM for a specific domain or task.",
        duration: "5 hours",
        difficulty: "advanced"
      },
      {
        title: "Capstone: LLM-Powered Application",
        description: "Build a complete application powered by LLMs, addressing real-world needs with proper safety measures.",
        duration: "6 hours",
        difficulty: "advanced"
      }
    ]
  },
  {
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
    chapters: [
      {
        title: "Module 1: Prompt Engineering Fundamentals",
        lessons: [
          { title: "The Art and Science of Prompting", duration: "20 min", objectives: ["Understand prompt engineering", "Learn why prompts matter"], activity: "Compare good vs bad prompts", quiz: "Prompting basics" },
          { title: "Anatomy of an Effective Prompt", duration: "24 min", objectives: ["Learn prompt components", "Understand structure"], activity: "Deconstruct effective prompts", quiz: "Prompt anatomy" },
          { title: "Instruction, Context, and Examples", duration: "22 min", objectives: ["Provide clear instructions", "Use context effectively"], activity: "Build structured prompts", quiz: "Prompt components" },
          { title: "Output Formatting and Constraints", duration: "20 min", objectives: ["Control output format", "Set constraints"], activity: "Create formatted outputs", quiz: "Output control" },
        ]
      },
      {
        title: "Module 2: Core Prompting Techniques",
        lessons: [
          { title: "Zero-Shot Prompting", duration: "22 min", objectives: ["Prompt without examples", "Understand zero-shot capabilities"], activity: "Create zero-shot prompts", quiz: "Zero-shot techniques" },
          { title: "Few-Shot Learning and In-Context Learning", duration: "26 min", objectives: ["Provide effective examples", "Understand in-context learning"], activity: "Design few-shot prompts", quiz: "Few-shot learning" },
          { title: "Chain-of-Thought (CoT) Prompting", duration: "28 min", objectives: ["Elicit reasoning steps", "Improve complex problem solving"], activity: "Apply CoT to math problems", quiz: "CoT prompting" },
          { title: "Self-Consistency and Multiple Paths", duration: "26 min", objectives: ["Generate multiple reasoning paths", "Aggregate answers"], activity: "Implement self-consistency", quiz: "Self-consistency" },
          { title: "Tree-of-Thought (ToT) Prompting", duration: "30 min", objectives: ["Explore decision trees", "Evaluate multiple branches"], activity: "Design ToT prompts", quiz: "ToT concepts" },
        ]
      },
      {
        title: "Module 3: Advanced Prompting Frameworks",
        lessons: [
          { title: "ReAct: Reasoning + Acting", duration: "28 min", objectives: ["Combine reasoning and actions", "Build agent-like behavior"], activity: "Create ReAct prompts", quiz: "ReAct framework" },
          { title: "Reflexion and Self-Critique", duration: "26 min", objectives: ["Enable self-improvement", "Learn from mistakes"], activity: "Implement reflexion loop", quiz: "Reflexion concepts" },
          { title: "Directional Stimulus Prompting", duration: "24 min", objectives: ["Guide with hints", "Provide directional cues"], activity: "Use directional prompts", quiz: "Directional prompting" },
          { title: "Generated Knowledge Prompting", duration: "26 min", objectives: ["Generate relevant knowledge first", "Improve factual accuracy"], activity: "Apply knowledge generation", quiz: "Knowledge prompting" },
          { title: "Automatic Prompt Engineering (APE)", duration: "28 min", objectives: ["Automate prompt optimization", "Learn meta-prompting"], activity: "Use APE techniques", quiz: "APE concepts" },
        ]
      },
      {
        title: "Module 4: Domain-Specific Prompting",
        lessons: [
          { title: "Prompting for Code Generation", duration: "26 min", objectives: ["Generate clean code", "Specify requirements clearly"], activity: "Create code generation prompts", quiz: "Code prompting" },
          { title: "Prompting for Creative Writing", duration: "24 min", objectives: ["Generate creative content", "Control style and tone"], activity: "Write creative prompts", quiz: "Creative prompting" },
          { title: "Prompting for Data Analysis", duration: "26 min", objectives: ["Analyze data with LLMs", "Extract insights"], activity: "Create analysis prompts", quiz: "Data prompting" },
          { title: "Prompting for Research and Summarization", duration: "24 min", objectives: ["Research topics", "Summarize effectively"], activity: "Build research prompts", quiz: "Research prompting" },
          { title: "Prompting for Translation and Localization", duration: "22 min", objectives: ["Translate accurately", "Preserve context"], activity: "Create translation prompts", quiz: "Translation prompting" },
        ]
      },
      {
        title: "Module 5: Prompt Optimization and Testing",
        lessons: [
          { title: "Systematic Prompt Testing", duration: "26 min", objectives: ["Test prompts rigorously", "Measure performance"], activity: "Design test suite", quiz: "Prompt testing" },
          { title: "A/B Testing Prompts", duration: "24 min", objectives: ["Compare prompt variants", "Choose best performers"], activity: "Run A/B tests", quiz: "A/B testing" },
          { title: "Prompt Versioning and Management", duration: "22 min", objectives: ["Version control prompts", "Manage prompt libraries"], activity: "Create prompt repository", quiz: "Prompt management" },
          { title: "Building Reusable Prompt Templates", duration: "28 min", objectives: ["Create template libraries", "Parameterize prompts"], activity: "Build template collection", quiz: "Prompt templates" },
          { title: "Prompt Security and Safety", duration: "26 min", objectives: ["Prevent prompt injection", "Ensure safe outputs"], activity: "Test prompt security", quiz: "Prompt safety" },
        ]
      },
      {
        title: "Module 6: Advanced Applications",
        lessons: [
          { title: "Multi-Step Prompt Chains", duration: "28 min", objectives: ["Chain multiple prompts", "Build complex workflows"], activity: "Design prompt pipeline", quiz: "Prompt chaining" },
          { title: "Prompt-Based Agents", duration: "30 min", objectives: ["Build autonomous agents", "Use tools and actions"], activity: "Create simple agent", quiz: "Agent prompting" },
          { title: "Multimodal Prompting", duration: "26 min", objectives: ["Combine text and images", "Prompt vision-language models"], activity: "Create multimodal prompts", quiz: "Multimodal prompting" },
        ]
      }
    ],
    projects: [
      {
        title: "Mini-Project 1: Prompt Template Library",
        description: "Build a comprehensive library of reusable prompt templates for common tasks.",
        duration: "3 hours",
        difficulty: "intermediate"
      },
      {
        title: "Mini-Project 2: Prompt Optimization Study",
        description: "Systematically optimize prompts for a specific task and document improvements.",
        duration: "4 hours",
        difficulty: "advanced"
      },
      {
        title: "Capstone: Advanced Prompt System",
        description: "Build a sophisticated prompt-based system using chains, agents, or multi-step reasoning.",
        duration: "6 hours",
        difficulty: "advanced"
      }
    ]
  },
  {
    id: 6,
    title: "Generative AI: Text, Image, Audio, and Video",
    description: "Master generative AI across all modalities - create text, images, audio, and video with AI.",
    longDescription: "Explore the full spectrum of generative AI. Learn to create compelling content across text, images, audio, and video. Master tools, techniques, and workflows for each modality. Perfect for creators and innovators.",
    progress: 0,
    lessons: 30,
    completedLessons: 0,
    duration: "11 hours",
    category: "Creative",
    prerequisites: ["LLM Deep Dive"],
    learningOutcomes: [
      "Generate high-quality content across modalities",
      "Master leading generative AI tools",
      "Build creative workflows with AI",
      "Understand commercial applications"
    ],
    chapters: [
      {
        title: "Module 1: Generative AI Foundations",
        lessons: [
          { title: "Introduction to Generative AI", duration: "22 min", objectives: ["Understand generative models", "Learn key concepts"], activity: "Explore generative AI examples", quiz: "GenAI basics" },
          { title: "Generative Models: GANs, VAEs, Diffusion", duration: "28 min", objectives: ["Compare model architectures", "Understand generation methods"], activity: "Visualize different models", quiz: "Generative models" },
          { title: "The Generative AI Landscape", duration: "24 min", objectives: ["Survey available tools", "Understand capabilities"], activity: "Map GenAI tools", quiz: "GenAI landscape" },
        ]
      },
      {
        title: "Module 2: Text Generation Mastery",
        lessons: [
          { title: "Advanced Text Generation with LLMs", duration: "26 min", objectives: ["Generate various text types", "Control style and tone"], activity: "Create diverse text content", quiz: "Text generation" },
          { title: "Long-Form Content Creation", duration: "28 min", objectives: ["Write articles and reports", "Maintain coherence"], activity: "Generate long-form article", quiz: "Long-form writing" },
          { title: "Creative Writing: Stories and Scripts", duration: "26 min", objectives: ["Write fiction and scripts", "Develop characters"], activity: "Create short story", quiz: "Creative writing" },
          { title: "Copywriting and Marketing Content", duration: "24 min", objectives: ["Write compelling copy", "Create marketing materials"], activity: "Generate ad copy", quiz: "Copywriting" },
        ]
      },
      {
        title: "Module 3: Image Generation Excellence",
        lessons: [
          { title: "Image Generation Fundamentals", duration: "24 min", objectives: ["Understand diffusion models", "Learn image generation basics"], activity: "Generate first images", quiz: "Image generation basics" },
          { title: "Midjourney Deep Dive", duration: "30 min", objectives: ["Master Midjourney", "Use advanced parameters"], activity: "Create Midjourney gallery", quiz: "Midjourney mastery" },
          { title: "DALL-E and Bing Image Creator", duration: "26 min", objectives: ["Use DALL-E effectively", "Understand differences"], activity: "Compare image generators", quiz: "DALL-E concepts" },
          { title: "Stable Diffusion and Open-Source Tools", duration: "28 min", objectives: ["Use Stable Diffusion", "Customize models"], activity: "Generate with SD", quiz: "Stable Diffusion" },
          { title: "Advanced Image Prompting Techniques", duration: "30 min", objectives: ["Write effective image prompts", "Control composition"], activity: "Optimize image prompts", quiz: "Image prompting" },
          { title: "Style Transfer and Artistic Control", duration: "26 min", objectives: ["Apply artistic styles", "Control aesthetics"], activity: "Create styled images", quiz: "Style control" },
          { title: "ControlNet and Precise Image Control", duration: "28 min", objectives: ["Use ControlNet", "Maintain composition"], activity: "Apply ControlNet", quiz: "ControlNet" },
          { title: "Image Editing with AI", duration: "24 min", objectives: ["Edit images with AI", "Inpaint and outpaint"], activity: "Edit images", quiz: "AI image editing" },
        ]
      },
      {
        title: "Module 4: Audio and Voice Generation",
        lessons: [
          { title: "Text-to-Speech (TTS) Systems", duration: "24 min", objectives: ["Generate natural speech", "Clone voices"], activity: "Create TTS audio", quiz: "TTS concepts" },
          { title: "Voice Cloning and Synthesis", duration: "26 min", objectives: ["Clone voices ethically", "Understand synthesis"], activity: "Clone a voice", quiz: "Voice cloning" },
          { title: "Music Generation with AI", duration: "28 min", objectives: ["Generate music", "Use AI music tools"], activity: "Create AI music", quiz: "Music generation" },
          { title: "Sound Effects and Audio Design", duration: "22 min", objectives: ["Generate sound effects", "Design audio"], activity: "Create sound effects", quiz: "Audio design" },
        ]
      },
      {
        title: "Module 5: Video Generation",
        lessons: [
          { title: "AI Video Generation Fundamentals", duration: "26 min", objectives: ["Understand video generation", "Learn available tools"], activity: "Generate first video", quiz: "Video generation basics" },
          { title: "Text-to-Video Tools", duration: "28 min", objectives: ["Create videos from text", "Use Runway, Pika"], activity: "Generate text-to-video", quiz: "Text-to-video" },
          { title: "Image-to-Video Animation", duration: "26 min", objectives: ["Animate static images", "Create motion"], activity: "Animate images", quiz: "Image-to-video" },
          { title: "AI Video Editing and Enhancement", duration: "24 min", objectives: ["Edit videos with AI", "Enhance quality"], activity: "Edit video with AI", quiz: "AI video editing" },
        ]
      },
      {
        title: "Module 6: Creative Workflows and Applications",
        lessons: [
          { title: "Building Creative Workflows", duration: "28 min", objectives: ["Design end-to-end workflows", "Combine tools"], activity: "Create workflow diagram", quiz: "Creative workflows" },
          { title: "Commercial Applications and Licensing", duration: "26 min", objectives: ["Understand licensing", "Use AI commercially"], activity: "Review licensing terms", quiz: "Commercial use" },
          { title: "Building a GenAI Portfolio", duration: "24 min", objectives: ["Showcase AI work", "Build portfolio"], activity: "Start portfolio", quiz: "Portfolio building" },
          { title: "Monetizing Generative AI Skills", duration: "28 min", objectives: ["Identify revenue streams", "Sell AI services"], activity: "Plan monetization strategy", quiz: "Monetization" },
        ]
      }
    ],
    projects: [
      {
        title: "Mini-Project 1: Multimodal Content Campaign",
        description: "Create a complete content campaign using text, images, and audio generated by AI.",
        duration: "4 hours",
        difficulty: "intermediate"
      },
      {
        title: "Mini-Project 2: AI-Generated Short Film",
        description: "Produce a short video using AI-generated visuals, voice, music, and script.",
        duration: "6 hours",
        difficulty: "advanced"
      },
      {
        title: "Capstone: Creative GenAI Business",
        description: "Launch a creative service or product powered by generative AI, from concept to market.",
        duration: "8 hours",
        difficulty: "advanced"
      }
    ]
  },
  {
    id: 7,
    title: "AI Chatbots: From Rule-Based to Intelligent Agents",
    description: "Build sophisticated chatbots from scratch using no-code tools and AI platforms.",
    longDescription: "Master chatbot development from fundamentals to advanced AI-powered conversational agents. Learn rule-based systems, NLP-powered bots, no-code builders, custom knowledge training, and deployment strategies.",
    progress: 0,
    lessons: 26,
    completedLessons: 0,
    duration: "9 hours",
    category: "Business",
    prerequisites: ["NLP Mastery"],
    learningOutcomes: [
      "Build chatbots with no-code platforms",
      "Train bots on custom knowledge",
      "Deploy chatbots across channels",
      "Optimize conversation flows"
    ],
    chapters: [
      {
        title: "Module 1: Chatbot Fundamentals",
        lessons: [
          { title: "Introduction to Chatbots", duration: "20 min", objectives: ["Understand chatbot types", "Learn use cases"], activity: "Analyze chatbot examples", quiz: "Chatbot basics" },
          { title: "Rule-Based vs AI-Powered Chatbots", duration: "24 min", objectives: ["Compare chatbot approaches", "Understand trade-offs"], activity: "Design decision tree bot", quiz: "Chatbot types" },
          { title: "Conversation Design Principles", duration: "26 min", objectives: ["Design natural conversations", "Create user flows"], activity: "Map conversation flow", quiz: "Conversation design" },
          { title: "Intent Recognition and Entity Extraction", duration: "28 min", objectives: ["Understand NLU components", "Extract information"], activity: "Define intents and entities", quiz: "NLU concepts" },
        ]
      },
      {
        title: "Module 2: No-Code Chatbot Builders",
        lessons: [
          { title: "Overview of No-Code Platforms", duration: "22 min", objectives: ["Survey chatbot builders", "Compare features"], activity: "Explore platforms", quiz: "Platform comparison" },
          { title: "Building with Dialogflow", duration: "30 min", objectives: ["Create Dialogflow bot", "Use intents and contexts"], activity: "Build Dialogflow chatbot", quiz: "Dialogflow" },
          { title: "Building with Microsoft Bot Framework", duration: "28 min", objectives: ["Use Bot Framework Composer", "Deploy to channels"], activity: "Create Bot Framework bot", quiz: "Bot Framework" },
          { title: "Building with Rasa", duration: "26 min", objectives: ["Use open-source Rasa", "Customize NLU"], activity: "Build Rasa bot", quiz: "Rasa concepts" },
          { title: "Building with Voiceflow", duration: "24 min", objectives: ["Design visual chatbots", "Prototype quickly"], activity: "Create Voiceflow bot", quiz: "Voiceflow" },
        ]
      },
      {
        title: "Module 3: AI-Powered Chatbots with LLMs",
        lessons: [
          { title: "LLM-Based Chatbots", duration: "26 min", objectives: ["Build with GPT/Claude", "Understand advantages"], activity: "Create LLM chatbot", quiz: "LLM chatbots" },
          { title: "Custom GPTs and Assistants", duration: "28 min", objectives: ["Create custom GPTs", "Use OpenAI Assistants"], activity: "Build custom GPT", quiz: "Custom GPTs" },
          { title: "Training Bots on Custom Knowledge", duration: "30 min", objectives: ["Upload knowledge bases", "Use RAG for chatbots"], activity: "Train bot on docs", quiz: "Knowledge training" },
          { title: "Function Calling and Tool Use", duration: "28 min", objectives: ["Enable chatbot actions", "Integrate APIs"], activity: "Add function calling", quiz: "Function calling" },
          { title: "Memory and Context Management", duration: "26 min", objectives: ["Maintain conversation context", "Implement memory"], activity: "Add conversation memory", quiz: "Context management" },
        ]
      },
      {
        title: "Module 4: Chatbot Deployment and Integration",
        lessons: [
          { title: "Deploying to Websites", duration: "24 min", objectives: ["Embed chatbots", "Customize widget"], activity: "Deploy web chatbot", quiz: "Web deployment" },
          { title: "Deploying to Messaging Platforms", duration: "26 min", objectives: ["Deploy to WhatsApp, Telegram, Slack"], activity: "Deploy to messaging app", quiz: "Messaging deployment" },
          { title: "Voice-Enabled Chatbots", duration: "28 min", objectives: ["Add voice capabilities", "Integrate TTS/STT"], activity: "Create voice bot", quiz: "Voice chatbots" },
          { title: "Chatbot Analytics and Optimization", duration: "26 min", objectives: ["Track performance", "Optimize conversations"], activity: "Analyze chatbot metrics", quiz: "Chatbot analytics" },
        ]
      },
      {
        title: "Module 5: Advanced Chatbot Features",
        lessons: [
          { title: "Multilingual Chatbots", duration: "24 min", objectives: ["Support multiple languages", "Handle translation"], activity: "Build multilingual bot", quiz: "Multilingual bots" },
          { title: "Sentiment Analysis in Chatbots", duration: "22 min", objectives: ["Detect user sentiment", "Adapt responses"], activity: "Add sentiment detection", quiz: "Sentiment in bots" },
          { title: "Handoff to Human Agents", duration: "24 min", objectives: ["Implement escalation", "Integrate live chat"], activity: "Design handoff flow", quiz: "Human handoff" },
          { title: "Chatbot Security and Privacy", duration: "26 min", objectives: ["Secure chatbot data", "Ensure privacy"], activity: "Implement security measures", quiz: "Chatbot security" },
        ]
      },
      {
        title: "Module 6: Business Applications",
        lessons: [
          { title: "Customer Service Chatbots", duration: "26 min", objectives: ["Automate support", "Handle FAQs"], activity: "Build support bot", quiz: "Support chatbots" },
          { title: "Sales and Lead Generation Bots", duration: "28 min", objectives: ["Qualify leads", "Drive conversions"], activity: "Create sales bot", quiz: "Sales chatbots" },
          { title: "Internal Business Bots", duration: "24 min", objectives: ["Automate internal processes", "Build HR/IT bots"], activity: "Design internal bot", quiz: "Internal bots" },
        ]
      }
    ],
    projects: [
      {
        title: "Mini-Project 1: Customer Support Bot",
        description: "Build a customer support chatbot with FAQ handling and human handoff.",
        duration: "4 hours",
        difficulty: "intermediate"
      },
      {
        title: "Mini-Project 2: Knowledge Base Assistant",
        description: "Create an AI assistant trained on custom documentation using RAG.",
        duration: "5 hours",
        difficulty: "advanced"
      },
      {
        title: "Capstone: Enterprise Chatbot Solution",
        description: "Deploy a production-ready chatbot across multiple channels with analytics and optimization.",
        duration: "8 hours",
        difficulty: "advanced"
      }
    ]
  },
  {
    id: 8,
    title: "AI Automation Agents (AAA): Workflow Automation",
    description: "Build intelligent automation agents that handle complex business workflows end-to-end.",
    longDescription: "Master AI automation by building intelligent agents that can plan, execute, and adapt. Learn workflow design, tool integration, client onboarding automation, and delivery systems. Transform businesses with AI-powered automation.",
    progress: 0,
    lessons: 28,
    completedLessons: 0,
    duration: "10 hours",
    category: "Business",
    prerequisites: ["Chatbots", "Advanced Prompt Engineering"],
    learningOutcomes: [
      "Design complex automation workflows",
      "Build AI agents with tool use",
      "Automate client onboarding and delivery",
      "Deploy production automation systems"
    ],
    chapters: [
      {
        title: "Module 1: Automation Fundamentals",
        lessons: [
          { title: "Introduction to AI Automation", duration: "22 min", objectives: ["Understand AI automation", "Learn agent concepts"], activity: "Identify automation opportunities", quiz: "Automation basics" },
          { title: "Agents vs Traditional Automation", duration: "24 min", objectives: ["Compare approaches", "Understand agent advantages"], activity: "Map agent vs RPA", quiz: "Agents vs automation" },
          { title: "Workflow Design Principles", duration: "26 min", objectives: ["Design effective workflows", "Map processes"], activity: "Create workflow diagram", quiz: "Workflow design" },
          { title: "Identifying Automation Opportunities", duration: "24 min", objectives: ["Find automation candidates", "Assess ROI"], activity: "Audit business processes", quiz: "Automation opportunities" },
        ]
      },
      {
        title: "Module 2: Building AI Agents",
        lessons: [
          { title: "Agent Architecture and Components", duration: "28 min", objectives: ["Understand agent structure", "Learn key components"], activity: "Design agent architecture", quiz: "Agent architecture" },
          { title: "Planning and Reasoning Agents", duration: "30 min", objectives: ["Build agents that plan", "Implement reasoning"], activity: "Create planning agent", quiz: "Planning agents" },
          { title: "Tool Use and Function Calling", duration: "28 min", objectives: ["Enable agents to use tools", "Integrate APIs"], activity: "Add tools to agent", quiz: "Tool use" },
          { title: "Agent Memory and State Management", duration: "26 min", objectives: ["Maintain agent state", "Implement memory"], activity: "Add memory to agent", quiz: "Agent memory" },
          { title: "Multi-Agent Systems", duration: "30 min", objectives: ["Coordinate multiple agents", "Design agent teams"], activity: "Build multi-agent system", quiz: "Multi-agent systems" },
        ]
      },
      {
        title: "Module 3: Automation Tools and Platforms",
        lessons: [
          { title: "Zapier and Make (Integromat)", duration: "26 min", objectives: ["Build no-code automations", "Connect apps"], activity: "Create Zapier workflow", quiz: "No-code automation" },
          { title: "n8n and Open-Source Automation", duration: "28 min", objectives: ["Use open-source tools", "Self-host automations"], activity: "Build n8n workflow", quiz: "n8n concepts" },
          { title: "LangChain for Agent Development", duration: "30 min", objectives: ["Build agents with LangChain", "Use chains and agents"], activity: "Create LangChain agent", quiz: "LangChain" },
          { title: "AutoGPT and Autonomous Agents", duration: "28 min", objectives: ["Understand autonomous agents", "Use AutoGPT"], activity: "Test autonomous agent", quiz: "Autonomous agents" },
          { title: "Custom Agent Frameworks", duration: "26 min", objectives: ["Build custom frameworks", "Design agent loops"], activity: "Create agent framework", quiz: "Custom frameworks" },
        ]
      },
      {
        title: "Module 4: Business Process Automation",
        lessons: [
          { title: "Client Onboarding Automation", duration: "28 min", objectives: ["Automate onboarding", "Collect information"], activity: "Design onboarding flow", quiz: "Onboarding automation" },
          { title: "Document Processing and Data Extraction", duration: "26 min", objectives: ["Extract data from documents", "Process forms"], activity: "Build document processor", quiz: "Document automation" },
          { title: "Email and Communication Automation", duration: "24 min", objectives: ["Automate emails", "Handle communications"], activity: "Create email automation", quiz: "Email automation" },
          { title: "Scheduling and Calendar Management", duration: "22 min", objectives: ["Automate scheduling", "Manage calendars"], activity: "Build scheduling agent", quiz: "Scheduling automation" },
          { title: "CRM and Sales Automation", duration: "26 min", objectives: ["Automate CRM tasks", "Update records"], activity: "Create CRM automation", quiz: "CRM automation" },
        ]
      },
      {
        title: "Module 5: Delivery and Fulfillment Systems",
        lessons: [
          { title: "Project Delivery Automation", duration: "28 min", objectives: ["Automate deliverables", "Track progress"], activity: "Design delivery system", quiz: "Delivery automation" },
          { title: "Quality Assurance and Testing", duration: "26 min", objectives: ["Automate QA", "Test outputs"], activity: "Build QA automation", quiz: "QA automation" },
          { title: "Reporting and Analytics Automation", duration: "24 min", objectives: ["Generate reports", "Automate insights"], activity: "Create reporting automation", quiz: "Reporting automation" },
          { title: "Notification and Alert Systems", duration: "22 min", objectives: ["Send automated alerts", "Monitor systems"], activity: "Build notification system", quiz: "Notification automation" },
        ]
      },
      {
        title: "Module 6: Production Deployment",
        lessons: [
          { title: "Error Handling and Resilience", duration: "26 min", objectives: ["Handle failures gracefully", "Build resilient systems"], activity: "Add error handling", quiz: "Error handling" },
          { title: "Monitoring and Logging", duration: "24 min", objectives: ["Monitor automations", "Log activities"], activity: "Implement monitoring", quiz: "Monitoring" },
          { title: "Scaling Automation Systems", duration: "28 min", objectives: ["Scale to handle volume", "Optimize performance"], activity: "Plan scaling strategy", quiz: "Scaling automation" },
          { title: "Security and Compliance", duration: "26 min", objectives: ["Secure automations", "Ensure compliance"], activity: "Implement security measures", quiz: "Automation security" },
        ]
      }
    ],
    projects: [
      {
        title: "Mini-Project 1: Client Onboarding System",
        description: "Build an end-to-end client onboarding automation with data collection and CRM integration.",
        duration: "5 hours",
        difficulty: "intermediate"
      },
      {
        title: "Mini-Project 2: Multi-Agent Workflow",
        description: "Create a multi-agent system that coordinates to complete complex business processes.",
        duration: "6 hours",
        difficulty: "advanced"
      },
      {
        title: "Capstone: Enterprise Automation Platform",
        description: "Deploy a production-ready automation platform for a real business with monitoring and scaling.",
        duration: "10 hours",
        difficulty: "advanced"
      }
    ]
  },
  {
    id: 9,
    title: "Vibe Coding: AI-Assisted Development",
    description: "Master AI-powered coding workflows for rapid development and collaboration with AI.",
    longDescription: "Transform how you code with AI assistance. Learn prompt-driven development, rapid prototyping, debugging with AI, code explanation, refactoring, and maintaining quality while leveraging AI tools. Perfect for developers embracing the AI era.",
    progress: 0,
    lessons: 30,
    completedLessons: 0,
    duration: "11 hours",
    category: "Skills",
    prerequisites: ["Advanced Prompt Engineering"],
    learningOutcomes: [
      "Code faster with AI assistance",
      "Debug and refactor with AI",
      "Maintain code quality with AI tools",
      "Build production-ready applications with AI"
    ],
    chapters: [
      {
        title: "Module 1: AI-Assisted Coding Fundamentals",
        lessons: [
          { title: "Introduction to AI-Assisted Development", duration: "22 min", objectives: ["Understand AI coding tools", "Learn new workflows"], activity: "Explore AI coding assistants", quiz: "AI coding basics" },
          { title: "The Vibe Coding Mindset", duration: "24 min", objectives: ["Think in prompts", "Collaborate with AI"], activity: "Practice prompt-driven thinking", quiz: "Vibe coding mindset" },
          { title: "Overview of AI Coding Tools", duration: "26 min", objectives: ["Survey Copilot, Cursor, Codeium", "Compare features"], activity: "Test multiple tools", quiz: "AI coding tools" },
          { title: "Setting Up Your AI Coding Environment", duration: "24 min", objectives: ["Configure tools", "Optimize setup"], activity: "Set up AI coding environment", quiz: "Environment setup" },
        ]
      },
      {
        title: "Module 2: Prompt-Driven Development",
        lessons: [
          { title: "Writing Effective Code Prompts", duration: "26 min", objectives: ["Craft clear code requests", "Specify requirements"], activity: "Write code generation prompts", quiz: "Code prompting" },
          { title: "Iterative Refinement with AI", duration: "28 min", objectives: ["Refine AI-generated code", "Iterate to perfection"], activity: "Iteratively improve code", quiz: "Iterative development" },
          { title: "Context and Constraints in Code Prompts", duration: "26 min", objectives: ["Provide context", "Set constraints"], activity: "Add context to prompts", quiz: "Code context" },
          { title: "Multi-File and Project-Level Prompting", duration: "28 min", objectives: ["Work across files", "Maintain coherence"], activity: "Generate multi-file project", quiz: "Project-level prompting" },
        ]
      },
      {
        title: "Module 3: Rapid Prototyping with AI",
        lessons: [
          { title: "From Idea to Prototype in Minutes", duration: "30 min", objectives: ["Rapidly prototype", "Validate ideas quickly"], activity: "Build prototype in 30 min", quiz: "Rapid prototyping" },
          { title: "Scaffolding Projects with AI", duration: "28 min", objectives: ["Generate project structure", "Set up boilerplate"], activity: "Scaffold full-stack app", quiz: "Project scaffolding" },
          { title: "Building MVPs with AI Assistance", duration: "30 min", objectives: ["Create minimum viable products", "Focus on core features"], activity: "Build MVP", quiz: "MVP development" },
          { title: "UI/UX Generation with AI", duration: "26 min", objectives: ["Generate interfaces", "Create responsive designs"], activity: "Generate UI components", quiz: "UI generation" },
        ]
      },
      {
        title: "Module 4: Debugging and Refactoring",
        lessons: [
          { title: "AI-Powered Debugging", duration: "28 min", objectives: ["Debug with AI help", "Understand errors"], activity: "Debug code with AI", quiz: "AI debugging" },
          { title: "Code Explanation and Documentation", duration: "26 min", objectives: ["Explain complex code", "Generate docs"], activity: "Document codebase with AI", quiz: "Code explanation" },
          { title: "Refactoring with AI", duration: "28 min", objectives: ["Improve code structure", "Optimize performance"], activity: "Refactor legacy code", quiz: "AI refactoring" },
          { title: "Code Review with AI", duration: "24 min", objectives: ["Review code quality", "Identify issues"], activity: "AI code review", quiz: "Code review" },
          { title: "Testing and Test Generation", duration: "26 min", objectives: ["Generate unit tests", "Ensure coverage"], activity: "Generate test suite", quiz: "Test generation" },
        ]
      },
      {
        title: "Module 5: Code Quality and Best Practices",
        lessons: [
          { title: "Maintaining Code Quality with AI", duration: "26 min", objectives: ["Ensure quality", "Follow standards"], activity: "Enforce quality with AI", quiz: "Code quality" },
          { title: "Security Best Practices", duration: "28 min", objectives: ["Identify vulnerabilities", "Secure code"], activity: "Security audit with AI", quiz: "Code security" },
          { title: "Performance Optimization", duration: "26 min", objectives: ["Optimize performance", "Profile code"], activity: "Optimize with AI", quiz: "Performance optimization" },
          { title: "Accessibility and Inclusive Design", duration: "24 min", objectives: ["Ensure accessibility", "Follow WCAG"], activity: "Make app accessible", quiz: "Accessibility" },
        ]
      },
      {
        title: "Module 6: Advanced AI Coding Workflows",
        lessons: [
          { title: "Pair Programming with AI", duration: "28 min", objectives: ["Collaborate with AI", "Real-time assistance"], activity: "Pair program with AI", quiz: "AI pair programming" },
          { title: "Learning New Technologies with AI", duration: "26 min", objectives: ["Learn faster", "Understand new frameworks"], activity: "Learn new framework with AI", quiz: "AI-assisted learning" },
          { title: "Code Migration and Conversion", duration: "28 min", objectives: ["Migrate codebases", "Convert languages"], activity: "Migrate code with AI", quiz: "Code migration" },
          { title: "API Integration and Automation", duration: "26 min", objectives: ["Integrate APIs", "Automate workflows"], activity: "Build API integration", quiz: "API integration" },
          { title: "Building with AI-Generated Components", duration: "28 min", objectives: ["Use AI components", "Customize and extend"], activity: "Build with AI components", quiz: "AI components" },
        ]
      },
      {
        title: "Module 7: Production and Deployment",
        lessons: [
          { title: "Deployment Automation with AI", duration: "26 min", objectives: ["Automate deployment", "Set up CI/CD"], activity: "Create deployment pipeline", quiz: "Deployment automation" },
          { title: "Monitoring and Maintenance", duration: "24 min", objectives: ["Monitor applications", "Maintain systems"], activity: "Set up monitoring", quiz: "Application monitoring" },
          { title: "Scaling Applications Built with AI", duration: "28 min", objectives: ["Scale efficiently", "Handle growth"], activity: "Plan scaling strategy", quiz: "Application scaling" },
        ]
      }
    ],
    projects: [
      {
        title: "Mini-Project 1: Full-Stack App in 4 Hours",
        description: "Build a complete full-stack application using AI assistance from scratch to deployment.",
        duration: "4 hours",
        difficulty: "intermediate"
      },
      {
        title: "Mini-Project 2: Legacy Code Modernization",
        description: "Refactor and modernize a legacy codebase using AI tools.",
        duration: "5 hours",
        difficulty: "advanced"
      },
      {
        title: "Capstone: Production SaaS Application",
        description: "Build and deploy a production-ready SaaS application using AI-assisted development throughout.",
        duration: "12 hours",
        difficulty: "advanced"
      }
    ]
  },
  {
    id: 10,
    title: "AI Careers, Freelancing, and Entrepreneurship",
    description: "Launch your AI career, build a freelance business, or start an AI company.",
    longDescription: "Transform your AI skills into a thriving career or business. Learn portfolio building, personal branding, freelancing strategies, entrepreneurship, monetization, and how to position yourself in the AI job market.",
    progress: 0,
    lessons: 32,
    completedLessons: 0,
    duration: "10 hours",
    category: "Career",
    prerequisites: [],
    learningOutcomes: [
      "Build a compelling AI portfolio",
      "Launch a freelance AI business",
      "Position yourself for AI careers",
      "Monetize AI skills effectively"
    ],
    chapters: [
      {
        title: "Module 1: AI Career Landscape",
        lessons: [
          { title: "AI Job Roles and Opportunities", duration: "24 min", objectives: ["Explore AI careers", "Understand roles"], activity: "Research AI job market", quiz: "AI careers" },
          { title: "Skills Employers Want", duration: "26 min", objectives: ["Identify in-demand skills", "Assess your skills"], activity: "Skills gap analysis", quiz: "AI skills" },
          { title: "Career Paths: Technical vs Non-Technical", duration: "24 min", objectives: ["Explore different paths", "Choose your direction"], activity: "Map your career path", quiz: "Career paths" },
          { title: "Remote Work and Global Opportunities", duration: "22 min", objectives: ["Find remote AI jobs", "Work globally"], activity: "Find remote opportunities", quiz: "Remote work" },
        ]
      },
      {
        title: "Module 2: Portfolio Building",
        lessons: [
          { title: "Creating a Standout AI Portfolio", duration: "28 min", objectives: ["Build impressive portfolio", "Showcase projects"], activity: "Start your portfolio", quiz: "Portfolio basics" },
          { title: "Documenting AI Projects", duration: "26 min", objectives: ["Document effectively", "Tell project stories"], activity: "Document a project", quiz: "Project documentation" },
          { title: "GitHub and Code Portfolios", duration: "24 min", objectives: ["Build GitHub presence", "Showcase code"], activity: "Optimize GitHub profile", quiz: "GitHub portfolio" },
          { title: "Case Studies and Results", duration: "26 min", objectives: ["Write compelling case studies", "Show impact"], activity: "Create case study", quiz: "Case studies" },
          { title: "Demo Videos and Presentations", duration: "24 min", objectives: ["Create demo videos", "Present effectively"], activity: "Record project demo", quiz: "Demos and presentations" },
        ]
      },
      {
        title: "Module 3: Personal Branding",
        lessons: [
          { title: "Building Your AI Brand", duration: "26 min", objectives: ["Define your brand", "Stand out"], activity: "Create brand statement", quiz: "Personal branding" },
          { title: "LinkedIn for AI Professionals", duration: "28 min", objectives: ["Optimize LinkedIn", "Network effectively"], activity: "Update LinkedIn profile", quiz: "LinkedIn strategy" },
          { title: "Content Creation and Thought Leadership", duration: "30 min", objectives: ["Create valuable content", "Build authority"], activity: "Write first AI article", quiz: "Content creation" },
          { title: "Social Media Strategy", duration: "24 min", objectives: ["Use social media", "Grow audience"], activity: "Plan content calendar", quiz: "Social media" },
          { title: "Speaking and Teaching", duration: "26 min", objectives: ["Share knowledge", "Build reputation"], activity: "Outline a talk", quiz: "Public speaking" },
        ]
      },
      {
        title: "Module 4: Freelancing with AI Skills",
        lessons: [
          { title: "Starting Your AI Freelance Business", duration: "28 min", objectives: ["Launch freelance career", "Set up business"], activity: "Create business plan", quiz: "Freelancing basics" },
          { title: "Finding Clients and Projects", duration: "26 min", objectives: ["Find clients", "Win projects"], activity: "Identify client sources", quiz: "Client acquisition" },
          { title: "Pricing Your AI Services", duration: "28 min", objectives: ["Price competitively", "Value your work"], activity: "Create pricing structure", quiz: "Pricing strategy" },
          { title: "Proposals and Contracts", duration: "24 min", objectives: ["Write winning proposals", "Protect yourself"], activity: "Draft proposal template", quiz: "Proposals and contracts" },
          { title: "Client Management and Delivery", duration: "26 min", objectives: ["Manage clients", "Deliver quality"], activity: "Create delivery process", quiz: "Client management" },
          { title: "Scaling Your Freelance Business", duration: "28 min", objectives: ["Scale beyond yourself", "Build systems"], activity: "Plan scaling strategy", quiz: "Scaling freelancing" },
        ]
      },
      {
        title: "Module 5: AI Entrepreneurship",
        lessons: [
          { title: "Identifying AI Business Opportunities", duration: "28 min", objectives: ["Find market gaps", "Validate ideas"], activity: "Brainstorm AI business ideas", quiz: "Opportunity identification" },
          { title: "Building AI Products and Services", duration: "30 min", objectives: ["Create AI products", "Design services"], activity: "Design AI product", quiz: "Product development" },
          { title: "Go-to-Market Strategy", duration: "28 min", objectives: ["Launch effectively", "Reach customers"], activity: "Create GTM plan", quiz: "Go-to-market" },
          { title: "Funding and Investment", duration: "26 min", objectives: ["Raise capital", "Bootstrap effectively"], activity: "Explore funding options", quiz: "Funding strategies" },
          { title: "Building a Team", duration: "24 min", objectives: ["Hire talent", "Build culture"], activity: "Plan team structure", quiz: "Team building" },
          { title: "Scaling an AI Startup", duration: "28 min", objectives: ["Grow sustainably", "Scale operations"], activity: "Create scaling roadmap", quiz: "Startup scaling" },
        ]
      },
      {
        title: "Module 6: Monetization Strategies",
        lessons: [
          { title: "Multiple Income Streams", duration: "26 min", objectives: ["Diversify income", "Build stability"], activity: "Map income streams", quiz: "Income diversification" },
          { title: "Creating and Selling AI Courses", duration: "28 min", objectives: ["Package knowledge", "Sell courses"], activity: "Outline course idea", quiz: "Course creation" },
          { title: "Consulting and Advisory Services", duration: "26 min", objectives: ["Offer consulting", "Command premium rates"], activity: "Design consulting offer", quiz: "Consulting" },
          { title: "Building AI Tools and SaaS", duration: "30 min", objectives: ["Create recurring revenue", "Build SaaS"], activity: "Plan SaaS product", quiz: "SaaS business" },
          { title: "Affiliate Marketing and Partnerships", duration: "24 min", objectives: ["Earn through affiliates", "Build partnerships"], activity: "Identify partnership opportunities", quiz: "Partnerships" },
        ]
      },
      {
        title: "Module 7: Long-Term Success",
        lessons: [
          { title: "Continuous Learning and Adaptation", duration: "24 min", objectives: ["Stay current", "Adapt to change"], activity: "Create learning plan", quiz: "Continuous learning" },
          { title: "Networking and Community", duration: "26 min", objectives: ["Build network", "Give back"], activity: "Join AI communities", quiz: "Networking" },
          { title: "Work-Life Balance in AI", duration: "22 min", objectives: ["Avoid burnout", "Sustain success"], activity: "Design ideal schedule", quiz: "Work-life balance" },
        ]
      }
    ],
    projects: [
      {
        title: "Mini-Project 1: Complete Portfolio Website",
        description: "Build and launch a professional portfolio website showcasing your AI projects.",
        duration: "4 hours",
        difficulty: "beginner"
      },
      {
        title: "Mini-Project 2: First Freelance Client",
        description: "Land and deliver your first AI freelance project from proposal to completion.",
        duration: "20 hours",
        difficulty: "intermediate"
      },
      {
        title: "Capstone: Launch Your AI Business",
        description: "Launch a complete AI business or product, from idea validation to first customers.",
        duration: "40 hours",
        difficulty: "advanced"
      }
    ]
  }
];

export const categories = ["All", "Fundamentals", "Skills", "Business", "Creative", "Advanced", "Career"];

// Metadata lookup for courses (used by dashboard)
export const COURSES_METADATA: Record<string, { title: string; totalDurationMin: number; totalLessons: number }> = expandedCourses.reduce((acc, course) => {
  // Parse duration string (e.g., "8 hours" -> 480 minutes)
  const durationMatch = course.duration.match(/(\d+)\s*(hour|min)/);
  const durationValue = durationMatch ? parseInt(durationMatch[1]) : 60;
  const durationUnit = durationMatch ? durationMatch[2] : 'hour';
  const totalDurationMin = durationUnit === 'hour' ? durationValue * 60 : durationValue;
  
  acc[course.id.toString()] = {
    title: course.title,
    totalDurationMin,
    totalLessons: course.lessons
  };
  return acc;
}, {} as Record<string, { title: string; totalDurationMin: number; totalLessons: number }>);
