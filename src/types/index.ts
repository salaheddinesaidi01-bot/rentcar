export interface DateRange {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  category: 'Citadine' | 'Berline' | 'SUV' | 'Luxe';
  transmission: 'Manuelle' | 'Automatique';
  fuel: 'Essence' | 'Diesel' | 'Hybride';
  seats: number;
  hasAC: boolean;
  pricePerDay: number;
  imageUrl: string;
  features: string[];
  available: boolean;
  blockedDates?: DateRange[];
  plateNumber?: string;
  year: number;
  createdAt?: string;
  updatedAt?: string;
}

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Reservation {
  id: string;
  vehicleId: string;
  vehicle?: Vehicle;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupLocation: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  totalDays: number;
  totalPrice: number;
  status: ReservationStatus;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BookingFormData {
  startDate: string;
  endDate: string;
  customerName: string;
  customerPhone: string;
  notes?: string;
  vehicleId?: string;
}
