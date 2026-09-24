'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
    <section className="relative min-h-[96vh] pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden bg-slate-50">
      
      {/* Background Sharp Driving Car with Road Shadow - ZERO BLUR, 100% CRISP */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* Crisp, Sharp Image of Car Rolling on Asphalt with Tire Shadows */}
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: 1,
            scale: [1, 1.03, 1],
          }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute inset-0 w-full h-full bg-cover bg-center sm:bg-[center_35%] bg-no-repeat"
          style={{
            backgroundImage: `url('/images/hero-driving-car.jpg')`,
          }}
        />

        {/* Minimal gradient strictly at top for navbar readability and bottom for section transition - NO BLUR, car remains vivid and sharp */}
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
        
        {/* Massive Bold Heading: LOUEZ. ROULEZ. */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] select-none"
        >
          <span className="block text-slate-900 drop-shadow-[0_4px_20px_rgba(255,255,255,0.9)]">
            LOUEZ.
          </span>
          <span className="block bg-gradient-to-r from-brand-orange via-brand-amber to-brand-dark bg-clip-text text-transparent filter drop-shadow-[0_6px_30px_rgba(255,107,0,0.45)]">
            ROULEZ.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 max-w-2xl text-base sm:text-lg text-slate-700 font-medium leading-relaxed text-balance drop-shadow-sm"
        >
          La liberté de la route à Tlemcen. Citadines et berlines récentes et entretenues, retrait rapide des clés directement à notre agence sans démarche superflue.
        </motion.p>

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
