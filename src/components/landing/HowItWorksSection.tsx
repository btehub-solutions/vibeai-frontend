import { useRef } from "react";
import { useInView } from "framer-motion";
import { BookOpen, Zap, Trophy, Users } from "lucide-react";

const steps = [
  {
    icon: BookOpen,
    title: "Learn the fundamentals",
    description: "Start with clear, structured content that builds your AI foundation step by step.",
  },
  {
    icon: Zap,
    title: "Practice with real tools",
    description: "Get hands-on with ChatGPT, Claude, Midjourney, and other industry-leading AI tools.",
  },
  {
    icon: Users,
    title: "Learn from experts",
    description: "Watch real professionals use AI to solve real problems. No abstract theory.",
  },
  {
    icon: Trophy,
    title: "Build real skills",
    description: "Complete projects, earn certificates, and join a community of AI practitioners.",
  },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="section-padding bg-atmosphere-indigo relative overflow-hidden section-rounded-top">
      {/* Ambient glow effects */}
      <div 
        className="absolute top-20 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsla(235, 50%, 25%, 0.15) 0%, transparent 70%)'
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsla(188, 45%, 22%, 0.12) 0%, transparent 70%)'
        }}
      />
      
      <div className="container-main relative" ref={ref}>
        {/* Header */}
        <div 
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <h2 className="text-display-sm md:text-display-md text-foreground mb-6">
            How VibeAI works
          </h2>
          <p className="text-body-lg text-muted-foreground">
            A clear path from AI curious to AI confident.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="glass-indigo p-6 md:p-8 group rounded-3xl relative overflow-hidden"
              style={{
                transform: isInView ? "none" : "translateY(40px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.1 + index * 0.1}s`
              }}
            >
              {/* Icon */}
              <div 
                className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
                style={{
                  background: 'hsla(235, 50%, 25%, 0.3)',
                  boxShadow: '0 0 30px hsla(235, 50%, 25%, 0.2)'
                }}
              >
                <step.icon className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
              </div>
              
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 group-hover:text-muted-foreground transition-colors duration-300">
                {step.title}
              </h3>
              
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {step.description}
              </p>
              
              {/* Hover glow */}
              <div className="glow-overlay-indigo opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div 
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          style={{
            transform: isInView ? "none" : "translateY(30px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
          }}
        >
          {[
            { value: "2.5K+", label: "Active learners" },
            { value: "50+", label: "Courses" },
            { value: "4.9", label: "Avg rating" },
            { value: "95%", label: "Completion rate" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">{stat.value}</p>
              <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;