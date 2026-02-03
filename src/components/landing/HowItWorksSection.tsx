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
    <section id="how-it-works" className="section-padding bg-secondary relative overflow-hidden section-rounded-top">
      {/* Green glow effect - Shopify signature - hidden on mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-accent/5 blur-[100px] md:blur-[150px] rounded-full hidden md:block" />
      
      <div className="container-main relative" ref={ref}>
        {/* Header */}
        <div 
          className="text-center max-w-3xl mx-auto mb-12 md:mb-20"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-display-md text-foreground mb-4 md:mb-6">
            How VibeAI works
          </h2>
          <p className="text-base md:text-body-lg text-muted-foreground">
            A clear path from AI curious to AI confident.
          </p>
        </div>

        {/* Steps Grid - Shopify-style blended cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="glass-panel glass-panel-hover p-5 md:p-8 rounded-3xl group relative overflow-hidden"
              style={{
                transform: isInView ? "none" : "translateY(40px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.1 + index * 0.1}s`
              }}
            >
              {/* Animated Background Blob on Hover */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Icon with levitation effect */}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg">
                <step.icon className="w-6 h-6 text-accent group-hover:drop-shadow-[0_0_10px_rgba(180,255,50,0.5)] transition-all duration-300" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3 md:mb-4 group-hover:text-accent transition-colors duration-300">
                {step.title}
              </h3>
              
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80 transition-colors">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats row - Shopify style */}
        <div 
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center"
          style={{
            transform: isInView ? "none" : "translateY(30px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
          }}
        >
          <div>
            <p className="text-3xl md:text-5xl font-bold text-foreground mb-1 md:mb-2">2.5K+</p>
            <p className="text-xs md:text-base text-muted-foreground">Active learners</p>
          </div>
          <div>
            <p className="text-3xl md:text-5xl font-bold text-foreground mb-1 md:mb-2">50+</p>
            <p className="text-xs md:text-base text-muted-foreground">Courses</p>
          </div>
          <div>
            <p className="text-3xl md:text-5xl font-bold text-foreground mb-1 md:mb-2">4.9</p>
            <p className="text-xs md:text-base text-muted-foreground">Avg rating</p>
          </div>
          <div>
            <p className="text-3xl md:text-5xl font-bold text-accent mb-1 md:mb-2">95%</p>
            <p className="text-xs md:text-base text-muted-foreground">Completion rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
