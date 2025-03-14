
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { GrowthSection } from "@/components/GrowthSection";
import { ProofSection } from "@/components/ProofSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark text-white overflow-hidden">
      <Navbar />
      <Hero />
      <GrowthSection />
      <ProofSection />
      <ContactSection />
    </div>
  );
};

export default Index;
