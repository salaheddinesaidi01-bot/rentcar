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
    <section id="agence" className="py-24 bg-transparent relative overflow-hidden z-10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header in Frosted Glass Container */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xl text-center max-w-3xl mx-auto mb-14 space-y-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2"
          >
            <span className="text-brand-orange font-mono text-xs font-bold tracking-wider">
              ( 03 )
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 font-semibold">
              LOCALISATION & RETRAIT DES CLÉS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-slate-900"
          >
            NOTRE AGENCE À <span className="text-brand-orange">TLEMCEN</span>.
          </motion.h2>

          <p className="text-sm text-slate-600 max-w-xl mx-auto">
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
            className="lg:col-span-5 rounded-2xl bg-white p-8 border border-slate-200 shadow-lg flex flex-col justify-between space-y-6"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>Agence Principale</span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">Agence Tour Tlemcen</h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  {AGENCY_INFO.address}
                </p>
                <div className="text-xs font-mono text-brand-orange mt-2 font-semibold">
                  Coordonnées GPS : {AGENCY_INFO.coordinates}
                </div>
              </div>

              {/* Hours & Readiness */}
              <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900">Horaires d&apos;accueil</div>
                    <div className="text-slate-500">{AGENCY_INFO.openingHours}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900">Prise en charge express</div>
                    <div className="text-slate-500">Véhicule lavé, révisé et réservoir prêt à l&apos;agence.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Ouvrir l&apos;itinéraire Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${AGENCY_INFO.phone.replace(/[^0-9]/g, '')}`}
                  className="h-11 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{AGENCY_INFO.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${AGENCY_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-emerald-600" />
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
            className="lg:col-span-7 rounded-2xl overflow-hidden bg-white border border-slate-200 relative min-h-[420px] shadow-lg"
          >
            {/* Interactive Google Map in natural light style */}
            <iframe
              title="Localisation Agence Agence Tour Tlemcen"
              src="https://maps.google.com/maps?q=34.8828,-1.3167&hl=fr&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '440px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full block"
            />

            {/* Overlay badge on the map */}
            <div className="absolute top-4 left-4 pointer-events-none">
              <div className="px-3.5 py-2 rounded-xl bg-white/95 border border-slate-200 text-slate-900 text-xs font-mono font-bold flex items-center gap-2 shadow-lg backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
                <span>Agence Tour • Tlemcen Centre</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
