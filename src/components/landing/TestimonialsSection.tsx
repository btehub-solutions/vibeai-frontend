import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "VibeAI changed how I approach my work. The practical focus on real AI tools made all the difference.",
    name: "Adaeze Okonkwo",
    role: "Product Manager",
    company: "TechStart Nigeria",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&q=80",
  },
  {
    quote: "Finally, an AI learning platform that shows real people using real tools. No abstract theory, just practical skills.",
    name: "Emeka Nwachukwu",
    role: "Software Engineer",
    company: "Paystack",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80",
  },
  {
    quote: "The courses are incredibly well-structured. I went from AI-curious to AI-confident in just weeks.",
    name: "Chiamaka Eze",
    role: "Marketing Director",
    company: "Flutterwave",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&q=80",
  },
  {
    quote: "What sets VibeAI apart is the community. Learning alongside other professionals made the journey so much better.",
    name: "Oluwaseun Adeyemi",
    role: "Data Analyst",
    company: "Andela",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      <div className="container-main relative" ref={ref}>
        {/* Header */}
        <div 
          className="text-center max-w-3xl mx-auto mb-16"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          <h2 className="text-display-sm md:text-display-md text-foreground mb-6">
            What learners say
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Join thousands of professionals building real AI skills.
          </p>
        </div>

        {/* Testimonial Card */}
        <div 
          className="max-w-4xl mx-auto"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
          }}
        >
          <div className="card-feature p-8 md:p-12 relative">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-muted-foreground/20" />
            
            <div className="relative z-10">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-10 pt-8">
                "{testimonials[currentIndex].quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white/10"
                />
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </div>

            {/* Glow overlay */}
            <div className="glow-overlay" />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/30 hover:bg-white/5 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? "bg-foreground w-8" 
                      : "bg-white/20 w-2 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/30 hover:bg-white/5 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
