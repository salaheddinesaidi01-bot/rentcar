'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, Menu, X, Car } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-midnight-950/85 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-orange to-brand-dark flex items-center justify-center shadow-glow-orange transition-transform duration-300"
            >
              <Car className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-wider text-white">SALAH</span>
                <span className="text-xl font-black tracking-wider text-brand-orange">TOUR</span>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-slate-400">
                Agence Location • Tlemcen
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#reservation"
              className="text-sm font-medium text-slate-300 hover:text-brand-orange transition-colors relative group py-1"
            >
              Vérifier Disponibilité
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#flotte"
              className="text-sm font-medium text-slate-300 hover:text-brand-orange transition-colors relative group py-1"
            >
              Nos Véhicules
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#agence"
              className="text-sm font-medium text-slate-300 hover:text-brand-orange transition-colors relative group py-1"
            >
              Localisation Agence
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#a-propos"
              className="text-sm font-medium text-slate-300 hover:text-brand-orange transition-colors relative group py-1"
            >
              À Propos de Nous
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* CTA WhatsApp & Direct Hotline */}
          <div className="hidden sm:flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://wa.me/213550505050"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-bold text-xs uppercase tracking-wider shadow-glow-orange hover:shadow-glow-orange-lg transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>0550 50 50 50</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-0.5" />
            </motion.a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-midnight-950/95 border-b border-white/10 px-4 pt-2 pb-6 space-y-3"
          >
            <a
              href="#reservation"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-brand-orange hover:bg-white/5"
            >
              Vérifier Disponibilité
            </a>
            <a
              href="#flotte"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-brand-orange hover:bg-white/5"
            >
              Nos Véhicules
            </a>
            <a
              href="#agence"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-brand-orange hover:bg-white/5"
            >
              Localisation Agence
            </a>
            <a
              href="#a-propos"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-brand-orange hover:bg-white/5"
            >
              À Propos de Nous
            </a>

            <div className="pt-4 border-t border-white/10">
              <a
                href="https://wa.me/213550505050"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-orange text-white font-bold text-xs uppercase tracking-wider shadow-glow-orange"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp / Appel 0550 50 50 50</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
