
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-white leading-tight max-w-5xl mx-auto uppercase">
            <span className="text-accent">NUESTRAS CAPACIDADES</span> SE INTEGRAN EN CADA PRÁCTICA PARA <span className="text-primary">OFRECER SOLUCIONES</span> A NUESTROS CLIENTES
          </h2>
          <div className="mt-8 w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        {/* Legend for Consulting Capabilities */}
        <div className="text-center mb-6">
          <div className="bg-accent/20 text-accent px-4 py-2 rounded-full inline-flex items-center text-sm font-mono border border-accent/30 shadow-lg shadow-accent/10 pulse-subtle">
            <span className="mr-2 animate-pulse">●</span>
            <span>Capacidades Consulting</span>
          </div>
        </div>
        
        {/* Consulting capabilities in a horizontal row when not hovering */}
        <div className={`flex flex-wrap justify-center gap-3 mb-8 transition-all duration-500 ${hoveredPractice ? 'opacity-0 h-0 overflow-hidden m-0' : 'opacity-100'}`}>
          {consultingCapabilities.map((capability, index) => (
            <div 
              key={capability} 
              className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-mono cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-accent/20 capability-tag"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: `${2 + (index % 3) * 0.5}s`
              }}
            >
              {capability}
            </div>
          ))}
        </div>

        <div className="relative w-full mx-auto" style={{ height: isMobile ? '500px' : '600px' }}>
          {/* Practice Areas */}
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
          
          {/* Consulting capabilities - only visible when hovering a practice */}
          <div className={`${hoveredPractice ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-500`}>
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
