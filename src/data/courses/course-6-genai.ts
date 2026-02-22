import { Course } from "../course-types";

export const course6: Course = {
  id: 6,
  title: "Generative AI: Text, Image, Audio, and Video",
  description: "Master generative AI across all modalities - create text, images, audio, and video with AI.",
  longDescription: "Explore the full spectrum of generative AI. Learn to create compelling content across text, images, audio, and video formats. Master the underlying theories of Diffusion and GANs, and dive into practical workflows using Midjourney, Stable Diffusion, ElevenLabs, and Sora. Perfect for both technical builders and creative innovators.",
  progress: 0,
  lessons: 30,
  completedLessons: 0,
  duration: "11 hours",
  category: "Creative",
  prerequisites: ["LLM Deep Dive"],
  learningOutcomes: [
    "Understand the technical distinction between GANs, VAEs, and Diffusion models",
    "Master prompt engineering for Midjourney and DALL-E 3",
    "Use Stable Diffusion and ControlNet for precise, compositional image generation",
    "Synthesize hyper-realistic audio and generative video (Sora/Runway)"
  ],
  modules: [
    {
      title: "Module 1: Generative AI Foundations",
      lessons: [
        { 
          id: "c6-m1-l1",
          title: "Introduction to Generative AI", 
          duration: "22 min",
          type: "reading",
          content: `
# MODULE 1 — Generative AI Foundations
**Learning Objectives:**
* Clearly distinguish between Analytical (Discriminative) AI and Generative AI.
* Understand the core historical architectures: GANs, VAEs, and Diffusion.
* Explore how latent spaces are utilized to compress and decompress meaning.

---

## Lesson 1 — Introduction to Generative AI

### Definition / Explanation:

**Point 1: The New Paradigm of Creation**
Traditional Machine Learning (often called Discriminative or Analytical AI) is designed to recognize patterns, classify data, or predict numbers. It asks: "Is there a cat in this image?" or "What is the probability of this stock rising?". 
**Generative AI**, conversely, is a system designed to *create completely new data* that didn't previously exist in the real world. It responds to: "Generate a completely new, photorealistic picture of a cat riding a skateboard in a cyberpunk city."

**Point 2: The Core Architectures**
The explosion in GenAI capabilities over the last few years is driven primarily by three distinct mathematical model architectures: GANs, VAEs, and Diffusion.

### Key Points:
*   **Generative Adversarial Networks (GANs):** Popularized around 2014. GANs pit two neural networks against each other in a zero-sum game. The *Generator* tries to create a fake image (like a human face) from noise. The *Discriminator* tries to guess if it's real or fake. They train each other competitively until the Generator produces fakes indistinguishable from reality.
*   **Variational Autoencoders (VAEs):** These models compress complex high-dimensional data (like a 4K image) down to its core mathematical representation (a "latent space" vector) and then use a decoder to decompress it back, learning the underlying structure of the data along the way.
*   **Diffusion Models:** The modern state-of-the-art for high-fidelity visual media (powering Midjourney, DALL-E, Sora). They learn to iteratively remove static noise to reveal an image based on text conditioning.

### Examples / Use Cases:

*   **Example 1: The 'This Person Does Not Exist' Era:** Early GAN applications that generated hyper-realistic but entirely hallucinated human faces for use as avatars or stock photography.
*   **Example 2: The Diffusion Era:** Prompting an AI to generate a highly stylized, structurally impossible architectural render for a video game concept art pitch.

### Visuals:

[IMAGE: A comparative diagram showing an Analytical AI (input -> classification output) versus a Generative AI (noise/prompt input -> completely new image output).]

[IMAGE: An illustration of a GAN architecture demonstrating the Generator and Discriminator fighting in a looping training cycle.]

### Implementation / Hands-On:

*   **Step 1:** Visit the historical website 'thispersondoesnotexist.com' and refresh the page to see GANs at work.
*   **Step 2:** Look closely at the edges of the generated faces (especially hair, ears, and background) to spot the telltale "smudges" that indicate AI generation.

### Summary / Key Takeaways:

*   Generative AI creates net-new data distributions, rather than simply analyzing existing data.
*   GANs were the early pioneers of realistic image generation.
*   Diffusion models have largely superseded GANs for commercial image and video generation due to their superior text-conditioning and stability.

### Optional Exercises / Prompts:

*   **Exercise 1:** Use ChatGPT or Claude to explain the difference between a GAN and a Diffusion model using an analogy a 5-year-old would understand.
          `
        },
        { 
          id: "c6-m1-l2",
          title: "Diffusion Models Explained", 
          duration: "28 min",
          type: "reading",
          content: `
## Lesson 2 — Diffusion Models Explained

### Definition / Explanation:

**Point 1: The Thermodynamical Inspiration**
How can a computer turn a sentence into a photograph? It uses a mathematical process inspired by physics called **Diffusion**. The fundamental concept is destroying an image completely, and then training a neural network to systematically un-destroy it.

**Point 2: The Two-Step Process**
1. **The Forward Process (Adding Noise):** Imagine taking a high-definition photograph of a golden retriever. The model algorithmically adds Gaussian noise (pure TV static) to the image over hundreds of tiny steps. Step 1: slightly grainy. Step 1000: pure static with zero recognizable features. The model maps how this destruction occurs.
2. **The Reverse Process (Denoising):** The AI operates as a "denoising engine" (typically utilizing a U-Net architecture). It looks at pure static and predicts: *"What did the noise that was just added one step ago look like?"* By subtracting that predicted static over and over, thousands of times, the model learns how to construct images out of emptiness.

### Key Points:
*   **Text Conditioning (CFG):** To force the AI to draw a specific thing (like a dog), we use *Conditioning*. During the training process, when the model subtracts noise, it is also fed the text description of the image. The model learns that removing noise in a certain spatial pattern equates to "dog", while a different pattern equates to "neon lights." 
*   **Latent Space:** Modern stable diffusion doesn't operate on massive pixel arrays (which requires absurd VRAM). It operates in a highly compressed *Latent Space*, performing the diffusion math on a tiny matrix before decoding it back into full pixels.
*   **Classifier-Free Guidance (CFG) Scale:** A parameter utilized to tell the diffusion model how strictly it should follow your text prompt versus how much creative liberty it should take to make the image simply "look good."

### Examples / Use Cases:

*   **Example 1: The Generation Pipeline:** You prompt "A dog in neon lights." You hand the model pure static. Based on its conditioned weights, it begins denoising the pixels according to the mathematical patterns it learned for "dog" and "neon."
*   **Example 2: Inpainting:** Masking out a specific portion of an existing photograph (like a plain t-shirt) and telling the diffusion model to add noise only to that masked area, then denoise it into a "plaid jacket."

### Visuals:

[IMAGE: A series of 5 panels demonstrating the Forward Diffusion process: Panel 1 shows a clear photo, progressively getting noisier until Panel 5 is pure static.]

[IMAGE: A U-Net architecture diagram showing the Latent Space compression process in Stable Diffusion.]

### Implementation / Hands-On:

*   **Step 1:** Open a free image generation tool (like DALL-E, Bing Image Creator, or Midjourney).
*   **Step 2:** Request an image. Observe how the image often starts as a blurry/noisy mess and "resolves" into sharpness. You are witnessing the reverse diffusion (denoising) steps occurring.

### Summary / Key Takeaways:

*   Diffusion models work by learning to remove mathematical noise from a canvas.
*   Text conditioning "steers" the denoising process toward specific contextual shapes.
*   Operating in Latent space makes these massive models efficient enough to run on consumer graphics cards.

### Optional Exercises / Prompts:

*   **Exercise 1:** Write out a step-by-step pseudo-code explanation of how a U-Net denoises an image tensor across 50 steps.
          `
        },
        {
          id: "c6-m1-l3",
          title: "Quiz: Foundations",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "Which model type is currently considered the state-of-the-art for commercial image generation platforms like Midjourney and DALL-E?",
              options: ["Generative Adversarial Networks (GANs)", "Diffusion Models", "Variational Autoencoders (VAEs)", "Long Short-Term Memory Networks (LSTMs)"],
              correctAnswer: "B",
              explanation: "Diffusion Models have largely surpassed GANs due to their superior image fidelity, stability in training, and ability to handle extreme text-conditioning diversity."
            },
            {
              id: "q2",
              text: "In the context of Diffusion models, what does the 'Forward Process' do?",
              options: ["It generates the final image", "It successively adds Gaussian noise to training data until it is completely unrecognizable", "It reads the text prompt and understands it", "It compresses the image to save space"],
              correctAnswer: "B",
              explanation: "The forward process corrupts training data with noise so the model can learn to reverse the process (denoise) later."
            }
          ]
        }
      ]
    },
    {
      title: "Module 2: Image Generation",
      lessons: [
        { 
          id: "c6-m2-l1",
          title: "Midjourney Mastery", 
          duration: "30 min",
          type: "reading",
          content: `
# MODULE 2 — Image Generation
**Learning Objectives:**
* Structure advanced text prompts for Midjourney using parameter flags.
* Deploy Stable Diffusion locally for ultimate, uncensored control.
* Implement ControlNet to solve the problem of compositional control and forced posing.

---

## Lesson 1 — Midjourney Mastery

### Definition / Explanation:

**Point 1: The Artistic Preference Engine**
Midjourney (frequently accessed via Discord, though expanding to web interfaces) is widely considered the highest-quality generative image model. Unlike DALL-E 3, which strictly adheres to literal prompt phrasing but acts somewhat sterile, Midjourney has a highly distinct, deeply aesthetic "house style." It favors artistic interpretation, making it the favorite for creatives, concept artists, and photographers.

**Point 2: The Anatomy of a Perfect Prompt**
A great Midjourney prompt isn't just a standard sentence; it is a structured, grammatical query. A highly effective format is: \`[Subject] + [Environment/Setting] + [Style/Medium] + [Lighting/Colors] + [Parameters]\`.

### Key Points:
*   **Subject & Environment:** "A cybernetic geisha drinking tea in a neon-lit alleyway in Neo-Tokyo."
*   **Medium & Medium:** "Cinematic photography, shot on 35mm lens, Kodachrome film stock."
*   **Lighting:** "Volumetric fog, dramatic rim lighting, vibrant magenta and cyan color grading."
*   **Parameters (Flags):** You attach mathematical flags to the very end of your prompt starting with \`--\` to override default engine behaviors.

### Examples / Use Cases:

*   **Example 1: Parameter Tuning:** \`--ar 16:9\` (Forces Aspect Ratio to Widescreen. Default is 1:1 square).
*   **Example 2: Stylize Scale:** \`--stylize 250\` (Range 0-1000. Dictates how strictly the AI applies its default artistic flair. Higher values are prettier but less faithful to the literal words you prompted).
*   **Example 3: Chaos and Versioning:** \`--chaos 50\` (Range 0-100. Determines how distinctly different the 4 generated grid images will be from one another). \`--v 6.0\` (Forces the model to use the cutting-edge Version 6 architecture, capable of rendering literal text inside the image).

### Visuals:

[IMAGE: A visually stunning grid of 4 Midjourney generations demonstrating 'Cinematic 35mm Photography' styling alongside the exact text prompt used to generate them.]

### Implementation / Hands-On:

*   **Step 1:** Formulate a robust prompt using the exact \`Subject + Environment + Style + Lighting\` framework.
*   **Step 2:** Ensure you append \`--ar 16:9\` and \`--v 6.0\` to the end of the prompt.
*   **Step 3:** Pass this prompt into Midjourney (or a free alternative like Bing Image Creator if Midjourney is unavailable) to analyze the output.

### Summary / Key Takeaways:

*   Midjourney excels at stylistic beauty and requires structured phrasing to reach its full potential.
*   Treat prompts like camera instructions (specifying film stocks, lens sizes, and lighting setups) for hyper-realistic renders.
*   Parameters (\`--ar\`, \`--stylize\`, \`--v\`) are essential tools for commanding the rendering engine layout.

### Optional Exercises / Prompts:

*   **Exercise 1:** Take a generic prompt: "Make a picture of a car." Rewrite it using the full anatomical framework to describe a 1960s Mustang participating in a rainy cyberpunk street race using cinematic lighting cues.
          `
        },
        { 
          id: "c6-m2-l2",
          title: "Stable Diffusion & ControlNet", 
          duration: "28 min",
          type: "reading",
          content: `
## Lesson 2 — Stable Diffusion & ControlNet

### Definition / Explanation:

**Point 1: The Open Source King**
Unlike Midjourney or DALL-E 3 (which are closed-source SaaS products running on private server farms), **Stable Diffusion (SD)** is entirely open-source. Anyone with a sufficiently powerful GPU (typically 8GB+ VRAM) can download the model weights and run it locally on their machine, entirely uncensored, free, and completely offline.

**Point 2: Solving the Composition Problem with ControlNet**
The single biggest problem with foundational Generative AI art is *control*. If an art director wants a character specifically holding their left hand up at a precise 45-degree angle pointing at a moon while crouched, attempting to achieve this through text-prompting alone is a game of slot-machine random chance. 

**ControlNet** is a revolutionary neural network extension that bolts onto Stable Diffusion, forcing the diffusion engine to structurally respect spatial inputs.

### Key Points:
*   **The UI (AUTOMATIC1111 vs ComfyUI):** To run SD, you use community-built interfaces. AUTOMATIC1111 is a robust, traditional web UI. ComfyUI is a highly advanced, node-based visual editor allowing granular routing of the diffusion pipeline.
*   **OpenPose (Skeletal Control):** A ControlNet mode where you input an image of a stick figure skeleton (or extract one from a reference photo). ControlNet forces the AI to draw the new human in that exact anatomical pose.
*   **Canny / Lineart (Edge Control):** You input a rough MS Paint doodle or a pencil sketch. ControlNet locks onto the edge outlines to structure and constrain the final photorealistic image generation.
*   **Depth Maps:** Uses grayscale Z-depth maps to explicitly instruct the AI about which objects reside in the foreground versus the background, ensuring perfect planar perspective.

### Examples / Use Cases:

*   **Example 1: Consistent Characters:** A comic book artist needs the same character in 50 different action poses. They use OpenPose to provide the structural skeleton for every panel, while using the same text prompt to color the resulting images.
*   **Example 2: Architectural Rendering:** An interior designer takes a crude 3D wireframe export of a living room from SketchUp, feeds it through the ControlNet 'MLSD' (straight line detector) model, and prompts for "A photorealistic modern Scandinavian living room." The AI generates the realistic textures while perfectly preserving the architect's room dimensions.

### Visuals:

[IMAGE: A three-panel demonstration of ControlNet OpenPose. Left: A source photograph of a man dancing. Middle: The extracted blue/red/green stick figure skeleton. Right: The AI generated output of an astronaut dancing in exactly the same pose.]

[IMAGE: A screenshot of ComfyUI showing a complex node-based diagram routing a text prompt and an image into a K-Sampler block.]

### Implementation / Hands-On:

*   **Step 1:** Search for "ControlNet Canny Edge demonstration" videos to see how rough sketches are turned into masterpieces in real-time.
*   **Step 2:** Explore the model repository *CivitAI*, the primary hub for downloading open-source Stable Diffusion checkpoints, LoRAs (mini-style models), and ControlNet weights.

### Summary / Key Takeaways:

*   Stable Diffusion offers ultimate workflow freedom, privacy, and modularity at the cost of technical complexity.
*   The transition from "AI Prompter" to "AI Artist" requires moving beyond text slots and utilizing structural spatial controls.
*   ControlNet is mandatory for professional compositional workflows requiring exact poses or perspectives.

### Optional Exercises / Prompts:

*   **Exercise 1:** Identify a workflow in your current physical or digital hobby (e.g., drawing, 3D printing, fashion design) where generating variations of a structural outline using ControlNet could save you hours of drafting.
          `
        }
      ]
    },
    {
      title: "Module 3: Audio & Video",
      lessons: [
        { 
          id: "c6-m3-l1",
          title: "AI Audio & Voice Synthesis", 
          duration: "24 min",
          type: "reading",
          content: `
# MODULE 3 — Audio & Video
**Learning Objectives:**
* Synthesize hyper-realistic, emotive text-to-speech using ElevenLabs.
* Understand the prompting mechanisms for full-fidelity Generative Music.
* Navigate the bleeding edge of Temporal generation (AI Video) and its current physics limitations.

---

## Lesson 1 — AI Audio & Voice Synthesis

### Definition / Explanation:

**Point 1: The End of Robotic TTS**
Text-to-Speech (TTS) historically sounded incredibly robotic (like the original Siri or GPS voices), combining pre-recorded syllables in a jarring manner. Modern Generative Audio utilizes deep learning to understand linguistic context. It analyzes an entire sentence before speaking, adding humanizing micro-elements like breath sounds, emotive pacing, whispers, and appropriate emotional inflections.

**Point 2: Voice Cloning and Generative Music**
Companies like **ElevenLabs** have revolutionized speech synthesis, allowing users to clone voices with shockingly little data. Beyond speech, platforms like **Suno AI** and **Udio** operate as the "Midjourney for Music," generating full-fidelity tracks complete with surprisingly human-sounding vocals, harmonies, and complex instrumentation based entirely on a text prompt.

### Key Points:
*   **Contextual Emotion (ElevenLabs):** You don't just prompt words; you can dictate emotion. Prompting "Wait... is someone there?" will result in a synthesized voice that actually sounds terrified and breathy.
*   **Voice Cloning Mechanics:** By uploading as little as a 3-minute clear, noise-free audio clip of your voice, the AI maps your vocal timber, pitch, and cadence. You can then generate hours of narration for YouTube or audiobooks by simply typing text.
*   **Generative Music Prompting:** Music models require specialized meta-prompts categorizing the BPM (Beats Per Minute), genres, instruments, and vocal styles.

### Examples / Use Cases:

*   **Example 1: Automated Audiobooks:** An indie author uses ElevenLabs to clone their voice, then feeds in their 300-page manuscript to produce a fully narrated audiobook in an afternoon for $50, bypassing thousands of dollars in studio fees.
*   **Example 2: Suno AI Prompting:** Prompting: "A fast-paced 120BPM synthwave track about hacking the mainframe, featuring a female lead vocal with heavy reverb, driving bassline, and an explosive chorus."

### Visuals:

[IMAGE: A screenshot of the ElevenLabs generation interface showing text input alongside voice setting sliders for Stability, Similarity, and Style Exaggeration.]

### Implementation / Hands-On:

*   **Step 1:** Go to the ElevenLabs free tier website.
*   **Step 2:** Type a highly emotional paragraph of text (an angry rant, or a terrified whisper).
*   **Step 3:** Select an AI voice and hit generate to observe how the neural network interprets the emotional context inherently present in the grammar.

### Summary / Key Takeaways:

*   Modern AI audio synthesis maps deep linguistic context, not just phonic sounds, creating emotionally resonant speech.
*   Voice cloning requires incredibly small datasets (minutes) to create highly accurate vocal doppelgangers.
*   Generative Music has reached production quality, combining complex instrumentation and coherent vocals from pure text.

### Optional Exercises / Prompts:

*   **Exercise 1:** Write a 4-line lyrical stanza. Boot up Suno AI or Udio, categorize the genre as 'Opera' or 'Heavy Metal', input your lyrics, and evaluate the musicality of the AI's composition.
          `
        },
        { 
          id: "c6-m3-l2",
          title: "AI Video: The Temporal Frontier", 
          duration: "26 min",
          type: "reading",
          content: `
## Lesson 2 — AI Video: The Temporal Frontier

### Definition / Explanation:

**Point 1: The Curse of the Fourth Dimension (Time)**
Video generation is exponentially harder than image generation because of the **temporal dimension**. An Image AI simply has to draw a realistic cat once. A Video AI has to draw a realistic cat, and then maintain the exact physical properties, lighting calculations, and shape of that specific cat consistently across 60 frames per second as it moves through a 3D space.

**Point 2: Key Players in Generative Video**
The video space is currently the bleeding edge of GenAI research.
*   **OpenAI Sora:** Shocked the world with its ability to generate 60-second, high-definition videos with relatively stable physics emulation, reflections, and complex cinematic camera movements based purely on text.
*   **Runway (Gen-3 Alpha) & Luma Dream Machine:** Leading publicly accessible tools. They excel in Image-to-Video workflows (e.g., uploading a Midjourney image and commanding the AI to animate the crashing waves and moving clouds, bringing the image to life).

### Key Points:
*   **Temporal Consistency:** The AI's greatest struggle. This refers to the object permanence. Does the character's jacket stay the same color in second 5 as it was in second 1?
*   **Morphing and Flickering:** The most common hallucination in AI video. Background objects often mysteriously change shape, merge into other objects, or completely disappear when the camera pans rapidly in generated footage.
*   **Physics Hallucinations:** AI does not currently use an underlying 3D physics engine (like Unreal Engine). It is guessing pixels. Therefore, generating a person taking a realistic bite out of an apple and consistently tracking the shape of that missing bite-mark is incredibly difficult for the model.

### Examples / Use Cases:

*   **Example 1: The B-Roll Revolution:** A documentary filmmaker needs a specific 4-second establishing shot of a drone flying through a neon-lit alleyway in the rain. Instead of hiring a VFX firm or hunting through expensive stock footage sites, they generate the exact 4-second clip via Runway.
*   **Example 2: Image-to-Video Animation:** Taking a static graphic novel panel (an illustration), masking the character's cape and the background sky, and commanding a video model to add wind physics to solely those selected elements.

### Visuals:

[IMAGE: A split frame demonstrating a physics hallucination: Frame A shows an AI-generated person holding an intact glass of water. Frame B (2 seconds later) shows the glass morphing seamlessly into the person's hand geometry.]

[IMAGE: A workflow graphic showing: Midjourney Image -> Upscaler -> Runway Image-To-Video Input -> Final Animated MP4 Output.]

### Implementation / Hands-On:

*   **Step 1:** Access a free video generator (like Luma Dream Machine or Kling AI).
*   **Step 2:** Provide an image you generated previously as the starting frame.
*   **Step 3:** Use a prompt to dictate camera movement to the AI (e.g., "Camera pans slowly left and pushes in tight; hair blows gently in the wind").

### Summary / Key Takeaways:

*   Maintaining physical object permanence (temporal consistency) across time is the hardest technical challenge in Generative AI today.
*   Image-to-Video workflows offer far more aesthetic control than pure Text-to-Video workflows.
*   AI video currently excels at short format (3-10 seconds) cinematic b-roll and abstract concepts.

### Optional Exercises / Prompts:

*   **Exercise 1:** Watch an official demo reel for OpenAI Sora. Analyze the footage carefully, specifically looking at the background characters and physics interactions (like footfalls/walking) to spot the subtle AI "morphing" hallucinations.
          `
        },
        {
          id: "c6-m3-l3",
          title: "Quiz: Advanced Media",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "Which Stable Diffusion extension allows users to guarantee specific character poses by feeding in a skeleton framework?",
              options: ["Canny Edge", "LoRA", "OpenPose via ControlNet", "Textual Inversion"],
              correctAnswer: "C",
              explanation: "OpenPose extracts human poses from images and feeds that structural data directly into ControlNet to ensure the AI generates the exact requested pose."
            },
            {
              id: "q2",
              text: "Why is AI video significantly harder to generate than an AI image?",
              options: ["Because videos require audio tracks", "Because the AI has to maintain temporal consistency (object permanence) across thousands of individual frames over time", "Because video files are too large to download", "Because there is no copyright available for videos"],
              correctAnswer: "B",
              explanation: "Temporal consistency is the largest hurdle in GenVideo. The AI struggles to remember exactly what an asset looks like from frame 10 to frame 100 as it moves."
            }
          ]
        }
      ]
    }
  ],
  projects: [
    {
      title: "Capstone: Multimedia Ad Campaign",
      description: "Write a script with an LLM, generate voiceover with ElevenLabs, create assets in Midjourney, animate them with Runway, and compile a fully AI-generated commercial.",
      duration: "8 hours",
      difficulty: "advanced"
    }
  ]
};
