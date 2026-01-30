import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay was prevented
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-40" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setIsVideoLoaded(true)}
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%230a0d14'/%3E%3C/svg%3E"
        >
          <source
            src="https://videos.pexels.com/video-files/7989466/7989466-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-narrow mx-auto px-6 pt-32 pb-20 text-center">
        {/* Badge */}
        <div className="animate-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">
            Now in public beta
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
          Learn AI in{" "}
          <span className="text-gradient">Vibe Mode</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-up-delay text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Master artificial intelligence through structured, human-centered learning. 
          From fundamentals to advanced applications, at your own pace.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-delay-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
            Start Learning Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <a
            href="#how-it-works"
            className="btn-secondary text-base px-8 py-4 w-full sm:w-auto"
          >
            <Play className="mr-2 h-4 w-4" />
            See How It Works
          </a>
        </div>

        {/* Social Proof */}
        <div className="animate-fade-up-delay-2 mt-16 pt-8 border-t border-white/[0.06]">
          <p className="text-sm text-muted-foreground mb-4">
            Trusted by learners across Nigeria
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-foreground">2,500+</p>
              <p className="text-xs text-muted-foreground mt-1">Active Learners</p>
            </div>
            <div className="h-8 w-px bg-white/[0.08]" />
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-foreground">15+</p>
              <p className="text-xs text-muted-foreground mt-1">Learning Paths</p>
            </div>
            <div className="h-8 w-px bg-white/[0.08]" />
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-foreground">4.9</p>
              <p className="text-xs text-muted-foreground mt-1">Learner Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;