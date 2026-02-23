import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { 
  Terminal, Share2, Layers, Cpu, 
  Code, Zap, CheckCircle2, Search
} from "lucide-react";

/* Feature Tab Component */
const FeatureTab = ({ 
  icon: Icon, 
  title, 
  isActive, 
  onClick 
}: { 
  icon: React.ElementType, 
  title: string, 
  isActive: boolean, 
  onClick: () => void 
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 w-full text-left ${
        isActive 
          ? "bg-accent/10 border-accent/40 text-foreground" 
          : "bg-transparent border-transparent hover:bg-white/[0.03] text-muted-foreground hover:text-foreground"
      }`}
    >
      <div className={`p-2 rounded-lg ${isActive ? "bg-accent text-black" : "bg-white/5 text-muted-foreground"}`}>
        <Icon size={20} />
      </div>
      <span className="font-medium">{title}</span>
    </button>
  );
};

const ShowcaseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "AI-Powered Learning",
      description: "Our platform adapts to your learning style. Stuck on a concept? Our AI tutor explains it in simple terms, even using Pidgin or local analogies if you prefer.",
      icon:  BrainIcon,
      image: "/images/landing/show-learning-fixed.png", // Black man using laptop
      stats: [
        { label: "Personalized", value: "100%" },
        { label: "Languages", value: "3+" }
      ]
    },
    {
      title: "Project Workspace",
      description: "Don't just watch videos. Build real AI apps in our cloud workspace. No high-end laptop needed — everything runs in your browser.",
      icon: Terminal,
      image: "/images/landing/show-workspace.jpg", // Diverse team planning
      stats: [
        { label: "Setup Time", value: "0s" },
        { label: "GPU Access", value: "Free" }
      ]
    },
    {
      title: "Community Hub",
      description: "Connect with mentors and peers. Share your projects, get feedback, and find co-founders for your next big idea.",
      icon: Share2,
      image: "/images/landing/show-community.jpg", // Diverse community group
      stats: [
        { label: "Active Members", value: "2.5k+" },
        { label: "Daily Events", value: "5+" }
      ]
    }
  ];

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full hidden md:block" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full hidden md:block" />

      <div className="container-main relative" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <Layers className="w-4 h-4 text-accent" />
            <span className="text-sm text-foreground/80">Platform Features</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-display-md font-bold mb-6">
            Everything you need to <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">master AI engineering</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            We've built a world-class learning environment optimized for the African context. 
            Low data usage, mobile-first design, and powerful tools at your fingertips.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Feature List */}
          <div className="lg:col-span-5 space-y-4">
            {features.map((feature, index) => (
              <FeatureTab
                key={index}
                icon={feature.icon}
                title={feature.title}
                isActive={activeFeature === index}
                onClick={() => setActiveFeature(index)}
              />
            ))}

            <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <h4 className="text-lg font-semibold mb-3">Why VibeAI?</h4>
              <ul className="space-y-3">
                {[
                  "Offline-first mode for unstable internet",
                  "Mobile-optimized coding environment",
                  "Direct access to AI credits (no credit card needed)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature Visual */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl md:rounded-3xl border border-white/[0.08] bg-card/50 backdrop-blur-xl aspect-[4/3] overflow-hidden group">
              {/* Main Image */}
              <div className="absolute inset-0">
                 <img 
                    src={features[activeFeature].image} 
                    alt={features[activeFeature].title}
                    className="w-full h-full object-cover transition-all duration-700 opacity-90 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-3 rounded-xl bg-accent text-black">
                     {(() => {
                        const Icon = features[activeFeature].icon;
                        return <Icon size={24} />;
                     })()}
                   </div>
                   <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                      {features[activeFeature].title}
                   </h3>
                </div>
                
                <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
                  {features[activeFeature].description}
                </p>

                <div className="flex gap-8 border-t border-white/10 pt-6">
                  {features[activeFeature].stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-2xl font-bold text-accent mb-1">{stat.value}</div>
                      <div className="text-sm text-white/60">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Helper Icon */
function BrainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  )
}

export default ShowcaseSection;
