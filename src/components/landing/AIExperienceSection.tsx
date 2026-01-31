import { useRef } from "react";
import { useInView } from "framer-motion";

const AIExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      {/* Shopify-style green glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full" />
      
      <div className="container-main relative" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div
            style={{
              transform: isInView ? "none" : "translateY(40px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
            }}
          >
            <h2 className="text-display-sm md:text-display-md text-foreground mb-8">
              Real humans.{" "}
              <span className="text-muted-foreground">Real learning.</span>
            </h2>
            
            <div className="space-y-6 text-body-md text-muted-foreground">
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
            <div className="mt-12 space-y-4">
              {[
                "Video walkthroughs with real practitioners",
                "Hands-on projects with real AI tools",
                "Community of learners and mentors"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual with Shopify-style layered images */}
          <div
            className="relative"
            style={{
              transform: isInView ? "none" : "translateX(40px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
            }}
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/[0.06]">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80"
                alt="Team collaborating on AI project"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              
              {/* Green glow overlay */}
              <div className="absolute inset-0 bg-accent/5" />
            </div>

            {/* Floating secondary image - Shopify layered style */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-2xl overflow-hidden border border-white/[0.06] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80"
                alt="Professional using AI tools"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating card - Shopify style notification */}
            <div className="absolute -top-4 -right-4 card-elevated p-4 max-w-[200px] animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent font-bold text-sm">JD</span>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Just completed</p>
                  <p className="text-xs text-muted-foreground">Prompt Engineering</p>
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