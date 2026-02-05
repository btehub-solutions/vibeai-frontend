
import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { courses } from "@/data/courses";
import { ArrowLeft, Clock, BookOpen, PlayCircle, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardCourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const course = courses.find((c) => c.id === Number(courseId));

  if (!course) {
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

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <div className="max-w-4xl mx-auto">
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
              <div className="card-elevated p-6">
                <h3 className="text-xl font-semibold mb-4">About this course</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {course.longDescription || course.description}
                </p>
                
                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={16} className="text-accent" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen size={16} className="text-accent" />
                    <span>{course.lessons} Lessons</span>
                  </div>
                </div>
              </div>

              {/* Curriculum */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Curriculum</h3>
                {course.chapters ? (
                  course.chapters.map((chapter, idx) => (
                    <div key={idx} className="card-elevated overflow-hidden">
                      <div className="bg-secondary/30 p-4 border-b border-white/5">
                        <h4 className="font-medium text-foreground">{chapter.title}</h4>
                      </div>
                      <div className="divide-y divide-white/5">
                        {chapter.lessons.map((lesson, lIdx) => (
                          <div 
                            key={lIdx} 
                            className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center gap-3">
                              {lesson.completed ? (
                                <CheckCircle size={18} className="text-green-500" />
                              ) : idx === 0 && lIdx === 0 ? (
                                <PlayCircle size={18} className="text-accent group-hover:scale-110 transition-transform" />
                              ) : (
                                <Lock size={18} className="text-muted-foreground/50" />
                              )}
                              <span className={`text-sm ${lesson.completed ? 'text-muted-foreground' : 'text-foreground'}`}>
                                {lesson.title}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="card-elevated p-8 text-center text-muted-foreground">
                    <p>Course content loading...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar / Progress Card */}
            <div className="space-y-6">
              <div className="card-elevated p-6 sticky top-6">
                <div className="mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Your Progress</span>
                    <span className="text-xl font-bold text-accent">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-base">
                  {course.progress > 0 ? "Continue Learning" : "Start Learning"}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Last accessed 2 days ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardCourseDetail;
