import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

const FinalCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = document.getElementById('final-cta');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="final-cta" className="section-padding bg-background relative overflow-hidden">
      {/* Interactive mouse-follow glow */}
      <div 
        className="absolute w-[600px] h-[400px] rounded-full opacity-25 blur-[150px] transition-all duration-[2000ms] ease-out hidden md:block"
        style={{
          background: 'radial-gradient(circle, hsl(85 100% 60%) 0%, hsl(170 100% 45%) 40%, transparent 70%)',
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Static center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] md:w-[800px] md:h-[400px] bg-accent/15 blur-[120px] md:blur-[180px] rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
      
      {/* Animated border line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>
      
      <div className="container-main relative" ref={ref}>
        <div 
          className="text-center max-w-4xl mx-auto"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-md mb-8 animate-pulse" style={{ animationDuration: '3s' }}>
            <Zap className="w-4 h-4 text-accent" fill="currentColor" />
            <span className="text-xs md:text-sm text-accent font-medium">Join 2,500+ learners today</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-display-md lg:text-display-lg text-foreground mb-4 md:mb-6 font-bold">
            The AI revolution won't{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-400 to-cyan-400">
              wait for you.
            </span>
          </h2>
          <p className="text-lg md:text-body-lg text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Every day you wait is a day your competitors get ahead. Start building real AI skills now. 
            Your future self will thank you.
          </p>
          
          {/* CTA with dramatic glow */}
          <div className="inline-block relative group">
            {/* Background glow ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-emerald-500/20 to-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <Link 
              to="/dashboard" 
              className="btn-primary flex items-center justify-center gap-3 text-base md:text-lg px-8 py-5 md:px-12 md:py-6 shadow-xl shadow-accent/10"
            >
              <Sparkles className="w-5 h-5" />
              Start Your AI Journey — Free
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
          
          <p className="mt-6 md:mt-8 text-xs md:text-sm text-muted-foreground">
            No credit card required • Cancel anytime • Instant access
          </p>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-muted-foreground/60">
            {["Secure Payments", "Global Community", "Instant Access", "Certificates"].map((item) => (
              <span key={item} className="hover:text-foreground transition-colors duration-300 cursor-default">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
