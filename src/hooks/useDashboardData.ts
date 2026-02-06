import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { COURSES_METADATA } from "@/data/courses";
import { User } from "@supabase/supabase-js";

export interface UserCourseProgress {
  courseId: string;
  title: string;
  progress: number;
  completed: boolean;
  nextLesson: string;
  remainingTime: string;
}

export interface DashboardStats {
  inProgress: number;
  hoursLearned: number;
  completed: number;
  streak: number;
}

export const useDashboardData = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    inProgress: 0,
    hoursLearned: 0,
    completed: 0,
    streak: 0
  });
  const [learningPath, setLearningPath] = useState<UserCourseProgress[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setLoading(false);
          return;
        }

        setUser(user);

        // Fetch user courses
        const { data: userCourses, error } = await supabase
          .from('user_courses')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;

        // Process Stats
        const inProgressCount = userCourses?.filter(c => c.progress > 0 && !c.completed).length || 0;
        const completedCount = userCourses?.filter(c => c.completed).length || 0;
        
        // Calculate estimated hours learned
        let totalMinutesLearned = 0;
        userCourses?.forEach(c => {
          const meta = COURSES_METADATA[c.course_id];
          if (meta) {
            totalMinutesLearned += (c.progress / 100) * meta.totalDurationMin;
          }
        });

        // Format Course List
        const formattedPath: UserCourseProgress[] = userCourses?.map(c => {
          const meta = COURSES_METADATA[c.course_id] || { 
            title: "Unknown Course", 
            totalDurationMin: 60,
            totalLessons: 10
          };
          
          // Estimate next lesson based on progress bucket
          const lessonIndex = Math.floor((c.progress / 100) * meta.totalLessons) + 1;
          const remainingMin = Math.round(meta.totalDurationMin * (1 - c.progress / 100));

          return {
            courseId: c.course_id,
            title: meta.title,
            progress: c.progress,
            completed: c.completed,
            nextLesson: `Lesson ${lessonIndex}: Continuing...`, // Real lesson names would need a lessons table
            remainingTime: `${remainingMin} min`
          };
        }) || [];

        // Sort by last accessed (if we had that field, for now just progress)
        formattedPath.sort((a, b) => b.progress - a.progress);

        setStats({
          inProgress: inProgressCount,
          completed: completedCount,
          hoursLearned: Math.round(totalMinutesLearned / 60),
          streak: 3 // Mock streak for now as we don't track daily activity yet
        });

        setLearningPath(formattedPath);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, user, stats, learningPath };
};
