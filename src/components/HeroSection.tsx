'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Car } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[88vh] pt-32 pb-16 flex flex-col justify-center items-center overflow-hidden bg-transparent z-10">
      {/* Dynamic Road streaks subtle animation */}
      <div className="absolute inset-x-0 bottom-1/4 h-24 overflow-hidden opacity-30 pointer-events-none">
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center">
        
        {/* Subtle Brand Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-slate-200 shadow-md text-xs font-mono font-semibold tracking-[0.2em] uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
          <span>AGENCE TOUR • LOCATION DE VOITURES À TLEMCEN</span>
        </motion.div>

        {/* Clean, Massive Majestic Title (Inspired by "Find the Best Car") */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] select-none text-white drop-shadow-2xl"
        >
          <span>Trouvez le Véhicule </span>
          <span className="bg-gradient-to-r from-brand-orange via-amber-400 to-orange-400 bg-clip-text text-transparent">
            Idéal.
          </span>
        </motion.h1>

        {/* Clean Attractive Paragraph Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl px-6 py-4 rounded-2xl bg-slate-950/70 backdrop-blur-md border border-white/20 shadow-2xl text-balance"
        >
          <p
            className="text-base sm:text-lg text-white font-medium leading-relaxed tracking-wide"
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.95)',
            }}
          >
            La liberté de voyager à Tlemcen et ses environs en toute sérénité. Profitez d&apos;une flotte moderne, propre et climatisée pour tous vos séjours en famille ou vos déplacements professionnels.
          </p>
        </motion.div>

        {/* CTA Buttons: Scroll to Availability and Fleet */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#reservation"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-orange-500/30 hover:scale-105 hover:shadow-2xl transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Vérifier la Disponibilité</span>
          </a>

          <a
            href="#flotte"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/30 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/10 hover:border-brand-orange transition-all"
          >
            <Car className="w-4 h-4 text-brand-orange" />
            <span>Découvrir la Flotte</span>
          </a>
        </motion.div>

        {/* Subtle Scroll Down Indicator */}
        <motion.a
          href="#reservation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 inline-flex flex-col items-center gap-2 text-slate-300 hover:text-brand-orange transition-colors group cursor-pointer"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400 group-hover:text-brand-orange transition-colors">
            Descendre pour vérifier la disponibilité
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:border-brand-orange transition-colors"
          >
            <ChevronDown className="w-4 h-4 text-brand-orange" />
          </motion.div>
        </motion.a>

      </div>
    </section>
  );
}
