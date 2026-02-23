import { useRef } from "react";
import { useInView } from "framer-motion";
import { Sparkles, Globe, Wifi, Clock } from "lucide-react";

const GlobalReachSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Deep background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-background to-background" />
      
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-accent/8 blur-[100px] md:blur-[120px] rounded-full hidden md:block" />
      <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-emerald-500/10 blur-[80px] md:blur-[100px] rounded-full hidden md:block" />
      
      <div className="container-main relative" ref={ref}>
        {/* Header */}
        <div 
          className="max-w-3xl mb-12 md:mb-24"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Globe className="w-3 h-3 text-accent" />
            <span className="text-xs md:text-sm text-accent font-medium tracking-wide uppercase">Global Scale</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-display-md lg:text-display-lg text-foreground mb-4 md:mb-6">
            Learn at the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">speed of AI</span>
          </h2>
          <p className="text-base md:text-body-lg text-muted-foreground max-w-xl">
            Access cutting-edge AI education from anywhere. Our platform delivers 
            content optimized for how you learn best.
          </p>
        </div>

        {/* Main visual container - Network visualization */}
        <div 
          className="relative"
          style={{
            transform: isInView ? "none" : "translateY(60px)",
            opacity: isInView ? 1 : 0,
            transition: "all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
          }}
        >
          {/* Globe/visual container */}
          <div className="relative aspect-[4/3] md:aspect-[16/8] rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.06] backdrop-blur-xl" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)' }}>
            {/* Dark gradient background with glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-emerald-950/20" />
            
            {/* Central glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] md:w-[80%] md:h-[80%] bg-accent/5 blur-[60px] md:blur-[80px] rounded-full" />
            
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
              <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(85 100% 60% / 0.1)" />
                    <stop offset="50%" stopColor="hsl(85 100% 60% / 0.6)" />
                    <stop offset="100%" stopColor="hsl(85 100% 60% / 0.1)" />
                  </linearGradient>
                </defs>
                
                {/* Connection arcs */}
                <path 
                  d="M150,300 Q400,50 650,280" 
                  fill="none" 
                  stroke="url(#lineGrad)" 
                  strokeWidth="1.5"
                  className="animate-pulse"
                  style={{ animationDuration: "3s" }}
                />
                <path 
                  d="M100,200 Q300,100 500,150" 
                  fill="none" 
                  stroke="url(#lineGrad)" 
                  strokeWidth="1"
                  className="animate-pulse hidden md:block"
                  style={{ animationDuration: "4s", animationDelay: "1s" }}
                />
                <path 
                  d="M300,350 Q500,200 700,300" 
                  fill="none" 
                  stroke="url(#lineGrad)" 
                  strokeWidth="1"
                  className="animate-pulse hidden md:block"
                  style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}
                />
                
                {/* Node points with glow */}
                <circle cx="150" cy="300" r="4" fill="hsl(85 90% 55%)" className="animate-pulse" />
                <circle cx="150" cy="300" r="10" fill="hsl(85 90% 55% / 0.2)" className="animate-pulse" />
                
                <circle cx="400" cy="120" r="4" fill="hsl(85 90% 55%)" className="animate-pulse" style={{ animationDelay: "0.3s" }} />
                <circle cx="400" cy="120" r="10" fill="hsl(85 90% 55% / 0.2)" className="animate-pulse" style={{ animationDelay: "0.3s" }} />
                
                <circle cx="650" cy="280" r="4" fill="hsl(85 90% 55%)" className="animate-pulse" style={{ animationDelay: "0.6s" }} />
                <circle cx="650" cy="280" r="10" fill="hsl(85 90% 55% / 0.2)" className="animate-pulse" style={{ animationDelay: "0.6s" }} />
              </svg>
            </div>

            {/* Light scatter points */}
            {[
              { top: "20%", left: "30%", delay: "0s" },
              { top: "40%", left: "60%", delay: "0.5s" },
              { top: "60%", left: "45%", delay: "1s" },
              { top: "30%", left: "75%", delay: "0.8s" },
            ].map((dot, i) => (
              <div 
                key={i}
                className="absolute w-1.5 h-1.5 bg-accent rounded-full animate-pulse hidden md:block"
                style={{ top: dot.top, left: dot.left, animationDelay: dot.delay }}
              />
            ))}
          </div>

          {/* Floating stats cards - glassmorphism */}
          <div 
            className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 md:bottom-8 md:left-8 backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] p-3 sm:p-4 md:p-6 animate-float rounded-xl md:rounded-2xl shadow-2xl hover:border-accent/30 transition-colors duration-500"
            style={{ animationDelay: "0.5s" }}
          >
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Countries
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">40+</p>
            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">learners worldwide</p>
          </div>

          {/* Floating stat card - right */}
          <div 
            className="absolute bottom-2 right-2 sm:bottom-12 sm:right-4 md:bottom-16 md:right-8 backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] p-3 sm:p-4 md:p-6 animate-float rounded-xl md:rounded-2xl max-w-[45%] sm:max-w-none shadow-2xl hover:border-accent/30 transition-colors duration-500"
            style={{ animationDelay: "1s" }}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
              <span className="text-[9px] sm:text-xs uppercase tracking-wider text-accent font-medium">Every 60 seconds</span>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-foreground font-medium">
              A new learner starts their
            </p>
            <p className="text-xs sm:text-sm md:text-base text-accent font-semibold">
              AI journey with VibeAI
            </p>
          </div>
        </div>

        {/* Bento grid below - Quick facts */}
        <div 
          className="mt-8 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.6s"
          }}
        >
          <div className="sm:col-span-2 md:col-span-1 p-5 md:p-8 rounded-2xl md:rounded-3xl border border-white/[0.06] backdrop-blur-xl transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_40px_-15px_rgba(180,255,50,0.15)] group" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)' }}>
            <Wifi className="w-6 h-6 text-accent mb-4 group-hover:drop-shadow-[0_0_10px_rgba(180,255,50,0.4)] transition-all duration-300" />
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">Always Updated</h3>
            <p className="text-sm text-muted-foreground">Our curriculum updates weekly with the latest AI breakthroughs and tools.</p>
          </div>

          <div className="p-5 md:p-8 rounded-2xl md:rounded-3xl border border-white/[0.06] backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_40px_-15px_rgba(0,210,210,0.15)] group" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)' }}>
            <Clock className="w-6 h-6 text-cyan-400 mb-4 group-hover:drop-shadow-[0_0_10px_rgba(0,210,210,0.4)] transition-all duration-300" />
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-cyan-400 transition-colors duration-300">Learn Anytime</h3>
            <p className="text-sm text-muted-foreground">Flexible scheduling that fits your life. Learn at your own pace.</p>
          </div>

          <div className="p-5 md:p-8 rounded-2xl md:rounded-3xl border border-white/[0.06] backdrop-blur-xl transition-all duration-500 hover:border-purple-400/30 hover:shadow-[0_0_40px_-15px_rgba(160,80,255,0.15)] group" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)' }}>
            <Globe className="w-6 h-6 text-purple-400 mb-4 group-hover:drop-shadow-[0_0_10px_rgba(160,80,255,0.4)] transition-all duration-300" />
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-purple-400 transition-colors duration-300">Global Community</h3>
            <p className="text-sm text-muted-foreground">Connect with learners from over 40 countries all united by AI.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalReachSection;
