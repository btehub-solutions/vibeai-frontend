import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSolutionSection from "@/components/landing/ProblemSolutionSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import AIExperienceSection from "@/components/landing/AIExperienceSection";
import GlobalReachSection from "@/components/landing/GlobalReachSection";
import DevToolsSection from "@/components/landing/DevToolsSection";
import ShowcaseSection from "@/components/landing/ShowcaseSection";
import AIToolsSection from "@/components/landing/AIToolsSection";
import PricingSection from "@/components/landing/PricingSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import Footer from "@/components/landing/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <HowItWorksSection />
        <AIExperienceSection />
        <GlobalReachSection />
        <DevToolsSection />
        <ShowcaseSection />
        <AIToolsSection />
        <PricingSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;