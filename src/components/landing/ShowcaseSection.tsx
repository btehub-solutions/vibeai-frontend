import { useRef } from "react";
import { useInView } from "framer-motion";

const courses = [
  {
    title: "Prompt Engineering",
    subtitle: "Master the art",
    price: "₦49,500",
    gradient: "from-emerald-600/20 to-teal-600/20",
    borderColor: "border-emerald-500/20",
  },
  {
    title: "ChatGPT Pro",
    subtitle: "Beyond basics",
    price: "₦75,000",
    gradient: "from-violet-600/20 to-purple-600/20",
    borderColor: "border-violet-500/20",
  },
  {
    title: "AI for Business",
    subtitle: "Enterprise ready",
    price: "₦125,000",
    gradient: "from-amber-600/20 to-orange-600/20",
    borderColor: "border-amber-500/20",
  },
];

const ShowcaseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-accent/5 blur-[150px] rounded-full" />
      
      <div className="container-main relative" ref={ref}>
        {/* Main showcase card - Shopify featured style */}
        <div 
          className="card-elevated p-6 md:p-10 lg:p-16 overflow-hidden"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          {/* Inner gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-emerald-600/5" />
          
          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Layered device mockups */}
            <div className="relative order-2 lg:order-1">
              {/* Tablet mockup - main */}
              <div className="relative w-full aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.08] bg-slate-900 shadow-2xl">
                {/* Tablet header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-accent/50" />
                    <span className="text-xs text-foreground font-medium">VibeAI</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded bg-white/10" />
                  </div>
                </div>
                
                {/* Tablet content - course cards */}
                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-2 gap-3">
                    {courses.slice(0, 2).map((course, i) => (
                      <div 
                        key={i}
                        className={`p-3 md:p-4 rounded-xl bg-gradient-to-br ${course.gradient} border ${course.borderColor}`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/10 mb-3" />
                        <p className="text-xs md:text-sm font-medium text-foreground">{course.title}</p>
                        <p className="text-[10px] md:text-xs text-muted-foreground">{course.subtitle}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Bottom section */}
                  <div className="mt-4 p-3 md:p-4 rounded-xl bg-white/5 border border-white/[0.06]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Total Progress</p>
                        <p className="text-lg font-bold text-foreground">68%</p>
                      </div>
                      <div className="w-20 h-20 rounded-full border-4 border-accent/30 flex items-center justify-center">
                        <span className="text-accent font-bold">3/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone mockup - overlapping */}
              <div className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-8 w-[40%] aspect-[9/16] rounded-2xl overflow-hidden border border-white/[0.08] bg-slate-950 shadow-2xl z-10">
                {/* Phone notch */}
                <div className="flex justify-center pt-2">
                  <div className="w-12 h-4 bg-black rounded-full" />
                </div>
                
                {/* Phone content */}
                <div className="p-3 space-y-2">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=200&h=200&fit=crop&q=80"
                      alt="Learning"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 rounded bg-white/20 w-3/4" />
                    <div className="h-2 rounded bg-white/10 w-1/2" />
                  </div>
                  <div className="h-6 rounded-lg bg-accent/30 flex items-center justify-center mt-2">
                    <span className="text-[8px] text-accent font-medium">Enroll</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="order-1 lg:order-2">
              <h3 className="text-display-xs md:text-display-sm text-foreground mb-6">
                Learn anywhere,<br />on any device
              </h3>
              <p className="text-body-md text-muted-foreground mb-8">
                Access your courses from desktop, tablet, or phone. Your progress syncs 
                seamlessly across all devices, so you never miss a beat.
              </p>
              
              {/* Feature list */}
              <div className="space-y-4">
                {[
                  "Responsive design for all screens",
                  "Offline access to downloaded content",
                  "Real-time progress synchronization"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <span className="text-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom showcase - Product highlight */}
        <div 
          className="mt-8 grid md:grid-cols-2 gap-6"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s"
          }}
        >
          {/* Featured course card */}
          <div className="card-elevated p-6 md:p-8 flex items-center gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/[0.08]">
              <img 
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=200&fit=crop&q=80"
                alt="AI Course"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-lg md:text-xl font-semibold text-foreground">AI Fundamentals</p>
              <p className="text-sm text-accent font-medium">₦35,000 NGN</p>
              <p className="text-xs text-muted-foreground mt-1">Most popular course</p>
            </div>
          </div>

          {/* Brand element */}
          <div className="card-elevated p-6 md:p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent/30 to-emerald-500/30 flex items-center justify-center">
                <span className="text-2xl font-bold text-accent">V</span>
              </div>
              <p className="text-foreground font-medium">Trusted by 2,500+ learners</p>
              <p className="text-sm text-muted-foreground">across 40+ countries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
