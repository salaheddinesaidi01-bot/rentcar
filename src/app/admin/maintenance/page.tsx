import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import MaintenanceManagement from '@/components/admin/MaintenanceManagement';
import AdminAuthGate from '@/components/admin/AdminAuthGate';
import { dbService } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminMaintenancePage() {
  const vehicles = await dbService.getAllVehiclesForAdmin();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AdminAuthGate>
        <AdminHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <MaintenanceManagement initialVehicles={vehicles} />
        </main>
      </AdminAuthGate>
    </div>
  );
}
