import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Play, Clock, BookOpen, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { courses, categories } from "@/data/courses";

const DashboardCourses = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <DashboardHeader
          title="Courses"
          subtitle="Continue learning or start something new"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="card-elevated p-6 group hover:border-accent/20 transition-all duration-300 flex flex-col"
            >
              {/* Category Badge */}
              <span className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground mb-5 self-start">
                {course.category}
              </span>

              {/* Title & Description */}
              <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-5 line-clamp-2 flex-1">
                {course.description}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-5 text-xs text-muted-foreground mb-5">
                <span className="flex items-center gap-1.5">
                  <BookOpen size={12} />
                  {course.lessons} lessons
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {course.duration}
                </span>
              </div>

              {/* Progress */}
              {course.progress > 0 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>{course.completedLessons}/{course.lessons}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* CTA */}
              <Link 
                to={`/dashboard/courses/${course.id}`}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                {course.progress > 0 ? (
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
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardCourses;