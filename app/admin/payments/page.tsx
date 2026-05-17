import { PoundSterling, TrendingUp, RefreshCw, AlertCircle } from 'lucide-react';
import { payments } from '@/lib/fixtures/payments';
import { bookings } from '@/lib/fixtures/bookings';
import { cleaners } from '@/lib/fixtures/cleaners';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { PaymentStatus } from '@/lib/types';

const statusVariant: Record<PaymentStatus, 'success' | 'warning' | 'danger' | 'default'> = {
  paid: 'success',
  pending: 'warning',
  refunded: 'danger',
  failed: 'danger',
};

const totalRevenue = payments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
const totalPending = payments.filter((p) => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
const totalRefunded = payments.filter((p) => p.status === 'refunded').reduce((s, p) => s + p.amount, 0);

export default function PaymentsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">All transactions across the platform</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: PoundSterling, color: 'bg-green-50 text-green-700', sub: `${payments.filter((p) => p.status === 'paid').length} transactions` },
          { label: 'Pending Payout', value: formatCurrency(totalPending), icon: TrendingUp, color: 'bg-amber-50 text-amber-700', sub: `${payments.filter((p) => p.status === 'pending').length} payments` },
          { label: 'Refunded', value: formatCurrency(totalRefunded), icon: RefreshCw, color: 'bg-red-50 text-red-600', sub: `${payments.filter((p) => p.status === 'refunded').length} refunds` },
          { label: 'Failed', value: formatCurrency(0), icon: AlertCircle, color: 'bg-gray-50 text-gray-500', sub: '0 failures' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon size={18} />
            </div>
            <p className="text-xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Payments table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">All Payments</h2>
          <span className="text-xs text-gray-400">{payments.length} records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {['Payment ID', 'Booking', 'Cleaner', 'Amount', 'Method', 'Date', 'Status'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 py-3 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.map((p) => {
                const booking = bookings.find((b) => b.id === p.bookingId);
                const cleaner = booking ? cleaners.find((c) => c.id === booking.cleanerId) : null;
                return (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-xs font-mono text-gray-400">{p.id}</td>
                    <td className="py-3 px-4 text-xs text-gray-500">{p.bookingId}</td>
                    <td className="py-3 px-4 text-xs font-medium text-gray-800">{cleaner?.fullName ?? '—'}</td>
                    <td className="py-3 px-4 text-sm font-bold text-gray-900">{formatCurrency(p.amount)}</td>
                    <td className="py-3 px-4 text-xs capitalize text-gray-600">{p.method}</td>
                    <td className="py-3 px-4 text-xs text-gray-400">{formatDate(p.processedAt)}</td>
                    <td className="py-3 px-4">
                      <Badge variant={statusVariant[p.status]}>{p.status}</Badge>
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
