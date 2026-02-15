import { Course } from "../course-types";

export const course2: Course = {
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
  modules: [
    {
      title: "Module 1: Machine Learning Foundations",
      lessons: [
        { 
          id: "c2-m1-l1",
          title: "What is Machine Learning?", 
          duration: "18 min",
          type: "reading",
          objectives: ["Define ML and its types", "Understand when to use ML"],
          content: `
# What is Machine Learning?

Machine Learning (ML) is the field of study that gives computers the ability to learn without being explicitly programmed.

## Why use Machine Learning?

*   **Complex Patterns**: For problems too complex for hand-coded rules (e.g., face recognition).
*   **Adaptability**: ML systems can adapt to new data (e.g., spam filters updating for new spam tactics).
*   **Scale**: ML can automate decision-making at a scale impossible for humans.

## Key Terminology

*   **Training Set**: Data used to train the model.
*   **Test Set**: Data used to evaluate the model's performance on unseen data.
*   **Feature**: An individual measurable property or characteristic of a phenomenon being observed.
*   **Label**: The answer or result we want the model to predict (in supervised learning).
          `,
          quiz: "ML fundamentals",
          questions: [
            {
              id: "q1",
              text: "When is Machine Learning most useful?",
              options: [
                "When the rules are simple and never change",
                "When the problem is complex and data-driven",
                "For basic arithmetic calculations",
                "Only for robotics"
              ],
              correctAnswer: "B",
              explanation: "ML shines where explicit rules are too hard to define, such as image recognition or language translation."
            }
          ]
        },
        { 
          id: "c2-m1-l2",
          title: "The Machine Learning Workflow", 
          duration: "25 min",
          type: "reading",
          content: `
# The Machine Learning Workflow

Building an ML model is not just about writing code. It's a systematic process.

1.  **Define the Problem**: What are you trying to solve? Is it a classification (A vs B) or regression (predicting a number) problem?
2.  **Data Collection**: Gathering the raw data required.
3.  **Data Preprocessing**: Cleaning, formatting, and normalizing data. Handling missing values.
4.  **Exploratory Data Analysis (EDA)**: Visualizing data to find patterns and correlations.
5.  **Feature Engineering**: Selecting or creating the most relevant variables for the model.
6.  **Model Selection**: Choosing the right algorithm (e.g., Decision Tree, Neural Network).
7.  **Training**: Running the algorithm on the data to create a model.
8.  **Evaluation**: Testing the model's accuracy on new data.
9.  **Deployment**: Integrating the model into a production application.
10. **Monitoring**: Watching the model's performance over time in the real world.
          `
        },
        {
            id: "c2-m1-l3",
            title: "Types of Machine Learning",
            duration: "22 min",
            type: "reading",
            content: `
# Types of Machine Learning Algorithms

## 1. Supervised Learning
*   **Goal**: Predict a known outcome.
*   **Data**: Labeled (Input + Output).
*   **Examples**:
    *   **Regression**: Predicting house prices (continuous value).
    *   **Classification**: Predicting if an email is spam (discrete category).

## 2. Unsupervised Learning
*   **Goal**: Discover hidden patterns.
*   **Data**: Unlabeled (Input only).
*   **Examples**:
    *   **Clustering**: Grouping customers by purchasing behavior.
    *   **Dimensionality Reduction**: Simplifying complex data.

## 3. Reinforcement Learning
*   **Goal**: Maximize a reward over time.
*   **Data**: Environment feedback (Reward/Penalty).
*   **Examples**: Game playing AI, Robot navigation.
            `
        },
         {
            id: "c2-m1-l4", // Quiz for module 1
            title: "Quiz: ML Basics",
            duration: "10 min",
            type: "quiz",
            questions: [
                {
                    id: "q1",
                    text: "Which step often takes the most time in an ML project?",
                    options: ["Model Training", "Data Preprocessing & Cleaning", "Deployment", "Evaluation"],
                    correctAnswer: "B",
                    explanation: "Data scientists often spend 80% of their time collecting and cleaning data before training even begins."
                }
            ]
        }
      ]
    },
    {
      title: "Module 2: Supervised Learning",
      lessons: [
        { 
          id: "c2-m2-l1",
          title: "Supervised Learning Intro", 
          duration: "20 min",
          type: "reading",
          content: `
# Introduction to Supervised Learning

Supervised learning is the most common form of ML in industry today. It involves learning a function that maps an input to an output based on example input-output pairs.

## Two Main Tasks

1.  **Classification**: The output variable is a category (e.g., "Red" or "Blue", "Spam" or "Not Spam").
2.  **Regression**: The output variable is a real value (e.g., "Dollars", "Weight").

## Popular Algorithms
*   **Linear/Logistic Regression**
*   **Support Vector Machines (SVM)**
*   **Decision Trees & Random Forests**
*   **k-Nearest Neighbors (KNN)**
*   **Neural Networks**
          `
        },
        { 
          id: "c2-m2-l2",
          title: "Linear Regression Explained", 
          duration: "28 min",
          type: "reading",
          content: `
# Linear Regression

Linear regression is used to predict the value of a variable based on the value of another variable. The variable you want to predict is called the dependent variable (or target). The variable you are using to predict the other variable's value is called the independent variable (or feature).

## Ideally, it fits a straight line
The equation is simple:
**y = mx + b**

*   **y**: The prediction
*   **x**: The input feature
*   **m**: The slope (weight)
*   **b**: The y-intercept (bias)

The goal of training is to find the best values for **m** and **b** that minimize the error between the predicted **y** and the actual answer.
          `
        },
        { 
          id: "c2-m2-l3",
          title: "Decision Trees and Random Forests", 
          duration: "30 min",
          type: "reading",
          content: `
# Decision Trees

Think of a Decision Tree as a flowchart.
*   Start at the root.
*   Ask a question (e.g., "Is it raining?").
*   Follow the branch (Yes/No).
*   Arrive at a leaf node (The decision).

## Random Forests
A single decision tree is prone to "overfitting" (memorizing the data too closely). A **Random Forest** is an *ensemble* method that builds many decision trees and merges them together to get a more accurate and stable prediction. It's like asking a committee of experts rather than just one person.
          `,
          activity: "Build a decision tree manually for a simple problem"
        },
         {
            id: "c2-m2-l4", // Quiz
            title: "Quiz: Supervised Learning",
            duration: "10 min",
            type: "quiz",
            questions: [
                {
                    id: "q1",
                    text: "Which algorithm would you use to predict the exact price of a house?",
                    options: ["Logistic Regression", "Linear Regression", "K-Means Clustering", "None of the above"],
                    correctAnswer: "B",
                    explanation: "Linear Regression is used for predicting continuous values like prices. Logistic Regression is for classification (Yes/No)."
                }
            ]
        }
      ]
    },
    {
      title: "Module 3: Unsupervised Learning",
      lessons: [
        {
          id: "c2-m3-l1",
          title: "K-Means Clustering",
          duration: "26 min",
          type: "reading",
          content: `
# Unsupervised Learning: K-Means Clustering

Unsupervised learning finds hidden structures in unlabeled data.

## K-Means Algorithm
K-Means is a popular clustering algorithm. It partitions **n** observations into **k** clusters in which each observation belongs to the cluster with the nearest mean.

**How it works:**
1.  Choose **k** (the number of clusters).
2.  Randomly place **k** centroids.
3.  Assign each data point to the nearest centroid.
4.  Move the centroid to the center of its assigned points.
5.  Repeat steps 3-4 until the centroids stop moving.
          `
        }
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
};
