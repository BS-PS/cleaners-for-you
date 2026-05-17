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
  .slice(0, 6);

const metrics = [
  { label: 'Total Cleaners',      value: adminMetrics.totalCleaners.toLocaleString(),      icon: Users,        bg: 'bg-navy-light',        icon_color: 'text-navy',   change: '+24 this month' },
  { label: 'Total Revenue',       value: formatCurrency(adminMetrics.totalRevenue),          icon: PoundSterling, bg: 'bg-cgreen-light',     icon_color: 'text-cgreen', change: '+£3,390 this week' },
  { label: 'Active Bookings',     value: adminMetrics.activeBookings.toLocaleString(),      icon: Calendar,     bg: 'bg-purple-100',        icon_color: 'text-purple-700', change: `${adminMetrics.bookingsThisWeek} this week` },
  { label: 'Pending Applications',value: adminMetrics.pendingApplications.toLocaleString(), icon: UserCheck,    bg: 'bg-amber-100',         icon_color: 'text-amber-700', change: 'Needs review' },
  { label: 'Open Complaints',     value: adminMetrics.openComplaints.toLocaleString(),      icon: AlertCircle,  bg: 'bg-red-100',           icon_color: 'text-cred',   change: `${adminMetrics.totalComplaints} total` },
];

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ctext">Overview</h1>
        <p className="text-cmuted text-sm mt-1">Platform performance at a glance</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-card shadow-card p-4 border border-cborder">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${m.bg}`}>
              <m.icon size={20} className={m.icon_color} />
            </div>
            <p className="text-2xl font-bold text-ctext">{m.value}</p>
            <p className="text-xs text-cmuted mt-0.5">{m.label}</p>
            <p className="text-xs text-cgreen font-medium mt-1 flex items-center gap-0.5">
              <TrendingUp size={10} />{m.change}
            </p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-card shadow-card p-5 border border-cborder">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-ctext">Revenue — Last 12 Weeks</h2>
            <p className="text-xs text-cmuted mt-0.5">Weekly booking revenue across all cleaners</p>
          </div>
          <span className="text-xs bg-cgreen-light text-cgreen px-3 py-1 rounded-full font-semibold">+18% vs prior period</span>
        </div>
        <RevenueChart data={adminMetrics.revenueByWeek} />
      </div>

      {/* Active bookings table */}
      <div className="bg-white rounded-card shadow-card border border-cborder">
        <div className="px-5 py-4 border-b border-cborder flex items-center justify-between">
          <h2 className="font-bold text-ctext">Active Bookings</h2>
          <span className="text-xs text-cmuted">{recentBookings.length} shown</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-cbg border-b border-cborder">
                {['Booking ID', 'Client', 'Cleaner', 'Date', 'Amount', 'Status'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-cmuted py-3 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-cborder">
              {recentBookings.map((b) => {
                const cleaner = cleaners.find((c) => c.id === b.cleanerId)!;
                const client = clients.find((c) => c.id === b.clientId)!;
                return (
                  <tr key={b.id} className="hover:bg-cbg transition-colors">
                    <td className="py-3 px-4 text-xs font-mono text-cmuted">{b.id}</td>
                    <td className="py-3 px-4 text-xs font-medium text-ctext">{client?.fullName ?? '—'}</td>
                    <td className="py-3 px-4 text-xs font-medium text-ctext">{cleaner.fullName}</td>
                    <td className="py-3 px-4 text-xs text-cmuted">{formatDate(b.scheduledStart)}</td>
                    <td className="py-3 px-4 text-sm font-bold text-navy">{formatCurrency(b.totalPrice)}</td>
                    <td className="py-3 px-4">
                      <Badge variant={b.status === 'in-progress' ? 'info' : 'success'}>
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
