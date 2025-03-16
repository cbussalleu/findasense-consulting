
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SpecializedApproachSection } from "@/components/SpecializedApproachSection";
import { ScenarioFlowSection } from "@/components/ScenarioFlowSection";
import { SolutionsCapabilitiesSection } from "@/components/solutions/SolutionsCapabilitiesSection";
import { ProofSection } from "@/components/ProofSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { NewsSection } from "@/components/NewsSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark text-white overflow-hidden">
      <Navbar />
      <Hero />
      <SpecializedApproachSection />
      <ScenarioFlowSection />
      <SolutionsCapabilitiesSection />
      <ProofSection />
      <ResourcesSection />
      <NewsSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
};

export default Index;
