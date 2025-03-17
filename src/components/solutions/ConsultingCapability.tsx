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
    // Cambiamos a 2 columnas (en lugar de 3) para evitar superposición
    const columns = 2;
    const row = Math.floor(index / columns);
    const col = index % columns;
    
    // Aumentamos el espaciado horizontal para evitar superposición
    const spacing = isMobile ? 170 : 220;
    const centerOffset = spacing * (columns - 1) / 2;
    
    // Calculamos la posición horizontal con offset para centrar
    // Ajustamos el offset general para mejorar el centrado
    let x = (col * spacing) - centerOffset;
    
    // Para 6 elementos en 3 filas de 2, ajustamos para cada fila
    // Primera fila centrada
    if (index < 2) {
      x += 0; // Sin ajuste para la primera fila
    } 
    // Segunda fila con ligero desplazamiento para alternar
    else if (index < 4) {
      x += isMobile ? 20 : 30;
    }
    // Tercera fila con otro desplazamiento
    else {
      x -= isMobile ? 20 : 30;
    }
    
    // Valores para posicionar en el tercio superior, bien lejos de los círculos
    const baseY = isMobile ? -220 : -250;
    // Aumentamos espaciado vertical entre filas
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
