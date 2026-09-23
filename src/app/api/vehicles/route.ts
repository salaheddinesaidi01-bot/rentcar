import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db';

export async function GET() {
  try {
    const vehicles = await dbService.getVehicles();
    return NextResponse.json(vehicles);
  } catch (error) {
    console.error('Failed to get vehicles:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve vehicles' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, action, price } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing vehicle ID' }, { status: 400 });
    }

    if (action === 'toggle-availability') {
      const updated = await dbService.toggleVehicleAvailability(id);
      return NextResponse.json(updated);
    }

    if (action === 'update-price' && typeof price === 'number') {
      const updated = await dbService.updateVehiclePrice(id, price);
      return NextResponse.json(updated);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Failed to update vehicle:', error);
    return NextResponse.json(
      { error: 'Failed to update vehicle' },
      { status: 500 }
    );
  }
}
