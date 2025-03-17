import { useEffect, useRef, useState } from 'react';
import { practiceAreas, consultingCapabilities } from './data';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
        
        {/* COMPONENTE UNIFICADO: Badge + Capacidades + Círculos */}
        <div className="relative flex flex-col items-center">
          {/* Badge */}
          <div className="mb-8">
            <div className="bg-accent/20 text-accent px-4 py-2 rounded-full inline-flex items-center text-sm font-mono border border-accent/30 shadow-lg shadow-accent/10 pulse-subtle">
              <span className="mr-2 animate-pulse">●</span>
              <span>Capacidades Consulting</span>
            </div>
          </div>
          
          {/* Capacidades como elementos estáticos */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-3xl mx-auto mb-16">
            {consultingCapabilities.map((capability) => (
              <div 
                key={capability}
                className={`bg-accent/10 text-accent px-3 py-2 rounded-full text-xs font-mono text-center cursor-pointer border border-accent/20 transition-all duration-300 hover:bg-accent/20 ${
                  hoveredPractice ? "opacity-70 hover:opacity-100" : ""
                }`}
                onClick={() => {
                  if (hoveredPractice) {
                    setHoveredPractice(null);
                  }
                }}
              >
                {capability}
              </div>
            ))}
          </div>
          
          {/* Círculos en disposición circular */}
          <div className="relative w-full h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {practiceAreas.map((practice, index) => {
                const { x, y } = getCirclePosition(index, practiceAreas.length);
                const circleSize = isMobile ? "w-24 h-24" : "w-28 h-28";
                const showDetails = hoveredPractice === practice.id;
                
                return (
                  <motion.div
                    key={practice.id}
                    className={`absolute ${circleSize} ${practice.color} rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300`}
                    style={{
                      top: `50%`,
                      left: `50%`,
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    animate={{ 
                      zIndex: hoveredPractice === practice.id ? 50 : 20,
                      boxShadow: hoveredPractice === practice.id ? "0 10px 25px rgba(0,0,0,0.3)" : "0 4px 12px rgba(0,0,0,0.2)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => setHoveredPractice(hoveredPractice === practice.id ? null : practice.id)}
                  >
                    <span className="text-xs sm:text-sm font-medium text-center px-1">{practice.name}</span>
                    
                    {/* Animación de pulso */}
                    <motion.div 
                      className={`absolute inset-0 rounded-full ${practice.color} opacity-30`}
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.3, 0.1]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Detalles del círculo */}
                    {showDetails && (
                      <div 
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-dark/90 rounded-lg p-3 w-48 border border-white/10 z-50"
                      >
                        <div className="text-white text-xs mb-2 font-bold">SOLUCIONES</div>
                        <ul className="text-white/80 text-xs space-y-1">
                          {practice.subsets.map((subset, i) => (
                            <li key={i} className="flex items-center">
                              <span className={`w-2 h-2 ${practice.color} rounded-full mr-2`}></span>
                              {subset}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 pt-2 border-t border-white/10">
                          <button className="text-accent text-xs flex items-center justify-center w-full group">
                            <span>Cómo funciona</span>
                            <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
