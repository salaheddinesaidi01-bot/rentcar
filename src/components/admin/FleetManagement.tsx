'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Vehicle } from '@/types';
import { formatDA } from '@/lib/utils';
import { Car, Check, X, Edit2, Save, RefreshCw } from 'lucide-react';

interface FleetManagementProps {
  initialVehicles: Vehicle[];
}

export default function FleetManagement({ initialVehicles }: FleetManagementProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);

  const handleToggle = async (id: string) => {
    setLoadingId(id);
    try {
      const res = await fetch('/api/vehicles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'toggle-availability' }),
      });
      if (res.ok) {
        const updated = await res.json();
        setVehicles((prev) =>
          prev.map((v) => (v.id === id ? { ...v, available: updated.available } : v))
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

  const startEditPrice = (vehicle: Vehicle) => {
    setEditingPriceId(vehicle.id);
    setNewPrice(vehicle.pricePerDay);
  };

  const handleSavePrice = async (id: string) => {
    if (newPrice <= 0) return;
    setLoadingId(id);
    try {
      const res = await fetch('/api/vehicles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'update-price', price: newPrice }),
      });
      if (res.ok) {
        const updated = await res.json();
        setVehicles((prev) =>
          prev.map((v) => (v.id === id ? { ...v, pricePerDay: updated.pricePerDay } : v))
        );
        setEditingPriceId(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black uppercase tracking-wider text-white flex items-center gap-2">
          <Car className="w-5 h-5 text-brand-orange" />
          <span>Gestion du Parc Automobile ({vehicles.length} Véhicules)</span>
        </h2>
      </div>

      <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-midnight-950 text-slate-400 uppercase font-mono text-[11px] border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Véhicule</th>
                <th className="px-6 py-4">Catégorie</th>
                <th className="px-6 py-4">Immatriculation</th>
                <th className="px-6 py-4">Boîte / Carburant</th>
                <th className="px-6 py-4">Tarif Journalier</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Action Disponibilité</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-white/[0.02] transition-colors">
                  
                  {/* Photo & Name */}
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="relative w-16 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-midnight-900 border border-white/10">
                      <Image
                        src={v.imageUrl}
                        alt={v.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{v.name}</div>
                      <div className="text-[11px] text-slate-400">Année {v.year}</div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded bg-white/5 font-mono text-slate-300 border border-white/5">
                      {v.category}
                    </span>
                  </td>

                  {/* Plate */}
                  <td className="px-6 py-4 font-mono text-slate-300">
                    {v.plateNumber || 'Non renseigné'}
                  </td>

                  {/* Specs */}
                  <td className="px-6 py-4 text-slate-300">
                    <div>{v.transmission}</div>
                    <div className="text-slate-400 text-[11px]">{v.fuel}</div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">
                    {editingPriceId === v.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={newPrice}
                          onChange={(e) => setNewPrice(Number(e.target.value))}
                          className="w-24 h-8 bg-midnight-950 border border-brand-orange rounded px-2 text-xs text-white"
                        />
                        <button
                          onClick={() => handleSavePrice(v.id)}
                          className="p-1.5 rounded bg-emerald-600 text-white hover:bg-emerald-500"
                        >
                          <Save className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingPriceId(null)}
                          className="p-1.5 rounded bg-white/10 text-slate-400 hover:text-white"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-brand-orange">
                          {formatDA(v.pricePerDay)}
                        </span>
                        <button
                          onClick={() => startEditPrice(v)}
                          className="p-1 rounded text-slate-500 hover:text-slate-300"
                          title="Modifier le prix"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Availability badge */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold ${
                        v.available
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          v.available ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                        }`}
                      />
                      {v.available ? 'Disponible' : 'Indisponible'}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleToggle(v.id)}
                      disabled={loadingId === v.id}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        v.available
                          ? 'bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/40'
                          : 'bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/40'
                      }`}
                    >
                      {loadingId === v.id ? (
                        <RefreshCw className="w-3 h-3 animate-spin" />
                      ) : v.available ? (
                        'Mettre en maintenance'
                      ) : (
                        'Rendre disponible'
                      )}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
