import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import ReservationsTable from '@/components/admin/ReservationsTable';
import AdminAuthGate from '@/components/admin/AdminAuthGate';
import { dbService } from '@/lib/db';
import { formatDA } from '@/lib/utils';
import { CalendarCheck, Clock, CheckCircle2, DollarSign, Car } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const reservations = await dbService.getReservations();
  const vehicles = await dbService.getVehicles();

  const pendingReservations = reservations.filter((r) => r.status === 'PENDING').length;
  const confirmedReservations = reservations.filter((r) => r.status === 'CONFIRMED').length;
  const totalRevenue = reservations
    .filter((r) => r.status !== 'CANCELLED')
    .reduce((sum, r) => sum + r.totalPrice, 0);
  const availableVehicles = vehicles.filter((v) => v.available).length;

  return (
    <div className="min-h-screen bg-midnight-950 text-slate-100">
      <AdminAuthGate>
        <AdminHeader />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            
            <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-mono uppercase">En attente</span>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-amber-400">{pendingReservations}</div>
              <p className="text-[11px] text-slate-400">À confirmer en priorité</p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-mono uppercase">Confirmées</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-emerald-400">{confirmedReservations}</div>
              <p className="text-[11px] text-slate-400">Réservations validées</p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-mono uppercase">Chiffre d&apos;affaires</span>
                <div className="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-brand-orange">{formatDA(totalRevenue)}</div>
              <p className="text-[11px] text-slate-400">Total cumulé estimé</p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-mono uppercase">Flotte Active</span>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Car className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">
                {availableVehicles} <span className="text-sm font-normal text-slate-400">/ {vehicles.length}</span>
              </div>
              <p className="text-[11px] text-slate-400">Véhicules prêts à rouler</p>
            </div>

          </div>

          {/* Section Title */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-brand-orange" />
              <h2 className="text-xl font-black uppercase tracking-wider text-white">
                Gestion des Demandes de Réservation
              </h2>
            </div>
          </div>

          {/* Reservations Table */}
          <ReservationsTable initialReservations={reservations} />

        </main>
      </AdminAuthGate>
    </div>
  );
}
