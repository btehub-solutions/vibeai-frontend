import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ExternalLink, TrendingUp, Star, Filter, Bot, Search, Sparkles, Target } from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { tools, categories } from "@/data/tools";
import { useUser } from "@/hooks/useUser";
import { Input } from "@/components/ui/input";

const DashboardTools = () => {
  const { user } = useUser();
  const [activeCategory, setActiveCategory] = useState("All");
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const categoryMatch = activeCategory === "All" || tool.category === activeCategory;
      const trendingMatch = !showTrendingOnly || tool.trending;
      const searchMatch = searchQuery === "" || 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && trendingMatch && searchMatch;
    });
  }, [activeCategory, showTrendingOnly, searchQuery]);

  const stats = {
    total: tools.length,
    trending: tools.filter(t => t.trending).length,
    internal: tools.filter(t => t.isInternal).length,
    categories: categories.length - 1 // Exclude "All"
  };

  return (
    <div className="min-h-screen bg-background lg:flex overflow-hidden">
      <DashboardSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      <main className="flex-1 p-3 sm:p-6 lg:p-10 overflow-x-hidden overflow-y-auto w-full lg:h-screen min-w-0">
        <DashboardHeader
          title="AI Tools Library"
          subtitle="Explore and learn about the most impactful AI tools"
          user={user}
          onMenuClick={() => setIsMobileOpen(true)}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 mb-8">
          <div className="card-elevated p-3 sm:p-5">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 mb-1 sm:mb-2 text-center sm:text-left">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-lg sm:text-2xl font-bold truncate">{stats.total}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Total Tools</p>
              </div>
            </div>
          </div>

          <div className="card-elevated p-3 sm:p-5">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 mb-1 sm:mb-2 text-center sm:text-left">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              </div>
              <div className="min-w-0">
                <p className="text-lg sm:text-2xl font-bold truncate">{stats.trending}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Trending</p>
              </div>
            </div>
          </div>

          <div className="card-elevated p-3 sm:p-5">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 mb-1 sm:mb-2 text-center sm:text-left">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              </div>
              <div className="min-w-0">
                <p className="text-lg sm:text-2xl font-bold truncate">{stats.internal}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Internal</p>
              </div>
            </div>
          </div>

          <div className="card-elevated p-3 sm:p-5">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 mb-1 sm:mb-2 text-center sm:text-left">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              </div>
              <div className="min-w-0">
                <p className="text-lg sm:text-2xl font-bold truncate">{stats.categories}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Categories</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tools by name, description, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card border-border"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowTrendingOnly(!showTrendingOnly)}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 md:ml-auto ${
              showTrendingOnly
                ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
            }`}
          >
            <Filter size={14} />
            Trending Only
          </button>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredTools.length}</span> {filteredTools.length === 1 ? 'tool' : 'tools'}
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="card-elevated p-4 sm:p-6 group hover:border-accent/20 transition-all duration-300 flex flex-col min-w-0"
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

              {/* Use Case Preview */}
              {tool.useCases && tool.useCases.length > 0 && (
                <div className="mb-5 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                  <p className="text-xs text-blue-400 font-semibold mb-1.5 flex items-center gap-1.5">
                    <Target size={12} />
                    Top Use Case
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {tool.useCases[0]}
                  </p>
                </div>
              )}

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
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground group-hover:shadow-lg group-hover:shadow-accent/10"
              >
                View Details
                <ExternalLink size={14} />
              </Link>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No tools found</h3>
            <p className="text-muted-foreground text-lg mb-6">
              {searchQuery 
                ? `No tools match "${searchQuery}". Try a different search term.`
                : "No tools found matching your filters."
              }
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
                setShowTrendingOnly(false);
              }}
              className="px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardTools;