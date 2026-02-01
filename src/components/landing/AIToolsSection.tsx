import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, TrendingUp } from "lucide-react";

const aiTools = [
  {
    name: "ChatGPT",
    category: "Conversational AI",
    description: "Advanced language model for conversation, writing, analysis, and creative tasks.",
    trending: true,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&q=80",
  },
  {
    name: "Claude",
    category: "Conversational AI",
    description: "Anthropic's AI assistant for nuanced, thoughtful responses and analysis.",
    trending: true,
    image: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=400&h=300&fit=crop&q=80",
  },
  {
    name: "Midjourney",
    category: "Image Generation",
    description: "Create stunning visuals from text. Industry-leading image quality.",
    trending: false,
    image: "https://images.unsplash.com/photo-1686191128892-3b37add4fc7c?w=400&h=300&fit=crop&q=80",
  },
  {
    name: "Cursor",
    category: "Code Assistant",
    description: "AI-powered code editor that helps you write and refactor code faster.",
    trending: true,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&q=80",
  },
  {
    name: "Runway",
    category: "Video AI",
    description: "Generate and edit videos using AI. Revolutionary creative tool.",
    trending: true,
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&h=300&fit=crop&q=80",
  },
  {
    name: "Perplexity",
    category: "Research",
    description: "AI-powered search with cited, comprehensive answers.",
    trending: false,
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400&h=300&fit=crop&q=80",
  },
];

const AIToolsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentPage, setCurrentPage] = useState(0);
  const toolsPerPage = 3;
  const totalPages = Math.ceil(aiTools.length / toolsPerPage);

  const visibleTools = aiTools.slice(
    currentPage * toolsPerPage,
    (currentPage + 1) * toolsPerPage
  );

  return (
    <section id="ai-tools" className="section-padding bg-atmosphere-emerald relative">
      {/* Ambient glow effects */}
      <div 
        className="absolute top-1/3 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsla(155, 45%, 20%, 0.12) 0%, transparent 70%)'
        }}
      />
      <div 
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsla(175, 45%, 20%, 0.1) 0%, transparent 70%)'
        }}
      />
      
      <div className="container-main relative" ref={ref}>
        {/* Header */}
        <div 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 mb-12 md:mb-16"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <div className="max-w-2xl">
            <h2 className="text-display-sm md:text-display-md text-foreground mb-4 md:mb-6">
              Trending AI tools
            </h2>
            <p className="text-body-md md:text-body-lg text-muted-foreground">
              Stay current with the tools shaping the industry. We track, analyze, 
              and teach you how to use them.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => (p - 1 + totalPages) % totalPages)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300"
              style={{
                border: '1px solid hsla(155, 45%, 20%, 0.3)',
                background: 'hsla(155, 35%, 12%, 0.3)'
              }}
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentPage((p) => (p + 1) % totalPages)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300"
              style={{
                border: '1px solid hsla(155, 45%, 20%, 0.3)',
                background: 'hsla(155, 35%, 12%, 0.3)'
              }}
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {visibleTools.map((tool, index) => (
            <div
              key={tool.name}
              className="group cursor-pointer rounded-3xl overflow-hidden relative"
              style={{
                background: 'linear-gradient(180deg, hsl(180 8% 7%), hsla(155, 35%, 12%, 0.3))',
                border: '1px solid hsla(155, 45%, 20%, 0.15)',
                transform: isInView ? "none" : "translateY(40px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.1 + index * 0.1}s`
              }}
            >
              {/* Image */}
              <div className="relative h-40 md:h-48 overflow-hidden">
                <img 
                  src={tool.image} 
                  alt={tool.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, hsl(180 8% 7%), hsla(155, 35%, 12%, 0.4) 50%, transparent)'
                  }}
                />
                
                {/* Trending badge */}
                {tool.trending && (
                  <span 
                    className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-foreground text-xs font-medium"
                    style={{
                      background: 'hsla(155, 40%, 15%, 0.6)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid hsla(155, 45%, 20%, 0.3)'
                    }}
                  >
                    <TrendingUp size={12} />
                    Trending
                  </span>
                )}
              </div>
              
              {/* Content */}
              <div className="p-5 md:p-6">
                <div className="mb-4">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-muted-foreground transition-colors duration-300 mb-1">
                    {tool.name}
                  </h3>
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {tool.category}
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {tool.description}
                </p>
                
                <button className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                  Learn more
                  <ExternalLink size={14} />
                </button>
              </div>
              
              {/* Hover glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, hsla(155, 45%, 20%, 0.08) 0%, transparent 70%)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Page indicators */}
        <div className="flex justify-center gap-2 mt-10 md:mt-12">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentPage === index 
                  ? "w-8" 
                  : "w-2 hover:opacity-80"
              }`}
              style={{
                background: currentPage === index 
                  ? 'hsl(var(--foreground))' 
                  : 'hsla(155, 45%, 20%, 0.4)'
              }}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIToolsSection;