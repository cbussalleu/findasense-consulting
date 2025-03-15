
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export const ProofSection = () => {
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
      id="work"
      ref={sectionRef}
      className="py-24 bg-dark opacity-0 transition-opacity duration-1000"
    >
      <div className="section-container">
        <div className="mb-16">
          <h2 className="uppercase font-display text-white text-lg md:text-xl mb-1 tracking-tight">
            ÚLTIMOS
          </h2>
          <h2 className="uppercase font-display text-purple text-lg md:text-xl mb-12 tracking-tight">
            PROYECTOS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="highlight-box">
              <div className="mb-4 opacity-80">
                <svg viewBox="0 0 100 50" className="w-32 h-16">
                  <path d="M10,25 C10,15 30,15 50,25 C70,35 90,35 90,25" stroke="white" strokeWidth="2" fill="none" />
                  <circle cx="10" cy="25" r="4" fill="white" />
                  <circle cx="90" cy="25" r="4" fill="white" />
                </svg>
              </div>
              <h3 className="text-xl text-white mb-2">Coca-Cola</h3>
              <div className="text-3xl font-display text-purple mb-4">93%</div>
              <p className="text-white/70 text-sm">Increase in customer engagement through our data-driven approach to experience design.</p>
              <div className="mt-4">
                <a href="#" className="text-purple text-sm flex items-center group hover:underline">
                  Conoce el caso
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </a>
              </div>
            </div>
            
            <div className="highlight-box">
              <div className="mb-4 opacity-80">
                <svg viewBox="0 0 100 50" className="w-32 h-16">
                  <rect x="20" y="10" width="60" height="30" stroke="white" strokeWidth="2" fill="none" />
                  <circle cx="50" cy="25" r="10" stroke="white" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <h3 className="text-xl text-white mb-2">Netflix</h3>
              <div className="text-3xl font-display text-purple mb-4">87%</div>
              <p className="text-white/70 text-sm">Improvement in user retention rates after implementing our personalized recommendation engine.</p>
              <div className="mt-4">
                <a href="#" className="text-purple text-sm flex items-center group hover:underline">
                  Conoce el caso
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </a>
              </div>
            </div>
            
            <div className="highlight-box">
              <div className="mb-4 opacity-80">
                <svg viewBox="0 0 100 50" className="w-32 h-16">
                  <path d="M20,40 L50,10 L80,40" stroke="white" strokeWidth="2" fill="none" />
                  <circle cx="50" cy="10" r="5" fill="white" />
                </svg>
              </div>
              <h3 className="text-xl text-white mb-2">Airbnb</h3>
              <div className="text-3xl font-display text-purple mb-4">78%</div>
              <p className="text-white/70 text-sm">Growth in marketplace activity through our comprehensive UX redesign and data strategy.</p>
              <div className="mt-4">
                <a href="#" className="text-purple text-sm flex items-center group hover:underline">
                  Conoce el caso
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
