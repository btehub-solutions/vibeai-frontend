import { Course } from "./course-types";
import { course1 } from "./courses/course-1-foundations";
import { course2 } from "./courses/course-2-machine-learning";
import { course3 } from "./courses/course-3-nlp";
import { course4 } from "./courses/course-4-llm";
import { course5 } from "./courses/course-5-prompt-engineering";
import { course6 } from "./courses/course-6-genai";
import { course7 } from "./courses/course-7-chatbots";
import { course8 } from "./courses/course-8-automation-agents";
import { course9 } from "./courses/course-9-vibe-coding";
import { course10 } from "./courses/course-10-career";

// Re-export types for backward compatibility
export type { Course, Lesson, Chapter, Project } from "./course-types";

export const expandedCourses: Course[] = [
  course1,
  course2,
  course3,
  course4,
  course5,
  course6,
  course7,
  course8,
  course9,
  course10
];

export const categories = ["All", "Fundamentals", "Skills", "Business", "Creative", "Advanced", "Career"];

// Metadata lookup for courses (used by dashboard)
export const COURSES_METADATA: Record<string, { title: string; totalDurationMin: number; totalLessons: number }> = expandedCourses.reduce((acc, course) => {
  // Parse duration string (e.g., "8 hours" -> 480 minutes)
  const durationMatch = course.duration.match(/(\d+)\s*(hour|min|h|m)/i);
  let totalDurationMin = 60; // Default
  
  if (durationMatch) {
    const val = parseInt(durationMatch[1]);
    const unit = durationMatch[2].toLowerCase();
    if (unit.startsWith('h')) {
      totalDurationMin = val * 60;
    } else {
      totalDurationMin = val;
    }
  }
  
  acc[course.id.toString()] = {
    title: course.title,
    totalDurationMin,
    totalLessons: course.lessons
  };
  return acc;
}, {} as Record<string, { title: string; totalDurationMin: number; totalLessons: number }>);

// Helper function to get course by ID or string ID
export const getCourseMetadata = (courseId: string | number): Course => {
  const id = typeof courseId === 'string' ? parseInt(courseId, 10) : courseId;
  const course = expandedCourses.find(c => c.id === id);
  if (!course) {
    // Return a dummy course or throw to prevent crash
    console.error(`Course with ID ${courseId} not found`);
    return expandedCourses[0]; 
  }
  
  // Ensure modules/chapters compatibility
  const modules = course.modules || course.chapters || [];
  
  return {
    ...course,
    modules: modules, 
    chapters: modules, // Alias for backward compatibility
    totalLessons: course.lessons,
    totalDurationMin: COURSES_METADATA[id.toString()]?.totalDurationMin || 0
  };
};

// Export aliases for backward compatibility
export const COURSES_LIST = expandedCourses;
export const CATEGORIES = categories;
export type CourseMetadata = Course;
