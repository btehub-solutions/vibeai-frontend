
import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { tools } from "@/data/tools";
import { ArrowLeft, ExternalLink, Check, DollarSign, Star, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import AIChatInterface from "@/components/chat/AIChatInterface";

const DashboardToolDetail = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  
  const tool = tools.find((t) => t.id === Number(toolId));

  if (!tool) {
    return (
      <div className="min-h-screen bg-background flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:p-10 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Tool not found</h2>
          <Button onClick={() => navigate("/dashboard/tools")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 pl-0 hover:pl-2 transition-all"
            onClick={() => navigate("/dashboard/tools")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>

          <DashboardHeader
            title={tool.name}
            subtitle={tool.category}
          />

          {tool.isInternal ? (
            <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-gradient-to-r from-accent/20 to-purple-500/20 p-1 rounded-3xl mb-8">
                  <div className="bg-background rounded-[22px] p-6 lg:p-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-accent/20 rounded-xl">
                            <Bot className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Interactive Session</h2>
                            <p className="text-muted-foreground">Start chatting with {tool.name}</p>
                        </div>
                      </div>
                      <AIChatInterface />
                  </div>
               </div>
            </div>
          ) : (
             null
          )}

          <div className="grid lg:grid-cols-3 gap-8 mt-2">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description Card */}
              <div className="card-elevated p-6">
                <h3 className="text-xl font-semibold mb-4">About {tool.name}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {tool.longDescription || tool.description}
                </p>
                
                <div className="mt-8 space-y-4">
                  <h4 className="font-medium text-foreground">Key Features</h4>
                  <ul className="grid gap-3">
                    {tool.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <div className="mt-1 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-accent" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar info */}
            <div className="space-y-6">
              <div className="card-elevated p-6">
                 <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1.5">
                       <Star size={16} className="text-accent fill-accent" />
                       <span className="font-bold">{tool.rating}</span>
                    </div>
                 </div>

                 <div className="mb-6">
                    <span className="text-sm text-muted-foreground block mb-2">Pricing</span>
                    <div className="flex items-center gap-2 font-medium">
                       <DollarSign size={16} className="text-muted-foreground" />
                       {tool.pricing || "Variable"}
                    </div>
                 </div>

                 {!tool.isInternal && (
                   <a 
                     href={tool.link} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground"
                   >
                     Visit Website
                     <ExternalLink size={14} />
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
