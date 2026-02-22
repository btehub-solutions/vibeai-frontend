import { Course } from "../course-types";

export const course2: Course = {
  id: 2,
  title: "Machine Learning Fundamentals",
  description: "Learn the core concepts of machine learning, from supervised learning to model evaluation and deployment.",
  longDescription: "Dive into machine learning with a mathematical and practical approach. Master the fundamental trio of Supervised, Unsupervised, and Reinforcement Learning. Grasp the intuition behind Gradient Descent, Linear Regression, Decision Trees, and K-Means Clustering to build predictive models from scratch.",
  progress: 0,
  lessons: 30,
  completedLessons: 0,
  duration: "10 hours",
  category: "Fundamentals",
  prerequisites: ["AI Foundations"],
  learningOutcomes: [
    "Execute the 7-step Data Science Workflow (EDA, Feature Engineering, Training)",
    "Implement regression models to predict continuous numerical values",
    "Implement classification models to categorize unstructured data",
    "Understand the bias-variance tradeoff and how to prevent model overfitting"
  ],
  modules: [
    {
      title: "Module 1: The AI/ML Lifecycle",
      lessons: [
        { 
          id: "c2-m1-l1",
          title: "The Paradigm Shift", 
          duration: "18 min",
          type: "reading",
          content: `
# Traditional Programming vs. Machine Learning

In **Traditional Programming**, humans input Data and explicit Rules (if/then statements) into a computer, and the computer outputs the Answers. 

In **Machine Learning**, humans input Data and the expected Answers (Labels) into the computer, and the computer outputs the Rules (Patterns).

## When to use ML?
You use ML when the rules are too complex for a human to hardcode. 
Example: Writing an if/then statement for "If pixel 34 is brown and pixel 55 is white, then it's a dog" is impossible due to lighting, angles, and dog breeds. ML solves this by looking at 100,000 pictures of dogs and letting the algorithm derive the mathematical pattern of "dogness".
          `
        },
        { 
          id: "c2-m1-l2",
          title: "The Data Science Workflow", 
          duration: "25 min",
          type: "reading",
          content: `
# The Steps to Production

Algorithms are useless without clean data. Data scientists spend 80% of their time on the first three steps.

1.  **Data Collection:** Scraping web data, accessing SQL databases, pulling APIs.
2.  **Exploratory Data Analysis (EDA):** Finding outliers. If you are predicting house prices and one house is listed at $1, it will destroy your model. You must graph the data and remove anomalies.
3.  **Feature Engineering:** Modifying raw data into variables the model can easily understand. (e.g., Categorizing "Birthdate 1990" into a binary feature "Is_Millennial: 1").
4.  **Data Splitting:** You CANNOT train the model on all your data. You must hide 20% of it in a "Test Set". This ensures the model actually learned patterns, rather than just memorizing the answers for the test.
5.  **Training:** Feeding the 80% Training Set into the algorithm.
6.  **Evaluation:** Asking the model to predict the answers for the hidden 20% Test Set, and scoring its accuracy.
          `
        },
         {
            id: "c2-m1-l3",
            title: "Quiz: The Workflow",
            duration: "10 min",
            type: "quiz",
            questions: [
                {
                    id: "q1",
                    text: "Why must a Data Scientist withhold a 'Test Set' of data from the training process?",
                    options: ["To save processing power on the GPU", "To ensure the model generalizes to new, unseen data rather than just memorizing the training examples (overfitting)", "Because the algorithm can only handle small batches of data", "To trick the computer"],
                    correctAnswer: "B",
                    explanation: "If you test a model on the exact data it trained on, it will score 100% just by memorizing it (overfitting). Testing on hidden data proves it learned the underlying patterns."
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
          title: "Linear Regression (Predicting Numbers)", 
          duration: "20 min",
          type: "reading",
          content: `
# Predicting the Future

Supervised Learning means teaching the AI by example (showing it the data *and* the correct answers).

## Linear Regression
The most foundational ML algorithm. It aims to draw a "line of best fit" through a scatterplot of data points.

*   **Equation:** y = mx + b (Where 'y' is the prediction, 'x' is the feature, 'm' is the learned weight, and 'b' is the learned bias).
*   **Use Case:** Predicting continuous numerical values. (e.g., "Based on square footage(x), what will this house sell for(y)?")

## Gradient Descent
How does the computer learn the correct line? 
It starts with a random line. It calculates how far off its prediction was from the actual house prices (The Error/Cost Function). It then takes a mathematical "step" downhill (Gradient Descent) to adjust the line slightly to lower the error. It repeats this thousands of times until the line perfectly fits the data trend.
          `
        },
        { 
          id: "c2-m2-l2",
          title: "Classification (Predicting Categories)", 
          duration: "28 min",
          type: "reading",
          content: `
# Logistic Regression & Decision Trees

If you want to predict a category ("Spam" vs "Not Spam"), drawing a straight line through the data doesn't work.

## Logistic Regression
Despite its name, this is a *classification* algorithm. It bends a straight line into an S-curve (Sigmoid function) so that all predictions fall strictly between 0 and 1 representing probability. (e.g., 0.82 probability of being Spam).

## Decision Trees
Decision Trees act like a massive game of 20 Questions.
*   "Does the email contain the word 'Lottery'?" -> If Yes, go left.
*   "Is the sender in the contacts list?" -> If No, go left.
*   **Leaf Node:** 95% chance it is Spam.

*Random Forests* take this further by creating 1,000 different decision trees and having them vote on the final answer, eliminating the bias of a single tree.
          `
        }
      ]
    },
    {
      title: "Module 3: Unsupervised & Reinforcement",
      lessons: [
        {
          id: "c2-m3-l1",
          title: "K-Means Clustering",
          duration: "26 min",
          type: "reading",
          content: `
# Unsupervised Learning

What if you have a massive database of users, but no labels? You don't know what you are looking for. You use **Unsupervised Learning**.

## K-Means Clustering
You want to segment your users into 3 distinct marketing factions, but you don't know what those factions should be. 

1.  Tell the algorithm to find **K=3** clusters.
2.  The algorithm plots all millions of users on a multi-dimensional graph based on age, spend, login time, etc.
3.  It mathematically groups the closest data points together into 3 distinct spheres.
4.  *Result:* The algorithm hands you 3 groups. It's up to the human data scientist to look at Group A and realize, "Ah, these are our High-Spend Weekend Shoppers."
          `
        },
        {
          id: "c2-m3-l2",
          title: "Reinforcement Learning Overview",
          duration: "26 min",
          type: "reading",
          content: `
# Reinforcement Learning (RL)

RL is how we train AI to play chess, drive cars, or beat video games.

There is no dataset. There is an **Agent** placed into an **Environment**. 
The agent takes a random **Action**. If the action is good, it receives a **Reward** (+1 point). If the action is bad, it receives a **Penalty** (-1 point).

Over millions of simulated iterations, the agent learns a complex web of behaviors (a Policy) designed solely to maximize its reward score over time. This is how AlphaGo defeated the world champion at the board game Go.
          `
        }
      ]
    }
  ],
  projects: [
    {
      title: "Capstone: Predict Property Values",
      description: "Perform EDA on a real estate dataset, handle missing variables, and train a Random Forest regressor to predict home valuations based on property features.",
      duration: "6 hours",
      difficulty: "advanced"
    }
  ]
};
