import { useParams, useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { getCourseMetadata } from "@/data/courses-expanded";
import { 
  ArrowLeft, Clock, BookOpen, PlayCircle, CheckCircle, Lock, Loader2,
  Target, Award, ChevronDown, ChevronUp, FileText, Brain, Zap,
  CheckCircle2, AlertCircle, TrendingUp, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";

const DashboardCourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());

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

        if (error && error.code !== 'PGRST116') throw error;

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
    if (course?.modules?.[0]?.lessons?.[0]) {
      const firstLessonId = course.modules[0].lessons[0].id;
      navigate(`/dashboard/courses/${courseId}/lessons/${firstLessonId}`);
      toast.success("Starting course...");
    } else {
      toast.error("No lessons found for this course.");
    }
  };

  const toggleLessonExpand = (lessonId: string) => {
    const newExpanded = new Set(expandedLessons);
    if (newExpanded.has(lessonId)) {
      newExpanded.delete(lessonId);
    } else {
      newExpanded.add(lessonId);
    }
    setExpandedLessons(newExpanded);
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

  const isLessonUnlock = (lessonIndex: number) => {
    return true; // All lessons unlocked
  };
  
  const isLessonCompleted = (lessonIndex: number) => {
    const threshold = (100 / course.totalLessons) * (lessonIndex + 1);
    return progress >= threshold - 1;
  };

  // Calculate module progress
  const getModuleProgress = (moduleIndex: number) => {
    const module = course.modules?.[moduleIndex];
    if (!module) return 0;
    
    const startIndex = course.modules.slice(0, moduleIndex).reduce((acc, m) => acc + m.lessons.length, 0);
    const completedInModule = module.lessons.filter((_, idx) => 
      isLessonCompleted(startIndex + idx)
    ).length;
    
    return Math.round((completedInModule / module.lessons.length) * 100);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <div className="max-w-6xl mx-auto">
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
            user={user}
          />

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Overview Card */}
              <div className="card-elevated p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-8 h-8 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">About this course</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {course.longDescription || course.description}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/5">
                  <div className="text-center p-4 rounded-xl bg-secondary/30">
                    <Clock className="w-5 h-5 text-accent mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{course.totalDurationMin}</p>
                    <p className="text-xs text-muted-foreground">Minutes</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary/30">
                    <BookOpen className="w-5 h-5 text-accent mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{course.totalLessons}</p>
                    <p className="text-xs text-muted-foreground">Lessons</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary/30">
                    <Target className="w-5 h-5 text-accent mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{course.modules?.length || 0}</p>
                    <p className="text-xs text-muted-foreground">Modules</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary/30">
                    <Award className="w-5 h-5 text-accent mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">
                      {course.totalDurationMin < 300 ? "Beginner" : course.totalDurationMin < 600 ? "Intermediate" : "Advanced"}
                    </p>
                    <p className="text-xs text-muted-foreground">Level</p>
                  </div>
                </div>
              </div>

              {/* Learning Outcomes */}
              {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                <div className="card-elevated p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Target className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold">What You'll Learn</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {course.learningOutcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground">{outcome}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prerequisites */}
              {course.prerequisites && course.prerequisites.length > 0 && (
                <div className="card-elevated p-6 border-l-4 border-accent">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Prerequisites</h4>
                      <ul className="space-y-1">
                        {course.prerequisites.map((prereq, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">• {prereq}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Curriculum */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Brain className="w-6 h-6 text-accent" />
                    Course Curriculum
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {course.modules?.length || 0} modules • {course.totalLessons} lessons
                  </span>
                </div>

                {course.modules && course.modules.length > 0 ? (
                  <div className="space-y-4">
                    {course.modules.map((module, mIdx) => {
                      const moduleProgress = getModuleProgress(mIdx);
                      const startIndex = course.modules.slice(0, mIdx).reduce((acc, m) => acc + m.lessons.length, 0);

                      return (
                        <div key={mIdx} className="card-elevated overflow-hidden border border-white/5">
                          {/* Module Header */}
                          <div className="bg-gradient-to-r from-secondary/50 to-secondary/30 p-6 border-b border-white/5">
                            <div className="flex items-start justify-between gap-4 mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent/20 text-accent">
                                    Module {mIdx + 1}
                                  </span>
                                  {moduleProgress === 100 && (
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-500 flex items-center gap-1">
                                      <CheckCircle2 size={12} />
                                      Completed
                                    </span>
                                  )}
                                </div>
                                <h4 className="text-lg font-semibold text-foreground">{module.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {module.lessons.length} lessons
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center">
                                  <div className="text-center">
                                    <p className="text-lg font-bold text-accent">{moduleProgress}%</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Module Progress Bar */}
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full transition-all duration-500"
                                style={{ width: `${moduleProgress}%` }}
                              />
                            </div>
                          </div>

                          {/* Lessons */}
                          <div className="divide-y divide-white/5">
                            {module.lessons.map((lesson, lIdx) => {
                              const globalIndex = startIndex + lIdx;
                              const isUnlocked = isLessonUnlock(globalIndex);
                              const isCompleted = isLessonCompleted(globalIndex);
                              const lessonId = `${mIdx}-${lIdx}`;
                              const isExpanded = expandedLessons.has(lessonId);

                              return (
                                <div key={lessonId} className={`transition-all duration-200 ${
                                  isUnlocked ? 'hover:bg-accent/5' : 'opacity-60 bg-black/20'
                                }`}>
                                  {/* Lesson Header */}
                                  <div
                                    className="p-5 flex items-center justify-between cursor-pointer group"
                                    onClick={() => isUnlocked && toggleLessonExpand(lessonId)}
                                  >
                                    <div className="flex items-center gap-4 flex-1">
                                      {/* Status Icon */}
                                      {isCompleted ? (
                                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                          <CheckCircle size={20} />
                                        </div>
                                      ) : isUnlocked ? (
                                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                          <PlayCircle size={20} />
                                        </div>
                                      ) : (
                                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                                          <Lock size={20} />
                                        </div>
                                      )}

                                      {/* Lesson Info */}
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className={`text-sm font-semibold ${
                                            isCompleted ? 'text-muted-foreground line-through decoration-white/20' : 'text-foreground'
                                          }`}>
                                            {lesson.title}
                                          </span>
                                          {lesson.quiz && (
                                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-500/20 text-purple-400">
                                              Quiz
                                            </span>
                                          )}
                                          {lesson.activity && (
                                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-400">
                                              Activity
                                            </span>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                          <span className="flex items-center gap-1">
                                            <Clock size={12} />
                                            {lesson.duration}
                                          </span>
                                          {lesson.objectives && (
                                            <span className="flex items-center gap-1">
                                              <Target size={12} />
                                              {lesson.objectives.length} objectives
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      {/* Expand Icon */}
                                      {isUnlocked && (lesson.objectives || lesson.activity || lesson.quiz) && (
                                        <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Expanded Lesson Details */}
                                  {isExpanded && isUnlocked && (
                                    <div className="px-5 pb-5 space-y-4 animate-in slide-in-from-top-2 duration-300">
                                      {/* Learning Objectives */}
                                      {lesson.objectives && lesson.objectives.length > 0 && (
                                        <div className="p-4 rounded-xl bg-secondary/30 border border-white/5">
                                          <div className="flex items-center gap-2 mb-3">
                                            <Target className="w-4 h-4 text-accent" />
                                            <h5 className="text-sm font-semibold text-foreground">Learning Objectives</h5>
                                          </div>
                                          <ul className="space-y-2">
                                            {lesson.objectives.map((obj, idx) => (
                                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                                <span>{obj}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}

                                      {/* Activity */}
                                      {lesson.activity && (
                                        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                          <div className="flex items-center gap-2 mb-2">
                                            <Zap className="w-4 h-4 text-blue-400" />
                                            <h5 className="text-sm font-semibold text-foreground">Hands-on Activity</h5>
                                          </div>
                                          <p className="text-sm text-muted-foreground">{lesson.activity}</p>
                                        </div>
                                      )}

                                      {/* Quiz */}
                                      {lesson.quiz && (
                                        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                          <div className="flex items-center gap-2 mb-2">
                                            <FileText className="w-4 h-4 text-purple-400" />
                                            <h5 className="text-sm font-semibold text-foreground">Knowledge Check</h5>
                                          </div>
                                          <p className="text-sm text-muted-foreground">{lesson.quiz}</p>
                                        </div>
                                      )}

                                      {/* Start Lesson Button */}
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toast.info(`Starting: ${lesson.title}`);
                                        }}
                                        className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all flex items-center justify-center gap-2"
                                      >
                                        <PlayCircle size={18} />
                                        {isCompleted ? "Review Lesson" : "Start Lesson"}
                                      </button>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="card-elevated p-12 text-center border-dashed border-2 bg-transparent">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">Course content is being prepared.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress Card */}
              <div className="card-elevated p-6 sticky top-6 border-accent/20 shadow-lg shadow-accent/5">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin text-accent" />
                  </div>
                ) : (
                  <>
                    {/* Progress Stats */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-muted-foreground">Your Progress</span>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-accent" />
                          <span className="text-2xl font-bold text-accent">{progress}%</span>
                        </div>
                      </div>
                      <div className="h-3 bg-secondary rounded-full overflow-hidden mb-2">
                        <div 
                          className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full transition-all duration-500 shadow-lg shadow-accent/20"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        {Math.round((progress / 100) * course.totalLessons)} of {course.totalLessons} lessons completed
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-6 text-base shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300 mb-4"
                      onClick={handleStartLearning}
                    >
                      <PlayCircle className="mr-2 h-5 w-5" />
                      {progress > 0 ? "Continue Learning" : "Start Learning"}
                    </Button>
                    
                    {/* Completion Message */}
                    {progress === 100 ? (
                      <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                        <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-green-500">Course Completed! 🎉</p>
                        <p className="text-xs text-muted-foreground mt-1">Great job on finishing this course!</p>
                      </div>
                    ) : (
                      <p className="text-xs text-center text-muted-foreground">
                        Keep up the momentum! 💪
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Quick Stats */}
              <div className="card-elevated p-6">
                <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  Course Stats
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Modules</span>
                    <span className="font-semibold text-foreground">{course.modules?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Lessons</span>
                    <span className="font-semibold text-foreground">{course.totalLessons}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-semibold text-foreground">{Math.floor(course.totalDurationMin / 60)}h {course.totalDurationMin % 60}m</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Difficulty</span>
                    <span className="font-semibold text-accent">
                      {course.totalDurationMin < 300 ? "Beginner" : course.totalDurationMin < 600 ? "Intermediate" : "Advanced"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardCourseDetail;
