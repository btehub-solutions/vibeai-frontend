import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { 
  Landmark, Film, Sprout, ShoppingBag, 
  TrendingUp, ArrowRight, Sparkles
} from "lucide-react";

/* ─── Animated Counter ─── */
const AnimatedCounter = ({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const industries = [
  {
    icon: Landmark,
    title: "Fintech & Banking",
    story: "The global financial sector is transforming rapidly. AI is powering real-time fraud detection at major banks, enabling smart cross-border lending, and driving personalized wealth management for billions globally.",
    stat: "14",
    statSuffix: "B+",
    statLabel: "Fintech funding raised",
    statPrefix: "$",
    image: "/images/landing/pair-programming.jpg",
    color: "emerald",
    tags: ["Payments", "Lending", "InsurTech"],
  },
  {
    icon: Film,
    title: "Creative & Media",
    story: "The entertainment industry is embracing AI for scriptwriting, VFX, colour grading, and global content distribution. Creators worldwide are using AI to produce high-quality content 10x faster, reaching massive international audiences.",
    stat: "2.5",
    statSuffix: "T",
    statLabel: "Media & Entertainment value",
    statPrefix: "$",
    image: "/images/landing/team-coding-collab.jpg",
    color: "purple",
    tags: ["Film", "Music", "Content"],
  },
  {
    icon: Sprout,
    title: "Global Agriculture",
    story: "Millions worldwide depend on agriculture, but climate challenges threaten yields. AI-powered crop monitoring, precise weather prediction, and smart supply chain tools are helping farmers increase yields by up to 30% sustainably.",
    stat: "30",
    statSuffix: "%",
    statLabel: "increase in global crop yields",
    statPrefix: "",
    image: "/images/landing/woman-laptop-outdoor.jpg",
    color: "accent",
    tags: ["AgriTech", "Supply Chain", "Climate"],
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce & Logistics",
    story: "Global retailers and SMEs are leveraging AI for dynamic pricing, customer segmentation, and autonomous supply chain optimization. AI is cutting delivery times by up to 40%, enabling businesses of all sizes to compete internationally.",
    stat: "6",
    statSuffix: "T",
    statLabel: "e-commerce market by 2025",
    statPrefix: "$",
    image: "/images/landing/tech-hub-learning.jpg",
    color: "amber",
    tags: ["Retail", "Logistics", "SMEs"],
  },
];

const colorMap: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  emerald: { text: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30", glow: "rgba(50,200,120,0.15)" },
  purple: { text: "text-purple-400", bg: "bg-purple-500/20", border: "border-purple-500/30", glow: "rgba(160,80,255,0.15)" },
  accent: { text: "text-accent", bg: "bg-accent/20", border: "border-accent/30", glow: "rgba(180,255,50,0.15)" },
  amber: { text: "text-amber-400", bg: "bg-amber-500/20", border: "border-amber-500/30", glow: "rgba(255,180,50,0.15)" },
};

const GlobalIndustriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-secondary relative overflow-hidden section-rounded-top">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-emerald-500/5 blur-[100px] md:blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-purple-500/5 blur-[100px] md:blur-[120px] rounded-full hidden md:block" />
      
      <div className="container-main relative" ref={ref}>
        {/* Chapter Header */}
        <div
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span className="text-xs md:text-sm text-emerald-400 font-medium tracking-wide uppercase">Chapter 4 — The Opportunity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-display-md lg:text-display-lg text-foreground mb-4 md:mb-6 font-bold tracking-tight max-w-4xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-accent to-cyan-400">
              Global industries
            </span>{" "}
            are ready for AI. Are you?
          </h2>
          <p className="text-base md:text-body-lg text-muted-foreground max-w-2xl leading-relaxed mb-12 md:mb-20">
            From New York to London, from Tokyo to Sydney — every major industry 
            worldwide is being transformed by AI. The professionals who understand AI will lead the next decade.
          </p>
        </div>

        {/* Industry Bento Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {industries.map((industry, index) => {
            const colors = colorMap[industry.color];
            return (
              <div
                key={industry.title}
                className="relative rounded-2xl md:rounded-3xl border border-white/[0.06] overflow-hidden backdrop-blur-xl group cursor-default transition-all duration-700"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                  transform: isInView ? (hoveredIndex === index ? "translateY(-6px)" : "none") : "translateY(50px)",
                  opacity: isInView ? 1 : 0,
                  transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${index * 0.12}s`,
                  boxShadow: hoveredIndex === index ? `0 20px 60px -15px ${colors.glow}` : 'none',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image strip at top */}
                <div className="relative h-44 md:h-56 overflow-hidden">
                  <img
                    src={industry.image}
                    alt={`AI in ${industry.title}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  
                  {/* Stat overlay badge */}
                  <div className="absolute bottom-4 right-4 backdrop-blur-xl bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-right">
                    <p className={`text-2xl md:text-3xl font-bold ${colors.text}`}>
                      <AnimatedCounter target={parseInt(industry.stat)} prefix={industry.statPrefix} suffix={industry.statSuffix} />
                    </p>
                    <p className="text-[10px] md:text-xs text-muted-foreground">{industry.statLabel}</p>
                  </div>
                  
                  {/* Trending badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                    <TrendingUp className={`w-3 h-3 ${colors.text}`} />
                    <span className="text-xs text-white/80 font-medium">AI-Powered</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <industry.icon className={`w-5 h-5 md:w-6 md:h-6 ${colors.text}`} />
                    </div>
                    <h3 className={`text-lg md:text-2xl font-bold text-foreground group-hover:${colors.text} transition-colors duration-300`}>
                      {industry.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
                    {industry.story}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {industry.tags.map((tag) => (
                      <span key={tag} className={`px-3 py-1 rounded-full text-xs ${colors.bg} ${colors.border} border ${colors.text} font-medium`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={`flex items-center gap-2 text-sm font-semibold ${colors.text} group-hover:gap-3 transition-all duration-300`}>
                    <span>Learn AI for {industry.title.split(" ")[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GlobalIndustriesSection;
