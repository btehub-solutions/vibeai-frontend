import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ExternalLink, TrendingUp, Star, Filter } from "lucide-react";
import { useState } from "react";

const aiTools = [
  {
    id: 1,
    name: "ChatGPT",
    category: "Conversational AI",
    description:
      "OpenAI's advanced language model for conversation, writing, analysis, and creative tasks.",
    trending: true,
    rating: 4.9,
    link: "https://chat.openai.com",
  },
  {
    id: 2,
    name: "Claude",
    category: "Conversational AI",
    description:
      "Anthropic's AI assistant known for nuanced, thoughtful responses and long-context analysis.",
    trending: true,
    rating: 4.8,
    link: "https://claude.ai",
  },
  {
    id: 3,
    name: "Midjourney",
    category: "Image Generation",
    description:
      "Create stunning visuals from text descriptions. Industry-leading image quality.",
    trending: false,
    rating: 4.7,
    link: "https://midjourney.com",
  },
  {
    id: 4,
    name: "Runway ML",
    category: "Video Generation",
    description:
      "Generate and edit videos using AI. Revolutionary creative tool for motion.",
    trending: true,
    rating: 4.6,
    link: "https://runwayml.com",
  },
  {
    id: 5,
    name: "Cursor",
    category: "Code Assistant",
    description:
      "AI-powered code editor that helps you write, understand, and refactor code faster.",
    trending: true,
    rating: 4.8,
    link: "https://cursor.com",
  },
  {
    id: 6,
    name: "Perplexity",
    category: "Research",
    description:
      "AI-powered search engine that provides cited, comprehensive answers to complex questions.",
    trending: false,
    rating: 4.7,
    link: "https://perplexity.ai",
  },
  {
    id: 7,
    name: "ElevenLabs",
    category: "Voice AI",
    description:
      "Generate realistic voiceovers and clone voices with remarkable accuracy.",
    trending: false,
    rating: 4.6,
    link: "https://elevenlabs.io",
  },
  {
    id: 8,
    name: "Notion AI",
    category: "Productivity",
    description:
      "AI-powered writing, summarization, and task management integrated into Notion.",
    trending: false,
    rating: 4.5,
    link: "https://notion.so",
  },
  {
    id: 9,
    name: "Jasper",
    category: "Content Creation",
    description:
      "AI content platform for marketing teams to create brand-consistent copy.",
    trending: false,
    rating: 4.4,
    link: "https://jasper.ai",
  },
  {
    id: 10,
    name: "GitHub Copilot",
    category: "Code Assistant",
    description:
      "AI pair programmer that suggests code completions in real-time.",
    trending: true,
    rating: 4.7,
    link: "https://github.com/features/copilot",
  },
  {
    id: 11,
    name: "Stable Diffusion",
    category: "Image Generation",
    description:
      "Open-source image generation model with extensive customization options.",
    trending: false,
    rating: 4.5,
    link: "https://stability.ai",
  },
  {
    id: 12,
    name: "Otter.ai",
    category: "Transcription",
    description:
      "AI-powered meeting transcription with speaker identification and summaries.",
    trending: false,
    rating: 4.4,
    link: "https://otter.ai",
  },
];

const categories = [
  "All",
  "Conversational AI",
  "Image Generation",
  "Video Generation",
  "Code Assistant",
  "Research",
  "Voice AI",
  "Productivity",
];

const DashboardTools = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);

  const filteredTools = aiTools.filter((tool) => {
    const categoryMatch =
      activeCategory === "All" || tool.category === activeCategory;
    const trendingMatch = !showTrendingOnly || tool.trending;
    return categoryMatch && trendingMatch;
  });

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <DashboardHeader
          title="AI Tools Library"
          subtitle="Explore and learn about the most impactful AI tools"
        />

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 flex-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Trending Filter */}
          <button
            onClick={() => setShowTrendingOnly(!showTrendingOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              showTrendingOnly
                ? "bg-primary text-primary-foreground"
                : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
            }`}
          >
            <Filter size={14} />
            Trending Only
          </button>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="glass-card p-6 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    {tool.trending && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                        <TrendingUp size={10} />
                        Trending
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {tool.category}
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {tool.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                <Star size={14} className="text-primary fill-primary" />
                <span className="text-sm font-medium text-foreground">
                  {tool.rating}
                </span>
              </div>

              {/* CTA */}
              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-all duration-200 bg-white/5 text-foreground hover:bg-primary hover:text-primary-foreground"
              >
                Learn More
                <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No tools found matching your filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardTools;