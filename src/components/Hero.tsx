
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
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
      ref={sectionRef} 
      className="min-h-screen flex items-center pt-24 pb-16 bg-dark opacity-0 transition-opacity duration-1000"
    >
      <div className="section-container">
        <div className="flex flex-col items-start">
          <div className="mb-8">
            <div className="chip bg-muted text-accent mb-5">INVESTIGAMOS Y <span className="text-accent-light">REMODELAMOS</span></div>
            <div className="chip bg-muted text-primary mb-5 ml-0 md:ml-8">REMODELAMOS E <span className="text-primary-dark">IMPLEMENTAMOS</span></div>
            <div className="chip bg-muted text-purple mb-5 ml-0 md:ml-16">IMPLEMENTAMOS Y <span className="text-purple-light">GESTIONAMOS EL CAMBIO</span></div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display tracking-tight text-white mb-8 uppercase w-full">
            <div className="text-reveal-container">
              <span className="text-reveal delay-50">E</span>
              <span className="text-reveal delay-100">X</span>
              <span className="text-reveal delay-150">P</span>
              <span className="text-reveal delay-200">E</span>
              <span className="text-reveal delay-250">R</span>
              <span className="text-reveal delay-300">T</span>
              <span className="text-reveal delay-350">O</span>
              <span className="text-reveal delay-400">S</span>
              <span className="text-reveal delay-450">&nbsp;</span>
              <span className="text-reveal delay-500">E</span>
              <span className="text-reveal delay-550">N</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-100">S</span>
              <span className="text-reveal delay-150">O</span>
              <span className="text-reveal delay-200">L</span>
              <span className="text-reveal delay-250">U</span>
              <span className="text-reveal delay-300">C</span>
              <span className="text-reveal delay-350">I</span>
              <span className="text-reveal delay-400">O</span>
              <span className="text-reveal delay-450">N</span>
              <span className="text-reveal delay-500">E</span>
              <span className="text-reveal delay-550">S</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-150">C</span>
              <span className="text-reveal delay-200">O</span>
              <span className="text-reveal delay-250">N</span>
              <span className="text-reveal delay-300">&nbsp;</span>
              <span className="text-reveal delay-350">E</span>
              <span className="text-reveal delay-400">N</span>
              <span className="text-reveal delay-450">F</span>
              <span className="text-reveal delay-500">O</span>
              <span className="text-reveal delay-550">Q</span>
              <span className="text-reveal delay-600">U</span>
              <span className="text-reveal delay-650">E</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-200">I</span>
              <span className="text-reveal delay-250">N</span>
              <span className="text-reveal delay-300">T</span>
              <span className="text-reveal delay-350">E</span>
              <span className="text-reveal delay-400">G</span>
              <span className="text-reveal delay-450">R</span>
              <span className="text-reveal delay-500">A</span>
              <span className="text-reveal delay-550">L</span>
              <span className="text-reveal delay-600">&nbsp;</span>
              <span className="text-reveal delay-650">Y</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-250">E</span>
              <span className="text-reveal delay-300">S</span>
              <span className="text-reveal delay-350">P</span>
              <span className="text-reveal delay-400">E</span>
              <span className="text-reveal delay-450">C</span>
              <span className="text-reveal delay-500">I</span>
              <span className="text-reveal delay-550">A</span>
              <span className="text-reveal delay-600">L</span>
              <span className="text-reveal delay-650">I</span>
              <span className="text-reveal delay-700">Z</span>
              <span className="text-reveal delay-750">A</span>
              <span className="text-reveal delay-800">D</span>
              <span className="text-reveal delay-850">O</span>
            </div>
          </h1>
          
          <div className="mb-12">
            <a href="#solutions" className="button-primary inline-flex items-center justify-center px-6 py-3 rounded-md bg-accent text-white font-medium transition-all hover:bg-accent-light">
              <span className="flex items-center">
                APRENDE MÁS DE CONSULTING 
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
