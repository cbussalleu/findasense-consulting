
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
  
  // Calculate position for capabilities below the legend
  const getHorizontalPosition = (index: number, total: number) => {
    // Distribute capabilities horizontally in a more compact arrangement
    const width = isMobile ? 280 : 550; // Reduced width for the line
    const step = width / (total - 1 || 1); // Space between each capability
    return index * step - width / 2; // Center the line
  };

  // Initial position: closer horizontal line below legend
  const initialX = getHorizontalPosition(index, totalItems);
  const initialY = isMobile ? 140 : 180; // Position closer to the "Capacidades Consulting" text
  
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
      
      // Calculate orbit position aroun the hovered practice
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
