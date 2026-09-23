'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Phone, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';
import { AGENCY_INFO } from '@/lib/seed-data';

export default function MapSection() {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Boulevard Pasteur, Tlemcen, Algeria'
  )}`;

  return (
    <section id="agence" className="py-24 bg-midnight-950 border-t border-white/5 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[400px] bg-brand-orange/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2"
          >
            <span className="text-brand-orange font-mono text-xs font-bold tracking-wider">
              ( 04 )
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
              LOCALISATION & RETRAIT DES CLÉS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white"
          >
            NOTRE AGENCE À <span className="text-brand-orange">TLEMCEN</span>.
          </motion.h2>

          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Pas d&apos;intermédiaire ni de point de rendez-vous incertain : vous récupérez votre véhicule directement dans nos locaux sécurisés au centre-ville.
          </p>
        </div>

        {/* Map & Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Agency Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-2xl glass-panel p-8 border border-white/10 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>Agence Principale</span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">Salah Tour Tlemcen</h3>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                  {AGENCY_INFO.address}
                </p>
                <div className="text-xs font-mono text-brand-amber mt-2">
                  Coordonnées GPS : {AGENCY_INFO.coordinates}
                </div>
              </div>

              {/* Hours & Readiness */}
              <div className="space-y-3 pt-4 border-t border-white/5 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-white">Horaires d&apos;accueil</div>
                    <div className="text-slate-400">{AGENCY_INFO.openingHours}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-white">Prise en charge express</div>
                    <div className="text-slate-400">Véhicule lavé, révisé et réservoir prêt à l&apos;agence.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-bold text-xs uppercase tracking-wider shadow-glow-orange hover:shadow-glow-orange-lg transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Ouvrir l&apos;itinéraire Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${AGENCY_INFO.phone.replace(/[^0-9]/g, '')}`}
                  className="h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{AGENCY_INFO.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${AGENCY_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Embedded Interactive Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-2xl overflow-hidden glass-panel border border-white/10 relative min-h-[420px] shadow-2xl"
          >
            {/* Interactive Google Map iframe of Tlemcen */}
            <iframe
              title="Localisation Agence Salah Tour Tlemcen"
              src="https://maps.google.com/maps?q=34.8828,-1.3167&hl=fr&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '440px', filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full block"
            />

            {/* Overlay badge on the map */}
            <div className="absolute top-4 left-4 pointer-events-none">
              <div className="px-3 py-1.5 rounded-lg bg-midnight-950/90 border border-brand-orange/40 text-white text-xs font-mono font-bold flex items-center gap-2 shadow-lg backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
                <span>Salah Tour Agence • Tlemcen Centre</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
