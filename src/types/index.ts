export interface DateRange {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

export interface VehicleMaintenance {
  currentMileage: number;             // Kilométrage actuel (km)
  lastOilChangeKm: number;           // Kilométrage du dernier vidange (km)
  nextOilChangeKm: number;           // Kilométrage du prochain vidange (km)
  lastOilChangeDate?: string;        // Date du dernier vidange (YYYY-MM-DD)
  insuranceExpiry: string;           // Date d'expiration assurance (YYYY-MM-DD)
  insuranceCompany: string;          // Compagnie d'assurance (ex: CAAT, SAA, CIAR)
  technicalInspectionExpiry: string; // Date d'expiration contrôle technique (YYYY-MM-DD)
  notes?: string;                    // Remarques
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
  rating?: number;
  reviewCount?: number;
  badge?: string;
  maintenance?: VehicleMaintenance;
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
