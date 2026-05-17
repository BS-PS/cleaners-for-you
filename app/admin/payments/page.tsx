import { PoundSterling, TrendingUp, RefreshCw, AlertCircle } from 'lucide-react';
import { payments } from '@/lib/fixtures/payments';
import { bookings } from '@/lib/fixtures/bookings';
import { cleaners } from '@/lib/fixtures/cleaners';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { PaymentStatus } from '@/lib/types';

const statusVariant: Record<PaymentStatus, 'success' | 'warning' | 'danger' | 'default'> = {
  paid: 'success', pending: 'warning', refunded: 'danger', failed: 'danger',
};

const totalRevenue  = payments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
const totalPending  = payments.filter((p) => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
const totalRefunded = payments.filter((p) => p.status === 'refunded').reduce((s, p) => s + p.amount, 0);

export default function PaymentsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ctext">Payment Dashboard</h1>
        <p className="text-cmuted text-sm mt-1">All transactions across the platform</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue',   value: formatCurrency(totalRevenue),   icon: PoundSterling, bg: 'bg-cgreen-light', color: 'text-cgreen',      sub: `${payments.filter((p) => p.status === 'paid').length} paid` },
          { label: 'Pending Payout',  value: formatCurrency(totalPending),   icon: TrendingUp,    bg: 'bg-amber-100',    color: 'text-amber-700',   sub: `${payments.filter((p) => p.status === 'pending').length} pending` },
          { label: 'Refunded',        value: formatCurrency(totalRefunded),  icon: RefreshCw,     bg: 'bg-red-100',      color: 'text-cred',        sub: `${payments.filter((p) => p.status === 'refunded').length} refunds` },
          { label: 'Failed',          value: formatCurrency(0),             icon: AlertCircle,   bg: 'bg-cbg',          color: 'text-cmuted',      sub: '0 failures' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-card shadow-card border border-cborder p-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.bg}`}>
              <s.icon size={18} className={s.color} />
            </div>
            <p className="text-2xl font-bold text-ctext">{s.value}</p>
            <p className="text-xs text-cmuted mt-0.5">{s.label}</p>
            <p className="text-xs text-cmuted mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-card shadow-card border border-cborder">
        <div className="px-5 py-4 border-b border-cborder flex items-center justify-between">
          <h2 className="font-bold text-ctext">All Payments</h2>
          <span className="text-xs text-cmuted">{payments.length} records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-cbg border-b border-cborder">
                {['Payment ID', 'Booking', 'Cleaner', 'Amount', 'Method', 'Date', 'Status'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-cmuted py-3 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-cborder">
              {payments.map((p) => {
                const booking = bookings.find((b) => b.id === p.bookingId);
                const cleaner = booking ? cleaners.find((c) => c.id === booking.cleanerId) : null;
                return (
                  <tr key={p.id} className="hover:bg-cbg transition-colors">
                    <td className="py-3 px-4 text-xs font-mono text-cmuted">{p.id}</td>
                    <td className="py-3 px-4 text-xs text-cmuted">{p.bookingId}</td>
                    <td className="py-3 px-4 text-xs font-medium text-ctext">{cleaner?.fullName ?? '—'}</td>
                    <td className="py-3 px-4 text-sm font-bold text-navy">{formatCurrency(p.amount)}</td>
                    <td className="py-3 px-4 text-xs capitalize text-cmuted">{p.method}</td>
                    <td className="py-3 px-4 text-xs text-cmuted">{formatDate(p.processedAt)}</td>
                    <td className="py-3 px-4"><Badge variant={statusVariant[p.status]}>{p.status}</Badge></td>
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
