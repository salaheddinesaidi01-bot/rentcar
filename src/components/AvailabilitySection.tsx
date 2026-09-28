'use client';

import React from 'react';
import { motion } from 'framer-motion';
import BookingWidget from './BookingWidget';

interface AvailabilitySectionProps {
  startDate: string;
  endDate: string;
  onDatesChange: (start: string, end: string) => void;
  availableCount: number;
}

export default function AvailabilitySection({
  startDate,
  endDate,
  onDatesChange,
  availableCount,
}: AvailabilitySectionProps) {
  return (
    <section id="reservation" className="relative py-16 sm:py-20 z-10 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-brand-orange font-mono text-xs font-bold tracking-wider">
              ( 01 )
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-950 dark:text-slate-300 font-bold">
              RÉSERVATION EXPRESS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-950 dark:text-white drop-shadow-md transition-colors">
            VÉRIFIEZ LA <span className="text-brand-orange">DISPONIBILITÉ</span>.
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-900 dark:text-slate-200 max-w-2xl mx-auto drop-shadow-sm transition-colors font-medium">
            Indiquez vos dates de séjour pour afficher en direct les véhicules prêts à prendre la route à Tlemcen.
          </p>
        </motion.div>

        {/* Booking Widget Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <BookingWidget
            startDate={startDate}
            endDate={endDate}
            onDatesChange={onDatesChange}
            availableCount={availableCount}
          />
        </motion.div>
      </div>
    </section>
  );
}
