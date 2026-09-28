'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AvailabilitySection from '@/components/AvailabilitySection';
import FleetSection from '@/components/FleetSection';
import AboutSection from '@/components/AboutSection';
import ReviewsSection from '@/components/ReviewsSection';
import FaqSection from '@/components/FaqSection';
import MapSection from '@/components/MapSection';
import Footer from '@/components/Footer';
import { Vehicle } from '@/types';
import { isVehicleAvailableForDates } from '@/lib/utils';

interface HomeClientProps {
  initialVehicles: Vehicle[];
}

const GLOBAL_BACKGROUND_CARS = [
  {
    id: 'car-1',
    src: '/images/hero-driving-car.jpg',
  },
  {
    id: 'car-2',
    src: '/images/fleet-driving-car.jpg',
  },
];

export default function HomeClient({ initialVehicles }: HomeClientProps) {
  // Global date selection across the landing page
  const [startDate, setStartDate] = useState('2026-09-24');
  const [endDate, setEndDate] = useState('2026-09-27');
  const [activeCar, setActiveCar] = useState(0);

  // Auto-switch between photo 1 and photo 2 smoothly every 6 seconds across the entire site
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCar((prev) => (prev + 1) % GLOBAL_BACKGROUND_CARS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleDatesChange = (newStart: string, newEnd: string) => {
    setStartDate(newStart);
    setEndDate(newEnd);
  };

  // Synchronize available vehicles count automatically in real-time based on selected dates
  const availableCount = useMemo(() => {
    return initialVehicles.filter((v) => isVehicleAvailableForDates(v, startDate, endDate)).length;
  }, [initialVehicles, startDate, endDate]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-900 flex flex-col relative selection:bg-brand-orange selection:text-white">
      {/* 🚗 Global Animated Driving Car Background across ENTIRE site */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {GLOBAL_BACKGROUND_CARS.map((car, index) => (
          <motion.div
            key={car.id}
            initial={false}
            animate={{
              opacity: activeCar === index ? 1 : 0,
              scale: activeCar === index ? 1.02 : 1,
            }}
            transition={{
              opacity: { duration: 1.2, ease: 'easeInOut' },
              scale: { duration: 10, ease: 'easeInOut' },
            }}
            className="absolute inset-0 w-full h-full bg-cover bg-center sm:bg-[center_35%] bg-no-repeat"
            style={{
              backgroundImage: `url('${car.src}')`,
            }}
          />
        ))}

        {/* Global Dark Contrast Tint ensuring 100% legibility across all pages */}
        <div className="absolute inset-0 bg-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/30 to-slate-950/80" />
      </div>

      {/* 1. Top Navbar */}
      <Navbar />

      {/* 2. Hero Section (Clean majestic title + attractive copy, without badges, widget displayed on scroll) */}
      <HeroSection />

      {/* 3. Availability Section (Displays when scrolling down) */}
      <AvailabilitySection
        startDate={startDate}
        endDate={endDate}
        onDatesChange={handleDatesChange}
        availableCount={availableCount}
      />

      {/* 3. Fleet Catalog (Notre Flotte) */}
      <FleetSection
        vehicles={initialVehicles}
        startDate={startDate}
        endDate={endDate}
        onDatesChange={handleDatesChange}
      />

      {/* 4. Customer Reviews & Ratings (Les Avis) */}
      <ReviewsSection />

      {/* 5. Agency Location & Map */}
      <MapSection />

      {/* 6. FAQ Accordion (Vos Questions) */}
      <FaqSection />

      {/* 7. À Propos de Nous (About Us) Section */}
      <AboutSection />

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}
