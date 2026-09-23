import { PrismaClient } from '@prisma/client';
import { INITIAL_LOCATIONS, INITIAL_VEHICLES, INITIAL_RESERVATIONS } from './seed-data';
import { Vehicle, Reservation, Location, ReservationStatus } from '../types';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
  // eslint-disable-next-line no-var
  var inMemoryStore:
    | {
        vehicles: Vehicle[];
        reservations: Reservation[];
        locations: Location[];
      }
    | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

// In-memory fallback store initialized with our realistic dataset
if (!global.inMemoryStore) {
  global.inMemoryStore = {
    vehicles: [...INITIAL_VEHICLES],
    reservations: [...INITIAL_RESERVATIONS],
    locations: [...INITIAL_LOCATIONS],
  };
}

export const inMemoryStore = global.inMemoryStore!;

/**
 * Resilient Repository Layer
 * Tries PostgreSQL via Prisma first; if database is offline or not yet connected,
 * seamlessly falls back to inMemoryStore to guarantee zero downtime/zero crashes during development.
 */
export const dbService = {
  async getVehicles(): Promise<Vehicle[]> {
    try {
      const records = await prisma.vehicle.findMany({
        orderBy: { pricePerDay: 'asc' },
      });
      if (records && records.length > 0) {
        return records as unknown as Vehicle[];
      }
    } catch {
      // Fallback
    }
    return inMemoryStore.vehicles;
  },

  async getVehicleById(id: string): Promise<Vehicle | null> {
    try {
      const record = await prisma.vehicle.findUnique({ where: { id } });
      if (record) return record as unknown as Vehicle;
    } catch {
      // Fallback
    }
    return inMemoryStore.vehicles.find((v) => v.id === id) || null;
  },

  async toggleVehicleAvailability(id: string): Promise<Vehicle | null> {
    try {
      const current = await prisma.vehicle.findUnique({ where: { id } });
      if (current) {
        const updated = await prisma.vehicle.update({
          where: { id },
          data: { available: !current.available },
        });
        return updated as unknown as Vehicle;
      }
    } catch {
      // Fallback
    }
    const veh = inMemoryStore.vehicles.find((v) => v.id === id);
    if (veh) {
      veh.available = !veh.available;
      return veh;
    }
    return null;
  },

  async updateVehiclePrice(id: string, newPrice: number): Promise<Vehicle | null> {
    try {
      const updated = await prisma.vehicle.update({
        where: { id },
        data: { pricePerDay: newPrice },
      });
      return updated as unknown as Vehicle;
    } catch {
      // Fallback
    }
    const veh = inMemoryStore.vehicles.find((v) => v.id === id);
    if (veh) {
      veh.pricePerDay = newPrice;
      return veh;
    }
    return null;
  },

  async getLocations(): Promise<Location[]> {
    try {
      const records = await prisma.location.findMany({ where: { active: true } });
      if (records && records.length > 0) return records;
    } catch {
      // Fallback
    }
    return inMemoryStore.locations;
  },

  async getReservations(): Promise<Reservation[]> {
    try {
      const records = await prisma.reservation.findMany({
        include: { vehicle: true },
        orderBy: { createdAt: 'desc' },
      });
      if (records && records.length > 0) return records as unknown as Reservation[];
    } catch {
      // Fallback
    }
    // Enrich with vehicles for memory store
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
    pickupLocation: string;
    returnLocation: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    totalPrice: number;
    notes?: string;
  }): Promise<Reservation> {
    try {
      const record = await prisma.reservation.create({
        data: {
          vehicleId: data.vehicleId,
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          customerEmail: data.customerEmail,
          pickupLocation: data.pickupLocation,
          returnLocation: data.returnLocation,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          totalDays: data.totalDays,
          totalPrice: data.totalPrice,
          status: 'PENDING',
          notes: data.notes,
        },
        include: { vehicle: true },
      });
      return record as unknown as Reservation;
    } catch {
      // Fallback
    }

    const newRes: Reservation = {
      id: `res-${Date.now()}`,
      ...data,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      vehicle: inMemoryStore.vehicles.find((v) => v.id === data.vehicleId),
    };
    inMemoryStore.reservations.unshift(newRes);
    return newRes;
  },

  async updateReservationStatus(id: string, status: ReservationStatus): Promise<Reservation | null> {
    try {
      const updated = await prisma.reservation.update({
        where: { id },
        data: { status },
        include: { vehicle: true },
      });
      return updated as unknown as Reservation;
    } catch {
      // Fallback
    }

    const res = inMemoryStore.reservations.find((r) => r.id === id);
    if (res) {
      res.status = status;
      return res;
    }
    return null;
  },
};
