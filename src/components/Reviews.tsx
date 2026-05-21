import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Star, Send } from 'lucide-react';

interface StaticReview {
  id: number;
  user: string;
  content: string;
  date: string;
  rating: number;
  pass: string;
}

const STATIC_REVIEWS: StaticReview[] = [
  {
    id: 1,
    user: "Anonyme",
    content: "Je n'y ai pas cru malgré d'avoir pris le risque de participer sans en être sure jusqu'à ce que les hôtesses fassent leur entrée 😍 la soirée était parfaite ! C'est rare des soirées sérieuse dans le genre annoncé sur les sites comme cela. Une parfaite organisatrice j'avoue 🥰. J'ai pu réalisé mes multiples fantasmes. La discrétion et la sécurité était au rendez-vous.",
    date: "Il y a 2 semaines",
    rating: 5,
    pass: "Pass ELITE"
  },
  {
    id: 2,
    user: "Norman",
    content: "Participer à un tel événement reste certainement inoubliable pour moi 😘 Encore que j'ai fais tout le trajet depuis la Normandie juste pour la participation et je ne le regrette pas du tout ☺️💕.",
    date: "Il y a 2 semaines",
    rating: 5,
    pass: "Pass PREMIUM"
  },
  {
    id: 3,
    user: "jonh",
    content: "L’ambiance était incroyable et les échanges très respectueux. Les organisateurs ont pensé à chaque détail.",
    date: "Il y a 1 mois",
    rating: 4,
    pass: "Pass VIP"
  },
  {
    id: 4,
    user: "louis",
    content: "Assister à une de vos soirées organisées à la perfection reste le premier élément très excitant en cet début d’année pour moi 😍",
    date: "Il y a 4 mois",
    rating: 5,
    pass: "Pass ELITE"
  },
  {
    id: 5,
    user: "Lucas d'Antibes",
    content: "Un cadre somptueux et mystérieux qui met tout de suite à l'aise. Les hôtesses sont d'une élégance hors du commun.",
    date: "Il y a 2 mois",
    rating: 5,
    pass: "Pass VIP"
  },
  {
    id: 6,
    user: "Mélanie & JP",
    content: "Une expérience à couper le souffle, libérée des conventions et magnifiquement orchestrée. L'accueil par Maîtresse Nina et son équipe est divin.",
    date: "Il y a 3 mois",
    rating: 5,
    pass: "Accès Couple"
  }
];

export default function Reviews() {

  const [reviews, setReviews] = useState<StaticReview[]>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [passType, setPassType] = useState('Pass VIP');

  // Charger les avis sauvegardés
  useEffect(() => {
    const savedReviews = localStorage.getItem('custom_reviews');

    if (savedReviews) {
      setReviews([
        ...JSON.parse(savedReviews),
        ...STATIC_REVIEWS
      ]);
    } else {
      setReviews(STATIC_REVIEWS);
    }
  }, []);

  // Sauvegarder les nouveaux avis
  useEffect(() => {
    const customOnly = reviews.filter(
      (review) =>
        !STATIC_REVIEWS.some(
          (staticReview) => staticReview.id === review.id
        )
    );

    localStorage.setItem(
      'custom_reviews',
      JSON.stringify(customOnly)
    );
  }, [reviews]);

  // Ajouter un nouvel avis
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !content) return;

    const newReview: StaticReview = {
      id: Date.now(),
      user: name,
      content,
      rating,
      pass: passType,
      date: "À l’instant"
    };

    setReviews([newReview, ...reviews]);

    setName('');
    setContent('');
    setRating(5);
    setPassType('Pass VIP');
  };

  return (
    <section className="py-24 px-6 bg-transparent relative">
      <div className="max-w-7xl mx-auto">

        {/* TITRE */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl gold-gradient-text uppercase font-display mb-4">
              Avis des Participants
            </h2>

            <p className="font-cursive text-brand-purple-glow text-3xl">
              Ceux qui ont osé franchir le seuil.
            </p>
          </motion.div>
        </div>

        {/* FORMULAIRE */}
        <form
          onSubmit={handleSubmit}
          className="glass-card p-8 mb-20 border-brand-gold/20 bg-brand-black/40 backdrop-blur-xl"
        >

          <h3 className="text-2xl gold-gradient-text uppercase font-display mb-8 text-center">
            Laisser un Avis
          </h3>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Votre nom ou pseudonyme"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-brand-gold/50 transition-all"
            />

            <textarea
              placeholder="Votre expérience..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-brand-gold/50 transition-all resize-none"
            />

            <select
              value={passType}
              onChange={(e) => setPassType(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-brand-gold/50 transition-all"
            >
              <option className="bg-black">Pass VIP</option>
              <option className="bg-black">Pass PREMIUM</option>
              <option className="bg-black">Pass ELITE</option>
              <option className="bg-black">Accès Couple</option>
            </select>

            {/* ÉTOILES */}
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-6 h-6 transition-all ${
                      star <= rating
                        ? 'fill-current text-brand-gold'
                        : 'text-white/20'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* BOUTON */}
            <button
              type="submit"
              className="gold-btn w-full flex items-center justify-center gap-3"
            >
              <Send size={16} />
              Publier l'avis
            </button>

          </div>
        </form>

        {/* LISTE DES AVIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.6
              }}
              className="glass-card p-8 flex flex-col justify-between border-brand-purple/10 hover:border-brand-gold/30 transition-all duration-500 group"
            >
              <div>

                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-1 text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating
                            ? 'fill-current'
                            : 'opacity-20'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[9px] uppercase tracking-[0.15em] text-brand-gold font-bold bg-brand-gold/10 px-2.5 py-1 rounded">
                    {review.pass}
                  </span>
                </div>

                <div className="mb-6 relative">
                  <MessageSquare className="absolute -top-4 -left-4 w-8 h-8 text-brand-purple/10 group-hover:text-brand-purple/20 transition-colors" />

                  <p className="text-white/80 leading-relaxed italic text-sm font-serif select-none">
                    "{review.content}"
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-white/5 pt-4">
                <span className="text-brand-gold-light font-display text-sm uppercase tracking-wider">
                  {review.user}
                </span>

                <span className="text-white/30 text-[10px] uppercase tracking-widest">
                  {review.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
