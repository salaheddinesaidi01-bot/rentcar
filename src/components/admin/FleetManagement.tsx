'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Vehicle, DateRange } from '@/types';
import { formatDA, formatDateFR } from '@/lib/utils';
import VehicleAvailabilityCalendar from '@/components/VehicleAvailabilityCalendar';
import {
  Car,
  Plus,
  Calendar,
  X,
  Check,
  Edit2,
  Trash2,
  Snowflake,
  Fuel,
  Gauge,
  Users,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface FleetManagementProps {
  initialVehicles: Vehicle[];
}

export default function FleetManagement({ initialVehicles }: FleetManagementProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Add vehicle modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    brand: 'Renault',
    category: 'Citadine' as Vehicle['category'],
    transmission: 'Manuelle' as Vehicle['transmission'],
    fuel: 'Essence' as Vehicle['fuel'],
    seats: 5,
    hasAC: true,
    pricePerDay: 7000,
    year: 2024,
    plateNumber: '',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
  });

  // Date blocking modal state for a specific car
  const [blockingVehicle, setBlockingVehicle] = useState<Vehicle | null>(null);
  const [blockStart, setBlockStart] = useState('');
  const [blockEnd, setBlockEnd] = useState('');

  // Edit vehicle characteristics modal
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  // Toggle general availability
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

  // Add blocked date range
  const handleAddBlockedDate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockingVehicle || !blockStart || !blockEnd) return;

    setLoadingId(blockingVehicle.id);
    try {
      const res = await fetch('/api/vehicles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: blockingVehicle.id,
          action: 'block-dates',
          range: { startDate: blockStart, endDate: blockEnd },
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setVehicles((prev) =>
          prev.map((v) => (v.id === blockingVehicle.id ? updated : v))
        );
        setBlockingVehicle(updated);
        setBlockStart('');
        setBlockEnd('');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

// Remove blocked date range
  const handleRemoveBlockedDate = async (vehId: string, index: number) => {
    setLoadingId(vehId);
    try {
      const res = await fetch('/api/vehicles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: vehId,
          action: 'unblock-dates',
          index,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setVehicles((prev) =>
          prev.map((v) => (v.id === vehId ? updated : v))
        );
        if (blockingVehicle?.id === vehId) {
          setBlockingVehicle(updated);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

  // Toggle single date from calendar click (admin mode: click day -> turn Red or Green)
  const handleToggleSingleDateBlock = async (dateStr: string) => {
    if (!blockingVehicle) return;
    setLoadingId(blockingVehicle.id);
    try {
      const res = await fetch('/api/vehicles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: blockingVehicle.id,
          action: 'toggle-date',
          dateStr,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setVehicles((prev) =>
          prev.map((v) => (v.id === blockingVehicle.id ? updated : v))
        );
        setBlockingVehicle(updated);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

  // Save edited vehicle characteristics
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle) return;

    setLoadingId(editingVehicle.id);
    try {
      const res = await fetch('/api/vehicles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingVehicle.id,
          action: 'update-details',
          updates: {
            name: editingVehicle.name,
            category: editingVehicle.category,
            transmission: editingVehicle.transmission,
            fuel: editingVehicle.fuel,
            seats: Number(editingVehicle.seats),
            hasAC: Boolean(editingVehicle.hasAC),
            pricePerDay: Number(editingVehicle.pricePerDay),
            plateNumber: editingVehicle.plateNumber,
            year: Number(editingVehicle.year),
            imageUrl: editingVehicle.imageUrl,
          },
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setVehicles((prev) =>
          prev.map((v) => (v.id === editingVehicle.id ? updated : v))
        );
        setEditingVehicle(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

  // Submit new vehicle
  const handleCreateVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingId('new');
    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVehicle),
      });

      if (res.ok) {
        const created = await res.json();
        setVehicles((prev) => [...prev, created]);
        setIsAddModalOpen(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <Car className="w-5 h-5 text-brand-orange" />
            <span>Catalogue & Disponibilités de la Flotte</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Gérez les véhicules, leurs caractéristiques (boîte, énergie, climatisation...) et planifiez les disponibilités par dates.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-amber text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-orange-500/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un Véhicule</span>
        </button>
      </div>

      {/* Vehicles Table / Cards */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-100/80 text-slate-700 uppercase font-mono text-[11px] border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold">Véhicule</th>
                <th className="px-6 py-4 font-bold">Catégorie</th>
                <th className="px-6 py-4 font-bold">Caractéristiques</th>
                <th className="px-6 py-4 font-bold">Tarif/Jour</th>
                <th className="px-6 py-4 font-bold">Disponibilité par Dates</th>
                <th className="px-6 py-4 font-bold">Statut</th>
                <th className="px-6 py-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Photo & Name */}
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                      <Image
                        src={v.imageUrl}
                        alt={v.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{v.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {v.plateNumber || `Modèle ${v.year}`}
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded bg-slate-100 font-mono text-slate-700 border border-slate-200 font-medium">
                      {v.category}
                    </span>
                  </td>

                  {/* Characteristics */}
                  <td className="px-6 py-4 space-y-1">
                    <div className="flex items-center gap-3 text-[11px]">
                      <span className="text-slate-900 font-medium">{v.transmission}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-600">{v.fuel}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-600">{v.seats} pl.</span>
                    </div>
                    <div className="text-[11px] flex items-center gap-1">
                      <Snowflake className={`w-3 h-3 ${v.hasAC ? 'text-cyan-600' : 'text-slate-400'}`} />
                      <span className={v.hasAC ? 'text-cyan-700 font-medium' : 'text-slate-400'}>
                        {v.hasAC ? 'Climatisé' : 'Sans clim'}
                      </span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-brand-orange">
                      {formatDA(v.pricePerDay)}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono block">/ jour</span>
                  </td>

                  {/* Dates blocked / Availability */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setBlockingVehicle(v)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-mono text-slate-700 transition-colors cursor-pointer"
                      title="Gérer les dates d'indisponibilité"
                    >
                      <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                      <span className="font-medium">
                        {v.blockedDates && v.blockedDates.length > 0
                          ? `${v.blockedDates.length} période(s) bloquée(s)`
                          : 'Disponible en continu'}
                      </span>
                    </button>
                  </td>

                  {/* Availability badge */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold ${
                        v.available
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          v.available ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                        }`}
                      />
                      {v.available ? 'Actif' : 'En pause'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingVehicle(v)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
                        title="Modifier les caractéristiques"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleToggle(v.id)}
                        disabled={loadingId === v.id}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          v.available
                            ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {loadingId === v.id ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : v.available ? (
                          'Désactiver'
                        ) : (
                          'Activer'
                        )}
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Gérer et planifier les dates de disponibilité pour une voiture */}
      {blockingVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-2xl my-6 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-orange" />
                  <span>Planification Calendrier : {blockingVehicle.name}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Planifiez les disponibilités selon les réservations. Cliquez directement sur un jour du calendrier pour basculer (Vert = Libre / Rouge = Réservé).
                </p>
              </div>
              <button
                onClick={() => setBlockingVehicle(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Admin Availability Calendar */}
            <div className="bg-white rounded-2xl p-1 text-slate-900">
              <VehicleAvailabilityCalendar
                vehicle={blockingVehicle}
                adminMode={true}
                onToggleDateBlock={handleToggleSingleDateBlock}
              />
            </div>

            {/* List of current blocked ranges */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-mono uppercase text-slate-700 font-bold">
                Périodes de réservation ou blocages enregistrés :
              </label>

              {(!blockingVehicle.blockedDates || blockingVehicle.blockedDates.length === 0) ? (
                <div className="text-xs text-emerald-800 p-3 rounded-lg bg-emerald-50 border border-emerald-200 font-medium">
                  ✓ Aucun blocage manuel ou réservation en cours : le véhicule est 100% libre (vert) sur toutes les dates.
                </div>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {blockingVehicle.blockedDates.map((range, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono"
                    >
                      <span className="text-rose-700 font-bold">
                        Période indisponible : Du {formatDateFR(range.startDate)} au {formatDateFR(range.endDate)}
                      </span>
                      <button
                        onClick={() => handleRemoveBlockedDate(blockingVehicle.id, idx)}
                        className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs flex items-center gap-1.5 transition-colors border border-rose-200 font-medium cursor-pointer"
                        title="Libérer cette période"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Libérer (Passer en Vert)</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form to add a new blocked period */}
            <form onSubmit={handleAddBlockedDate} className="pt-4 border-t border-slate-200 space-y-3">
              <label className="block text-xs font-mono uppercase text-slate-700 font-bold">
                Bloquer une nouvelle plage de dates selon une réservation :
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1 font-medium">Date de début</label>
                  <input
                    type="date"
                    required
                    value={blockStart}
                    onChange={(e) => setBlockStart(e.target.value)}
                    className="w-full h-10 bg-white border border-slate-300 rounded-lg px-2 text-xs text-slate-900 focus:border-brand-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1 font-medium">Date de fin</label>
                  <input
                    type="date"
                    required
                    value={blockEnd}
                    min={blockStart}
                    onChange={(e) => setBlockEnd(e.target.value)}
                    className="w-full h-10 bg-white border border-slate-300 rounded-lg px-2 text-xs text-slate-900 focus:border-brand-orange focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loadingId === blockingVehicle.id}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Enregistrer l&apos;indisponibilité (Rouge)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Modifier les caractéristiques d'un véhicule */}
      {editingVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-brand-orange" />
                <span>Modifier les Caractéristiques</span>
              </h3>
              <button
                onClick={() => setEditingVehicle(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">Nom du véhicule</label>
                <input
                  type="text"
                  required
                  value={editingVehicle.name}
                  onChange={(e) =>
                    setEditingVehicle({ ...editingVehicle, name: e.target.value })
                  }
                  className="w-full h-10 bg-white border border-slate-300 rounded-lg px-3 text-xs text-slate-900 focus:border-brand-orange focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-medium">Catégorie</label>
                  <select
                    value={editingVehicle.category}
                    onChange={(e) =>
                      setEditingVehicle({
                        ...editingVehicle,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full h-10 bg-white border border-slate-300 rounded-lg px-3 text-xs text-slate-900 focus:border-brand-orange focus:outline-none"
                  >
                    <option value="Citadine">Citadine</option>
                    <option value="Berline">Berline</option>
                    <option value="SUV">SUV</option>
                    <option value="Luxe">Luxe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-medium">Tarif journalier (DA)</label>
                  <input
                    type="number"
                    required
                    value={editingVehicle.pricePerDay}
                    onChange={(e) =>
                      setEditingVehicle({
                        ...editingVehicle,
                        pricePerDay: Number(e.target.value),
                      })
                    }
                    className="w-full h-10 bg-white border border-slate-300 rounded-lg px-3 text-xs text-slate-900 font-mono focus:border-brand-orange focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-medium">Boîte</label>
                  <select
                    value={editingVehicle.transmission}
                    onChange={(e) =>
                      setEditingVehicle({
                        ...editingVehicle,
                        transmission: e.target.value as any,
                      })
                    }
                    className="w-full h-10 bg-white border border-slate-300 rounded-lg px-2 text-xs text-slate-900 focus:border-brand-orange focus:outline-none"
                  >
                    <option value="Manuelle">Manuelle</option>
                    <option value="Automatique">Automatique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-medium">Énergie</label>
                  <select
                    value={editingVehicle.fuel}
                    onChange={(e) =>
                      setEditingVehicle({
                        ...editingVehicle,
                        fuel: e.target.value as any,
                      })
                    }
                    className="w-full h-10 bg-white border border-slate-300 rounded-lg px-2 text-xs text-slate-900 focus:border-brand-orange focus:outline-none"
                  >
                    <option value="Essence">Essence</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybride">Hybride</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-medium">Places</label>
                  <input
                    type="number"
                    value={editingVehicle.seats}
                    onChange={(e) =>
                      setEditingVehicle({
                        ...editingVehicle,
                        seats: Number(e.target.value),
                      })
                    }
                    className="w-full h-10 bg-white border border-slate-300 rounded-lg px-2 text-xs text-slate-900 focus:border-brand-orange focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-800">
                  <input
                    type="checkbox"
                    checked={editingVehicle.hasAC}
                    onChange={(e) =>
                      setEditingVehicle({
                        ...editingVehicle,
                        hasAC: e.target.checked,
                      })
                    }
                    className="rounded border-slate-300 text-brand-orange focus:ring-brand-orange"
                  />
                  <span>Équipé de la Climatisation (A/C)</span>
                </label>
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">Photo URL</label>
                <input
                  type="url"
                  value={editingVehicle.imageUrl}
                  onChange={(e) =>
                    setEditingVehicle({
                      ...editingVehicle,
                      imageUrl: e.target.value,
                    })
                  }
                  className="w-full h-10 bg-white border border-slate-300 rounded-lg px-3 text-xs text-slate-900 focus:border-brand-orange focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingVehicle(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer border border-slate-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loadingId === editingVehicle.id}
                  className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-amber text-white font-bold text-xs uppercase shadow-md cursor-pointer"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Ajouter un nouveau véhicule au catalogue */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-brand-orange" />
                <span>Ajouter un Véhicule à la Flotte</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVehicle} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">Modèle & Finition *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Renault Clio 5 Life"
                  value={newVehicle.name}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, name: e.target.value })
                  }
                  className="w-full h-10 bg-white border border-slate-300 rounded-lg px-3 text-xs text-slate-900 focus:border-brand-orange focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-medium">Catégorie *</label>
                  <select
                    value={newVehicle.category}
                    onChange={(e) =>
                      setNewVehicle({
                        ...newVehicle,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full h-10 bg-white border border-slate-300 rounded-lg px-3 text-xs text-slate-900 focus:border-brand-orange focus:outline-none"
                  >
                    <option value="Citadine">Citadine</option>
                    <option value="Berline">Berline</option>
                    <option value="SUV">SUV</option>
                    <option value="Luxe">Luxe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-medium">Tarif journalier (DA) *</label>
                  <input
                    type="number"
                    required
                    value={newVehicle.pricePerDay}
                    onChange={(e) =>
                      setNewVehicle({
                        ...newVehicle,
                        pricePerDay: Number(e.target.value),
                      })
                    }
                    className="w-full h-10 bg-white border border-slate-300 rounded-lg px-3 text-xs text-slate-900 font-mono focus:border-brand-orange focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-medium">Boîte</label>
                  <select
                    value={newVehicle.transmission}
                    onChange={(e) =>
                      setNewVehicle({
                        ...newVehicle,
                        transmission: e.target.value as any,
                      })
                    }
                    className="w-full h-10 bg-white border border-slate-300 rounded-lg px-2 text-xs text-slate-900 focus:border-brand-orange focus:outline-none"
                  >
                    <option value="Manuelle">Manuelle</option>
                    <option value="Automatique">Automatique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-medium">Énergie</label>
                  <select
                    value={newVehicle.fuel}
                    onChange={(e) =>
                      setNewVehicle({
                        ...newVehicle,
                        fuel: e.target.value as any,
                      })
                    }
                    className="w-full h-10 bg-white border border-slate-300 rounded-lg px-2 text-xs text-slate-900 focus:border-brand-orange focus:outline-none"
                  >
                    <option value="Essence">Essence</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybride">Hybride</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-medium">Places</label>
                  <input
                    type="number"
                    value={newVehicle.seats}
                    onChange={(e) =>
                      setNewVehicle({
                        ...newVehicle,
                        seats: Number(e.target.value),
                      })
                    }
                    className="w-full h-10 bg-white border border-slate-300 rounded-lg px-2 text-xs text-slate-900 focus:border-brand-orange focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-800">
                  <input
                    type="checkbox"
                    checked={newVehicle.hasAC}
                    onChange={(e) =>
                      setNewVehicle({
                        ...newVehicle,
                        hasAC: e.target.checked,
                      })
                    }
                    className="rounded border-slate-300 text-brand-orange focus:ring-brand-orange"
                  />
                  <span>Équipé de la Climatisation (A/C)</span>
                </label>
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">Photo URL</label>
                <input
                  type="url"
                  value={newVehicle.imageUrl}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      imageUrl: e.target.value,
                    })
                  }
                  className="w-full h-10 bg-white border border-slate-300 rounded-lg px-3 text-xs text-slate-900 focus:border-brand-orange focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loadingId === 'new'}
                  className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-amber text-white font-bold text-xs uppercase shadow-md cursor-pointer"
                >
                  Ajouter au catalogue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
