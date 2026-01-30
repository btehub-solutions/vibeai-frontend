import { useState } from "react";
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
    description: "Anthropic's AI assistant known for nuanced, thoughtful responses and analysis.",
    trending: true,
  },
  {
    name: "Midjourney",
    category: "Image Generation",
    description: "Create stunning visuals from text descriptions. Industry-leading image quality.",
    trending: false,
  },
  {
    name: "Runway ML",
    category: "Video Generation",
    description: "Generate and edit videos using AI. Revolutionary creative tool for motion.",
    trending: true,
  },
  {
    name: "Cursor",
    category: "Code Assistant",
    description: "AI-powered code editor that helps you write, understand, and refactor code.",
    trending: true,
  },
  {
    name: "Perplexity",
    category: "Research",
    description: "AI-powered search engine that provides cited, comprehensive answers.",
    trending: false,
  },
  {
    name: "ElevenLabs",
    category: "Voice AI",
    description: "Generate realistic voiceovers and clone voices with remarkable accuracy.",
    trending: false,
  },
  {
    name: "Notion AI",
    category: "Productivity",
    description: "AI-powered writing, summarization, and task management within Notion.",
    trending: false,
  },
];

const AIToolsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const toolsPerPage = 4;
  const totalPages = Math.ceil(aiTools.length / toolsPerPage);

  const visibleTools = aiTools.slice(
    currentPage * toolsPerPage,
    (currentPage + 1) * toolsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="ai-tools" className="section-padding bg-background relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      <div className="container-narrow mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
              AI Intelligence
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Trending AI Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Stay current with the most impactful AI tools. We track, analyze, 
              and teach you how to use them effectively.
            </p>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevPage}
              className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm text-muted-foreground min-w-[60px] text-center">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={nextPage}
              className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {visibleTools.map((tool) => (
            <div
              key={tool.name}
              className="glass-card p-6 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {tool.name}
                    </h3>
                    {tool.trending && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                        <TrendingUp size={12} />
                        Trending
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {tool.category}
                  </span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-lg hover:bg-white/5">
                  <ExternalLink size={16} className="text-muted-foreground" />
                </button>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {tool.description}
              </p>
            </div>
          ))}
        </div>

        {/* Dashboard Link */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Explore all tools and their detailed guides in your dashboard
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
          >
            View Full AI Tools Library
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AIToolsSection;