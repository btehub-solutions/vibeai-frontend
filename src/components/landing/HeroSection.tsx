import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroVideo from "@/assets/hero-video.mp4";

const rotatingWords = [
  "AI fluent",
  "future ready", 
  "prompt masters",
  "industry leaders",
  "career ready",
];

const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background - Full bleed with Shopify-style treatment */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-60" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        {/* Shopify-style gradient overlays - blending with teal background */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        
        {/* Subtle green glow at bottom - hidden on mobile to prevent overflow */}
        <div className="absolute bottom-0 left-1/4 w-1/2 h-64 bg-accent/5 blur-[100px] rounded-full hidden md:block" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-main pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-4xl">
          {/* Main Headline - Shopify massive typography */}
          <h1 className="text-3xl sm:text-4xl md:text-display-lg lg:text-display-xl text-foreground mb-6 md:mb-8">
            <span className="animate-text-reveal block">Be the next</span>
            <span className="animate-text-reveal animate-delay-100 block relative">
              <span className="inline-block overflow-hidden h-[1.1em] align-bottom">
                <span 
                  className="block transition-transform duration-500 ease-out text-accent"
                  style={{ transform: `translateY(-${currentWordIndex * 100}%)` }}
                >
                  {rotatingWords.map((word, index) => (
                    <span key={index} className="block">{word}</span>
                  ))}
                </span>
              </span>
            </span>
          </h1>

          {/* Subheadline - Clean, calm */}
          <p className="animate-text-reveal animate-delay-200 text-base md:text-body-lg text-muted-foreground max-w-xl mb-8 md:mb-12">
            Dream big, learn fast, and grow far with VibeAI.
          </p>

          {/* CTAs - Shopify exact style: cream primary, outlined secondary */}
          <div className="animate-text-reveal animate-delay-300 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <Link to="/dashboard" className="btn-primary w-full sm:w-auto text-center">
              Start for free
            </Link>
            <a
              href="#why"
              className="btn-secondary w-full sm:w-auto text-center"
            >
              <Play className="mr-2 h-4 w-4" fill="currentColor" />
              Why we build VibeAI
            </a>
          </div>
        </div>
      </div>

      {/* Curved bottom transition - Shopify signature */}
      <div className="absolute bottom-0 left-0 right-0 h-12 md:h-24 bg-background rounded-t-[2rem] md:rounded-t-[4rem]" />
    </section>
  );
};

export default HeroSection;
