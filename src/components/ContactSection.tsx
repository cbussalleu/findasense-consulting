
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export const ContactSection = () => {
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
      id="contact"
      ref={sectionRef}
      className="py-24 bg-dark opacity-0 transition-opacity duration-1000"
    >
      <div className="section-container text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="chip bg-coral/20 text-coral mb-5">
              <ArrowRight size={12} className="inline mr-1" />
              <span>LET'S TALK</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display text-white mb-8">
            Ready to transform your customer experience?
          </h2>
          
          <div className="flex justify-center">
            <a 
              href="mailto:consulting@findasense.com" 
              className="button-primary group text-lg"
            >
              <span className="flex items-center">
                Contact Us
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </span>
            </a>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-white font-medium mb-2">Email</h3>
              <p className="text-white/60 text-sm">consulting@findasense.com</p>
            </div>
          </div>
          
          <div className="mt-24 text-white/40 text-sm">
            <p>&copy; 2025 Findasense, a Teleperformance Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
