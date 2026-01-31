import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSolutionSection from "@/components/landing/ProblemSolutionSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import AIExperienceSection from "@/components/landing/AIExperienceSection";
import CoursesSection from "@/components/landing/CoursesSection";
import AIToolsSection from "@/components/landing/AIToolsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import Footer from "@/components/landing/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <HowItWorksSection />
        <AIExperienceSection />
        <CoursesSection />
        <AIToolsSection />
        <TestimonialsSection />
        <PricingSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
