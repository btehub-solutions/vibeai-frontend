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
# What is Generative AI?

Traditional AI (Analytical AI) is designed to recognize patterns and classify data (e.g., "Is there a cat in this image?"). **Generative AI** is designed to *create completely new data* that didn't previously exist (e.g., "Generate a completely new picture of a cat riding a skateboard in a cyberpunk city.").

## The Core Architectures

The explosion in GenAI capabilities over the last few years is driven by three main model architectures:

1.  **Generative Adversarial Networks (GANs):** Popularized around 2014. GANs pit two neural networks against each other. 
    *   The *Generator* tries to create a fake image. 
    *   The *Discriminator* tries to guess if it's real or fake. 
    *   They train each other until the Generator produces hyper-realistic fakes. (Famous for early "This Person Does Not Exist" websites).
2.  **Variational Autoencoders (VAEs):** These models compress data down to its core mathematical representation (latent space) and then try to decompress it back, learning the underlying structure of the data along the way.
3.  **Diffusion Models:** The current state-of-the-art for visual media (Midjourney, DALL-E, Sora).
          `
        },
        { 
          id: "c6-m1-l2",
          title: "Diffusion Models Explained", 
          duration: "28 min",
          type: "reading",
          content: `
# Understanding Diffusion Models

How can a computer turn a sentence into a photograph? It uses a mathematical process called **Diffusion**.

## 1. The Forward Process (Destroying the Image)
Imagine taking a high-definition photograph of a golden retriever.
The model systematically adds Gaussian noise (static) to the image over hundreds of steps. Step 1: slightly grainy. Step 500: heavily distorted. Step 1000: looking at a television tuned to a dead channel (pure static).

## 2. The Reverse Process (Denoising)
The AI is essentially a "denoising" engine. We train a massive neural network (typically a U-Net architecture) to look at a noisy image and predict: *"What did the static that was just added look like?"*
By subtracting that predicted static over and over, the model learns how to construct images out of pure noise.

## Text Conditioning
To make it draw a specific thing (like a dog), we use **conditioning**. Every time the model subtracts noise during training, it is also fed the text description of the image. The model learns that removing noise in a certain spatial pattern corresponds to the word "dog", and another pattern corresponds to "neon lights." 

When you prompt "A dog in neon lights", you hand the model pure static and ask it to denoise it using the patterns it learned for those specific words.
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
# Advanced Image Generation with Midjourney

Midjourney operates exclusively through Discord (though a web interface is emerging). It has a highly distinct, artistic "house style" that makes it the favorite for creatives.

## The Anatomy of a Perfect Prompt

A great Midjourney prompt isn't just a sentence; it's a structured query.
Format: \`[Subject] + [Environment/Setting] + [Style/Medium] + [Lighting/Colors] + [Parameters]\`

*   *Subject:* A cybernetic geisha.
*   *Environment:* Drinking tea in a neon-lit alleyway in Neo-Tokyo.
*   *Medium:* Cinematic photography, shot on 35mm lens.
*   *Lighting:* Volumetric fog, rim lighting, vibrant magenta and cyan.

## Essential Midjourney Parameters (Flags)
You attach these to the end of your prompt starting with \`--\`
*   \`--ar 16:9\` (Aspect Ratio: Widescreen. Default is 1:1 square).
*   \`--stylize 250\` (Range 0-1000. How strictly the AI applies its default artistic flair. Higher = prettier but less accurate to prompt).
*   \`--chaos 50\` (Range 0-100. How distinctly different the 4 generated grid images will be from one another).
*   \`--v 6.0\` (Forces the model to use Version 6, which handles text generation on images incredibly well).
          `
        },
        { 
          id: "c6-m2-l2",
          title: "Stable Diffusion & ControlNet", 
          duration: "28 min",
          type: "reading",
          content: `
# The Open Source King: Stable Diffusion

Unlike Midjourney or DALL-E 3 (which are closed-source SaaS products), **Stable Diffusion (SD)** is entirely open-source. Anyone with a powerful GPU can run it locally on their machine, uncensored and free.

## The UI: AUTOMATIC1111 and ComfyUI
To run SD, you use interfaces. AUTOMATIC1111 is a robust web UI, whilst ComfyUI is a node-based visual editor that allows for incredible granular control over the diffusion pipeline.

## ControlNet: Solving the Composition Problem
The biggest problem with AI art is *control*. If you want a character specifically holding their left hand up at a 45-degree angle pointing at a moon, prompting alone is almost impossible. 

**ControlNet** is a neural network extension that forces the diffusion model to respect structural inputs:
*   **OpenPose:** You input an image of a stick figure skeleton. ControlNet forces the AI to draw a person in that exact pose.
*   **Canny / Lineart:** You input a rough doodle. ControlNet uses the edge outlines to structure the final photorealistic image.
*   **Depth Map:** Uses grayscale maps to tell the AI what objects should be in the foreground vs background.
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
# Generative Audio

## 1. Text-to-Speech (TTS) and Voice Cloning
Companies like **ElevenLabs** have revolutionized speech. Older TTS sounded robotic (like Siri). Modern TTS uses deep learning to understand context, adding breath sounds, emotive pauses, and inflections.
*   *Voice Cloning:* You can upload a 3-minute clear audio clip of your voice, and the AI will clone it perfectly, allowing you to generate hours of narration by just typing text.

## 2. Generative Music
Platforms like **Suno AI** and **Udio** are the "Midjourney for Music".
*   They don't just generate beats; they generate full-fidelity tracks complete with surprisingly human-sounding vocals, harmonies, and complex instrumentation based entirely on a text prompt.
*   *Example Prompt:* "A fast-paced synthwave track about hacking the mainframe, featuring a female lead vocal with heavy reverb."
          `
        },
        { 
          id: "c6-m3-l2",
          title: "AI Video: The Temporal Frontier", 
          duration: "26 min",
          type: "reading",
          content: `
# Generative Video

Video generation is exponentially harder than image generation because of the **temporal dimension (Time)**. An AI doesn't just have to draw a realistic cat; it has to maintain the physical properties of that cat consistently across 60 frames per second as it moves through space.

## Key Players
*   **OpenAI Sora:** Shocked the world with its ability to generate 60-second, high-definition videos with incredible physics emulation and camera movement. 
*   **Runway (Gen-2 / Gen-3 Alpha):** The leading publicly accessible tool. Allows for Text-to-Video and Image-to-Video (uploading a Midjourney image and telling Runway to animate the water and clouds).
*   **Luma Dream Machine & Pika:** Competitors known for rapid rendering speeds and stylized animations.

## Current Limitations
*   *Morphing/Flickering:* Background objects often mysteriously change shape or disappear when the camera pans.
*   *Physics Hallucinations:* Generating a person walking is easy; generating a person taking a bite out of an apple and leaving a physically accurate bite-mark is incredibly difficult for AI to consistently map over time without a localized 3D engine.
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

