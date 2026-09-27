'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, Car, CalendarCheck, Shield, Wrench } from 'lucide-react';

export default function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          
          {/* Brand & Title */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voir le site</span>
            </Link>

            <div className="h-6 w-px bg-slate-200" />

            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-orange" />
              <div>
                <h1 className="text-sm font-black uppercase tracking-wider text-slate-900">
                  Agence Tour Admin
                </h1>
                <p className="text-[10px] font-mono text-slate-500">
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
                  ? 'bg-brand-orange text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Réservations</span>
            </Link>

            <Link
              href="/admin/flotte"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                pathname === '/admin/flotte'
                  ? 'bg-brand-orange text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Véhicules</span>
            </Link>

            <Link
              href="/admin/maintenance"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                pathname === '/admin/maintenance'
                  ? 'bg-brand-orange text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Maintenance</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
