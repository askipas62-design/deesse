import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Crown, ShieldCheck, MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';

export default function PassVerification() {
  const [searchParams] = useSearchParams();
  const tier = searchParams.get('tier') || 'Elite';
  const email = searchParams.get('email') || 'Inconnu';
  const id = searchParams.get('id') || '000000';

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-6 relative overflow-hidden font-serif">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-purple/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="max-w-md w-full relative"
      >
        {/* Glowing Orbs */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-brand-gold/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-brand-purple/10 blur-[100px] rounded-full" />

        {/* The Card */}
        <div className="relative z-10 overflow-hidden rounded-[2rem] border border-brand-gold/30 bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(197,166,102,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-brand-purple/5" />
          
          <div className="p-8 md:p-12 text-center relative z-10">
            {/* Header */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <div className="absolute -inset-8 bg-brand-gold/10 blur-2xl rounded-full animate-pulse" />
                <div className="relative w-24 h-24 rounded-full border-2 border-brand-gold/40 flex items-center justify-center bg-black/60 shadow-[inset_0_0_20px_rgba(197,166,102,0.2)]">
                  <Crown className="w-12 h-12 text-brand-gold" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h1 className="text-4xl font-display gold-gradient-text uppercase tracking-[0.4em] mb-2">Invitation</h1>
              <p className="text-brand-gold/60 font-serif italic text-lg mb-8 tracking-widest uppercase">Au-delà du voile</p>
            </motion.div>

            {/* Verification Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="relative inline-flex items-center gap-3 px-8 py-3 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-12 shadow-[0_0_20px_rgba(197,166,102,0.2)] overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <ShieldCheck className="w-4 h-4" />
              Statut : AUTHENTIFIÉ PAR LA DÉESSE
            </motion.div>

            {/* Details Grid */}
            <div className="space-y-8 text-left mb-12 bg-white/5 p-6 rounded-2xl border border-white/5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-gold/40 mb-2">Honneur</p>
                  <p className="text-white font-serif italic text-lg leading-tight">{email.split('@')[0]}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-brand-gold/40 mb-2">Privilège</p>
                  <p className="text-brand-gold font-display uppercase tracking-widest text-lg">{tier}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] uppercase tracking-widest text-brand-gold/40 mb-2">Sceau d'Authenticité</p>
                <p className="text-white/40 font-mono text-[10px] break-all tracking-wider">SECURE-TOKEN-DA-{id.toUpperCase()}</p>
              </div>
            </div>

            {/* Poetic Message */}
            <div className="relative mb-12">
              <div className="absolute -left-4 top-0 text-brand-gold/20 text-6xl font-serif">"</div>
              <p className="text-sm text-white/50 italic leading-relaxed px-4 text-center font-serif">
                Ce fragment d'or numérique est votre passe temporaire pour notre cercle privé.
              </p>
            </div>

            {/* Practical Info Placeholders (Classy) */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 text-left">
                <MapPin className="w-4 h-4 text-brand-gold/40" />
                <div className="text-[9px] uppercase tracking-widest text-white/40">Lieu<br/><span className="text-white/80">Secret</span></div>
              </div>
              <div className="flex items-center gap-3 text-left">
                <Calendar className="w-4 h-4 text-brand-gold/40" />
                <div className="text-[9px] uppercase tracking-widest text-white/40">Date<br/><span className="text-white/80">Prochaine Session</span></div>
              </div>
            </div>

            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-brand-gold hover:text-white transition-colors group"
            >
              Retour au site
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Decorative Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square border border-brand-gold/5 rounded-full pointer-events-none -z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square border border-brand-gold/5 rounded-full pointer-events-none -z-0 animate-spin-slow" />
      </motion.div>
    </div>
  );
}
