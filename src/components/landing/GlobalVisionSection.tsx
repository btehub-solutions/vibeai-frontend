import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { 
  Globe2, Rocket, Heart, Code, 
  GraduationCap, Palette, Stethoscope, BarChart3,
  Sparkles
} from "lucide-react";

/* ─── BentoCard ─── */
const BentoCard = ({ children, className = "", delay = 0, span = "" }: { children: React.ReactNode; className?: string; delay?: number; span?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/[0.06] backdrop-blur-xl transition-all duration-700 group cursor-default ${span} ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
        transform: isInView ? "none" : "translateY(40px) scale(0.95)",
        opacity: isInView ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute pointer-events-none transition-opacity duration-500 z-0"
        style={{
          width: '300px', height: '300px',
          left: mousePos.x - 150, top: mousePos.y - 150,
          background: `radial-gradient(circle, rgba(180,255,50,0.12) 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none transition-opacity duration-500 z-0"
        style={{
          boxShadow: `inset 0 0 0 1px rgba(180,255,50,0.1), 0 0 40px -15px rgba(180,255,50,0.1)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

const globalVisionCards = [
  {
    icon: Globe2,
    title: "A Connected World",
    text: "The world is moving faster than ever. By mastering AI education today, global citizens will lead the innovations of tomorrow.",
    image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=800&h=600&fit=crop&q=80",
    color: "text-cyan-400",
  },
  {
    icon: Rocket,
    title: "Global Innovation Hubs",
    text: "From Silicon Valley to Tokyo, from London to Sydney, innovation is borderless. The tools to build the next big thing are accessible everywhere.",
    image: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=800&h=600&fit=crop&q=80",
    color: "text-accent",
  },
  {
    icon: Heart,
    title: "The Builder Spirit",
    text: "Entrepreneurs worldwide possess an incredible drive to create. Give a builder the right AI tools, and they'll create something extraordinary.",
    image: "https://images.unsplash.com/photo-1590845947670-c009801ffa74?w=800&h=600&fit=crop&q=80",
    color: "text-rose-400",
  },
];

const learnerProfiles = [
  { icon: Code, title: "Developers", desc: "Build smarter with AI-assisted coding", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { icon: BarChart3, title: "Business Owners", desc: "Automate operations, cut costs", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { icon: GraduationCap, title: "Students", desc: "Skills for the modern economy", color: "text-accent", bg: "bg-accent/10", border: "border-accent/20" },
  { icon: Palette, title: "Creatives", desc: "Create 10x faster with AI tools", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { icon: Stethoscope, title: "Healthcare", desc: "AI diagnostics and patient care", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { icon: BarChart3, title: "Marketers", desc: "Copywriting, SEO, analytics with AI", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
];

const GlobalVisionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 blur-[200px] rounded-full hidden md:block" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-cyan-500/5 blur-[150px] rounded-full hidden md:block" />
      
      <div className="container-main relative" ref={ref}>
        {/* Chapter Header */}
        <div
          className="mb-12 md:mb-20"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span className="text-xs md:text-sm text-cyan-400 font-medium tracking-wide uppercase">Chapter 6 — The Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-display-md lg:text-display-lg text-foreground mb-4 md:mb-6 font-bold tracking-tight max-w-5xl">
            We don't just{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              consume AI.
            </span>{" "}
            We will{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-400 to-cyan-400">
              shape it.
            </span>
          </h2>
          <p className="text-base md:text-body-lg text-muted-foreground max-w-2xl leading-relaxed">
            This isn't just about catching up. It's about leapfrogging into the future. AI is the ultimate equalizer, 
            and those who learn it today will build the world of tomorrow.
          </p>
        </div>

        {/* Vision Bento Grid with images */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-24">
          {globalVisionCards.map((card, index) => (
            <BentoCard key={card.title} delay={index * 100}>
              <div className="h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  
                  {/* Icon overlay */}
                  <div className="absolute bottom-4 left-5 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <card.icon className={`w-5 h-5 md:w-6 md:h-6 ${card.color}`} />
                  </div>
                </div>
                
                {/* Text */}
                <div className="p-5 md:p-7 flex-1">
                  <h3 className={`text-lg md:text-xl font-bold text-foreground mb-3 group-hover:${card.color} transition-colors duration-300`}>
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>

        {/* Who is VibeAI for? — Learner profiles grid */}
        <div
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s"
          }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Who is VibeAI for?
          </h3>
          <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-12 max-w-xl">
            Whether you're a student in New York, a business owner in London, or a creative in Tokyo — 
            VibeAI was built for <span className="text-foreground font-medium">you</span>.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {learnerProfiles.map((profile, i) => (
              <div
                key={profile.title}
                className={`p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/[0.06] backdrop-blur-xl transition-all duration-500 hover:border-white/[0.12] group`}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                  transform: isInView ? "none" : "translateY(30px)",
                  opacity: isInView ? 1 : 0,
                  transition: `all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.5 + i * 0.08}s`,
                }}
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${profile.bg} ${profile.border} border flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <profile.icon className={`w-5 h-5 md:w-6 md:h-6 ${profile.color}`} />
                </div>
                <h4 className={`font-bold text-foreground mb-1 group-hover:${profile.color} transition-colors duration-300`}>
                  {profile.title}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground">{profile.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalVisionSection;
