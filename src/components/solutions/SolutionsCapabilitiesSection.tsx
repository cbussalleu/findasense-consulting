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
      className={`py-24 min-h-[1000px] bg-dark transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-white leading-tight max-w-5xl mx-auto uppercase">
            <span className="text-accent">NUESTRAS CAPACIDADES</span> SE INTEGRAN EN CADA PRÁCTICA PARA <span className="text-primary">OFRECER SOLUCIONES</span> A NUESTROS CLIENTES
          </h2>
          <div className="mt-8 w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        {/* GRUPO UNIFICADO: Badge + Capacidades */}
        <div className="relative flex flex-col items-center mb-32">
          {/* Badge */}
          <div className="mb-8">
            <div className="bg-accent/20 text-accent px-4 py-2 rounded-full inline-flex items-center text-sm font-mono border border-accent/30 shadow-lg shadow-accent/10 pulse-subtle">
              <span className="mr-2 animate-pulse">●</span>
              <span>Capacidades Consulting</span>
            </div>
          </div>
          
          {/* Capacidades - ahora como elementos estáticos, no absolutos */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-3xl mx-auto">
            {consultingCapabilities.map((capability) => (
              <div 
                key={capability}
                className={`bg-accent/10 text-accent px-3 py-2 rounded-full text-xs font-mono text-center cursor-pointer border border-accent/20 transition-all duration-300 ${
                  hoveredPractice ? "opacity-50 hover:opacity-100" : ""
                }`}
                onClick={() => {
                  // Deseleccionar cuando ya hay uno seleccionado
                  if (hoveredPractice) {
                    setHoveredPractice(null);
                  }
                }}
              >
                {capability}
              </div>
            ))}
          </div>
        </div>
        
        {/* CÍRCULOS - Completamente separados */}
        <div className="relative w-full h-[400px] md:h-[500px]">
          <div className="w-full h-full flex justify-center items-center">
            {practiceAreas.map((practice, index) => (
              <PracticeArea
                key={practice.id}
                practice={practice}
                index={index}
                totalItems={practiceAreas.length}
                hoveredPractice={hoveredPractice}
                setHoveredPractice={setHoveredPractice}
                consultingCapabilities={consultingCapabilities}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
