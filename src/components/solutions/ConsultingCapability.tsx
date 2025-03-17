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
    // Determinamos la distribución basada en el ancho de pantalla
    let columns = 2; // Default para móvil
    
    if (!isMobile) {
      const isWideScreen = typeof window !== 'undefined' && window.innerWidth > 1200;
      if (isWideScreen) {
        columns = 3; // 3 elementos por fila en pantallas anchas
      } else {
        columns = 2; // Desktop normal: 2 columnas
      }
    }
    
    // Determinar fila y columna basado en índice
    const row = Math.floor(index / columns);
    const col = index % columns;
    
    // Calcular espaciado horizontal apropiado
    let spacing = isMobile ? 170 : 200;
    if (!isMobile && typeof window !== 'undefined' && window.innerWidth > 1200) {
      spacing = 260; // Más espacio en pantallas anchas
    }
    
    const centerOffset = spacing * (columns - 1) / 2;
    const x = (col * spacing) - centerOffset;
    
    // CLAVE: Aumentamos drásticamente la separación vertical para evitar superposición
    // con los círculos en todas las resoluciones
    const baseY = isMobile ? -350 : -420; // Valores mucho más altos
    const rowSpacing = isMobile ? 70 : 80;
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
      
      // Calculate practice position
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
      className="absolute bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-mono cursor-pointer z-10 border border-accent/20 capability-tag"
      style={{
        top: `calc(50% + ${initialY}px)`,
        left: `calc(50% + ${initialX}px)`,
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        top: `calc(50% + ${finalY}px)`,
        left: `calc(50% + ${finalX}px)`,
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
