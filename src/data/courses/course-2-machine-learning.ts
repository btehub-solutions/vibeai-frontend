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
# MODULE 1 — The AI/ML Lifecycle
**Learning Objectives:**
* Differentiate between Traditional Programming and Machine Learning paradigms.
* Identify scenarios where ML is the optimal solution versus hardcoded logic.
* Navigate the 7-step Data Science Workflow from raw data to model deployment.

---

## Lesson 1 — The Paradigm Shift

### Definition / Explanation:

**Point 1: Traditional Programming**
In Traditional Programming, humans input *Data* and explicit *Rules* (if/then statements, loops, algorithms) into a computer, and the computer outputs the *Answers*. The programmer must mathematically understand exactly how to solve the problem step-by-step.

**Point 2: Machine Learning**
In Machine Learning (ML), the paradigm is inverted. Humans input *Data* and the expected *Answers* (Labels) into the computer, and the computer automatically calculates and outputs the *Rules* (Patterns). 

### Key Points:
*   **When to Use ML:** You use ML when the rules are fundamentally too complex for a human to mathematically hardcode.
*   **The Complexity Barrier:** Consider writing an if/then statement to detect a dog in a photo. "If pixel 34 is brown and pixel 55 is white, then it's a dog" is impossible due to infinite variations in lighting, camera angles, and dog breeds. 
*   **The ML Solution:** Instead of coding the rules of "dogness", you feed an algorithm 100,000 pictures of dogs labeled "Dog", and let the computer's neural network derive the mathematical pattern connecting the pixels to the label.

### Examples / Use Cases:

