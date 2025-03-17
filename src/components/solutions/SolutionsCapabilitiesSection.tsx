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
          {/* Capacidades - con animación recuperada */}
          <div className="w-full mb-20">
            {consultingCapabilities.map((capability, index) => {
              // Posición estática (grid-like) cuando no hay círculo seleccionado
              const staticColumn = index % 3;
              const staticRow = Math.floor(index / 3);
              const staticX = (staticColumn - 1) * 180; // -180, 0, 180 para centrar
              const staticY = 20 + (staticRow * 70); // Espaciado vertical para 2 filas
              
              // Posición animada cuando hay un círculo seleccionado
              let animatedX = staticX;
              let animatedY = staticY;
              
              if (hoveredPractice) {
                const practiceIndex = practiceAreas.findIndex(p => p.id === hoveredPractice);
                if (practiceIndex !== -1) {
                  const orbit = getCapabilityOrbitPosition(index, practiceIndex);
                  if (orbit) {
                    animatedX = orbit.x;
                    animatedY = orbit.y + 200; // Ajuste para que orbiten en la zona de círculos
                  }
                }
              }
              
              return (
                <motion.div
                  key={capability}
                  className="absolute bg-accent/10 text-accent px-3 py-2 rounded-full text-xs font-mono text-center cursor-pointer border border-accent/20 z-10"
                  initial={{
                    left: `calc(50% + ${staticX}px)`,
                    top: `calc(0% + ${staticY}px)`,
                    transform: "translate(-50%, 0)",
                  }}
                  animate={{
                    left: hoveredPractice ? `calc(50% + ${animatedX}px)` : `calc(50% + ${staticX}px)`,
                    top: hoveredPractice ? `calc(50% + ${animatedY}px)` : `calc(0% + ${staticY}px)`,
                    transform: hoveredPractice ? "translate(-50%, -50%)" : "translate(-50%, 0)",
                    scale: hoveredPractice ? 0.9 : 1,
                    opacity: 0.9
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.05
                  }}
                  onClick={() => {
                    if (hoveredPractice) {
                      setHoveredPractice(null);
                    }
                  }}
                >
                  {capability}
                </motion.div>
              );
            })}
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
