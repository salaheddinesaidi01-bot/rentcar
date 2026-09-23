'use client';

import React from 'react';
import { motion } from 'framer-motion';
import BookingWidget from './BookingWidget';

interface HeroSectionProps {
  startDate: string;
  endDate: string;
  onDatesChange: (start: string, end: string) => void;
  availableCount?: number;
}

export default function HeroSection({
  startDate,
  endDate,
  onDatesChange,
  availableCount,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden">
      
      {/* Background Dark Luxury Automotive Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900 to-midnight-950" />
        
        {/* Glow orb behind the title */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.22, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-brand-orange/20 rounded-full blur-[140px]"
        />
        
        {/* Subtle automotive silhouette watermark overlay */}
        <div 
          className="absolute inset-0 opacity-25 bg-center bg-cover bg-no-repeat mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80')`,
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* Technical grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center">
        

        {/* Massive Bold Heading: LOUEZ. ROULEZ. with animations */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] select-none"
        >
          <span className="block text-white drop-shadow-md">
            LOUEZ.
          </span>
          <span className="block bg-gradient-to-r from-brand-orange via-brand-amber to-brand-light bg-clip-text text-transparent filter drop-shadow-[0_4px_30px_rgba(255,107,0,0.4)]">
            ROULEZ.
          </span>
        </motion.h1>

        {/* Subtitle strictly focused on agency pickup */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 max-w-2xl text-base sm:text-lg text-slate-300 font-normal leading-relaxed text-balance"
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
