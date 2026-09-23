import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import FleetManagement from '@/components/admin/FleetManagement';
import { dbService } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminFlottePage() {
  const vehicles = await dbService.getVehicles();

  return (
    <div className="min-h-screen bg-midnight-950 text-slate-100">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <FleetManagement initialVehicles={vehicles} />
      </main>
    </div>
  );
}
