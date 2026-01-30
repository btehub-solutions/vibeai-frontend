import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useInView } from "framer-motion";

const FinalCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-main" ref={ref}>
        <div 
          className="text-center max-w-3xl mx-auto"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <h2 className="text-display-sm md:text-display-md lg:text-display-lg text-foreground mb-8">
            Ready to master AI?
          </h2>
          <p className="text-body-lg text-muted-foreground mb-12">
            Join thousands building real AI skills. Start your journey today.
          </p>
          <Link to="/dashboard" className="btn-primary text-lg px-10 py-5 inline-flex items-center">
            Start for free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="mt-8 text-sm text-muted-foreground">
            No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;