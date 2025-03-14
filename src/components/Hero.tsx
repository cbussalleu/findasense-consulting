
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
            <div className="chip bg-muted text-purple mb-5">WORKING IN <span className="text-purple-light">DATA</span></div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display tracking-tight text-white mb-8">
            <div className="text-reveal-container">
              <span className="text-reveal delay-50">O</span>
              <span className="text-reveal delay-100">u</span>
              <span className="text-reveal delay-150">r</span>
              <span className="text-reveal delay-200"> </span>
              <span className="text-reveal delay-250">r</span>
              <span className="text-reveal delay-300">a</span>
              <span className="text-reveal delay-350">r</span>
              <span className="text-reveal delay-400">e</span>
              <span className="text-reveal delay-450"> </span>
              <span className="text-reveal delay-500">b</span>
              <span className="text-reveal delay-550">l</span>
              <span className="text-reveal delay-600">e</span>
              <span className="text-reveal delay-650">n</span>
              <span className="text-reveal delay-700">d</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-100">o</span>
              <span className="text-reveal delay-150">f</span>
              <span className="text-reveal delay-200"> </span>
              <span className="text-reveal delay-250">c</span>
              <span className="text-reveal delay-300">r</span>
              <span className="text-reveal delay-350">e</span>
              <span className="text-reveal delay-400">a</span>
              <span className="text-reveal delay-450">t</span>
              <span className="text-reveal delay-500">i</span>
              <span className="text-reveal delay-550">v</span>
              <span className="text-reveal delay-600">i</span>
              <span className="text-reveal delay-650">t</span>
              <span className="text-reveal delay-700">y</span>
              <span className="text-reveal delay-750">,</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-150">e</span>
              <span className="text-reveal delay-200">x</span>
              <span className="text-reveal delay-250">p</span>
              <span className="text-reveal delay-300">e</span>
              <span className="text-reveal delay-350">r</span>
              <span className="text-reveal delay-400">t</span>
              <span className="text-reveal delay-450">i</span>
              <span className="text-reveal delay-500">s</span>
              <span className="text-reveal delay-550">e</span>
              <span className="text-reveal delay-600">,</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-200">a</span>
              <span className="text-reveal delay-250">n</span>
              <span className="text-reveal delay-300">d</span>
              <span className="text-reveal delay-350"> </span>
              <span className="text-reveal delay-400">e</span>
              <span className="text-reveal delay-450">t</span>
              <span className="text-reveal delay-500">h</span>
              <span className="text-reveal delay-550">i</span>
              <span className="text-reveal delay-600">c</span>
              <span className="text-reveal delay-650">s</span>
              <span className="text-reveal delay-700"> </span>
              <span className="text-reveal delay-750">m</span>
              <span className="text-reveal delay-800">a</span>
              <span className="text-reveal delay-850">k</span>
              <span className="text-reveal delay-900">e</span>
              <span className="text-reveal delay-950">s</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-250">u</span>
              <span className="text-reveal delay-300">s</span>
              <span className="text-reveal delay-350"> </span>
              <span className="text-reveal delay-400">t</span>
              <span className="text-reveal delay-450">h</span>
              <span className="text-reveal delay-500">e</span>
              <span className="text-reveal delay-550"> </span>
              <span className="text-reveal delay-600">p</span>
              <span className="text-reveal delay-650">e</span>
              <span className="text-reveal delay-700">r</span>
              <span className="text-reveal delay-750">f</span>
              <span className="text-reveal delay-800">e</span>
              <span className="text-reveal delay-850">c</span>
              <span className="text-reveal delay-900">t</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-300">p</span>
              <span className="text-reveal delay-350">a</span>
              <span className="text-reveal delay-400">r</span>
              <span className="text-reveal delay-450">t</span>
              <span className="text-reveal delay-500">n</span>
              <span className="text-reveal delay-550">e</span>
              <span className="text-reveal delay-600">r</span>
              <span className="text-reveal delay-650"> </span>
              <span className="text-reveal delay-700">f</span>
              <span className="text-reveal delay-750">o</span>
              <span className="text-reveal delay-800">r</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-350">y</span>
              <span className="text-reveal delay-400">o</span>
              <span className="text-reveal delay-450">u</span>
              <span className="text-reveal delay-500">.</span>
            </div>
          </h1>
          
          <div className="mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
            <a href="#services" className="button-primary group">
              <span className="flex items-center">
                Discover our services 
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
                      <div className="w-full h-full bg-cream"></div>
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
