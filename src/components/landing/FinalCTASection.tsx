import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container-narrow mx-auto relative z-10">
        <div className="glass-panel p-12 md:p-16 lg:p-20 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to understand AI?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands of learners building real AI skills. 
            Start your journey today with our structured, human-centered approach.
          </p>
          <Link
            to="/dashboard"
            className="btn-primary text-base md:text-lg px-10 py-4 inline-flex items-center"
          >
            Begin Your AI Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="mt-6 text-sm text-muted-foreground">
            Free to start. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;