import { useRef } from "react";
import { useInView } from "framer-motion";
import { Zap, BookOpen, Target, Award } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Structured paths",
    description: "Clear progression from fundamentals to mastery. Each module builds naturally on the last.",
  },
  {
    icon: Zap,
    title: "Always current",
    description: "Content that evolves with the AI landscape. What you learn today is relevant tomorrow.",
  },
  {
    icon: Target,
    title: "Practical focus",
    description: "Theory meets application. Real skills you can use immediately in your work.",
  },
  {
    icon: Award,
    title: "Track progress",
    description: "See how far you've come with clear milestones and achievements along the way.",
  },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="section-padding bg-card relative">
      {/* Rounded top edge - Shopify style */}
      <div className="absolute -top-8 left-0 right-0 h-16 bg-background rounded-b-[3rem]" />
      
      <div className="container-main" ref={ref}>
        {/* Header */}
        <div 
          className="max-w-3xl mb-20"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <h2 className="text-display-sm md:text-display-md text-foreground mb-6">
            Learning, simplified
          </h2>
          <p className="text-body-lg text-muted-foreground">
            A straightforward approach to AI mastery. No complexity, no confusion.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex gap-6"
              style={{
                transform: isInView ? "none" : "translateY(40px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.1 + index * 0.1}s`
              }}
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual element - Journey bar */}
        <div 
          className="mt-24 py-8 px-12 rounded-3xl bg-secondary/50 flex items-center justify-between"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
          }}
        >
          <span className="text-lg font-medium text-foreground">Beginner</span>
          <div className="flex-1 mx-8 h-1 rounded-full bg-gradient-to-r from-accent via-accent/50 to-muted relative">
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent" />
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent/60" />
            <div className="absolute left-3/4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-muted" />
          </div>
          <span className="text-lg font-medium text-foreground">Expert</span>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;