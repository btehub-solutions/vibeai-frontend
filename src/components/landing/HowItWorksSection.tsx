import { BookOpen, Users, Rocket, Trophy } from "lucide-react";

const steps = [
  {
    icon: BookOpen,
    title: "Choose Your Path",
    description:
      "Select from curated learning paths designed for different skill levels and goals. Start where you are, go where you want.",
  },
  {
    icon: Users,
    title: "Learn With Structure",
    description:
      "Each path guides you through progressive modules. Concepts build naturally, ensuring deep comprehension over surface knowledge.",
  },
  {
    icon: Rocket,
    title: "Apply Your Knowledge",
    description:
      "Practical exercises and real-world applications help cement your learning. Theory meets practice at every step.",
  },
  {
    icon: Trophy,
    title: "Track Your Progress",
    description:
      "See how far you've come. Clear progress indicators and achievements keep you motivated and moving forward.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding bg-background relative">
      <div className="container-narrow mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Learning made simple
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A straightforward approach to mastering AI. No complexity, no confusion, 
            just clear paths to understanding.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="glass-card p-8 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                      <step.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Flow Indicator */}
        <div className="mt-16 flex justify-center">
          <div className="glass-panel px-8 py-4 flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Your journey:</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Beginner</span>
              <div className="w-24 h-1 rounded-full bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
              <span className="text-sm font-medium text-foreground">Expert</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;