
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const practiceAreas = [
  {
    id: "intelligence",
    name: "Intelligence",
    color: "bg-primary",
    subsets: ["Social Listening", "Data Governance", "Benchmarking", "Data Visualization"]
  },
  {
    id: "strategy",
    name: "Strategy",
    color: "bg-accent",
    subsets: ["Consumer Trends Reporting", "Consumer Understanding", "BX Strategy", "Brand Perception Studies"]
  },
  {
    id: "content",
    name: "Creativity & Content",
    color: "bg-coral-light",
    subsets: ["Creative Campaigns", "Content Production", "Personalized Content Creation", "Events Coverage"]
  },
  {
    id: "engagement",
    name: "Engagement & Care",
    color: "bg-purple-light",
    subsets: ["Customer Care", "Community Management", "Omni-channel Management", "Reputation Management"]
  },
  {
    id: "platforms",
    name: "Platforms",
    color: "bg-cream text-dark",
    subsets: ["UX/UI Audits & Design", "Tech & Platforms Integration", "Loyalty Systems"]
  }
];

const consultingCapabilities = [
  "Research & Discovery",
  "Strategic Planning",
  "Process Design",
  "Change Management",
  "Implementation Support",
  "Training & Enablement"
];

export const SolutionsCapabilitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPractice, setHoveredPractice] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getDistributionAngle = (index: number, total: number) => {
    const angleStep = 360 / total;
    return angleStep * index;
  };

  const getPosition = (angle: number, radius: number) => {
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  return (
    <section 
      id="solutions"
      ref={sectionRef} 
      className={`py-24 min-h-screen bg-dark transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="section-container">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-white leading-tight max-w-5xl mx-auto">
            <span className="text-accent">NUESTRAS CAPACIDADES</span> SE INTEGRAN EN CADA PRÁCTICA PARA <span className="text-primary">OFRECER SOLUCIONES</span> A NUESTROS CLIENTES
          </h2>
          <div className="mt-8 w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="relative w-full aspect-square max-w-3xl mx-auto">
          {/* Center circle - represents the core */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-secondary rounded-full flex items-center justify-center z-10 border-2 border-white/10">
            <span className="text-white font-display">FINDASENSE</span>
          </div>
          
          {/* Practice Areas - positioned in a circle */}
          {practiceAreas.map((practice, index) => {
            const angle = getDistributionAngle(index, practiceAreas.length);
            const { x, y } = getPosition(angle, 130);
            
            return (
              <motion.div
                key={practice.id}
                className={`absolute w-24 h-24 ${practice.color} rounded-full flex items-center justify-center cursor-pointer z-20`}
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: "translate(-50%, -50%)"
                }}
                whileHover={{ scale: 1.1 }}
                onMouseEnter={() => setHoveredPractice(practice.id)}
                onMouseLeave={() => setHoveredPractice(null)}
              >
                <span className="text-sm font-medium text-center px-2">{practice.name}</span>
                
                {/* Subsets for each practice area - shown when hovered */}
                {hoveredPractice === practice.id && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-dark/90 rounded-lg p-3 w-48 z-30 border border-white/10">
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
          })}
          
          {/* Consulting capabilities - floating around */}
          {consultingCapabilities.map((capability, index) => {
            const angle = getDistributionAngle(index, consultingCapabilities.length);
            // Use a larger radius for capabilities
            const baseRadius = 200;
            
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
                const practicePos = getPosition(practiceAngle, 130);
                
                // Move capability closer to the hovered practice
                finalX = (basePos.x + practicePos.x * 1.5) / 2.5;
                finalY = (basePos.y + practicePos.y * 1.5) / 2.5;
              }
            }
            
            return (
              <motion.div
                key={capability}
                className="absolute bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-mono"
                style={{
                  top: `calc(50% + ${basePos.y}px)`,
                  left: `calc(50% + ${basePos.x}px)`,
                  transform: "translate(-50%, -50%)"
                }}
                animate={{
                  top: `calc(50% + ${finalY}px)`,
                  left: `calc(50% + ${finalX}px)`,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
              >
                {capability}
              </motion.div>
            );
          })}
        </div>
        
        <div className="text-center mt-16 text-white/70">
          <p className="max-w-2xl mx-auto">
            Hover sobre cada área de práctica para ver cómo las capacidades de Consulting interactúan con las soluciones específicas de cada especialidad.
          </p>
        </div>
      </div>
    </section>
  );
};
