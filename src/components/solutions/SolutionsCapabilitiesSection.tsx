import { useEffect, useRef, useState } from 'react';
import { practiceAreas, consultingCapabilities } from './data';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
import { PracticeArea } from './PracticeArea';

export const SolutionsCapabilitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPractice, setHoveredPractice] = useState<string | null>(null);
  const [isClickActive, setIsClickActive] = useState(false);
  const isMobile = useIsMobile();

  // Actualizamos isClickActive cuando cambia hoveredPractice
  useEffect(() => {
    // Permitir un pequeño retraso antes de cambiar isClickActive
    // para que la transición de capacidades sea más suave
    if (hoveredPractice !== null) {
      // Si se selecciona una práctica, activar isClickActive inmediatamente
      setIsClickActive(true);
    } else {
      // Si se deselecciona, esperar un poco para permitir la animación de regreso
      const timer = setTimeout(() => {
        setIsClickActive(false);
      }, 100);
      return () => clearTimeout(timer);
    }
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

  // Función para calcular el ángulo de distribución
  const getDistributionAngle = (index: number, total: number) => {
    // Distribución circular uniforme - 360 grados divididos entre el número de elementos
    const angleStep = 360 / total;
    // Offset inicial para posicionar el primer elemento en la parte superior
    const startAngle = -90; // -90 grados es la parte superior
    return startAngle + (angleStep * index);
  };

  // Función para calcular posición X,Y basada en ángulo y radio
  const getPosition = (angle: number, radius: number) => {
    // Conversión de ángulos a radianes para cálculos trigonométricos
    const radians = (angle * Math.PI) / 180;
    // Cálculo de coordenadas X e Y usando funciones trigonométricas
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

  // Manejador para seleccionar/deseleccionar círculos
  const handlePracticeSelection = (practiceId: string | null) => {
    setHoveredPractice(hoveredPractice === practiceId ? null : practiceId);
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
        
        {/* Badge "Capacidades Consulting" y capacidades fijas */}
        <div className="text-center mb-16 relative">
          <div className="bg-accent/20 text-accent px-4 py-2 rounded-full inline-flex items-center text-sm font-mono border border-accent/30 shadow-lg shadow-accent/10 pulse-subtle">
            <span className="mr-2 animate-pulse">●</span>
            <span>Capacidades Consulting</span>
          </div>
          
          {/* Capacidades fijas con animación mejorada */}
          <AnimatePresence>
            {!isClickActive && (
              <motion.div 
                className="w-full relative mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                  {consultingCapabilities.map((capability, index) => (
                    <motion.div 
                      key={`fixed-${capability}`}
                      className="bg-accent/10 text-accent px-3 py-1.5 rounded-full text-xs font-mono cursor-pointer border border-accent/30 capability-tag shadow-sm hover:bg-accent/20 transition-all duration-300 text-center"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.05,
                        ease: "easeOut" 
                      }}
                    >
                      {capability}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="relative flex flex-col items-center">
          {/* Círculos en disposición circular y capacidades animadas */}
          <div className="relative w-full h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Capacidades animadas en forma orbital con animación mejorada */}
              <AnimatePresence>
                {isClickActive && hoveredPractice && consultingCapabilities.map((capability, index) => {
                  // Encontrar el índice del círculo seleccionado
                  const hoveredIndex = practiceAreas.findIndex(p => p.id === hoveredPractice);
                  if (hoveredIndex === -1) return null;
                  
                  // Calcular ángulo y posición del círculo seleccionado
                  const practiceAngle = getDistributionAngle(hoveredIndex, practiceAreas.length);
                  const practiceRadius = getResponsiveRadius();
                  const { x: practiceX, y: practiceY } = getPosition(practiceAngle, practiceRadius);
                  
                  // Calcular posición orbital alrededor del círculo seleccionado
                  const orbitRadius = isMobile ? 70 : 100;
                  const orbitAngle = (360 / consultingCapabilities.length * index);
                  const { x: orbitX, y: orbitY } = getPosition(orbitAngle, orbitRadius);
                  
                  // Posición final en órbita
                  const finalX = practiceX + orbitX;
                  const finalY = practiceY + orbitY;
                  
                  // Posición inicial "simulando" venir desde la posición del grid
                  // Usamos constantes aproximadas basadas en la posición del grid
                  const columns = 3;
                  const column = index % columns;
                  const row = Math.floor(index / columns);
                  
                  const gridX = -150 + (column * 150);
                  const gridY = 0 + (row * 50);
                  
                  return (
                    <motion.div
                      key={`orbit-${capability}`}
                      className="absolute bg-accent/10 text-accent px-3 py-1.5 rounded-full text-xs font-mono cursor-pointer border border-accent/30 capability-tag shadow-sm hover:bg-accent/20 transition-colors duration-300"
                      initial={{ 
                        opacity: 0,
                        x: gridX, 
                        y: gridY,
                        scale: 1
                      }}
                      animate={{
                        opacity: 1,
                        x: finalX,
                        y: finalY,
                        scale: 1.1,
                        boxShadow: "0 0 15px rgba(79, 70, 229, 0.3)"
                      }}
                      exit={{
                        opacity: 0,
                        x: gridX,
                        y: gridY,
                        scale: 1,
                        transition: { 
                          duration: 0.3,
                          delay: 0 
                        }
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
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {capability}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              {/* Círculos de práctica */}
              {practiceAreas.map((practice, index) => (
                <PracticeArea
                  key={practice.id}
                  practice={practice}
                  index={index}
                  totalItems={practiceAreas.length}
                  hoveredPractice={hoveredPractice}
                  setHoveredPractice={handlePracticeSelection}
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
