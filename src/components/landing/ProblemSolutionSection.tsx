import { useRef } from "react";
import { useInView } from "framer-motion";

const showcaseItems = [
  { 
    title: "ChatGPT Mastery", 
    description: "Master the world's most popular AI tool — with practical global use cases",
    image: "/images/landing/ps-chatgpt.jpg",
    tag: "Most Popular"
  },
  { 
    title: "Prompt Engineering", 
    description: "The skill every global professional needs right now",
    image: "/images/landing/ps-prompt.jpg",
    tag: "Trending"
  },
  { 
    title: "AI for Business", 
    description: "Transform your growing business with smart AI tools",
    image: "/images/landing/ps-business.jpg",
    tag: "New"
  },
  { 
    title: "Creative AI Tools", 
    description: "Design, write, and create content 10x faster for global audiences",
    image: "/images/landing/ps-creative.jpg",
    tag: "Essential"
  },
];

const ProblemSolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why" className="section-padding bg-background relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 md:w-96 md:h-96 bg-accent/5 blur-[100px] md:blur-[150px] rounded-full hidden md:block" />
      
      <div className="container-main relative" ref={ref}>
        {/* Main statement */}
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-400 to-cyan-400 underline decoration-accent/30 decoration-4 underline-offset-8">everything AI</span>
          </h2>
          <p className="text-xl md:text-body-lg text-muted-foreground/80 max-w-2xl leading-relaxed">
            From zero to hero. Master the tools that are reshaping the world — 
            with courses designed for the global modern workforce.
          </p>
        </div>

        {/* Grid of brand showcases */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {showcaseItems.map((item, index) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-card border border-white/[0.08] aspect-[3/4] cursor-pointer transition-all duration-700 hover:border-accent/50 hover:shadow-[0_0_50px_-10px_rgba(180,255,50,0.2)]"
              style={{
                transform: isInView ? "none" : "translateY(60px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.1 + index * 0.1}s`
              }}
            >
              {/* Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/95" />
              
              {/* Top tag - glassmorphism */}
              <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-xs text-accent font-medium">
                  {item.tag}
                </span>
              </div>
              
              {/* Green Glow from bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-white/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {item.description}
                </p>
              </div>

              {/* Corner glow on hover */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
