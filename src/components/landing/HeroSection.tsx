import { Link } from "react-router-dom";
import { Play, Sparkles, ArrowRight } from "lucide-react";
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background/95 via-background/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Interactive glow that follows mouse */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[150px] transition-all duration-[2000ms] ease-out hidden md:block"
          style={{
            background: 'radial-gradient(circle, hsl(85 100% 60%) 0%, hsl(170 100% 45%) 50%, transparent 70%)',
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {/* Animated accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none hidden md:block">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/40 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i}s`,
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 container-main pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-5xl mx-auto text-center md:text-left md:ml-0">
          
          {/* Badge */}
          <div className="animate-text-reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:border-accent/30 hover:bg-accent/5 transition-all duration-500 group cursor-default">
            <Sparkles className="w-4 h-4 text-accent group-hover:animate-spin" />
            <span className="text-xs md:text-sm text-muted-foreground group-hover:text-accent transition-colors">
              Nigeria's #1 AI Fluency Platform
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-display-lg lg:text-display-xl text-foreground mb-6 md:mb-8 font-bold tracking-tight leading-[0.9]">
            <span className="animate-text-reveal block">Be the next</span>
            <span className="animate-text-reveal animate-delay-100 block relative">
              <span className="inline-block overflow-hidden h-[1.1em] align-bottom">
                <span
                  className="block transition-transform duration-500 ease-out text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-400 to-teal-400"
                  style={{
                    transform: `translateY(-${currentWordIndex * 100}%)`,
                  }}
                >
                  {rotatingWords.map((word, index) => (
                    <span key={index} className="block">
                      {word}
                    </span>
                  ))}
                </span>
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-text-reveal animate-delay-200 text-lg md:text-body-lg text-muted-foreground/90 max-w-2xl mb-8 md:mb-12 leading-relaxed">
            AI is reshaping every industry. Don't get left behind. VibeAI gives Nigerians
            the skills, tools, and confidence to thrive in the AI-powered future.
          </p>

          {/* CTAs with glassmorphism */}
          <div className="animate-text-reveal animate-delay-300 flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/dashboard"
              className="group relative w-full sm:w-auto text-center px-10 py-5 text-lg font-semibold rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, hsl(85 100% 60%), hsl(170 100% 45%))',
                color: 'hsl(150 60% 5%)',
              }}
            >
              {/* Glow effect on hover */}
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-500" />
              <span className="relative flex items-center justify-center gap-2">
                Start Your AI Journey
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <a
              href="#the-story"
              className="group w-full sm:w-auto text-center px-10 py-5 text-lg rounded-full border border-white/20 backdrop-blur-xl bg-white/5 text-foreground font-medium transition-all duration-500 hover:bg-white/10 hover:border-accent/30 hover:shadow-[0_0_30px_-10px_rgba(180,255,50,0.3)] flex items-center justify-center gap-2"
            >
              <Play className="h-5 w-5" fill="currentColor" />
              See the Story
            </a>
          </div>

          {/* Social proof ticker */}
          <div className="animate-text-reveal animate-delay-400 mt-12 flex flex-wrap items-center gap-4 md:gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/40 to-emerald-500/40 border-2 border-background flex items-center justify-center text-[10px] font-bold text-accent">
                    {['AO', 'IK', 'NG', 'OJ'][i]}
                  </div>
                ))}
              </div>
              <span>2,500+ learners</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/20" />
            <span className="hidden sm:inline">⭐ 4.9 rating</span>
            <div className="hidden sm:block w-px h-4 bg-white/20" />
            <span className="hidden sm:inline">🇳🇬 Made for Nigeria</span>
          </div>
        </div>
      </div>

      {/* Curved bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-32 bg-background rounded-t-[3rem] md:rounded-t-[5rem] translate-y-2" />
    </section>
  );
};

export default HeroSection;
