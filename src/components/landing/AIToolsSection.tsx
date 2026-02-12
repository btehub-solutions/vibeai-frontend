import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles, Code2, PenTool, BarChart3, Video, Megaphone } from "lucide-react";

// Tools with African context relevance
const tools = [
  {
    id: 1,
    name: "ChatGPT",
    desc: "Your 24/7 Personal Assistant",
    category: "Productivity",
    stat: "10x Faster",
    icon: Sparkles,
    color: "from-green-400 to-emerald-600",
  },
  {
    id: 2,
    name: "Midjourney",
    desc: "Create Art for Nollywood",
    category: "Creative",
    stat: "Unlimited Assets",
    icon: PenTool,
    color: "from-purple-400 to-indigo-600",
  },
  {
    id: 3,
    name: "GitHub Copilot",
    desc: "Code Smarter, Not Harder",
    category: "Development",
    stat: "55% Less bugs",
    icon: Code2,
    color: "from-gray-400 to-slate-600",
  },
  {
    id: 4,
    name: "Jasper",
    desc: "Marketing Copy that Sells",
    category: "Marketing",
    stat: "SEO Optimized",
    icon: Megaphone,
    color: "from-orange-400 to-red-600",
  },
  {
    id: 5,
    name: "Runway ML",
    desc: "Edit Video Like a Pro",
    category: "Creative",
    stat: "Cinema Ready",
    icon: Video,
    color: "from-pink-400 to-rose-600",
  },
  {
    id: 6,
    name: "Notion AI",
    desc: "Organize Your Entire Life",
    category: "Productivity",
    stat: "Smart Notes",
    icon: BarChart3,
    color: "from-blue-400 to-cyan-600",
  }
];

const categories = ["All", "Productivity", "Creative", "Development", "Marketing"];

const AIToolsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredTools = activeCategory === "All" 
    ? tools 
    : tools.filter(t => t.category === activeCategory);

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container-main relative z-10" ref={ref}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.7 }}
             className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Master the tools that <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">power the future</span>
            </h2>
            <p className="text-lg text-white/60">
              We go deep on the tools that matter. Filter by category to find your edge.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
             <button className="hidden md:flex items-center gap-2 text-accent border border-accent/20 px-6 py-3 rounded-full hover:bg-accent/10 transition-all font-medium group">
                View All Tools 
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
             </button>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-accent text-accent-foreground shadow-[0_0_20px_rgba(180,255,50,0.3)]" 
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => (
              <motion.div
                layout
                key={tool.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white/[0.03] border border-white/[0.06] hover:border-accent/30 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500"
              >
                 <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tool.color} opacity-10 blur-2xl rounded-full translate-x-10 -translate-y-10 group-hover:opacity-20 transition-opacity`} />
                 
                <div className="p-6 md:p-8 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                     <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shadow-lg`}>
                        <tool.icon size={24} />
                     </div>
                     <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-white/60 border border-white/5">
                        {tool.category}
                     </span>
                  </div>

                  <div className="flex-1">
                     <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{tool.name}</h3>
                     <p className="text-white/60 text-sm leading-relaxed mb-6">{tool.desc}</p>
                  </div>
                   
                  <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
                     <span className="text-sm font-semibold text-white/80">{tool.stat}</span>
                     <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                        <ArrowUpRight size={16} />
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-12 text-center md:hidden">
           <button className="flex items-center justify-center w-full gap-2 text-accent border border-accent/20 px-6 py-3 rounded-full hover:bg-accent/10 transition-all">
             View All Tools <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AIToolsSection;
