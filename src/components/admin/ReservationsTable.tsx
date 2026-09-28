'use client';

import React, { useState } from 'react';
import { Reservation, ReservationStatus } from '@/types';
import { formatDA, formatDateTimeFR } from '@/lib/utils';
import { MessageSquare, Check, X, Clock, CheckCheck, RefreshCw, Printer } from 'lucide-react';
import RentalContractModal from './RentalContractModal';

interface ReservationsTableProps {
  initialReservations: Reservation[];
}

export default function ReservationsTable({
  initialReservations,
}: ReservationsTableProps) {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [filter, setFilter] = useState<string>('ALL');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedContractRes, setSelectedContractRes] = useState<Reservation | null>(null);

  const filtered = reservations.filter((r) => {
    if (filter === 'ALL') return true;
    return r.status === filter;
  });

  const handleStatusChange = async (id: string, newStatus: ReservationStatus) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updated = await res.json();
        setReservations((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: updated.status } : item))
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusBadge = (status: ReservationStatus) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 animate-pulse" />
            <span>En attente</span>
          </span>
        );
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Check className="w-3 h-3" />
            <span>Confirmée</span>
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <CheckCheck className="w-3 h-3" />
            <span>Terminée</span>
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <X className="w-3 h-3" />
            <span>Annulée</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {[
            { id: 'ALL', label: 'Toutes' },
            { id: 'PENDING', label: 'En attente' },
            { id: 'CONFIRMED', label: 'Confirmées' },
            { id: 'COMPLETED', label: 'Terminées' },
            { id: 'CANCELLED', label: 'Annulées' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                filter === tab.id
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-slate-500">
          Total : <span className="text-slate-900 font-bold">{filtered.length}</span> réservation(s)
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-100/80 text-slate-700 uppercase font-mono text-[11px] border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold">Client</th>
                <th className="px-6 py-4 font-bold">Véhicule</th>
                <th className="px-6 py-4 font-bold">Période & Durée</th>
                <th className="px-6 py-4 font-bold">Prise en charge</th>
                <th className="px-6 py-4 font-bold">Montant</th>
                <th className="px-6 py-4 font-bold">Statut</th>
                <th className="px-6 py-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((res) => (
                <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Client info */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 text-sm">{res.customerName}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <a
                        href={`https://wa.me/${res.customerPhone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 hover:underline font-mono font-medium"
                      >
                        <MessageSquare className="w-3 h-3 fill-emerald-600" />
                        <span>{res.customerPhone}</span>
                      </a>
                    </div>
                    {res.notes && (
                      <div className="text-[11px] text-slate-500 mt-1 italic">
                        Note: {res.notes}
                      </div>
                    )}
                  </td>

                  {/* Vehicle */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">
                      {res.vehicle?.name || 'Véhicule'}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {res.vehicle?.category}
                    </div>
                  </td>

                  {/* Dates */}
                  <td className="px-6 py-4 space-y-0.5 text-slate-700">
                    <div>Du {formatDateTimeFR(res.startDate)}</div>
                    <div>Au {formatDateTimeFR(res.endDate)}</div>
                    <div className="text-brand-orange font-mono font-bold text-[11px]">
                      {res.totalDays} jour(s)
                    </div>
                  </td>

                  {/* Pickup location */}
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-800">{res.pickupLocation}</span>
                  </td>

                  {/* Total price */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-black text-brand-orange">
                      {formatDA(res.totalPrice)}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Sur place
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">{getStatusBadge(res.status)}</td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Print Contract Button */}
                      <button
                        onClick={() => setSelectedContractRes(res)}
                        className="px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                        title="Imprimer le contrat officiel et la fiche d'état des lieux"
                      >
                        <Printer className="w-3.5 h-3.5 text-brand-orange" />
                        <span className="hidden sm:inline">Contrat</span>
                      </button>

                      {res.status === 'PENDING' && (
                        <button
                          onClick={() => handleStatusChange(res.id, 'CONFIRMED')}
                          disabled={loadingId === res.id}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                          title="Confirmer la réservation (bloque automatiquement la période)"
                        >
                          {loadingId === res.id ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <Check className="w-3 h-3" />
                          )}
                          <span>Confirmer</span>
                        </button>
                      )}

                      {res.status === 'CONFIRMED' && (
                        <button
                          onClick={() => handleStatusChange(res.id, 'COMPLETED')}
                          disabled={loadingId === res.id}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                          title="Marquer comme terminée"
                        >
                          <CheckCheck className="w-3 h-3" />
                          <span>Terminer</span>
                        </button>
                      )}

                      {res.status !== 'CANCELLED' && (
                        <button
                          onClick={() => handleStatusChange(res.id, 'CANCELLED')}
                          disabled={loadingId === res.id}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                          title="Annuler la réservation (libère automatiquement la période)"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>

                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    Aucune réservation trouvée dans cette catégorie.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Rental Contract & Inspection Modal */}
      <RentalContractModal
        reservation={selectedContractRes}
        isOpen={Boolean(selectedContractRes)}
        onClose={() => setSelectedContractRes(null)}
      />
    </div>
  );
}
