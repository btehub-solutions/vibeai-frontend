import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Get started with the fundamentals of AI learning.",
    features: [
      "Access to introductory modules",
      "Basic AI tools overview",
      "Community forum access",
      "Weekly newsletter",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro Learner",
    price: "₦15,000",
    period: "/month",
    description: "Full access to all learning paths and resources.",
    features: [
      "All learning paths unlocked",
      "Complete AI tools library",
      "Priority support",
      "Certificate of completion",
      "Live Q&A sessions",
      "Exclusive workshops",
    ],
    cta: "Get Pro Access",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "₦50,000",
    period: "/month",
    description: "For teams and organizations serious about AI adoption.",
    features: [
      "Everything in Pro",
      "Team management dashboard",
      "Custom learning paths",
      "Dedicated account manager",
      "API access",
      "White-label options",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="section-padding bg-background relative">
      <div className="container-narrow mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
            Pricing
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Invest in your AI future
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your learning goals. 
            Upgrade or downgrade anytime as your needs evolve.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? "glass-card border-primary/40 scale-[1.02]"
                  : "glass-card hover:border-white/20"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check size={12} className="text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to="/dashboard"
                className={`block w-full text-center py-3 rounded-lg font-medium transition-all duration-300 ${
                  plan.popular
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            14-day money-back guarantee on all paid plans. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;