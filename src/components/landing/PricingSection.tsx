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
              className={`relative rounded-2xl md:rounded-3xl p-5 md:p-8 transition-all duration-500 border ${
                plan.popular
                  ? "bg-primary text-primary-foreground border-primary sm:scale-[1.02] shadow-xl"
                  : "bg-secondary border-white/[0.06] hover:border-accent/20"
              }`}
              style={{
                transform: isInView ? "none" : "translateY(40px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.1 + index * 0.1}s`
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-accent text-accent-foreground text-[10px] md:text-xs font-semibold shadow-lg whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6 md:mb-8">
                <h3 className={`text-base md:text-lg font-semibold mb-3 md:mb-4 ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2 md:mb-3">
                  <span className={`text-3xl md:text-4xl font-bold ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-xs md:text-sm ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 md:gap-3">
                    <Check size={16} className={`flex-shrink-0 mt-0.5 ${plan.popular ? "text-accent" : "text-accent"}`} />
                    <span className={`text-xs md:text-sm ${plan.popular ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/dashboard"
                className={`block w-full text-center py-3 md:py-4 rounded-full font-semibold text-xs md:text-sm transition-all duration-300 ${
                  plan.popular
                    ? "bg-accent text-accent-foreground hover:opacity-90 shadow-lg"
                    : "bg-primary text-primary-foreground hover:opacity-90"
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
