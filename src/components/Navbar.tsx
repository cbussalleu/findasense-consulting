
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-secondary/90 backdrop-blur-md py-3" : "bg-transparent"
      )}
    >
      <div className="section-container flex items-center justify-between relative">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            "absolute inset-0 border-2 border-primary rounded-lg -z-10 transition-all duration-300",
            isScrolled ? "top-auto h-1 bottom-0 rounded-none" : "rounded-lg"
          )}
        />
        
        <a 
          href="/" 
          className={cn(
            "flex items-center transition-all duration-300",
            isScrolled ? "ml-auto mr-auto" : ""
          )}
        >
          <span className="text-xl font-display tracking-tighter text-white">WE ARE FAS CONSULTING</span>
        </a>

        <nav className={cn(
          "hidden md:flex items-center space-x-8",
          isScrolled ? "absolute right-8" : ""
        )}>
          <a href="#services" className="nav-link">Soluciones</a>
          <a href="#about" className="nav-link">Casos</a>
          <a href="#work" className="nav-link">Recursos</a>
          <a href="#contact" className="button-primary">
            <span>Colabora con nosotros</span>
          </a>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={cn(
            "md:hidden text-white",
            isScrolled ? "absolute right-4" : ""
          )}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-secondary/95 backdrop-blur-md py-4 animate-fade-in">
          <div className="section-container flex flex-col space-y-4">
            <a 
              href="#services" 
              className="nav-link py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Soluciones
            </a>
            <a 
              href="#about" 
              className="nav-link py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Casos
            </a>
            <a 
              href="#work" 
              className="nav-link py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Recursos
            </a>
            <a 
              href="#contact" 
              className="button-primary inline-block text-center w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Colabora con nosotros</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
