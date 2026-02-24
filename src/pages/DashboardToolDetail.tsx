
import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { tools } from "@/data/tools";
import { 
  ArrowLeft, ExternalLink, Check, DollarSign, Star, Bot, 
  Target, ThumbsUp, ThumbsDown, Rocket, Lightbulb, X, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";

const DashboardToolDetail = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<"overview" | "usecases" | "proscons" | "start">("overview");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const tool = tools.find((t) => t.id === Number(toolId));

  if (!tool) {
    return (
      <div className="min-h-screen bg-background lg:flex overflow-hidden">
        <DashboardSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
        <main className="flex-1 p-3 sm:p-10 flex flex-col items-center justify-center min-w-0">
          <h2 className="text-2xl font-bold mb-4">Tool not found</h2>
          <Button onClick={() => navigate("/dashboard/tools")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </main>
      </div>
    );
  }

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: Lightbulb },
    { id: "usecases" as const, label: "Use Cases", icon: Target },
    { id: "proscons" as const, label: "Pros & Cons", icon: Zap },
    { id: "start" as const, label: "Getting Started", icon: Rocket },
  ];

  return (
    <div className="min-h-screen bg-background lg:flex overflow-hidden">
      <DashboardSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      <main className="flex-1 p-3 sm:p-6 lg:p-10 overflow-x-hidden overflow-y-auto w-full min-w-0">
        <div className="max-w-5xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-4 sm:mb-6 pl-0 hover:pl-2 transition-all"
            onClick={() => navigate("/dashboard/tools")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
 
          <DashboardHeader
            title={tool.name}
            subtitle={tool.category}
            user={user}
            onMenuClick={() => setIsMobileOpen(true)}
          />



          {/* Tabs Navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar scroll-smooth">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="card-elevated p-5 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-accent" />
                    About {tool.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                    {tool.longDescription || tool.description}
                  </p>
                  
                  {tool.bestFor && (
                    <div className="mb-8 p-6 rounded-xl bg-accent/10 border border-accent/20">
                      <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
                        <Target size={18} />
                        Best For
                      </h4>
                      <p className="text-foreground">{tool.bestFor}</p>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground text-lg">Key Features</h4>
                    <ul className="grid gap-3">
                      {tool.features?.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <div className="mt-1 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <Check size={14} className="text-accent" />
                          </div>
                          <span className="flex-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Use Cases Tab */}
              {activeTab === "usecases" && tool.useCases && (
                <div className="card-elevated p-5 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Target className="w-6 h-6 text-blue-500" />
                    Common Use Cases
                  </h3>
                  <div className="grid gap-4">
                    {tool.useCases.map((useCase, idx) => (
                      <div key={idx} className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:border-blue-500/30 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-500 font-bold text-sm">{idx + 1}</span>
                          </div>
                          <p className="text-foreground flex-1 pt-1">{useCase}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pros & Cons Tab */}
              {activeTab === "proscons" && (tool.pros || tool.cons) && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {/* Pros */}
                  {tool.pros && (
                    <div className="card-elevated p-5 md:p-8">
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-green-500">
                        <ThumbsUp className="w-6 h-6" />
                        Advantages
                      </h3>
                      <div className="space-y-3">
                        {tool.pros.map((pro, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-green-500/5 border border-green-500/10">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <p className="text-foreground">{pro}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cons */}
                  {tool.cons && (
                    <div className="card-elevated p-5 md:p-8">
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-red-500">
                        <ThumbsDown className="w-6 h-6" />
                        Limitations
                      </h3>
                      <div className="space-y-3">
                        {tool.cons.map((con, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-red-500/5 border border-red-500/10">
                            <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-foreground">{con}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Getting Started Tab */}
              {activeTab === "start" && tool.gettingStarted && (
                <div className="card-elevated p-5 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Rocket className="w-6 h-6 text-purple-500" />
                    Getting Started Guide
                  </h3>
                  <div className="space-y-4">
                    {tool.gettingStarted.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent/20">
                          <span className="text-white font-bold">{idx + 1}</span>
                        </div>
                        <div className="flex-1 pt-2">
                          <p className="text-foreground text-lg">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {!tool.isInternal && (
                    <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-accent/10 to-purple-500/10 border border-accent/20">
                      <p className="text-sm text-muted-foreground mb-4">
                        Ready to get started with {tool.name}?
                      </p>
                      <a 
                        href={tool.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                      >
                        Visit {tool.name}
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar info */}
            <div className="space-y-6">
              <div className="card-elevated p-6 sticky top-6">
                 <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                    <span className="text-sm text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1.5">
                       <Star size={18} className="text-accent fill-accent" />
                       <span className="font-bold text-xl">{tool.rating}</span>
                    </div>
                 </div>

                 <div className="mb-6 pb-6 border-b border-border">
                    <span className="text-sm text-muted-foreground block mb-3">Pricing</span>
                    <div className="flex items-center gap-2 font-semibold text-lg">
                       <DollarSign size={18} className="text-accent" />
                       {tool.pricing || "Variable"}
                    </div>
                 </div>

                 <div className="mb-6">
                    <span className="text-sm text-muted-foreground block mb-3">Category</span>
                    <div className="px-3 py-2 rounded-lg bg-secondary text-foreground font-medium text-sm">
                       {tool.category}
                    </div>
                 </div>

                 {!tool.isInternal && (
                   <a 
                     href={tool.link} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-all duration-200 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20"
                   >
                     Visit Website
                     <ExternalLink size={16} />
                   </a>
                 )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardToolDetail;
