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
        
        {/* Badge "Capacidades Consulting" */}
        <div className="text-center mb-6">
          <div className="bg-accent/20 text-accent px-4 py-2 rounded-full inline-flex items-center text-sm font-mono border border-accent/30 shadow-lg shadow-accent/10 pulse-subtle">
            <span className="mr-2 animate-pulse">●</span>
            <span>Capacidades Consulting</span>
          </div>
        </div>
        
        <div className="relative">
          {/* Capacidades - ahora con mayor separación de los círculos */}
          <div className="w-full mb-32"> {/* Aumentado el margen inferior */}
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
          <div className="relative w-full h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center">
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
      </div>
    </section>
  );
};
