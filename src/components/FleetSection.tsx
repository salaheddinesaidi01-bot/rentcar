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
  const [selectedTransmission, setSelectedTransmission] = useState<'All' | 'Automatique' | 'Manuelle'>('All');
  const [acOnly, setAcOnly] = useState(false);
  const [priceSort, setPriceSort] = useState<'none' | 'asc' | 'desc'>('none');
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [currency, setCurrency] = useState<'DZD' | 'EUR'>('DZD');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Compute availability for each vehicle given the dates
  const vehiclesWithAvailability = vehicles.map((v) => ({
    ...v,
    isAvailableForSelectedDates: isVehicleAvailableForDates(v, startDate, endDate),
  }));

  // Filter and sort logic
  const filteredVehicles = vehiclesWithAvailability
    .filter((v) => {
      // Category filter
      if (selectedCategory !== 'Tous' && v.category !== selectedCategory) {
        return false;
      }
      // Transmission filter
      if (selectedTransmission !== 'All' && v.transmission !== selectedTransmission) {
        return false;
      }
      // AC filter
      if (acOnly && !v.hasAC) {
        return false;
      }
      // Price limit
      if (v.pricePerDay > maxPrice) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = v.name.toLowerCase().includes(query);
        const matchesBrand = v.brand.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand) return false;
      }
      // Only available filter
      if (onlyAvailable && !v.isAvailableForSelectedDates) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (priceSort === 'asc') return a.pricePerDay - b.pricePerDay;
      if (priceSort === 'desc') return b.pricePerDay - a.pricePerDay;
      return 0;
    });

  const hasActiveFilters =
    selectedCategory !== 'Tous' ||
    selectedTransmission !== 'All' ||
    acOnly ||
    priceSort !== 'none' ||
    maxPrice < 20000 ||
    searchQuery.trim() !== '' ||
    onlyAvailable;

  const resetFilters = () => {
    setSelectedCategory('Tous');
    setSelectedTransmission('All');
    setAcOnly(false);
    setPriceSort('none');
    setMaxPrice(20000);
    setSearchQuery('');
    setOnlyAvailable(false);
  };

  const availableCount = vehiclesWithAvailability.filter((v) => v.isAvailableForSelectedDates).length;

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  return (
    <section id="flotte" className="relative py-28 overflow-hidden bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Frosted Glass Container */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl mb-8 transition-colors duration-300">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-brand-orange font-mono text-xs font-bold tracking-wider">
                  ( 02 )
                </span>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-950 dark:text-slate-300 font-bold">
                  CATALOGUE DE NOTRE FLOTTE
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-950 dark:text-white transition-colors">
                CHOISISSEZ VOTRE <span className="text-brand-orange">VÉHICULE</span>.
              </h2>

              {/* Date period reminder banner */}
              <div className="inline-flex items-center gap-2 mt-3 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-950 dark:text-slate-200">
                <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                <span>
                  Dates : <strong className="text-slate-950 dark:text-white">{formatDateFR(startDate)}</strong> au <strong className="text-slate-950 dark:text-white">{formatDateFR(endDate)}</strong>
                </span>
                <span className="text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md font-bold ml-1 border border-emerald-300 dark:border-emerald-800/80">
                  {availableCount} disponible{availableCount > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Currency toggle DZD / EUR (Inspired by Drivly) */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 self-start md:self-end">
              <span className="text-[11px] font-mono font-bold text-slate-950 dark:text-slate-300 mr-2 pl-1">
                Monnaie :
              </span>
              <button
                onClick={() => setCurrency('DZD')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  currency === 'DZD'
                    ? 'bg-brand-orange text-white shadow-sm'
                    : 'text-slate-950 dark:text-slate-300 hover:text-brand-orange dark:hover:text-white font-bold'
                }`}
                title="Afficher en Dinars Algériens"
              >
                DZD (DA)
              </button>
              <button
                onClick={() => setCurrency('EUR')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  currency === 'EUR'
                    ? 'bg-brand-orange text-white shadow-sm'
                    : 'text-slate-950 dark:text-slate-300 hover:text-brand-orange dark:hover:text-white font-bold'
                }`}
                title="Afficher en Euros"
              >
                EUR (€)
              </button>
            </div>
          </div>

          {/* Multi-Criteria Filters Bar (Catégorie, Boîte, Climatisation, Prix, Tri) */}
          <div className="pt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* 1. Category Selector */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-slate-300 mb-1.5">
                  Type de véhicule
                </label>
                <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                        selectedCategory === cat
                          ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-sm border border-slate-300 dark:border-slate-600 font-black'
                          : 'text-slate-950 dark:text-slate-300 hover:text-brand-orange dark:hover:text-white font-bold'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Transmission Selector (Boîte de vitesse) */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-slate-300 mb-1.5">
                  Boîte de vitesse
                </label>
                <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
                  {[
                    { id: 'All', label: 'Toutes' },
                    { id: 'Automatique', label: 'Auto' },
                    { id: 'Manuelle', label: 'Manuelle' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTransmission(t.id as any)}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                        selectedTransmission === t.id
                          ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-sm border border-slate-300 dark:border-slate-600 font-black'
                          : 'text-slate-950 dark:text-slate-300 hover:text-brand-orange dark:hover:text-white font-bold'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Tri par Prix */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-slate-300 mb-1.5">
                  Trier par tarif
                </label>
                <select
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange cursor-pointer"
                >
                  <option value="none">Ordre par défaut</option>
                  <option value="asc">Prix croissant (Moins cher)</option>
                  <option value="desc">Prix décroissant (Haut de gamme)</option>
                </select>
              </div>

              {/* 4. Climatisation & Disponibilité toggles */}
              <div className="flex flex-col justify-end gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAcOnly(!acOnly)}
                    className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      acOnly
                        ? 'bg-blue-100 dark:bg-blue-950/60 border-blue-400 dark:border-blue-800 text-blue-950 dark:text-blue-300 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-950 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 font-bold'
                    }`}
                  >
                    <span>❄️ Climatisation</span>
                  </button>

                  <button
                    onClick={() => setOnlyAvailable(!onlyAvailable)}
                    className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      onlyAvailable
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-800 text-emerald-950 dark:text-emerald-300 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-950 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 font-bold'
                    }`}
                  >
                    <CheckCircle className={`w-3.5 h-3.5 ${onlyAvailable ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-950 dark:text-slate-400'}`} />
                    <span>Dispo</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Filter Status & Reset Action */}
            <div className="flex items-center justify-between pt-2 text-xs font-mono text-slate-950 dark:text-slate-300 font-bold border-t border-slate-200 dark:border-slate-800">
              <div>
                <span>Affichage de </span>
                <strong className="text-slate-950 dark:text-white font-black">{filteredVehicles.length}</strong>
                <span> véhicule{filteredVehicles.length > 1 ? 's' : ''}</span>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-brand-orange hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>✕ Réinitialiser les filtres</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              isAvailable={vehicle.isAvailableForSelectedDates}
              currency={currency}
              onSelect={handleSelectVehicle}
            />
          ))}
        </div>

        {/* Empty state if filtered */}
        {filteredVehicles.length === 0 && (
          <div className="text-center py-16 text-slate-900 bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
            <p className="text-base text-slate-950 dark:text-white font-bold">
              Aucun véhicule disponible pour les dates sélectionnées ({formatDateFR(startDate)} au {formatDateFR(endDate)}).
            </p>
            <p className="text-xs text-slate-900 dark:text-slate-300 font-medium">
              Essayez de décaler vos dates ou contactez directement Agence Tour au 0550 50 50 50.
            </p>
            <button
              onClick={() => setOnlyAvailable(false)}
              className="text-xs text-brand-orange hover:underline font-mono font-bold"
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
        onClose={() => {
          setIsModalOpen(false);
          setSelectedVehicle(null);
        }}
        initialStartDate={startDate}
        initialEndDate={endDate}
      />
    </section>
  );
}
