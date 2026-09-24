'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, Fuel, Gauge, Snowflake, ArrowUpRight, CheckCircle2, Calendar } from 'lucide-react';
import { Vehicle } from '@/types';
import { formatDA } from '@/lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
  isAvailable: boolean;
  onSelect: (vehicle: Vehicle) => void;
}

export default function VehicleCard({ vehicle, isAvailable, onSelect }: VehicleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className={`group relative rounded-2xl bg-white overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
        isAvailable
          ? 'border-slate-200 shadow-md hover:shadow-xl hover:border-brand-orange/40'
          : 'border-slate-200/60 opacity-60 bg-slate-50'
      }`}
    >
      {/* Top Image Container */}
      <div
        onClick={() => onSelect(vehicle)}
        className="relative w-full h-56 overflow-hidden bg-slate-100 cursor-pointer"
        title="Voir les disponibilités et réserver"
      >
        <Image
          src={vehicle.imageUrl}
          alt={vehicle.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Ambient Gradient Over Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20" />

        {/* Category & Availability Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-white/90 text-brand-orange border border-slate-200 shadow-sm backdrop-blur-md">
            {vehicle.category}
          </span>

          <span
            className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-sm ${
              isAvailable
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
              }`}
            />
            {isAvailable ? 'Disponible' : 'Réservée aux dates'}
          </span>
        </div>

        {/* Year tag */}
        <div className="absolute bottom-3 left-4 text-xs font-mono text-white bg-slate-900/70 px-2.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
          Modèle {vehicle.year}
        </div>
      </div>

      {/* Body Information */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div>
          <h3
            onClick={() => onSelect(vehicle)}
            className="text-xl font-black text-slate-900 group-hover:text-brand-orange transition-colors cursor-pointer"
            title="Voir les disponibilités et réserver"
          >
            {vehicle.name}
          </h3>

          {/* Detailed vehicle characteristics */}
          <div className="grid grid-cols-2 gap-2.5 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Gauge className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
              <span>Boîte {vehicle.transmission}</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
              <span>Énergie : {vehicle.fuel}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
              <span>{vehicle.seats} places assises</span>
            </div>
            <div className="flex items-center gap-2">
              <Snowflake className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0" />
              <span>{vehicle.hasAC ? 'Climatisation A/C' : 'Sans climatisation'}</span>
            </div>
          </div>

          {/* Key feature pills */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {vehicle.features.slice(0, 3).map((feat, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3 text-brand-orange" />
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing and Action CTA */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              Tarif journalier
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">
                {formatDA(vehicle.pricePerDay)}
              </span>
              <span className="text-xs text-slate-500 font-mono">/ jour</span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(vehicle)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ${
              isAvailable
                ? 'bg-brand-orange hover:bg-brand-amber text-white shadow-md hover:shadow-orange-500/30 hover:scale-105'
                : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-sm hover:border-brand-orange'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-brand-orange" />
            <span>{isAvailable ? 'Réserver' : 'Voir calendrier'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>

    </motion.div>
  );
}
