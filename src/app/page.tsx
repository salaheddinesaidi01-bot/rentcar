import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StepsSection from '@/components/StepsSection';
import FleetSection from '@/components/FleetSection';
import Footer from '@/components/Footer';
import { dbService } from '@/lib/db';
import { ShieldCheck, Sparkles, Clock, MapPin, Award, CheckCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const vehicles = await dbService.getVehicles();

  return (
    <div className="min-h-screen bg-midnight-950 text-slate-100 flex flex-col selection:bg-brand-orange selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section with "LOUEZ. ROULEZ." & Express Availability Widget */}
      <HeroSection />

      {/* 3 Steps Chrono Section */}
      <StepsSection />

      {/* Fleet Catalog Section */}
      <FleetSection vehicles={vehicles} />

      {/* Value Proposition / Why Choose Salah Tour */}
      <section className="py-24 bg-midnight-950 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="flex items-center justify-center gap-2">
              <span className="text-brand-orange font-mono text-xs font-bold tracking-wider">
                ( 03 )
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
                L&apos;ENGAGEMENT QUALITÉ SALAH TOUR
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white">
              POURQUOI ROULER <span className="text-brand-orange">AVEC NOUS</span> ?
            </h2>
            <p className="text-sm text-slate-400">
              Profitez d&apos;un service de location sans intermédiaire, avec des véhicules récents, propres et révisés avant chaque départ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-3 hover:border-brand-orange/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Véhicules Récentes</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Flotte 2023 - 2024 régulièrement révisée, climatisée et désinfectée minutieusement avant chaque remise de clés.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-3 hover:border-brand-orange/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Remise Directe Zenata</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Accueil personnalisé dès votre sortie du terminal à l&apos;Aéroport Messali Hadj avec le véhicule prêt sur le parking.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-3 hover:border-brand-orange/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Rapidité 2 Min Chrono</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Contrat préparé en amont. En 2 minutes de vérification de permis, vous repartez au volant sans attente inutile.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-3 hover:border-brand-orange/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Paiement sur Place</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pas de prélèvement bancaire préalable : paiement sur place en espèces à la remise des clés en toute transparence.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
