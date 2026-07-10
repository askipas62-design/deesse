import { Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-brand-purple/20 bg-brand-black">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="mb-8">
          <Crown className="w-10 h-10 text-brand-gold mx-auto mb-2" />
          <h2 className="font-cursive text-brand-gold text-5xl">Déesse Angèle</h2>
        </div>

        <div className="space-y-4 mb-12">
          <p className="text-white/80 font-display text-xl uppercase tracking-[0.2em]">Ton plaisir, ma règle.</p>
          <p className="text-brand-gold font-cursive text-3xl">Discrétion, professionnalisme et sérénité.</p>
          <div className="pt-4 flex items-center justify-center gap-6">
            <p className="text-brand-gold font-bold text-xs tracking-widest uppercase">Telegram : @deesse_Angele</p>
            <p className="text-brand-gold font-bold text-xs tracking-widest uppercase text-white/40">|</p>
            <p className="text-brand-gold font-bold text-xs tracking-widest uppercase">WhatsApp : +33 6 51 08 85 42</p>
          </div>
        </div>

        <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] mb-12 font-bold italic">
          — Événements privés adultes sur sélection —
        </p>

        <div className="flex flex-wrap justify-center gap-8 text-[10px] items-center uppercase tracking-widest text-white/40 mb-12 font-bold">
          <Link to="/privacy" className="hover:text-brand-gold transition-colors">Politique de Confidentialité</Link>
          <div className="w-1 h-1 bg-brand-purple-glow rounded-full" />
          <Link to="/legal" className="hover:text-brand-gold transition-colors">Mentions Légales</Link>
          <div className="w-1 h-1 bg-brand-purple-glow rounded-full" />
          <Link to="/conduct" className="hover:text-brand-gold transition-colors">Code de Conduite</Link>
          <div className="w-1 h-1 bg-brand-purple-glow rounded-full" />
          <Link to="/faq" className="hover:text-brand-gold transition-colors">F.A.Q</Link>
          <div className="w-1 h-1 bg-brand-purple-glow rounded-full" />
          <a href="https://t.me/deesse_Angele" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Telegram</a>
          <div className="w-1 h-1 bg-brand-purple-glow rounded-full" />
          <a href="https://wa.me/33651088542" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">WhatsApp</a>
        </div>

        <div className="max-w-2xl text-[9px] text-white/20 uppercase tracking-[0.2em] leading-relaxed mb-8">
          Avertissement : Les services présentés sur ce site sont strictement réservés aux personnes majeures (+18). 
          L'accès au sanctuaire est soumis à une validation préalable et au respect strict de l'étiquette.
        </div>

        <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
          &copy; {new Date().getFullYear()} DÉESSE ANGELE. TOUS DROITS RÉSERVÉS.
          <Link to="/admin" className="w-1 h-1 bg-white/5 hover:bg-brand-gold/20 rounded-full transition-colors" title="Admin" />
        </p>
      </div>
    </footer>
  );
}
