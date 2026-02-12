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
    story: "Nigeria leads Africa's fintech revolution. AI is powering fraud detection at banks like GTBank, enabling smart lending at Carbon, and driving personalized banking for 200M+ Nigerians. Flutterwave, Paystack, and Moniepoint are using AI to process billions in transactions.",
    stat: "14",
    statSuffix: "B+",
    statLabel: "Fintech funding raised",
    statPrefix: "$",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&q=80",
    color: "emerald",
    tags: ["Payments", "Lending", "InsurTech"],
  },
  {
    icon: Film,
    title: "Nollywood & Creative",
    story: "Nollywood — the world's second-largest film industry — is embracing AI for scriptwriting, VFX, colour grading, and content distribution. Nigerian creators on YouTube and TikTok use AI to produce content 10x faster, reaching audiences across Africa and the diaspora.",
    stat: "6",
    statSuffix: ".4B",
    statLabel: "Nollywood annual value",
    statPrefix: "$",
    image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=800&h=600&fit=crop&q=80",
    color: "purple",
    tags: ["Film", "Music", "Content"],
  },
  {
    icon: Sprout,
    title: "Agriculture",
    story: "70% of Nigeria's workforce depends on agriculture, yet productivity remains low. AI-powered crop monitoring, weather prediction, and market pricing apps like Farmcrowdy and ThriveAgric are helping smallholder farmers increase yields by up to 30% and access fair markets.",
    stat: "70",
    statSuffix: "%",
    statLabel: "workforce in agriculture",
    statPrefix: "",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop&q=80",
    color: "accent",
    tags: ["AgriTech", "Supply Chain", "Climate"],
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce & Logistics",
    story: "Jumia, Konga, and hundreds of SMEs are using AI for dynamic pricing, customer segmentation, and last-mile delivery optimization. In a country where logistics is the biggest challenge, AI is cutting delivery times by 40% and enabling small businesses to compete nationally.",
    stat: "75",
    statSuffix: "B",
    statLabel: "e-commerce market by 2025",
    statPrefix: "$",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop&q=80",
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

const NigerianIndustriesSection = () => {
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
            Nigeria's industries are{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-accent to-cyan-400">
              ready for AI.
            </span>{" "}
            Are you?
          </h2>
          <p className="text-base md:text-body-lg text-muted-foreground max-w-2xl leading-relaxed mb-12 md:mb-20">
            From Lagos to Kano, from Abuja to Port Harcourt — every major Nigerian industry 
            is being transformed by AI. The professionals who understand AI will lead the next decade.
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
                    alt={`AI in Nigerian ${industry.title}`}
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

export default NigerianIndustriesSection;
