import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { COURSES_METADATA } from "@/data/courses-expanded";
import { User } from "@supabase/supabase-js";

export interface UserCourseProgress {
  courseId: string;
  title: string;
  progress: number;
  completed: boolean;
  nextLesson: string;
  remainingTime: string;
  lastAccessed?: Date;
}

export interface DashboardStats {
  inProgress: number;
  hoursLearned: number;
  completed: number;
  streak: number;
  totalCourses: number;
  completionRate: number;
}

export interface RecentActivity {
  id: string;
  type: 'course_started' | 'lesson_completed' | 'course_completed' | 'achievement';
  title: string;
  description: string;
  timestamp: Date;
  icon?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  achieved: boolean;
  progress?: number;
  icon: string;
}

export const useDashboardData = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    inProgress: 0,
    hoursLearned: 0,
    completed: 0,
    streak: 0,
    totalCourses: 0,
    completionRate: 0
  });
  const [learningPath, setLearningPath] = useState<UserCourseProgress[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

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

        // Fetch user courses with ordering
        const { data: userCourses, error } = await supabase
          .from('user_courses')
          .select('*')
          .eq('user_id', user.id)
          .order('last_accessed', { ascending: false });

        if (error) throw error;

        // Process Stats
        const inProgressCount = userCourses?.filter(c => !c.completed).length || 0;
        const completedCount = userCourses?.filter(c => c.completed).length || 0;
        const totalCourses = userCourses?.length || 0;
        const completionRate = totalCourses > 0 ? Math.round((completedCount / totalCourses) * 100) : 0;
        
        // Calculate estimated hours learned
        let totalMinutesLearned = 0;
        userCourses?.forEach(c => {
          const meta = COURSES_METADATA[c.course_id];
          if (meta) {
            totalMinutesLearned += (c.progress / 100) * meta.totalDurationMin;
          }
        });

        // Calculate streak (mock for now - would need daily activity tracking)
        const streak = calculateStreak(userCourses);

        // Format Course List
        const formattedPath: UserCourseProgress[] = userCourses
          ?.filter(c => !c.completed)
          .map(c => {
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
              nextLesson: `Lesson ${lessonIndex}: Continuing...`,
              remainingTime: `${remainingMin} min`,
              lastAccessed: c.last_accessed ? new Date(c.last_accessed) : undefined
            };
          }) || [];

        // Generate recent activity
        const activities = generateRecentActivity(userCourses);
        
        // Generate achievements
        const userAchievements = generateAchievements(completedCount, totalMinutesLearned, streak);

        setStats({
          inProgress: inProgressCount,
          completed: completedCount,
          hoursLearned: Math.round(totalMinutesLearned / 60),
          streak,
          totalCourses,
          completionRate
        });

        setLearningPath(formattedPath);
        setRecentActivity(activities);
        setAchievements(userAchievements);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, user, stats, learningPath, recentActivity, achievements };
};

// Helper function to calculate streak
function calculateStreak(courses: any[]): number {
  if (!courses || courses.length === 0) return 0;
  
  // Mock implementation - in production, you'd track daily activity
  const hasRecentActivity = courses.some(c => {
    if (!c.last_accessed) return false;
    const daysSince = Math.floor((Date.now() - new Date(c.last_accessed).getTime()) / (1000 * 60 * 60 * 24));
    return daysSince === 0;
  });
  
  return hasRecentActivity ? 3 : 0; // Mock streak
}

// Helper function to generate recent activity
function generateRecentActivity(courses: any[]): RecentActivity[] {
  const activities: RecentActivity[] = [];
  
  if (!courses) return activities;

  // Sort by last accessed
  const sortedCourses = [...courses].sort((a, b) => {
    const dateA = a.last_accessed ? new Date(a.last_accessed).getTime() : 0;
    const dateB = b.last_accessed ? new Date(b.last_accessed).getTime() : 0;
    return dateB - dateA;
  });

  sortedCourses.slice(0, 5).forEach(course => {
    const meta = COURSES_METADATA[course.course_id];
    if (!meta) return;

    if (course.completed) {
      activities.push({
        id: `completed-${course.id}`,
        type: 'course_completed',
        title: 'Course Completed',
        description: meta.title,
        timestamp: course.last_accessed ? new Date(course.last_accessed) : new Date(),
        icon: 'trophy'
      });
    } else if (course.progress > 0) {
      activities.push({
        id: `progress-${course.id}`,
        type: 'lesson_completed',
        title: 'Learning Progress',
        description: `${meta.title} - ${course.progress}% complete`,
        timestamp: course.last_accessed ? new Date(course.last_accessed) : new Date(),
        icon: 'book'
      });
    } else {
      activities.push({
        id: `started-${course.id}`,
        type: 'course_started',
        title: 'Course Started',
        description: meta.title,
        timestamp: course.last_accessed ? new Date(course.last_accessed) : new Date(),
        icon: 'book'
      });
    }
  });

  return activities;
}

// Helper function to generate achievements
function generateAchievements(completed: number, minutesLearned: number, streak: number): Achievement[] {
  const achievements: Achievement[] = [
    {
      id: 'first-course',
      title: 'First Steps',
      description: 'Complete your first course',
      achieved: completed >= 1,
      icon: 'award',
      progress: Math.min(100, completed * 100)
    },
    {
      id: 'course-master',
      title: 'Course Master',
      description: 'Complete 5 courses',
      achieved: completed >= 5,
      icon: 'trophy',
      progress: Math.min(100, (completed / 5) * 100)
    },
    {
      id: 'dedicated-learner',
      title: 'Dedicated Learner',
      description: 'Learn for 10 hours',
      achieved: minutesLearned >= 600,
      icon: 'clock',
      progress: Math.min(100, (minutesLearned / 600) * 100)
    },
    {
      id: 'streak-starter',
      title: 'On Fire',
      description: 'Maintain a 7-day streak',
      achieved: streak >= 7,
      icon: 'flame',
      progress: Math.min(100, (streak / 7) * 100)
    }
  ];

  return achievements;
}
