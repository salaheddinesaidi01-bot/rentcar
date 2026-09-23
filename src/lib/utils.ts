import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Algerian Dinars (DA)
 * e.g. 21000 -> "21 000 DA"
 */
export function formatDA(amount: number): string {
  if (isNaN(amount)) return '0 DA';
  const parts = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${parts} DA`;
}

/**
 * Calculate the number of rental days between two dates.
 * Defaults to minimum 1 day.
 */
export function calculateRentalDays(startDate: string | Date, endDate: string | Date): number {
  try {
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
 * Format date for friendly display
 * e.g. "2026-09-24T10:00" -> "24/09/2026 à 10:00"
 */
export function formatDateTimeFR(dateInput: string | Date): string {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} à ${hours}:${minutes}`;
  } catch {
    return String(dateInput);
  }
}

/**
 * Build direct WhatsApp pre-filled message URL
 */
export function buildWhatsAppLink(params: {
  phone?: string;
  vehicleName?: string;
  pickupLocation: string;
  returnLocation?: string;
  startDate: string;
  endDate: string;
  days: number;
  totalPrice: number;
  customerName?: string;
}): string {
  const targetPhone = params.phone || process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '213550505050';
  
  const lines = [
    `🚗 *DEMANDE DE RÉSERVATION — SALAH TOUR TLEMCEN*`,
    `----------------------------------------`,
    params.vehicleName ? `🚘 *Véhicule :* ${params.vehicleName}` : `🚘 *Véhicule :* À définir selon disponibilité`,
    `📍 *Lieu de prise :* ${params.pickupLocation}`,
    params.returnLocation ? `📍 *Lieu de retour :* ${params.returnLocation}` : '',
    `📅 *Départ :* ${formatDateTimeFR(params.startDate)}`,
    `🏁 *Retour :* ${formatDateTimeFR(params.endDate)}`,
    `⏱️ *Durée :* ${params.days} jour(s)`,
    `💰 *Estimation :* ${formatDA(params.totalPrice)}`,
    params.customerName ? `👤 *Client :* ${params.customerName}` : '',
    `----------------------------------------`,
    `Bonjour, je souhaite vérifier la disponibilité et confirmer cette réservation. Merci !`,
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${targetPhone.replace(/[^0-9]/g, '')}?text=${text}`;
}
