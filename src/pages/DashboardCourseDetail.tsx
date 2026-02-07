import { useParams, useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { getCourseMetadata } from "@/data/courses";
import { ArrowLeft, Clock, BookOpen, PlayCircle, CheckCircle, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardCourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  // In a real app, track completed *lesson IDs*. For now, we simulate simple % progress.
  // Ideally, Supabase 'user_courses' would have a 'completed_lessons' JSONB array. 
  // We'll stick to simple percent for now, but UI will mock "unlocking" based on order.

  const course = getCourseMetadata(courseId || "");

  useEffect(() => {
    const fetchProgress = async () => {
      if (!courseId) return;
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('user_courses')
          .select('progress')
          .eq('user_id', user.id)
          .eq('course_id', courseId)
          .single();

        if (error && error.code !== 'PGRST116') throw error; // Ignore not found error

        if (data) {
          setProgress(data.progress);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [courseId]);

  const handleStartLearning = async () => {
      // Find first lesson to start
      if (course?.modules?.[0]?.lessons?.[0]) {
          const firstLessonId = course.modules[0].lessons[0].id;
          navigate(`/dashboard/courses/${courseId}/lessons/${firstLessonId}`);
          toast.success("Starting course...");
      } else {
          toast.error("No lessons found for this course.");
      }
  };

  if (!course || course.title === "Unknown Course") {
    return (
      <div className="min-h-screen bg-background flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:p-10 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Course not found</h2>
          <Button onClick={() => navigate("/dashboard/courses")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </main>
      </div>
    );
  }

  // Calculate unlock status based on simple progress % (Mock logic)
  const isLessonUnlock = (lessonIndex: number) => {
      return true; // All lessons unlocked per user request
  };
  
  const isLessonCompleted = (lessonIndex: number) => {
    const threshold = (100 / course.totalLessons) * (lessonIndex + 1);
    return progress >= threshold - 1; // Tolerance for rounding
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 pl-0 hover:pl-2 transition-all"
            onClick={() => navigate("/dashboard/courses")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>

          <DashboardHeader
            title={course.title}
            subtitle={course.category}
          />

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description Card */}
              <div className="card-elevated p-8">
                <h3 className="text-xl font-semibold mb-4">About this course</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {course.longDescription || course.description}
                </p>
                
                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={16} className="text-accent" />
                    <span>{course.totalDurationMin} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen size={16} className="text-accent" />
                    <span>{course.totalLessons} Lessons</span>
                  </div>
                </div>
              </div>

              {/* Curriculum */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold px-1">Curriculum</h3>
                {course.modules && course.modules.length > 0 ? (
                  course.modules.map((module, mIdx) => (
                    <div key={mIdx} className="card-elevated overflow-hidden border border-white/5">
                      <div className="bg-secondary/30 p-4 border-b border-white/5">
                        <h4 className="font-semibold text-foreground text-sm tracking-wide uppercase opacity-80">{module.title}</h4>
                      </div>
                      <div className="divide-y divide-white/5">
                        {module.lessons.map((lesson, lIdx) => {
                           // Calculate global index for unlock logic
                           const globalIndex = course.modules.slice(0, mIdx).reduce((acc, m) => acc + m.lessons.length, 0) + lIdx;
                           const isUnlocked = isLessonUnlock(globalIndex);
                           const isCompleted = isLessonCompleted(globalIndex);

                           return (
                            <div 
                              key={lesson.id} 
                              className={`p-5 flex items-center justify-between transition-all duration-200 group
                                ${isUnlocked ? 'hover:bg-accent/5 cursor-pointer' : 'opacity-60 cursor-not-allowed bg-black/20'}
                              `}
                              onClick={() => isUnlocked && toast.info(`Starting: ${lesson.title}`)}
                            >
                              <div className="flex items-center gap-4">
                                {isCompleted ? (
                                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                    <CheckCircle size={16} />
                                  </div>
                                ) : isUnlocked ? (
                                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                    <PlayCircle size={16} />
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                                    <Lock size={16} />
                                  </div>
                                )}
                                <div>
                                    <span className={`text-sm font-medium ${isCompleted ? 'text-muted-foreground line-through decoration-white/20' : 'text-foreground'}`}>
                                      {lesson.title}
                                    </span>
                                    <p className="text-xs text-muted-foreground mt-0.5 capitalize">{lesson.type}</p>
                                </div>
                              </div>
                              <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">{lesson.duration}</span>
                            </div>
                           );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="card-elevated p-8 text-center text-muted-foreground border-dashed border-2 bg-transparent">
                    <p>Course content is being prepared.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar / Progress Card */}
            <div className="space-y-6">
              <div className="card-elevated p-6 sticky top-6 border-accent/20 shadow-lg shadow-accent/5">
                {loading ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="animate-spin text-accent" />
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-sm font-medium text-muted-foreground">Your Progress</span>
                            <span className="text-xl font-bold text-accent">{progress}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                            className="h-full bg-accent rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(var(--accent),0.5)]"
                            style={{ width: `${progress}%` }}
                            />
                        </div>
                        </div>

                        <Button 
                            className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-6 text-base shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300"
                            onClick={handleStartLearning}
                        >
                        {progress > 0 ? "Continue Learning" : "Start Learning"}
                        </Button>
                        
                        <p className="text-xs text-center text-muted-foreground mt-4 opacity-70">
                        {progress === 100 ? "Course Completed! 🎉" : "Keep up the momentum!"}
                        </p>
                    </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardCourseDetail;
