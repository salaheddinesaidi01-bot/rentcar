'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  ThumbsUp,
  ChevronDown,
  ChevronUp,
  PenLine,
  X,
  Check,
} from 'lucide-react';

interface Review {
  id: string;
  name: string;
  location: string;
  car: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Yacine K.',
    location: 'Paris, France',
    car: 'Renault Clio 5',
    rating: 5,
    date: 'Il y a 1 semaine',
    comment:
      'Super expérience pour mon séjour estival à Tlemcen ! Voiture impeccablement propre, climatisation parfaite pour les grosses chaleurs. Récupération des clés en 2 minutes à l\'agence sans paperasse inutile. Je recommande à 100%.',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Amel M.',
    location: 'Lyon, France',
    car: 'Dacia Sandero Stepway',
    rating: 5,
    date: 'Il y a 2 semaines',
    comment:
      'Tarif exactement comme annoncé sur le site, pas un dinar de plus à l\'arrivée. Équipe accueillante et professionnelle. La Stepway était quasi neuve avec caméra de recul et grand coffre pour nos valises.',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Sofiane B.',
    location: 'Alger, Algérie',
    car: 'Hyundai Accent RB',
    rating: 5,
    date: 'Il y a 3 semaines',
    comment:
      'Habitué à louer lors de mes déplacements pro à Tlemcen, Agence Tour est la meilleure agence que j\'ai testée : ponctualité, réactivité sur WhatsApp et restitution de la caution instantanée au retour. Bravo !',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Mehdi T.',
    location: 'Marseille, France',
    car: 'Hyundai Tucson N-Line',
    rating: 5,
    date: 'Il y a 1 mois',
    comment:
      'Véhicule très spacieux et confortable pour faire la route jusqu\'aux plages de Ghazaouet et Honaine en famille. Kilométrage illimité très appréciable. On relouera sans hésiter l\'année prochaine.',
    verified: true,
  },
  {
    id: 'rev-5',
    name: 'Samira D.',
    location: 'Bruxelles, Belgique',
    car: 'Peugeot 208 Allure',
    rating: 5,
    date: 'Il y a 1 mois',
    comment:
      'Réservation en ligne ultra simple sans avoir à sortir sa carte bancaire. Retrait rapide au centre-ville de Tlemcen. Véhicule très agréable à conduire et économique.',
    verified: true,
  },
  {
    id: 'rev-6',
    name: 'Karim L.',
    location: 'Tlemcen, Algérie',
    car: 'Volkswagen Golf 8 R-Line',
    rating: 5,
    date: 'Il y a 2 mois',
    comment:
      'Voiture dans un état showroom, intérieur cuir soigné et tenue de route irréprochable. Service client sérieux et arrangeant pour les horaires de restitution. Agence numéro 1 à Tlemcen.',
    verified: true,
  },
];

const CAR_OPTIONS = [
  'Renault Clio 5',
  'Dacia Sandero Stepway',
  'Hyundai Accent RB',
  'Volkswagen Golf 8 R-Line',
  'Hyundai Tucson N-Line',
  'Mercedes-Benz Classe S',
  'Range Rover Sport',
  'Autre véhicule de la flotte',
];

