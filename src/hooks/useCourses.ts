import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CourseMetadata, COURSES_LIST } from "@/data/courses-expanded";
import { toast } from "sonner";

export interface CourseWithProgress extends CourseMetadata {
  progress: number;
  completed: boolean;
  isStarted: boolean;
  completedLessons: number;
}

export const useCourses = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<CourseWithProgress[]>([]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Fallback for non-logged in (shouldn't happen on protected routes)
        setCourses(COURSES_LIST.map(c => ({ ...c, progress: 0, completed: false, isStarted: false, completedLessons: 0 })));
        return;
      }

      // Fetch user courses
      const { data: userCoursesData, error } = await supabase
        .from('user_courses')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      // Map metadata with progress
      const mergedCourses = COURSES_LIST.map(course => {
        const userProgress = userCoursesData?.find(uc => uc.course_id === course.id);
        
        const progress = userProgress?.progress || 0;
        const completedLessons = Math.floor((progress / 100) * course.totalLessons);

        return {
          ...course,
          progress: progress,
          completed: userProgress?.completed || false,
          isStarted: !!userProgress,
          completedLessons: completedLessons
        };
      });

      setCourses(mergedCourses);

    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load course progress");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const startCourse = async (courseId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_courses')
        .insert({
          user_id: user.id,
          course_id: courseId,
          progress: 0,
          completed: false
        });

      if (error) throw error;

      toast.success("Course started!");
      fetchCourses(); // Refresh state

    } catch (error) {
      console.error("Error starting course:", error);
      toast.error("Could not enroll in course");
    }
  };

  return { loading, courses, startCourse };
};
