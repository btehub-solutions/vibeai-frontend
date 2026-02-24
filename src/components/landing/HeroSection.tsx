import { Link } from "react-router-dom";
import { Play, ArrowRight, Star, Globe2 } from "lucide-react";
import { useEffect, useState } from "react";

const rotatingWords = [
  "AI fluent",
  "future ready",
  "prompt masters",
  "industry leaders",
  "career ready",
];

const HeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-background pt-24 lg:pt-0">
      {/* Subtle Background Elements (Desktop) */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* MOBILE BACKGROUND IMAGE: Absolutely positioned behind text on small screens */}
      {/* Enhanced visibility and beauty for mobile */}
      <div className="absolute inset-0 z-0 lg:hidden animate-fade-in pointer-events-none">
        <div className="absolute inset-0 bg-background/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,255,50,0.15)_0%,transparent_70%)] z-10" />
        <img 
          src="/hero-image.png" 
          alt="AI Background" 
          className="w-full h-full object-cover object-[center_top] opacity-80"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container-main py-12 md:py-24 flex items-center min-h-[calc(100vh-80px)]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column - Content */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left relative">
            {/* Subtle mobile glow behind text */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/20 blur-[100px] rounded-full lg:hidden pointer-events-none" />

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-sm font-medium mb-6 animate-fade-in-up backdrop-blur-md shadow-[0_0_20px_rgba(180,254,50,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              VibeAI Learning Platform Next-Gen
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-display-lg font-bold tracking-tight leading-[1.15] text-foreground mb-6 drop-shadow-sm">
              <span className="block animate-text-reveal">Be the next</span>
              <span className="block animate-text-reveal animate-delay-100 relative h-[1.3em] overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-full transition-transform duration-500 ease-out flex flex-col items-center lg:items-start"
                  style={{
                    transform: `translateY(-${currentWordIndex * (100 / rotatingWords.length)}%)`,
                  }}
                >
                  {rotatingWords.map((word, index) => (
                    <span 
                      key={index} 
                      className="block h-[1.3em] text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-400 to-teal-400 pb-2 whitespace-nowrap"
                      style={{ height: 'calc(1.3em)' }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="animate-text-reveal animate-delay-200 text-base md:text-xl text-muted-foreground/90 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light drop-shadow-md">
              AI is reshaping every industry. Don't get left behind. We provide professionals
              the skills, tools, and confidence to thrive alongside AI in the future.
            </p>

            {/* CTAs */}
            <div className="animate-text-reveal animate-delay-300 flex flex-col w-full sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/dashboard"
                className="btn-primary group w-full sm:w-auto text-center text-base md:text-lg font-semibold rounded-xl relative z-20 shadow-lg shadow-accent/20"
              >
                <span className="relative flex items-center justify-center gap-2 pointer-events-none">
                  <Star className="w-5 h-5 hidden sm:block" />
                  Start Your AI Journey
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              
              <a
                href="#the-story"
                className="group w-full sm:w-auto text-center px-8 py-4 text-base md:text-lg rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-foreground font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/20 flex items-center justify-center gap-2 shadow-lg"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                   <Play className="h-4 w-4" fill="currentColor" />
                </div>
                See the Story
              </a>
            </div>

            {/* Social proof */}
            <div className="animate-text-reveal animate-delay-400 mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {['JD', 'MS', 'AK', 'JL'].map((initials, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-background flex items-center justify-center text-xs font-bold text-accent shadow-lg">
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-foreground">2,500+</span>
                  <span className="text-xs">Active Learners</span>
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/10" />
              <div className="flex flex-col gap-1 items-center sm:items-start">
                <span className="flex items-center gap-1.5 font-semibold text-foreground">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9/5
                </span>
                <span className="text-xs flex items-center gap-1.5">
                   <Globe2 className="w-3.5 h-3.5" /> Global Community
                </span>
              </div>
            </div>

            {/* Mobile-only Floating Card for "Beauty" */}
            <div className="mt-12 lg:hidden animate-fade-in animate-delay-500">
               <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl inline-flex items-center gap-4 shadow-2xl">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Join the Elite</p>
                    <p className="text-foreground font-bold text-sm">Top 1% AI Talent</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column - Visual (Hidden on Mobile, Displayed side-by-side on Desktop) */}
          <div className="hidden lg:block relative w-full h-[700px] rounded-3xl overflow-hidden opacity-0 animate-fade-in animate-delay-300 shadow-[0_0_40px_-10px_rgba(180,255,50,0.2)] mt-8 lg:mt-0 group border border-white/5 bg-zinc-900/50">
             {/* Gradient Overlays for Blending */}
             <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent z-10 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-l from-background/40 to-transparent z-10 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10 pointer-events-none" />
             
             {/* The hyperrealistic image */}
             <img 
               src="/hero-image.png" 
               alt="Professional Human interacting with Humanoid AI" 
               className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[15s] ease-out group-hover:scale-110 z-0 opacity-90"
               loading="lazy"
               decoding="async"
             />

             {/* Floating Info Cards (Glassmorphism) */}
             <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row gap-4 justify-between pointer-events-none">
                <div className="bg-background/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 transition-transform duration-500 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 shadow-xl">
                   <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                   </div>
                   <div>
                     <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">ROI Boost</p>
                     <p className="text-foreground font-bold">+340%</p>
                   </div>
                </div>

                <div className="bg-background/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 transition-transform duration-500 delay-100 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 shadow-xl">
                   <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                   </div>
                   <div>
                     <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">AI Integration</p>
                     <p className="text-foreground font-bold">Seamless</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
