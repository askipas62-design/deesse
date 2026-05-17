import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Star, Send, Loader2, User, Type } from 'lucide-react';
import axios from 'axios';

interface Review {
  id: number;
  user: string;
  content: string;
  date: string;
  rating: number;
  pass: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [newName, setNewName] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newPass, setNewPass] = useState('Visiteur');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/reviews');
      setReviews(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error('Fetch reviews error:', err);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newContent) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post('/api/reviews', {
        user: newName,
        content: newContent,
        rating: newRating,
        pass: newPass
      });

      setReviews([response.data, ...reviews]);
      setIsSubmitting(false);
      setShowForm(false);
      setNewName('');
      setNewContent('');
      setNewRating(5);
    } catch (err: any) {
      console.error('Submit review error:', err);
      setError(err.response?.data?.error || "Une erreur est survenue lors de l'envoi.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-transparent relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl gold-gradient-text uppercase font-display mb-4">Avis des Participants</h2>
            <p className="font-cursive text-brand-purple-glow text-3xl">Ceux qui ont osé franchir le seuil.</p>
          </motion.div>
          
          <motion.button
            onClick={() => setShowForm(!showForm)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 gold-btn !px-8 !py-3 !text-[10px] tracking-[0.3em]"
          >
            {showForm ? 'ANNULER' : 'LAISSER UN AVIS'}
          </motion.button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-xl mx-auto mb-20 overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="glass-card p-8 border-brand-gold/30 bg-brand-black/90 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-gold flex items-center gap-2">
                      <User size={12} /> Nom ou Pseudonyme
                    </label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full bg-brand-purple/5 border border-brand-purple/20 rounded-full py-3 px-6 text-white focus:border-brand-gold/50 outline-none transition-all text-sm"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-gold flex items-center gap-2">
                      <Star size={12} /> Note (1-5)
                    </label>
                    <div className="flex gap-2 justify-center py-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            size={24}
                            className={`${star <= newRating ? 'text-brand-gold fill-current' : 'text-white/20'} transition-all hover:scale-110`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-gold flex items-center gap-2">
                    <Type size={12} /> Type de Pass possédé
                  </label>
                  <select
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full bg-brand-purple/5 border border-brand-purple/20 rounded-full py-3 px-6 text-white focus:border-brand-gold/50 outline-none transition-all text-sm appearance-none cursor-pointer"
                  >
                    <option value="Visiteur" className="bg-brand-black">Visiteur</option>
                    <option value="Pass DISTANCE" className="bg-brand-black">Pass DISTANCE</option>
                    <option value="Pass PREMIUM" className="bg-brand-black">Pass PREMIUM</option>
                    <option value="Pass VIP" className="bg-brand-black">Pass VIP</option>
                    <option value="Pass ELITE" className="bg-brand-black">Pass ELITE</option>
                    <option value="Accès Couple" className="bg-brand-black">Accès Couple</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-gold flex items-center gap-2">
                    <MessageSquare size={12} /> Votre témoignage
                  </label>
                  <textarea
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    rows={4}
                    className="w-full bg-brand-purple/5 border border-brand-purple/20 rounded-2xl py-4 px-6 text-white focus:border-brand-gold/50 outline-none transition-all text-sm italic font-serif resize-none"
                    placeholder="Partagez votre expérience dans le sanctuaire..."
                  />
                </div>

                {error && (
                  <p className="text-[10px] text-red-500 uppercase tracking-widest text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-3 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all ${
                    isSubmitting ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/10' : 'gold-btn'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Gravure en cours...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Sceller mon avis dans le marbre
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
            <p className="text-brand-gold/40 text-[10px] uppercase tracking-widest">Consultation des archives...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  layout
                  className="glass-card p-8 flex flex-col justify-between border-brand-purple/10 hover:border-brand-gold/30 transition-all duration-500 group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex gap-1 text-brand-gold">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'opacity-20'}`} />
                        ))}
                      </div>
                      <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold bg-brand-gold/10 px-2 py-1 rounded">
                        {review.pass}
                      </span>
                    </div>
                    <div className="mb-6 relative">
                      <MessageSquare className="absolute -top-4 -left-4 w-8 h-8 text-brand-purple/10 group-hover:text-brand-purple/20 transition-colors" />
                      <p className="text-white/80 leading-relaxed italic text-sm font-serif">
                        "{review.content}"
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-t border-white/5 pt-4">
                    <span className="text-brand-gold-light font-display text-sm uppercase tracking-wider">{review.user}</span>
                    <span className="text-white/30 text-[10px] uppercase tracking-widest">{review.date}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
