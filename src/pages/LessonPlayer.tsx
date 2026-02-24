import { useParams, useNavigate } from "react-router-dom";
import { getCourseMetadata } from "@/data/courses-expanded";
import { 
  ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, Play, FileText, 
  HelpCircle, Target, Zap, BookOpen, Award, StickyNote, Download,
  CheckCircle2, XCircle, AlertCircle, Lightbulb, Clock, Brain, ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useNotification } from "@/components/providers/NotificationProvider";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { generateLessonContent } from "@/services/ai-course-generator";
import { Loader2, Key } from "lucide-react";
import { useIntelligence } from "@/hooks/useIntelligence";
import { findCourseImage } from "@/data/course-images";

// Split content on [IMAGE: ...] markers and render as alternating markdown + visual cards
const renderLessonContent = (content: string) => {
  const IMAGE_REGEX = /\[IMAGE:\s*(.*?)\]/gi;
  const segments: Array<{ type: 'text' | 'image'; value: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = IMAGE_REGEX.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', value: content.slice(lastIndex, match.index) });
    }
    segments.push({ type: 'image', value: match[1].trim() });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    segments.push({ type: 'text', value: content.slice(lastIndex) });
  }

  return segments.map((seg, i) => {
    if (seg.type === 'image') {
      const imagePath = findCourseImage(seg.value);
      
      if (imagePath) {
        // Render actual generated image
        return (
          <div key={i} className="my-8 not-prose">
            <div className="rounded-2xl overflow-hidden border border-accent/20 bg-gradient-to-br from-accent/5 via-purple-500/5 to-blue-500/5 shadow-lg shadow-accent/5">
              <div className="relative">
                <img 
                  src={imagePath} 
                  alt={seg.value}
                  className="w-full h-auto object-contain max-h-[500px] bg-black/20"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback: hide the img and show description instead
                    const container = (e.target as HTMLElement).closest('.rounded-2xl');
                    if (container) {
                      (e.target as HTMLElement).style.display = 'none';
                      const fallback = container.querySelector('.image-fallback');
                      if (fallback) (fallback as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                {/* Fallback if image fails to load */}
                <div className="image-fallback hidden items-center gap-4 p-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1.5">Visual Reference</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{seg.value}</p>
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-accent/10 bg-gradient-to-r from-accent/5 to-transparent">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-accent flex-shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{seg.value}</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
      
      // Fallback: enhanced visual reference card for images not yet generated
      return (
        <div key={i} className="my-8 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 via-purple-500/5 to-blue-500/5 p-6 not-prose overflow-hidden relative">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-accent blur-3xl" />
            <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-purple-500 blur-3xl" />
          </div>
          <div className="relative flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center border border-accent/10">
              <ImageIcon className="w-7 h-7 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">📊 Visual Diagram</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{seg.value}</p>
            </div>
          </div>
        </div>
      );
    }
    return <ReactMarkdown key={i} remarkPlugins={[remarkGfm]}>{seg.value}</ReactMarkdown>;
  });
};

const LessonPlayer = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { success, error: notifyError } = useNotification();
  const [complete, setComplete] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [dynamicContent, setDynamicContent] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [needsApiKey, setNeedsApiKey] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");

  // ── Intelligence Engine Integration ────────────────────────────
  const intelligence = useIntelligence();
  const lessonStartTime = useRef<number>(Date.now());

  const course = getCourseMetadata(courseId || "");
  
  // Flatten modules to find current lesson
  const allLessons = course.modules ? course.modules.flatMap(m => m.lessons) : [];
  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  const currentLesson = allLessons[currentIndex];
  
  const nextLesson = allLessons[currentIndex + 1];
  const prevLesson = allLessons[currentIndex - 1];

  // Initialize intelligence engine & record lesson start
  useEffect(() => {
    const initIntelligence = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        intelligence.initialize(user.id);
        if (courseId && lessonId) {
          intelligence.recordLessonStart(courseId, lessonId);
          lessonStartTime.current = Date.now();
        }
      }
    };
    initIntelligence();
  }, [courseId, lessonId]);

  // Load saved notes
  useEffect(() => {
    const savedNotes = localStorage.getItem(`lesson-notes-${lessonId}`);
    if (savedNotes) setNotes(savedNotes);
  }, [lessonId]);

  // Save notes + record note event
  const handleSaveNotes = () => {
    localStorage.setItem(`lesson-notes-${lessonId}`, notes);
    if (courseId && lessonId) {
      intelligence.recordNoteTaken(courseId, lessonId);
    }
    success("Notes saved!");
  };

  const fetchAiContent = async (overrideKey?: string) => {
    setIsGenerating(true);
    setNeedsApiKey(false);
    try {
      if (overrideKey) {
        localStorage.setItem('GEMINI_API_KEY', overrideKey);
      }
      const content = await generateLessonContent(
        course?.title || "VibeAI Course",
        currentLesson.title,
        currentLesson.objectives
      );
      setDynamicContent(content);
      localStorage.setItem(`ai-lesson-cache-${currentLesson.id}`, content);
    } catch (err: unknown) {
      const error = err as Error;
      if (error.message?.includes("Missing Gemini API Key") || error.message?.includes("API key not valid")) {
        setNeedsApiKey(true);
      } else {
        notifyError("Could not generate AI content", "Ensure your key is valid and has sufficient quota.");
      }
      setDynamicContent(null);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate missing content dynamically
  useEffect(() => {
    if (!currentLesson || currentLesson.type === 'quiz') {
      setDynamicContent(null);
      setIsGenerating(false);
      setNeedsApiKey(false);
      return;
    }

    if (currentLesson.content) {
      setDynamicContent(currentLesson.content);
      return;
    }

    const cachedKey = `ai-lesson-cache-${currentLesson.id}`;
    const cached = localStorage.getItem(cachedKey);
    
    if (cached) {
      setDynamicContent(cached);
      return;
    }

    fetchAiContent();
  }, [lessonId, currentLesson, course]);

  const handleQuizSubmit = () => {
    if (!currentLesson.questions) return;
    
    let correct = 0;
    currentLesson.questions.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    
    const score = Math.round((correct / currentLesson.questions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    // Record quiz submission to intelligence engine
    if (courseId && lessonId) {
      intelligence.recordQuizSubmit(courseId, lessonId, score);
    }
    
    if (score >= 70) {
      success(`Great job! You scored ${score}%`);
    } else {
      notifyError("Quiz failed", `You scored ${score}%. Try reviewing the material and retake the quiz.`);
    }
  };

  const handleRetakeQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    // Record retake event
    if (courseId && lessonId) {
      intelligence.recordQuizRetake(courseId, lessonId);
    }
  };

  const handleComplete = async () => {
    if (!courseId) return;

    // Check if quiz exists and is passed
    if (currentLesson.type === 'quiz' && currentLesson.questions) {
      if (!quizSubmitted) {
        notifyError("Quiz incomplete", "Please complete the quiz before proceeding.");
        return;
      }
      if (quizScore < 70) {
        notifyError("Quiz failed", "You need to score at least 70% to proceed. Please retake the quiz.");
        return;
      }
    }

    // Record lesson completion with time spent to intelligence engine
    const timeSpentSeconds = Math.round((Date.now() - lessonStartTime.current) / 1000);
    if (lessonId) {
      intelligence.recordLessonComplete(courseId, lessonId, timeSpentSeconds);
    }

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
    success("Lesson completed!");
    
    if (nextLesson) {
      setTimeout(() => {
        navigate(`/dashboard/courses/${courseId}/lessons/${nextLesson.id}`);
        setComplete(false);
        lessonStartTime.current = Date.now(); // Reset timer
      }, 1500);
    } else {
      success("Course completed!", "Congratulations! 🎉");
      setTimeout(() => navigate(`/dashboard/courses/${courseId}`), 2000);
    }
  };

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Lesson not found</h2>
          <Button onClick={() => navigate(`/dashboard/courses/${courseId}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="h-14 sm:h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-3 sm:px-6 fixed top-0 w-full z-50">
        <div className="flex items-center gap-1.5 sm:gap-4 flex-1 min-w-0 pr-2 sm:pr-4">
          <Button variant="ghost" size="sm" className="px-1.5 sm:px-4 flex-shrink-0 h-8 sm:h-10" onClick={() => navigate(`/dashboard/courses/${courseId}`)}>
            <ArrowLeft size={14} className="sm:mr-2" />
            <span className="hidden sm:inline text-xs sm:text-sm">Back</span>
          </Button>
          <div className="h-5 w-px bg-border mx-0.5 sm:mx-2 flex-shrink-0" />
          <h1 className="font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base truncate max-w-[120px] sm:max-w-none">{course.title}</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <span className="text-[10px] sm:text-xs text-muted-foreground hidden xs:block">
            {currentIndex + 1}/{allLessons.length}
          </span>
          <div className="w-12 sm:w-24 md:w-32 h-1.5 sm:h-2 bg-secondary rounded-full overflow-hidden flex-shrink-0">
            <div 
              className="h-full bg-gradient-to-r from-accent to-purple-500 transition-all duration-300" 
              style={{ width: `${((currentIndex) / allLessons.length) * 100}%` }} 
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 flex">
        {/* Sidebar Navigation */}
        <aside className="w-80 border-r border-border bg-card/30 hidden lg:flex flex-col h-[calc(100vh-64px)] overflow-y-auto">
          <div className="p-4 font-semibold text-sm border-b border-border flex items-center gap-2">
            <BookOpen size={16} className="text-accent" />
            Course Content
          </div>
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
                <div className="flex-1 min-w-0">
                  <span className="truncate block">{lesson.title}</span>
                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-12 flex justify-center">
          <div className="max-w-4xl w-full space-y-6 sm:space-y-8">
            {/* Lesson Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-accent/20 text-accent px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  {currentLesson.type}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock size={14} />
                  {currentLesson.duration}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{currentLesson.title}</h2>
            </div>

            {/* Learning Objectives */}
            {currentLesson.objectives && currentLesson.objectives.length > 0 && (
              <div className="card-elevated p-4 sm:p-6 border-l-4 border-accent">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold">Learning Objectives</h3>
                </div>
                <ul className="space-y-2">
                  {currentLesson.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Main Content Viewer */}
            <div className="card-elevated p-4 sm:p-6 md:p-8">
              {currentLesson.type === 'video' ? (
                <div className="space-y-6">
                  <div className="aspect-video bg-black rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform z-10">
                      <Play size={32} className="text-white ml-1" />
                    </div>
                    <span className="absolute bottom-4 left-4 text-white font-medium">Video Content</span>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground">
                      Video player integration coming soon. This will include interactive video content with timestamps, 
                      playback controls, and the ability to take notes at specific moments.
                    </p>
                  </div>
                </div>
              ) : currentLesson.type === 'quiz' && currentLesson.questions ? (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <HelpCircle className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Knowledge Check</h3>
                      <p className="text-sm text-muted-foreground">
                        {currentLesson.quiz || `${currentLesson.questions.length} questions • Passing score: 70%`}
                      </p>
                    </div>
                  </div>

                  {currentLesson.questions.map((q, idx) => {
                    const userAnswer = quizAnswers[q.id];
                    const isCorrect = userAnswer === q.correctAnswer;
                    const showFeedback = quizSubmitted;

                    return (
                      <div key={q.id} className={`p-6 rounded-xl border-2 transition-all ${
                        showFeedback 
                          ? isCorrect 
                            ? 'border-green-500/50 bg-green-500/5' 
                            : userAnswer 
                            ? 'border-red-500/50 bg-red-500/5' 
                            : 'border-border'
                          : 'border-border'
                      }`}>
                        <div className="flex items-start gap-3 mb-4">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-sm">
                            {idx + 1}
                          </span>
                          <h4 className="text-lg font-medium flex-1">{q.text}</h4>
                          {showFeedback && (
                            <div className="flex-shrink-0">
                              {isCorrect ? (
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                              ) : userAnswer ? (
                                <XCircle className="w-6 h-6 text-red-500" />
                              ) : (
                                <AlertCircle className="w-6 h-6 text-yellow-500" />
                              )}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          {q.options.map((option, optIdx) => {
                            const optionLetter = String.fromCharCode(65 + optIdx);
                            const isSelected = userAnswer === optionLetter;
                            const isCorrectOption = q.correctAnswer === optionLetter;

                            return (
                              <div 
                                key={optIdx} 
                                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                                  quizSubmitted
                                    ? isCorrectOption
                                      ? 'border-green-500 bg-green-500/10'
                                      : isSelected
                                      ? 'border-red-500 bg-red-500/10'
                                      : 'border-border'
                                    : isSelected
                                    ? 'border-accent bg-accent/10'
                                    : 'border-border hover:border-accent/50 hover:bg-accent/5'
                                }`}
                                onClick={() => !quizSubmitted && setQuizAnswers({ ...quizAnswers, [q.id]: optionLetter })}
                              >
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                  quizSubmitted
                                    ? isCorrectOption
                                      ? 'border-green-500 bg-green-500'
                                      : isSelected
                                      ? 'border-red-500 bg-red-500'
                                      : 'border-border'
                                    : isSelected
                                    ? 'border-accent bg-accent'
                                    : 'border-border'
                                }`}>
                                  {(quizSubmitted && isCorrectOption) || (!quizSubmitted && isSelected) ? (
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                  ) : null}
                                </div>
                                <span className="flex-1 text-sm font-medium">
                                  {optionLetter}. {option}
                                </span>
                                {quizSubmitted && isCorrectOption && (
                                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {showFeedback && q.explanation && (
                          <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="flex items-start gap-2">
                              <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-semibold text-blue-400 mb-1">Explanation</p>
                                <p className="text-sm text-muted-foreground">{q.explanation}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Quiz Actions */}
                  {!quizSubmitted ? (
                    <Button 
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(quizAnswers).length !== currentLesson.questions.length}
                      className="w-full py-6 text-lg font-semibold bg-accent hover:bg-accent/90"
                    >
                      Submit Quiz
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className={`p-6 rounded-xl border-2 ${
                        quizScore >= 70 
                          ? 'border-green-500 bg-green-500/10' 
                          : 'border-red-500 bg-red-500/10'
                      }`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                            quizScore >= 70 ? 'bg-green-500/20' : 'bg-red-500/20'
                          }`}>
                            {quizScore >= 70 ? (
                              <Award className="w-8 h-8 text-green-500" />
                            ) : (
                              <XCircle className="w-8 h-8 text-red-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold mb-1">
                              {quizScore >= 70 ? 'Quiz Passed!' : 'Quiz Not Passed'}
                            </h4>
                            <p className="text-muted-foreground">
                              You scored {quizScore}% ({Object.values(quizAnswers).filter((ans, idx) => 
                                ans === currentLesson.questions![idx].correctAnswer
                              ).length} out of {currentLesson.questions.length} correct)
                            </p>
                          </div>
                          <div className="text-4xl font-bold text-accent">
                            {quizScore}%
                          </div>
                        </div>
                      </div>

                      {quizScore < 70 && (
                        <Button 
                          onClick={handleRetakeQuiz}
                          variant="outline"
                          className="w-full py-6 text-lg font-semibold"
                        >
                          Retake Quiz
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-a:text-accent prose-code:text-accent prose-hr:border-border">
                  {isGenerating ? (
                    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground animate-in fade-in duration-500">
                      <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
                      <p className="text-lg font-medium">Synthesizing professional teaching materials...</p>
                      <p className="text-sm opacity-70 mt-2">Our AI is drafting a comprehensive lesson on {currentLesson.title}.</p>
                    </div>
                  ) : needsApiKey ? (
                    <div className="border border-accent/20 bg-accent/5 p-8 rounded-2xl flex flex-col items-center text-center max-w-lg mx-auto my-8">
                       <Key className="w-12 h-12 text-accent mb-4" />
                       <h3 className="text-xl font-semibold mb-2 text-foreground">Unlock Dynamic AI Content</h3>
                       <p className="text-muted-foreground mb-6">Connect your Gemini API Key to let VibeAI generate this entire professional lesson instantly.</p>
                       <div className="w-full space-y-4">
                         <Input 
                            type="password"
                            placeholder="Enter your Gemini API key..."
                            value={apiKeyInput}
                            onChange={(e) => setApiKeyInput(e.target.value)}
                         />
                         <Button onClick={() => fetchAiContent(apiKeyInput)} className="w-full bg-accent hover:bg-accent/90 text-white font-semibold flex gap-2">
                           <Zap size={18} />
                           Generate Professional Lesson
                         </Button>
                       </div>
                       <p className="text-xs text-muted-foreground mt-4">Your key is stored securely in your browser's local storage and never leaves this tab.</p>
                    </div>
                  ) : dynamicContent ? (
                    <>{renderLessonContent(dynamicContent)}</>
                  ) : currentLesson.content ? (
                    <>{renderLessonContent(currentLesson.content)}</>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-lg leading-relaxed">
                        This lesson covers the fundamentals of <strong>{currentLesson.title}</strong>. 
                        You'll learn key concepts and practical applications that will help you master this topic.
                      </p>
                      <p className="text-muted-foreground italic">
                        Detailed content for this lesson is being prepared and will be available soon.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Hands-on Activity */}
            {currentLesson.activity && (
              <div className="card-elevated p-4 sm:p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold">Hands-on Activity</h3>
                </div>
                <p className="text-muted-foreground">{currentLesson.activity}</p>
              </div>
            )}

            {/* Notes Section */}
            <div className="card-elevated p-4 sm:p-6">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="w-full flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <StickyNote className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold">My Notes</h3>
                </div>
                <ChevronRight className={`w-5 h-5 transition-transform ${showNotes ? 'rotate-90' : ''}`} />
              </button>

              {showNotes && (
                <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Take notes about this lesson..."
                    className="min-h-[150px] bg-secondary/30"
                  />
                  <Button onClick={handleSaveNotes} variant="outline" className="w-full">
                    Save Notes
                  </Button>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-border">
              <Button 
                variant="outline"
                onClick={() => prevLesson && navigate(`/dashboard/courses/${courseId}/lessons/${prevLesson.id}`)}
                disabled={!prevLesson}
                className="w-full sm:w-auto sm:min-w-[140px] py-6 sm:py-6 text-base sm:text-lg"
              >
                <ChevronLeft size={16} className="mr-2" />
                Previous
              </Button>

              <Button 
                onClick={handleComplete}
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white sm:min-w-[180px] py-6 sm:py-6 text-base sm:text-lg font-semibold shadow-lg shadow-accent/20"
                disabled={complete}
              >
                {complete ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Completed
                  </>
                ) : nextLesson ? (
                  <>
                    <span className="truncate">Complete & Continue</span>
                    <ChevronRight size={18} className="ml-1 sm:ml-2 flex-shrink-0" />
                  </>
                ) : (
                  <>
                    <Award className="mr-2 h-5 w-5" />
                    Complete Course
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonPlayer;
