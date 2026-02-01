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
    <section id="ai-tools" className="section-padding bg-background relative">
      {/* Green glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 blur-[150px] rounded-full" />
      
      <div className="container-main relative" ref={ref}>
        {/* Header */}
        <div 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <div className="max-w-2xl">
            <h2 className="text-display-sm md:text-display-md text-foreground mb-6">
              Trending AI tools
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Stay current with the tools shaping the industry. We track, analyze, 
              and teach you how to use them.
            </p>
          </div>

          {/* Navigation - Shopify style circular buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => (p - 1 + totalPages) % totalPages)}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentPage((p) => (p + 1) % totalPages)}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Tools Grid - Shopify style with images */}
        <div className="grid md:grid-cols-3 gap-6">
          {visibleTools.map((tool, index) => (
            <div
              key={tool.name}
              className="card-feature group cursor-pointer"
              style={{
                transform: isInView ? "none" : "translateY(40px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.1 + index * 0.1}s`
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden rounded-t-3xl">
                <img 
                  src={tool.image} 
                  alt={tool.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                
                {/* Trending badge */}
                {tool.trending && (
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent/20 backdrop-blur-sm text-accent text-xs font-medium border border-accent/20">
                    <TrendingUp size={12} />
                    Trending
                  </span>
                )}
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300 mb-1">
                    {tool.name}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {tool.category}
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {tool.description}
                </p>
                
                <button className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                  Learn more
                  <ExternalLink size={14} />
                </button>
              </div>
              
              {/* Glow overlay */}
              <div className="glow-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Page indicators - Shopify style */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentPage === index 
                  ? "bg-accent w-8" 
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