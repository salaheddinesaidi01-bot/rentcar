'use client';

import React from 'react';
import BookingWidget from './BookingWidget';

interface HeroSectionProps {
  onContinueBooking?: (data: {
    pickupLocation: string;
    startDate: string;
    endDate: string;
    days: number;
    estimatedPrice: number;
  }) => void;
}

export default function HeroSection({ onContinueBooking }: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden">
      
      {/* Background Dark Luxury Automotive Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Deep ambient gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900 to-midnight-950" />
        
        {/* Glow orb behind the title */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-brand-orange/15 rounded-full blur-[140px]" />
        
        {/* Subtle automotive silhouette watermark overlay */}
        <div 
          className="absolute inset-0 opacity-20 bg-center bg-cover bg-no-repeat mix-blend-luminosity"
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
        
        {/* Top Technical Badge matching mockup */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
          <p className="text-[11px] sm:text-xs font-mono tracking-widest uppercase text-slate-300">
            <span className="text-slate-400">FLOTTE DISPONIBLE</span>
            <span className="mx-2 text-slate-600">•</span>
            <span className="text-slate-200">TLEMCEN 13000</span>
            <span className="mx-2 text-slate-600">•</span>
            <span className="text-slate-400">COORD: 34°52&apos;N 1°19&apos;W</span>
            <span className="mx-2 text-slate-600">•</span>
            <span className="text-brand-orange font-bold">À PARTIR DE 7 000 DA / JOUR</span>
          </p>
        </div>

        {/* Massive Bold Heading: LOUEZ. ROULEZ. */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] select-none">
          <span className="block text-white drop-shadow-md">
            LOUEZ.
          </span>
          <span className="block bg-gradient-to-r from-brand-orange via-brand-amber to-brand-light bg-clip-text text-transparent filter drop-shadow-[0_4px_30px_rgba(255,107,0,0.4)]">
            ROULEZ.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 max-w-2xl text-base sm:text-lg text-slate-300 font-normal leading-relaxed text-balance">
          La liberté de la route à Tlemcen. Citadines entretenues, remise des clés directe à l&apos;aéroport, à la gare ou à votre adresse sans démarche superflue.
        </p>

        {/* Booking Widget Component Container */}
        <div className="w-full mt-12">
          <BookingWidget onContinue={onContinueBooking} />
        </div>

      </div>
    </section>
  );
}
