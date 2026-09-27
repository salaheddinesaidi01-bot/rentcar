import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate') || undefined;
    const endDate = searchParams.get('endDate') || undefined;

    const vehicles = await dbService.getVehicles({ startDate, endDate });
    return NextResponse.json(vehicles);
  } catch (error) {
    console.error('Failed to get vehicles:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve vehicles' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      brand,
      category,
      transmission,
      fuel,
      seats,
      hasAC,
      pricePerDay,
      imageUrl,
      features,
      year,
      plateNumber,
    } = body;

    if (!name || !category || !pricePerDay) {
      return NextResponse.json(
        { error: 'Le nom, la catégorie et le tarif journalier sont obligatoires' },
        { status: 400 }
      );
    }

    const created = await dbService.addVehicle({
      name,
      brand: brand || 'Marque',
      category: category || 'Citadine',
      transmission: transmission || 'Manuelle',
      fuel: fuel || 'Essence',
      seats: Number(seats) || 5,
      hasAC: Boolean(hasAC),
      pricePerDay: Number(pricePerDay),
      imageUrl:
        imageUrl ||
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      features: features || ['Climatisation', 'Bluetooth'],
      available: true,
      year: Number(year) || 2024,
      plateNumber: plateNumber || undefined,
      blockedDates: [],
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Failed to add vehicle:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout du véhicule' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, action, range, index, updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID du véhicule requis' }, { status: 400 });
    }

    // 1. Bascule disponibilité générale
    if (action === 'toggle-availability') {
      const updated = await dbService.toggleVehicleAvailability(id);
      return NextResponse.json(updated);
    }

    // 2. Bloquer des dates (ex: réservé du 10/10 au 15/10)
    if (action === 'block-dates' && range?.startDate && range?.endDate) {
      const updated = await dbService.addBlockedDateRange(id, {
        startDate: range.startDate,
        endDate: range.endDate,
      });
      return NextResponse.json(updated);
    }

    // 2b. Basculer un jour précis sur le calendrier (clic calendrier admin : vert <-> rouge)
    if (action === 'toggle-date' && body.dateStr) {
      const updated = await dbService.toggleSingleDateBlock(id, body.dateStr);
      return NextResponse.json(updated);
    }

    // 3. Débloquer des dates
    if (action === 'unblock-dates' && typeof index === 'number') {
      const updated = await dbService.removeBlockedDateRange(id, index);
      return NextResponse.json(updated);
    }

    // 4. Mettre à jour les caractéristiques (prix, boîte, énergie, places, clim, nom, etc.)
    if (action === 'update-details' && updates) {
      const updated = await dbService.updateVehicle(id, updates);
      return NextResponse.json(updated);
    }

    // 5. Mettre à jour le suivi de maintenance (vidange, assurance, contrôle technique)
    if (action === 'update-maintenance' && body.maintenance) {
      const updated = await dbService.updateVehicleMaintenance(id, body.maintenance);
      return NextResponse.json(updated);
    }

    return NextResponse.json({ error: 'Action non reconnue' }, { status: 400 });
  } catch (error) {
    console.error('Failed to update vehicle:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du véhicule' },
      { status: 500 }
    );
  }
}
