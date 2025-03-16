
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
  
  const getDistributionAngle = (index: number, total: number) => {
    const angleStep = 360 / total;
    return angleStep * index;
  };

  const getPosition = (angle: number, radius: number) => {
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  // Use a larger radius to position capabilities outside the practice circles
  const calculatedAngle = getDistributionAngle(index, totalItems);
  const outerRadius = isMobile ? 170 : 240;
  const outerPos = getPosition(calculatedAngle, outerRadius);
  
  // If no practice is hovered, position capabilities in an outer circle
  let initialX = outerPos.x;
  let initialY = outerPos.y;
  
  // When a practice is hovered, animate to that practice
  let finalX = initialX;
  let finalY = initialY;
  
  if (hoveredPractice) {
    // Find the hovered practice's position
    const hoveredIndex = practiceAreas.findIndex(p => p.id === hoveredPractice);
    if (hoveredIndex !== -1) {
      const practiceAngle = getDistributionAngle(hoveredIndex, practiceAreas.length);
      const practiceRadius = isMobile ? 90 : 170;
      const practicePos = getPosition(practiceAngle, practiceRadius);
      
      // Calculate orbit position around the hovered practice
      const orbitRadius = isMobile ? 80 : 100;
      const orbitAngle = getDistributionAngle(index, totalItems);
      const orbitX = Math.cos((orbitAngle * Math.PI) / 180) * orbitRadius;
      const orbitY = Math.sin((orbitAngle * Math.PI) / 180) * orbitRadius;
      
      // Position capability to orbit around the hovered practice
      finalX = practicePos.x + orbitX;
      finalY = practicePos.y + orbitY;
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
