'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VehicleCard from './VehicleCard';
import BookingModal from './BookingModal';
import { Vehicle } from '@/types';
import { formatDateFR, isVehicleAvailableForDates } from '@/lib/utils';
import { Calendar, CheckCircle } from 'lucide-react';

interface FleetSectionProps {
  vehicles: Vehicle[];
  startDate: string;
  endDate: string;
  onDatesChange: (start: string, end: string) => void;
}

const CATEGORIES = ['Tous', 'Citadine', 'Berline', 'SUV'];

export default function FleetSection({
  vehicles,
  startDate,
  endDate,
  onDatesChange,
}: FleetSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [onlyAvailable, setOnlyAvailable] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Compute availability for each vehicle given the dates
  const vehiclesWithAvailability = vehicles.map((v) => ({
    ...v,
    isAvailableForSelectedDates: isVehicleAvailableForDates(v, startDate, endDate),
  }));

  const filteredVehicles = vehiclesWithAvailability.filter((v) => {
    if (selectedCategory !== 'Tous' && v.category !== selectedCategory) {
      return false;
    }
    if (onlyAvailable && !v.isAvailableForSelectedDates) {
      return false;
    }
    return true;
  });

  const availableCount = vehiclesWithAvailability.filter((v) => v.isAvailableForSelectedDates).length;

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  return (
    <section id="flotte" className="relative py-24 bg-midnight-900 border-t border-white/5 overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-brand-orange font-mono text-xs font-bold tracking-wider">
                ( 02 )
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
                CATALOGUE DE NOTRE FLOTTE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              CHOISISSEZ VOTRE <span className="text-brand-orange">VÉHICULE</span>.
            </h2>

            {/* Date period reminder banner */}
            <div className="inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 rounded-lg bg-midnight-950/80 border border-white/10 text-xs font-mono text-slate-300">
              <Calendar className="w-4 h-4 text-brand-orange" />
              <span>
                Disponibilités calculées du <strong className="text-white">{formatDateFR(startDate)}</strong> au <strong className="text-white">{formatDateFR(endDate)}</strong>
              </span>
              <span className="text-emerald-400 font-bold ml-1">
                ({availableCount} disponible{availableCount > 1 ? 's' : ''})
              </span>
            </div>
          </div>

          {/* Filter Pills and Availability toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            
            {/* Category pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-midnight-950/80 p-1.5 rounded-xl border border-white/5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-brand-orange text-white shadow-glow-orange'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Only available toggle */}
            <button
              onClick={() => setOnlyAvailable(!onlyAvailable)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all ${
                onlyAvailable
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                  : 'bg-white/5 border-white/10 text-slate-400'
              }`}
            >
              <CheckCircle className={`w-3.5 h-3.5 ${onlyAvailable ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Disponibles uniquement</span>
            </button>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              isAvailable={vehicle.isAvailableForSelectedDates}
              onSelect={handleSelectVehicle}
            />
          ))}
        </div>

        {/* Empty state if filtered */}
        {filteredVehicles.length === 0 && (
          <div className="text-center py-16 text-slate-400 glass-panel rounded-2xl space-y-3">
            <p className="text-base text-white font-bold">
              Aucun véhicule disponible pour les dates sélectionnées ({formatDateFR(startDate)} au {formatDateFR(endDate)}).
            </p>
            <p className="text-xs text-slate-400">
              Essayez de décaler vos dates ou contactez directement Salah Tour au 0550 50 50 50.
            </p>
            <button
              onClick={() => setOnlyAvailable(false)}
              className="text-xs text-brand-orange hover:underline font-mono"
            >
              Afficher tous les véhicules de la flotte
            </button>
          </div>
        )}

      </div>

      {/* Booking Modal */}
      <BookingModal
        vehicle={selectedVehicle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialStartDate={startDate}
        initialEndDate={endDate}
      />
    </section>
  );
}
