import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Play, CheckCircle, Star } from "lucide-react";

const AIExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isVideoHovered, setIsVideoHovered] = useState(false);

  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/5 blur-[100px] md:blur-[150px] rounded-full hidden md:block" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full hidden md:block" />
      
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
              <Play className="w-3 h-3 text-accent" fill="currentColor" />
              <span className="text-xs md:text-sm text-muted-foreground">Watch & Learn</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-display-md text-foreground mb-6 md:mb-8">
              Real professionals.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">Real learning.</span>
            </h2>
            
            <div className="space-y-4 md:space-y-6 text-sm md:text-body-md text-muted-foreground">
              <p>
                AI can feel abstract. We make it tangible. Our content shows <span className="text-foreground font-medium">real professionals</span>
                {" "}using real tools to solve real problems — in the real world context.
              </p>
              <p>
                Watch a tech hub product manager use ChatGPT for market research. See a startup entrepreneur 
                automate their customer service. Learn from an indie film director using AI for post-production.
              </p>
            </div>

            {/* Feature list with glassmorphism cards */}
            <div className="mt-8 md:mt-12 space-y-3 md:space-y-4">
              {[
                { text: "Video walkthroughs by global AI practitioners", icon: CheckCircle },
                { text: "Hands-on projects using real global business cases", icon: CheckCircle },
                { text: "Community of learners worldwide", icon: CheckCircle },
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 md:gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-accent/20 hover:bg-accent/[0.03] transition-all duration-500 group"
                >
                  <feature.icon className="w-5 h-5 text-accent flex-shrink-0 group-hover:drop-shadow-[0_0_8px_rgba(180,255,50,0.4)] transition-all duration-300" />
                  <span className="text-foreground text-sm md:text-base group-hover:text-accent transition-colors duration-300">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual with glassmorphism layers */}
          <div
            className="relative"
            style={{
              transform: isInView ? "none" : "translateY(40px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
            }}
          >
            {/* Main image — Tech collaborative */}
            <div 
              className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/3] border border-white/[0.08] transition-all duration-700 group cursor-pointer"
              style={{
                boxShadow: isVideoHovered ? '0 0 60px -15px rgba(180,255,50,0.2)' : 'none',
              }}
              onMouseEnter={() => setIsVideoHovered(true)}
              onMouseLeave={() => setIsVideoHovered(false)}
            >
              <img
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&h=600&fit=crop&q=80"
                alt="Professionals learning AI in a collaborative workshop setting"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent/90 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(180,255,50,0.3)] hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 md:w-8 md:h-8 text-accent-foreground ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Green glow overlay */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Floating secondary image — Professional using laptop */}
            <div className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-4 md:-bottom-8 md:-left-8 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-xl md:rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&h=400&fit=crop&q=80"
                alt="Professional using AI tools on laptop"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>

            {/* Floating notification card — Name */}
            <div className="absolute -top-2 -right-1 sm:-top-3 sm:-right-2 md:-top-4 md:-right-4 backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] p-2 sm:p-3 md:p-4 max-w-[140px] sm:max-w-[170px] md:max-w-[200px] animate-float rounded-xl md:rounded-2xl shadow-2xl">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-accent/30 to-emerald-500/30 border border-accent/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-bold text-xs md:text-sm">JS</span>
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-xs md:text-sm truncate">Jessica just completed</p>
                  <p className="text-[10px] md:text-xs text-accent truncate">Prompt Engineering ✨</p>
                </div>
              </div>
            </div>

            {/* Rating card — Learner */}
            <div className="absolute bottom-4 right-2 sm:bottom-6 sm:right-4 md:bottom-8 md:right-8 backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] p-3 md:p-4 rounded-xl animate-float shadow-xl" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-1">"Changed my career!" — David, London</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIExperienceSection;
