'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, Shield, Menu, X, Car } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-orange to-brand-dark flex items-center justify-center shadow-glow-orange group-hover:scale-105 transition-transform duration-300">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-wider text-white">SALAH</span>
                <span className="text-xl font-black tracking-wider text-brand-orange">TOUR</span>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-slate-400">
                Location Auto • Tlemcen
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#reservation"
              className="text-sm font-medium text-slate-300 hover:text-brand-orange transition-colors"
            >
              Réservation Rapide
            </a>
            <a
              href="#etapes"
              className="text-sm font-medium text-slate-300 hover:text-brand-orange transition-colors"
            >
              3 Étapes Chrono
            </a>
            <a
              href="#flotte"
              className="text-sm font-medium text-slate-300 hover:text-brand-orange transition-colors"
            >
              Notre Flotte
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-slate-300 hover:text-brand-orange transition-colors"
            >
              Contact
            </a>
          </div>

          {/* CTA & Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
              title="Espace Gestion & Administration"
            >
              <Shield className="w-3.5 h-3.5 text-brand-amber" />
              <span>Admin</span>
            </Link>

            <a
              href="https://wa.me/213550505050"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-brand-orange to-brand-amber text-white font-semibold text-sm shadow-glow-orange hover:shadow-glow-orange-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>0550 50 50 50</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-midnight-950/95 border-b border-white/10 px-4 pt-2 pb-6 space-y-3">
          <a
            href="#reservation"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-brand-orange hover:bg-white/5"
          >
            Réservation Rapide
          </a>
          <a
            href="#etapes"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-brand-orange hover:bg-white/5"
          >
            3 Étapes Chrono
          </a>
          <a
            href="#flotte"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-brand-orange hover:bg-white/5"
          >
            Notre Flotte
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-brand-orange hover:bg-white/5"
          >
            Contact
          </a>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <a
              href="https://wa.me/213550505050"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-brand-orange text-white font-bold text-sm shadow-glow-orange"
            >
              <Phone className="w-4 h-4" />
              <span>Appeler / WhatsApp 0550 50 50 50</span>
            </a>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-white/5 text-slate-300 text-sm border border-white/10"
            >
              <Shield className="w-4 h-4 text-brand-amber" />
              <span>Espace Administration</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
