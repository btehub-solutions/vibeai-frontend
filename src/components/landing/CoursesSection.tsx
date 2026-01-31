import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const courses = [
  {
    title: "ChatGPT Mastery",
    description: "Master conversational AI from basics to advanced prompting techniques.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop&q=80",
    duration: "6 hours",
    students: "2.3k",
    level: "Beginner",
  },
  {
    title: "Prompt Engineering",
    description: "Learn to craft effective prompts that get consistent, quality results.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80",
    duration: "8 hours",
    students: "1.8k",
    level: "Intermediate",
  },
  {
    title: "AI for Business",
    description: "Apply AI tools strategically to drive business growth and efficiency.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&q=80",
    duration: "10 hours",
    students: "1.2k",
    level: "Advanced",
  },
  {
    title: "Creative AI Tools",
    description: "Explore Midjourney, DALL-E, and other AI tools for creative work.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop&q=80",
    duration: "5 hours",
    students: "2.1k",
    level: "Beginner",
  },
];

const CoursesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="courses" className="section-padding bg-background relative overflow-hidden">
      <div className="container-main relative" ref={ref}>
        {/* Header */}
        <div 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <div className="max-w-2xl">
            <h2 className="text-display-sm md:text-display-md text-foreground mb-6">
              Featured courses
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Structured learning paths designed for real-world application.
            </p>
          </div>
          
          <Link 
            to="/dashboard/courses" 
            className="btn-secondary text-sm px-6 py-3 inline-flex items-center gap-2 w-fit"
          >
            View all courses
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <div
              key={course.title}
              className="card-feature group cursor-pointer"
              style={{
                transform: isInView ? "none" : "translateY(40px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.1 + index * 0.1}s`
              }}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                
                {/* Level badge */}
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-foreground text-xs font-medium border border-white/10">
                  {course.level}
                </span>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-muted-foreground transition-colors duration-300 mb-2">
                  {course.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
                  {course.description}
                </p>
                
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={14} />
                    {course.students} students
                  </span>
                </div>
              </div>
              
              {/* Glow overlay */}
              <div className="glow-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
