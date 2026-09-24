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

const HERO_PHOTOS = [
  {
    id: 'photo-1',
    label: 'Berline S-Klasse',
    sublabel: 'Routière de Prestige',
    src: '/images/hero-driving-car.jpg',
  },
  {
    id: 'photo-2',
    label: 'SUV Range Rover',
    sublabel: 'Aventure & Grand Confort',
    src: '/images/fleet-driving-car.jpg',
  },
];

export default function HeroSection({
  startDate,
  endDate,
  onDatesChange,
  availableCount = 0,
}: HeroSectionProps) {
  const [activePhoto, setActivePhoto] = useState(0);

  // Auto-switch between photo 1 and photo 2 every 6 seconds with smooth animation
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % HERO_PHOTOS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[96vh] pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden bg-slate-50">
      
      {/* Background Animated Switching Driving Cars - ZERO BLUR, 100% CRISP */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* Animated Smooth Crossfade & Scale Switch between Photo 1 and Photo 2 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={HERO_PHOTOS[activePhoto].id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{
              opacity: 1,
              scale: [1.02, 1, 1.02],
            }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{
              opacity: { duration: 1.1, ease: 'easeInOut' },
              scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute inset-0 w-full h-full bg-cover bg-center sm:bg-[center_35%] bg-no-repeat"
            style={{
              backgroundImage: `url('${HERO_PHOTOS[activePhoto].src}')`,
            }}
          />
        </AnimatePresence>

        {/* Minimal gradient strictly at top for navbar readability and bottom for section transition */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/80 via-white/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-100 via-slate-100/60 to-transparent" />

        {/* Crisp road speed dynamic streaks */}
        <div className="absolute inset-x-0 bottom-1/4 h-24 overflow-hidden opacity-50">
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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center">
        
        {/* Massive Bold Heading: LOUEZ. ROULEZ. with Deep Contrast Shadows */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] select-none"
        >
          <span
            className="block text-white"
            style={{
              filter: 'drop-shadow(0 6px 20px rgba(0, 0, 0, 0.95)) drop-shadow(0 2px 4px rgba(0, 0, 0, 1))',
            }}
          >
            LOUEZ.
          </span>
          <span
            className="block bg-gradient-to-r from-brand-orange via-brand-amber to-orange-400 bg-clip-text text-transparent"
            style={{
              filter: 'drop-shadow(0 8px 25px rgba(0, 0, 0, 0.95)) drop-shadow(0 2px 6px rgba(0, 0, 0, 1))',
            }}
          >
            ROULEZ.
          </span>
        </motion.h1>

        {/* Subtitle: La liberté ... with strong shadow & frosted contrast capsule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl px-6 py-3.5 rounded-2xl bg-black/45 backdrop-blur-md border border-white/20 shadow-2xl text-balance"
        >
          <p
            className="text-base sm:text-lg text-white font-bold leading-relaxed"
            style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 1)',
            }}
          >
            La liberté de la route à Tlemcen. Citadines et berlines récentes et entretenues, retrait rapide des clés directement à notre agence sans démarche superflue.
          </p>
        </motion.div>

        {/* Eye-catching Commercial Hook Banner ("Bandeau Avantages Choc") */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-4xl"
        >
          {/* 1. Tarif d'appel choc */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-orange-500/40 border border-orange-300/40 hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-4 h-4 fill-white text-white animate-pulse" />
            <span>À partir de <span className="underline decoration-white/70 decoration-2 font-black text-sm sm:text-base">7 000 DA</span> / jour</span>
          </div>

          {/* 2. Zéro frais cachés */}
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-950/75 backdrop-blur-md text-emerald-400 border border-emerald-500/40 font-bold text-xs sm:text-sm shadow-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-white">0 Frais Cachés</span>
          </div>

          {/* 3. Kilométrage illimité */}
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-950/75 backdrop-blur-md text-white border border-white/25 font-bold text-xs sm:text-sm shadow-md">
            <Gauge className="w-4 h-4 text-brand-orange flex-shrink-0" />
            <span>Kilométrage Illimité</span>
          </div>

          {/* 4. Clés en main en 2 min */}
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-950/75 backdrop-blur-md text-amber-300 border border-amber-400/40 font-bold text-xs sm:text-sm shadow-md">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />
            <span className="text-white">Clés en 2 min chrono</span>
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
