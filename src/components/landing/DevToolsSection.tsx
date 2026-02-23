import { useRef } from "react";
import { useInView } from "framer-motion";
import { Code2, Layers, Rocket, CheckCircle2 } from "lucide-react";

const DevToolsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-secondary relative overflow-hidden section-rounded-top">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-secondary to-secondary" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-indigo-500/8 blur-[100px] md:blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-accent/5 blur-[80px] md:blur-[120px] rounded-full" />
      
      {/* Floating app icons */}
      <div className="absolute top-8 left-0 right-0 overflow-hidden opacity-40 hidden md:block">
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
          className="max-w-3xl mb-10 md:mb-24"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <Code2 className="w-3 h-3 text-accent" />
            <span className="text-xs md:text-sm text-muted-foreground">Our Platform</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-display-md lg:text-display-lg text-foreground mb-4 md:mb-6">
            By learners,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">for learners</span>
          </h2>
          <p className="text-base md:text-body-lg text-muted-foreground max-w-xl">
            <span className="text-foreground underline decoration-accent/50 underline-offset-4">Courses, tools, and community</span> designed 
            by AI practitioners who understand what it takes to truly master this technology.
          </p>
        </div>

        {/* Layered mockup composition */}
        <div 
          className="relative"
          style={{
            transform: isInView ? "none" : "translateY(60px)",
            opacity: isInView ? 1 : 0,
            transition: "all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
          }}
        >
          <div className="relative aspect-[4/3] md:aspect-[16/8]">
            
            {/* Back layer - Dashboard mockup */}
            <div className="absolute left-0 top-0 w-full md:w-[60%] h-[70%] md:h-[85%] rounded-xl md:rounded-3xl border border-white/[0.08] overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 to-slate-950 z-10 hover:border-accent/20 transition-colors duration-500">
              {/* Window header */}
              <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 border-b border-white/[0.06] bg-slate-900/80">
                <div className="flex gap-1">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500/80" />
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="ml-2 md:ml-4 flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground">
                  <span className="hidden sm:inline">VibeAI Dashboard</span>
                </div>
              </div>
              
              {/* Dashboard content */}
              <div className="p-3 md:p-6 flex gap-3 md:gap-6">
                {/* Sidebar */}
                <div className="w-24 md:w-40 space-y-2 hidden sm:block">
                  <div className="h-6 md:h-8 rounded-lg bg-accent/20 border border-accent/30" />
                  <div className="h-6 md:h-8 rounded-lg bg-white/5" />
                  <div className="h-6 md:h-8 rounded-lg bg-white/5" />
                  <div className="h-6 md:h-8 rounded-lg bg-white/5" />
                </div>
                
                {/* Main content */}
                <div className="flex-1 space-y-3 md:space-y-4">
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    <div className="h-12 md:h-20 rounded-lg md:rounded-xl bg-white/5 border border-white/[0.06]" />
                    <div className="h-12 md:h-20 rounded-lg md:rounded-xl bg-white/5 border border-white/[0.06]" />
                  </div>
                  <div className="h-16 md:h-32 rounded-lg md:rounded-xl bg-white/5 border border-white/[0.06]" />
                </div>
              </div>
            </div>

            {/* Middle layer - Terminal/Console */}
            <div className="absolute right-0 sm:right-[5%] md:right-[10%] top-[50%] sm:top-[10%] w-[70%] sm:w-[55%] md:w-[45%] rounded-lg md:rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl bg-slate-950 z-20 hover:border-accent/20 transition-colors duration-500">
              {/* Terminal header */}
              <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-1.5 md:py-3 border-b border-white/[0.06] bg-slate-900/80">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-2 md:ml-4 text-[8px] md:text-xs text-muted-foreground font-mono">Terminal</span>
              </div>
              
              {/* Terminal content */}
              <div className="p-2 md:p-4 font-mono text-[8px] md:text-xs space-y-1">
                <p className="text-muted-foreground">? Your course name?</p>
                <p className="text-accent flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" /> prompt-engineering-101</p>
                <p className="text-white/60 mt-1 md:mt-2 hidden sm:block">── success ──────────</p>
                <p className="text-emerald-400">Course is ready to learn!</p>
              </div>
            </div>

            {/* Front layer - Mobile device */}
            <div className="absolute right-0 bottom-0 w-[30%] md:w-[25%] aspect-[9/16] max-h-[70%] md:max-h-[90%] rounded-xl md:rounded-3xl border border-white/[0.08] overflow-hidden shadow-2xl bg-slate-900 z-30 hidden sm:block hover:border-accent/20 transition-colors duration-500">
              <div className="flex justify-center pt-1.5 md:pt-2">
                <div className="w-10 md:w-20 h-3 md:h-5 bg-black rounded-full" />
              </div>
              <div className="p-2 md:p-4 mt-1 md:mt-2 space-y-2 md:space-y-3">
                <div className="h-5 md:h-8 rounded-lg bg-white/10 w-3/4" />
                <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                  <div className="aspect-square rounded-lg bg-accent/20 border border-accent/30" />
                  <div className="aspect-square rounded-lg bg-white/5" />
                  <div className="aspect-square rounded-lg bg-white/5" />
                  <div className="aspect-square rounded-lg bg-white/5" />
                </div>
              </div>
            </div>

            {/* Floating accent elements */}
            <div className="absolute top-[20%] right-[35%] w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 items-center justify-center z-40 animate-float shadow-lg shadow-cyan-500/30 hidden md:flex">
              <Layers className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>

            <div className="absolute bottom-[30%] right-[25%] w-6 h-6 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 items-center justify-center z-40 animate-float shadow-lg shadow-violet-500/30 hidden md:flex" style={{ animationDelay: "1s" }}>
              <Rocket className="w-3 h-3 md:w-5 md:h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevToolsSection;
