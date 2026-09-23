'use client';

import React, { useState } from 'react';
import VehicleCard from './VehicleCard';
import BookingModal from './BookingModal';
import { Vehicle } from '@/types';

interface FleetSectionProps {
  vehicles: Vehicle[];
  bookingWidgetData?: {
    pickupLocation: string;
    startDate: string;
    endDate: string;
  };
}

const CATEGORIES = ['Tous', 'Citadine', 'Berline', 'SUV'];

export default function FleetSection({
  vehicles,
  bookingWidgetData,
}: FleetSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredVehicles = vehicles.filter((v) => {
    if (selectedCategory === 'Tous') return true;
    return v.category === selectedCategory;
  });

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-brand-orange font-mono text-xs font-bold tracking-wider">
                ( 02 )
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
                FLOTTE ENTREVENUE & CONTRÔLÉE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              CHOISISSEZ VOTRE <span className="text-brand-orange">VÉHICULE</span>.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-midnight-950/60 p-1.5 rounded-xl border border-white/5 self-start md:self-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-brand-orange text-white shadow-glow-orange'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={handleSelectVehicle}
            />
          ))}
        </div>

        {/* Empty state if filtered */}
        {filteredVehicles.length === 0 && (
          <div className="text-center py-16 text-slate-400 glass-panel rounded-2xl">
            Aucun véhicule disponible dans cette catégorie pour le moment.
          </div>
        )}

      </div>

      {/* Booking Modal */}
      <BookingModal
        vehicle={selectedVehicle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialLocation={bookingWidgetData?.pickupLocation}
        initialStartDate={bookingWidgetData?.startDate}
        initialEndDate={bookingWidgetData?.endDate}
      />
    </section>
  );
}
