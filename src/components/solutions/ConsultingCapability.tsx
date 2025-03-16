
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

  const angle = getDistributionAngle(index, totalItems);
  
  // Use dynamic radius based on screen size for capabilities positioning
  const baseRadius = isMobile ? 150 : 200;
  
  // Calculate base position
  const basePos = getPosition(angle, baseRadius);
  
  // Adjust position if a practice is hovered
  let finalX = basePos.x;
  let finalY = basePos.y;
  
  if (hoveredPractice) {
    // Find the hovered practice's angle
    const hoveredIndex = practiceAreas.findIndex(p => p.id === hoveredPractice);
    if (hoveredIndex !== -1) {
      const practiceAngle = getDistributionAngle(hoveredIndex, practiceAreas.length);
      const practicePos = getPosition(practiceAngle, isMobile ? 100 : 130);
      
      // Move capability closer to the hovered practice
      finalX = (basePos.x + practicePos.x * 1.5) / 2.5;
      finalY = (basePos.y + practicePos.y * 1.5) / 2.5;
    }
  }

  return (
    <motion.div
      className="absolute bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-mono cursor-pointer z-10 border border-accent/20"
      style={{
        top: `calc(50% + ${basePos.y}px)`,
        left: `calc(50% + ${basePos.x}px)`,
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        top: `calc(50% + ${finalY}px)`,
        left: `calc(50% + ${finalX}px)`,
        scale: hoveredPractice ? 1.1 : 1
      }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      {capability}
    </motion.div>
  );
};
