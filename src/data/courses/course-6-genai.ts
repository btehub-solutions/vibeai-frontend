import { Course } from "../course-types";

export const course6: Course = {
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
# Generative AI

Generative AI refers to algorithms (such as ChatGPT, Dall-E, Midjourney) that can be used to create new content, including audio, code, images, text, simulations, and videos.

## Core Models

1.  **Likelihood-Based Models**: Learn the distribution of data points.
2.  **Generative Adversarial Networks (GANs)**: Two neural networks contest with each other (Generator vs Discriminator). Good for photorealistic images.
3.  **Variational Autoencoders (VAEs)**: Learn compressed representations of data.
4.  **Diffusion Models**: Learn to remove noise from images. The current state-of-the-art for image generation (Stable Diffusion).
          `
        },
        { 
          id: "c6-m1-l2",
          title: "Diffusion Models Explained", 
          duration: "28 min",
          type: "reading",
          content: `
# Diffusion Models

Diffusion models work by destroying training data through the successive addition of Gaussian noise, and then learning to recover the data by reversing this noise process.

## Forward Process (Corruption)
Take a clean image of a cat. Add a tiny bit of static (noise). Repeat 1,000 times until it is pure random noise.

## Reverse Process (Denoising)
Train a neural network to look at a noisy image and predict the noise that was added. Subtract the predicted noise to get a slightly cleaner image. Repeat until you have a clean image.

This is how Stable Diffusion works.
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
              text: "Which model type is currently the state-of-the-art for image generation (like Midjourney)?",
              options: ["GANs", "Diffusion Models", "VAEs", "Autoregressive Models"],
              correctAnswer: "B",
              explanation: "Diffusion Models (Stable Diffusion, DALL-E 2/3) have surpassed GANs in image quality and diversity."
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
# Midjourney

Midjourney is an independent research lab that produces a proprietary AI program that creates images from textual descriptions.

## Prompting Tips
*   **Be Specific**: Describe subject, medium, style, lighting, color, and composition.
*   **Parameters**:
    *   `--ar 16:9` (Aspect Ratio)
    *   `--v 6.0` (Version)
    *   `--stylize 100` (How much artistic freedom the AI takes)
    *   `--chaos 10` (How varied the initial grids are)

**Example**:
"/imagine prompt: A futuristic city with flying cars, cyberpunk style, neon lights, rainy atmosphere, highly detailed, 8k resolution --ar 16:9"
          `
        },
        { 
          id: "c6-m2-l2",
          title: "Stable Diffusion & ControlNet", 
          duration: "28 min",
          type: "reading",
          content: `
# Stable Diffusion & ControlNet

Stable Diffusion is open-source, meaning you can run it on your own PC.

## ControlNet
ControlNet is a neural network structure to control diffusion models by adding extra conditions.
It allows you to control the **composition** of the image.
*   **Canny Edge**: Use an outline drawing as input.
*   **OpenPose**: Use a stick figure pose as input.
*   **Depth**: use a depth map.

This solves the problem of "getting the pose right" in AI art.
          `
        }
      ]
    },
    {
      title: "Module 3: Audio & Video",
      lessons: [
        { 
          id: "c6-m3-l1",
          title: "AI Music & Voice Cloning", 
          duration: "24 min",
          type: "reading",
          content: `
# AI Audio

## Text-to-Speech (TTS)
ElevenLabs offers hyper-realistic voice synthesis.
*   **Voice Cloning**: Creating a digital replica of your own voice with just a few minutes of audio.

## Music Generation
Suno and Udio can generate full songs with lyrics and vocals from a simple text prompt.
"Create a catchy pop song about programming in Python."
          `
        },
        { 
          id: "c6-m3-l2",
          title: "AI Video: Sora, Runway, Pika", 
          duration: "26 min",
          type: "reading",
          content: `
# AI Video Generation

Video generation is the next frontier. It adds the dimension of **time** (temporal consistency).

## Leading Tools
*   **Sora (OpenAI)**: Generates minute-long videos with high fidelity.
*   **Runway Gen-2**: Allows text-to-video and image-to-video.
*   **Pika Labs**: Great for animation and specific motion control.

**Challenges**: Keeping characters consistent across frames (flickering).
          `
        },
        {
          id: "c6-m3-l3",
          title: "Quiz: Multimedia",
          duration: "10 min",
          type: "quiz",
          questions: [
            {
              id: "q1",
              text: "What does ControlNet help with in Stable Diffusion?",
              options: ["Generating faster images", "Controlling composition and structure", "Improving color accuracy", "Reducing file size"],
              correctAnswer: "B",
              explanation: "ControlNet allows you to condition generation on edges, depth maps, or poses, giving precise control over the image structure."
            }
          ]
        }
      ]
    }
  ],
  projects: [
    {
      title: "Capstone: Creative GenAI Business",
      description: "Launch a creative service or product powered by generative AI, from concept to market.",
      duration: "8 hours",
      difficulty: "advanced"
    }
  ]
};
