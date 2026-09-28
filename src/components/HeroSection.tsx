'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Gauge, Zap, Sparkles } from 'lucide-react';
import BookingWidget from './BookingWidget';

interface HeroSectionProps {
  startDate: string;
  endDate: string;
  onDatesChange: (start: string, end: string) => void;
  availableCount: number;
}

export default function HeroSection({
  startDate,
  endDate,
  onDatesChange,
  availableCount = 0,
}: HeroSectionProps) {

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden bg-transparent z-10">
      {/* Crisp road speed dynamic streaks overlay */}
      <div className="absolute inset-x-0 bottom-1/4 h-24 overflow-hidden opacity-40 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: '120%', opacity: 0 }}
            animate={{ x: '-150%', opacity: [0, 0.95, 0] }}
            transition={{
              duration: 2.2 + i * 0.4,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5,
            }}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-brand-orange to-transparent"
            style={{
              top: `${i * 20}px`,
              width: `${160 + i * 60}px`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center">
        
        {/* Massive Bold Heading: LOUEZ. ROULEZ. with Ultra-Crisp Contrast */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] select-none"
        >
          <span
            className="block text-white"
            style={{
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 1)',
              filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.9))',
            }}
          >
            LOUEZ.
          </span>
          <span
            className="block bg-gradient-to-r from-brand-orange via-amber-400 to-orange-400 bg-clip-text text-transparent"
            style={{
              filter: 'drop-shadow(0 6px 20px rgba(0, 0, 0, 0.95)) drop-shadow(0 12px 35px rgba(0, 0, 0, 0.85))',
            }}
          >
            ROULEZ.
          </span>
        </motion.h1>

        {/* Subtitle: High contrast dark glass capsule with attractive teaser copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl px-6 py-5 rounded-2xl bg-slate-950/75 backdrop-blur-md border border-white/25 shadow-2xl text-balance"
        >
          <p
            className="text-base sm:text-lg text-white font-bold leading-relaxed tracking-wide"
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.95)',
            }}
          >
            La liberté de voyager à Tlemcen et ses environs en toute sérénité. Profitez d&apos;une flotte récente, soignée et climatisée pour tous vos trajets.
          </p>
          <p className="mt-2 text-xs sm:text-sm text-brand-amber font-semibold tracking-wide">
            ✨ Réservez votre véhicule en quelques clics sans avance par carte • Remise immédiate des clés à l&apos;arrivée.
          </p>
        </motion.div>

        {/* Eye-catching Perks Hook Banner (Attrayant & Rassurant, sans tarif ni mention frais cachés) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-4xl"
        >
          {/* 1. Flotte Récente & Confort */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-orange-500/30 border border-orange-300/40 hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-4 h-4 fill-white text-white animate-pulse" />
            <span>Véhicules Récents &amp; Climatisés</span>
          </div>

          {/* 2. Remise Rapide */}
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-950/75 backdrop-blur-md text-amber-300 border border-amber-400/40 font-bold text-xs sm:text-sm shadow-md">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />
            <span className="text-white">Clés en 2 min chrono</span>
          </div>

          {/* 3. Kilométrage illimité */}
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-950/75 backdrop-blur-md text-white border border-white/25 font-bold text-xs sm:text-sm shadow-md">
            <Gauge className="w-4 h-4 text-brand-orange flex-shrink-0" />
            <span>Kilométrage Illimité</span>
          </div>

          {/* 4. Réservation sans paiement préalable */}
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-950/75 backdrop-blur-md text-emerald-400 border border-emerald-500/40 font-bold text-xs sm:text-sm shadow-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-white">Paiement à la prise en main</span>
          </div>
        </motion.div>

        {/* Booking Widget Component Container */}
        <div className="w-full mt-10">
          <BookingWidget
            startDate={startDate}
            endDate={endDate}
            onDatesChange={onDatesChange}
            availableCount={availableCount}
          />
        </div>

      </div>
    </section>
  );
}
