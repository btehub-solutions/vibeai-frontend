import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { 
  MessageCircle, Users, Video, BookOpen,
  Award, Sparkles, ArrowRight, Heart
} from "lucide-react";

const communityMembers = [
  { name: "Sarah", location: "Sydney", image: "https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?w=100&h=100&fit=crop&q=80" },
  { name: "Chidi", location: "Abuja", image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop&q=80" },
  { name: "Fatima", location: "Kano", image: "https://images.unsplash.com/photo-1611432579699-484f7990b127?w=100&h=100&fit=crop&q=80" },
  { name: "Emeka", location: "PH", image: "https://images.unsplash.com/photo-1507152927220-18c1d3315b37?w=100&h=100&fit=crop&q=80" },
  { name: "Ngozi", location: "Enugu", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&q=80" },
  { name: "Tunde", location: "Ibadan", image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=100&h=100&fit=crop&q=80" },
  { name: "Amina", location: "Kaduna", image: "https://images.unsplash.com/photo-1594361513929-3bae8f108399?w=100&h=100&fit=crop&q=80" },
  { name: "Segun", location: "Abeokuta", image: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=100&h=100&fit=crop&q=80" },
];

const communityFeatures = [
  {
    icon: MessageCircle,
    title: "WhatsApp & Discord Communities",
    description: "Join active groups where learners share tips, ask questions, and celebrate wins together. Connected communities across major global cities.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(50,200,120,0.15)]",
  },
  {
    icon: Video,
    title: "Weekly Live Sessions",
    description: "Every Friday, join live AI workshops with global AI practitioners. Real demos, real projects, real Q&A. Recorded for those who can't attend live.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(160,80,255,0.15)]",
  },
  {
    icon: BookOpen,
    title: "Study Groups",
    description: "Pair up with accountability partners. Study groups meet virtually and in-person across major technology hubs globally. Nobody learns alone at VibeAI.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(0,210,210,0.15)]",
  },
  {
    icon: Award,
    title: "Mentorship Programme",
    description: "Get matched with experienced AI professionals in the global tech ecosystem. Monthly 1-on-1 sessions to guide your career transition into AI.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(255,180,50,0.15)]",
  },
];

const CommunitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[200px] rounded-full hidden md:block" />
      
      <div className="container-main relative" ref={ref}>
        {/* Chapter Header */}
        <div
          className="max-w-4xl mb-12 md:mb-20"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Heart className="w-3 h-3 text-accent" fill="currentColor" />
            <span className="text-xs md:text-sm text-accent font-medium tracking-wide uppercase">Chapter 8 — The Community</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-display-md lg:text-display-lg text-foreground mb-4 md:mb-6 font-bold tracking-tight">
            You're not learning{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">alone.</span>
          </h2>
          <p className="text-base md:text-body-lg text-muted-foreground leading-relaxed max-w-2xl">
            Behind every great learner is a community that lifts them up. VibeAI connects you with 
            2,500+ professionals globally on the same journey — from London to Sydney, Tokyo to New York.
          </p>
        </div>

        {/* Community mosaic header */}
        <div
          className="mb-12 md:mb-16 relative"
          style={{
            transform: isInView ? "none" : "translateY(30px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s"
          }}
        >
          {/* Community hero image — group */}
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[16/7] border border-white/[0.06]">
            <img
              src="/images/landing/community-hero.jpg"
              alt="VibeAI community of global learners collaborating"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            
            {/* Overlay content */}
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-10 z-10">
              {/* Member avatars */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex -space-x-3">
                  {communityMembers.slice(0, 6).map((member, i) => (
                    <div key={i} className="w-9 h-9 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-background">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-accent/20 border-2 border-background flex items-center justify-center text-xs text-accent font-bold">
                    +2K
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl md:text-3xl font-bold text-foreground">
                2,500+ professionals learning together
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                New York • London • Tokyo • Dubai • Sydney • Singapore • and more
              </p>
            </div>
            
            {/* Live badge */}
            <div className="absolute top-4 right-4 md:top-6 md:right-8 backdrop-blur-xl bg-red-500/20 border border-red-500/30 px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-xs text-red-300 font-medium">Live Community</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {communityFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={`relative rounded-2xl md:rounded-3xl border border-white/[0.06] overflow-hidden backdrop-blur-xl group cursor-default transition-all duration-700 ${feature.glow}`}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                transform: isInView ? (hoveredIndex === index ? "translateY(-6px)" : "none") : "translateY(40px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.3 + index * 0.1}s`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="p-5 md:p-8">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${feature.bg} ${feature.border} border flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <feature.icon className={`w-6 h-6 md:w-7 md:h-7 ${feature.color}`} />
                </div>
                
                <h3 className={`text-lg md:text-xl font-bold text-foreground mb-3 group-hover:${feature.color} transition-colors duration-300`}>
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* City presence row */}
        <div 
          className="mt-12 md:mt-16 text-center"
          style={{
            opacity: isInView ? 1 : 0,
            transition: "opacity 0.9s ease 0.8s"
          }}
        >
          <p className="text-sm text-muted-foreground mb-4">Active communities in</p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {["New York", "London", "Singapore", "Dubai", "Tokyo", "Sydney", "Miami", "Berlin"].map((city) => (
              <span 
                key={city} 
                className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs md:text-sm text-muted-foreground hover:text-accent hover:border-accent/30 transition-all duration-300 cursor-default"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
