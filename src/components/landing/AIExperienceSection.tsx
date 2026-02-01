import { useRef } from "react";
import { useInView } from "framer-motion";

const AIExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-atmosphere-cyan relative overflow-hidden">
      {/* Ambient glow effects */}
      <div 
        className="absolute top-1/2 right-0 w-[700px] h-[700px] -translate-y-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsla(188, 45%, 22%, 0.15) 0%, transparent 60%)'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsla(175, 45%, 20%, 0.12) 0%, transparent 70%)'
        }}
      />
      
      <div className="container-main relative" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div
            style={{
              transform: isInView ? "none" : "translateY(40px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
            }}
          >
            <h2 className="text-display-sm md:text-display-md text-foreground mb-6 md:mb-8">
              Real humans.{" "}
              <span className="text-muted-foreground">Real learning.</span>
            </h2>
            
            <div className="space-y-4 md:space-y-6 text-body-md text-muted-foreground">
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
            <div className="mt-8 md:mt-12 space-y-4">
              {[
                "Video walkthroughs with real practitioners",
                "Hands-on projects with real AI tools",
                "Community of learners and mentors"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div 
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ 
                      background: 'hsla(188, 45%, 35%, 1)',
                      boxShadow: '0 0 12px hsla(188, 45%, 35%, 0.6)'
                    }}
                  />
                  <span className="text-foreground text-sm md:text-base">{feature}</span>
                </div>
              ))}
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
            {/* Main image with gallery frame */}
            <div className="frame-gallery aspect-[4/3] ambient-glow-teal">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80"
                alt="Team collaborating on AI project"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating secondary image - hidden on mobile */}
            <div 
              className="hidden md:block absolute -bottom-8 -left-8 w-40 lg:w-48 h-40 lg:h-48 rounded-2xl overflow-hidden shadow-xl"
              style={{
                border: '1px solid hsla(175, 45%, 20%, 0.3)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 40px hsla(175, 45%, 20%, 0.15)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80"
                alt="Professional using AI tools"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating card - hidden on mobile */}
            <div 
              className="hidden md:block absolute -top-4 -right-4 glass-teal p-4 max-w-[200px] rounded-2xl animate-float"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'hsla(175, 45%, 20%, 0.4)' }}
                >
                  <span className="text-foreground font-bold text-sm">JD</span>
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