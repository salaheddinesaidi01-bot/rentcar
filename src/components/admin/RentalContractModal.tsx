'use client';

import React from 'react';
import { X, Printer, Car, Shield, CheckSquare } from 'lucide-react';
import { Reservation } from '@/types';
import { formatDA, formatDateTimeFR } from '@/lib/utils';
import { AGENCY_INFO } from '@/lib/seed-data';

interface RentalContractModalProps {
  reservation: Reservation | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RentalContractModal({
  reservation,
  isOpen,
  onClose,
}: RentalContractModalProps) {
  if (!isOpen || !reservation) return null;

  const handlePrint = () => {
    window.print();
  };

  const cautionAmount = (reservation.vehicle?.pricePerDay || 7000) * 4;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col print:max-h-none print:h-auto print:border-none print:shadow-none print:my-0 print:rounded-none">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 print:hidden">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <Car className="w-4 h-4 text-brand-orange" />
            <span>Contrat de Location &amp; Fiche d&apos;État des Lieux</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Contract Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 font-sans text-slate-900 space-y-6 print:p-8 print:overflow-visible text-xs leading-relaxed">
          
          {/* 1. Header Official Letterhead */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-wider text-slate-900">AGENCE</span>
                <span className="text-2xl font-black tracking-wider text-brand-orange">TOUR</span>
              </div>
              <div className="text-[11px] font-mono text-slate-600 mt-1">
                LOCATION DE VÉHICULES DE TOURISME &amp; UTILITAIRES
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {AGENCY_INFO.address} • Tlemcen, Algérie
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                Tél / WhatsApp : {AGENCY_INFO.phone} • Email : contact@agencetour.dz
              </div>
            </div>

            <div className="text-right border-l-2 sm:border-l-0 pl-3 sm:pl-0 border-slate-300">
              <div className="text-sm font-black uppercase text-slate-900">
                CONTRAT DE LOCATION N°
              </div>
              <div className="text-base font-mono font-bold text-brand-orange">
                CTR-{reservation.id.slice(-6).toUpperCase()}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-1">
                Établi le {formatDateTimeFR(new Date().toISOString())}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                Statut : <strong className="text-slate-900">{reservation.status}</strong>
              </div>
            </div>
          </div>

          {/* 2. Client & Vehicle 2-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Box 1: Locataire (Client) */}
            <div className="border border-slate-300 rounded-lg p-3.5 bg-slate-50/50 space-y-1.5">
              <div className="font-black uppercase tracking-wider text-[11px] text-slate-900 border-b border-slate-200 pb-1">
                1. IDENTITÉ DU LOCATAIRE
              </div>
              <div><strong>Nom &amp; Prénom :</strong> {reservation.customerName}</div>
              <div><strong>Téléphone :</strong> {reservation.customerPhone}</div>
              <div><strong>N° Permis de conduire :</strong> _________________________</div>
              <div><strong>Date &amp; Lieu délivrance :</strong> _________________________</div>
              <div><strong>Adresse / Ville :</strong> {reservation.customerEmail || 'Tlemcen / Algérie'}</div>
            </div>

            {/* Box 2: Véhicule */}
            <div className="border border-slate-300 rounded-lg p-3.5 bg-slate-50/50 space-y-1.5">
              <div className="font-black uppercase tracking-wider text-[11px] text-slate-900 border-b border-slate-200 pb-1">
                2. VÉHICULE LOUÉ
              </div>
              <div><strong>Modèle :</strong> {reservation.vehicle?.name || 'Véhicule'}</div>
              <div><strong>Immatriculation :</strong> {reservation.vehicle?.plateNumber || '13-XXXXX-123'}</div>
              <div><strong>Carburant / Boîte :</strong> {reservation.vehicle?.fuel} / {reservation.vehicle?.transmission}</div>
              <div><strong>Kilométrage Départ :</strong> {reservation.vehicle?.maintenance?.currentMileage || 20000} km</div>
              <div><strong>Kilométrage Retour :</strong> _________ km</div>
            </div>

          </div>

          {/* 3. Période & Tarification */}
          <div className="border border-slate-300 rounded-lg p-3.5 space-y-2">
            <div className="font-black uppercase tracking-wider text-[11px] text-slate-900 border-b border-slate-200 pb-1 flex justify-between items-center">
              <span>3. PÉRIODE &amp; RÈGLEMENT</span>
              <span className="font-mono text-[10px] text-slate-500">Lieu de prise en charge : {reservation.pickupLocation}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-1">
              <div>
                <span className="text-slate-500 block text-[10px]">Date de Prise en main</span>
                <strong>{formatDateTimeFR(reservation.startDate)} (09:00)</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Date de Restitution</span>
                <strong>{formatDateTimeFR(reservation.endDate)} (09:00)</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Durée totale</span>
                <strong>{reservation.totalDays} jour(s)</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Montant de la location</span>
                <strong className="text-brand-orange text-sm font-black">{formatDA(reservation.totalPrice)}</strong>
              </div>
            </div>

            <div className="pt-1.5 border-t border-slate-200 flex flex-wrap justify-between items-center text-[10px]">
              <div>
                <strong>Caution garantie (chèque ou espèces) :</strong> {formatDA(cautionAmount)} (restituée au retour)
              </div>
              <div>
                <strong>Kilométrage :</strong> Illimité • <strong>Assurance :</strong> Tous Risques avec franchise
              </div>
            </div>

            {reservation.notes && (
              <div className="pt-1.5 border-t border-slate-200 text-[10px] text-slate-700">
                <strong>Options &amp; Remarques du client :</strong> {reservation.notes}
              </div>
            )}
          </div>

          {/* 4. Fiche d'État des Lieux Départ & Retour */}
          <div className="border border-slate-300 rounded-lg p-3.5 space-y-2">
            <div className="font-black uppercase tracking-wider text-[11px] text-slate-900 border-b border-slate-200 pb-1">
              4. FICHE D&apos;ÉTAT DES LIEUX (CHECK-IN / CHECK-OUT)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="space-y-1">
                <span className="font-bold text-[10px] block">Niveau Carburant :</span>
                <div className="flex gap-2 text-[10px] font-mono">
                  <span>[  ] 1/4</span>
                  <span>[  ] 1/2</span>
                  <span>[  ] 3/4</span>
                  <span>[ X ] Plein</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-[10px] block">Équipements de bord :</span>
                <div className="text-[10px] text-slate-700 space-y-0.5">
                  <div>☑ Roue de secours &amp; Cric</div>
                  <div>☑ Gilet fluorescent &amp; Triangle</div>
                  <div>☑ Climatisation en fonction</div>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-[10px] block">Observations Carrosserie / Propreté :</span>
                <div className="text-[10px] border border-dashed border-slate-300 rounded p-1.5 h-14 text-slate-400">
                  Noter ici d&apos;éventuels impacts, micro-rayures ou état de propreté au départ...
                </div>
              </div>
            </div>
          </div>

          {/* 5. Conditions générales & Signatures */}
          <div className="border-t-2 border-slate-900 pt-4 space-y-4">
            <p className="text-[9px] text-slate-500 leading-tight">
              Le locataire déclare avoir pris connaissance des conditions générales de location de l&apos;Agence Tour, être titulaire d&apos;un permis de conduire valide depuis plus de 2 ans, et s&apos;engage à restituer le véhicule dans l&apos;état exact où il a été reçu, avec le plein de carburant. En cas d&apos;accident ou de litige, la juridiction de Tlemcen est seule compétente.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-2">
              <div className="border border-slate-300 rounded-lg p-3 h-28 flex flex-col justify-between">
                <div className="font-bold text-[10px] uppercase text-slate-800">
                  Signature du Locataire (Précédée de la mention &quot;Lu et approuvé&quot;)
                </div>
                <div className="text-[9px] text-slate-400 font-mono">Date : __________________</div>
              </div>

              <div className="border border-slate-300 rounded-lg p-3 h-28 flex flex-col justify-between">
                <div className="font-bold text-[10px] uppercase text-slate-800">
                  Cachet &amp; Signature de l&apos;Agence Tour Tlemcen
                </div>
                <div className="text-[9px] text-slate-400 font-mono">Date : __________________</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
