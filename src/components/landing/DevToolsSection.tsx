import { useRef } from "react";
import { useInView } from "framer-motion";

const DevToolsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-secondary relative overflow-hidden section-rounded-top">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-secondary to-secondary" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/8 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full" />
      
      {/* Floating app icons - top decoration */}
      <div className="absolute top-8 left-0 right-0 overflow-hidden opacity-40">
        <div className="flex gap-4 animate-float" style={{ animationDuration: "8s" }}>
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex-shrink-0"
            />
          ))}
        </div>
      </div>
      
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
            By learners,<br />
            <span className="text-muted-foreground">for learners</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-xl">
            <span className="text-foreground underline decoration-accent/50 underline-offset-4">Courses, tools, and community</span> designed 
            by AI practitioners who understand what it takes to truly master this technology.
          </p>
        </div>

        {/* Layered mockup composition - Shopify style */}
        <div 
          className="relative"
          style={{
            transform: isInView ? "none" : "translateY(60px)",
            opacity: isInView ? 1 : 0,
            transition: "all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
          }}
        >
          {/* Main container for layered elements */}
          <div className="relative aspect-[16/10] md:aspect-[16/8]">
            
            {/* Back layer - Dashboard mockup */}
            <div className="absolute left-0 top-0 w-[75%] md:w-[60%] h-[85%] rounded-2xl md:rounded-3xl border border-white/[0.08] overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 to-slate-950 z-10">
              {/* Window header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-slate-900/80">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="ml-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="hidden md:inline">VibeAI Dashboard</span>
                </div>
              </div>
              
              {/* Dashboard content */}
              <div className="p-4 md:p-6 flex gap-4 md:gap-6">
                {/* Sidebar */}
                <div className="w-32 md:w-40 space-y-2 hidden md:block">
                  <div className="h-8 rounded-lg bg-accent/20 border border-accent/30" />
                  <div className="h-8 rounded-lg bg-white/5" />
                  <div className="h-8 rounded-lg bg-white/5" />
                  <div className="h-8 rounded-lg bg-white/5" />
                  <div className="h-8 rounded-lg bg-white/5" />
                </div>
                
                {/* Main content */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-16 md:h-20 rounded-xl bg-white/5 border border-white/[0.06]" />
                    <div className="h-16 md:h-20 rounded-xl bg-white/5 border border-white/[0.06]" />
                  </div>
                  <div className="h-24 md:h-32 rounded-xl bg-white/5 border border-white/[0.06]" />
                </div>
              </div>
            </div>

            {/* Middle layer - Terminal/Console */}
            <div className="absolute right-[5%] md:right-[10%] top-[10%] w-[55%] md:w-[45%] rounded-xl md:rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl bg-slate-950 z-20">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 border-b border-white/[0.06] bg-slate-900/80">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-4 text-[10px] md:text-xs text-muted-foreground font-mono">Terminal</span>
              </div>
              
              {/* Terminal content */}
              <div className="p-3 md:p-4 font-mono text-[10px] md:text-xs space-y-1 md:space-y-2">
                <p className="text-muted-foreground">? Your course name?</p>
                <p className="text-accent">✓ prompt-engineering-101</p>
                <p className="text-white/60 mt-2">── success ──────────────────</p>
                <p className="text-emerald-400">Course is ready to learn!</p>
                <p className="text-white/50 mt-2">Next steps:</p>
                <p className="text-white/70">• Start with <span className="text-cyan-400">Module 1</span></p>
                <p className="text-white/70">• Join the <span className="text-cyan-400">community</span></p>
              </div>
            </div>

            {/* Front layer - Mobile device */}
            <div className="absolute right-0 bottom-0 w-[35%] md:w-[25%] aspect-[9/16] max-h-[90%] rounded-2xl md:rounded-3xl border border-white/[0.08] overflow-hidden shadow-2xl bg-slate-900 z-30">
              {/* Phone notch */}
              <div className="flex justify-center pt-2">
                <div className="w-16 md:w-20 h-4 md:h-5 bg-black rounded-full" />
              </div>
              
              {/* Phone content */}
              <div className="p-3 md:p-4 mt-2 space-y-3">
                <div className="h-6 md:h-8 rounded-lg bg-white/10 w-3/4" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-square rounded-lg bg-accent/20 border border-accent/30" />
                  <div className="aspect-square rounded-lg bg-white/5" />
                  <div className="aspect-square rounded-lg bg-white/5" />
                  <div className="aspect-square rounded-lg bg-white/5" />
                </div>
                <div className="h-8 md:h-10 rounded-xl bg-accent/30 mt-4 flex items-center justify-center">
                  <span className="text-[10px] md:text-xs text-accent font-medium">Continue</span>
                </div>
              </div>
            </div>

            {/* Floating accent elements */}
            <div className="absolute top-[20%] right-[35%] w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center z-40 animate-float shadow-lg shadow-cyan-500/30">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>

            <div className="absolute bottom-[30%] right-[25%] w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center z-40 animate-float shadow-lg shadow-violet-500/30" style={{ animationDelay: "1s" }}>
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevToolsSection;
