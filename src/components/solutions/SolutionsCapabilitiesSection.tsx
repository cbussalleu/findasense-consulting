
import { useEffect, useRef, useState } from 'react';
import { PracticeArea } from './PracticeArea';
import { ConsultingCapability } from './ConsultingCapability';
import { practiceAreas, consultingCapabilities } from './data';
import { useIsMobile } from '@/hooks/use-mobile';

export const SolutionsCapabilitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPractice, setHoveredPractice] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="solutions"
      ref={sectionRef} 
      className={`py-24 min-h-screen bg-dark transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-white leading-tight max-w-5xl mx-auto uppercase">
            <span className="text-accent">NUESTRAS CAPACIDADES</span> SE INTEGRAN EN CADA PRÁCTICA PARA <span className="text-primary">OFRECER SOLUCIONES</span> A NUESTROS CLIENTES
          </h2>
          <div className="mt-8 w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        {/* Legend for Consulting Capabilities */}
        <div className="text-center mb-8">
          <div className="bg-accent/20 text-accent px-4 py-2 rounded-full inline-flex items-center text-sm font-mono border border-accent/30 shadow-lg shadow-accent/10 pulse-subtle">
            <span className="mr-2 animate-pulse">●</span>
            <span>Capacidades Consulting</span>
          </div>
        </div>
        
        <div className="relative w-full mx-auto" style={{ height: isMobile ? '500px' : '600px' }}>
          {/* Practice Areas - centered in the middle */}
          <div className="w-full h-full flex justify-center items-center">
            {practiceAreas.map((practice, index) => (
              <PracticeArea
                key={practice.id}
                practice={practice}
                index={index}
                totalItems={practiceAreas.length}
                hoveredPractice={hoveredPractice}
                setHoveredPractice={setHoveredPractice}
              />
            ))}
          </div>
          
          {/* Consulting capabilities - always visible in outer circle */}
          <div className="w-full h-full">
            {consultingCapabilities.map((capability, index) => (
              <ConsultingCapability
                key={capability}
                capability={capability}
                index={index}
                totalItems={consultingCapabilities.length}
                hoveredPractice={hoveredPractice}
                practiceAreas={practiceAreas}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
