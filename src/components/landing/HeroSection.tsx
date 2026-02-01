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
      {/* Video Background - Full clarity, no dark overlays */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
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
        
        {/* Ambient color glow from left - replaces dark overlay for text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 80% at 0% 50%, hsla(180, 35%, 8%, 0.95) 0%, transparent 60%),
              radial-gradient(ellipse 50% 60% at 0% 80%, hsla(175, 45%, 12%, 0.8) 0%, transparent 50%),
              radial-gradient(ellipse 40% 50% at 10% 20%, hsla(235, 40%, 15%, 0.6) 0%, transparent 50%)
            `
          }}
        />
        
        {/* Bottom curve blend - soft gradient, not black */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: `linear-gradient(to top, hsl(180 10% 4%), transparent)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-main pt-32 pb-24">
        <div className="max-w-4xl">
          {/* Main Headline */}
          <h1 className="text-display-md md:text-display-lg lg:text-display-xl text-foreground mb-8">
            <span className="animate-text-reveal block drop-shadow-lg">Be the next</span>
            <span className="animate-text-reveal animate-delay-100 block relative">
              <span className="inline-block overflow-hidden h-[1.1em] align-bottom">
                <span 
                  className="block transition-transform duration-500 ease-out text-muted-foreground drop-shadow-lg"
                  style={{ transform: `translateY(-${currentWordIndex * 100}%)` }}
                >
                  {rotatingWords.map((word, index) => (
                    <span key={index} className="block">{word}</span>
                  ))}
                </span>
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-text-reveal animate-delay-200 text-body-lg md:text-body-lg text-muted-foreground max-w-xl mb-12 drop-shadow-md">
            Dream big, learn fast, and grow far with VibeAI.
          </p>

          {/* CTAs */}
          <div className="animate-text-reveal animate-delay-300 flex flex-wrap items-center gap-4">
            <Link to="/dashboard" className="btn-primary shadow-lg">
              Start for free
            </Link>
            <a
              href="#why"
              className="btn-secondary"
            >
              <Play className="mr-2 h-4 w-4" fill="currentColor" />
              Why we build VibeAI
            </a>
          </div>
        </div>
      </div>

      {/* Curved bottom transition - matches background color */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 rounded-t-[4rem]"
        style={{ background: 'hsl(180 10% 4%)' }}
      />
    </section>
  );
};

export default HeroSection;