'use client';

import React, { useState, useEffect } from 'react';
import { Lock, KeyRound, ShieldAlert, ArrowRight } from 'lucide-react';

interface AdminAuthGateProps {
  children: React.ReactNode;
}

export default function AdminAuthGate({ children }: AdminAuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const session = sessionStorage.getItem('salah_tour_admin_auth');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 13000 (Postal code of Tlemcen) or 'admin'
    if (pin === '13000' || pin === 'admin' || pin === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem('salah_tour_admin_auth', 'true');
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!mounted) return null;

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl glass-panel p-8 border border-white/10 shadow-2xl text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 text-brand-orange flex items-center justify-center mx-auto shadow-glow-orange">
          <Lock className="w-7 h-7" />
        </div>

        <div>
          <h2 className="text-xl font-black uppercase text-white tracking-wider">
            Espace Propriétaire
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Veuillez saisir votre code d&apos;accès administrateur pour gérer la flotte et les réservations.
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              autoFocus
              placeholder="Code d'accès (ex: 13000)"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              className="w-full h-12 bg-midnight-950 border border-white/15 rounded-xl px-4 text-center font-mono text-lg tracking-widest text-white focus:border-brand-orange focus:outline-none"
            />
            <KeyRound className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          {error && (
            <div className="text-xs text-rose-400 flex items-center justify-center gap-1.5 font-mono">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Code incorrect. Réessayez.</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-black text-xs uppercase tracking-wider shadow-glow-orange hover:shadow-glow-orange-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Déverrouiller l&apos;Espace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-slate-500 font-mono">
          Code par défaut : <strong className="text-slate-400">13000</strong> (Tlemcen)
        </p>
      </div>
    </div>
  );
}
