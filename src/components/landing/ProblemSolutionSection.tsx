import { useRef } from "react";
import { useInView } from "framer-motion";

const showcaseItems = [
  { 
    title: "ChatGPT Mastery", 
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=800&fit=crop&q=80",
    link: "chatgpt.com"
  },
  { 
    title: "Prompt Engineering", 
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=800&fit=crop&q=80",
    link: "prompts.ai"
  },
  { 
    title: "AI for Business", 
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=800&fit=crop&q=80",
    link: "business.ai"
  },
  { 
    title: "Creative AI Tools", 
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=800&fit=crop&q=80",
    link: "creative.ai"
  },
];

const ProblemSolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why" className="section-padding bg-background relative overflow-hidden">
      {/* Subtle green glow at top - hidden on mobile */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 md:w-96 md:h-96 bg-accent/5 blur-[100px] md:blur-[150px] rounded-full hidden md:block" />
      
      <div className="container-main relative" ref={ref}>
        {/* Main statement - Shopify bold typography */}
        <div 
          className="max-w-5xl mb-12 md:mb-24"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-display-md lg:text-display-lg text-foreground mb-6 md:mb-8 font-bold tracking-tight">
            The one learning platform for{" "}
            <span className="text-accent underline decoration-accent/30 decoration-4 underline-offset-8">everything AI</span>
          </h2>
          <p className="text-xl md:text-body-lg text-muted-foreground/80 max-w-2xl leading-relaxed">
            From zero to hero. Master the tools that are reshaping the world.
            Simple, structured, and designed for your career growth.
          </p>
        </div>

        {/* Grid of brand showcases - Shopify style cards with deep glass effect */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {showcaseItems.map((item, index) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-card border border-white/[0.08] aspect-[3/4] cursor-pointer transition-all duration-500 hover:border-accent/50 hover:shadow-[0_0_30px_-5px_rgba(180,255,50,0.15)]"
              style={{
                transform: isInView ? "none" : "translateY(60px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.1 + index * 0.1}s`
              }}
            >
              {/* Image with zoom effect */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/90" />
              
              {/* Green Glow */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs font-mono text-accent/80 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{item.link}</p>
                <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
