import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ExternalLink, TrendingUp, Star, Filter, Bot } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { tools, categories } from "@/data/tools";

const DashboardTools = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);

  const filteredTools = tools.filter((tool) => {
    const categoryMatch = activeCategory === "All" || tool.category === activeCategory;
    const trendingMatch = !showTrendingOnly || tool.trending;
    return categoryMatch && trendingMatch;
  });

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <DashboardHeader
          title="AI Tools Library"
          subtitle="Explore and learn about the most impactful AI tools"
        />

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex flex-wrap gap-2 flex-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowTrendingOnly(!showTrendingOnly)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
              showTrendingOnly
                ? "bg-accent text-accent-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
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
              className="card-elevated p-6 group hover:border-accent/20 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
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
                {tool.isInternal ? (
                   <div className="p-2 bg-accent/10 rounded-lg text-accent">
                      <Bot size={20} />
                   </div>
                ) : null}
              </div>

              <p className="text-muted-foreground text-sm mb-5 line-clamp-2 flex-1">
                {tool.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mb-6">
                <Star size={14} className="text-accent fill-accent" />
                <span className="text-sm font-medium text-foreground">
                  {tool.rating}
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                   ({tool.isInternal ? "Internal" : "External"})
                </span>
              </div>

              {/* CTA */}
              <Link
                to={`/dashboard/tools/${tool.id}`}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                View Details
                <ExternalLink size={14} />
              </Link>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No tools found matching your filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardTools;