import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useInView } from "framer-motion";

const FinalCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-atmosphere-teal relative overflow-hidden">
      {/* Centered ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsla(175, 45%, 20%, 0.15) 0%, transparent 60%)'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsla(235, 50%, 25%, 0.1) 0%, transparent 70%)'
        }}
      />
      
      <div className="container-main relative" ref={ref}>
        <div 
          className="text-center max-w-3xl mx-auto"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <h2 className="text-display-sm md:text-display-md lg:text-display-lg text-foreground mb-6 md:mb-8">
            Ready to master AI?
          </h2>
          <p className="text-body-md md:text-body-lg text-muted-foreground mb-10 md:mb-12">
            Join thousands building real AI skills. Start your journey today.
          </p>
          
          {/* CTA */}
          <div className="inline-block">
            <Link 
              to="/dashboard" 
              className="btn-primary text-base md:text-lg px-8 md:px-10 py-4 md:py-5 inline-flex items-center group"
              style={{
                boxShadow: '0 8px 30px rgba(255, 255, 255, 0.15), 0 0 60px hsla(175, 45%, 20%, 0.2)'
              }}
            >
              Start for free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <p className="mt-6 md:mt-8 text-sm text-muted-foreground">
            No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;