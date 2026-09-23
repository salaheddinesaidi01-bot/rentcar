'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Calendar, MapPin, CheckCircle, MessageSquare, ShieldCheck, AlertCircle, Phone } from 'lucide-react';
import { Vehicle, Location } from '@/types';
import { formatDA, calculateRentalDays, buildWhatsAppLink } from '@/lib/utils';

interface BookingModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  initialLocation?: string;
  initialStartDate?: string;
  initialEndDate?: string;
  locations?: Location[];
}

export default function BookingModal({
  vehicle,
  isOpen,
  onClose,
  initialLocation = 'Tlemcen Centre-Ville',
  initialStartDate = '2026-09-24T10:00',
  initialEndDate = '2026-09-27T10:00',
}: BookingModalProps) {
  const [pickupLocation, setPickupLocation] = useState(initialLocation);
  const [returnLocation, setReturnLocation] = useState(initialLocation);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          customerEmail: customerEmail || undefined,
          pickupLocation,
          returnLocation,
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
    pickupLocation,
    returnLocation,
    startDate,
    endDate,
    days: rentalDays,
    totalPrice,
    customerName: customerName || undefined,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-midnight-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-midnight-950/60">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-ping" />
            <h3 className="text-lg font-black uppercase tracking-wider text-white">
              Réservation Immédiate
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {success ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-white">Demande Enregistrée avec Succès !</h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Merci <span className="text-brand-orange font-bold">{customerName}</span>. Salah Tour confirme la disponibilité de votre <span className="font-bold text-white">{vehicle.name}</span> sous 2 minutes par téléphone ou WhatsApp.
              </p>
            </div>

            {/* Recap Box */}
            <div className="p-4 rounded-xl bg-midnight-950 border border-white/5 text-left text-xs font-mono space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">Véhicule :</span>
                <span className="text-white font-bold">{vehicle.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Prise en charge :</span>
                <span className="text-slate-200">{pickupLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Durée :</span>
                <span className="text-brand-orange font-bold">{rentalDays} jour(s)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10 text-sm">
                <span className="text-white font-bold">Total estimé :</span>
                <span className="text-brand-orange font-black">{formatDA(totalPrice)}</span>
              </div>
            </div>

            {/* Direct WhatsApp Confirmation Button */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Ouvrir dans WhatsApp maintenant</span>
              </a>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm transition-all"
              >
                Fermer
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form View */
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Selected Vehicle Overview */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-midnight-950/80 border border-white/5">
              <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-midnight-800">
                <Image
                  src={vehicle.imageUrl}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-bold text-white truncate">{vehicle.name}</h4>
                <div className="text-xs text-slate-400">
                  {vehicle.category} • {vehicle.transmission} • {vehicle.fuel}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-slate-400">Tarif</div>
                <div className="text-lg font-black text-brand-orange">
                  {formatDA(vehicle.pricePerDay)}
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Reservation details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Lieu de prise en charge
                </label>
                <div className="relative">
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full h-11 bg-midnight-950 border border-white/10 rounded-lg px-3 pl-9 text-xs text-white focus:border-brand-orange focus:outline-none"
                  >
                    <option value="Tlemcen Centre-Ville">Tlemcen Centre-Ville</option>
                    <option value="Aéroport Messali Hadj Tlemcen (Zenata)">Aéroport Messali Hadj Tlemcen (Zenata)</option>
                    <option value="Gare Routière Tlemcen">Gare Routière Tlemcen</option>
                    <option value="Livraison à Domicile (Grand Tlemcen)">Livraison à Domicile (Grand Tlemcen)</option>
                  </select>
                  <MapPin className="w-3.5 h-3.5 text-brand-orange absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Lieu de retour
                </label>
                <div className="relative">
                  <select
                    value={returnLocation}
                    onChange={(e) => setReturnLocation(e.target.value)}
                    className="w-full h-11 bg-midnight-950 border border-white/10 rounded-lg px-3 pl-9 text-xs text-white focus:border-brand-orange focus:outline-none"
                  >
                    <option value="Tlemcen Centre-Ville">Tlemcen Centre-Ville</option>
                    <option value="Aéroport Messali Hadj Tlemcen (Zenata)">Aéroport Messali Hadj Tlemcen (Zenata)</option>
                    <option value="Gare Routière Tlemcen">Gare Routière Tlemcen</option>
                    <option value="Livraison à Domicile (Grand Tlemcen)">Livraison à Domicile (Grand Tlemcen)</option>
                  </select>
                  <MapPin className="w-3.5 h-3.5 text-brand-orange absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Date de départ
                </label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full h-11 bg-midnight-950 border border-white/10 rounded-lg px-3 pl-9 text-xs text-white focus:border-brand-orange focus:outline-none [color-scheme:dark]"
                  />
                  <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Date de retour
                </label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full h-11 bg-midnight-950 border border-white/10 rounded-lg px-3 pl-9 text-xs text-white focus:border-brand-orange focus:outline-none [color-scheme:dark]"
                  />
                  <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Customer Contact */}
            <div className="pt-4 border-t border-white/5 space-y-4">
              <h5 className="text-xs font-mono uppercase tracking-wider text-slate-300">
                Vos Coordonnées (Salah Tour vous rappelle)
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Nom & Prénom <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: Karim Benali"
                    className="w-full h-11 bg-midnight-950 border border-white/10 rounded-lg px-3 text-xs text-white focus:border-brand-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Téléphone / WhatsApp <span className="text-brand-orange">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="05.. / 06.. / 07.."
                      className="w-full h-11 bg-midnight-950 border border-white/10 rounded-lg px-3 pl-9 text-xs text-white focus:border-brand-orange focus:outline-none"
                    />
                    <Phone className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Remarques particulières (vol d&apos;arrivée, permis, etc.)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Arrivée vol AH1085 à 11h30"
                  className="w-full h-11 bg-midnight-950 border border-white/10 rounded-lg px-3 text-xs text-white focus:border-brand-orange focus:outline-none"
                />
              </div>
            </div>

            {/* Price calculation summary */}
            <div className="p-4 rounded-xl bg-midnight-950/90 border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">
                  Durée : <span className="text-white font-bold">{rentalDays} jours</span> × {formatDA(vehicle.pricePerDay)}
                </div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Paiement sur place à la remise des clés</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Montant Total</div>
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
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-black text-xs uppercase tracking-wider shadow-glow-orange hover:shadow-glow-orange-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
