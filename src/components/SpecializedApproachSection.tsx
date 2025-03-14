
import { useEffect, useRef } from 'react';

export const SpecializedApproachSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
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
      id="approach"
      ref={sectionRef} 
      className="py-24 bg-dark opacity-0 transition-opacity duration-1000"
    >
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-display text-white text-center mb-16">
          ¿Cuándo se requiere un enfoque integral y especializado?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="highlight-box bg-gradient-to-br from-dark to-secondary/40">
            <div className="mb-6 text-primary text-5xl font-display">01</div>
            <p className="text-white/90 text-lg">
              Cuando es clave entender la perspectiva organizacional de la empresa (procesos, estructuras) e integrarla en la solución final.
            </p>
          </div>
          
          <div className="highlight-box bg-gradient-to-br from-dark to-secondary/40">
            <div className="mb-6 text-accent text-5xl font-display">02</div>
            <p className="text-white/90 text-lg">
              Cuando se requiere especializar una capacidad existente de una práctica (ejemplo: investigación de mercado con enfoque estadístico o research organizacional).
            </p>
          </div>
          
          <div className="highlight-box bg-gradient-to-br from-dark to-secondary/40">
            <div className="mb-6 text-primary text-5xl font-display">03</div>
            <p className="text-white/90 text-lg">
              Cuando existe un desafío que, a primera vista, no se puede resolver con una capacidad concreta de FAS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
