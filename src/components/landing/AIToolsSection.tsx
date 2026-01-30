import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, TrendingUp } from "lucide-react";

const aiTools = [
  {
    name: "ChatGPT",
    category: "Conversational AI",
    description: "Advanced language model for conversation, writing, analysis, and creative tasks.",
    trending: true,
  },
  {
    name: "Claude",
    category: "Conversational AI",
    description: "Anthropic's AI assistant for nuanced, thoughtful responses and analysis.",
    trending: true,
  },
  {
    name: "Midjourney",
    category: "Image Generation",
    description: "Create stunning visuals from text. Industry-leading image quality.",
    trending: false,
  },
  {
    name: "Cursor",
    category: "Code Assistant",
    description: "AI-powered code editor that helps you write and refactor code faster.",
    trending: true,
  },
  {
    name: "Runway",
    category: "Video AI",
    description: "Generate and edit videos using AI. Revolutionary creative tool.",
    trending: true,
  },
  {
    name: "Perplexity",
    category: "Research",
    description: "AI-powered search with cited, comprehensive answers.",
    trending: false,
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
      <div className="container-main" ref={ref}>
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

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => (p - 1 + totalPages) % totalPages)}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentPage((p) => (p + 1) % totalPages)}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {visibleTools.map((tool, index) => (
            <div
              key={tool.name}
              className="group card-elevated p-8 hover:border-accent/20 transition-all duration-300"
              style={{
                transform: isInView ? "none" : "translateY(40px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.1 + index * 0.1}s`
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {tool.name}
                    </h3>
                    {tool.trending && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                        <TrendingUp size={10} />
                        Trending
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {tool.category}
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {tool.description}
              </p>
              <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
                Learn more
                <ExternalLink size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Page indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentPage === index ? "bg-accent w-6" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIToolsSection;