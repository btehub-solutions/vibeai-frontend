import { Zap, Target, Compass, TrendingUp } from "lucide-react";

const ProblemSolutionSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container-narrow mx-auto relative z-10">
        {/* Problem Statement */}
        <div className="text-center mb-20">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
            The Challenge
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            AI is everywhere.<br />
            <span className="text-muted-foreground">Understanding it shouldn't be hard.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The AI landscape moves fast. New tools launch daily. Information is scattered, 
            often overwhelming, and rarely structured for real understanding.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <div className="glass-card p-8">
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-6">
              <Compass className="w-6 h-6 text-destructive/80" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Scattered Learning Resources
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              YouTube tutorials, Twitter threads, blog posts, courses scattered everywhere. 
              No clear path from beginner to competent.
            </p>
          </div>

          <div className="glass-card p-8">
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-destructive/80" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Rapidly Changing Landscape
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              What you learned last month might already be outdated. 
              Keeping up feels like a full-time job.
            </p>
          </div>
        </div>

        {/* Solution Statement */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
            The Solution
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            VibeAI brings clarity
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One platform. Structured learning paths. Current, curated content. 
            Learn AI the way it should be taught.
          </p>
        </div>

        {/* Solution Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-8 border-primary/20">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Structured Learning Paths
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Clear progression from fundamentals to advanced concepts. 
              Each module builds on the last, creating deep understanding.
            </p>
          </div>

          <div className="glass-card p-8 border-primary/20">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Always Current Content
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Our content evolves with the AI landscape. 
              Learn what's relevant today, prepared for tomorrow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;