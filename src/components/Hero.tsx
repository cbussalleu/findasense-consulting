
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
            <div className="chip bg-muted text-purple mb-5">SOLUCIONES <span className="text-purple-light">FINANCIERAS</span></div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display tracking-tight text-white mb-8">
            <div className="text-reveal-container">
              <span className="text-reveal delay-50">E</span>
              <span className="text-reveal delay-100">x</span>
              <span className="text-reveal delay-150">p</span>
              <span className="text-reveal delay-200">e</span>
              <span className="text-reveal delay-250">r</span>
              <span className="text-reveal delay-300">t</span>
              <span className="text-reveal delay-350">o</span>
              <span className="text-reveal delay-400">s</span>
              <span className="text-reveal delay-450"> </span>
              <span className="text-reveal delay-500">e</span>
              <span className="text-reveal delay-550">n</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-100">a</span>
              <span className="text-reveal delay-150">s</span>
              <span className="text-reveal delay-200">e</span>
              <span className="text-reveal delay-250">s</span>
              <span className="text-reveal delay-300">o</span>
              <span className="text-reveal delay-350">r</span>
              <span className="text-reveal delay-400">a</span>
              <span className="text-reveal delay-450">m</span>
              <span className="text-reveal delay-500">i</span>
              <span className="text-reveal delay-550">e</span>
              <span className="text-reveal delay-600">n</span>
              <span className="text-reveal delay-650">t</span>
              <span className="text-reveal delay-700">o</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-150">f</span>
              <span className="text-reveal delay-200">i</span>
              <span className="text-reveal delay-250">n</span>
              <span className="text-reveal delay-300">a</span>
              <span className="text-reveal delay-350">n</span>
              <span className="text-reveal delay-400">c</span>
              <span className="text-reveal delay-450">i</span>
              <span className="text-reveal delay-500">e</span>
              <span className="text-reveal delay-550">r</span>
              <span className="text-reveal delay-600">o</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-200">p</span>
              <span className="text-reveal delay-250">a</span>
              <span className="text-reveal delay-300">r</span>
              <span className="text-reveal delay-350">a</span>
              <span className="text-reveal delay-400"> </span>
              <span className="text-reveal delay-450">t</span>
              <span className="text-reveal delay-500">u</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-250">e</span>
              <span className="text-reveal delay-300">m</span>
              <span className="text-reveal delay-350">p</span>
              <span className="text-reveal delay-400">r</span>
              <span className="text-reveal delay-450">e</span>
              <span className="text-reveal delay-500">s</span>
              <span className="text-reveal delay-550">a</span>
              <span className="text-reveal delay-600">.</span>
            </div>
          </h1>
          
          <div className="mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
            <a href="#services" className="button-primary group">
              <span className="flex items-center">
                Descubre nuestros servicios 
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </span>
            </a>
          </div>
          
          <div className="w-full mt-16 relative">
            <div className="w-full aspect-square md:aspect-[2/1] max-w-3xl mx-auto relative opacity-0 animate-fade-in" style={{ animationDelay: '1.8s', animationFillMode: 'forwards' }}>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-cream rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <div className="w-full h-full relative bg-dark border border-white/10 rounded-2xl overflow-hidden">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-cream rounded-full opacity-20"></div>
                
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4">
                  <div className="w-40 h-40 bg-coral/20 filter blur-md rounded-full animate-pulse" style={{ animationDuration: '4s' }}></div>
                </div>
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-40 h-40 bg-cream rounded-full overflow-hidden">
                      <div className="w-full h-full bg-cream flex items-center justify-center text-dark font-display text-5xl">FAS</div>
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 w-20 h-20 bg-coral rounded-full"></div>
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
