import { useRef } from "react";
import { useInView } from "framer-motion";

const AIExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-main" ref={ref}>
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

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <p className="text-4xl font-bold text-foreground">2.5K+</p>
                <p className="text-sm text-muted-foreground mt-1">Active learners</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-foreground">15+</p>
                <p className="text-sm text-muted-foreground mt-1">Learning paths</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-foreground">4.9</p>
                <p className="text-sm text-muted-foreground mt-1">Avg rating</p>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div
            className="relative"
            style={{
              transform: isInView ? "none" : "translateX(40px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
            }}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 card-elevated p-6 max-w-xs">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-accent-foreground font-bold">JD</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">John Doe</p>
                  <p className="text-sm text-muted-foreground">Just completed Prompt Engineering</p>
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