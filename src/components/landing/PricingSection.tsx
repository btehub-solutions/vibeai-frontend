import { Link } from "react-router-dom";
import { Check, Sparkles, Crown, Building } from "lucide-react";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Starter",
      monthlyPrice: "Free",
      yearlyPrice: "Free",
      period: "",
      description: "Get started with AI fundamentals.",
      icon: Sparkles,
      features: [
        "Access to introductory modules",
        "Basic AI tools overview",
        "Community forum access",
      ],
      cta: "Start free",
      popular: false,
      glowColor: "rgba(255, 255, 255, 0.05)",
      accentColor: "text-foreground",
      iconColor: "text-muted-foreground",
    },
    {
      name: "Pro",
      monthlyPrice: "$15",
      yearlyPrice: "$150",
      period: billingCycle === "monthly" ? "/mo" : "/yr",
      description: "Full access to everything.",
      icon: Crown,
      features: [
        "All learning paths unlocked",
        "Complete AI tools library",
        "Priority support",
        "Certificate of completion",
        "Live Q&A sessions",
      ],
      cta: "Start free trial",
      popular: true,
      glowColor: "rgba(180, 255, 50, 0.1)",
      accentColor: "text-accent",
      iconColor: "text-accent",
    },
    {
      name: "Enterprise",
      monthlyPrice: "$50",
      yearlyPrice: "$500",
      period: billingCycle === "monthly" ? "/mo" : "/yr",
      description: "For teams serious about AI.",
      icon: Building,
      features: [
        "Everything in Pro",
        "Team management",
        "Custom learning paths",
        "Dedicated support",
        "API access",
      ],
      cta: "Contact sales",
      popular: false,
      glowColor: "rgba(160, 80, 255, 0.05)",
      accentColor: "text-foreground",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <section id="pricing" className="section-padding bg-card relative overflow-hidden section-rounded-top">
      {/* Green glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-accent/5 blur-[100px] md:blur-[150px] rounded-full hidden md:block" />
      
      <div className="container-main relative" ref={ref}>
        {/* Header */}
        <div 
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="text-xs md:text-sm text-accent font-medium">💰 Simple Pricing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-display-md text-foreground mb-4 md:mb-6">
            Invest in your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">AI future</span>
          </h2>
          <p className="text-base md:text-body-lg text-muted-foreground mb-8">
             Simple pricing that grows with you. Start free, upgrade when ready.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
             <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
             <button
                onClick={() => setBillingCycle(prev => prev === "monthly" ? "yearly" : "monthly")}
                className="relative w-14 h-7 bg-white/10 rounded-full transition-colors hover:bg-white/20 focus:outline-none"
             >
                <div 
                   className={`absolute top-1 w-5 h-5 rounded-full bg-accent transition-transform duration-300 ${billingCycle === "yearly" ? "left-8" : "left-1"}`}
                />
             </button>
             <span className={`text-sm font-medium flex items-center gap-2 ${billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground"}`}>
                Yearly
                <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-wider">Save 17%</span>
             </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative p-6 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-xl border transition-all duration-700 group ${
                plan.popular
                  ? "border-accent/50 z-10"
                  : "border-white/[0.06]"
              }`}
              style={{
                background: `linear-gradient(135deg, ${plan.glowColor} 0%, rgba(255,255,255,0.01) 100%)`,
                transform: isInView 
                  ? (hoveredIndex === index ? "translateY(-8px)" : plan.popular ? "scale(1.02)" : "none")
                  : "translateY(40px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.1 + index * 0.1}s`,
                boxShadow: plan.popular 
                  ? '0 0 60px -15px rgba(180,255,50,0.15)' 
                  : hoveredIndex === index 
                    ? '0 20px 60px -15px rgba(180,255,50,0.1)' 
                    : 'none',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-bold shadow-[0_4px_20px_-5px_rgba(180,255,50,0.4)] uppercase tracking-wide flex items-center gap-1.5">
                    <Crown size={12} />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Popular card gradient */}
              {plan.popular && (
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none rounded-2xl md:rounded-3xl" />
              )}

              <div className="mb-6 md:mb-8 relative z-10">
                {/* Plan icon */}
                <div className={`w-10 h-10 rounded-xl ${plan.popular ? 'bg-accent/20 border-accent/30' : 'bg-white/5 border-white/10'} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  <plan.icon size={18} className={plan.iconColor} />
                </div>

                <h3 className={`text-lg font-semibold mb-2 ${plan.accentColor}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl md:text-4xl font-bold text-foreground">
                    {billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-4 mb-8 relative z-10">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? "bg-accent text-accent-foreground" : "bg-white/10 text-muted-foreground"}`}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span className="text-sm text-foreground/90">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/dashboard"
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-500 flex items-center justify-center gap-2 ${
                  plan.popular
                    ? "bg-accent text-accent-foreground hover:shadow-[0_0_40px_-5px_rgba(180,255,50,0.4)] hover:scale-[1.02]"
                    : "bg-white/5 text-foreground hover:bg-white/10 border border-white/10 hover:border-accent/30"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <p 
          className="text-center text-xs md:text-sm text-muted-foreground mt-8 md:mt-12"
          style={{
            opacity: isInView ? 1 : 0,
            transition: "opacity 0.9s ease 0.5s"
          }}
        >
          14-day money-back guarantee. No questions asked. 🔒
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
