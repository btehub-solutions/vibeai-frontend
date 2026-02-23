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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 container-main pt-24 pb-16 md:pt-32 md:pb-24 flex items-center min-h-[calc(100vh-80px)]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column - Content */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              VibeAI Learning Platform Next-Gen
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-display-lg font-bold tracking-tight leading-[1.1] text-foreground mb-6">
              <span className="block animate-text-reveal">Be the next</span>
              <span className="block animate-text-reveal animate-delay-100 relative h-[1.2em] overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-full transition-transform duration-500 ease-out flex flex-col items-center lg:items-start"
                  style={{
                    transform: `translateY(-${currentWordIndex * (100 / rotatingWords.length)}%)`,
                  }}
                >
                  {rotatingWords.map((word, index) => (
                    <span 
                      key={index} 
                      className="block h-[1.2em] text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-400 to-teal-400 pb-2"
                      style={{ height: 'calc(1.2em)' }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="animate-text-reveal animate-delay-200 text-lg md:text-xl text-muted-foreground/90 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light">
              AI is reshaping every industry. Don't get left behind. We provide professionals
              the skills, tools, and confidence to thrive alongside AI in the future.
            </p>

            {/* CTAs */}
            <div className="animate-text-reveal animate-delay-300 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/dashboard"
                className="group relative w-full sm:w-auto text-center px-8 py-4 text-lg font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_0_20px_rgba(180,255,50,0.2)] hover:shadow-[0_0_30px_rgba(180,255,50,0.4)]"
                style={{
                  background: 'linear-gradient(135deg, hsl(85 100% 60%), hsl(170 100% 45%))',
                  color: 'hsl(150 60% 5%)',
                }}
              >
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  Start Your AI Journey
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              
              <a
                href="#the-story"
                className="group w-full sm:w-auto text-center px-8 py-4 text-lg rounded-xl border border-white/10 bg-white/5 text-foreground font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/20 flex items-center justify-center gap-2"
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
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">2,500+</span>
                  <span className="text-xs">Active Learners</span>
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/10" />
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 font-semibold text-foreground">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9/5
                </span>
                <span className="text-xs flex items-center gap-1.5">
                   <Globe2 className="w-3.5 h-3.5" /> Global Community
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative w-full h-[500px] lg:h-[700px] rounded-3xl overflow-hidden opacity-0 animate-fade-in animate-delay-300 shadow-[0_0_40px_-10px_rgba(180,255,50,0.2)] mt-8 lg:mt-0 group border border-white/5 bg-zinc-900/50">
             {/* Gradient Overlays for Blending */}
             <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent z-10 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-l from-background/40 to-transparent z-10 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10 pointer-events-none" />
             
             {/* The hyperrealistic image */}
             <img 
               src="/hero-image.png" 
               alt="Professional Human interacting with Humanoid AI" 
               className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[15s] ease-out group-hover:scale-110 z-0 opacity-90"
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
