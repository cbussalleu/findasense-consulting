
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

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
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-white text-center mb-12 uppercase">
          SI UN CLIENTE NOS PIDE
        </h2>
        
        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {scenarios.map((scenario) => (
              <CarouselItem key={scenario.id} className="md:basis-full lg:basis-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Standard Scenario */}
                  <div className="highlight-box bg-gradient-to-br from-dark to-secondary/40 flex flex-col h-full">
                    <div className="mb-4 chip bg-primary/10 text-primary">DESAFÍO ESTÁNDAR</div>
                    <p className="text-white text-xl font-medium mb-6">
                      <span className="relative">
                        {scenario.challenge.charAt(0)}
                        <span className="absolute bottom-0 left-1 w-full h-0.5 bg-primary origin-left transform transition-all duration-1000 scenario-line"></span>
                      </span>
                      {scenario.challenge.substring(1)}
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center justify-between">
                        <ArrowRight className="text-primary flow-arrow" size={24} />
                        <span className={cn("text-lg font-mono px-4 py-1 rounded-full", scenario.destinationColor)}>
                          {scenario.destination}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Alternative Complex Scenario */}
                  <div className="highlight-box bg-gradient-to-br from-dark to-secondary/40 flex flex-col h-full">
                    <div className="mb-4 chip bg-accent/10 text-accent">DESAFÍO COMPLEJO</div>
                    <p className="text-white text-xl font-medium mb-6">
                      <span className="relative">
                        {scenario.alternativeChallenge.charAt(0)}
                        <span className="absolute bottom-0 left-1 w-full h-0.5 bg-accent origin-left transform transition-all duration-1000 scenario-line"></span>
                      </span>
                      {scenario.alternativeChallenge.substring(1)}
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center justify-between">
                        <ArrowRight className="text-accent flow-arrow" size={24} />
                        <span className={cn("text-lg font-mono px-4 py-1 rounded-full", scenario.alternativeColor)}>
                          {scenario.alternativeDestination}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 border-white/20 bg-dark/50 backdrop-blur-sm hover:bg-dark/80">
            <ChevronLeft className="h-4 w-4 text-white/70" />
          </CarouselPrevious>
          <CarouselNext className="absolute right-0 border-white/20 bg-dark/50 backdrop-blur-sm hover:bg-dark/80">
            <ChevronRight className="h-4 w-4 text-white/70" />
          </CarouselNext>
        </Carousel>

        {/* Flow arrow animation */}
        <style dangerouslySetInnerHTML={{ __html: `
          .flow-arrow {
            position: relative;
            animation: pulse 2s infinite alternate;
          }
          
          @keyframes pulse {
            0% { opacity: 0.7; transform: translateX(0); }
            100% { opacity: 1; transform: translateX(5px); }
          }
          
          .scenario-line {
            animation: lineGrow 3s infinite alternate;
          }
          
          @keyframes lineGrow {
            0% { width: 0; }
            100% { width: 100%; }
          }
          
          .highlight-box:hover .scenario-line {
            animation-play-state: running;
            animation-duration: 1.5s;
          }
        `}} />
      </div>
    </section>
  );
};
