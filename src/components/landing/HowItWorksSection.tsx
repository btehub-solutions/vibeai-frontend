import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { BookOpen, Zap, Trophy, Users } from "lucide-react";

const steps = [
  {
    icon: BookOpen,
    step: "01",
    title: "Learn the fundamentals",
    description: "Start with clear, structured content that builds your AI foundation step by step. From theory to practice.",
    color: "accent",
    glowClass: "from-accent/30 to-emerald-500/30",
    borderColor: "border-accent/30",
  },
  {
    icon: Zap,
    step: "02",
    title: "Practice with real tools",
    description: "Get hands-on with ChatGPT, Claude, Midjourney, and other industry-leading AI tools in guided labs.",
    color: "cyan",
    glowClass: "from-cyan-400/30 to-blue-500/30",
    borderColor: "border-cyan-400/30",
  },
  {
    icon: Users,
    step: "03",
    title: "Learn from experts",
    description: "Watch real professionals use AI to solve real problems. No abstract theory — just practical wisdom.",
    color: "purple",
    glowClass: "from-purple-400/30 to-violet-500/30",
    borderColor: "border-purple-400/30",
  },
  {
    icon: Trophy,
    step: "04",
    title: "Build & get certified",
    description: "Complete portfolio-ready projects, earn certificates, and join a thriving community of AI practitioners.",
    color: "amber",
    glowClass: "from-amber-400/30 to-orange-500/30",
    borderColor: "border-amber-400/30",
  },
];

const colorMap: Record<string, string> = {
  accent: "text-accent",
  cyan: "text-cyan-400",
  purple: "text-purple-400",
  amber: "text-amber-400",
};

const dropShadowMap: Record<string, string> = {
  accent: "drop-shadow-[0_0_12px_rgba(180,255,50,0.5)]",
  cyan: "drop-shadow-[0_0_12px_rgba(0,210,210,0.5)]",
  purple: "drop-shadow-[0_0_12px_rgba(160,80,255,0.5)]",
  amber: "drop-shadow-[0_0_12px_rgba(255,180,50,0.5)]",
};

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="how-it-works" className="section-padding bg-secondary relative overflow-hidden section-rounded-top">
      {/* Green glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-accent/5 blur-[100px] md:blur-[150px] rounded-full hidden md:block" />
      
      {/* Animated grid pattern background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full" style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>
      
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs md:text-sm text-accent font-medium tracking-wide uppercase">Your Journey</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-display-md text-foreground mb-4 md:mb-6">
            How VibeAI works
          </h2>
          <p className="text-base md:text-body-lg text-muted-foreground">
            A clear path from AI curious to AI confident. Four simple steps.
          </p>
        </div>

        {/* Steps Grid - Glassmorphism cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`relative p-5 md:p-8 rounded-2xl md:rounded-3xl group overflow-hidden transition-all duration-700 backdrop-blur-xl border border-white/[0.06] hover:border-white/[0.12] cursor-default`}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                transform: isInView ? (hoveredIndex === index ? "translateY(-8px)" : "none") : "translateY(40px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.1 + index * 0.1}s`,
                boxShadow: hoveredIndex === index ? `0 20px 60px -15px rgba(180,255,50,0.1)` : 'none',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Hover background blob */}
              <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${step.glowClass} blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              {/* Step number */}
              <span className={`absolute top-4 right-4 md:top-6 md:right-6 text-4xl md:text-6xl font-bold opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-500 select-none`}>
                {step.step}
              </span>
              
              {/* Icon with glow effect */}
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${step.glowClass} ${step.borderColor} border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg relative`}>
                <step.icon className={`w-6 h-6 ${colorMap[step.color]} group-hover:${dropShadowMap[step.color]} transition-all duration-300`} />
              </div>
              
              <h3 className={`text-xl font-bold text-foreground mb-3 md:mb-4 group-hover:${colorMap[step.color]} transition-colors duration-300`}>
                {step.title}
              </h3>
              
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Bottom connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 w-6 h-[2px] bg-gradient-to-r from-white/10 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Stats row with glassmorphism */}
        <div 
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          style={{
            transform: isInView ? "none" : "translateY(30px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
          }}
        >
          {[
            { value: "2.5K+", label: "Active learners", color: "text-foreground" },
            { value: "50+", label: "Courses", color: "text-foreground" },
            { value: "4.9", label: "Avg rating", color: "text-foreground" },
            { value: "95%", label: "Completion rate", color: "text-accent" },
          ].map((stat, i) => (
            <div 
              key={stat.label}
              className="text-center p-4 md:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-accent/20 hover:bg-accent/[0.03] transition-all duration-500 group"
            >
              <p className={`text-3xl md:text-5xl font-bold ${stat.color} mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300`}>{stat.value}</p>
              <p className="text-xs md:text-base text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
