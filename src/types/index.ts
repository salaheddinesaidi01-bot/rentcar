export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  category: 'Citadine' | 'Berline' | 'SUV' | 'Luxe';
  transmission: 'Manuelle' | 'Automatique';
  fuel: 'Essence' | 'Diesel' | 'Hybride';
  seats: number;
  pricePerDay: number;
  imageUrl: string;
  features: string[];
  available: boolean;
  plateNumber?: string;
  year: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Location {
  id: string;
  name: string;
  city: string;
  fee: number;
  active: boolean;
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
  returnLocation: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalPrice: number;
  status: ReservationStatus;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BookingFormData {
  pickupLocation: string;
  returnLocation: string;
  startDate: string;
  endDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
  vehicleId?: string;
}
