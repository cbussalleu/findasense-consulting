
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4",
        isScrolled ? "bg-secondary/90 backdrop-blur-md py-6" : "bg-transparent"
      )}
    >
      <div className="section-container flex items-center justify-between relative">
        <div className="flex-1"></div>
        
        <a 
          href="/" 
          className={cn(
            "flex items-center justify-center transition-all duration-500 relative mx-auto",
            isScrolled ? "scale-110" : ""
          )}
        >
          <span className="text-xl font-display tracking-tighter text-white">WE ARE FAS CONSULTING</span>
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute bottom-[-5px] left-0 h-[1px] bg-primary"
            style={{
              transformOrigin: 'left',
            }}
          />
        </a>

        <div className="flex-1 flex justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="text-white"
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent className="bg-secondary/95 backdrop-blur-md">
              <div className="flex flex-col space-y-6 pt-10">
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
