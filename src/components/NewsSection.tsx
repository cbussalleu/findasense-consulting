
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Calendar, Clock } from 'lucide-react';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

type NewsStatus = 'Iniciado' | 'En progreso' | 'Terminado';

interface NewsItem {
  date: string;
  title: string;
  status: NewsStatus;
  description: string;
}

const newsItems: NewsItem[] = [
  {
    date: "Feb-2",
    title: "Actualización Caso Grupo Bimbo",
    status: "Terminado",
    description: "Se actualizaron los puntos de contacto y las métricas de seguimiento en el caso de Grupo Bimbo. Ahora incluye resultados de la última campaña de Navidad 2023."
  },
  {
    date: "Feb-13",
    title: "Creación Caso Moventis",
    status: "Iniciado",
    description: "Nuevo proyecto para documentar el caso de éxito de Moventis, centrado en la transformación del journey de compra y la mejora de conversión."
  },
  {
    date: "Feb-17",
    title: "Actualización Deck Customer Journey",
    status: "Terminado",
    description: "Renovación completa del deck de metodología de Customer Journey con nuevos ejemplos, plantillas actualizadas y métricas de seguimiento."
  },
  {
    date: "Feb-25",
    title: "Creación One-pager CX Assessment",
    status: "En progreso",
    description: "Desarrollo de un formato estándar para presentar diagnósticos rápidos de experiencia de cliente, con estructura modular para distintos sectores."
  },
  {
    date: "Mar-3",
    title: "Estudio Hábitos de Consumo de Contenido",
    status: "Iniciado",
    description: "Investigación sobre los nuevos hábitos de consumo de contenido en plataformas digitales y sus implicaciones para la estrategia de comunicación de marcas."
  }
];

const getStatusColor = (status: NewsStatus) => {
  switch(status) {
    case "Iniciado":
      return "bg-accent/10 text-accent border-accent/20";
    case "En progreso":
      return "bg-primary/10 text-primary border-primary/20";
    case "Terminado":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    default:
      return "bg-accent/10 text-accent border-accent/20";
  }
};

export const NewsSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
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

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  return (
    <section 
      id="news"
      ref={sectionRef} 
      className={`py-24 bg-dark transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-white uppercase">
            NOVEDADES
          </h2>
          <div className="mt-8 w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {newsItems.map((item, index) => (
            <Collapsible 
              key={index}
              open={openItems.includes(index)}
              onOpenChange={() => toggleItem(index)}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                <div className="flex items-center gap-6 w-full">
                  <div className="flex items-center justify-center min-w-16 text-white/60">
                    <Calendar size={14} className="mr-1" />
                    <span className="text-sm font-mono">{item.date}</span>
                  </div>
                  
                  <div className="flex-grow font-medium text-white">{item.title}</div>
                  
                  <Badge className={`ml-auto ${getStatusColor(item.status)} px-3 py-0.5 text-xs font-mono border`}>
                    {item.status}
                  </Badge>
                </div>
                <div className="ml-4">
                  {openItems.includes(index) ? (
                    <ChevronUp size={18} className="text-white/60" />
                  ) : (
                    <ChevronDown size={18} className="text-white/60" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4 pt-1 text-white/80 animation-accordion-down">
                <div className="pl-16 pr-4 border-l border-white/10 ml-8">
                  <p>{item.description}</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};
