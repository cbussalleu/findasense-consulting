
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const scenarios = [
  {
    id: 1,
    challenge: "Rediseñar la estrategia de canales",
    destination: "Strategy",
    destinationColor: "bg-primary/10 text-primary",
    alternativeChallenge: "Implementar un CX Hub",
    alternativeDestination: "Consulting + Strategy",
    alternativeColor: "bg-accent/10 text-accent"
  },
  {
    id: 2,
    challenge: "Implementar y analizar NPS y voz de consumidor",
    destination: "Intelligence + Strategy",
    destinationColor: "bg-primary/10 text-primary",
    alternativeChallenge: "Implementar un flujo de innovación continua a partir del programa de voz de consumidor",
    alternativeDestination: "Consulting + Strategy + Intelligence",
    alternativeColor: "bg-accent/10 text-accent"
  },
  {
    id: 3,
    challenge: "Diseñar y producir piezas de contenido",
    destination: "Content",
    destinationColor: "bg-primary/10 text-primary",
    alternativeChallenge: "Crear un modelo de producción de contenido a escala global",
    alternativeDestination: "Consulting + Content",
    alternativeColor: "bg-accent/10 text-accent"
  },
  {
    id: 4,
    challenge: "Optimizar la experiencia de una aplicación web",
    destination: "Platforms",
    destinationColor: "bg-primary/10 text-primary",
    alternativeChallenge: "Replantear la experiencia de compra de una web",
    alternativeDestination: "Consulting + Platforms",
    alternativeColor: "bg-accent/10 text-accent"
  }
];

export const ScenarioFlowSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeScenario, setActiveScenario] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to trigger animations when section is in view
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

  // Scroll Observer to change active scenario based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowScroll = window.scrollY + window.innerHeight / 2;
      
      // Calculate which scenario should be active based on scroll position
      const progress = (windowScroll - sectionTop) / sectionHeight;
      const scenarioIndex = Math.min(
        Math.max(Math.floor(progress * 4) + 1, 1),
        4
      );
      
      setActiveScenario(scenarioIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="scenarios"
      ref={sectionRef} 
      className={cn(
        "py-24 min-h-screen bg-dark transition-opacity duration-1000",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-display text-white text-center mb-12">
          ESCENARIOS DE DESAFÍO
        </h2>
        
        <div className="sticky top-24 py-8 mb-16">
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 items-stretch">
            {scenarios.map((scenario) => (
              <div 
                key={scenario.id}
                className={cn(
                  "border-l-2 border-white/10 pl-4 py-2 transition-all duration-500",
                  activeScenario === scenario.id ? "border-l-accent" : ""
                )}
              >
                <span className={cn(
                  "text-lg font-display text-white/50 transition-colors duration-300",
                  activeScenario === scenario.id ? "text-white" : ""
                )}>
                  ESCENARIO {scenario.id}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-64 md:space-y-96 pb-24">
          {scenarios.map((scenario) => (
            <div 
              key={scenario.id} 
              id={`scenario-${scenario.id}`}
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-1000",
                activeScenario === scenario.id ? "opacity-100" : "opacity-30"
              )}
            >
              {/* Standard Scenario */}
              <div className="highlight-box bg-gradient-to-br from-dark to-secondary/40 flex flex-col h-full">
                <div className="mb-4 chip bg-primary/10 text-primary">DESAFÍO ESTÁNDAR</div>
                <p className="text-white text-xl font-medium mb-6">{scenario.challenge}</p>
                <div className="mt-auto">
                  <div className="flex items-center justify-between">
                    <ArrowRight className="text-primary animate-pulse" size={24} />
                    <span className={cn("text-lg font-mono px-4 py-1 rounded-full", scenario.destinationColor)}>
                      {scenario.destination}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Alternative Complex Scenario */}
              <div className="highlight-box bg-gradient-to-br from-dark to-secondary/40 flex flex-col h-full">
                <div className="mb-4 chip bg-accent/10 text-accent">DESAFÍO COMPLEJO</div>
                <p className="text-white text-xl font-medium mb-6">{scenario.alternativeChallenge}</p>
                <div className="mt-auto">
                  <div className="flex items-center justify-between">
                    <ArrowRight className="text-accent animate-pulse" size={24} />
                    <span className={cn("text-lg font-mono px-4 py-1 rounded-full", scenario.alternativeColor)}>
                      {scenario.alternativeDestination}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
