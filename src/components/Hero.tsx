
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
              <span className="text-reveal delay-100">L</span>
              <span className="text-reveal delay-150">&nbsp;</span>
              <span className="text-reveal delay-200">S</span>
              <span className="text-reveal delay-250">O</span>
              <span className="text-reveal delay-300">P</span>
              <span className="text-reveal delay-350">O</span>
              <span className="text-reveal delay-400">R</span>
              <span className="text-reveal delay-450">T</span>
              <span className="text-reveal delay-500">E</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-100">E</span>
              <span className="text-reveal delay-150">S</span>
              <span className="text-reveal delay-200">T</span>
              <span className="text-reveal delay-250">R</span>
              <span className="text-reveal delay-300">A</span>
              <span className="text-reveal delay-350">T</span>
              <span className="text-reveal delay-400">É</span>
              <span className="text-reveal delay-450">G</span>
              <span className="text-reveal delay-500">I</span>
              <span className="text-reveal delay-550">C</span>
              <span className="text-reveal delay-600">O</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-150">P</span>
              <span className="text-reveal delay-200">A</span>
              <span className="text-reveal delay-250">R</span>
              <span className="text-reveal delay-300">A</span>
              <span className="text-reveal delay-350">&nbsp;</span>
              <span className="text-reveal delay-400">D</span>
              <span className="text-reveal delay-450">E</span>
              <span className="text-reveal delay-500">S</span>
              <span className="text-reveal delay-550">A</span>
              <span className="text-reveal delay-600">F</span>
              <span className="text-reveal delay-650">Í</span>
              <span className="text-reveal delay-700">O</span>
              <span className="text-reveal delay-750">S</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-200">D</span>
              <span className="text-reveal delay-250">E</span>
              <span className="text-reveal delay-300">&nbsp;</span>
              <span className="text-reveal delay-350">C</span>
              <span className="text-reveal delay-400">X</span>
              <span className="text-reveal delay-450">&nbsp;</span>
              <span className="text-reveal delay-500">Q</span>
              <span className="text-reveal delay-550">U</span>
              <span className="text-reveal delay-600">E</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-250">R</span>
              <span className="text-reveal delay-300">E</span>
              <span className="text-reveal delay-350">Q</span>
              <span className="text-reveal delay-400">U</span>
              <span className="text-reveal delay-450">I</span>
              <span className="text-reveal delay-500">E</span>
              <span className="text-reveal delay-550">R</span>
              <span className="text-reveal delay-600">E</span>
              <span className="text-reveal delay-650">N</span>
              <span className="text-reveal delay-700">&nbsp;</span>
              <span className="text-reveal delay-750">U</span>
              <span className="text-reveal delay-800">N</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-300">E</span>
              <span className="text-reveal delay-350">N</span>
              <span className="text-reveal delay-400">F</span>
              <span className="text-reveal delay-450">O</span>
              <span className="text-reveal delay-500">Q</span>
              <span className="text-reveal delay-550">U</span>
              <span className="text-reveal delay-600">E</span>
              <span className="text-reveal delay-650">&nbsp;</span>
              <span className="text-reveal delay-700">I</span>
              <span className="text-reveal delay-750">N</span>
              <span className="text-reveal delay-800">T</span>
              <span className="text-reveal delay-850">E</span>
              <span className="text-reveal delay-900">G</span>
              <span className="text-reveal delay-950">R</span>
              <span className="text-reveal delay-1000">A</span>
              <span className="text-reveal delay-1050">L</span>
            </div>
          </h1>
          
          <div className="mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
            <a href="#services" className="button-primary group">
              <span className="flex items-center">
                APRENDE MÁS DE CONSULTING 
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </span>
            </a>
          </div>
          
          <div className="w-full mt-16 relative">
            <div className="w-full aspect-square md:aspect-[2/1] max-w-4xl mx-auto relative opacity-0 animate-fade-in" style={{ animationDelay: '1.8s', animationFillMode: 'forwards' }}>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-cream rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <div className="w-full h-full relative bg-dark border border-white/10 rounded-2xl overflow-hidden">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-cream rounded-full opacity-20"></div>
                
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4">
                  <div className="w-40 h-40 bg-primary/20 filter blur-md rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
                </div>
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-40 h-40 bg-cream rounded-full overflow-hidden">
                      <div className="w-full h-full bg-cream flex items-center justify-center text-secondary font-display text-5xl">FAS</div>
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 w-20 h-20 bg-primary rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
