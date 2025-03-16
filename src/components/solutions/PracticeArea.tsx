import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

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
}

export const PracticeArea = ({ 
  practice, 
  index, 
  totalItems, 
  hoveredPractice, 
  setHoveredPractice 
}: PracticeAreaProps) => {
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

  // Calculate base radius dynamically based on screen width
  const getResponsiveRadius = () => {
    if (isMobile) return 90;
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    if (width < 768) return 100;
    if (width < 1024) return 130;
    if (width < 1280) return 150;
    return 170;
  };

  const angle = getDistributionAngle(index, totalItems);
  const radius = getResponsiveRadius();
  const { x, y } = getPosition(angle, radius);
  
  // Increase the size of practice circles
  const circleSize = isMobile ? "w-24 h-24" : "w-28 h-28";

  const handleClick = () => {
    // Toggle the current practice or close all if this one was already active
    if (hoveredPractice === practice.id) {
      setHoveredPractice(null);
    } else {
      setHoveredPractice(practice.id);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setHoveredPractice(practice.id);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      // Only hide on mouse leave if not clicked (mobile behavior)
      // We keep the hover state on desktop for a better UX
    }
  };

  const showDetails = hoveredPractice === practice.id;

  return (
    <motion.div
      key={practice.id}
      className={`absolute ${circleSize} ${practice.color} rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300`}
      style={{
        top: `calc(50% + ${y}px)`,
        left: `calc(50% + ${x}px)`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      animate={{ 
        zIndex: hoveredPractice === practice.id ? 50 : 20,
        boxShadow: hoveredPractice === practice.id ? "0 10px 25px rgba(0,0,0,0.3)" : "0 4px 12px rgba(0,0,0,0.2)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
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
        <div 
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-dark/90 rounded-lg p-3 w-48 border border-white/10 z-50"
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
        </div>
      )}
    </motion.div>
  );
};
