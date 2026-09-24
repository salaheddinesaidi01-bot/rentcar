'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Calendar, CheckCircle, MessageSquare, ShieldCheck, AlertCircle, Phone, Building2 } from 'lucide-react';
import { Vehicle } from '@/types';
import { formatDA, calculateRentalDays, buildWhatsAppLink, formatDateFR } from '@/lib/utils';
import VehicleAvailabilityCalendar from './VehicleAvailabilityCalendar';

interface BookingModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  initialStartDate?: string;
  initialEndDate?: string;
}

export default function BookingModal({
  vehicle,
  isOpen,
  onClose,
  initialStartDate = '2026-09-24',
  initialEndDate = '2026-09-27',
}: BookingModalProps) {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close on Escape key press and manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Sync dates if initial dates change
  useEffect(() => {
    if (initialStartDate) setStartDate(initialStartDate);
    if (initialEndDate) setEndDate(initialEndDate);
  }, [initialStartDate, initialEndDate]);

  if (!isOpen || !vehicle) return null;

  const rentalDays = calculateRentalDays(startDate, endDate);
  const totalPrice = rentalDays * vehicle.pricePerDay;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setError('Veuillez renseigner votre nom et votre numéro de téléphone.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: vehicle.id,
          customerName,
          customerPhone,
          startDate,
          endDate,
          totalDays: rentalDays,
          totalPrice,
          notes: notes || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error('Erreur lors de l\'enregistrement de votre réservation.');
      }

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappDirectLink = buildWhatsAppLink({
    vehicleName: vehicle.name,
    startDate,
    endDate,
    days: rentalDays,
    totalPrice,
    customerName: customerName || undefined,
  });

  return (
    <div
      onClick={(e) => {
        // Close if backdrop clicked directly
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto cursor-pointer animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-6 cursor-default max-h-[92vh] flex flex-col"
      >
        
        {/* Modal Top Bar - Sticky & Unmissable Close */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-ping" />
            <div>
              <h3 className="text-base font-black uppercase tracking-wider text-slate-900">
                Réservation • {vehicle.name}
              </h3>
              <p className="text-[11px] font-mono text-slate-500">
                Salah Tour Tlemcen • Retrait en agence
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-200/80 hover:bg-rose-100 text-slate-700 hover:text-rose-700 border border-slate-300 hover:border-rose-300 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer"
            title="Fermer la fenêtre (ou touche Échap)"
          >
            <X className="w-4 h-4" />
            <span>Fermer</span>
          </button>
        </div>

        {/* Success View */}
        {success ? (
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-slate-900">Réservation Confirmée !</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Merci <span className="text-brand-orange font-bold">{customerName}</span>. Salah Tour prépare votre contrat pour votre <span className="font-bold text-slate-900">{vehicle.name}</span>. Retrait prévu à l&apos;agence de Tlemcen.
              </p>
            </div>

            {/* Recap Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs font-mono space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Véhicule :</span>
                <span className="text-slate-900 font-bold">{vehicle.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Période :</span>
                <span className="text-slate-800">Du {formatDateFR(startDate)} au {formatDateFR(endDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Durée :</span>
                <span className="text-brand-orange font-bold">{rentalDays} jour(s)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm">
                <span className="text-slate-900 font-bold">Total estimé :</span>
                <span className="text-brand-orange font-black">{formatDA(totalPrice)}</span>
              </div>
            </div>

            {/* Direct WhatsApp Confirmation Button */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Ouvrir WhatsApp maintenant</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form View */
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
            
            {/* Selected Vehicle Overview */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                <Image
                  src={vehicle.imageUrl}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">{vehicle.name}</h4>
                <div className="text-xs text-slate-500">
                  {vehicle.category} • Boîte {vehicle.transmission} • {vehicle.fuel}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-slate-400">Tarif</div>
                <div className="text-base font-black text-brand-orange">
                  {formatDA(vehicle.pricePerDay)}/j
                </div>
              </div>
            </div>

            {/* Retrait à l'agence rappel */}
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-orange-50/60 border border-orange-200/60 text-xs text-slate-700">
              <Building2 className="w-4 h-4 text-brand-orange flex-shrink-0" />
              <span>Retrait & Paiement sur place à l&apos;Agence Salah Tour (Tlemcen Centre)</span>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Visual Availability Calendar (Green = Available, Red = Booked) */}
            <div className="pt-1">
              <VehicleAvailabilityCalendar
                vehicle={vehicle}
                selectedStartDate={startDate}
                selectedEndDate={endDate}
                onSelectDates={(newStart, newEnd) => {
                  setStartDate(newStart);
                  setEndDate(newEnd);
                }}
              />
            </div>

            {/* Date Pickers Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-600 mb-1 font-semibold">
                  Date de début
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={startDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full h-11 bg-white border border-slate-300 rounded-lg px-3 pl-9 text-xs text-slate-900 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange focus:outline-none"
                  />
                  <Calendar className="w-3.5 h-3.5 text-brand-orange absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-600 mb-1 font-semibold">
                  Date de fin
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={endDate}
                    min={startDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full h-11 bg-white border border-slate-300 rounded-lg px-3 pl-9 text-xs text-slate-900 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange focus:outline-none"
                  />
                  <Calendar className="w-3.5 h-3.5 text-brand-orange absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Customer Contact */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-700 mb-1 font-medium">
                    Nom & Prénom <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: Karim Benali"
                    className="w-full h-11 bg-white border border-slate-300 rounded-lg px-3 text-xs text-slate-900 focus:border-brand-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-700 mb-1 font-medium">
                    Téléphone / WhatsApp <span className="text-brand-orange">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="05.. / 06.. / 07.."
                      className="w-full h-11 bg-white border border-slate-300 rounded-lg px-3 pl-9 text-xs text-slate-900 focus:border-brand-orange focus:outline-none"
                    />
                    <Phone className="w-3.5 h-3.5 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-700 mb-1 font-medium">
                  Remarques particulières (optionnel)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Passe à l'agence vers 11h"
                  className="w-full h-11 bg-white border border-slate-300 rounded-lg px-3 text-xs text-slate-900 focus:border-brand-orange focus:outline-none"
                />
              </div>
            </div>

            {/* Price calculation summary */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-600">
                  Durée : <span className="text-slate-900 font-bold">{rentalDays} jours</span> × {formatDA(vehicle.pricePerDay)}
                </div>
                <div className="text-[11px] text-emerald-700 flex items-center gap-1 mt-0.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Paiement sur place à la remise des clés</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] font-mono text-slate-500 uppercase">Montant Total</div>
                <div className="text-2xl font-black text-brand-orange">
                  {formatDA(totalPrice)}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Enregistrement en cours...' : 'Confirmer Ma Réservation'}
              </button>

              <a
                href={whatsappDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:w-auto px-5 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Direct</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="sm:w-auto px-5 h-12 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
                <span>Annuler</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
