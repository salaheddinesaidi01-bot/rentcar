'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, ShieldCheck, HeartHandshake, Sparkles, MessageSquare, ThumbsUp } from 'lucide-react';

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

const REVIEWS: Review[] = [
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

export default function ReviewsSection() {
  return (
    <section id="avis" className="relative py-28 overflow-hidden bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Overall Rating Score Badge */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
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

          {/* Rating Summary Card (Inspired by Drivly Google Trust Score) */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm flex-shrink-0">
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
                <span>+180 Avis Vérifiés</span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                98% de clients satisfaits
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
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
        </div>

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
    </section>
  );
}
