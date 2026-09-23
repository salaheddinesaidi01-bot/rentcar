'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FleetSection from '@/components/FleetSection';
import AboutSection from '@/components/AboutSection';
import MapSection from '@/components/MapSection';
import Footer from '@/components/Footer';
import { Vehicle } from '@/types';

interface HomeClientProps {
  initialVehicles: Vehicle[];
}

export default function HomeClient({ initialVehicles }: HomeClientProps) {
  // Global date selection across the landing page
  const [startDate, setStartDate] = useState('2026-09-24');
  const [endDate, setEndDate] = useState('2026-09-27');

  const handleDatesChange = (newStart: string, newEnd: string) => {
    setStartDate(newStart);
    setEndDate(newEnd);
  };

  return (
    <div className="min-h-screen bg-midnight-950 text-slate-100 flex flex-col selection:bg-brand-orange selection:text-white">
      {/* 1. Top Navbar with 'À Propos de Nous' as last item */}
      <Navbar />

      {/* 2. Hero Section with "LOUEZ. ROULEZ." & Express Availability Widget */}
      <HeroSection
        startDate={startDate}
        endDate={endDate}
        onDatesChange={handleDatesChange}
        availableCount={initialVehicles.length}
      />

      {/* 3. Fleet Catalog filtered by date availability & categories */}
      <FleetSection
        vehicles={initialVehicles}
        startDate={startDate}
        endDate={endDate}
        onDatesChange={handleDatesChange}
      />

      {/* 4. Localisation Agence & Google Maps */}
      <MapSection />

      {/* 5. À Propos de Nous (About Us) Section */}
      <AboutSection />

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
