// The URL for the backend on Railway. In development, it defaults to localhost:3001
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export const generateLessonContent = async (courseTitle: string, lessonTitle: string, objectives?: string[]): Promise<string> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/generate-lesson`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseTitle,
        lessonTitle,
        objectives,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.content || "Failed to generate content.";
  } catch (error) {
    console.error("Failed to generate AI lesson:", error);
    throw error;
  }
};

