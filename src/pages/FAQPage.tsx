import InfoPage from '../components/InfoPage';

export default function FAQPage() {
  const sections = [
    {
      q: "Comment puis-je réserver mon pass ?",
      a: "La réservation se fait exclusivement via ce site. Choisissez votre tier, procédez au paiement via les méthodes sécurisées indiquées (Wero ou Crypto), et téléversez votre preuve. Après vérification manuelle, vous recevrez vos accès."
    },
    {
      q: "Où se déroulent les événements ?",
      a: "Le lieu exact est tenu secret jusqu'au dernier moment pour garantir une discrétion totale. Seuls les détenteurs d'un pass valide reçoivent l'adresse précise."
    },
    {
      q: "Puis-je venir avec un(e) ami(e) ?",
      a: "Les pass sont individuels, sauf mention contraire pour les options spécifiques 'Couple'. Chaque participant doit être validé par la Déesse."
    },
    {
      q: "Quel est le dress code ?",
      a: "Élégance et sophistication. Smoking, costume sombre ou tenue fétiche de luxe pour les messieurs. Lingerie fine, robes de créateurs ou latex haute couture pour les dames. Les détails vous seront fournis par mail."
    },
    {
      q: "Puis-je annuler ma réservation ?",
      a: "Compte tenu de l'exclusivité et de l'organisation millimétrée, aucune réservation n'est remboursable. Un report peut être envisagé sous certaines conditions exceptionnelles, à la discrétion de la Déesse."
    }
  ];

  return (
    <InfoPage title="F.A.Q" subtitle="Toutes les réponses à vos désirs.">
      <div className="space-y-12">
        {sections.map((item, i) => (
          <div key={i} className="group">
            <h3 className="text-brand-gold text-lg mb-4 tracking-[0.2em] uppercase font-bold flex items-start gap-4">
              <span className="opacity-20">Q.</span>
              {item.q}
            </h3>
            <p className="text-white/60 leading-relaxed italic font-serif text-lg pl-12 border-l border-brand-gold/10 group-hover:border-brand-gold/40 transition-colors">
              "{item.a}"
            </p>
          </div>
        ))}
      </div>
      <div className="mt-20 pt-10 border-t border-brand-gold/10 text-center">
        <h3 className="text-xl gold-gradient-text uppercase font-display mb-6 tracking-widest">Une question particulière ?</h3>
        <p className="text-white/60 mb-8 font-serif italic italic text-sm">
          "Si votre désir de savoir n'est pas encore comblé, contactez-moi directement."
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <a href="https://t.me/deesse_Angele" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-brand-gold hover:text-white transition-colors group">
            <span className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-black transition-all">
              <span className="text-[10px] font-bold">TG</span>
            </span>
            <span className="text-xs uppercase tracking-widest font-bold">@deesse_Angele</span>
          </a>
          <a href="https://wa.me/33757841710" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-brand-gold hover:text-white transition-colors group">
            <span className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-black transition-all">
              <span className="text-[10px] font-bold">WA</span>
            </span>
            <span className="text-xs uppercase tracking-widest font-bold">07 57 84 17 10</span>
          </a>
        </div>
      </div>
    </InfoPage>
  );
}
