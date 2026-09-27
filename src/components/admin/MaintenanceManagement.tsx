'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Wrench,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  Gauge,
  CheckCircle2,
  Clock,
  Edit3,
  Search,
  X,
  FileCheck,
  Building,
} from 'lucide-react';
import { Vehicle, VehicleMaintenance } from '@/types';

interface MaintenanceManagementProps {
  initialVehicles: Vehicle[];
}

export default function MaintenanceManagement({
  initialVehicles,
}: MaintenanceManagementProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAlertsOnly, setFilterAlertsOnly] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState<VehicleMaintenance>({
    currentMileage: 0,
    lastOilChangeKm: 0,
    nextOilChangeKm: 10000,
    lastOilChangeDate: '',
    insuranceExpiry: '',
    insuranceCompany: '',
    technicalInspectionExpiry: '',
    notes: '',
  });
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Helper calculations
  const calculateDaysRemaining = (dateStr?: string): number | null => {
    if (!dateStr) return null;
    const target = new Date(dateStr);
    const today = new Date();
    // Reset time components for clean day diff
    target.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getOilChangeStatus = (currentKm: number, nextKm: number) => {
    const diff = nextKm - currentKm;
    if (diff < 0) {
      return {
        label: `Dépassé de ${Math.abs(diff).toLocaleString('fr-FR')} km`,
        level: 'danger',
        diff,
      };
    }
    if (diff <= 1000) {
      return {
        label: `À faire bientôt (${diff.toLocaleString('fr-FR')} km restants)`,
        level: 'warning',
        diff,
      };
    }
    return {
      label: `À jour (${diff.toLocaleString('fr-FR')} km restants)`,
      level: 'good',
      diff,
    };
  };

  const getDaysStatus = (days: number | null) => {
    if (days === null) return { label: 'Non renseigné', level: 'neutral' };
    if (days < 0) {
      return {
        label: `Expiré depuis ${Math.abs(days)} j`,
        level: 'danger',
      };
    }
    if (days <= 30) {
      return {
        label: `Expire dans ${days} j`,
        level: 'warning',
      };
    }
    const months = Math.floor(days / 30);
    return {
      label: `Valide (${months > 0 ? `${months} mois` : `${days} j`})`,
      level: 'good',
    };
  };

  // KPI summaries
  const totalVehicles = vehicles.length;
  let urgentOilCount = 0;
  let urgentInsuranceCount = 0;
  let urgentInspectionCount = 0;

  vehicles.forEach((v) => {
    const m = v.maintenance;
    if (m) {
      if (m.nextOilChangeKm - m.currentMileage <= 1000) urgentOilCount++;
      const insDays = calculateDaysRemaining(m.insuranceExpiry);
      if (insDays !== null && insDays <= 30) urgentInsuranceCount++;
      const inspDays = calculateDaysRemaining(m.technicalInspectionExpiry);
      if (inspDays !== null && inspDays <= 30) urgentInspectionCount++;
    }
  });

  // Filter vehicles
  const filteredVehicles = vehicles.filter((v) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      v.name.toLowerCase().includes(query) ||
      v.brand.toLowerCase().includes(query) ||
      (v.plateNumber && v.plateNumber.toLowerCase().includes(query));

    if (!matchesSearch) return false;

    if (filterAlertsOnly) {
      const m = v.maintenance;
      if (!m) return true;
      const oilAlert = m.nextOilChangeKm - m.currentMileage <= 1000;
      const insDays = calculateDaysRemaining(m.insuranceExpiry);
      const insAlert = insDays !== null && insDays <= 30;
      const inspDays = calculateDaysRemaining(m.technicalInspectionExpiry);
      const inspAlert = inspDays !== null && inspDays <= 30;
      return oilAlert || insAlert || inspAlert;
    }

    return true;
  });

  const handleOpenEdit = (v: Vehicle) => {
    setEditingVehicle(v);
    setFormData({
      currentMileage: v.maintenance?.currentMileage || 0,
      lastOilChangeKm: v.maintenance?.lastOilChangeKm || 0,
      nextOilChangeKm: v.maintenance?.nextOilChangeKm || 10000,
      lastOilChangeDate: v.maintenance?.lastOilChangeDate || '',
      insuranceExpiry: v.maintenance?.insuranceExpiry || '',
      insuranceCompany: v.maintenance?.insuranceCompany || 'CAAT Assurances',
      technicalInspectionExpiry: v.maintenance?.technicalInspectionExpiry || '',
      notes: v.maintenance?.notes || '',
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle) return;

    setSaving(true);
    try {
      const res = await fetch('/api/vehicles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingVehicle.id,
          action: 'update-maintenance',
          maintenance: formData,
        }),
      });

      if (!res.ok) throw new Error('Échec de la sauvegarde');

      // Update local state
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === editingVehicle.id
            ? { ...v, maintenance: { ...formData } }
            : v
        )
      );

      showToast(`Maintenance mise à jour avec succès pour ${editingVehicle.name}`);
      setEditingVehicle(null);
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la mise à jour des données de maintenance.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-2.5">
            <Wrench className="w-6 h-6 text-brand-orange" />
            Suivi Maintenance de la Flotte
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-mono">
            Surveillance en temps réel des vidanges, assurances et contrôles techniques par véhicule
          </p>
        </div>

        {/* Quick Filter toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterAlertsOnly(!filterAlertsOnly)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              filterAlertsOnly
                ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300'
            }`}
          >
            {filterAlertsOnly ? '⚠️ Affichage : Alertes Uniquement' : 'Voir tout'}
          </button>
        </div>
      </div>

      {/* KPI Cards Row (Bright Light Theme) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Flotte */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Total Véhicules
            </div>
            <div className="text-3xl font-black text-slate-900 mt-1">
              {totalVehicles}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Véhicules répertoriés</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <Gauge className="w-6 h-6 text-slate-600" />
          </div>
        </div>

        {/* Vidanges à Prévoir */}
        <div className={`p-5 rounded-2xl border shadow-sm flex items-center justify-between ${
          urgentOilCount > 0 ? 'bg-amber-50/70 border-amber-200' : 'bg-white border-slate-200'
        }`}>
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700">
              Vidanges à Prévoir
            </div>
            <div className="text-3xl font-black text-amber-900 mt-1">
              {urgentOilCount}
            </div>
            <div className="text-[11px] text-amber-700 mt-0.5">Sous 1 000 km ou dépassé</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Wrench className="w-6 h-6" />
          </div>
        </div>

        {/* Assurances à Renouveler */}
        <div className={`p-5 rounded-2xl border shadow-sm flex items-center justify-between ${
          urgentInsuranceCount > 0 ? 'bg-rose-50/70 border-rose-200' : 'bg-white border-slate-200'
        }`}>
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-700">
              Assurances Urgentes
            </div>
            <div className="text-3xl font-black text-rose-900 mt-1">
              {urgentInsuranceCount}
            </div>
            <div className="text-[11px] text-rose-700 mt-0.5">Expire dans &lt; 30 jours</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>

        {/* Contrôles Techniques */}
        <div className={`p-5 rounded-2xl border shadow-sm flex items-center justify-between ${
          urgentInspectionCount > 0 ? 'bg-orange-50/70 border-orange-200' : 'bg-white border-slate-200'
        }`}>
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-orange-700">
              Contrôles Techniques
            </div>
            <div className="text-3xl font-black text-orange-900 mt-1">
              {urgentInspectionCount}
            </div>
            <div className="text-[11px] text-orange-700 mt-0.5">Échéance sous 30 jours</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher par véhicule, marque ou immatriculation..."
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange shadow-sm"
        />
      </div>

      {/* Maintenance Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-5">Véhicule</th>
                <th className="py-3.5 px-4">Kilométrage</th>
                <th className="py-3.5 px-4">Vidange Moteur</th>
                <th className="py-3.5 px-4">Assurance Auto</th>
                <th className="py-3.5 px-4">Contrôle Technique</th>
                <th className="py-3.5 px-4">Remarques</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredVehicles.map((vehicle) => {
                const m = vehicle.maintenance;
                const currentKm = m?.currentMileage || 0;
                const nextOilKm = m?.nextOilChangeKm || 10000;
                const oilStatus = getOilChangeStatus(currentKm, nextOilKm);

                const insDays = calculateDaysRemaining(m?.insuranceExpiry);
                const insStatus = getDaysStatus(insDays);

                const inspDays = calculateDaysRemaining(m?.technicalInspectionExpiry);
                const inspStatus = getDaysStatus(inspDays);

                return (
                  <tr key={vehicle.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Vehicle Identity */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                          <Image
                            src={vehicle.imageUrl}
                            alt={vehicle.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-black text-slate-900 leading-tight">
                            {vehicle.name}
                          </div>
                          <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                            {vehicle.plateNumber || 'Sans matricule'} • {vehicle.year}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Current Mileage */}
                    <td className="py-4 px-4">
                      <div className="font-mono font-bold text-slate-900 text-sm">
                        {currentKm.toLocaleString('fr-FR')} km
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">Compteur réel</div>
                    </td>

                    {/* Vidange Moteur */}
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono font-bold text-[11px] ${
                            oilStatus.level === 'danger'
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : oilStatus.level === 'warning'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          <Wrench className="w-3 h-3" />
                          <span>{oilStatus.label}</span>
                        </span>
                        <div className="text-[11px] text-slate-500 font-mono">
                          Prochain à : <span className="font-bold text-slate-800">{nextOilKm.toLocaleString('fr-FR')} km</span>
                        </div>
                        {m?.lastOilChangeDate && (
                          <div className="text-[10px] text-slate-400">
                            Dernier fait le : {m.lastOilChangeDate}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Assurance Auto */}
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono font-bold text-[11px] ${
                            insStatus.level === 'danger'
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : insStatus.level === 'warning'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {insStatus.level === 'danger' || insStatus.level === 'warning' ? (
                            <ShieldAlert className="w-3 h-3" />
                          ) : (
                            <ShieldCheck className="w-3 h-3" />
                          )}
                          <span>{insStatus.label}</span>
                        </span>
                        <div className="text-[11px] text-slate-800 font-medium">
                          {m?.insuranceCompany || 'Assurance non précisée'}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Échéance : {m?.insuranceExpiry || 'Non fixée'}
                        </div>
                      </div>
                    </td>

                    {/* Contrôle Technique */}
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono font-bold text-[11px] ${
                            inspStatus.level === 'danger'
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : inspStatus.level === 'warning'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          <FileCheck className="w-3 h-3" />
                          <span>{inspStatus.label}</span>
                        </span>
                        <div className="text-[10px] text-slate-500 font-mono">
                          Échéance : {m?.technicalInspectionExpiry || 'Non fixée'}
                        </div>
                      </div>
                    </td>

                    {/* Remarques / Carnet */}
                    <td className="py-4 px-4 max-w-[200px]">
                      <p className="text-[11px] text-slate-600 italic line-clamp-2">
                        {m?.notes || '—'}
                      </p>
                    </td>

                    {/* Edit Button */}
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => handleOpenEdit(vehicle)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-orange hover:text-white text-slate-700 font-bold text-xs transition-colors cursor-pointer border border-slate-200"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Modifier</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Maintenance Modal */}
      {editingVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase text-slate-900">
                    Mise à Jour Maintenance
                  </h3>
                  <p className="text-xs font-mono text-slate-500">
                    {editingVehicle.name} • {editingVehicle.plateNumber || 'Sans matricule'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingVehicle(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-6">
              {/* 1. Kilométrage & Vidange Section */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-orange flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <Gauge className="w-4 h-4" />
                  1. Kilométrage & Vidange
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Km Actuel
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.currentMileage}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentMileage: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Dernier Vidange (km)
                    </label>
                    <input
                      type="number"
                      value={formData.lastOilChangeKm}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lastOilChangeKm: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Prochain Vidange (km)
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.nextOilChangeKm}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nextOilChangeKm: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date du Dernier Vidange
                  </label>
                  <input
                    type="date"
                    value={formData.lastOilChangeDate || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lastOilChangeDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  />
                </div>
              </div>

              {/* 2. Assurance Section */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-orange flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <ShieldCheck className="w-4 h-4" />
                  2. Assurance Automobile
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Compagnie d&apos;Assurance
                    </label>
                    <input
                      type="text"
                      placeholder="ex: CAAT, SAA, CIAR..."
                      value={formData.insuranceCompany}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          insuranceCompany: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Date d&apos;Échéance Assurance
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.insuranceExpiry}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          insuranceExpiry: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Contrôle Technique Section */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-orange flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <FileCheck className="w-4 h-4" />
                  3. Contrôle Technique
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date d&apos;Expiration Contrôle Technique
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.technicalInspectionExpiry}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        technicalInspectionExpiry: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  />
                </div>
              </div>

              {/* 4. Notes / Carnet d'entretien */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Remarques & Travaux effectués
                </label>
                <textarea
                  rows={3}
                  placeholder="ex: Changement plaquettes de frein, filtres neufs..."
                  value={formData.notes || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-orange resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingVehicle(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-orange-500/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <span>Enregistrement...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Enregistrer les modifications</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
