import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useInView } from "framer-motion";

const FinalCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Shopify-style green glow - hidden on mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] md:w-[800px] md:h-[400px] bg-accent/20 blur-[120px] md:blur-[180px] rounded-full hidden md:block animate-pulse-glow" />
      
      <div className="container-main relative" ref={ref}>
        <div 
          className="text-center max-w-3xl mx-auto"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-display-md lg:text-display-lg text-foreground mb-6 md:mb-8">
            Ready to master AI?
          </h2>
          <p className="text-base md:text-body-lg text-muted-foreground mb-8 md:mb-12">
            Join thousands building real AI skills. Start your journey today.
          </p>
          
          {/* CTA with Shopify-style glow */}
          <div className="inline-block">
            <Link 
              to="/dashboard" 
              className="btn-primary text-base md:text-lg px-8 py-4 md:px-10 md:py-5 inline-flex items-center group"
            >
              Start for free
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <p className="mt-6 md:mt-8 text-xs md:text-sm text-muted-foreground">
            No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
