import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { 
  X, Check, ArrowRight, Clock, DollarSign, Brain, 
  Frown, Smile, TrendingDown, TrendingUp, Sparkles
} from "lucide-react";

const beforeAfter = [
  {
    before: "Spends 4 hours writing a business proposal manually",
    after: "Generates a professional proposal in 15 minutes with AI",
    icon: Clock,
  },
  {
    before: "Pays thousands of dollars for exclusive AI education",
    after: "Accesses premium AI education starting free — globally accessible",
    icon: DollarSign,
  },
  {
    before: "Feels overwhelmed by AI jargon and hype",
    after: "Understands AI practically through guided real-world examples",
    icon: Brain,
  },
  {
    before: "Watches jobs get automated, feels helpless",
    after: "Uses AI as a superpower to become 10x more productive",
    icon: TrendingUp,
  },
];

const BeforeAfterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStory, setActiveStory] = useState(0);

  return (
    <section className="section-padding bg-secondary relative overflow-hidden section-rounded-top">
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-red-500/5 blur-[100px] md:blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-accent/5 blur-[100px] md:blur-[120px] rounded-full" />
      
      <div className="container-main relative" ref={ref}>
        {/* Header */}
        <div
          className="max-w-4xl mb-12 md:mb-20"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="text-xs md:text-sm text-amber-400 font-medium tracking-wide uppercase">Chapter 7 — The Transformation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-display-md lg:text-display-lg text-foreground mb-4 md:mb-6 font-bold tracking-tight">
            This is what changes when you become{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-accent to-emerald-400">
              AI fluent.
            </span>
          </h2>
          <p className="text-base md:text-body-lg text-muted-foreground leading-relaxed">
            It's not about replacing you. It's about upgrading you. See the real, everyday difference 
            AI fluency makes for professionals just like you.
          </p>
        </div>

        {/* Main Before/After Visual */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16">
          {/* Before Column */}
          <div
            className="rounded-2xl md:rounded-3xl border border-red-500/20 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,80,80,0.05) 0%, rgba(255,255,255,0.01) 100%)',
              transform: isInView ? "none" : "translateX(-40px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s"
            }}
          >
            {/* Before header image — frustrated Black professional */}
            <div className="relative h-44 md:h-56 overflow-hidden">
              <img
                src="/images/landing/before_frustrated.png"
                alt="Frustrated professional before AI fluency"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-red-950/30" />
              <div className="absolute bottom-4 left-5 md:bottom-6 md:left-8 flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                  <Frown className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg md:text-2xl font-bold text-red-400">Before VibeAI</h3>
                  <p className="text-xs md:text-sm text-red-300/60">The struggle is real</p>
                </div>
              </div>
            </div>
            
            <div className="p-5 md:p-8 space-y-4">
              {beforeAfter.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 md:p-4 rounded-xl transition-all duration-500 ${
                    activeStory === i ? "bg-red-500/10 border border-red-500/20" : "border border-transparent hover:bg-white/[0.02]"
                  }`}
                  onMouseEnter={() => setActiveStory(i)}
                >
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-red-400" />
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground">{item.before}</p>
                </div>
              ))}
            </div>
          </div>

          {/* After Column */}
          <div
            className="rounded-2xl md:rounded-3xl border border-accent/30 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(180,255,50,0.05) 0%, rgba(255,255,255,0.01) 100%)',
              transform: isInView ? "none" : "translateX(40px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
            }}
          >
            {/* After header image — confident Black professionals */}
            <div className="relative h-44 md:h-56 overflow-hidden">
              <img
                src="/images/landing/after_confident.png"
                alt="Confident professionals after AI fluency training"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-emerald-950/20" />
              <div className="absolute bottom-4 left-5 md:bottom-6 md:left-8 flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                  <Smile className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg md:text-2xl font-bold text-accent">After VibeAI</h3>
                  <p className="text-xs md:text-sm text-accent/60">The upgrade is real</p>
                </div>
              </div>
            </div>
            
            <div className="p-5 md:p-8 space-y-4">
              {beforeAfter.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 md:p-4 rounded-xl transition-all duration-500 ${
                    activeStory === i ? "bg-accent/10 border border-accent/20" : "border border-transparent hover:bg-white/[0.02]"
                  }`}
                  onMouseEnter={() => setActiveStory(i)}
                >
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <p className="text-sm md:text-base text-foreground">{item.after}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transformation stat row */}
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5"
          style={{
            transform: isInView ? "none" : "translateY(30px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
          }}
        >
          {[
            { value: "10x", label: "Faster content creation", icon: TrendingUp, color: "text-accent" },
            { value: "30%", label: "Cost reduction avg.", icon: DollarSign, color: "text-emerald-400" },
            { value: "95%", label: "Say AI boosted career", icon: Brain, color: "text-cyan-400" },
            { value: "4hrs", label: "Saved per day on average", icon: Clock, color: "text-amber-400" },
          ].map((stat, i) => (
            <div 
              key={stat.label} 
              className="p-4 md:p-6 rounded-2xl border border-white/[0.06] backdrop-blur-xl text-center group hover:border-accent/20 transition-all duration-500"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)' }}
            >
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`} />
              <p className={`text-2xl md:text-4xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
