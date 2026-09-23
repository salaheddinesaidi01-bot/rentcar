import React from 'react';

const STEPS = [
  {
    stepNumber: '01',
    phase: 'ÉTAPE 01 • SAISIE',
    title: 'DATES & LIEU',
    description:
      'Définissez vos dates de prise en charge et choisissez votre point de remise : aéroport Messali Hadj, gare routière, centre-ville ou directement à domicile.',
  },
  {
    stepNumber: '02',
    phase: 'ÉTAPE 02 • VALIDATION',
    title: 'CONFIRMATION RAPIDE',
    description:
      'Salah Tour confirme immédiatement la disponibilité du véhicule par téléphone ou WhatsApp. Vos documents et votre contrat sont préparés à l\'avance.',
  },
  {
    stepNumber: '03',
    phase: 'ÉTAPE 03 • DÉPART',
    title: 'REMISE DES CLÉS',
    description:
      'Contrôle rapide du permis de conduire et de la pièce d\'identité, paiement sur place au moment de la récupération, et vous prenez la route en toute sérénité.',
  },
];

export default function StepsSection() {
  return (
    <section id="etapes" className="relative py-24 bg-midnight-950 border-t border-white/5 overflow-hidden">
      
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-brand-orange/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Badge matching mockup */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-brand-orange font-mono text-xs font-bold tracking-wider">
            ( 01 )
          </span>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
            PROCESSUS SIMPLE & SANS DÉPLACEMENT
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-14">
          RÉSERVEZ EN <span className="text-brand-orange">3 ÉTAPES</span> CHRONO.
        </h2>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="group relative rounded-xl glass-panel p-8 transition-all duration-300 hover:border-brand-orange/30 hover:bg-midnight-800/90 hud-bracket overflow-hidden"
            >
              {/* Outlined Watermark Number in background */}
              <div className="absolute right-4 top-4 select-none pointer-events-none watermark-number transition-all duration-500 group-hover:scale-105">
                {step.stepNumber}
              </div>

              {/* Card Content */}
              <div className="relative z-10 space-y-4">
                <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded">
                  {step.phase}
                </span>

                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-white group-hover:text-brand-light transition-colors">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed pt-1">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
