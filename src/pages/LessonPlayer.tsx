import { useParams, useNavigate } from "react-router-dom";
import { getCourseMetadata } from "@/data/courses";
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, Play, FileText, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from 'react-markdown';

const LessonPlayer = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [complete, setComplete] = useState(false);

  const course = getCourseMetadata(courseId || "");
  
  // Flatten modules to find current lesson index
  const allLessons = course.modules ? course.modules.flatMap(m => m.lessons) : [];
  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  const currentLesson = allLessons[currentIndex];
  
  const nextLesson = allLessons[currentIndex + 1];
  const prevLesson = allLessons[currentIndex - 1];

  const handleComplete = async () => {
      if (!courseId) return;

      // In a real app, we'd mark this specific lesson ID as done. 
      // For now, we increment the course progress % logic.
      const newProgress = Math.min(100, Math.round(((currentIndex + 1) / allLessons.length) * 100));

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
            .from('user_courses')
            .update({ progress: newProgress, completed: newProgress === 100 })
            .eq('user_id', user.id)
            .eq('course_id', courseId);
      }

      setComplete(true);
      toast.success("Lesson completed!");
      
      if (nextLesson) {
          setTimeout(() => {
             navigate(`/dashboard/courses/${courseId}/lessons/${nextLesson.id}`);
             setComplete(false);
          }, 1500);
      } else {
          toast.success("Course completed! Congratulations!");
          setTimeout(() => navigate(`/dashboard/courses/${courseId}`), 2000);
      }
  };

  if (!currentLesson) return <div>Lesson not found</div>;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-6 fixed top-0 w-full z-50">
        <div className="flex items-center gap-4">
             <Button variant="ghost" size="sm" onClick={() => navigate(`/dashboard/courses/${courseId}`)}>
                 <ArrowLeft size={16} className="mr-2" />
                 Back to Course
             </Button>
             <div className="h-6 w-px bg-border mx-2" />
             <h1 className="font-semibold text-sm md:text-base truncate max-w-[300px]">{course.title}</h1>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground mr-2">
                Lesson {currentIndex + 1} of {allLessons.length}
            </span>
            <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                    className="h-full bg-accent transition-all duration-300" 
                    style={{ width: `${((currentIndex) / allLessons.length) * 100}%` }} 
                />
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 flex">
        {/* Sidebar Navigation (Hidden on mobile for now) */}
        <aside className="w-80 border-r border-border bg-card/30 hidden lg:flex flex-col h-[calc(100vh-64px)] overflow-y-auto">
             <div className="p-4 font-semibold text-sm border-b border-border">Course Content</div>
             <div className="p-2 space-y-1">
                 {allLessons.map((lesson, idx) => (
                     <button
                        key={lesson.id}
                        onClick={() => navigate(`/dashboard/courses/${courseId}/lessons/${lesson.id}`)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-colors text-left
                            ${lesson.id === lessonId ? 'bg-accent/10 text-accent font-medium' : 'hover:bg-accent/5 text-muted-foreground'}
                        `}
                     >
                        <div className="flex-shrink-0">
                            {idx < currentIndex ? (
                                <CheckCircle size={16} className="text-green-500" />
                            ) : lesson.type === 'video' ? (
                                <Play size={16} />
                            ) : lesson.type === 'quiz' ? (
                                <HelpCircle size={16} />
                            ) : (
                                <FileText size={16} />
                            )}
                        </div>
                        <span className="truncate">{lesson.title}</span>
                     </button>
                 ))}
             </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-12 flex justify-center">
            <div className="max-w-3xl w-full space-y-8">
                <div>
                    <h2 className="text-3xl font-bold mb-4">{currentLesson.title}</h2>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
                        <span className="bg-secondary px-2 py-1 rounded uppercase text-xs font-semibold tracking-wider">
                            {currentLesson.type}
                        </span>
                        <span>{currentLesson.duration}</span>
                    </div>
                </div>

                {/* Content Viewer */}
                <div className="min-h-[400px] bg-card border border-border rounded-xl p-8 shadow-sm">
                    {currentLesson.type === 'video' ? (
                        <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform z-10">
                                <Play size={32} className="text-white ml-1" />
                            </div>
                            <span className="absolute bottom-4 left-4 text-white font-medium">Video Placeholder</span>
                        </div>
                    ) : currentLesson.type === 'quiz' && currentLesson.questions ? (
                         <div className="space-y-8">
                            {currentLesson.questions.map((q, idx) => (
                                <div key={q.id} className="space-y-4">
                                    <h3 className="text-lg font-medium">{idx + 1}. {q.text}</h3>
                                    <div className="space-y-2">
                                        {q.options.map((option, optIdx) => (
                                            <div key={optIdx} className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-accent/5 transition-colors cursor-pointer">
                                                <input 
                                                    type="radio" 
                                                    name={`question-${q.id}`} 
                                                    id={`q${q.id}-opt${optIdx}`}
                                                    className="w-4 h-4 text-accent" 
                                                />
                                                <label htmlFor={`q${q.id}-opt${optIdx}`} className="flex-1 cursor-pointer text-sm">
                                                    {option}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                         </div>
                    ) : (
                        <div className="prose prose-invert max-w-none">
                            {currentLesson.content ? (
                                <ReactMarkdown>{currentLesson.content}</ReactMarkdown>
                            ) : (
                                <p className="text-muted-foreground italic">Content coming soon...</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-8 border-t border-border">
                    <Button 
                        variant="outline"
                        onClick={() => prevLesson && navigate(`/dashboard/courses/${courseId}/lessons/${prevLesson.id}`)}
                        disabled={!prevLesson}
                    >
                        <ChevronLeft size={16} className="mr-2" />
                        Previous
                    </Button>

                    <Button 
                        onClick={handleComplete}
                        className="bg-accent hover:bg-accent/90 text-white min-w-[140px]"
                    >
                        {complete ? "Completed" : "Mark Complete"}
                        <ChevronRight size={16} className="ml-2" />
                    </Button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default LessonPlayer;
