import { useEffect, useRef, useState } from 'react';
import { practiceAreas, consultingCapabilities } from './data';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { PracticeArea } from './PracticeArea';
import { ConsultingCapability } from './ConsultingCapability';

export const SolutionsCapabilitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPractice, setHoveredPractice] = useState<string | null>(null);
  const [isClickActive, setIsClickActive] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsClickActive(hoveredPractice !== null);
  }, [hoveredPractice]);

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

  // Manejador para seleccionar/deseleccionar círculos
  const handlePracticeSelection = (practiceId: string | null) => {
    setHoveredPractice(hoveredPractice === practiceId ? null : practiceId);
  };

  // Función para calcular posición de círculos en formación circular
  const getCirclePosition = (index: number, totalItems: number) => {
    const angleStep = 360 / totalItems;
    const angle = angleStep * index;
    const radius = isMobile ? 110 : 180;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  // Función para calcular posición de capacidades alrededor de un círculo
  const getCapabilityOrbitPosition = (capIndex: number, practiceIndex: number) => {
    if (!hoveredPractice) return null;
    
    const totalCaps = consultingCapabilities.length;
    const { x: practiceX, y: practiceY } = getCirclePosition(practiceIndex, practiceAreas.length);
    
    const orbitRadius = isMobile ? 80 : 100;
    const orbitAngle = 360 / totalCaps * capIndex;
    const orbitX = Math.cos((orbitAngle * Math.PI) / 180) * orbitRadius;
    const orbitY = Math.sin((orbitAngle * Math.PI) / 180) * orbitRadius;
    
    return {
      x: practiceX + orbitX,
      y: practiceY + orbitY
    };
  }

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
        
        {/* Badge "Capacidades Consulting" y capacidades fijas */}
        <div className="text-center mb-12 relative">
          <div className="bg-accent/20 text-accent px-4 py-2 rounded-full inline-flex items-center text-sm font-mono border border-accent/30 shadow-lg shadow-accent/10 pulse-subtle">
            <span className="mr-2 animate-pulse">●</span>
            <span>Capacidades Consulting</span>
          </div>
          
          {/* Capacidades fijas (siempre cerca del badge) */}
          <div className={`w-full relative mt-6 transition-opacity duration-500 ${isClickActive ? 'opacity-0' : 'opacity-100'}`}>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {consultingCapabilities.map((capability, index) => (
                <div 
                  key={`fixed-${capability}`}
                  className="bg-accent/10 text-accent px-3 py-1.5 rounded-full text-xs font-mono cursor-pointer border border-accent/30 capability-tag shadow-sm hover:bg-accent/20 transition-all duration-300 text-center"
                >
                  {capability}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="relative flex flex-col items-center">
          {/* Capacidades animadas (solo visibles al hacer clic) */}
          <div className={`w-full h-40 relative mb-6 mt-4 transition-opacity duration-500 ${isClickActive ? 'opacity-100' : 'opacity-0'}`}>
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
          
          {/* Círculos en disposición circular */}
          <div className="relative w-full h-[450px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              {practiceAreas.map((practice, index) => (
                <PracticeArea
                  key={practice.id}
                  practice={practice}
                  index={index}
                  totalItems={practiceAreas.length}
                  hoveredPractice={hoveredPractice}
                  setHoveredPractice={handlePracticeSelection}
                  consultingCapabilities={consultingCapabilities}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
