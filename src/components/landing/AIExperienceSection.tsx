import { useState } from "react";
import { Monitor, MessageSquare, FileText, Image } from "lucide-react";

const experiences = [
  {
    id: "text",
    icon: FileText,
    title: "Text-Based Learning",
    description:
      "Deep, comprehensive written content that explains concepts clearly. Read at your pace, revisit anytime.",
  },
  {
    id: "interactive",
    icon: Monitor,
    title: "Interactive Examples",
    description:
      "See AI in action with live demonstrations. Understand by observing real inputs and outputs.",
  },
  {
    id: "prompts",
    icon: MessageSquare,
    title: "Prompt Engineering",
    description:
      "Master the art of communicating with AI. Learn effective prompting techniques that get results.",
  },
  {
    id: "creation",
    icon: Image,
    title: "Practical Creation",
    description:
      "Apply what you learn. Create real outputs using AI tools as part of your learning journey.",
  },
];

const AIExperienceSection = () => {
  const [activeExperience, setActiveExperience] = useState("text");

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container-narrow mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
            The Learning Experience
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Learn AI, your way
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A multi-faceted learning experience designed for how humans actually learn. 
            Theory, examples, and practice working together.
          </p>
        </div>

        {/* Experience Selector */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Experience List */}
          <div className="space-y-4">
            {experiences.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setActiveExperience(exp.id)}
                className={`w-full text-left p-6 rounded-xl transition-all duration-300 ${
                  activeExperience === exp.id
                    ? "glass-card border-primary/30"
                    : "bg-transparent hover:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      activeExperience === exp.id
                        ? "bg-primary/10"
                        : "bg-secondary"
                    }`}
                  >
                    <exp.icon
                      className={`w-5 h-5 transition-colors duration-300 ${
                        activeExperience === exp.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                        activeExperience === exp.id
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {exp.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed transition-colors duration-300 ${
                        activeExperience === exp.id
                          ? "text-muted-foreground"
                          : "text-muted-foreground/60"
                      }`}
                    >
                      {exp.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Visual Preview */}
          <div className="relative">
            <div className="glass-panel p-8 aspect-[4/3] flex items-center justify-center">
              <div className="text-center">
                {/* Simulated Interface */}
                <div className="glass-card p-6 mb-6 max-w-sm mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-white/10 rounded w-full" />
                    <div className="h-3 bg-white/10 rounded w-4/5" />
                    <div className="h-3 bg-white/10 rounded w-3/5" />
                    <div className="h-8 bg-primary/20 rounded w-2/3 mt-4" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Interactive learning interface
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIExperienceSection;