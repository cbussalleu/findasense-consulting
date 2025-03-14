
import { useEffect, useRef } from 'react';

export const GrowthSection = () => {
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
      id="services"
      ref={sectionRef} 
      className="py-24 opacity-0 transition-opacity duration-1000"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Box - Cream colored */}
          <div className="bg-cream text-dark p-8 md:p-12 rounded-2xl relative overflow-hidden">
            <div className="max-w-lg">
              <h3 className="uppercase font-display text-coral text-xl mb-1 tracking-tight">
                GROWTH-
              </h3>
              <h3 className="uppercase font-display text-dark text-xl mb-6 tracking-tight">
                FOCUSED
              </h3>
              
              <p className="text-dark/80 mb-8 text-sm md:text-base">
                Understanding the intricacies of your people and processes allows us to implement measurable solutions that align with your organization.
              </p>
              
              <div className="mt-auto">
                <h4 className="uppercase text-xs font-mono tracking-wider mb-3">DATA SOLUTIONS</h4>
                <div className="flex flex-col space-y-1 text-xs text-dark/70 font-mono">
                  <span>• Analysis & Insights</span>
                  <span>• Data Visualization</span>
                  <span>• Performance Metrics</span>
                  <span>• Trend Identification</span>
                </div>
              </div>
            </div>
            
            <div className="absolute right-4 bottom-4 w-16 h-16 md:w-24 md:h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M10,90 L90,10" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
                <circle cx="90" cy="10" r="8" fill="none" stroke="black" strokeWidth="2" />
                <circle cx="10" cy="90" r="8" fill="none" stroke="black" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Right Box - Coral colored */}
          <div className="bg-coral text-white p-8 md:p-12 rounded-2xl relative overflow-hidden">
            <div className="max-w-lg">
              <h3 className="uppercase font-display text-white text-xl mb-1 tracking-tight">
                GROWTH-
              </h3>
              <h3 className="uppercase font-display text-dark text-xl mb-6 tracking-tight">
                FOCUSED
              </h3>
              
              <p className="text-dark/90 mb-8 text-sm md:text-base">
                Creating solutions that integrate with your journey and drive growth. We build systems that deliver meaningful results for your organization.
              </p>
              
              <div className="mt-auto">
                <h4 className="uppercase text-xs font-mono tracking-wider mb-3 text-dark">EXPERIENCE SOLUTIONS</h4>
                <div className="flex flex-col space-y-1 text-xs text-dark/90 font-mono">
                  <span>• User Experience Design</span>
                  <span>• Interface Optimization</span>
                  <span>• Customer Journey Mapping</span>
                  <span>• Interaction Design</span>
                </div>
              </div>
            </div>
            
            <div className="absolute right-4 bottom-4 w-16 h-16 md:w-24 md:h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M10,10 L90,90" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
                <circle cx="90" cy="90" r="8" fill="none" stroke="black" strokeWidth="2" />
                <circle cx="10" cy="10" r="8" fill="none" stroke="black" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
