'use client';

import React, { useState, useMemo } from 'react';
import { Clock, Calendar, MapPin, ArrowRight, MessageSquare, PhoneCall } from 'lucide-react';
import { formatDA, calculateRentalDays, buildWhatsAppLink } from '@/lib/utils';
import { Location } from '@/types';

interface BookingWidgetProps {
  locations?: Location[];
  onContinue?: (data: {
    pickupLocation: string;
    startDate: string;
    endDate: string;
    days: number;
    estimatedPrice: number;
  }) => void;
}

const DEFAULT_LOCATIONS = [
  'Tlemcen Centre-Ville',
  'Aéroport Messali Hadj Tlemcen (Zenata)',
  'Gare Routière Tlemcen',
  'Livraison à Domicile (Grand Tlemcen)',
];

export default function BookingWidget({ onContinue }: BookingWidgetProps) {
  // Pre-fill matching mockup: 24/09/2026 10:00 to 27/09/2026 10:00
  const [pickupLocation, setPickupLocation] = useState('Tlemcen Centre-Ville');
  const [startDate, setStartDate] = useState('2026-09-24T10:00');
  const [endDate, setEndDate] = useState('2026-09-27T10:00');

  const baseRatePerDay = 7000; // 7 000 DA / jour (from mockup)

  const calculatedDays = useMemo(() => {
    return calculateRentalDays(startDate, endDate);
  }, [startDate, endDate]);

  const estimatedPrice = useMemo(() => {
    return calculatedDays * baseRatePerDay;
  }, [calculatedDays]);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (onContinue) {
      onContinue({
        pickupLocation,
        startDate,
        endDate,
        days: calculatedDays,
        estimatedPrice,
      });
    } else {
      const fleetEl = document.getElementById('flotte');
      if (fleetEl) {
        fleetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const whatsappLink = buildWhatsAppLink({
    pickupLocation,
    startDate,
    endDate,
    days: calculatedDays,
    totalPrice: estimatedPrice,
  });

  return (
    <div
      id="reservation"
      className="w-full max-w-5xl mx-auto rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 shadow-2xl relative z-20 backdrop-blur-xl"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <Clock className="w-5 h-5 text-brand-orange animate-pulse" />
          <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-white">
            Vérification Express de Disponibilité
          </h3>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider self-start sm:self-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
          Réponse en 2 min
        </div>
      </div>

      {/* Main Input Controls */}
      <form onSubmit={handleContinue} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          
          {/* 1. Lieu de récupération */}
          <div className="md:col-span-4 space-y-2">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Lieu de récupération
            </label>
            <div className="relative">
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full h-12 bg-midnight-950/80 border border-white/10 rounded-xl px-4 pl-10 text-sm font-medium text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all appearance-none cursor-pointer"
              >
                {DEFAULT_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc} className="bg-midnight-900 text-white">
                    {loc}
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-brand-orange absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 2. Date & heure départ */}
          <div className="md:col-span-3 space-y-2">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Date & Heure de départ
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full h-12 bg-midnight-950/80 border border-white/10 rounded-xl px-4 pl-10 text-sm font-medium text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all [color-scheme:dark]"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 3. Date & heure retour */}
          <div className="md:col-span-3 space-y-2">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Date & Heure de retour
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full h-12 bg-midnight-950/80 border border-white/10 rounded-xl px-4 pl-10 text-sm font-medium text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all [color-scheme:dark]"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 4. Action CTA Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber hover:from-brand-light hover:to-brand-orange text-white font-extrabold text-sm uppercase tracking-wider shadow-glow-orange hover:shadow-glow-orange-lg flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 group"
            >
              <span>Continuer</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </form>

      {/* Footer Details: Realtime Calculation & Instant Assistance */}
      <div className="mt-6 pt-5 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono text-slate-400">
        
        {/* Real-time duration & estimated calculation */}
        <div className="flex flex-wrap items-center gap-2">
          <span>Durée calculée :</span>
          <span className="text-brand-orange font-bold">
            {calculatedDays} jour{calculatedDays > 1 ? 's' : ''}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">{pickupLocation}</span>
          <span className="text-slate-600">•</span>
          <span>Estimation :</span>
          <span className="text-brand-orange font-bold text-sm">
            {formatDA(estimatedPrice)}
          </span>
          <span className="text-slate-500">(à partir de 7 000 DA/j)</span>
        </div>

        {/* WhatsApp & Instant hotline */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Besoin d&apos;aide immédiate ?</span>
          <span className="text-slate-600">•</span>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-emerald-400" />
            <span>WhatsApp</span>
          </a>
          <span className="text-slate-600">•</span>
          <a
            href="tel:0550505050"
            className="inline-flex items-center gap-1 text-slate-200 hover:text-brand-orange transition-colors font-bold"
          >
            <PhoneCall className="w-3 h-3 text-brand-orange" />
            <span>0550 50 50 50</span>
          </a>
        </div>

      </div>
    </div>
  );
}
