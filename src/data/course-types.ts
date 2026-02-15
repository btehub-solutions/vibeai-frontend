import { BookOpen, Calendar, Rocket, Lightbulb, Palette, Database } from "lucide-react";

export interface Lesson {
  id?: string;
  title: string;
  duration: string;
  type?: 'video' | 'quiz' | 'reading';
  completed?: boolean;
  objectives?: string[];
  activity?: string;
  quiz?: string;
  questions?: Array<{
    id: string;
    text: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
  }>;
  content?: string;
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
  modules?: Chapter[]; // Alias for chapters
  projects?: Project[];
  prerequisites?: string[];
  learningOutcomes?: string[];
  totalLessons?: number; // Computed property
  totalDurationMin?: number; // Computed property in minutes
}
