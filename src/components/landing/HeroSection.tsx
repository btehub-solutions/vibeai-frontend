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

        {/* Clearer Gradient Overlays - reduced opacity for visibility */}
        {/* Top fade for navbar visibility */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background/90 via-background/40 to-transparent z-10" />

        {/* Left-side fade for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        
        {/* Bottom fade for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Intense green glow at bottom */}
        <div className="absolute bottom-0 left-1/4 w-1/2 h-96 bg-accent/20 blur-[150px] rounded-full hidden md:block animate-pulse-glow" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-main pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-4xl mx-auto text-center md:text-left md:ml-0">


          {/* Main Headline - Shopify massive typography */}
          <h1 className="text-4xl sm:text-5xl md:text-display-lg lg:text-display-xl text-foreground mb-6 md:mb-8 font-bold tracking-tight leading-[0.9]">
            <span className="animate-text-reveal block">Be the next</span>
            <span className="animate-text-reveal animate-delay-100 block relative text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
              <span className="inline-block overflow-hidden h-[1.1em] align-bottom">
                <span
                  className="block transition-transform duration-500 ease-out text-accent"
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

          {/* Subheadline - Clean, calm */}
          <p className="animate-text-reveal animate-delay-200 text-lg md:text-body-lg text-muted-foreground/90 max-w-2xl mb-8 md:mb-12 leading-relaxed">
            Dream big, learn fast, and grow far with VibeAI. The platform
            powering the next generation of creative entrepreneurs.
          </p>

          {/* CTAs - Shopify exact style: cream primary, outlined secondary */}
          <div className="animate-text-reveal animate-delay-300 flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/dashboard"
              className="btn-primary w-full sm:w-auto text-center px-10 py-5 text-lg hover:shadow-[0_0_40px_-10px_rgba(180,255,50,0.5)]"
            >
              Start for free
            </Link>
            <a
              href="#why"
              className="btn-secondary w-full sm:w-auto text-center px-10 py-5 text-lg backdrop-blur-md hover:bg-white/10"
            >
              <Play className="mr-2 h-5 w-5" fill="currentColor" />
              Why VibeAI
            </a>
          </div>
        </div>
      </div>

      {/* Curved bottom transition - Shopify signature */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-32 bg-background rounded-t-[3rem] md:rounded-t-[5rem] translate-y-2" />
    </section>
  );
};

export default HeroSection;
