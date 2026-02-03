import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useRef } from "react";
import { useInView } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Get started with AI fundamentals.",
    features: [
      "Access to introductory modules",
      "Basic AI tools overview",
      "Community forum access",
    ],
    cta: "Start free",
    popular: false,
  },
  {
    name: "Pro",
    price: "₦15,000",
    period: "/mo",
    description: "Full access to everything.",
    features: [
      "All learning paths unlocked",
      "Complete AI tools library",
      "Priority support",
      "Certificate of completion",
      "Live Q&A sessions",
    ],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "₦50,000",
    period: "/mo",
    description: "For teams serious about AI.",
    features: [
      "Everything in Pro",
      "Team management",
      "Custom learning paths",
      "Dedicated support",
      "API access",
    ],
    cta: "Contact sales",
    popular: false,
  },
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="section-padding bg-card relative overflow-hidden section-rounded-top">
      {/* Green glow - hidden on mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-accent/5 blur-[100px] md:blur-[150px] rounded-full hidden md:block" />
      
      <div className="container-main relative" ref={ref}>
        {/* Header */}
        <div 
          className="text-center max-w-2xl mx-auto mb-12 md:mb-20"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-display-md text-foreground mb-4 md:mb-6">
            Invest in your AI future
          </h2>
          <p className="text-base md:text-body-lg text-muted-foreground">
            Simple pricing that grows with you. Start free, upgrade when ready.
          </p>
        </div>

        {/* Pricing Cards - Shopify blended style */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`glass-panel p-6 md:p-8 rounded-3xl relative transition-all duration-500 group ${
                plan.popular
                  ? "border-accent/50 shadow-[0_0_40px_-10px_rgba(180,255,50,0.15)] scale-[1.02] z-10"
                  : "hover:border-accent/30 hover:-translate-y-2"
              }`}
              style={{
                transform: isInView ? "none" : "translateY(40px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.1 + index * 0.1}s`
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-bold shadow-[0_4px_20px_-5px_rgba(180,255,50,0.4)] uppercase tracking-wide flex items-center gap-1.5">
                    <Check size={12} strokeWidth={4} />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Background Gradient for popular card */}
              {plan.popular && (
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
              )}

              <div className="mb-6 md:mb-8 relative z-10">
                <h3 className={`text-lg font-semibold mb-2 ${plan.popular ? "text-accent" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl md:text-4xl font-bold text-foreground">
                    {plan.price}
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
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.popular
                    ? "bg-accent text-accent-foreground hover:shadow-[0_0_30px_-5px_rgba(180,255,50,0.4)] hover:scale-[1.02]"
                    : "bg-white/5 text-foreground hover:bg-white/10 border border-white/10 hover:border-white/20"
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
          14-day money-back guarantee. No questions asked.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
