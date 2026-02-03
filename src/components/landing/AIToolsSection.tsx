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
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop&q=80",
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
  
  // Show 1 on mobile, 2 on sm, 3 on md+
  const getToolsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 768) return 2;
      return 3;
    }
    return 3;
  };
  
  const [toolsPerPage, setToolsPerPage] = useState(3);
  const totalPages = Math.ceil(aiTools.length / toolsPerPage);

  const visibleTools = aiTools.slice(
    currentPage * toolsPerPage,
    (currentPage + 1) * toolsPerPage
  );

  return (
    <section id="ai-tools" className="section-padding bg-background relative overflow-hidden">
      {/* Green glow - hidden on mobile */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] md:w-[600px] md:h-[400px] bg-accent/5 blur-[100px] md:blur-[150px] rounded-full hidden md:block" />
      
      <div className="container-main relative" ref={ref}>
        {/* Header */}
        <div 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 mb-10 md:mb-16"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-display-md text-foreground mb-4 md:mb-6">
              Trending AI tools
            </h2>
            <p className="text-base md:text-body-lg text-muted-foreground">
              Stay current with the tools shaping the industry. We track, analyze, 
              and teach you how to use them.
            </p>
          </div>

          {/* Navigation - Shopify style circular buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setCurrentPage((p) => (p - 1 + totalPages) % totalPages)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrentPage((p) => (p + 1) % totalPages)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Tools Grid - Shopify style with images */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {visibleTools.map((tool, index) => (
            <div
              key={tool.name}
              className="glass-panel glass-panel-hover group cursor-pointer rounded-3xl overflow-hidden"
              style={{
                transform: isInView ? "none" : "translateY(40px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.1 + index * 0.1}s`
              }}
            >
              {/* Image */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img 
                  src={tool.image} 
                  alt={tool.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-90" />
                
                {/* Trending badge */}
                {tool.trending && (
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-accent text-xs font-medium border border-accent/30 shadow-lg">
                    <TrendingUp size={12} className="text-accent" />
                    Trending
                  </span>
                )}
              </div>
              
              {/* Content */}
              <div className="p-6 md:p-8 relative">
                {/* Floating blur blob behind text */}
                <div className="absolute right-0 top-0 w-32 h-32 bg-accent/10 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="mb-4 relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 mb-2">
                    {tool.name}
                  </h3>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground group-hover:border-accent/30 transition-colors">
                    {tool.category}
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
                  {tool.description}
                </p>
                
                <button className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                  Learn more
                  <ExternalLink size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Page indicators - Shopify style */}
        <div className="flex justify-center gap-2 mt-8 md:mt-12">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentPage === index 
                  ? "bg-accent w-6 md:w-8" 
                  : "bg-white/20 w-2 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIToolsSection;
