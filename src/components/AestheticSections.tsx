import { motion } from 'motion/react';

const sections = [
  {
    title: "L'Ombre et la Lumière",
    text: "Tes yeux me cherchent, mais c'est ton instinct qui te guidera. Dans la pénombre de mes appartements, la tension devient palpable. Ici, ton seul droit est celui de contempler ce qui t'est interdit ailleurs.",
    image: "/images/aesthetic/1.jpg",
    reverse: false
  },
  {
    title: "Le Velours des Sens",
    text: "Sens-tu le frisson qui parcourt ton échine ? La soie glisse, la peau s'échauffe et les barrières tombent. Chaque contact est une décharge, chaque caresse est un ordre silencieux auquel tu ne peux résister.",
    image: "/images/aesthetic/2.jpg",
    reverse: true
  },
  {
    title: "Murmures Interdits",
    text: "Je te dirai exactement ce que tu veux entendre, et tout ce que tu n'oses pas avouer. Mon souffle dans ton cou brise tes dernières défenses. Le plaisir commence par l'esprit avant d'embraser le reste.",
    image: "/images/aesthetic/3.jpg",
    reverse: false
  },
  {
    title: "Courbes Divines",
    text: "Admirer sans toucher, ou toucher sans jamais posséder. Mes courbes sont une architecture du désir pur. Tu es l'esclave de tes propres yeux, condamné à adorer chaque millimètre de ma chair.",
    image: "/images/aesthetic/4.jpg",
    reverse: true
  },
  {
    title: "Plaisirs Interdits",
    text: "Le luxe n'est rien sans le goût du péché. Savoure l'instant où tu t'abandonnes totalement à l'interdit. Un élixir de plaisir brut, réservé à l'élite qui ne connaît aucune limite.",
    image: "/images/aesthetic/5.jpg",
    reverse: false
  },
  {
    title: "Soumission Totale",
    text: "Oublie ton nom, oublie ton rang. Dans ce sanctuaire, tu n'es qu'une volonté soumise à mes caprices. La vraie transcendance naît de l'abandon complet. Prépare-toi à l'ineffable.",
    image: "/images/aesthetic/6.jpg",
    reverse: true
  },
  {
    title: "L'Ultime Frontière",
    text: "Au-delà des mots, au-delà des voiles. Un dernier souffle avant de sombrer dans l'oubli délicieux. Votre voyage ne fait que commencer, guidé par ma main invisible.",
    image: "/images/aesthetic/7.jpg",
    reverse: false
  }
];

export default function AestheticSections() {
  return (
    <div className="space-y-0">
      {sections.map((section, index) => (
        <section 
          key={index} 
          className={`py-32 px-6 relative overflow-hidden ${index % 2 === 0 ? 'bg-gradient-to-b from-transparent to-brand-purple/5' : 'bg-transparent'}`}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: section.reverse ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className={`order-1 ${section.reverse ? 'md:order-2' : 'md:order-1'}`}
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-brand-gold/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="glass-card p-1 border-brand-gold/20 overflow-hidden relative z-10">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src={section.image} 
                      alt={section.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[2000ms] brightness-100"
                    />
                  </div>
                </div>
                <div className={`absolute -bottom-8 ${section.reverse ? '-left-8' : '-right-8'} hidden lg:block`}>
                  <p className="text-[120px] font-display text-white/5 uppercase select-none tracking-tighter">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className={`order-2 ${section.reverse ? 'md:order-1 md:text-right' : 'md:order-2 md:text-left'} flex flex-col`}
            >
              <h3 className="text-4xl md:text-5xl gold-gradient-text font-display mb-8 uppercase tracking-[0.2em] leading-tight">
                {section.title}
              </h3>
              <div className={`w-24 h-[1px] bg-brand-gold mb-8 opacity-40 ${section.reverse ? 'md:ml-auto' : ''}`} />
              <p className="text-white/60 leading-relaxed italic font-serif text-xl md:text-2xl max-w-xl mx-auto md:mx-0">
                "{section.text}"
              </p>
              
              <div className="mt-12">
                <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold/40">
                  Immersion Exclusive
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple/10 to-transparent -translate-y-1/2 pointer-events-none" />
        </section>
      ))}
    </div>
  );
}
