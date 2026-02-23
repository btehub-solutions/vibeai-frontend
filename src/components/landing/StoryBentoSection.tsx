import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { 
  AlertTriangle, Brain, TrendingDown, Globe2, 
  GraduationCap, Users, Lightbulb, Zap,
  ArrowRight, BarChart3
} from "lucide-react";

/* ─────────────── Animated Counter ─────────────── */
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
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

/* ─────────────── Glowing Bento Card ─────────────── */
const BentoCard = ({ 
  children, 
  className = "", 
  glowColor = "accent",
  delay = 0,
  span = "",
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: string;
  delay?: number;
  span?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowColors: Record<string, string> = {
    accent: "rgba(180, 255, 50, 0.15)",
    red: "rgba(255, 80, 80, 0.12)",
    blue: "rgba(80, 160, 255, 0.12)",
    purple: "rgba(160, 80, 255, 0.12)",
    amber: "rgba(255, 180, 50, 0.12)",
    emerald: "rgba(50, 200, 120, 0.12)",
    cyan: "rgba(0, 210, 190, 0.12)",
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
      {/* Mouse-follow glow */}
      <div
        className="absolute pointer-events-none transition-opacity duration-500 z-0"
        style={{
          width: '300px',
          height: '300px',
          left: mousePos.x - 150,
          top: mousePos.y - 150,
          background: `radial-gradient(circle, ${glowColors[glowColor] || glowColors.accent} 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Card border glow on hover */}
      <div 
        className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none transition-opacity duration-500 z-0"
        style={{
          boxShadow: `inset 0 0 0 1px ${glowColors[glowColor] || glowColors.accent}, 0 0 40px -15px ${glowColors[glowColor] || glowColors.accent}`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

/* ─────────────── Main Section ─────────────── */
const StoryBentoSection = () => {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="the-story" className="section-padding bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 md:w-[500px] md:h-[500px] bg-accent/5 blur-[100px] md:blur-[200px] rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-red-500/5 blur-[150px] rounded-full hidden md:block" />
      
      <div className="container-main relative" ref={sectionRef}>
        
        {/* ── CHAPTER 1: The AI Revolution ── */}
        <div 
          className="mb-8 md:mb-16"
          style={{
            transform: sectionInView ? "none" : "translateY(40px)",
            opacity: sectionInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs md:text-sm text-accent font-medium tracking-wide uppercase">Chapter 1</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-display-md lg:text-display-lg text-foreground mb-4 md:mb-6 font-bold tracking-tight">
            The world is changing.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-400 to-cyan-400">
              AI is leading the charge.
            </span>
          </h2>
          <p className="text-base md:text-body-lg text-muted-foreground max-w-2xl leading-relaxed">
            Artificial Intelligence isn't coming — it's already here. It's transforming how we work, 
            create, and solve problems. But there's a growing divide between those who understand AI 
            and those who don't.
          </p>
        </div>

        {/* BENTO GRID 1: AI Revolution — with global context image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-20 md:mb-32">
          
          {/* Large card - AI is Everywhere — now with global tech scene image */}
          <BentoCard span="col-span-2 row-span-2" glowColor="accent" delay={0}>
            <div className="h-full flex flex-col">
              {/* Image: global tech scene */}
              <div className="relative h-44 md:h-56 overflow-hidden">
                <img
                  src="/images/landing/ai_is_present.png"
                  alt="Black professionals collaborating on AI solutions"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-black/40 backdrop-blur-xl border border-accent/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Brain className="w-6 h-6 md:w-7 md:h-7 text-accent" />
                  </div>
                </div>
              </div>
              
              <div className="p-5 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl md:text-3xl font-bold text-foreground mb-3 md:mb-4 group-hover:text-accent transition-colors duration-300">
                    AI is Not the Future. <br />It's the Present.
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    From ChatGPT to autonomous systems, AI is already disrupting every industry. 
                    Companies are using AI to cut costs by 40%, create 10x faster, and make smarter 
                    decisions every day.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-1 flex-1 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-accent to-emerald-400 animate-pulse" style={{ animationDuration: '3s' }} />
                  </div>
                  <span className="text-xs text-accent font-mono">78% of jobs affected</span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Small card - Global AI Spend */}
          <BentoCard glowColor="blue" delay={100}>
            <div className="p-4 md:p-6 h-full flex flex-col justify-between min-h-[170px]">
              <Globe2 className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mb-3 group-hover:drop-shadow-[0_0_12px_rgba(80,160,255,0.5)] transition-all duration-300" />
              <div>
                <p className="text-2xl md:text-4xl font-bold text-foreground mb-1">
                  $<AnimatedCounter target={200} />B+
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">Global AI market by 2025</p>
              </div>
            </div>
          </BentoCard>

          {/* Small card - Jobs Created */}
          <BentoCard glowColor="emerald" delay={200}>
            <div className="p-4 md:p-6 h-full flex flex-col justify-between min-h-[170px]">
              <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-emerald-400 mb-3 group-hover:drop-shadow-[0_0_12px_rgba(50,200,120,0.5)] transition-all duration-300" />
              <div>
                <p className="text-2xl md:text-4xl font-bold text-foreground mb-1">
                  <AnimatedCounter target={97} />M
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">New AI jobs by 2025</p>
              </div>
            </div>
          </BentoCard>

          {/* Wide card - AI Fluency */}
          <BentoCard span="col-span-2" glowColor="purple" delay={300}>
            <div className="p-5 md:p-8 h-full flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 min-h-[150px]">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg md:text-2xl font-bold text-foreground mb-2 group-hover:text-purple-400 transition-colors duration-300">
                  What is AI Fluency?
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  It's not about coding. It's about <span className="text-foreground font-medium">understanding, using, and communicating with AI tools</span> to 
                  solve real problems in your career, business, and daily life.
                </p>
              </div>
            </div>
          </BentoCard>
        </div>

        {/* ── CHAPTER 2: The Global Challenge ── */}
        <div 
          className="mb-8 md:mb-16"
          style={{
            transform: sectionInView ? "none" : "translateY(40px)",
            opacity: sectionInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-xs md:text-sm text-red-400 font-medium tracking-wide uppercase">Chapter 2</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-display-md lg:text-display-lg text-foreground mb-4 md:mb-6 font-bold tracking-tight">
            The World is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-400">
              facing a divide.
            </span>
          </h2>
          <p className="text-base md:text-body-lg text-muted-foreground max-w-2xl leading-relaxed">
            While the rest of the world races ahead with AI adoption, millions face unique challenges 
            that threaten to widen the digital divide even further.
          </p>
        </div>

        {/* BENTO GRID 2: Global Challenges — with contextual images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mb-20 md:mb-32">
          
          {/* Skills Gap — with image */}
          <BentoCard glowColor="red" delay={0}>
            <div className="h-full flex flex-col">
              <div className="relative h-32 md:h-40 overflow-hidden">
                <img
                  src="/images/landing/classroom-mentoring.jpg"
                  alt="Black students in a classroom"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-red-950/20" />
                <AlertTriangle className="absolute bottom-3 left-4 w-6 h-6 md:w-8 md:h-8 text-red-400 group-hover:drop-shadow-[0_0_12px_rgba(255,80,80,0.5)] group-hover:animate-bounce transition-all duration-300" />
              </div>
              <div className="p-4 md:p-6 flex-1">
                <h3 className="text-base md:text-xl font-bold text-foreground mb-2 group-hover:text-red-400 transition-colors duration-300">
                  Massive Skills Gap
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Over 90% of professionals globally lack basic AI literacy. Most formal 
                  institutions don't teach practical AI skills yet.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* No Access — with image */}
          <BentoCard glowColor="amber" delay={100}>
            <div className="h-full flex flex-col">
              <div className="relative h-32 md:h-40 overflow-hidden">
                <img
                  src="/images/landing/computer-training.jpg"
                  alt="Market scene reflecting economic factors"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-amber-950/20" />
                <TrendingDown className="absolute bottom-3 left-4 w-6 h-6 md:w-8 md:h-8 text-amber-400 group-hover:drop-shadow-[0_0_12px_rgba(255,180,50,0.5)] transition-all duration-300" />
              </div>
              <div className="p-4 md:p-6 flex-1">
                <h3 className="text-base md:text-xl font-bold text-foreground mb-2 group-hover:text-amber-400 transition-colors duration-300">
                  Limited Access
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  World-class AI education is often priced out of reach, irrelevant to diverse global 
                  contexts, and lacks accessible payment options.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Wide card - The Consequence */}
          <BentoCard span="col-span-2 md:col-span-1 md:row-span-2" glowColor="red" delay={200}>
            <div className="h-full flex flex-col">
              <div className="relative h-40 md:h-48 overflow-hidden">
                <img
                  src="/images/landing/coworking-space.jpg"
                  alt="City street scene"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-red-950/30" />
                <div className="absolute bottom-4 left-5 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-black/40 backdrop-blur-xl border border-red-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <span className="text-2xl text-emerald-400"><Globe2 /></span>
                </div>
              </div>
              <div className="p-5 md:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg md:text-2xl font-bold text-foreground mb-3 group-hover:text-red-400 transition-colors duration-300">
                    The Cost of Inaction
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                    If we don't bridge the AI gap now, we risk losing an entire generation 
                    to technological irrelevance. The jobs of tomorrow require AI fluency today.
                  </p>
                </div>
                
                {/* Visual stat bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Global AI Readiness</span>
                      <span className="text-red-400">Average: 45%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-1000" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Skills Matching Gap</span>
                      <span className="text-amber-400">62.0%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-1000" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Disconnected Learning — with image */}
          <BentoCard glowColor="blue" delay={300}>
            <div className="h-full flex flex-col">
              <div className="relative h-32 md:h-40 overflow-hidden">
                <img
                  src="/images/landing/woman-laptop-outdoor.jpg"
                  alt="Student studying with focus"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-blue-950/20" />
                <GraduationCap className="absolute bottom-3 left-4 w-6 h-6 md:w-8 md:h-8 text-blue-400 group-hover:drop-shadow-[0_0_12px_rgba(80,160,255,0.5)] transition-all duration-300" />
              </div>
              <div className="p-4 md:p-6 flex-1">
                <h3 className="text-base md:text-xl font-bold text-foreground mb-2 group-hover:text-blue-400 transition-colors duration-300">
                  Outdated Education
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Traditional schooling hasn't adapted. Students graduate without practical 
                  knowledge of the AI tools employers actually demand.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Brain Drain — with image */}
          <BentoCard glowColor="purple" delay={400}>
            <div className="h-full flex flex-col">
              <div className="relative h-32 md:h-40 overflow-hidden">
                <img
                  src="/images/landing/tech-hub-learning.jpg"
                  alt="Airport scene"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-purple-950/20" />
                <Users className="absolute bottom-3 left-4 w-6 h-6 md:w-8 md:h-8 text-purple-400 group-hover:drop-shadow-[0_0_12px_rgba(160,80,255,0.5)] transition-all duration-300" />
              </div>
              <div className="p-4 md:p-6 flex-1">
                <h3 className="text-base md:text-xl font-bold text-foreground mb-2 group-hover:text-purple-400 transition-colors duration-300">
                  Global Talent Shift
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Top technical talent relocates seeking AI opportunities abroad. 
                  We can bridge this gap by bringing world-class AI education everywhere.
                </p>
              </div>
            </div>
          </BentoCard>
        </div>

        {/* ── CHAPTER 3: VibeAI — The Solution ── */}
        <div 
          className="mb-8 md:mb-16"
          style={{
            transform: sectionInView ? "none" : "translateY(40px)",
            opacity: sectionInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.6s",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs md:text-sm text-accent font-medium tracking-wide uppercase">Chapter 3</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-display-md lg:text-display-lg text-foreground mb-4 md:mb-6 font-bold tracking-tight">
            Enter{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-400 to-cyan-400">
              VibeAI.
            </span>{" "}
            Your AI fluency starts here.
          </h2>
          <p className="text-base md:text-body-lg text-muted-foreground max-w-2xl leading-relaxed">
            We built the platform the world needs — affordable, practical, and designed for real results. 
            Not theory. Not hype. Real AI skills for real careers.
          </p>
        </div>

        {/* BENTO GRID 3: The VibeAI Solution — with global imagery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          
          {/* Wide feature - Structured Learning — with image */}
          <BentoCard span="col-span-2" glowColor="accent" delay={0}>
            <div className="h-full flex flex-col">
              <div className="relative h-40 md:h-48 overflow-hidden">
                <img
                  src="/images/landing/structured_ai_paths.png"
                  alt="Black student working on laptop"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute bottom-4 left-5 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-black/40 backdrop-blur-xl border border-accent/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-accent/10">
                  <Zap className="w-7 h-7 md:w-8 md:h-8 text-accent" />
                </div>
              </div>
              <div className="p-5 md:p-8">
                <h3 className="text-lg md:text-2xl font-bold text-foreground mb-2 md:mb-3 group-hover:text-accent transition-colors duration-300">
                  Structured AI Learning Paths
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  From "What is AI?" to "Building with AI" — clear, progressive courses that 
                  take you from complete beginner to confident practitioner. No jargon, no fluff.
                </p>
                <div className="mt-4 flex items-center gap-2 text-accent text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                  <span>Explore courses</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Small feature - Flexible Pricing */}
          <BentoCard glowColor="emerald" delay={100}>
            <div className="p-5 md:p-6 h-full flex flex-col justify-between min-h-[180px]">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                <span className="text-lg md:text-2xl font-bold text-emerald-400">$</span>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-foreground mb-1 group-hover:text-emerald-400 transition-colors duration-300">
                  Affordable Access
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Accessible pricing globally. Pay with bank transfer, cards, or crypto. No exclusive access barriers.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Small feature - Community */}
          <BentoCard glowColor="cyan" delay={200}>
            <div className="p-5 md:p-6 h-full flex flex-col justify-between min-h-[180px]">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-foreground mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                  Community-First
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Learn alongside 2,500+ professionals globally on the same journey to AI mastery.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Small feature - Practical */}
          <BentoCard glowColor="amber" delay={300}>
            <div className="p-5 md:p-6 h-full flex flex-col justify-between min-h-[180px]">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-foreground mb-1 group-hover:text-amber-400 transition-colors duration-300">
                  Hands-On Projects
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Build real things with AI. Portfolio-ready projects you can show employers.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Small feature - Certificates */}
          <BentoCard glowColor="purple" delay={400}>
            <div className="p-5 md:p-6 h-full flex flex-col justify-between min-h-[180px]">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-foreground mb-1 group-hover:text-purple-400 transition-colors duration-300">
                  Verified Certificates
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Earn certificates that prove your AI skills to employers and clients.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Wide feature - Global Context */}
          <BentoCard span="col-span-2" glowColor="accent" delay={500}>
            <div className="h-full flex flex-col md:flex-row overflow-hidden">
              {/* Image side */}
              <div className="relative w-full md:w-2/5 h-44 md:h-auto overflow-hidden flex-shrink-0">
                <img
                  src="/images/landing/built_for_global.png"
                  alt="Professionals working together"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card md:bg-gradient-to-l md:from-card md:to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent md:from-transparent" />
              </div>
              
              {/* Text side */}
              <div className="p-5 md:p-8 flex-1 relative">
                <h3 className="text-lg md:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  Built for the Global Context
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                  Every course, example, and project is designed with real-world scenarios in mind. We understand 
                  the rapidly shifting landscape, global challenges, and opportunities. This isn't theoretical education —
                  it's real-world brilliance powered by global technology.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Real-world Case Studies", "Accessible Pricing", "Global Mentors", "Offline Access", "Low-Bandwidth Friendly"].map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 rounded-full text-xs bg-accent/10 border border-accent/20 text-accent font-medium hover:bg-accent/20 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

export default StoryBentoSection;
