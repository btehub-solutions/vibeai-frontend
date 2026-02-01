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
    <section id="why" className="section-padding bg-atmosphere-teal relative overflow-hidden">
      {/* Ambient glow backdrop */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsla(175, 45%, 20%, 0.12) 0%, transparent 70%)'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsla(235, 50%, 25%, 0.1) 0%, transparent 70%)'
        }}
      />
      
      <div className="container-main relative" ref={ref}>
        {/* Main statement */}
        <div 
          className="max-w-5xl mb-16 md:mb-24"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <h2 className="text-display-sm md:text-display-md lg:text-display-lg text-foreground mb-8">
            The one learning platform for{" "}
            <span className="text-muted-foreground">everything AI</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl">
            Learn from fundamentals to advanced. Learn for work and personal growth. 
            Learn structured content and trending tools.
          </p>
        </div>

        {/* Grid of brand showcases */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {showcaseItems.map((item, index) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[3/4] cursor-pointer frame-gallery"
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
              
              {/* Refined gradient overlay - teal tinted */}
              <div 
                className="absolute inset-0 z-10"
                style={{
                  background: `
                    linear-gradient(to top, 
                      hsla(180, 35%, 8%, 0.95) 0%, 
                      hsla(175, 40%, 12%, 0.4) 40%, 
                      transparent 70%
                    )
                  `
                }}
              />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20">
                <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">{item.link}</p>
                <h3 className="text-base md:text-xl font-semibold text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
              
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center bottom, hsla(175, 45%, 20%, 0.15) 0%, transparent 60%)'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;