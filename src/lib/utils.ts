import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Vehicle } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format number as Algerian Dinars (DA)
 */
export function formatDA(amount: number): string {
  if (isNaN(amount)) return '0 DA';
  const parts = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${parts} DA`;
}

/**
 * Calculate the number of rental days between two YYYY-MM-DD dates.
 * Defaults to minimum 1 day.
 */
export function calculateRentalDays(startDate: string, endDate: string): number {
  try {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;

    const diffTime = end.getTime() - start.getTime();
    if (diffTime <= 0) return 1;

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  } catch {
    return 1;
  }
}

/**
 * Format YYYY-MM-DD to friendly French date display: "24/09/2026"
 */
export function formatDateFR(dateStr: string): string {
  try {
    if (!dateStr) return '';
    const parts = dateStr.split('T')[0].split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('fr-FR');
  } catch {
    return dateStr;
  }
}

export const formatDateTimeFR = formatDateFR;

/**
 * Check if a vehicle is available for a given date range
 */
export function isVehicleAvailableForDates(
  vehicle: Vehicle,
  startDateStr?: string,
  endDateStr?: string
): boolean {
  if (!vehicle.available) return false;
  if (!startDateStr || !endDateStr) return true;

  const reqStart = new Date(startDateStr).getTime();
  const reqEnd = new Date(endDateStr).getTime();

  if (isNaN(reqStart) || isNaN(reqEnd)) return true;

  if (vehicle.blockedDates && vehicle.blockedDates.length > 0) {
    for (const range of vehicle.blockedDates) {
      const bStart = new Date(range.startDate).getTime();
      const bEnd = new Date(range.endDate).getTime();
      // Overlap condition
      if (reqStart <= bEnd && reqEnd >= bStart) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Build direct WhatsApp pre-filled message URL
 */
export function buildWhatsAppLink(params: {
  phone?: string;
  vehicleName?: string;
  startDate: string;
  endDate: string;
  days: number;
  totalPrice: number;
  customerName?: string;
  options?: string;
}): string {
  const targetPhone = params.phone || process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '213550505050';

  const lines = [
    `🚗 *DEMANDE DE RÉSERVATION — AGENCE TOUR TLEMCEN*`,
    `----------------------------------------`,
    params.vehicleName ? `🚘 *Véhicule :* ${params.vehicleName}` : `🚘 *Véhicule :* À définir selon disponibilité`,
    `📍 *Retrait & Retour :* À l'Agence Tour (Tlemcen Centre)`,
    `📅 *Date de début :* ${formatDateFR(params.startDate)}`,
    `🏁 *Date de fin :* ${formatDateFR(params.endDate)}`,
    `⏱️ *Durée :* ${params.days} jour(s)`,
    params.totalPrice > 0 ? `💰 *Montant estimé :* ${formatDA(params.totalPrice)}` : '',
    params.customerName ? `👤 *Client :* ${params.customerName}` : '',
    params.options ? `✨ *Options & Souhaits :* ${params.options}` : '',
    `----------------------------------------`,
    `Bonjour, je souhaite réserver ce véhicule à l'agence. Merci de me confirmer la disponibilité !`,
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${targetPhone.replace(/[^0-9]/g, '')}?text=${text}`;
}
