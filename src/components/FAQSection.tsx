
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: "¿Puedo pertenecer a Consulting?",
    answer: "Si y No. Si porque potencialmente todos los que trabajamos en Findasense podemos participar de un proyecto que requiera capacidades consultivas. Y No, porque Consulting integra personas a demanda, según el requerimiento."
  },
  {
    question: "¿Consulting hace innovación?",
    answer: "Sí, Consulting típicamente se enfrenta a desafíos de clientes que implican utilizar metodologías de diseño e innovación. No obstante, en la práctica, todos los proyectos son susceptibles de ser innovables."
  }
];

export const FAQSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq"
      ref={sectionRef} 
      className={`py-24 bg-dark transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display text-white">
            PREGUNTAS FRECUENTES
          </h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="mb-4 border-b border-white/10 pb-4"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between py-4 text-left focus:outline-none"
              >
                <h3 className="text-xl font-display text-white">{faq.question}</h3>
                <ChevronDown 
                  className={cn(
                    "text-white transition-transform duration-300",
                    openIndex === index ? "transform rotate-180" : ""
                  )} 
                  size={20} 
                />
              </button>
              
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="py-4 text-white/70">
                  <p>{faq.answer}</p>
                  
                  <div className="mt-4">
                    <button className="text-accent text-sm flex items-center group">
                      Conversemos
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                    </button>
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
