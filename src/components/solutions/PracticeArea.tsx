import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight } from 'lucide-react';

interface PracticeAreaProps {
  practice: {
    id: string;
    name: string;
    color: string;
    subsets: string[];
  };
  index: number;
  totalItems: number;
  hoveredPractice: string | null;
  setHoveredPractice: (id: string | null) => void;
  getDistributionAngle: (index: number, total: number) => number;
  getPosition: (angle: number, radius: number) => { x: number, y: number };
  getResponsiveRadius: () => number;
}

export const PracticeArea = ({ 
  practice, 
  index, 
  totalItems, 
  hoveredPractice, 
  setHoveredPractice,
  getDistributionAngle,
  getPosition,
  getResponsiveRadius
}: PracticeAreaProps) => {
  const isMobile = useIsMobile();
  
  // Cálculo de posición para este círculo específico
  const angle = getDistributionAngle(index, totalItems);
  const radius = getResponsiveRadius();
  const { x, y } = getPosition(angle, radius);
  
  // Tamaño responsivo para los círculos
  const circleSize = isMobile ? "w-20 h-20" : "w-28 h-28";

  // Determinar si se deben mostrar los detalles de este círculo
  const showDetails = hoveredPractice === practice.id;

  return (
    <motion.div
      key={practice.id}
      className={`absolute ${circleSize} ${practice.color} rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300`}
      style={{
        // Posicionamiento centrado usando translate para mayor precisión
        top: "50%",
        left: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        // Añadir z-index más alto cuando está seleccionado
        zIndex: hoveredPractice === practice.id ? 50 : 20,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        zIndex: hoveredPractice === practice.id ? 50 : 20,
        boxShadow: hoveredPractice === practice.id ? "0 10px 25px rgba(0,0,0,0.3)" : "0 4px 12px rgba(0,0,0,0.2)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        delay: index * 0.1 // Animación escalonada para entrada
      }}
      whileHover={{ scale: 1.1 }}
      onClick={() => setHoveredPractice(practice.id)}
    >
      <span className="text-xs sm:text-sm font-medium text-center px-1">{practice.name}</span>
      
      {/* Pulsing animation on the circles to indicate they are interactive */}
      <motion.div 
        className={`absolute inset-0 rounded-full ${practice.color} opacity-30`}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut"
        }}
      />
      
      {/* Subsets for each practice area - shown only when this practice is selected */}
      {showDetails && (
        <motion.div 
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-dark/90 rounded-lg p-3 w-48 border border-white/10 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-white text-xs mb-2 font-bold">SOLUCIONES</div>
          <ul className="text-white/80 text-xs space-y-1">
            {practice.subsets.map((subset, i) => (
              <li key={i} className="flex items-center">
                <span className={`w-2 h-2 ${practice.color} rounded-full mr-2`}></span>
                {subset}
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-2 border-t border-white/10">
            <button className="text-accent text-xs flex items-center justify-center w-full group">
              <span>Cómo funciona</span>
              <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
