'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, MapPin, Car, Mountain, Waves, Landmark, Trees } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  category: string;
  distance: string;
  description: string;
  recommendedCar: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DESTINATIONS: Destination[] = [
  {
    id: 'lalla-setti',
    name: 'Plateau de Lalla Setti',
    category: 'Hauteurs & Vue Panoramique',
    distance: '10 min du centre-ville',
    description: 'Surplombant la ville à 1000m d\'altitude, idéal pour une balade au grand air, un coucher de soleil magique et l\'accès au téléphérique.',
    recommendedCar: 'Dacia Sandero Stepway ou Hyundai Tucson',
    icon: Mountain,
  },
  {
    id: 'el-ourit',
    name: 'Cascades d\'El Ourit',
    category: 'Nature & Fraîcheur',
    distance: '15 min de l\'agence',
    description: 'Magnifiques cascades étagées entourées de falaises verdoyantes, avec le célèbre viaduc ferroviaire conçu par Gustave Eiffel.',
    recommendedCar: 'Renault Clio 5 ou Peugeot 208',
    icon: Trees,
  },
  {
    id: 'mansourah',
    name: 'Ruines de Mansourah',
    category: 'Histoire & Patrimoine',
    distance: '5 min de l\'agence',
    description: 'Imposant minaret mérinide du XIVe siècle et remparts historiques chargés d\'histoire au cœur de la cité antique de Tlemcen.',
    recommendedCar: 'Hyundai Accent RB ou Golf 8',
    icon: Landmark,
  },
  {
    id: 'honaine',
    name: 'Plages de Ghazaouet & Honaine',
    category: 'Côte & Plages Méditerranéennes',
    distance: '50 min de route côtière',
    description: 'Eaux cristallines, criques sauvages et port de pêche traditionnel. La route sinueuse offre des panoramas à couper le souffle.',
    recommendedCar: 'Hyundai Tucson ou Sandero Stepway',
    icon: Waves,
  },
];

export default function TlemcenGuideSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header (Spécial Voyageurs & Diaspora) */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xl mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-brand-orange font-mono text-xs font-bold tracking-wider">
                ( CARNET DE ROUTE )
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 font-semibold">
                SPÉCIAL RÉSIDENTS HORS TLEMCEN &amp; DIASPORA
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
              VOUS VENEZ D&apos;AILLEURS ? <span className="text-brand-orange">DÉCOUVREZ TLEMCEN</span>.
            </h2>

            <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
              Vous arrivez d&apos;une autre wilaya ou de l&apos;étranger ? Voici 4 escapades incontournables à faire en voiture à Tlemcen, avec nos conseils de véhicules pour chaque trajet.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200 self-start md:self-end">
            <Compass className="w-4 h-4 text-brand-orange" />
            <span>Guide &amp; Conseils Agence Tour</span>
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS.map((dest, idx) => {
            const Icon = dest.icon;
            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -5 }}
                className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Category and Distance */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-orange-50 text-brand-orange border border-orange-200">
                      <Icon className="w-3 h-3" />
                      <span>{dest.category}</span>
                    </span>

                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{dest.distance}</span>
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-black text-slate-900 mb-2">
                    {dest.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                {/* Car Recommendation */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                    <Car className="w-3 h-3 text-brand-orange" />
                    <span>Modèle conseillé :</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 bg-slate-50 p-2 rounded-lg border border-slate-200">
                    {dest.recommendedCar}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
