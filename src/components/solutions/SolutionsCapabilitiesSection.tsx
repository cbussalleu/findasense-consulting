import { useEffect, useRef, useState } from 'react';
import { practiceAreas, consultingCapabilities } from './data';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { PracticeArea } from './PracticeArea';

export const SolutionsCapabilitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPractice, setHoveredPractice] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [badgePosition, setBadgePosition] = useState({ top: 0, left: 0 });

  // Actualizar la posición del badge cuando cambia el tamaño de la ventana
  useEffect(() => {
    const updateBadgePosition = () => {
      if (badgeRef.current) {
        const rect = badgeRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        setBadgePosition({
          top: rect.top + scrollTop,
          left: rect.left + rect.width / 2
        });
      }
    };

    // Actualizar posición inicial
    updateBadgePosition();

    // Actualizar cuando cambia el tamaño de la ventana
    window.addEventListener('resize', updateBadgePosition);
    return () => window.removeEventListener('resize', updateBadgePosition);
  }, []);

  // Intersection Observer para detectar cuando la sección es visible
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

  // Función para calcular el ángulo de distribución
  const getDistributionAngle = (index: number, total: number) => {
    const angleStep = 360 / total;
    const startAngle = -90; // -90 grados es la parte superior
    return startAngle + (angleStep * index);
  };

  // Función para calcular posición X,Y basada en ángulo y radio
  const getPosition = (angle: number, radius: number) => {
    const radians = (angle * Math.PI) / 180;
    const x = Math.cos(radians) * radius;
    const y = Math.sin(radians) * radius;
    return { x, y };
  };

  // Función para obtener radio responsivo según tamaño de pantalla
  const getResponsiveRadius = () => {
    if (isMobile) return 120;
    
    // Fallback para SSR donde window no está disponible
    if (typeof window === 'undefined') return 180;
    
    const width = window.innerWidth;
    // Escala de radios según tamaño de pantalla
    if (width < 768) return 140;
    if (width < 1024) return 160;
    if (width < 1280) return 180;
    return 200;
  };

  // Función para calcular posiciones de grid (estado inicial)
  const getGridPosition = (index: number) => {
    // Calcular posición absoluta relativa al badge
    const columns = 3;
    const column = index % columns;
    const row = Math.floor(index / columns);
    
    // Ajustes para posicionar las capacidades en forma de grid debajo del badge
    const columnWidth = isMobile ? 105 : 160;
    const startX = (columns * columnWidth) / -2 + (columnWidth / 2); // Centrar el grid
    const startY = 60; // Distancia debajo del badge
    const rowHeight = 50;
    
    // Posición relativa al centro de la sección
    const sectionCenterX = window.innerWidth / 2;
    const gridX = startX + (column * columnWidth);
    const gridY = startY + (row * rowHeight);
    
    // Convertir posición relativa al badge a posición absoluta
    // Pero si badgePosition.left es 0 (no inicializado), usar posición centrada directa
    const offsetX = badgePosition.left ? badgePosition.left - sectionCenterX : 0;
    
    return {
      x: gridX + offsetX,
      y: gridY
    };
  };

  // Función para calcular posiciones orbitales (estado final)
  const getOrbitPosition = (capabilityIndex: number, practiceId: string) => {
    if (!practiceId) return getGridPosition(capabilityIndex); // Volver a posición de grid si no hay selección
    
    // Encontrar el índice del área de práctica seleccionada
    const practiceIndex = practiceAreas.findIndex(p => p.id === practiceId);
    if (practiceIndex === -1) return getGridPosition(capabilityIndex);
    
    // Calcular posición del círculo seleccionado
    const practiceAngle = getDistributionAngle(practiceIndex, practiceAreas.length);
    const practiceRadius = getResponsiveRadius();
    const { x: practiceX, y: practiceY } = getPosition(practiceAngle, practiceRadius);
    
    // Calcular posición orbital alrededor del área de práctica seleccionada
    const orbitRadius = isMobile ? 70 : 100;
    const orbitAngle = (360 / consultingCapabilities.length * capabilityIndex);
    const { x: orbitX, y: orbitY } = getPosition(orbitAngle, orbitRadius);
    
    // Posición final en órbita
    return {
      x: practiceX + orbitX,
      y: practiceY + orbitY
    };
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
        
        {/* Badge "Capacidades Consulting" con referencia para posicionamiento */}
        <div className="text-center mb-24 relative">
          <div 
            ref={badgeRef}
            className="bg-accent/20 text-accent px-4 py-2 rounded-full inline-flex items-center text-sm font-mono border border-accent/30 shadow-lg shadow-accent/10 pulse-subtle"
          >
            <span className="mr-2 animate-pulse">●</span>
            <span>Capacidades Consulting</span>
          </div>
        </div>
        
        <div className="relative flex flex-col items-center">
          {/* Círculos en disposición circular y capacidades animadas */}
          <div className="relative w-full h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Capacidades unificadas con animación entre estados */}
              {consultingCapabilities.map((capability, index) => {
                // Calcular posición de grid (estado inicial)
                const gridPos = getGridPosition(index);
                
                // Calcular posición orbital (cuando hay un practice seleccionado)
                const orbitPos = getOrbitPosition(index, hoveredPractice || "");
                
                // Determinar posición final basada en si hay un practice seleccionado
                const finalPos = hoveredPractice ? orbitPos : gridPos;
                
                return (
                  <motion.div
                    key={`capability-${capability}`}
                    className="absolute bg-accent/10 text-accent px-3 py-1.5 rounded-full text-xs font-mono cursor-pointer border border-accent/30 capability-tag shadow-sm hover:bg-accent/20 transition-colors duration-300"
                    initial={{ 
                      opacity: 0,
                      x: gridPos.x,
                      y: gridPos.y,
                    }}
                    animate={{
                      opacity: 1,
                      x: finalPos.x,
                      y: finalPos.y,
                      scale: hoveredPractice ? 1.1 : 1,
                      boxShadow: hoveredPractice 
                        ? "0 0 15px rgba(79, 70, 229, 0.3)" 
                        : "0 0 5px rgba(79, 70, 229, 0.1)"
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 120, 
                      damping: 20,
                      delay: index * 0.03
                    }}
                    style={{
                      zIndex: 40,
                    }}
                    whileHover={{ scale: hoveredPractice ? 1.15 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {capability}
                  </motion.div>
                );
              })}
              
              {/* Círculos de práctica */}
              {practiceAreas.map((practice, index) => (
                <PracticeArea
                  key={practice.id}
                  practice={practice}
                  index={index}
                  totalItems={practiceAreas.length}
                  hoveredPractice={hoveredPractice}
                  setHoveredPractice={setHoveredPractice}
                  getDistributionAngle={getDistributionAngle}
                  getPosition={getPosition}
                  getResponsiveRadius={getResponsiveRadius}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
