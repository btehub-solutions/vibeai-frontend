import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StoryBentoSection from "@/components/landing/StoryBentoSection";
import NigerianIndustriesSection from "@/components/landing/NigerianIndustriesSection";
import BeforeAfterSection from "@/components/landing/BeforeAfterSection";
import SuccessStoriesSection from "@/components/landing/SuccessStoriesSection";
import AfricanVisionSection from "@/components/landing/AfricanVisionSection";
import CommunitySection from "@/components/landing/CommunitySection";
import ProblemSolutionSection from "@/components/landing/ProblemSolutionSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import AIExperienceSection from "@/components/landing/AIExperienceSection";
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
        {/* ═══ ACT 1: THE HOOK ═══ */}
        {/* Draw them in with cinematic hero */}
        <HeroSection />

        {/* ═══ ACT 2: THE STORY ═══ */}
        {/* Ch1: AI Revolution → Ch2: Nigeria's Challenge → Ch3: VibeAI Solution */}
        <StoryBentoSection />

        {/* ═══ ACT 3: THE OPPORTUNITY ═══ */}
        {/* Ch4: Nigerian industries being transformed by AI */}
        <NigerianIndustriesSection />

        {/* ═══ ACT 4: THE TRANSFORMATION ═══ */}
        {/* Ch7: Before vs After AI fluency */}
        <BeforeAfterSection />

        {/* ═══ ACT 5: THE PROOF ═══ */}
        {/* Ch5: Real Nigerian success stories */}
        <SuccessStoriesSection />

        {/* ═══ ACT 6: THE VISION ═══ */}
        {/* Ch6: Africa's AI future + Who is VibeAI for */}
        <AfricanVisionSection />

        {/* ═══ ACT 7: THE PRODUCT ═══ */}
        {/* Show what we offer — courses, how it works, experience */}
        <ProblemSolutionSection />
        <HowItWorksSection />
        <AIExperienceSection />
        
        {/* ═══ ACT 8: THE COMMUNITY ═══ */}
        {/* Ch8: Community across Nigeria */}
        <CommunitySection />

        {/* ═══ ACT 9: THE ECOSYSTEM ═══ */}
        {/* Platform showcase, AI tools */}
        <ShowcaseSection />
        <AIToolsSection />
        
        {/* ═══ ACT 10: THE CLOSE ═══ */}
        {/* Pricing & final call to action */}
        <PricingSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;