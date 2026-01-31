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
      {/* Video Background - Full visibility with smooth fade-in */}
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
        
        {/* Shopify-style minimal gradient - only for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-main pt-32 pb-24">
        <div className="max-w-4xl">
          {/* Main Headline - Shopify massive typography */}
          <h1 className="text-display-md md:text-display-lg lg:text-display-xl text-foreground mb-8">
            <span className="animate-text-reveal block">Be the next</span>
            <span className="animate-text-reveal animate-delay-100 block relative">
              <span className="inline-block overflow-hidden h-[1.1em] align-bottom">
                <span 
                  className="block transition-transform duration-500 ease-out text-muted-foreground"
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
          <p className="animate-text-reveal animate-delay-200 text-body-lg md:text-body-lg text-muted-foreground max-w-xl mb-12">
            Dream big, learn fast, and grow far with VibeAI.
          </p>

          {/* CTAs - Shopify exact style: white primary, outlined secondary */}
          <div className="animate-text-reveal animate-delay-300 flex flex-wrap items-center gap-4">
            <Link to="/dashboard" className="btn-primary">
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

      {/* Curved bottom transition - Shopify signature */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-background rounded-t-[4rem]" />
    </section>
  );
};

export default HeroSection;