*   **Example 1: Spam Detection:** A traditional programmer tries to block spam by hardcoding rules: \`if email contains "Viagra" then block\`. Spammers immediately circumvent this by writing "V1agra". An ML model reads 10,000 spam emails, derives thousands of subtle, interconnected probabilistic rules (time of day sent, frequency of capitalization, specific vocabulary clusters) that spammers cannot easily evade.

### Visuals:

[IMAGE: A comparative block diagram. Top: (Data + Rules) -> Computer -> (Answers). Bottom: (Data + Answers) -> Computer -> (Rules/Model).]

### Implementation / Hands-On:

*   **Step 1:** Look at the software applications you use daily (e.g., Spotify, Excel, your Email client).
*   **Step 2:** Write down one feature that operates on hardcoded rules (e.g., Excel's SUM function).
*   **Step 3:** Write down one feature powered by ML (e.g., Spotify's "Discover Weekly" recommendation engine) and explain why a human couldn't hardcode it.

### Summary / Key Takeaways:

*   Machine Learning is the process of computers learning rules from data.
*   ML is suited for complex, highly variable tasks (vision, language, prediction) where hardcoding fails.
*   The quality of an ML model is entirely dependent on the quality of the data and answers provided to it.

### Optional Exercises / Prompts:

*   **Exercise 1:** Act as a product manager. A client wants you to build an app that calculates sales tax based on zip code. Would you hire a traditional programmer or an ML engineer? Explain why.
          `
        },
        { 
          id: "c2-m1-l2",
          title: "The Data Science Workflow", 
          duration: "25 min",
          type: "reading",
          content: `
## Lesson 2 — The Data Science Workflow

### Definition / Explanation:

**Point 1: The 80/20 Rule of Data Science**
Algorithms are essentially useless without clean, structured data. Beginners often rush to train models, but professional data scientists spend 80% of their time on the first three steps of the data pipeline: collecting, cleaning, and formatting data. Only 20% is spent on actual machine learning.

**Point 2: The 6-Step Pipeline to Production**
A rigorous ML project follows a strict lifecycle to ensure the final model is actually predictive and not just memorizing noise.
1. **Data Collection:** Scraping web data, accessing SQL databases, calling APIs.
2. **Exploratory Data Analysis (EDA):** Finding outliers and graphing distributions.
3. **Feature Engineering:** Modifying raw data into variables the algorithm can process better.
4. **Data Splitting:** Dividing the data into Training and Testing Sets.
5. **Training:** Feeding the Training Set into the algorithm to establish weights.
6. **Evaluation:** Testing the model's predictive power on the hidden dataset.

### Key Points:
*   **The Importance of EDA:** If you are predicting house prices and one house in your dataset is mistakenly listed at $1 instead of $1,000,000, it will permanently skew your model's math. You must graph the data and remove anomalies manually.
*   **Feature Engineering Magic:** Algorithms prefer numbers over text. Feature engineering turns a column like "Birthdate: 1990" into a calculable binary feature like "Is_Millennial: 1".
*   **The Crucial Data Split:** You CANNOT train the model on 100% of your data. You must hide a random 20% of it in a "Test Set". This ensures the model actually learned generalizable patterns, rather than just memorizing the specific answers for the test it was given.

### Examples / Use Cases:

*   **Example 1: The Overfitting Trap:** A student trains a model to predict the stock market using 10 years of data. They test the model on that *same* 10 years of data. The model scores 99% accuracy because it memorized the historical drops. When deployed live tomorrow, the model immediately loses money because it learned to memorize the past, not predict the future.

### Visuals:

[IMAGE: A linear flowchart illustrating the 6 steps of the Data Science Workflow, visually emphasizing the large proportion of time spent on the 'Data Cleaning / EDA' box compared to the 'Model Training' box.]

### Implementation / Hands-On:

*   **Step 1:** Consider a dataset containing 1,000 rows of user data for a fitness app (Weight, Height, Age, Zip Code).
*   **Step 2:** Formulate 3 distinct "Features" you could engineer from this raw data to better predict if a user will cancel their subscription (e.g., combining Weight and Height into a single 'BMI' feature).

### Summary / Key Takeaways:

*   Data preparation is the most critical and time-consuming phase of ML.
*   Feature engineering dramatically improves an algorithm's ability to "see" patterns.
*   Test data must always be sequestered from Training data to prevent overfitting.

### Optional Exercises / Prompts:

*   **Exercise 1:** Write a paragraph explaining the concept of "Overfitting" in machine learning, using an analogy involving a high school student memorizing the exact answers to a practice test instead of studying the underlying subject.
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
# MODULE 2 — Supervised Learning
**Learning Objectives:**
* Differentiate between Regression and Classification tasks.
* Understand the mathematical intuition behind Linear modeling and Gradient Descent.
* Explain how Decision Trees utilize binary splits to categorize data.

---

## Lesson 1 — Linear Regression (Predicting Numbers)

### Definition / Explanation:

**Point 1: Supervised Learning Fundamentals**
Supervised Learning means teaching the AI by explicit example. You provide the algorithm with both the input features (e.g., house square footage) AND the target label (e.g., house sale price). 

**Point 2: Linear Regression**
The most foundational ML algorithm in existence. It aims to draw a straight "line of best fit" through a scatterplot of historical data points in order to predict future data points.
*   **The Equation:** \`y = mx + b\` (Where 'y' is the prediction, 'x' is the feature, 'm' is the learned weight/slope, and 'b' is the learned bias/intercept).
*   **Use Case:** Regression algorithms are used exclusively for predicting continuous numerical values (prices, temperatures, stock values).

### Key Points:
*   **The Error/Cost Function:** When the model draws its first random line, it calculates the distance from that line to all the actual data points. This total distance is the "Error".
*   **Gradient Descent:** How does the computer learn the *correct* line? It uses a calculus calculus algorithm called Gradient Descent. It takes a mathematical "step" downhill, automatically adjusting the \`m\` and \`b\` variables slightly, and recalculates the Error. 
*   **Convergence:** It repeats this step thousands of times iteratively until the Error hits rock bottom. The model has "converged" on the line of best fit.

### Examples / Use Cases:

*   **Example 1: Startup Valuation:** An investor plots the "Monthly Recurring Revenue" (X-axis) against the "Final Valuation" (Y-axis) of 500 SaaS companies. After running Linear Regression, they can input a brand new company's MRR and reliably predict its valuation on the line.

### Visuals:

[IMAGE: A standard X/Y scatterplot showing dozens of blue dots (data points) with a single red line drawn precisely through the middle of the cluster representing the Linear Regression model.]

[IMAGE: A 3D bowl-shaped graph demonstrating Gradient Descent, with a ball starting at the high rim (High Error) slowly rolling in steps down to the center bottom (Minimum Error).]

### Implementation / Hands-On:

*   **Step 1:** Open a blank Excel or Google Sheets document.
*   **Step 2:** In Column A, put numbers 1 through 10. In Column B, put numbers that roughly multiply A by 3 (e.g., 3.1, 5.9, 9.2, 12.1).
*   **Step 3:** Highlight the data, insert a Scatter Chart, and check the box to add a "Trendline". You have just visually executed a Linear Regression model.

### Summary / Key Takeaways:

*   Regression models predict continuous numerical quantities.
*   Linear Regression finds the straight line of best fit through data.
*   Gradient Descent is the universal optimization engine that lowers the Error rate iteratively.

### Optional Exercises / Prompts:

*   **Exercise 1:** If a linear regression equation for predicting salary based on Years of Experience is \`Salary = (5000 * Years) + 40000\`, calculate the predicted salary for someone with exactly 0 years of experience, and someone with 5 years.
          `
        },
        { 
          id: "c2-m2-l2",
          title: "Classification (Predicting Categories)", 
          duration: "28 min",
          type: "reading",
          content: `
## Lesson 2 — Classification (Predicting Categories)

### Definition / Explanation:

**Point 1: The Classification Problem**
If you want to predict a discrete category ("Spam" vs "Not Spam", "Cat" vs "Dog"), drawing a straight regression line through the data doesn't work mathematically because you cannot draw a line to infinity between two distinct categories.

**Point 2: Logistic Regression (The Sigmoid Curve)**
Despite the word "regression" in its name, Logistic Regression is the baseline *classification* algorithm. It takes a straight linear line and mathematically bends it into an S-curve (the Sigmoid function).
This curve ensures that all predictions fall strictly on a Y-axis between 0.0 and 1.0. 
*   If the output is 0.82, it represents an 82% probability the email is Spam.

### Key Points:
*   **Decision Trees:** A non-linear classification model that acts like a massive game of 20 Questions.
    *   *Node 1:* "Does the email contain the word 'Lottery'?" -> If Yes, branch right.
    *   *Node 2:* "Is the sender in the user's contacts list?" -> If No, branch right.
    *   *Leaf Node:* End of the chain. 95% probability of Spam.
*   **Random Forests:** A single Decision Tree is prone to bias and overfitting (memorizing the exact emails). A Random Forest solves this by creating 1,000 slightly different, randomized decision trees and having them "vote" on the final answer, relying on the "Wisdom of the Crowds."

### Examples / Use Cases:

*   **Example 1: Medical Diagnostics:** A hospital uses a Random Forest classifier. Features include Blood Pressure, Age, and Blood Sugar. The model outputs the probability of a patient having a specific disease (Category 1) or being healthy (Category 0).

### Visuals:

[IMAGE: A graph showing the S-shaped Logistic Regression curve, demonstrating how X-axis values push the prediction up toward 1 (True) or down toward 0 (False).]

[IMAGE: A flowchart representing a Decision Tree splitting data at various nodes based on logical conditions until reaching the final color-coded leaf nodes.]

### Implementation / Hands-On:

*   **Step 1:** Think of a simple binary classification problem (e.g., Should I bring an umbrella today? Yes/No).
*   **Step 2:** Draw a literal Decision Tree on paper with three layers of depth, using conditions like "Is it cloudy?", "Is the humidity > 80%?", "Is the forecast over 50%?".

### Summary / Key Takeaways:

*   Classification models predict distinct categories, not continuous numbers.
*   Logistic Regression outputs a probability score between 0 and 1.
*   Ensemble models like Random Forests combine many weak models into one highly accurate, unbiased predictor.

### Optional Exercises / Prompts:

*   **Exercise 1:** Write a paragraph comparing Logistic Regression and Random Forests, explaining why a bank might prefer a Random Forest to flag fraudulent credit card transactions.
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
# MODULE 3 — Unsupervised & Reinforcement
**Learning Objectives:**
* Implement clustering algorithms on unlabelled datasets.
* Differentiate supervised labeling from unsupervised feature grouping.
* Understand the core feedback loop of Reinforcement Learning agents.

---

## Lesson 1 — K-Means Clustering

### Definition / Explanation:

**Point 1: The Unlabelled Dilemma**
What if you have a massive enterprise database containing 5 million users, but none of the data has Labels? You don't know what the correct "Answer" is, because you don't even know what you are looking for. You cannot use Supervised Learning. You must use **Unsupervised Learning**.

**Point 2: K-Means Clustering (Grouping the Unknown)**
K-Means is the premier unsupervised algorithm for segmentation. Imagine you want to segment your users into distinct marketing factions, but you have no idea what those factions should be.
1. You tell the algorithm to find a specific number of clusters (**K=3**).
2. The algorithm randomly plots all millions of users on a massive, multi-dimensional graph based on their features (Age, Spend, Login Time, Clicks).
3. It recursively calculates distances, grouping the closest data points together into 3 distinct mathematical spheres.

### Key Points:
*   **The Centroid:** The exact mathematical center of a cluster. K-Means works by repeatedly moving the centroid until all data points in its sphere are as tightly packed together as possible.
*   **The Human Element:** The algorithm does not label the groups. It will hand you 3 distinct spheres of users. It is entirely up to the human Data Scientist to look at the traits of Group A and realize, "Ah, everyone in this cluster is over 50 and mostly buys on weekends. Let's call them the 'Senior Weekend Shoppers'."
*   **Choosing 'K':** Data Scientists use techniques like the "Elbow Method" to mathematically determine if the data naturally wants to be split into 3, 5, or 10 clusters.

### Examples / Use Cases:

*   **Example 1: The Recommendation Engine Pre-Step:** Netflix uses clustering to group thousands of diverse movies into micro-genres. You aren't just in the "Comedy" cluster; you are in the "Witty 90s Workplace Sitcom" cluster.
*   **Example 2: Anomaly Detection:** Credit card companies cluster typical spending behavior. If a transaction falls radically far away from the centroid of your normal cluster, it is immediately flagged as a potential anomaly.

### Visuals:

[IMAGE: A 2D scatterplot showing a disorganized cloud of grey dots. In the next frame, the K-Means algorithm has drawn circles around three distinct groupings, coloring them red, blue, and green.]

### Implementation / Hands-On:

*   **Step 1:** Look at the clothes currently in your closet.
*   **Step 2:** If you had to define exactly \`K=4\` clusters to group every piece of clothing into perfectly, what would the defining features (the axes) of those clusters be? (e.g., Formality vs Seasonality).

### Summary / Key Takeaways:

*   Unsupervised learning discovers hidden patterns in data that lacks human labels.
*   K-Means relies on measuring physical distance between data points in mathematical space.
*   The human operator must define the number of clusters (K) and interpret what the final groups represent.

### Optional Exercises / Prompts:

*   **Exercise 1:** Act as a Data Scientist for a grocery store. The marketing team ran K-Means with K=2 on their loyalty card holders. Group 1 buys mostly diapers, formula, and coffee. Group 2 buys mostly single-serving meals, craft beer, and protein powder. Write a 2-sentence memo assigning business-friendly labels to these two clusters.
          `
        },
        {
          id: "c2-m3-l2",
          title: "Reinforcement Learning Overview",
          duration: "26 min",
          type: "reading",
          content: `
## Lesson 2 — Reinforcement Learning Overview

### Definition / Explanation:

**Point 1: Learning By Doing**
Reinforcement Learning (RL) is a wildly different paradigm from predicting numbers or clustering data. It is how we train AI to play chess, drive autonomous cars, or beat video games. There is no static dataset. 

**Point 2: The Agent and The Environment**
In RL, you place an **Agent** (the AI program) into an **Environment** (a chess board, a virtual highway, a maze).
1. The Agent perceives the current State of the environment.
2. The Agent takes a random **Action** (move a pawn, steer left).
3. If the action leads closer to a defined goal, it receives a **Reward** (+1 point).
4. If the action leads to failure, it receives a **Penalty** (-1 point).

### Key Points:
*   **The Policy:** Over millions of simulated iterations, the Agent updates its internal rulebook (the *Policy*). The Policy's sole objective is to mathematically maximize the total reward score over time.
*   **Exploration vs. Exploitation:** The core dilemma in RL. Does the Agent *Exploit* the safe moves it already knows will guarantee a small reward, or does it *Explore* random, risky new moves that might discover massive new rewards?
*   **Simulated Time:** RL requires environments that can be simulated faster than real-time. This is why AI easily masters video games (playing millions of matches per hour) but struggles vastly more with real-world robotics where physical time is a constraint.

### Examples / Use Cases:

*   **Example 1: AlphaGo:** In 2016, DeepMind's AlphaGo defeated the world champion at the 3,000-year-old board game Go. It learned not by studying human games, but primarily by playing millions of matches against itself using Reinforcement Learning, discovering strategies humans had never conceived.
*   **Example 2: Data Center Cooling:** Google uses RL to manage the cooling systems in their server farms. The Agent's action is adjusting the AC dials; its Reward is defined as lowering the electric bill while keeping servers under a specific temperature.

### Visuals:

[IMAGE: A conceptual loop diagram. Agent -> (Takes Action in) -> Environment -> (Generates new State and Reward) -> Agent.]

### Implementation / Hands-On:

*   **Step 1:** Consider the game of Pac-Man.
*   **Step 2:** Define what the Agent is. Define what the Environment is.
*   **Step 3:** Explicitly define the Reward function (what gives +1, what gives +10, what gives -100).

### Summary / Key Takeaways:

*   Reinforcement Learning relies on taking actions in environments to maximize reward signals.
*   It operates largely through trial, error, and simulating millions of scenarios.
*   Balancing safe execution (Exploitation) against discovering new tactics (Exploration) is critical to a successful RL policy.

### Optional Exercises / Prompts:

*   **Exercise 1:** You are designing an RL agent to learn how to parallel park a car. Outline the specific Penalties you would assign to ensure the agent doesn't simply maximize its score by parking crookedly to save time.
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
