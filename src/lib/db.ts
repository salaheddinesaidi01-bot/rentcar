import { PrismaClient } from '@prisma/client';
import { INITIAL_VEHICLES, INITIAL_RESERVATIONS, AGENCY_INFO } from './seed-data';
import { Vehicle, Reservation, ReservationStatus, DateRange, VehicleMaintenance } from '../types';
import { isVehicleAvailableForDates } from './utils';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
  // eslint-disable-next-line no-var
  var inMemoryStore:
    | {
        vehicles: Vehicle[];
        reservations: Reservation[];
      }
    | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

if (!global.inMemoryStore) {
  global.inMemoryStore = {
    vehicles: JSON.parse(JSON.stringify(INITIAL_VEHICLES)),
    reservations: JSON.parse(JSON.stringify(INITIAL_RESERVATIONS)),
  };
}

export const inMemoryStore = global.inMemoryStore!;

export const dbService = {
  getAgencyInfo() {
    return AGENCY_INFO;
  },

  async getVehicles(filters?: { startDate?: string; endDate?: string }): Promise<Vehicle[]> {
    let list: Vehicle[] = inMemoryStore.vehicles;
    try {
      const records = await prisma.vehicle.findMany({
        orderBy: { pricePerDay: 'asc' },
      });
      if (records && records.length > 0) {
        list = records.map((r: any) => ({
          ...r,
          hasAC: r.features?.includes('Climatisation') ?? true,
          blockedDates: (r.blockedDates as any) || [],
        }));
      }
    } catch {
      // Use in-memory
    }

    if (filters?.startDate && filters?.endDate) {
      list = list.filter((v) => isVehicleAvailableForDates(v, filters.startDate, filters.endDate));
    }

    return list;
  },

  async getAllVehiclesForAdmin(): Promise<Vehicle[]> {
    return inMemoryStore.vehicles;
  },

  async getVehicleById(id: string): Promise<Vehicle | null> {
    const veh = inMemoryStore.vehicles.find((v) => v.id === id);
    return veh || null;
  },

  async addVehicle(data: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle> {
    const newVehicle: Vehicle = {
      id: `veh-${Date.now()}`,
      ...data,
      blockedDates: data.blockedDates || [],
      createdAt: new Date().toISOString(),
    };
    inMemoryStore.vehicles.push(newVehicle);
    return newVehicle;
  },

  async updateVehicle(id: string, updates: Partial<Vehicle>): Promise<Vehicle | null> {
    const idx = inMemoryStore.vehicles.findIndex((v) => v.id === id);
    if (idx === -1) return null;
    inMemoryStore.vehicles[idx] = {
      ...inMemoryStore.vehicles[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return inMemoryStore.vehicles[idx];
  },

  async toggleVehicleAvailability(id: string): Promise<Vehicle | null> {
    const veh = inMemoryStore.vehicles.find((v) => v.id === id);
    if (veh) {
      veh.available = !veh.available;
      return veh;
    }
    return null;
  },

  async addBlockedDateRange(id: string, range: DateRange): Promise<Vehicle | null> {
    const veh = inMemoryStore.vehicles.find((v) => v.id === id);
    if (veh) {
      if (!veh.blockedDates) veh.blockedDates = [];
      veh.blockedDates.push(range);
      return veh;
    }
    return null;
  },

  async removeBlockedDateRange(id: string, index: number): Promise<Vehicle | null> {
    const veh = inMemoryStore.vehicles.find((v) => v.id === id);
    if (veh && veh.blockedDates) {
      veh.blockedDates.splice(index, 1);
      return veh;
    }
    return null;
  },

  async toggleSingleDateBlock(id: string, dateStr: string): Promise<Vehicle | null> {
    const veh = inMemoryStore.vehicles.find((v) => v.id === id);
    if (!veh) return null;
    if (!veh.blockedDates) veh.blockedDates = [];

    // Check if dateStr is already blocked
    const existingIndex = veh.blockedDates.findIndex(
      (b) => dateStr >= b.startDate && dateStr <= b.endDate
    );

    if (existingIndex !== -1) {
      const existing = veh.blockedDates[existingIndex];
      veh.blockedDates.splice(existingIndex, 1);

      // If it was a multi-day range, keep the remaining split ranges
      if (existing.startDate < dateStr) {
        const prevDay = new Date(new Date(dateStr).getTime() - 86400000).toISOString().split('T')[0];
        veh.blockedDates.push({ startDate: existing.startDate, endDate: prevDay });
      }
      if (existing.endDate > dateStr) {
        const nextDay = new Date(new Date(dateStr).getTime() + 86400000).toISOString().split('T')[0];
        veh.blockedDates.push({ startDate: nextDay, endDate: existing.endDate });
      }
    } else {
      // Add single day block
      veh.blockedDates.push({ startDate: dateStr, endDate: dateStr });
    }

    return veh;
  },

  async getReservations(): Promise<Reservation[]> {
    return inMemoryStore.reservations.map((res) => ({
      ...res,
      vehicle: inMemoryStore.vehicles.find((v) => v.id === res.vehicleId),
    }));
  },

  async createReservation(data: {
    vehicleId: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    pickupLocation?: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    totalPrice: number;
    notes?: string;
  }): Promise<Reservation> {
    const newRes: Reservation = {
      id: `res-${Date.now()}`,
      ...data,
      pickupLocation: data.pickupLocation || 'Agence Tour Tlemcen (Centre-Ville)',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      vehicle: inMemoryStore.vehicles.find((v) => v.id === data.vehicleId),
    };

    inMemoryStore.reservations.unshift(newRes);
    return newRes;
  },

  async updateVehicleMaintenance(id: string, maintenance: VehicleMaintenance): Promise<Vehicle | null> {
    const veh = inMemoryStore.vehicles.find((v) => v.id === id);
    if (!veh) return null;
    veh.maintenance = { ...maintenance };
    veh.updatedAt = new Date().toISOString();
    return veh;
  },

  async updateReservationStatus(id: string, status: ReservationStatus): Promise<Reservation | null> {
    const res = inMemoryStore.reservations.find((r) => r.id === id);
    if (res) {
      res.status = status;

      // Automatically sync vehicle blockedDates on admin validation
      const veh = inMemoryStore.vehicles.find((v) => v.id === res.vehicleId);
      if (veh) {
        if (!veh.blockedDates) veh.blockedDates = [];

        if (status === 'CONFIRMED') {
          // Dès que l'admin valide, la période est automatiquement bloquée dans la disponibilité de la voiture
          const alreadyBlocked = veh.blockedDates.some(
            (b) => b.startDate === res.startDate && b.endDate === res.endDate
          );
          if (!alreadyBlocked) {
            veh.blockedDates.push({ startDate: res.startDate, endDate: res.endDate });
          }
        } else if (status === 'CANCELLED') {
          // Libération automatique de la période en cas d'annulation
          veh.blockedDates = veh.blockedDates.filter(
            (b) => !(b.startDate === res.startDate && b.endDate === res.endDate)
          );
        }
      }

      return res;
    }
    return null;
  },
};
