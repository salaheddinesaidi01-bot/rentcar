'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, Car, CalendarCheck, Shield, ExternalLink } from 'lucide-react';

export default function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-white/10 bg-midnight-950/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          
          {/* Brand & Title */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voir le site</span>
            </Link>

            <div className="h-6 w-px bg-white/10" />

            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-orange" />
              <div>
                <h1 className="text-sm font-black uppercase tracking-wider text-white">
                  Salah Tour Admin
                </h1>
                <p className="text-[10px] font-mono text-slate-400">
                  Gestion Flotte & Réservations • Tlemcen
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                pathname === '/admin'
                  ? 'bg-brand-orange text-white shadow-glow-orange'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Réservations</span>
            </Link>

            <Link
              href="/admin/flotte"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                pathname === '/admin/flotte'
                  ? 'bg-brand-orange text-white shadow-glow-orange'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Véhicules</span>
            </Link>

            <a
              href="https://web.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 px-2.5 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 ml-2"
            >
              <span>WhatsApp Web</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
