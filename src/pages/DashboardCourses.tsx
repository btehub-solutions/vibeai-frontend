import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { 
  Play, Clock, BookOpen, ChevronRight, Loader2, Grid3x3, List, 
  TrendingUp, Award, Target, ChevronLeft, Filter, SlidersHorizontal,
  CheckCircle2, Circle, ArrowRight, Sparkles, BarChart3
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CATEGORIES } from "@/data/courses-expanded";
import { useCourses } from "@/hooks/useCourses";
import { useUser } from "@/hooks/useUser";

type ViewMode = "grid" | "list";
type SortOption = "recommended" | "newest" | "progress" | "duration";
type DifficultyFilter = "all" | "beginner" | "intermediate" | "advanced";
type StatusFilter = "all" | "not-started" | "in-progress" | "completed";

const DashboardCourses = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  
  const { loading, courses, startCourse } = useCourses();
  const { user } = useUser();
  const navigate = useNavigate();

  // Separate courses into categories
  const inProgressCourses = useMemo(() => 
    courses.filter(c => c.isStarted && c.progress > 0 && c.progress < 100),
    [courses]
  );

  const featuredCourses = useMemo(() => 
    courses.filter(c => !c.isStarted).slice(0, 3),
    [courses]
  );

  // Apply all filters and sorting
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses;

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategory !== "All") {
      filtered = filtered.filter(c => c.category === activeCategory);
    }

    // Status filter
    if (statusFilter === "not-started") {
      filtered = filtered.filter(c => !c.isStarted);
    } else if (statusFilter === "in-progress") {
      filtered = filtered.filter(c => c.isStarted && c.progress < 100);
    } else if (statusFilter === "completed") {
      filtered = filtered.filter(c => c.progress === 100);
    }

    // Difficulty filter (mock - would need to be added to course data)
    // For now, we'll use course duration as a proxy
    if (difficultyFilter === "beginner") {
      filtered = filtered.filter(c => c.totalDurationMin < 300);
    } else if (difficultyFilter === "intermediate") {
      filtered = filtered.filter(c => c.totalDurationMin >= 300 && c.totalDurationMin < 600);
    } else if (difficultyFilter === "advanced") {
      filtered = filtered.filter(c => c.totalDurationMin >= 600);
    }

    // Sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.id - a.id;
        case "progress":
          return (b.progress || 0) - (a.progress || 0);
        case "duration":
          return a.totalDurationMin - b.totalDurationMin;
        case "recommended":
        default:
          return 0;
      }
    });

    return sorted;
  }, [courses, activeCategory, statusFilter, difficultyFilter, sortBy, searchQuery]);

  const handleStartCourse = async (courseId: string, isStarted: boolean) => {
    if (isStarted) {
      navigate(`/dashboard/courses/${courseId}`);
    } else {
      await startCourse(courseId);
      navigate(`/dashboard/courses/${courseId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CourseCard = ({ course, featured = false }: { course: any; featured?: boolean }) => (
    <div
      className={`card-elevated group hover:border-accent/20 transition-all duration-300 flex flex-col cursor-pointer p-5 md:p-6 ${
        featured ? "p-6 md:p-8" : ""
      } ${viewMode === "list" ? "flex-col sm:flex-row gap-4 md:gap-6 items-start sm:items-center" : ""}`}
      onClick={() => handleStartCourse(course.id, course.isStarted)}
    >
      {viewMode === "list" && (
        <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center">
          <BookOpen className="w-10 h-10 text-accent" />
        </div>
      )}

      <div className={`flex-1 ${viewMode === "list" ? "" : "flex flex-col"}`}>
        {/* Header */}
        <div className={`${viewMode === "list" ? "flex flex-col sm:flex-row items-start justify-between gap-4 w-full" : ""}`}>
          <div className="flex-1">
            {/* Category & Status */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
                {course.category}
              </span>
              {course.progress === 100 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                  <CheckCircle2 size={12} />
                  Completed
                </span>
              )}
              {featured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                  <Sparkles size={12} />
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className={`font-semibold text-foreground mb-2 group-hover:text-accent transition-colors ${
              featured ? "text-xl" : "text-lg"
            }`}>
              {course.title}
            </h3>

            {/* Description */}
            <p className={`text-sm text-muted-foreground mb-4 ${
              viewMode === "list" ? "line-clamp-2" : "line-clamp-3"
            } ${viewMode === "grid" && !featured ? "flex-1" : ""}`}>
              {course.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1.5">
                <BookOpen size={12} />
                {course.totalLessons} lessons
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {course.totalDurationMin} min
              </span>
              <span className="flex items-center gap-1.5">
                <Target size={12} />
                {course.totalDurationMin < 300 ? "Beginner" : course.totalDurationMin < 600 ? "Intermediate" : "Advanced"}
              </span>
            </div>

            {/* Progress */}
            {course.isStarted && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span className="font-medium">Progress</span>
                  <span className="font-bold text-accent">{course.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {course.completedLessons} of {course.totalLessons} lessons completed
                </p>
              </div>
            )}
          </div>

          {/* CTA Button */}
          {viewMode === "list" && (
            <button 
              className="w-full sm:w-auto flex-shrink-0 px-6 py-3 mt-4 sm:mt-0 rounded-xl font-semibold text-sm transition-all duration-200 bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground flex justify-center items-center gap-2"
            >
              {course.isStarted ? (
                <>
                  <Play size={14} fill="currentColor" />
                  Continue
                </>
              ) : (
                <>
                  Start Course
                  <ChevronRight size={14} />
                </>
              )}
            </button>
          )}
        </div>

        {/* CTA Button for Grid View */}
        {viewMode === "grid" && (
          <button 
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground mt-auto"
          >
            {course.isStarted ? (
              <>
                <Play size={14} fill="currentColor" />
                Continue Learning
              </>
            ) : (
              <>
                Start Course
                <ChevronRight size={14} />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background lg:flex">
      <DashboardSidebar />

      <main className="flex-1 p-4 md:p-6 lg:p-10 overflow-x-hidden overflow-y-auto w-full">
        <DashboardHeader
          title="Courses"
          subtitle="Explore our curriculum and master new skills"
          user={user}
        />

        {searchQuery && (
          <div className="mb-8 p-4 rounded-xl bg-accent/10 border border-accent/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-foreground">
              Search results for <span className="font-bold text-accent">"{searchQuery}"</span>
            </div>
            <button 
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                newParams.delete("q");
                setSearchParams(newParams);
              }}
              className="text-sm px-3 py-1.5 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Continue Learning Section */}
        {inProgressCourses.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Play className="w-6 h-6 text-accent" />
                  Continue Where You Left Off
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Pick up right where you stopped
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {inProgressCourses.slice(0, 2).map((course) => (
                <div
                  key={course.id}
                  className="card-elevated p-6 hover:border-accent/20 transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(`/dashboard/courses/${course.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-accent/10 text-accent mb-3">
                        {course.category}
                      </span>
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {course.title}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center">
                      <BarChart3 className="w-8 h-8 text-accent" />
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>Your Progress</span>
                      <span className="font-bold text-accent">{course.progress}%</span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full transition-all duration-500 shadow-lg shadow-accent/20"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {course.completedLessons} / {course.totalLessons} lessons
                    </span>
                    <button className="text-sm font-medium text-accent hover:text-accent/80 transition-colors flex items-center gap-1">
                      Continue
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Courses Carousel */}
        {featuredCourses.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-accent" />
                  Featured Courses
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Handpicked courses to accelerate your learning
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} featured />
              ))}
            </div>
          </div>
        )}

        {/* Learning Path Visualization */}
        <div className="mb-12">
          <div className="card-elevated p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  Your Learning Path
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Track your progress across all courses
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-accent">
                  {Math.round((courses.filter(c => c.progress === 100).length / courses.length) * 100)}%
                </p>
                <p className="text-xs text-muted-foreground">Overall Progress</p>
              </div>
            </div>

            <div className="flex items-center gap-4 overflow-x-auto pb-4">
              {courses.slice(0, 6).map((course, idx) => (
                <div key={course.id} className="flex items-center gap-4 flex-shrink-0">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      course.progress === 100 
                        ? "bg-green-500/20 text-green-500 ring-2 ring-green-500/50" 
                        : course.isStarted 
                        ? "bg-accent/20 text-accent ring-2 ring-accent/50" 
                        : "bg-secondary text-muted-foreground"
                    }`}>
                      {course.progress === 100 ? (
                        <CheckCircle2 size={20} />
                      ) : course.isStarted ? (
                        `${course.progress}%`
                      ) : (
                        <Circle size={20} />
                      )}
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 text-center">
                      <p className="text-xs text-muted-foreground truncate">{course.title.split(':')[0]}</p>
                    </div>
                  </div>
                  {idx < 5 && (
                    <div className={`w-16 h-0.5 ${
                      courses[idx + 1]?.isStarted ? "bg-accent" : "bg-secondary"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters & View Controls */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            {/* Category Pills - Scrollable on mobile */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap no-scrollbar scroll-smooth">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View & Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 rounded-xl bg-secondary text-foreground text-sm font-medium border border-white/5 focus:outline-none focus:border-accent/50 transition-all"
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Newest First</option>
                <option value="progress">By Progress</option>
                <option value="duration">By Duration</option>
              </select>

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  showFilters ? "bg-accent text-accent-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-secondary rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid3x3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="card-elevated p-6 mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Difficulty Filter */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Difficulty Level
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(["all", "beginner", "intermediate", "advanced"] as DifficultyFilter[]).map((level) => (
                      <button
                        key={level}
                        onClick={() => setDifficultyFilter(level)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          difficultyFilter === level
                            ? "bg-accent text-accent-foreground"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Course Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(["all", "not-started", "in-progress", "completed"] as StatusFilter[]).map((status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          statusFilter === status
                            ? "bg-accent text-accent-foreground"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Courses Display */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">
              All Courses
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({filteredAndSortedCourses.length} {filteredAndSortedCourses.length === 1 ? 'course' : 'courses'})
              </span>
            </h2>
          </div>

          {filteredAndSortedCourses.length > 0 ? (
            <div className={
              viewMode === "grid" 
                ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" 
                : "space-y-4"
            }>
              {filteredAndSortedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="card-elevated p-12 text-center">
              <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters to see more courses
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setDifficultyFilter("all");
                  setStatusFilter("all");
                }}
                className="px-6 py-3 rounded-xl bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardCourses;