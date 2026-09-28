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
import FloatingContactButton from '@/components/FloatingContactButton';
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
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col relative selection:bg-brand-orange selection:text-white transition-colors duration-300">
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

        {/* Global Contrast Tint ensuring 100% legibility in both Light & Dark modes */}
        <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/40 transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/20 to-slate-100/90 dark:from-slate-950/70 dark:via-slate-950/30 dark:to-slate-950/80 transition-colors duration-500" />
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

      {/* 7. FAQ Accordion (Vos Questions) */}
      <FaqSection />

      {/* 8. À Propos de Nous (About Us) Section */}
      <AboutSection />

      {/* 9. Footer */}
      <Footer />

      {/* 10. Floating WhatsApp & Hotline Button */}
      <FloatingContactButton />
    </div>
  );
}
