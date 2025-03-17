import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface ConsultingCapabilityProps {
  capability: string;
  index: number;
  totalItems: number;
  hoveredPractice: string | null;
  practiceAreas: Array<{
    id: string;
    name: string;
    color: string;
    subsets: string[];
  }>;
}

export const ConsultingCapability = ({ 
  capability, 
  index, 
  totalItems, 
  hoveredPractice,
  practiceAreas
}: ConsultingCapabilityProps) => {
  const isMobile = useIsMobile();
  
  // Distribución inicial en grid para las capacidades
  const getHorizontalPosition = () => {
    // Distribución optimizada para coherencia visual
    const columns = 3;
    
    // Determinar fila y columna
    const row = Math.floor(index / columns);
    const col = index % columns;
    
    // Espaciado horizontal responsivo
    const spacing = isMobile ? 100 : 150;
    const centerOffset = spacing * (columns - 1) / 2;
    const x = (col * spacing) - centerOffset;
    
    // Posición vertical con espaciado adecuado
    const baseY = isMobile ? -40 : -60; // Posición más cerca del badge
    const rowSpacing = isMobile ? 50 : 60;
    const y = baseY + (row * rowSpacing);
    
    return { x, y };
  };

  // Función para calcular ángulo de distribución de círculos
  const getDistributionAngle = (index: number, total: number) => {
    const startAngle = -90; // -90 grados es la parte superior
    const angleStep = 360 / total;
    return startAngle + (angleStep * index);
  };

  // Cálculo de posición inicial en grid
  const position = getHorizontalPosition();
  const initialX = position.x;
  const initialY = position.y;
  
  // Cálculo de posición para órbita cuando se selecciona un círculo
  let finalX = initialX;
  let finalY = initialY;
  
  if (hoveredPractice) {
    // Encontrar el índice del círculo seleccionado
    const hoveredIndex = practiceAreas.findIndex(p => p.id === hoveredPractice);
    if (hoveredIndex !== -1) {
      // Calcular ángulo y posición del círculo seleccionado
      const practiceAngle = getDistributionAngle(hoveredIndex, practiceAreas.length);
      const practiceRadius = isMobile ? 120 : 180;
      const practiceRadians = (practiceAngle * Math.PI) / 180;
      const practiceX = Math.cos(practiceRadians) * practiceRadius;
      const practiceY = Math.sin(practiceRadians) * practiceRadius;
      
      // Calcular posición orbital alrededor del círculo seleccionado
      const orbitRadius = isMobile ? 70 : 100;
      const orbitAngle = (360 / totalItems * index) + practiceAngle;
      const orbitRadians = (orbitAngle * Math.PI) / 180;
      const orbitX = Math.cos(orbitRadians) * orbitRadius;
      const orbitY = Math.sin(orbitRadians) * orbitRadius;
      
      // Posición final en órbita
      finalX = practiceX + orbitX;
      finalY = practiceY + orbitY;
    }
  }

  return (
    <motion.div
      className="absolute bg-accent/10 text-accent px-3 py-1.5 rounded-full text-xs font-mono cursor-pointer border border-accent/30 capability-tag shadow-sm hover:bg-accent/20 transition-all duration-300"
      style={{
        top: `calc(50% + ${initialY}px)`,
        left: `calc(50% + ${initialX}px)`,
        transform: "translate(-50%, -50%)",
        zIndex: 40
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        top: hoveredPractice ? `calc(50% + ${finalY}px)` : `calc(50% + ${initialY}px)`,
        left: hoveredPractice ? `calc(50% + ${finalX}px)` : `calc(50% + ${initialX}px)`,
        scale: hoveredPractice ? 1.1 : 1,
        boxShadow: hoveredPractice ? "0 0 15px rgba(79, 70, 229, 0.5)" : "none"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 10,
        delay: index * 0.05 
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      {capability}
    </motion.div>
  );
};
