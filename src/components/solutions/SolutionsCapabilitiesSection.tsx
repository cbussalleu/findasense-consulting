
import { useEffect, useRef, useState } from 'react';
import { PracticeArea } from './PracticeArea';
import { ConsultingCapability } from './ConsultingCapability';
import { practiceAreas, consultingCapabilities } from './data';

export const SolutionsCapabilitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPractice, setHoveredPractice] = useState<string | null>(null);

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
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-white leading-tight max-w-5xl mx-auto uppercase">
            <span className="text-accent">NUESTRAS CAPACIDADES</span> SE INTEGRAN EN CADA PRÁCTICA PARA <span className="text-primary">OFRECER SOLUCIONES</span> A NUESTROS CLIENTES
          </h2>
          <div className="mt-8 w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        {/* Legend for Consulting Capabilities */}
        <div className="text-center mb-12">
          <div className="bg-accent/10 text-accent px-4 py-2 rounded-full inline-flex items-center text-sm font-mono">
            <span>Capacidades Consulting</span>
          </div>
        </div>
        
        <div className="relative w-full aspect-square max-w-3xl mx-auto">
          {/* Practice Areas */}
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
          
          {/* Consulting capabilities */}
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
    </section>
  );
};
