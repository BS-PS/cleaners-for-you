import { Users, PoundSterling, Calendar, AlertCircle, UserCheck, TrendingUp } from 'lucide-react';
import { adminMetrics } from '@/lib/fixtures/adminMetrics';
import { bookings } from '@/lib/fixtures/bookings';
import { cleaners } from '@/lib/fixtures/cleaners';
import { clients } from '@/lib/fixtures/clients';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { RevenueChart } from '@/components/RevenueChart';

const recentBookings = bookings
  .filter((b) => b.status === 'in-progress' || b.status === 'confirmed')
  .slice(0, 5);

const metrics = [
  { label: 'Total Cleaners', value: adminMetrics.totalCleaners.toLocaleString(), icon: Users, color: 'bg-blue-50 text-[#1E3A8A]', change: '+24 this month' },
  { label: 'Total Revenue', value: formatCurrency(adminMetrics.totalRevenue), icon: PoundSterling, color: 'bg-green-50 text-[#16A34A]', change: '+£3,390 this week' },
  { label: 'Active Bookings', value: adminMetrics.activeBookings.toLocaleString(), icon: Calendar, color: 'bg-purple-50 text-purple-700', change: `${adminMetrics.bookingsThisWeek} this week` },
  { label: 'Pending Applications', value: adminMetrics.pendingApplications.toLocaleString(), icon: UserCheck, color: 'bg-amber-50 text-amber-700', change: 'Needs review' },
  { label: 'Total Complaints', value: adminMetrics.totalComplaints.toLocaleString(), icon: AlertCircle, color: 'bg-red-50 text-red-600', change: `${adminMetrics.openComplaints} open` },
];

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Platform performance at a glance</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${m.color}`}>
              <m.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{m.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{m.label}</p>
            <p className="text-xs text-[#16A34A] font-medium mt-1 flex items-center gap-0.5">
              <TrendingUp size={10} />{m.change}
            </p>
          </div>
        ))}
      </div>

      {/* Revenue chart — client component */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Revenue — Last 12 Weeks</h2>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">+18% vs prior period</span>
        </div>
        <RevenueChart data={adminMetrics.revenueByWeek} />
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-4">Active Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Booking ID', 'Client', 'Cleaner', 'Date', 'Amount', 'Status'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 pb-2 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentBookings.map((b) => {
                const cleaner = cleaners.find((c) => c.id === b.cleanerId)!;
                const client = clients.find((c) => c.id === b.clientId)!;
                return (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 pr-4 text-xs font-mono text-gray-400">{b.id}</td>
                    <td className="py-2.5 pr-4 text-xs font-medium">{client?.fullName ?? '—'}</td>
                    <td className="py-2.5 pr-4 text-xs font-medium">{cleaner.fullName}</td>
                    <td className="py-2.5 pr-4 text-xs text-gray-500">{formatDate(b.scheduledStart)}</td>
                    <td className="py-2.5 pr-4 text-xs font-semibold">{formatCurrency(b.totalPrice)}</td>
                    <td className="py-2.5">
                      <Badge variant={b.status === 'in-progress' ? 'info' : 'success'} className="text-[10px]">
                        {b.status}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
