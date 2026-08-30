import InfoPage from '../components/InfoPage';

export default function LegalPage() {
  return (
    <InfoPage title="Mentions Légales" subtitle="Transparence et respect des règles.">
      <section className="space-y-8 text-white/70 leading-relaxed text-sm uppercase tracking-widest font-semibold italic">
        <div>
          <h2 className="text-brand-gold text-lg mb-4 tracking-[0.3em]">ÉDITEUR DU SITE</h2>
          <p>
            Le site Déesse Angèle est une vitrine artistique et événementielle privée. 
            <br />Directrice de publication : Déesse Angèle.
            <br />Contact : Telegram @angele_event
          </p>
        </div>
        
        <div>
          <h2 className="text-brand-gold text-lg mb-4 tracking-[0.3em]">HÉBERGEMENT</h2>
          <p>
            Le site est hébergé sur des serveurs sécurisés garantissant une haute disponibilité et une protection optimale des données de navigation.
          </p>
        </div>

        <div>
          <h2 className="text-brand-gold text-lg mb-4 tracking-[0.3em]">PROPRIÉTÉ INTELLECTUELLE</h2>
          <p>
            L'ensemble des contenus (textes, images, univers visuel) présents sur ce site sont la propriété exclusive de la Déesse Angèle. Toute reproduction, même partielle, sans autorisation expresse est strictement interdite et fera l'objet de poursuites.
          </p>
        </div>

        <div>
          <h2 className="text-brand-gold text-lg mb-4 tracking-[0.3em]">AVERTISSEMENT</h2>
          <p>
            Ce site s'adresse exclusivement à un public adulte et averti. Les événements décrits sont privés et soumis à une sélection rigoureuse. La Déesse se réserve le droit d'accès et de refus à toute personne ne respectant pas les codes de conduite établis.
          </p>
        </div>
      </section>
    </InfoPage>
  );
}
