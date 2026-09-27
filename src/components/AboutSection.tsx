'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Award, CheckCircle2 } from 'lucide-react';

const VALUES = [
  {
    icon: HeartHandshake,
    tag: 'PROXIMITÉ & ACCUEIL',
    title: 'Une Agence 100% Locale',
    description:
      'Implantée en plein cœur de Tlemcen, Agence Tour est une agence indépendante. Nous privilégions le contact humain direct, le conseil personnalisé et un accueil chaleureux pour tous nos clients locaux et de la diaspora.',
  },
  {
    icon: Award,
    tag: 'RIGUEUR & SÉCURITÉ',
    title: 'Exigence & Flotte Récente',
    description:
      'Nos véhicules (modèles 2023 - 2024) font l\'objet d\'un contrôle technique strict, d\'un entretien régulier et d\'un nettoyage méticuleux avant chaque mise à disposition. Climatisation, sécurité et confort sont garantis.',
  },
  {
    icon: ShieldCheck,
    tag: 'CONFIANCE & CLARTÉ',
    title: 'Transparence & Zéro Surprise',
    description:
      'Des tarifs clairs fixés par jour, sans frais cachés ni clauses complexes. Vous vérifiez votre véhicule à l\'agence et réglez sur place au moment de la remise des clés en toute sérénité.',
  },
];

const STATS = [
  { value: '+10', label: "Années d'expérience locale" },
  { value: '100%', label: 'Flotte révisée & climatisée' },
  { value: '2 min', label: 'Temps moyen de remise des clés' },
  { value: '7j / 7', label: 'Assistance & accueil à l\'agence' },
];

export default function AboutSection() {
  return (
    <section id="a-propos" className="relative py-28 bg-white border-t border-slate-200/80 overflow-hidden">
      
      {/* Background Sharp Driving Car in Mountains with Road Shadow - ZERO BLUR, 100% CRISP */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          whileInView={{ opacity: 1, scale: [1, 1.025, 1] }}
          viewport={{ once: true }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 16, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute inset-0 w-full h-full bg-cover bg-center sm:bg-[center_top] bg-no-repeat"
          style={{
            backgroundImage: `url('/images/about-driving-car.jpg')`,
          }}
        />

        {/* Soft elegant light wash keeping car, road, and mountains clearly visible behind content */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/75 to-slate-100/95" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-3"
        >
          <span className="text-brand-orange font-mono text-xs font-bold tracking-wider">
            ( 04 )
          </span>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
            NOTRE HISTOIRE & ENGAGEMENT
          </span>
        </motion.div>

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
            À PROPOS DE <span className="text-brand-orange">AGENCE TOUR</span>.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Votre partenaire de confiance pour explorer Tlemcen et ses environs en toute liberté. Fondée sur des valeurs de transparence et de convivialité, notre agence met à votre disposition des citadines et berlines de premier choix.
          </p>
        </motion.div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -6, borderColor: 'rgba(255, 107, 0, 0.4)' }}
                className="group relative rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-8 transition-all duration-300 hover:shadow-xl hud-bracket overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded">
                    {val.tag}
                  </span>

                  <h3 className="text-xl font-black uppercase tracking-wide text-slate-900 group-hover:text-brand-orange transition-colors">
                    {val.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed pt-1">
                    {val.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-200/70 mt-6 flex items-center gap-2 text-xs font-mono text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Engagement Agence Tour</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-brand-orange tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-slate-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
