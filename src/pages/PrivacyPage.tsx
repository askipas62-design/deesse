import InfoPage from '../components/InfoPage';

export default function PrivacyPage() {
  return (
    <InfoPage title="Confidentialité" subtitle="Votre secret est ma loi la plus sacrée.">
      <section className="space-y-8 text-white/70 leading-relaxed text-sm uppercase tracking-widest font-semibold italic">
        <div>
          <h2 className="text-brand-gold text-lg mb-4 tracking-[0.3em]">1. ENGAGEMENT DE DISCRÉTION</h2>
          <p>
            L'univers de la Déesse Angèle repose sur une confiance absolue. Aucune donnée personnelle n'est stockée de manière permanente sur nos serveurs. Les informations transmises lors de la réservation d'un pass sont cryptées et supprimées immédiatement après la tenue de l'événement.
          </p>
        </div>
        
        <div>
          <h2 className="text-brand-gold text-lg mb-4 tracking-[0.3em]">2. PROTECTION DES ÉCHANGES</h2>
          <p>
            Tous les échanges via Telegram sont protégés par un chiffrement de bout en bout. La Déesse s'engage à ne jamais capturer, enregistrer ou partager les conversations privées avec ses fidèles.
          </p>
        </div>

        <div>
          <h2 className="text-brand-gold text-lg mb-4 tracking-[0.3em]">3. ANONYMAT DES PARTICIPANTS</h2>
          <p>
            Lors de nos soirées privées, l'usage de pseudonymes est encouragé. L'identité réelle des invités n'est jamais divulguée aux autres participants. Le respect de la vie privée d'autrui est une condition non négociable de votre présence. Des masques de déguisement seront distribués pour garantir un climat de total anonymat.
          </p>
        </div>

        <div>
          <h2 className="text-brand-gold text-lg mb-4 tracking-[0.3em]">4. COOKIES ET TRAÇAGE</h2>
          <p>
            Ce site n'utilise aucun cookie publicitaire ou de traçage tiers. Nous ne suivons pas votre activité en dehors de ce domaine. Votre navigation ici reste un moment d'intimité entre vous et le sanctuaire.
          </p>
        </div>

        <div className="pt-8 border-t border-brand-gold/10 text-center">
          <p className="text-brand-gold/60 text-[10px]">
            Pour toute question concernant la sécurité de vos données, contactez la Déesse via le canal Telegram officiel.
          </p>
        </div>
      </section>
    </InfoPage>
  );
}
