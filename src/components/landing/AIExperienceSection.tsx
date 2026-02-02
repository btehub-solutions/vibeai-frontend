import { useRef } from "react";
import { useInView } from "framer-motion";

const AIExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      {/* Shopify-style green glow - hidden on mobile */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/5 blur-[100px] md:blur-[150px] rounded-full hidden md:block" />
      
      <div className="container-main relative" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left: Content */}
          <div
            style={{
              transform: isInView ? "none" : "translateY(40px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
            }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-display-md text-foreground mb-6 md:mb-8">
              Real humans.{" "}
              <span className="text-muted-foreground">Real learning.</span>
            </h2>
            
            <div className="space-y-4 md:space-y-6 text-sm md:text-body-md text-muted-foreground">
              <p>
                AI can feel abstract. We make it tangible. Our content shows real people 
                using real tools to solve real problems.
              </p>
              <p>
                Watch professionals navigate AI systems. See the actual interfaces. 
                Understand the practical decisions that make AI work.
              </p>
            </div>

            {/* Feature list */}
            <div className="mt-8 md:mt-12 space-y-3 md:space-y-4">
              {[
                "Video walkthroughs with real practitioners",
                "Hands-on projects with real AI tools",
                "Community of learners and mentors"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 md:gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-foreground text-sm md:text-base">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual with Shopify-style layered images */}
          <div
            className="relative"
            style={{
              transform: isInView ? "none" : "translateY(40px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
            }}
          >
            {/* Main image */}
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/3] border border-white/[0.06]">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80"
                alt="Team collaborating on AI project"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              
              {/* Green glow overlay */}
              <div className="absolute inset-0 bg-accent/5" />
            </div>

            {/* Floating secondary image - Shopify layered style - smaller on mobile */}
            <div className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-4 md:-bottom-8 md:-left-8 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-xl md:rounded-2xl overflow-hidden border border-white/[0.06] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80"
                alt="Professional using AI tools"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating card - Shopify style notification - repositioned for mobile */}
            <div className="absolute -top-2 -right-1 sm:-top-3 sm:-right-2 md:-top-4 md:-right-4 card-elevated p-2 sm:p-3 md:p-4 max-w-[140px] sm:max-w-[170px] md:max-w-[200px] animate-float">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-bold text-xs md:text-sm">JD</span>
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-xs md:text-sm truncate">Just completed</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground truncate">Prompt Engineering</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIExperienceSection;
