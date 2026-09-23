import React from 'react';
import HomeClient from '@/components/HomeClient';
import { dbService } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const vehicles = await dbService.getVehicles();

  return <HomeClient initialVehicles={vehicles} />;
}
