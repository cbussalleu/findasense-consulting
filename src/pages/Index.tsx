
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SpecializedApproachSection } from "@/components/SpecializedApproachSection";
import { GrowthSection } from "@/components/GrowthSection";
import { ProofSection } from "@/components/ProofSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark text-white overflow-hidden">
      <Navbar />
      <Hero />
      <SpecializedApproachSection />
      <GrowthSection />
      <ProofSection />
      <ContactSection />
    </div>
  );
};

export default Index;
