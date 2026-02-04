
import { Star, Quote } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Digital Artist",
    company: "Freelance",
    content: "VibeAI completely transformed my workflow. I used to spend hours searching for the right prompts, but now I can generate stunning visuals in minutes. The learning curve was non-existent.",
    rating: 5,
    initials: "AR"
  },
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow",
    content: "The consistent quality of the outputs is what impresses me most. We use VibeAI for all our social media assets now. It's like having a 24/7 design team.",
    rating: 5,
    initials: "SC"
  },
  {
    name: "Marcus Johnson",
    role: "Content Creator",
    company: "YouTube",
    content: "I was skeptical about AI tools, but VibeAI feels different. It gives me control while enhancing my creativity. The community prompts are a goldmine.",
    rating: 5,
    initials: "MJ"
  },
  {
    name: "Emily Davis",
    role: "UX Designer",
    company: "Creative Studio",
    content: "As a designer, I need precision. VibeAI delivers exactly that. The ability to fine-tune prompts and get predictable results is a game-changer for professional work.",
    rating: 5,
    initials: "ED"
  },
  {
    name: "David Kim",
    role: "Startup Founder",
    company: "NextGen",
    content: "Time is money. VibeAI saves me both. We launched our entire brand identity using assets generated on this platform. It's incredibly powerful.",
    rating: 5,
    initials: "DK"
  },
  {
    name: "Jessica Williams",
    role: "Social Media Manager",
    company: "BuzzAgency",
    content: "The variety of styles available is mind-blowing. From photorealistic to abstract, VibeAI handles it all. My engagement rates have doubled since we started using these visuals.",
    rating: 5,
    initials: "JW"
  },
  {
    name: "Ryan Thompson",
    role: "Game Developer",
    company: "IndieDev",
    content: "Generating textures and concept art has never been easier. VibeAI is an essential part of our dev pipeline now. Highly recommended for any game dev.",
    rating: 5,
    initials: "RT"
  },
  {
    name: "Lisa Garcia",
    role: "Fashion Blogger",
    company: "StyleIcon",
    content: "I love how I can experiment with different aesthetics for my blog. VibeAI helps me visualize trends before I even shoot them. It's my secret weapon.",
    rating: 5,
    initials: "LG"
  },
  {
    name: "Tom Wilson",
    role: "Architect",
    company: "ModernBuild",
    content: "For quick concept visualizations, VibeAI is unbeatable. It understands architectural terms surprisingly well and helps communicate ideas to clients effortlessly.",
    rating: 5,
    initials: "TW"
  }
];

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Header Section */}
        <section className="relative px-4 py-16 md:py-24 overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-0 left-1/4 w-1/2 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-1/2 h-96 bg-accent/10 blur-[150px] rounded-full pointer-events-none" />

          <div className="container-main relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6 border border-accent/20">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold uppercase tracking-wider">Community Love</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Loved by <span className="text-accent-gradient">Creators</span> <br className="hidden md:block" />
              Trusted by Professionals
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Don't just take our word for it. See what thousands of designers, developers, and artists are creating with VibeAI.
            </p>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="px-4 pb-20">
          <div className="container-main">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="card-elevated p-8 hover:transform hover:scale-[1.02] transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 flex items-center justify-center text-lg font-bold text-foreground group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                        {testimonial.initials}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role} @ {testimonial.company}</p>
                      </div>
                    </div>
                    <Quote className="w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors" />
                  </div>
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="container-main">
            <div className="card-elevated p-12 text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 z-0" />
               <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full z-0" />
               
               <div className="relative z-10 max-w-3xl mx-auto">
                 <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to join the community?</h2>
                 <p className="text-lg text-muted-foreground mb-8">
                   Start creating amazing content today with VibeAI. Join thousands of other creators pushing the boundaries of what's possible.
                 </p>
                 <a href="/dashboard" className="btn-primary">
                   Get Started for Free
                 </a>
               </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonials;
