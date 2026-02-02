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
      {/* Ambient glows - hidden on mobile */}
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-accent/5 blur-[100px] md:blur-[150px] rounded-full hidden md:block" />
      
      <div className="container-main relative" ref={ref}>
        {/* Main showcase card - Shopify featured style */}
        <div 
          className="card-elevated p-4 sm:p-6 md:p-10 lg:p-16 overflow-hidden"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
          }}
        >
          {/* Inner gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-emerald-600/5" />
          
          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Layered device mockups */}
            <div className="relative order-2 lg:order-1">
              {/* Tablet mockup - main */}
              <div className="relative w-full aspect-[4/3] rounded-xl md:rounded-3xl overflow-hidden border border-white/[0.08] bg-slate-900 shadow-2xl">
                {/* Tablet header */}
                <div className="flex items-center justify-between px-3 md:px-4 py-1.5 md:py-2 border-b border-white/[0.06]">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-sm bg-accent/50" />
                    <span className="text-[10px] md:text-xs text-foreground font-medium">VibeAI</span>
                  </div>
                  <div className="flex gap-1.5 md:gap-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-white/10" />
                  </div>
                </div>
                
                {/* Tablet content - course cards */}
                <div className="p-3 md:p-6">
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    {courses.slice(0, 2).map((course, i) => (
                      <div 
                        key={i}
                        className={`p-2 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-br ${course.gradient} border ${course.borderColor}`}
                      >
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white/10 mb-2 md:mb-3" />
                        <p className="text-[10px] md:text-sm font-medium text-foreground">{course.title}</p>
                        <p className="text-[8px] md:text-xs text-muted-foreground">{course.subtitle}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Bottom section */}
                  <div className="mt-3 md:mt-4 p-2 md:p-4 rounded-lg md:rounded-xl bg-white/5 border border-white/[0.06]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] md:text-xs text-muted-foreground">Total Progress</p>
                        <p className="text-base md:text-lg font-bold text-foreground">68%</p>
                      </div>
                      <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-4 border-accent/30 flex items-center justify-center">
                        <span className="text-accent font-bold text-sm md:text-base">3/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone mockup - overlapping - hidden on very small screens */}
              <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4 md:-bottom-8 md:-right-8 w-[35%] md:w-[40%] aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden border border-white/[0.08] bg-slate-950 shadow-2xl z-10 hidden sm:block">
                {/* Phone notch */}
                <div className="flex justify-center pt-1.5 md:pt-2">
                  <div className="w-8 md:w-12 h-3 md:h-4 bg-black rounded-full" />
                </div>
                
                {/* Phone content */}
                <div className="p-2 md:p-3 space-y-1.5 md:space-y-2">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=200&h=200&fit=crop&q=80"
                      alt="Learning"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 md:h-2 rounded bg-white/20 w-3/4" />
                    <div className="h-1.5 md:h-2 rounded bg-white/10 w-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="order-1 lg:order-2">
              <h3 className="text-xl sm:text-2xl md:text-display-sm text-foreground mb-4 md:mb-6">
                Learn anywhere,<br />on any device
              </h3>
              <p className="text-sm md:text-body-md text-muted-foreground mb-6 md:mb-8">
                Access your courses from desktop, tablet, or phone. Your progress syncs 
                seamlessly across all devices, so you never miss a beat.
              </p>
              
              {/* Feature list */}
              <div className="space-y-3 md:space-y-4">
                {[
                  "Responsive design for all screens",
                  "Offline access to downloaded content",
                  "Real-time progress synchronization"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 md:gap-3">
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent" />
                    </div>
                    <span className="text-foreground text-xs md:text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom showcase - Product highlight */}
        <div 
          className="mt-6 md:mt-8 grid sm:grid-cols-2 gap-4 md:gap-6"
          style={{
            transform: isInView ? "none" : "translateY(40px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s"
          }}
        >
          {/* Featured course card */}
          <div className="card-elevated p-4 md:p-8 flex items-center gap-4 md:gap-6">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 border border-white/[0.08]">
              <img 
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=200&fit=crop&q=80"
                alt="AI Course"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-base md:text-xl font-semibold text-foreground">AI Fundamentals</p>
              <p className="text-sm text-accent font-medium">₦35,000 NGN</p>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-1">Most popular course</p>
            </div>
          </div>

          {/* Brand element */}
          <div className="card-elevated p-4 md:p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-accent/30 to-emerald-500/30 flex items-center justify-center">
                <span className="text-xl md:text-2xl font-bold text-accent">V</span>
              </div>
              <p className="text-foreground font-medium text-sm md:text-base">Trusted by 2,500+ learners</p>
              <p className="text-xs md:text-sm text-muted-foreground">across 40+ countries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
