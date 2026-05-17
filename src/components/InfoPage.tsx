import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface InfoPageProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function InfoPage({ title, subtitle, children }: InfoPageProps) {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-brand-gold/60 hover:text-brand-gold transition-colors text-[10px] uppercase tracking-widest mb-12 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour au sanctuaire
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl gold-gradient-text font-display mb-4 uppercase tracking-[0.2em] leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="font-cursive text-brand-purple-glow text-3xl mb-12">{subtitle}</p>
          )}
          
          <div className="glass-card p-8 md:p-12 border-brand-gold/20 prose prose-invert max-w-none prose-gold">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
