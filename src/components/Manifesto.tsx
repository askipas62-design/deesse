import { motion } from 'motion/react';
import { ShieldCheck, UserCheck, CreditCard, Mail, XSquare, Phone, MessageCircle } from 'lucide-react';

export default function Manifesto() {
  const sections = [
    {
      title: "L'Essence de l'Exception",
      content: "Organisation de fêtes privées haut de gamme, pensées et encadrées dans un environnement sécurisé, discret et structuré. Chaque événement est préparé avec le plus grand sérieux : sélection rigoureuse des participants, respect strict des règles et organisation sans faille.",
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: "Une Experience Unique",
      content: "Uniquement des rencontres entre adultes : 7 participants hommes maximum et 15 hôtesses (Françaises et internationales) de 25 à 40 ans. Professionnelles, sans tabous, pour 6 heures d'immersion totale.",
      icon: <UserCheck className="w-6 h-6" />
    },
    {
      title: "Conditions d'Accès",
      content: "Éligibilité stricte. Participation payante avec règlement préalable obligatoire. Solutions sécurisées et anonymes disponibles. Aucun Pass sans validation de paiement.",
      icon: <CreditCard className="w-6 h-6" />
    },
    {
      title: "Accès & Protection",
      content: "Accès électroniques par e-mail. Port du masque obligatoire pour la discrétion (distribué à l'arrivée). Sécurité permanente et contrôle du consentement. Parking assez grand à disposition des participants",
      icon: <Mail className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold mb-4"
          >
            Le Manifeste de la Déesse
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl gold-gradient-text uppercase font-display mb-8"
          >
            Déesse Angèle
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            className="h-[1px] bg-brand-gold mx-auto mb-12"
          />
        </div>

        <div className="glass-card p-10 md:p-16 border-brand-gold/10 relative">
          <p className="text-white/80 text-lg md:text-xl leading-relaxed font-light italic mb-12 serif-font">
            "Chers Participants, je ne fais pas de rencontre en tête à tête. Mes événements sont uniques et nuls égalés. Des plaisirs hors du commun, bien au-delà des soirées libertines classiques. Ici, l’hygiène la sécurité, la discrétion et le confort sont mes priorités absolues."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {sections.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-4 text-brand-gold">
                  {s.icon}
                  <h3 className="uppercase tracking-widest font-display text-sm">{s.title}</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed font-serif">
                  {s.content}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 p-8 border border-brand-gold/20 bg-brand-gold/5 rounded-xl text-center"
          >
            <h4 className="text-brand-gold font-display uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
              <XSquare className="w-5 h-5" />
              Règles Strictes
            </h4>
            <p className="text-white/70 text-sm leading-relaxed max-w-2xl mx-auto italic">
              "Tous les rapports sont protégés, sans aucune exception. Mes événements ne sont pas des centres de distribution d'IST. La sécurité et le respect sont mes lois."
            </p>
          </motion.div>

          <div className="mt-16 pt-12 border-t border-brand-gold/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h4 className="text-brand-gold font-display uppercase tracking-widest mb-4">Accès à distance</h4>
              <p className="text-white/50 text-xs leading-relaxed">
                Possibilité d’assister à l’événement en direct par webcam. Service sécurisé empêchant tout enregistrement. Réservé aux membres validés.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex gap-4">
                <a href="https://t.me/deesse_Angele" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center hover:bg-brand-gold/20 transition-all text-brand-gold" title="Telegram">
                  <MessageCircle className="w-6 h-6" />
                </a>
                <a href="https://wa.me/33757841710" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center hover:bg-brand-gold/20 transition-all text-brand-gold" title="WhatsApp">
                  <Phone className="w-6 h-6" />
                </a>
              </div>
              <div className="text-right flex flex-col gap-2">
                <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Telegram : @angele_event</p>
                <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">WhatsApp :6 51 08 85 42/ 7 80 98 79 04</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
