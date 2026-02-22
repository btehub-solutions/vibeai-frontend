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
          content: `
# MODULE 1 — Introduction to Artificial Intelligence
**Learning Objectives:**
* Define Artificial Intelligence and distinguish it from basic automation.
* Trace the historical evolution of AI from the Turing Test to modern Deep Learning.
* Differentiate between Narrow, General, and Super AI.

---

## Lesson 1 — What is Artificial Intelligence?

### Definition / Explanation:

**Point 1: Simulating Intelligence**
Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning (the acquisition of information and rules for using the information), reasoning (using rules to reach approximate or definite conclusions), and self-correction.

**Point 2: AI vs. Automation**
It is common to confuse AI with simple automation, but there is a crucial difference:
*   **Automation:** Follows a strict set of pre-defined rules. It does exactly what it is told to do, every single time. It cannot handle unexpected situations gracefully.
*   **AI:** Can dynamically adapt. It can learn from new data and handle situations it hasn't explicitly been programmed for by estimating probabilities.

### Key Points:
*   **Learning:** The ability to improve performance based on experience (data).
*   **Reasoning:** The ability to draw inferences appropriate to the situation.
*   **Perception:** The ability to interpret sensory input (like image recognition or speech-to-text navigation).
*   **The New Electricity:** As Andrew Ng stated, AI is positioned to transform every major industry in the same way electricity did a century ago.

### Examples / Use Cases:

*   **Example 1: The Email Filter:** A basic automation rule says "If sender is Bob, move to folder." An AI spam filter reads millions of emails, learns the subtle nuances of deceptive language, and automatically filters out scam emails without a human ever defining what the scam was.

### Visuals:

[IMAGE: A comparative diagram. Left side shows "Automation" as a rigid, straight gear pathway. Right side shows "AI" as a branching, glowing neural network adapting to different inputs.]

### Implementation / Hands-On:

*   **Step 1:** Look at the software on your smartphone.
*   **Step 2:** Identify three applications that are simply "Automation" (e.g., the standard Calculator app).
*   **Step 3:** Identify three applications that utilize "AI" (e.g., FaceID unlocking, predictive keyboard text, map routing algorithms) and explain why a rigid rule couldn't accomplish them.

### Summary / Key Takeaways:

*   AI simulates human cognitive functions like learning and problem-solving.
*   Unlike automation, AI adapts to novel data without explicit reprogramming.
*   We use AI daily in ways that have become totally invisible to us.

### Optional Exercises / Prompts:

*   **Exercise 1:** Write a short paragraph explaining how a self-driving car represents both "Perception" and "Reasoning."
          `
        },
        { 
          id: "c1-m1-l2",
          title: "The History of AI", 
          duration: "22 min",
          type: "reading",
          content: `
## Lesson 2 — The History of AI

### Definition / Explanation:

**Point 1: The Birth of the Field**
The journey of Artificial Intelligence is a fascinating cycle of massive ambition, technological setbacks, and recent profound breakthroughs. The term "Artificial Intelligence" was formally coined at the Dartmouth Conference in 1956, marking the birth of the field.

**Point 2: The Turing Test**
In 1950, Alan Turing published "Computing Machinery and Intelligence," proposing the famous **Turing Test**—a theoretical benchmark to determine if a machine can exhibit intelligent behavior indistinguishable from a human in text-based conversation.

### Key Points:
*   **The AI Winters (1974-1980, 1987-1993):** Periods where funding and public interest completely dried up due to researchers overpromising capabilities while lacking the necessary hardware compute power.
*   **The Boom (1993-2011):** Marked by highly specific milestone victories: IBM's Deep Blue defeating world chess champion Garry Kasparov (1997) and IBM's Watson winning Jeopardy! (2011).
*   **The Deep Learning Era (2012-Present):** With the explosion of Internet data and the repurposing of graphical GPUs for parallel mathematics, Deep Learning neural networks finally became viable, leading to modern Generative AI like ChatGPT.

### Examples / Use Cases:

*   **Example 1: The ImageNet Milestone:** In 2012, a neural network named AlexNet dominated the ImageNet visual recognition competition, proving decisively that Deep Learning combined with GPU hardware was the future of AI, ending the era of hand-coded feature extraction.

### Visuals:

[IMAGE: A timeline graphic. Key nodes: 1950 (Turing Test) -> 1956 (Dartmouth) -> 1980s (AI Winter) -> 1997 (Deep Blue) -> 2012 (Deep Learning boom) -> 2022 (Generative AI).]

### Implementation / Hands-On:

*   **Step 1:** Search online for an interactive "Turing Test" chatbot (like the Loebner Prize winners or a modern LLM).
*   **Step 2:** Attempt to "break" the bot by asking it highly contextual, nuanced questions that require human common sense (e.g., "If I drop a bowling ball on a feather, what breaks?"). Notice how modern algorithms handle it.

### Summary / Key Takeaways:

*   AI is not a new concept; its foundations date back to the 1950s.
*   Progress was stalled for decades by a lack of computational hardware.
*   Modern GPUs and massive data sets unlocked the current Deep Learning era.

### Optional Exercises / Prompts:

*   **Exercise 1:** Act as a historian. Write a brief explanation as to why an "AI Winter" occurs, and what prevents us from entering another one today.
          `
        },
        { 
          id: "c1-m1-l3",
          title: "Types of AI", 
          duration: "20 min",
          type: "reading",
          content: `
## Lesson 3 — Types of AI

### Definition / Explanation:

**Point 1: The Spectrum of Capability**
We categorize AI primarily by its scope of intellectual capability, separating what actually exists today from what exists purely in theory and science fiction.

**Point 2: Narrow, General, and Super Intelligence**
*   **Artificial Narrow Intelligence (ANI):** AI designed to perform one specific task brilliantly.
*   **Artificial General Intelligence (AGI):** Theoretical AI that possesses the ability to understand, learn, and apply knowledge across any wide variety of tasks, completely on par with a human being.
*   **Artificial Super Intelligence (ASI):** Highly theoretical AI that vastly surpasses human physical and intellectual limits in all aspects (creativity, general wisdom, scientific problem-solving).

### Key Points:
*   **We Only Have ANI:** It is critical to understand that every single AI in existence today—from Siri to the algorithm driving a Tesla, to ChatGPT—is an example of Artificial Narrow Intelligence. They cannot transfer their skills to unrelated domains.
*   **Weak vs. Strong AI:** 'Weak' AI essentially simulates thinking (it acts *as if* it thinks, but is just math). 'Strong' AI implies the machine actually possesses a mind, consciousness, and subjective experience (currently theoretical).

### Examples / Use Cases:

*   **Example 1: The Limits of ANI:** An AI trained exclusively to detect tumors in MRI scans might be 20% more accurate than the world's best doctors. But if you ask that exact same cutting-edge AI to play a game of tic-tac-toe, it will crash immediately, because it is hyper-narrow.

### Visuals:

[IMAGE: A concentric circle diagram. The innermost, smallest circle is ANI (Current Reality). The middle circle is AGI (Human-level). The massive outer circle is ASI (Super-intelligence).]

### Implementation / Hands-On:

*   **Step 1:** Define the core task of Netflix's recommendation engine.
*   **Step 2:** Define the core task of Boston Dynamics' balancing robots.
*   **Step 3:** Explain why neither of these highly advanced systems qualifies as AGI.

### Summary / Key Takeaways:

*   All modern AI systems are 'Narrow' (ANI), regardless of how impressive they seem.
*   AGI represents the benchmark of achieving broad, human-level contextual reasoning across multiple disciplines.
*   ASI is an intelligence explosion beyond human comprehension.

### Optional Exercises / Prompts:

*   **Exercise 1:** If a developer claims they have built an AGI system, list three incredibly diverse tasks you would demand it perform to prove its 'General' intelligence.
          `
        },
        { 
          id: "c1-m1-l4",
          title: "Quiz: Module 1 Knowledge Check", 
          duration: "15 min",
          type: "quiz",
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
            }
          ]
        }
      ]
    },
    {
      title: "Module 2: AI Applications",
      lessons: [
        { 
          id: "c1-m2-l1",
          title: "AI in Healthcare and Finance", 
          duration: "20 min",
          type: "reading",
          content: `
# MODULE 2 — AI Applications
**Learning Objectives:**
* Identify specific, high-impact AI use cases in the Healthcare sector.
* Understand how algorithmic trading and anomaly detection power modern Finance.
* Analyze the hidden AI mechanics driving E-commerce engagement.

---

## Lesson 1 — AI in Healthcare and Finance

### Definition / Explanation:

**Point 1: The Healthcare Revolution**
Healthcare is perhaps the most critical field for AI application, shifting medicine from reactive treatments to proactive, data-driven prevention. AI handles vast amounts of unstructured data (Doctor's notes, 3D body scans, genetic sequences) that humans cannot process manually at scale.

**Point 2: The Financial Nerve Center**
The finance sector was the earliest massive adopter of AI, relying heavily on its ability to process mathematical probabilities and spot anomalies in data streams at nanosecond speeds.

### Key Points:
*   **Medical Imaging (Healthcare):** Deep learning algorithms analyze X-rays and MRIs to detect micro-tumors or lung anomalies months before a human radiologist could spot them.
*   **Drug Discovery (Healthcare):** Platforms like AlphaFold simulate millions of molecular and protein interactions computationally, shrinking the time it takes to discover viable new drugs from 10 years to a few months.
*   **Fraud Detection (Finance):** Anomalous spending detection. If a card normally buys coffee in New York and suddenly buys 10 laptops in another country, the AI flags the statistical behavioral deviation instantly.
*   **Algorithmic Trading (Finance):** Quantitative agents execute massive stock trades at speeds impossible for humans, analyzing thousands of data points (news sentiment, weather, minor price fluctuations) simultaneously.

### Examples / Use Cases:

*   **Example 1: Personalized Medicine:** An AI system cross-references a specific patient's sequenced DNA against millions of medical journals to recommend a highly personalized cancer treatment plan, rather than a generic chemotherapy approach.

### Visuals:

[IMAGE: A dual-panel dashboard. Left panel shows an AI bounding box successfully identifying an anomaly in a chest X-Ray. Right panel shows a financial graph with a massive red 'Anomaly Detected' spike indicating a fraudulent transaction block.]

### Implementation / Hands-On:

*   **Step 1:** Investigate your own banking app.
*   **Step 2:** Find the "Spending Insights" or "Categorization" feature (where it automatically knows a purchase was 'Dining' or 'Travel'). Recognize that this is a classification algorithm at work.

### Summary / Key Takeaways:

*   AI in healthcare drastically increases diagnostic accuracy and speed.
*   Financial AI secures the global economy via anomaly detection and predictive risk scoring.
*   Both fields rely heavily on AI's ability to process datasets too large for human comprehension.

### Optional Exercises / Prompts:

*   **Exercise 1:** Write a brief ethical argument regarding AI in Healthcare: If an AI diagnostics tool is 99% accurate, but a human doctor is 95% accurate, who is legally liable when the AI makes that 1% mistake?
          `
        },
        { 
          id: "c1-m2-l2",
          title: "AI in E-commerce", 
          duration: "18 min",
          type: "reading",
          content: `
## Lesson 2 — AI in E-commerce

### Definition / Explanation:

**Point 1: The Invisible Salesperson**
If you have ever bought an item online because a website "suggested" it to you alongside your main purchase, you have been successfully influenced by retail AI. E-commerce platforms use AI to maximize User Lifetime Value.

**Point 2: Dynamic Logistics**
Behind the scenes, AI is the backbone of global supply chains, predicting exactly how much inventory a warehouse needs on any given day based on complex external variables.

### Key Points:
*   **Recommendation Engines:** Algorithms that analyze your past clicks, dwell time, and purchase history, comparing you against millions of similar users to predict what you are statistically most likely to buy next.
*   **Dynamic Pricing:** AI continuously adjusts prices in real-time based on supply, demand, competitor prices, and even the user's perceived willingness to pay (heavily used in airlines and ride-sharing).
*   **Visual Search:** Allowing users to upload a photo of a physical item (like a jacket on the street) and using Computer Vision to instantly map that image to visually similar products in the store's backend catalog.

### Examples / Use Cases:

*   **Example 1: Amazon's Anticipatory Shipping:** Amazon uses predictive AI to essentially forecast that a specific neighborhood will order a high volume of a particular item next week (e.g., snow shovels before a storm). They mathematically route that inventory to the local warehouse *before* anyone even clicks "buy," enabling same-day shipping.

### Visuals:

[IMAGE: A conceptual mockup of a user's screen showing a pair of shoes, with a glowing algorithmic web pointing down to a "Customers also bought" section displaying heavily correlated accessories.]

### Implementation / Hands-On:

*   **Step 1:** Go to Amazon or YouTube.
*   **Step 2:** Look at the front page recommendations. Log out, or open an Incognito window, and go to the same page.
*   **Step 3:** Compare the "Cold Start" generic recommendations against the highly personalized AI-driven recommendations tied to your profile's historical data vector.

### Summary / Key Takeaways:

*   E-commerce relies on AI to personalize the shopping experience at scale.
*   Recommendation engines drive massive percentages of total retail revenue.
*   Predictive AI optimizes the physical supply chain and dynamically adjusts pricing for maximum profit.

### Optional Exercises / Prompts:

*   **Exercise 1:** Act as an E-commerce product manager. Write a scenario explaining how you would combine "Dynamic Pricing" and "Recommendation Engines" to sell excess inventory to a specific demographic quickly.
          `
        }
      ]
    },
    {
      title: "Module 3: Core Concepts",
      lessons: [
        { 
          id: "c1-m3-l1",
          title: "Understanding Data & Machine Learning", 
          duration: "25 min",
          type: "reading",
          content: `
# MODULE 3 — Core Concepts
**Learning Objectives:**
* Differentiate between Structured and Unstructured data.
* Grasp the core definitions of Supervised, Unsupervised, and Reinforcement Learning.
* Understand the absolute dependency of AI algorithms on data quality.

---

## Lesson 1 — Understanding Data & Machine Learning

### Definition / Explanation:

**Point 1: The Fuel of AI**
AI models are merely mathematical engines. Data is the fuel. "Garbage In, Garbage Out" is the ultimate law of AI; if your training data is biased, incomplete, or inaccurate, your resulting AI model will be functionally useless, regardless of how advanced the algorithm is.

**Point 2: Structured vs. Unstructured Data**
*   **Structured Data:** Highly organized tabular data. Fits perfectly into rows and columns (Excel, SQL). Examples: Pricing histories, Zip codes, Age demographics.
*   **Unstructured Data:** Messy, organically generated data. Does not fit into tables. Examples: Photographs, audio recordings, unstructured text documents, raw video files. Modern Deep Learning's greatest achievement is its ability to finally process Unstructured Data.

### Key Points:
*   **Supervised Learning:** The AI is trained on data that has already been labeled by humans. (e.g., Feeding the model pictures tagged explicitly as 'Cat' or 'Dog'). It learns to predict the label for new data.
*   **Unsupervised Learning:** The AI is fed a massive pile of unlabeled data and told to mathematically discover hidden groupings or patterns on its own (e.g., automatically segmenting a customer base into 3 distinct purchasing personas without being told what those personas are).
*   **Reinforcement Learning:** The AI learns via trial and error in a simulated environment. It takes actions, receives a positive "reward" for good actions and a "penalty" for bad actions, eventually learning the optimal strategy (used in robotics and game-playing AI).

### Examples / Use Cases:

*   **Example 1: The Unstructured Breakthrough:** 20 years ago, a bank could easily run an algorithm on numerical credit scores (Structured). Today, a bank can point a Deep Learning Vision model at a scanned, handwritten paper check (Unstructured) and the AI can extract the payee and amount flawlessly.

### Visuals:

[IMAGE: A visual sorting diagram. A pile of diverse raw data at the top. Three paths split down: 1. (Labeled data -> Supervised Learning), 2. (Unlabeled data -> Unsupervised Clustering), 3. (Robot in a maze -> Reinforcement Learning).]

### Implementation / Hands-On:

*   **Step 1:** Look at the files currently on your computer desktop.
*   **Step 2:** Categorize them. Which ones are Structured (spreadsheets, CSVs) and which ones are Unstructured (JPEGs, MP4s, PDFs)? Understand that until recently, AI could only "see" the structured ones.

### Summary / Key Takeaways:

*   Data quality dictates AI quality. 
*   Deep Learning unlocked the ability to process unstructured reality (vision, text, sound).
*   Machine Learning is broadly divided into Supervised (labels), Unsupervised (patterns), and Reinforcement (trial-and-error) paradigms.

### Optional Exercises / Prompts:

*   **Exercise 1:** Write out a hypothetical scenario where you train a robotic vacuum cleaner using Reinforcement Learning. Define exactly what gives it a "Reward" (+1 point) and what gives it a "Penalty" (-1 point) to ensure it cleans the room efficiently without breaking things.
          `
        }
      ]
    }
  ],
  projects: [
    {
      title: "Mini-Project: AI Use Case Analysis",
      description: "Research and present an AI application in an industry of your choice, analyzing its impact, benefits, and challenges.",
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
