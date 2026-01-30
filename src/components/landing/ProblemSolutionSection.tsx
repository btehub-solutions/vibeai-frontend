import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const ProblemSolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why" className="section-padding bg-background relative overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container-main" ref={ref}>
        {/* Main statement - Shopify bold typography */}
        <div 
          className="max-w-5xl mb-24"
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

        {/* Grid of brand showcases - Shopify style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              title: "ChatGPT Mastery", 
              image: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=600&h=800&fit=crop",
              link: "chatgpt.com"
            },
            { 
              title: "Prompt Engineering", 
              image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=700&fit=crop",
              link: "prompts.ai"
            },
            { 
              title: "AI for Business", 
              image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=800&fit=crop",
              link: "business.ai"
            },
            { 
              title: "Creative AI Tools", 
              image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=700&fit=crop",
              link: "creative.ai"
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-3xl bg-card aspect-[3/4] cursor-pointer"
              style={{
                transform: isInView ? "none" : "translateY(60px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.1 + index * 0.1}s`
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-sm text-muted-foreground mb-2">{item.link}</p>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;