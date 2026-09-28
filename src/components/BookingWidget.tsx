'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, ArrowRight, MessageSquare, PhoneCall, Building2, AlertTriangle } from 'lucide-react';
import { calculateRentalDays, buildWhatsAppLink } from '@/lib/utils';

interface BookingWidgetProps {
  startDate: string;
  endDate: string;
  onDatesChange: (start: string, end: string) => void;
  availableCount: number;
}

export default function BookingWidget({
  startDate,
  endDate,
  onDatesChange,
  availableCount,
}: BookingWidgetProps) {
  const calculatedDays = useMemo(() => {
    return calculateRentalDays(startDate, endDate);
  }, [startDate, endDate]);

  const handleFilterClick = (e: React.FormEvent) => {
    e.preventDefault();
    const fleetEl = document.getElementById('flotte');
    if (fleetEl) {
      fleetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappLink = buildWhatsAppLink({
    startDate,
    endDate,
    days: calculatedDays,
    totalPrice: 0,
  });

  return (
    <motion.div
      id="reservation"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto rounded-2xl bg-white/95 dark:bg-slate-900/95 p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-2xl relative z-20 backdrop-blur-xl transition-colors duration-300"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <Clock className="w-5 h-5 text-brand-orange animate-pulse" />
          <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-slate-900 dark:text-white transition-colors">
            Vérification Express de Disponibilité
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Synchronized Real-time Status Badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-300 ${
              availableCount > 0
                ? 'border-emerald-200 dark:border-emerald-800/80 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                : 'border-rose-200 dark:border-rose-800/80 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                availableCount > 0 ? 'bg-emerald-500 animate-ping' : 'bg-rose-500'
              }`}
            />
            <span>
              {availableCount > 0
                ? `${availableCount} voiture${availableCount > 1 ? 's' : ''} disponible${availableCount > 1 ? 's' : ''}`
                : 'Complet sur ces dates'}
            </span>
          </div>
        </div>
      </div>

      {/* Retrait à l'agence Info Banner */}
      <div className="mt-4 py-2.5 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-950 dark:text-slate-200 font-medium transition-colors">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-brand-orange flex-shrink-0" />
          <span>
            Retrait & Restitution à l&apos;<strong>Agence Tour</strong> (Centre-Ville Tlemcen)
          </span>
        </div>
        <span className="hidden sm:inline font-mono text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">
          ✓ Prêt en 2 min chrono
        </span>
      </div>

      {/* Date Pickers & Realtime Synchronized CTA */}
      <form onSubmit={handleFilterClick} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          
          {/* 1. Date de départ */}
          <div className="md:col-span-4 space-y-2">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-slate-300">
              Date de début
            </label>
            <div className="relative">
              <input
                type="date"
                required
                value={startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => onDatesChange(e.target.value, endDate)}
                className="w-full h-12 bg-slate-50 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 pl-10 text-sm font-semibold text-slate-950 dark:text-white focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all cursor-pointer"
              />
              <Calendar className="w-4 h-4 text-brand-orange absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 2. Date de retour */}
          <div className="md:col-span-4 space-y-2">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-slate-300">
              Date de fin
            </label>
            <div className="relative">
              <input
                type="date"
                required
                value={endDate}
                min={startDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => onDatesChange(startDate, e.target.value)}
                className="w-full h-12 bg-slate-50 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 pl-10 text-sm font-semibold text-slate-950 dark:text-white focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all cursor-pointer"
              />
              <Calendar className="w-4 h-4 text-brand-orange absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 3. Action Button: Synchronized with Real-Time Availability */}
          <div className="md:col-span-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full h-12 rounded-xl text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                availableCount > 0
                  ? 'bg-gradient-to-r from-brand-orange to-brand-amber hover:from-brand-light hover:to-brand-orange shadow-orange-500/25 hover:shadow-orange-500/40 cursor-pointer'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-slate-300 border border-slate-300 dark:border-slate-700 cursor-pointer'
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={availableCount}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  {availableCount > 0 ? (
                    <>
                      <span>Voir les Disponibles ({availableCount})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span>Aucun disponible aux dates</span>
                    </>
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </form>

      {/* Footer Details: Realtime Calculation & Instant Assistance */}
      <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono text-slate-950 dark:text-slate-300 font-medium">
        
        {/* Real-time duration & availability counter - NO PRICE ESTIMATION */}
        <div className="flex flex-wrap items-center gap-2">
          <span>Durée sélectionnée :</span>
          <span className="text-brand-orange font-bold">
            {calculatedDays} jour{calculatedDays > 1 ? 's' : ''}
          </span>
          <span className="text-slate-900 dark:text-slate-600 font-bold">•</span>
          <span className="text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded font-bold border border-emerald-300 dark:border-emerald-800/80">
            {availableCount} véhicule{availableCount > 1 ? 's' : ''} disponible{availableCount > 1 ? 's' : ''}
          </span>
        </div>

        {/* WhatsApp & Instant hotline */}
        <div className="flex items-center gap-2">
          <span className="text-slate-950 dark:text-slate-300 font-medium">Assistance directe ?</span>
          <span className="text-slate-900 dark:text-slate-600 font-bold">•</span>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 transition-colors font-bold"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-emerald-700 dark:fill-emerald-400" />
            <span>WhatsApp</span>
          </a>
          <span className="text-slate-900 dark:text-slate-600 font-bold">•</span>
          <a
            href="tel:0550505050"
            className="inline-flex items-center gap-1 text-slate-950 dark:text-slate-200 hover:text-brand-orange dark:hover:text-brand-orange transition-colors font-bold"
          >
            <PhoneCall className="w-3 h-3 text-brand-orange" />
            <span>0550 50 50 50</span>
          </a>
        </div>

      </div>
    </motion.div>
  );
}
