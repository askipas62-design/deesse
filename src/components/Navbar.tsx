import { motion, AnimatePresence } from 'motion/react';
import { Crown, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 ${
          isScrolled 
            ? 'bg-brand-black/95 backdrop-blur-xl border-b border-brand-purple shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
            : 'bg-transparent'
        }`}
      >
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <Crown className="text-brand-gold w-7 h-7 group-hover:rotate-12 transition-transform" />
            <div className="absolute inset-0 bg-brand-gold/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
          <span className="font-cursive text-brand-gold text-3xl md:text-4xl">Déesse Angèle</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
          <Link to="/" className={`hover:text-brand-gold transition-colors relative group ${pathname === '/' ? 'text-brand-gold' : ''}`}>
            Accueil
            <span className={`absolute -bottom-1 left-0 h-[1px] bg-brand-gold transition-all duration-300 ${pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </Link>
          <Link to="/hôtesses" className={`hover:text-brand-gold transition-colors relative group ${pathname === '/hôtesses' ? 'text-brand-gold' : ''}`}>
            Hôtesses
            <span className={`absolute -bottom-1 left-0 h-[1px] bg-brand-gold transition-all duration-300 ${pathname === '/hôtesses' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </Link>
          <Link to="/passes" className={`hover:text-brand-gold transition-colors relative group ${pathname === '/passes' ? 'text-brand-gold' : ''}`}>
            Passes
            <span className={`absolute -bottom-1 left-0 h-[1px] bg-brand-gold transition-all duration-300 ${pathname === '/passes' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/passes" className="gold-btn hidden md:flex !py-2 !px-8 !text-[10px] font-bold">
            RÉSERVER
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-brand-gold p-2"
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[49] bg-brand-black/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-12 p-10"
          >
            <div className="flex flex-col items-center gap-8 text-xl font-bold uppercase tracking-[0.4em] text-white/50">
              <Link 
                to="/" 
                className={`hover:text-brand-gold transition-colors ${pathname === '/' ? 'text-brand-gold' : ''}`}
              >
                Accueil
              </Link>
              <Link 
                to="/hôtesses" 
                className={`hover:text-brand-gold transition-colors ${pathname === '/hôtesses' ? 'text-brand-gold' : ''}`}
              >
                Hôtesses
              </Link>
              <Link 
                to="/passes" 
                className={`hover:text-brand-gold transition-colors ${pathname === '/passes' ? 'text-brand-gold' : ''}`}
              >
                Passes
              </Link>
            </div>
            
            <Link to="/passes" className="gold-btn w-full max-w-[300px] text-center !py-4 font-bold tracking-[0.2em]">
              RÉSERVER MON PASS
            </Link>

            <div className="absolute bottom-10 left-0 w-full text-center">
              <p className="text-brand-gold/40 text-[10px] uppercase tracking-[0.3em]">
                Une nuit d'exception vous attend
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
