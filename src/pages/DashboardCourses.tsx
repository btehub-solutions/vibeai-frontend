import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Play, Clock, BookOpen, ChevronRight } from "lucide-react";
import { useState } from "react";

const courses = [
  {
    id: 1,
    title: "Introduction to Large Language Models",
    description:
      "Understand the fundamentals of LLMs, how they work, and their real-world applications.",
    progress: 65,
    lessons: 12,
    completedLessons: 8,
    duration: "4 hours",
    category: "Fundamentals",
  },
  {
    id: 2,
    title: "Prompt Engineering Fundamentals",
    description:
      "Master the art of crafting effective prompts to get the best results from AI systems.",
    progress: 40,
    lessons: 10,
    completedLessons: 4,
    duration: "3 hours",
    category: "Skills",
  },
  {
    id: 3,
    title: "AI for Business Applications",
    description:
      "Learn how to implement AI solutions in business contexts for maximum impact.",
    progress: 20,
    lessons: 15,
    completedLessons: 3,
    duration: "5 hours",
    category: "Business",
  },
  {
    id: 4,
    title: "Understanding Neural Networks",
    description:
      "A deep dive into the architecture and mathematics behind neural networks.",
    progress: 0,
    lessons: 8,
    completedLessons: 0,
    duration: "3 hours",
    category: "Fundamentals",
  },
  {
    id: 5,
    title: "AI Image Generation Masterclass",
    description:
      "Create stunning visuals using AI tools like Midjourney and DALL-E.",
    progress: 0,
    lessons: 14,
    completedLessons: 0,
    duration: "4.5 hours",
    category: "Creative",
  },
  {
    id: 6,
    title: "RAG Systems and Vector Databases",
    description:
      "Build intelligent retrieval systems that combine AI with your own data.",
    progress: 0,
    lessons: 11,
    completedLessons: 0,
    duration: "4 hours",
    category: "Advanced",
  },
];

const categories = ["All", "Fundamentals", "Skills", "Business", "Creative", "Advanced"];

const DashboardCourses = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <DashboardHeader
          title="Courses"
          subtitle="Continue learning or start something new"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
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
              className="glass-card p-6 group hover:border-primary/30 transition-all duration-300"
            >
              {/* Category Badge */}
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground mb-4">
                {course.category}
              </span>

              {/* Title & Description */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {course.description}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <BookOpen size={12} />
                  {course.lessons} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {course.duration}
                </span>
              </div>

              {/* Progress */}
              {course.progress > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>
                      {course.completedLessons}/{course.lessons} lessons
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* CTA */}
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-all duration-200 bg-white/5 text-foreground hover:bg-primary hover:text-primary-foreground group-hover:bg-primary/10">
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
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardCourses;