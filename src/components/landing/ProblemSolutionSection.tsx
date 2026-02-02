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
          <h2 className="text-2xl sm:text-3xl md:text-display-md lg:text-display-lg text-foreground mb-6 md:mb-8">
            The one learning platform for{" "}
            <span className="text-muted-foreground">everything AI</span>
          </h2>
          <p className="text-base md:text-body-lg text-muted-foreground max-w-2xl">
            Learn from fundamentals to advanced. Learn for work and personal growth. 
            Learn structured content and trending tools.
          </p>
        </div>

        {/* Grid of brand showcases - Shopify style cards that blend with bg */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {showcaseItems.map((item, index) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-xl md:rounded-3xl bg-card aspect-[3/4] cursor-pointer border border-white/[0.04] transition-all duration-500 hover:border-accent/20"
              style={{
                transform: isInView ? "none" : "translateY(60px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.1 + index * 0.1}s`
              }}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Shopify-style gradient overlay - blends into bg */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              
              {/* Green glow on hover */}
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
                <p className="text-[10px] md:text-sm text-muted-foreground mb-1 md:mb-2">{item.link}</p>
                <h3 className="text-sm md:text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
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
