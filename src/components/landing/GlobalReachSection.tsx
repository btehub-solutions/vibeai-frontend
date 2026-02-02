import { useRef } from "react";
import { useInView } from "framer-motion";
import { Sparkles } from "lucide-react";

const GlobalReachSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Deep background gradient - Shopify globe-style */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-background to-background" />
      
      {/* Multiple ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent/8 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full" />
      
      <div className="container-main relative" ref={ref}>
        {/* Header */}
        <div 
          className="max-w-3xl mb-16 md:mb-24"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <h2 className="text-display-sm md:text-display-md lg:text-display-lg text-foreground mb-6">
            Learn at the speed of AI
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-xl">
            Access cutting-edge AI education from anywhere. Our platform delivers 
            content optimized for how you learn best.
          </p>
        </div>

        {/* Main visual container - Shopify globe-style artwork */}
        <div 
          className="relative"
          style={{
            transform: isInView ? "none" : "translateY(60px)",
            opacity: isInView ? 1 : 0,
            transition: "all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
          }}
        >
          {/* Globe/visual container */}
          <div className="relative aspect-[16/10] md:aspect-[16/8] rounded-3xl overflow-hidden border border-white/[0.06]">
            {/* Dark gradient background with glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-emerald-950/20" />
            
            {/* Central glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/5 blur-[80px] rounded-full" />
            
            {/* Network grid pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(160 30% 30%)" strokeWidth="0.3"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>

            {/* Connection lines - animated */}
            <div className="absolute inset-0">
              <svg className="w-full h-full" viewBox="0 0 800 400">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(75 90% 55% / 0.1)" />
                    <stop offset="50%" stopColor="hsl(75 90% 55% / 0.6)" />
                    <stop offset="100%" stopColor="hsl(75 90% 55% / 0.1)" />
                  </linearGradient>
                </defs>
                
                {/* Connection arcs */}
                <path 
                  d="M150,300 Q400,50 650,280" 
                  fill="none" 
                  stroke="url(#lineGradient)" 
                  strokeWidth="1.5"
                  className="animate-pulse"
                  style={{ animationDuration: "3s" }}
                />
                <path 
                  d="M100,200 Q300,100 500,150" 
                  fill="none" 
                  stroke="url(#lineGradient)" 
                  strokeWidth="1"
                  className="animate-pulse"
                  style={{ animationDuration: "4s", animationDelay: "1s" }}
                />
                <path 
                  d="M300,350 Q500,200 700,300" 
                  fill="none" 
                  stroke="url(#lineGradient)" 
                  strokeWidth="1"
                  className="animate-pulse"
                  style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}
                />
                
                {/* Node points with glow */}
                <circle cx="150" cy="300" r="4" fill="hsl(75 90% 55%)" className="animate-pulse" />
                <circle cx="150" cy="300" r="8" fill="hsl(75 90% 55% / 0.3)" className="animate-pulse" />
                
                <circle cx="400" cy="120" r="4" fill="hsl(75 90% 55%)" className="animate-pulse" style={{ animationDelay: "0.3s" }} />
                <circle cx="400" cy="120" r="8" fill="hsl(75 90% 55% / 0.3)" className="animate-pulse" style={{ animationDelay: "0.3s" }} />
                
                <circle cx="650" cy="280" r="4" fill="hsl(75 90% 55%)" className="animate-pulse" style={{ animationDelay: "0.6s" }} />
                <circle cx="650" cy="280" r="8" fill="hsl(75 90% 55% / 0.3)" className="animate-pulse" style={{ animationDelay: "0.6s" }} />
                
                <circle cx="500" cy="150" r="3" fill="hsl(160 60% 50%)" className="animate-pulse" />
                <circle cx="300" cy="350" r="3" fill="hsl(160 60% 50%)" className="animate-pulse" style={{ animationDelay: "0.4s" }} />
                <circle cx="700" cy="300" r="3" fill="hsl(160 60% 50%)" className="animate-pulse" style={{ animationDelay: "0.8s" }} />
              </svg>
            </div>

            {/* Light scatter points */}
            <div className="absolute top-[20%] left-[30%] w-1 h-1 bg-accent rounded-full animate-pulse" />
            <div className="absolute top-[40%] left-[60%] w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="absolute top-[60%] left-[45%] w-1 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-[30%] left-[75%] w-1 h-1 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: "0.8s" }} />
          </div>

          {/* Floating stats card - left */}
          <div 
            className="absolute bottom-4 left-4 md:bottom-8 md:left-8 card-elevated p-4 md:p-6 animate-float"
            style={{ animationDelay: "0.5s" }}
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 md:mb-2">
              Countries
            </p>
            <p className="text-2xl md:text-3xl font-bold text-foreground">40+</p>
            <p className="text-xs md:text-sm text-muted-foreground">learners worldwide</p>
          </div>

          {/* Floating stat card - right with accent */}
          <div 
            className="absolute bottom-12 right-4 md:bottom-16 md:right-8 card-elevated p-4 md:p-6 animate-float border-accent/20"
            style={{ animationDelay: "1s" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs uppercase tracking-wider text-accent font-medium">Every 60 seconds</span>
            </div>
            <p className="text-sm md:text-base text-foreground font-medium">
              A new learner starts their
            </p>
            <p className="text-sm md:text-base text-accent font-semibold">
              AI journey with VibeAI
            </p>
          </div>
        </div>

        {/* Innovation section below */}
        <div 
          className="mt-20 md:mt-32 max-w-3xl"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.6s"
          }}
        >
          <h3 className="text-display-xs md:text-display-sm text-foreground mb-6">
            VibeAI never stops evolving
          </h3>
          <p className="text-body-lg text-muted-foreground">
            Our curriculum updates weekly with the latest AI breakthroughs. 
            New tools, new techniques, new opportunities—delivered to you first.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GlobalReachSection;
