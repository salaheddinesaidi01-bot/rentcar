'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, X, Clock, Car } from 'lucide-react';
import { AGENCY_INFO } from '@/lib/seed-data';

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${AGENCY_INFO.whatsapp}?text=${encodeURIComponent(
    'Bonjour Agence Tour Tlemcen, je souhaite réserver ou me renseigner sur la disponibilité d\'un véhicule.'
  )}`;

  const callUrl = `tel:${AGENCY_INFO.phone.replace(/[^0-9]/g, '')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Contact Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 p-5 overflow-hidden text-slate-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center text-white">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase text-slate-900">Agence Tour</div>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Conseillers en ligne</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Body */}
            <p className="text-xs text-slate-600 my-3 leading-relaxed">
              Une question sur un modèle, les tarifs ou votre arrivée à l&apos;Aéroport de Tlemcen ? Contactez-nous directement :
            </p>

            {/* Action Buttons */}
            <div className="space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all text-emerald-800 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Discuter sur WhatsApp</div>
                    <div className="text-[10px] text-emerald-700 font-mono">Réponse en moins de 5 min</div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700">➔</span>
              </a>

              <a
                href={callUrl}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all text-slate-800 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-orange text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Appel Téléphonique Direct</div>
                    <div className="text-[10px] text-slate-500 font-mono">{AGENCY_INFO.phone}</div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-brand-orange">➔</span>
              </a>
            </div>

            {/* Hours footer */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
              <Clock className="w-3 h-3 text-brand-orange" />
              <span>{AGENCY_INFO.openingHours}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-brand-orange to-brand-amber text-white font-bold text-xs uppercase tracking-wider shadow-2xl shadow-orange-500/40 border-2 border-white/80 hover:shadow-orange-500/60 transition-all group"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 fill-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white animate-pulse" />
        </div>
        <span className="hidden sm:inline font-black tracking-wide">
          {isOpen ? 'Fermer' : 'Une question ?'}
        </span>
      </motion.button>
    </div>
  );
}
