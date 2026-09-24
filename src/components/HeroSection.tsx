'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
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

  const nextPhoto = () => setActivePhoto((prev) => (prev + 1) % HERO_PHOTOS.length);
  const prevPhoto = () => setActivePhoto((prev) => (prev - 1 + HERO_PHOTOS.length) % HERO_PHOTOS.length);

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

      {/* Floating Animated Photo Switcher Controls (Bottom-Right) */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-2xl">
        <button
          onClick={prevPhoto}
          aria-label="Photo précédente"
          className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 px-1">
          {HERO_PHOTOS.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => setActivePhoto(idx)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all duration-300 ${
                activePhoto === idx
                  ? 'bg-brand-orange text-white shadow-md'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activePhoto === idx ? 'bg-white animate-pulse' : 'bg-white/40'}`} />
              <span>{photo.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={nextPhoto}
          aria-label="Photo suivante"
          className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
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

        {/* Booking Widget Component Container */}
        <div className="w-full mt-12">
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
