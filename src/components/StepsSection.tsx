'use client';

import React from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    stepNumber: '01',
    phase: 'ÉTAPE 01 • VÉRIFICATION',
    title: 'CHOIX DES DATES',
    description:
      'Indiquez vos dates de départ et de retour pour filtrer et afficher instantanément les véhicules réellement disponibles à l\'agence.',
  },
  {
    stepNumber: '02',
    phase: 'ÉTAPE 02 • VALIDATION',
    title: 'CONFIRMATION RAPIDE',
    description:
      'Salah Tour confirme immédiatement votre réservation par téléphone ou WhatsApp. Vos documents et votre contrat sont préparés à l\'avance.',
  },
  {
    stepNumber: '03',
    phase: 'ÉTAPE 03 • DÉPART',
    title: 'RETRAIT À L\'AGENCE',
    description:
      'Passez récupérer les clés directement à notre agence à Tlemcen. Contrôle rapide du permis, paiement sur place et vous prenez la route en 2 min chrono.',
  },
];

export default function StepsSection() {
  return (
    <section id="etapes" className="relative py-24 bg-midnight-950 border-t border-white/5 overflow-hidden">
      
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-brand-orange/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Badge matching mockup */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-3"
        >
          <span className="text-brand-orange font-mono text-xs font-bold tracking-wider">
            ( 01 )
          </span>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
            PROCESSUS SIMPLE & RETRAIT DIRECT EN AGENCE
          </span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-14"
        >
          RÉSERVEZ EN <span className="text-brand-orange">3 ÉTAPES</span> CHRONO.
        </motion.h2>

        {/* 3 Step Cards Grid with animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.stepNumber}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6, borderColor: 'rgba(255, 107, 0, 0.4)' }}
              className="group relative rounded-xl glass-panel p-8 transition-all duration-300 hover:bg-midnight-800/90 hud-bracket overflow-hidden"
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
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
