import { Course } from "../course-types";

export const course1: Course = {
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
  modules: [
    {
      title: "Module 1: Introduction to Artificial Intelligence",
      lessons: [
        { 
          id: "c1-m1-l1",
          title: "What is Artificial Intelligence?", 
          duration: "18 min",
          type: "reading",
          objectives: ["Define AI in simple terms", "Understand the difference between AI and automation"],
          content: `
# What is Artificial Intelligence?

Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning (the acquisition of information and rules for using the information), reasoning (using rules to reach approximate or definite conclusions), and self-correction.

## Key Components of AI

1.  **Learning**: The ability to improve performance based on experience.
2.  **Reasoning**: The ability to draw inferences appropriate to the situation.
3.  **Problem Solving**: The ability to use data to solve complex problems.
4.  **Perception**: The ability to interpret sensory input (like images or speech).
5.  **Language Understanding**: The ability to understand and generate human language.

## AI vs. Automation

It's common to confuse AI with simple automation. Here is the key difference:

*   **Automation** follows a strict set of pre-defined rules. It does exactly what it is told to do, every single time. It cannot handle unexpected situations.
*   **AI** can adapt. It can learn from new data and handle situations it hasn't explicitly been programmed for.

> "AI is the new electricity. Just as electricity transformed almost everything 100 years ago, today I have a hard time thinking of an industry that I don't think AI will transform in the next several years." - Andrew Ng
          `,
          activity: "Identify AI vs non-AI systems in daily life",
          quiz: "5-question multiple choice on AI basics"
        },
        { 
          id: "c1-m1-l2",
          title: "The History of AI: From Turing to Today", 
          duration: "22 min",
          type: "reading",
          objectives: ["Trace AI's evolution from the 1950s to present", "Understand key milestones in AI development"],
          content: `
# The History of AI

The journey of Artificial Intelligence is a fascinating story of ambition, setbacks, and breakthroughs.

## The Birth of AI (1950-1956)

*   **1950**: Alan Turing publishes "Computing Machinery and Intelligence," proposing the famous **Turing Test** to determine if a machine can exhibit intelligent behavior.
*   **1956**: The term "Artificial Intelligence" is coined at the **Dartmouth Conference**, widely considered the birth of the field.

## The Golden Years (1956-1974)

Researchers developed programs that could solve algebra word problems, prove geometric theorems, and learn to speak English. There was immense optimism.

## The AI Winters (1974-1980, 1987-1993)

Due to inflated expectations and lack of computational power, funding dried up. These periods of reduced funding and interest are known as "AI Winters."

## The Boom (1993-2011)

*   **1997**: IBM's **Deep Blue** defeats world chess champion Garry Kasparov.
*   **2011**: IBM's **Watson** wins Jeopardy!.

## The Deep Learning Era (2012-Present)

With the explosion of data and GPU power, Deep Learning took center stage.
*   **2012**: AlexNet dominates the ImageNet competition.
*   **2016**: Google's **AlphaGo** defeats Go champion Lee Sedol.
*   **2022**: OpenAI releases **ChatGPT**, bringing Generative AI to the masses.
          `,
          activity: "Create a timeline of major AI breakthroughs",
          quiz: "Match historical events with their significance"
        },
        { 
          id: "c1-m1-l3",
          title: "Types of AI: Narrow, General, and Super AI", 
          duration: "20 min",
          type: "reading",
          objectives: ["Differentiate between ANI, AGI, and ASI", "Identify current AI capabilities and limitations"],
          content: `
# Types of AI

AI is generally categorized into three types based on capability:

## 1. Artificial Narrow Intelligence (ANI)
*   **Definition**: AI designed to perform a specific task.
*   **Examples**: Siri, Alexa, Google Search, Facial Recognition, Self-driving cars.
*   **Status**: This is the **only** type of AI that exists today.

## 2. Artificial General Intelligence (AGI)
*   **Definition**: AI that possesses the ability to understand, learn, and apply knowledge across a wide variety of tasks, similar to a human.
*   **Status**: Theoretical. We do not yet have AGI.

## 3. Artificial Super Intelligence (ASI)
*   **Definition**: AI that surpasses human intelligence in all aspects—creativity, general wisdom, and problem-solving.
*   **Status**: Highly theoretical and a subject of much debate.

## Weak AI vs. Strong AI
*   **Weak AI** simulates thinking (it acts *as if* it thinks).
*   **Strong AI** actually has a mind and consciousness.
          `,
          activity: "Categorize real-world AI systems by type",
          quiz: "Classification exercise with examples"
        },
        { 
          id: "c1-m1-l4",
          title: "AI vs Traditional Programming", 
          duration: "25 min",
          type: "reading",
          objectives: ["Understand rule-based vs learning-based systems", "Recognize when to use AI vs traditional code"],
          content: `
# AI vs. Traditional Programming

To understand AI, we must understand how it differs from the software we've been building for decades.

## Traditional Programming (Rule-Based)
In traditional programming, the developer explicitly writes the rules.
*   **Input**: Data + Rules
*   **Output**: Answers

**Example**: A program to calculate taxes. You write the exact tax brackets and formulas.

## Machine Learning (AI)
In Machine Learning, the system *learns* the rules from data.
*   **Input**: Data + Answers (History)
*   **Output**: Rules (The Model)

**Example**: Trying to teach a computer to recognize a cat.
*   **Traditional**: "If it has triangular ears, and whiskers, and fur..." (Too complex, too many exceptions).
*   **AI**: Show the computer 10,000 photos of cats and 10,000 photos of dogs. The algorithm figures out the patterns itself.
          `,
          activity: "Compare solutions for the same problem using both approaches",
          quiz: "Scenario-based decision making"
        },
        { 
          id: "c1-m1-l5",
          title: "Quiz: Module 1 Knowledge Check", 
          duration: "15 min",
          type: "quiz",
          objectives: ["Assess understanding of basic AI concepts"],
          questions: [
            {
              id: "q1",
              text: "Which of the following best describes Artificial Narrow Intelligence (ANI)?",
              options: [
                "AI that can perform any intellectual task that a human can do",
                "AI designed to perform a specific task, such as playing chess or recommending movies",
                "AI that possesses consciousness and emotions",
                "AI that is smarter than the best human brains in every field"
              ],
              correctAnswer: "B",
              explanation: "ANI is specialized AI designed for specific tasks. All current AI, including Siri and ChatGPT, are examples of ANI."
            },
            {
              id: "q2",
              text: "Who proposed the test to determine if a machine can exhibit intelligent behavior?",
              options: ["Alan Turing", "Elon Musk", "Bill Gates", "Ada Lovelace"],
              correctAnswer: "A",
              explanation: "Alan Turing proposed the Turing Test in his 1950 paper 'Computing Machinery and Intelligence'."
            },
            {
              id: "q3",
              text: "What is the main difference between traditional programming and machine learning?",
              options: [
                "Traditional programming uses data, while machine learning does not",
                "Traditional programming is faster than machine learning",
                "In traditional programming, rules are explicitly programmed; in ML, the system learns rules from data",
                "There is no difference"
              ],
              correctAnswer: "C",
              explanation: "The core difference is that ML algorithms learn patterns and rules from data rather than following explicitly programmed instructions."
            }
          ]
        }
      ]
    },
    {
      title: "Module 2: AI Applications Across Industries",
      lessons: [
        { 
          id: "c1-m2-l1",
          title: "AI in Healthcare", 
          duration: "20 min",
          type: "reading",
          objectives: ["Explore medical imaging AI", "Understand drug discovery applications"],
          content: `
# AI in Healthcare

Healthcare is one of the most promising fields for AI application, with the potential to save lives and reduce costs.

## Key Applications

### 1. Medical Imaging & Diagnostics
AI algorithms can analyze X-rays, MRIs, and CT scans with accuracy comparable to or exceeding human radiologists.
*   **Example**: Detecting early signs of lung cancer or diabetic retinopathy.

### 2. Drug Discovery
Developing a new drug takes roughly 12 years and costs billions. AI can simulate molecular interactions to identify promising drug candidates much faster.
*   **Example**: AlphaFold predicting protein structures.

### 3. Personalized Medicine
AI can analyze a patient's genetic makeup and medical history to recommend personalized treatment plans.

### 4. Virtual Health Assistants
Chatbots and virtual assistants can provide 24/7 support, answering patient questions and scheduling appointments.
          `,
          activity: "Case study analysis of AI in radiology"
        },
        { 
          id: "c1-m2-l2",
          title: "AI in Finance", 
          duration: "22 min",
          type: "reading",
          objectives: ["Learn about algorithmic trading", "Understand fraud detection systems"],
          content: `
# AI in Finance

The finance sector was an early adopter of AI, using it for everything from high-frequency trading to customer service.

## Key Applications

### 1. Fraud Detection
AI systems analyze millions of transactions in real-time to spot unusual patterns that indicate fraud.
*   **Mechanism**: Anomaly detection algorithms flag transactions that deviate from a user's typical behavior.

### 2. Algorithmic Trading
AI-driven quantitative trading strategies execute trades at speeds and volumes impossible for humans, analyzing market data to predict price movements.

### 3. Credit Scoring
AI can assess creditworthiness by analyzing alternative data sources (e.g., utility payments, rental history) to provide loans to unbanked populations.

### 4. Robo-Advisors
Automated platforms provide financial advice and portfolio management with minimal human intervention.
          `,
          activity: "Analyze a fraud detection scenario"
        },
        { 
          id: "c1-m2-l3",
          title: "AI in E-commerce", 
          duration: "18 min",
          type: "reading",
          objectives: ["Explore recommendation systems", "Understand inventory optimization"],
          content: `
# AI in E-commerce

If you've ever bought something because Amazon "suggested" it, you've interacted with retail AI.

## Key Applications

### 1. Recommendation Engines
The most visible application. "Customers who bought this also bought..."
*   **Impact**: Netflix estimates its recommendation engine saves it $1 billion per year by reducing churn.

### 2. Visual Search
Allows users to upload a photo of a product (like a pair of shoes) to find similar items in the catalog.

### 3. Inventory Management
AI predicts demand for products based on trends, weather, and historical data, optimizing stock levels and reducing waste.

### 4. Dynamic Pricing
AI adjusts prices in real-time based on demand, competition, and other factors (common in airline tickets and ride-sharing).
          `,
          activity: "Design a simple recommendation flow"
        },
        { 
            id: "c1-m2-l4", // Adding Quiz for Module 2
            title: "Quiz: Module 2 Knowledge Check",
            duration: "15 min",
            type: "quiz",
            completed: false,
            questions: [
                {
                    id: "q1",
                    text: "How does AI help in drug discovery?",
                    options: [
                        "By replacing all human doctors",
                        "By manufacturing drugs directly",
                        "By simulating molecular interactions to identify candidates faster",
                        "It doesn't help"
                    ],
                    correctAnswer: "C",
                    explanation: "AI accelerates drug discovery by modeling how molecules interact, predicting which ones are likely to be effective as drugs."
                },
                {
                    id: "q2",
                    text: "What is a primary use of AI in e-commerce?",
                    options: [
                        "Creating physical products",
                        "Recommendation engines",
                        "Driving delivery trucks (only)",
                        "Printing receipts"
                    ],
                    correctAnswer: "B",
                    explanation: "Recommendation engines are key in e-commerce, helping suggest products users are likely to buy."
                }
            ]
        }
      ]
    },
    {
        title: "Module 3: Core AI Concepts",
        lessons: [
            {
                id: "c1-m3-l1",
                title: "Understanding Data",
                duration: "20 min",
                type: "reading",
                objectives: ["Learn about structured vs unstructured data"],
                content: `
# Understanding Data: The Fuel of AI

AI models are only as good as the data they are trained on.

## Types of Data

### 1. Structured Data
Highly organized data that fits easily into spreadsheets or relational databases.
*   **Examples**: Names, dates, addresses, credit card numbers, stock prices.
*   **Usage**: Easily searchable and analyzable by traditional algorithms.

### 2. Unstructured Data
Data that does not have a pre-defined data model or organization.
*   **Examples**: Text documents, emails, social media posts, images, audio, video.
*   **Usage**: Requires advanced AI (NLP, Computer Vision) to process.

## Data Quality
"Garbage In, Garbage Out." If your training data is biased or inaccurate, your AI model will be too.
                `
            },
            {
                id: "c1-m3-l2",
                title: "Introduction to Machine Learning",
                duration: "25 min",
                type: "reading",
                content: `
# Introduction to Machine Learning

Machine Learning (ML) is the subset of AI that focuses on building systems that learn from data.

## Three Main Types of ML

1.  **Supervised Learning**: The AI is trained on labeled data.
    *   *Analogy*: Teaching a child with flashcards. "This is a cat." "This is a dog."
    *   *Use Cases*: Spam filtering, image recognition.

2.  **Unsupervised Learning**: The AI looks for patterns in unlabeled data.
    *   *Analogy*: Giving a child a pile of blocks and letting them sort them by shape or color without instructions.
    *   *Use Cases*: Customer segmentation, anomaly detection.

3.  **Reinforcement Learning**: The AI learns through trial and error, receiving rewards or penalties.
    *   *Analogy*: Training a dog with treats.
    *   *Use Cases*: Gaming (AlphaGo), robotics navigation.
                `
            },
            {
                id: "c1-m3-l3",
                title: "Quiz: Core Concepts",
                duration: "10 min",
                type: "quiz",
                questions: [
                    {
                        id: "q1",
                        text: "Which type of machine learning involves labeled data?",
                        options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deep Learning"],
                        correctAnswer: "A",
                        explanation: "Supervised learning uses labeled datasets to train algorithms to classify data or predict outcomes."
                    }
                ]
            }
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
};
