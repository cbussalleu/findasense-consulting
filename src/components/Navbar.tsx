
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        isScrolled ? "bg-dark/90 backdrop-blur-md py-3" : "bg-transparent"
      )}
    >
      <div className="section-container flex items-center justify-between">
        <a href="/" className="flex items-center">
          <span className="text-xl font-display tracking-tighter text-white">CX AGENCY</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#services" className="nav-link">Services</a>
          <a href="#work" className="nav-link">Work</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="button-primary">
            <span>Let's Talk</span>
          </a>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-md py-4 animate-fade-in">
          <div className="section-container flex flex-col space-y-4">
            <a 
              href="#services" 
              className="nav-link py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="#work" 
              className="nav-link py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Work
            </a>
            <a 
              href="#about" 
              className="nav-link py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#contact" 
              className="button-primary inline-block text-center w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Let's Talk</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
