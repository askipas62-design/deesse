import { motion } from 'motion/react';

const hostesses = Array.from({ length: 38 }, (_, i) => ({
  id: i + 1,
  image: `/images/hotesse/${i + 1}.jpg`
}));

export default function Hostesses() {
  return (
    <section className="py-24 px-6 bg-brand-black min-h-screen pt-32 relative overflow-hidden">
      {/* Background Decorative Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-purple/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 px-4">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="text-5xl md:text-8xl mb-8 gold-gradient-text uppercase font-display tracking-[0.2em]"
          >
            Le Cercle
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "150px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[1px] bg-brand-gold mx-auto mb-10"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/40 max-w-3xl mx-auto italic serif-font text-xl md:text-2xl leading-relaxed font-light"
          >
            "Oubliez les noms, perdez-vous dans le regard. Une collection de beautés capturées dans l'instant, prêtes à transformer vos désirs en réalité."
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
          {hostesses.map((hostess, index) => {
            // Variety in the grid for 38 items
            const isWide = index === 1 || index === 7 || index === 14 || index === 21 || index === 28 || index === 35;
            const isTall = index === 0 || index === 3 || index === 8 || index === 11 || index === 16 || index === 19 || index === 24 || index === 31;
            
            return (
              <motion.div
                key={hostess.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className={`relative overflow-hidden group border border-white/5 bg-white/5 rounded-sm ${
                  isWide ? 'md:col-span-2' : ''
                } ${
                  isTall ? 'md:row-span-2' : ''
                }`}
              >
                <img 
                  src={hostess.image} 
                  alt="Hôtesse" 
                  className="w-full h-full object-cover transition-all duration-[4000ms] ease-out group-hover:scale-110 brightness-100"
                  referrerPolicy="no-referrer"
                />
                
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-radial-gradient(circle_at_center, transparent 0%, rgba(0,0,0,0.8) 100%) opacity-60 group-hover:opacity-30 transition-opacity duration-1000" />
                
                {/* Gold Frame Reveal */}
                <div className="absolute inset-2 border border-brand-gold/0 group-hover:border-brand-gold/20 transition-all duration-1000 pointer-events-none" />
                
                {/* Subtle Glow on bottom */}
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-brand-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold">
                  SÉDUCTION PURE
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
