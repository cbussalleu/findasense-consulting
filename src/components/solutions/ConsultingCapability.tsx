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
  
  // Determinar posición inicial para la animación
  const getAnimationStartPosition = () => {
    // Queremos que la animación comience desde más arriba (cerca del badge)
    return { x: 0, y: -200 };
  };

  // Función para calcular ángulo de distribución de círculos
  const getDistributionAngle = (index: number, total: number) => {
    const startAngle = -90; // -90 grados es la parte superior
    const angleStep = 360 / total;
    return startAngle + (angleStep * index);
  };

  // Cálculo de posición inicial para la animación
  const startPosition = getAnimationStartPosition();
  const startX = startPosition.x;
  const startY = startPosition.y;
  
  // Inicialmente, la posición final es la misma que la inicial
  let finalX = 0;
  let finalY = 0;
  
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
      const orbitAngle = (360 / totalItems * index);
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
        top: `calc(50%)`,
        left: `calc(50%)`,
        transform: "translate(-50%, -50%)",
        zIndex: 40,
        opacity: hoveredPractice ? 1 : 0,
        pointerEvents: hoveredPractice ? 'auto' : 'none'
      }}
      initial={{ 
        opacity: 0,
        x: startX,
        y: startY
      }}
      animate={{
        opacity: hoveredPractice ? 1 : 0,
        x: finalX,
        y: finalY,
        scale: 1
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
