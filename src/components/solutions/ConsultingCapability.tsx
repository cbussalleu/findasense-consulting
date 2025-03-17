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
  
  // Calculate initial position for capabilities
  const getHorizontalPosition = () => {
    // Distribución optimizada para coherencia visual (principio Gestalt)
    const columns = 3;
    
    // Determinar fila y columna
    const row = Math.floor(index / columns);
    const col = index % columns;
    
    // Espacio horizontal basado en investigación de legibilidad óptima
    const spacing = isMobile ? 120 : 180;
    const centerOffset = spacing * (columns - 1) / 2;
    const x = (col * spacing) - centerOffset;
    
    // IMPORTANTE: Estamos usando un valor de base relativo al centro
    // Para la posición inicial, el centro es el punto de referencia
    // Nielsen recomienda -100px a -120px de separación para elementos relacionados
    const baseY = isMobile ? -100 : -120;
    const rowSpacing = isMobile ? 60 : 70;
    const y = baseY + (row * rowSpacing);
    
    return { x, y };
  };

  // Initial position
  const position = getHorizontalPosition();
  const initialX = position.x;
  const initialY = position.y;
  
  // When a practice is hovered, animate to that practice
  let finalX = initialX;
  let finalY = initialY;
  
  if (hoveredPractice) {
    // Find the hovered practice's position
    const hoveredIndex = practiceAreas.findIndex(p => p.id === hoveredPractice);
    if (hoveredIndex !== -1) {
      // Calculate angle for practice position
      const angleStep = 360 / practiceAreas.length;
      const practiceAngle = angleStep * hoveredIndex;
      
      // Calculate practice position - punto central del círculo
      const practiceRadius = isMobile ? 90 : 170;
      const practiceX = Math.cos((practiceAngle * Math.PI) / 180) * practiceRadius;
      const practiceY = Math.sin((practiceAngle * Math.PI) / 180) * practiceRadius;
      
      // Calculate orbit position around the hovered practice
      const orbitRadius = isMobile ? 80 : 100;
      const orbitAngle = 360 / totalItems * index;
      const orbitX = Math.cos((orbitAngle * Math.PI) / 180) * orbitRadius;
      const orbitY = Math.sin((orbitAngle * Math.PI) / 180) * orbitRadius;
      
      // Position capability to orbit around the hovered practice
      finalX = practiceX + orbitX;
      finalY = practiceY + orbitY;
    }
  }

  return (
    <motion.div
      className="absolute bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-mono cursor-pointer border border-accent/20 capability-tag"
      style={{
        // Usamos el mismo sistema de coordenadas para posición inicial y animación
        top: `calc(50% + ${initialY}px)`,
        left: `calc(50% + ${initialX}px)`,
        transform: "translate(-50%, -50%)",
        zIndex: 40
      }}
      animate={{
        // Consistencia en animaciones - fundamental según Material Design
        top: hoveredPractice ? `calc(50% + ${finalY}px)` : `calc(50% + ${initialY}px)`,
        left: hoveredPractice ? `calc(50% + ${finalX}px)` : `calc(50% + ${initialX}px)`,
        scale: hoveredPractice ? 1.1 : 1,
        boxShadow: hoveredPractice ? "0 0 15px rgba(79, 70, 229, 0.5)" : "none"
      }}
      transition={{ 
        // Según Apple HIG, animaciones entre 300-500ms son óptimas para atención
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
