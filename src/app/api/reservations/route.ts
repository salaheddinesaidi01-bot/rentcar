import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';
import { calculateRentalDays } from '@/lib/utils';

export async function GET() {
  try {
    const reservations = await dbService.getReservations();
    return NextResponse.json(reservations);
  } catch (error) {
    console.error('Failed to get reservations:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve reservations' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      vehicleId,
      customerName,
      customerPhone,
      customerEmail,
      pickupLocation,
      returnLocation,
      startDate,
      endDate,
      notes,
    } = body;

    if (!vehicleId || !customerName || !customerPhone || !pickupLocation || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' },
        { status: 400 }
      );
    }

    const vehicle = await dbService.getVehicleById(vehicleId);
    if (!vehicle) {
      return NextResponse.json(
        { error: 'Véhicule introuvable' },
        { status: 404 }
      );
    }

    const totalDays = calculateRentalDays(startDate, endDate);
    const totalPrice = totalDays * vehicle.pricePerDay;

    const reservation = await dbService.createReservation({
      vehicleId,
      customerName,
      customerPhone,
      customerEmail,
      pickupLocation,
      returnLocation: returnLocation || pickupLocation,
      startDate,
      endDate,
      totalDays,
      totalPrice,
      notes,
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error('Failed to create reservation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la réservation' },
      { status: 500 }
    );
  }
}
