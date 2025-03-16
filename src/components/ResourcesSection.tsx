
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const resources = [
  {
    title: "Casos",
    description: "Accede a toda la documentación de casos de éxito",
    icon: "📊",
    color: "from-primary/20 to-primary/5",
    textColor: "text-primary"
  },
  {
    title: "Decks de Solución",
    description: "Presentaciones y resúmenes de soluciones para uso comercial",
    icon: "🎯",
    color: "from-accent/20 to-accent/5",
    textColor: "text-accent"
  },
  {
    title: "Artículos",
    description: "Publicaciones y estudios de CX que hemos publicado",
    icon: "📝",
    color: "from-purple-light/20 to-purple-light/5",
    textColor: "text-purple-light"
  },
  {
    title: "Toolkit Metodológico",
    description: "Procesos y marcos de trabajo que usamos según la necesidad del proyecto",
    icon: "🛠️",
    color: "from-coral-light/20 to-coral-light/5",
    textColor: "text-coral-light"
  }
  // Removed "Novedades" card
];

export const ResourcesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      id="resources"
      ref={sectionRef} 
      className={`py-24 bg-dark transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-white uppercase">
            CENTRO DE RECURSOS DE CONSULTING
          </h2>
          <div className="mt-8 w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <div 
              key={index}
              className="highlight-box bg-gradient-to-br from-dark to-secondary/40 group cursor-pointer h-full"
            >
              <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center bg-gradient-to-br ${resource.color} text-2xl`}>
                {resource.icon}
              </div>
              
              <h3 className={`text-xl font-display mb-3 ${resource.textColor}`}>{resource.title}</h3>
              <p className="text-white/70 mb-6">{resource.description}</p>
              
              <div className="mt-auto pt-4 flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className={resource.textColor}>Explorar</span>
                <ArrowRight className={`ml-2 ${resource.textColor} group-hover:translate-x-1 transition-transform`} size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
