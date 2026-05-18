
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenWelcome');
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setIsOpen(false);
  };

  const handleAction = () => {
    close();
    navigate('/passes');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-black/95 backdrop-blur-md"
            onClick={close}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative max-w-lg w-full glass-card p-12 text-center purple-glow border-brand-gold/30"
          >
            <Crown className="w-12 h-12 text-brand-gold mx-auto mb-8" />
            
            <h2 className="text-3xl gold-gradient-text uppercase font-display mb-8 tracking-[0.2em]">Déesse Angèle</h2>
            
            <p className="text-white/80 mb-10 leading-relaxed italic serif-font text-xl px-2">
              "Bienvenue chers Participants. Je suis la Déesse Angèle, spécialisée dans l’organisation de fêtes privées haut de gamme. Ici, sensualité et fantasme rencontrent curiosité et excitation dans un cadre d'exception."
            </p>

            <div className="space-y-4">
              <button 
                onClick={handleAction}
                className="gold-btn w-full !py-5"
              >
                JE VEUX MON PASS
              </button>
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">
                🔞 Accès strictement réservé aux majeurs consentants
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