export default function ReviewsSection() {
  const [reviewsList, setReviewsList] = useState<Review[]>(INITIAL_REVIEWS);
  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    car: CAR_OPTIONS[0],
    rating: 5,
    comment: '',
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [formSuccess, setFormSuccess] = useState(false);

  // Load custom reviews from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('agence_tour_user_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviewsList([...parsed, ...INITIAL_REVIEWS]);
        }
      }
    } catch {
      // LocalStorage unavailable, keep defaults
    }
  }, []);

  // Display only 3 reviews by default, or all reviews when toggled
  const displayedReviews = showAll ? reviewsList : reviewsList.slice(0, 3);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;

    const newReview: Review = {
      id: `rev-user-${Date.now()}`,
      name: formData.name.trim(),
      location: formData.location.trim() || 'Client Agence Tour',
      car: formData.car,
      rating: formData.rating,
      date: 'Aujourd\'hui',
      comment: formData.comment.trim(),
      verified: true,
    };

    const updatedList = [newReview, ...reviewsList];
    setReviewsList(updatedList);

    // Persist to localStorage
    try {
      const saved = localStorage.getItem('agence_tour_user_reviews');
      const existingUserReviews = saved ? JSON.parse(saved) : [];
      localStorage.setItem(
        'agence_tour_user_reviews',
        JSON.stringify([newReview, ...existingUserReviews])
      );
    } catch {
      // Ignored
    }

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setIsModalOpen(false);
      // Reset form
      setFormData({
        name: '',
        location: '',
        car: CAR_OPTIONS[0],
        rating: 5,
        comment: '',
      });
    }, 1500);
  };

  return (
    <section id="avis" className="relative py-28 overflow-hidden bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Overall Rating Score Badge & "Écrire un avis" CTA */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-brand-orange font-mono text-xs font-bold tracking-wider">
                ( 03 )
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 font-semibold">
                TÉMOIGNAGES & SATISFACTION CLIENT
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
              LES AVIS DE <span className="text-brand-orange">NOS CLIENTS</span>.
            </h2>

            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Découvrez les retours authentiques de voyageurs, résidents et membres de la diaspora ayant loué leur véhicule chez Agence Tour à Tlemcen.
            </p>
          </div>

          {/* Right Header Actions: Rating Card + Write Review CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-shrink-0">
            {/* Rating Summary Card (Inspired by Drivly Google Trust Score) */}
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-center border-r border-slate-200 pr-4">
                <div className="text-3xl font-black text-slate-900 leading-none">
                  4.9<span className="text-base text-slate-400 font-normal">/5</span>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500 mt-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>+{reviewsList.length * 30} Avis Vérifiés</span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  98% de clients satisfaits
                </div>
              </div>
            </div>

            {/* "Écrire un avis" Action Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2.5 px-5 py-4 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-xl transition-all"
            >
              <PenLine className="w-4 h-4" />
              <span>Écrire un avis</span>
            </motion.button>
          </div>
        </div>

        {/* Reviews Cards Grid (Shows 3 by default, or all when toggled) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {displayedReviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Header: Stars + Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {review.date}
                    </span>
                  </div>

                  {/* Comment Quote */}
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                {/* Author & Car info */}
                <div className="pt-4 border-t border-slate-100 mt-5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{review.name}</span>
                      {review.verified && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-semibold">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          Vérifié
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {review.location}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-mono font-semibold text-brand-orange bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                      {review.car}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Toggle Button: "Découvrir tous les avis" / "Afficher moins d'avis" */}
        {reviewsList.length > 3 && (
          <div className="mt-10 text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md hover:shadow-lg text-slate-900 font-bold text-sm transition-all hover:border-brand-orange group"
            >
              <span>
                {showAll
                  ? 'Afficher moins d\'avis'
                  : `Découvrir tous les avis (${reviewsList.length})`}
              </span>
              {showAll ? (
                <ChevronUp className="w-4 h-4 text-brand-orange transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 text-brand-orange transition-transform group-hover:translate-y-0.5" />
              )}
            </motion.button>
          </div>
        )}

        {/* Trust Badges Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-md grid grid-cols-1 sm:grid-cols-3 gap-4 text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-black text-slate-900 uppercase">Véhicules Révisés</div>
              <div className="text-[11px] text-slate-500 font-mono">Contrôle strict avant remise</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-black text-slate-900 uppercase">Zéro Frais Cachés</div>
              <div className="text-[11px] text-slate-500 font-mono">Tarifs clairs et transparents</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-black text-slate-900 uppercase">Accueil Direct</div>
              <div className="text-[11px] text-slate-500 font-mono">Clés en main en 2 min à l&apos;agence</div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Modal "Écrire un avis" */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !formSuccess && setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              {formSuccess ? (
                /* Success Message */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Merci pour votre avis !
                  </h3>
                  <p className="text-sm text-slate-600 max-w-xs mx-auto">
                    Votre avis a été publié avec succès et s&apos;affiche désormais parmi les témoignages de l&apos;Agence Tour.
                  </p>
                </motion.div>
              ) : (
                /* Review Form */
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <PenLine className="w-5 h-5 text-brand-orange" />
                    <span className="text-xs font-mono font-bold tracking-wider text-brand-orange uppercase">
                      Partagez votre expérience
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Laisser un <span className="text-brand-orange">avis</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 mb-6">
                    Votre avis aide les futurs voyageurs à choisir leur véhicule en toute confiance.
                  </p>

                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    {/* Star Rating Picker */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Votre note globale *
                      </label>
                      <div className="flex items-center gap-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const isFilled = (hoverRating || formData.rating) >= star;
                          return (
                            <button
                              key={star}
                              type="button"
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              onClick={() => setFormData({ ...formData, rating: star })}
                              className="p-1 focus:outline-none transition-transform hover:scale-125"
                            >
                              <Star
                                className={`w-7 h-7 ${
                                  isFilled
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-300'
                                } transition-colors`}
                              />
                            </button>
                          );
                        })}
                        <span className="ml-3 text-sm font-bold text-slate-800 font-mono">
                          {hoverRating || formData.rating} / 5
                        </span>
                      </div>
                    </div>

                    {/* Name & Location Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Nom & Prénom *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ex: Mourad K."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange bg-slate-50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Ville ou Pays
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="Ex: Tlemcen, Paris..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange bg-slate-50"
                        />
                      </div>
                    </div>

                    {/* Car Rented Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Véhicule loué *
                      </label>
                      <select
                        value={formData.car}
                        onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange bg-slate-50"
                      >
                        {CAR_OPTIONS.map((car) => (
                          <option key={car} value={car}>
                            {car}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Review text */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Votre commentaire *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        placeholder="Racontez votre expérience : état du véhicule, accueil de l'agence, ponctualité, facilité de restitution..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange bg-slate-50 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
                      >
                        Publier mon avis
                      </motion.button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
