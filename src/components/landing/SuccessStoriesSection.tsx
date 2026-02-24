import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Quote, Star, MapPin, Briefcase, ArrowRight } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Product Manager",
    company: "TechFlow",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80",
    quote: "Before VibeAI, I was intimidated by AI. Now I use ChatGPT daily to write product specs, analyse user data, and create presentations in half the time. My team thinks I'm a wizard.",
    outcome: "Promoted to Senior PM in 6 months",
    outcomeColor: "text-accent",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Entrepreneur",
    company: "Global Logistics Ltd",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80",
    quote: "I run a small logistics company. VibeAI taught me how to use AI for route optimization and customer service chatbots. My operational costs dropped 30% in the first quarter. This isn't just education — it's a business investment.",
    outcome: "30% cost reduction",
    outcomeColor: "text-emerald-400",
    rating: 5,
  },
  {
    name: "Maria Rodriguez",
    role: "Medical Doctor",
    company: "Central Health Hub",
    location: "Madrid, Spain",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&q=80",
    quote: "As a doctor, I never thought AI was relevant to me. VibeAI showed me how AI is revolutionising diagnostics, drug discovery, and patient care. I now lead our hospital's AI integration committee.",
    outcome: "Leading hospital AI initiative",
    outcomeColor: "text-cyan-400",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Content Creator",
    company: "YouTube (400K subscribers)",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1507152927220-18c1d3315b37?w=400&h=400&fit=crop&q=80",
    quote: "I went from spending 3 days editing a video to finishing in 4 hours. VibeAI taught me Runway, Midjourney, and AI-powered editing workflows. My channel grew 200% because I could post more consistently.",
    outcome: "200% channel growth",
    outcomeColor: "text-purple-400",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "University Student",
    company: "Tech University",
    location: "Toronto, Canada",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&q=80",
    quote: "My professors don't teach practical AI tools. VibeAI filled that gap completely. I now understand prompt engineering, AI ethics, and practical tools that my classmates don't even know exist. I've already landed a tech internship because of these skills.",
    outcome: "Landed tech internship",
    outcomeColor: "text-amber-400",
    rating: 5,
  },
  {
    name: "Alex Thompson",
    role: "Independent Director",
    company: "Indie Films",
    location: "Melbourne, Australia",
    image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=400&h=400&fit=crop&q=80",
    quote: "AI is changing film production. With VibeAI, I learned to use AI for storyboarding, colour grading suggestions, and even script analysis. My production quality jumped and my budget stayed the same. This is the future of cinema.",
    outcome: "Award-winning short film",
    outcomeColor: "text-accent",
    rating: 5,
  },
];

const SuccessStoriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/5 blur-[100px] md:blur-[150px] rounded-full hidden md:block" />
      <div className="absolute bottom-1/4 left-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-purple-500/5 blur-[100px] md:blur-[120px] rounded-full hidden md:block" />
      
      <div className="container-main relative" ref={ref}>
        {/* Chapter Header */}
        <div
          className="mb-12 md:mb-20"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs md:text-sm text-accent font-medium tracking-wide uppercase">Chapter 5 — Real People, Real Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-display-md lg:text-display-lg text-foreground mb-4 md:mb-6 font-bold tracking-tight max-w-5xl">
            Professionals building their{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-400 to-cyan-400">
              AI-powered future.
            </span>
          </h2>
          <p className="text-base md:text-body-lg text-muted-foreground max-w-2xl leading-relaxed">
            These aren't actors. These are real professionals — doctors, filmmakers, students, entrepreneurs — 
            who decided to become AI fluent. Here are their stories.
          </p>
        </div>

        {/* Testimonials Bento Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((person, index) => (
            <div
              key={person.name}
              className={`relative rounded-2xl md:rounded-3xl border border-white/[0.06] overflow-hidden backdrop-blur-xl group cursor-default transition-all duration-700 ${
                index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                transform: isInView ? (hoveredIndex === index ? "translateY(-6px)" : "none") : "translateY(50px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${index * 0.08}s`,
                boxShadow: hoveredIndex === index ? '0 20px 60px -15px rgba(180,255,50,0.1)' : 'none',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Hover background glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="p-5 md:p-7 h-full flex flex-col">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-accent/20 mb-4 group-hover:text-accent/40 transition-colors duration-300" />
                
                {/* Quote text */}
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-6 flex-1">
                  "{person.quote}"
                </p>

                {/* Outcome badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-5 self-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className={`text-xs font-semibold ${person.outcomeColor}`}>{person.outcome}</span>
                </div>

                {/* Person info */}
                <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-accent/30 transition-colors duration-300 flex-shrink-0">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{person.name}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Briefcase className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{person.role}, {person.company}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span>{person.location}</span>
                    </div>
                  </div>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-0.5 mt-3">
                  {[...Array(person.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-accent fill-accent" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className="text-center mt-12 md:mt-16"
          style={{
            opacity: isInView ? 1 : 0,
            transition: "opacity 0.9s ease 0.8s"
          }}
        >
          <p className="text-muted-foreground mb-4 text-sm md:text-base">
            Join 2,500+ professionals globally who chose to be AI-ready.
          </p>
          <a href="#pricing" className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all duration-300">
            <span>Start Your Story</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
