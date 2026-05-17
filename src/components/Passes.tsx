import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Diamond, Crown, Check, Globe } from 'lucide-react';
import PaymentModal from './PaymentModal';

const tiers = [
  {
    name: "DISTANCE",
    price: "150€",
    icon: <Globe className="w-12 h-12" />,
    image: "/images/passe/distance.jpg",
    description: "Vivez l'intensité de mes soirées depuis le confort de votre sanctuaire privé.",
    features: [
      "Suivi à distance",
      "Flux vidéo privé",
      "Interactions limitées",
      "Immersion sonore"
    ],
    highlight: false,
    color: "text-sky-400",
    glow: "shadow-sky-500/20",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10"
  },
  {
    name: "PREMIUM",
    price: "300€",
    icon: <Star className="w-12 h-12" />,
    image: "/images/passe/premium.jpg",
    description: "Une immersion concrète et active dans mon univers de plaisirs.",
    features: [
      "Pass d'entrée",
      "Consommations (Sodas, Shots)",
      "Participation active",
      "Rapport sans tabou"
    ],
    highlight: false,
    color: "text-brand-purple",
    glow: "shadow-brand-purple/20",
    border: "border-brand-purple/30",
    bg: "bg-brand-purple/10"
  },
  {
    name: "VIP",
    price: "500€",
    icon: <Diamond className="w-12 h-12" />,
    image: "/images/passe/vip.jpg",
    description: "Pour ceux qui exigent l'excellence et la force des sensations.",
    features: [
      "Tous les privilèges PREMIUM",
      "Consos Fortes (Champagne, Whisky)",
      "Pratiques de domination",
      "Relation Dominant / Dominé"
    ],
    highlight: false,
    color: "text-brand-gold",
    glow: "shadow-brand-gold/20",
    border: "border-brand-gold/30",
    bg: "bg-brand-gold/10"
  },
  {
    name: "ELITE",
    price: "1000€",
    icon: <Crown className="w-12 h-12" />,
    image: "/images/passe/elite.jpg",
    description: "Le summum de l'exclusivité. Maîtrise totale de votre expérience.",
    features: [
      "Tous les privilèges VIP",
      "Espaces ultra-exclusifs",
      "3 hôtesses dédiées",
      "Bouteille Gaz Hilarant & Ballons"
    ],
    highlight: true,
    color: "text-rose-500",
    glow: "shadow-rose-500/40",
    border: "border-rose-500/50",
    bg: "bg-rose-500/20"
  }
];

export default function Passes() {
  const [selectedTier, setSelectedTier] = useState<{name: string, price: string} | null>(null);

  const handleSelect = (tier: {name: string, price: string}) => {
    setSelectedTier(tier);
  };

  const handlePaymentSuccess = () => {
    setSelectedTier(null);
    window.dispatchEvent(new CustomEvent('purchase-success'));
  };

  return (
    <section id="passes" className="relative z-10 py-24 px-6 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl mb-6 gold-gradient-text uppercase font-display"
          >
            Choisis ton niveau d'expérience
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="font-cursive text-brand-gold text-3xl"
          >
            Chaque pass ouvre une porte différente.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className={`relative group flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${tier.glow} min-h-[500px] overflow-hidden ${
                tier.highlight ? 'elite-card' : `glass-card ${tier.border}`
              }`}
            >
              {/* Background Image for Tier with Elegant Blend */}
              <div className="absolute inset-4 z-0 overflow-hidden rounded-xl opacity-10 group-hover:opacity-20 transition-all duration-[2000ms]">
                {/* Blurred backdrop to fill any shape gaps */}
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-2xl scale-150"
                  style={{ 
                    backgroundImage: `url("${tier.image}")`,
                  }}
                />
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-[2000ms] scale-110 group-hover:scale-100"
                  style={{ 
                    backgroundImage: `url("${tier.image}")`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
              </div>
              <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-brand-black/20 to-brand-black/90 pointer-events-none" />

              <div className={tier.highlight ? 'elite-card-content flex flex-col h-full p-6 relative z-10' : 'flex flex-col h-full p-6 relative z-10'}>
                <div className="flex flex-col items-center text-center mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border transition-colors duration-500 ${tier.bg} ${tier.border} ${tier.color}`}>
                    {tier.icon}
                  </div>
                  <h3 className={`text-xl font-display uppercase tracking-widest ${tier.color}`}>
                    {tier.name}
                  </h3>
                  <div className={`text-3xl font-bold mt-2 relative ${tier.color}`}>
                    {tier.price}
                    <div className={`absolute inset-0 ${tier.bg} blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>
                </div>

                <p className="text-white/60 text-[11px] mb-6 text-center leading-relaxed italic serif-font h-10">
                  "{tier.description}"
                </p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${tier.color}`} />
                      <span className="text-white/80 text-[10px] font-semibold uppercase tracking-widest leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleSelect({ name: tier.name, price: tier.price })}
                  className={`w-full py-4 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all relative overflow-hidden group/btn ${
                  tier.highlight 
                    ? 'gold-btn' 
                    : `bg-transparent border ${tier.border} ${tier.color} hover:text-brand-black`
                }`}>
                  <span className="relative z-10">Sélectionner</span>
                  <div className={`absolute inset-0 ${tier.color.replace('text-', 'bg-')} translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300`} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedTier && (
            <PaymentModal 
              tierName={selectedTier.name} 
              price={selectedTier.price} 
              onClose={() => setSelectedTier(null)}
              onSuccess={handlePaymentSuccess}
            />
          )}
        </AnimatePresence>

        {/* Option Couple */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 glass-card p-10 border-brand-gold/30 text-center max-w-3xl mx-auto border-t-2 relative overflow-hidden"
        >
          {/* Background Image for Couple Pass */}
          <div className="absolute inset-4 z-0 overflow-hidden rounded-xl opacity-10">
            {/* Blurred backdrop to fill any shape gaps */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-2xl scale-150"
              style={{ 
                backgroundImage: 'url("/images/passe/couple.jpg")',
              }}
            />
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale"
              style={{ 
                backgroundImage: 'url("/images/passe/couple.jpg")',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-black/40 via-transparent to-brand-black/90 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="w-16 h-[1px] bg-brand-gold/40" />
              <h3 className="text-2xl md:text-3xl font-display gold-gradient-text uppercase tracking-[0.2em]">Option Pass Couple</h3>
              <div className="w-16 h-[1px] bg-brand-gold/40" />
            </div>
            <p className="text-white/80 text-lg mb-8 font-serif italic max-w-xl mx-auto">
              "Vivez l'expérience à deux. Disponible pour tous les Pass, profitez d'une remise spéciale pour explorer vos limites en duo."
            </p>
            <div className="text-brand-gold font-bold text-sm tracking-[0.4em] mb-8">
              TARIF : SUR DEMANDE, SELON LE PASS CHOISI
            </div>
            <button className="gold-btn !px-12 !text-[12px]">
              Nous Contacter pour un Devis
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
