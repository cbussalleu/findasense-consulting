
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
              href="mailto:hello@cxagency.com" 
              className="button-primary group text-lg"
            >
              <span className="flex items-center">
                Contact Us
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </span>
            </a>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.5 10.5V13.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-white font-medium mb-2">Location</h3>
              <p className="text-white/60 text-sm">123 Experience St.<br />New York, NY 10001</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-white font-medium mb-2">Email</h3>
              <p className="text-white/60 text-sm">hello@cxagency.com<br />support@cxagency.com</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 16.9999V19.9999C20.0011 20.1135 19.9779 20.2262 19.9317 20.3312C19.8855 20.4362 19.8173 20.5308 19.7308 20.6082C19.6444 20.6857 19.5415 20.7441 19.4294 20.7796C19.3173 20.8152 19.1987 20.8271 19.08 20.8149C16.3583 20.5004 13.7628 19.4975 11.5 17.8899C9.38743 16.3982 7.6007 14.6115 6.10899 12.4999C4.49997 10.2322 3.49706 7.63092 3.18501 4.90326C3.17285 4.78486 3.18463 4.66651 3.22005 4.55459C3.25548 4.44268 3.31372 4.33988 3.39088 4.25347C3.46804 4.16706 3.56227 4.09886 3.66695 4.0526C3.77164 4.00633 3.88394 3.98298 3.997 3.98293H6.997C7.19544 3.98111 7.38766 4.05417 7.54046 4.18499C7.69325 4.31581 7.79612 4.49336 7.832 4.68793C7.89823 5.08463 8.00196 5.47221 8.143 5.84693C8.19706 5.98263 8.21011 6.12903 8.18051 6.27089C8.15091 6.41275 8.07966 6.54344 7.974 6.64993L6.703 7.92093C8.08868 10.0576 9.94138 11.9103 12.078 13.2959L13.349 12.0249C13.4555 11.9193 13.5862 11.848 13.7281 11.8184C13.8699 11.7888 14.0163 11.8019 14.152 11.8559C14.5267 11.9969 14.9143 12.1006 15.311 12.1669C15.5069 12.2031 15.6856 12.3073 15.8166 12.462C15.9477 12.6167 16.0203 12.8112 16.017 13.0099L16 16.0099C16.0001 16.1228 15.9768 16.2344 15.9313 16.3382C15.8858 16.4419 15.8191 16.5354 15.7345 16.6121C15.6498 16.6888 15.5493 16.7473 15.4399 16.7839C15.3305 16.8204 15.2144 16.8343 15.099 16.8149C12.3772 16.5005 9.78182 15.4975 7.519 13.8899C5.40643 12.3982 3.6197 10.6115 2.12799 8.49993C0.518966 6.23234 -0.483934 3.63092 -0.795984 0.903259C-0.808143 0.784858 -0.796363 0.666515 -0.760942 0.5546C-0.725521 0.442685 -0.667276 0.339887 -0.590116 0.25348C-0.512956 0.167072 -0.418726 0.0988745 -0.314043 0.0526C-0.20936 0.00632547 -0.0970367 -0.0170256 0.0160273 -0.0170746H3.016C3.21444 -0.0188887 3.40666 0.0541814 3.55946 0.185C3.71225 0.315819 3.81512 0.493363 3.851 0.687927C3.91722 1.08462 4.02096 1.47221 4.162 1.84692C4.21606 1.98263 4.22911 2.12902 4.19951 2.27088C4.16991 2.41275 4.09866 2.54343 3.993 2.64992L2.722 3.92092C4.10768 6.05761 5.96038 7.91031 8.097 9.29592L9.368 8.02493C9.47451 7.91928 9.60519 7.84803 9.74705 7.81843C9.88891 7.78883 10.0353 7.80188 10.171 7.85593C10.5458 7.9969 10.9334 8.10064 11.33 8.16692C11.5259 8.2031 11.7046 8.30727 11.8356 8.462C11.9667 8.61673 12.0393 8.81116 12.036 9.00992L12 12.0099C12.0001 12.1229 11.9768 12.2346 11.9312 12.3384C11.8857 12.4422 11.8189 12.5358 11.7343 12.6125C11.6496 12.6893 11.549 12.7478 11.4396 12.7844C11.3301 12.821 11.2139 12.8349 11.0985 12.8155C8.37669 12.5011 5.78134 11.4981 3.51852 9.89048C1.40595 8.39876 -0.370781 6.61203 -1.86249 4.50045C-3.47151 2.23286 -4.47442 -0.368558 -4.78647 -3.09622C-4.79864 -3.21462 -4.78686 -3.33297 -4.75144 -3.44489C-4.71601 -3.5568 -4.65778 -3.6596 -4.58062 -3.74601C-4.50345 -3.83242 -4.40923 -3.90062 -4.30454 -3.94688C-4.19985 -3.99315 -4.08756 -4.0165 -3.9745 -4.01655H-0.9745C-0.77606 -4.01837 -0.583839 -3.94531 -0.431042 -3.81449C-0.278245 -3.68367 -0.175378 -3.50612 -0.1395 -3.31155C-0.0732642 -2.91485 0.0304678 -2.52727 0.1715 -2.15255C0.225563 -2.01685 0.238616 -1.87045 0.209016 -1.72859C0.179416 -1.58673 0.108165 -1.45604 0.0025 -1.34955L-1.2685 -0.0785529C0.107179 2.11814 1.95988 3.97084 4.0965 5.35645L5.3675 4.08545C5.47401 3.9798 5.60469 3.90855 5.74655 3.87895C5.88841 3.84935 6.03481 3.8624 6.1705 3.91645C6.54527 4.05743 6.9329 4.16116 7.3295 4.22745C7.52542 4.26363 7.70409 4.3678 7.83515 4.52253C7.96622 4.67725 8.03888 4.87169 8.0355 5.07045L8 8.07045C8.00011 8.18358 7.97681 8.29525 7.93126 8.39906C7.88571 8.50287 7.81895 8.59649 7.73428 8.67324C7.64962 8.74999 7.54907 8.80839 7.43963 8.84498C7.33019 8.88156 7.21406 8.89545 7.0985 8.87592C4.37669 8.56147 1.78134 7.55856 -0.48148 5.95093C-2.59405 4.4592 -4.37078 2.67248 -5.86249 0.560898C-7.47151 -1.70669 -8.47442 -4.30811 -8.78647 -7.03577C-8.79864 -7.15417 -8.78686 -7.27252 -8.75144 -7.38444C-8.71601 -7.49635 -8.65778 -7.60915 -8.58062 -7.69556C-8.50345 -7.78197 -8.40923 -7.85018 -8.30454 -7.89644C-8.19985 -7.94271 -8.08756 -7.96605 -7.9745 -7.9661H-4.9745C-4.77606 -7.96792 -4.58384 -7.89486 -4.43104 -7.76404C-4.27825 -7.63322 -4.17538 -7.45568 -4.1395 -7.2611C-4.07326 -6.8644 -3.96953 -6.47682 -3.8285 -6.1021C-3.77444 -5.9664 -3.76138 -5.82 -3.79098 -5.67814C-3.82058 -5.53628 -3.89183 -5.40559 -3.9975 -5.2991L-5.2685 -4.0281C-3.88282 -1.89141 -2.03012 -0.0387086 0.106502 1.3469L1.3775 0.0759013C1.48401 -0.0297487 1.61469 -0.100999 1.75655 -0.130599C1.89841 -0.160199 2.04481 -0.147146 2.1805 -0.0930834C2.55527 0.0478832 2.9429 0.151615 3.3395 0.217905C3.53542 0.254083 3.71409 0.358254 3.84515 0.512984C3.97622 0.667714 4.04888 0.862153 4.0455 1.0609L4 4.06092Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-white font-medium mb-2">Phone</h3>
              <p className="text-white/60 text-sm">+1 (555) 123-4567<br />+1 (555) 987-6543</p>
            </div>
          </div>
          
          <div className="mt-24 text-white/40 text-sm">
            <p>&copy; 2023 CX Agency. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
