import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { earnings } from '@/lib/fixtures/earnings';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';

const weeklyTotal = earnings.reduce((s, e) => s + e.amount, 0);
const paid = earnings.filter((e) => e.status === 'paid').reduce((s, e) => s + e.amount, 0);
const pending = earnings.filter((e) => e.status === 'pending').reduce((s, e) => s + e.amount, 0);

const BARS = [
  { day: 'Mon', amount: 36 },
  { day: 'Tue', amount: 80 },
  { day: 'Wed', amount: 54 },
  { day: 'Thu', amount: 120 },
  { day: 'Fri', amount: 90 },
  { day: 'Sat', amount: 36 },
  { day: 'Sun', amount: 36 },
];
const maxBar = Math.max(...BARS.map((b) => b.amount));

export default function EarningsPage() {
  return (
    <div className="bg-gray-50 pb-4">
      <div className="bg-[#16A34A] px-5 pt-3 pb-6">
        <h1 className="text-white font-bold text-lg">My Earnings</h1>
        <div className="mt-3">
          <p className="text-green-200 text-xs">This week</p>
          <p className="text-white text-4xl font-bold">{formatCurrency(weeklyTotal)}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp size={13} className="text-green-200" />
            <span className="text-green-200 text-xs">+12% vs last week</span>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-3 space-y-3">
        {/* Stats */}
        <div className="bg-white rounded-2xl p-4 shadow-sm grid grid-cols-3 divide-x divide-gray-100">
          {[
            { label: 'Total Bookings', value: earnings.length.toString() },
            { label: 'Paid Out', value: formatCurrency(paid) },
            { label: 'Pending', value: formatCurrency(pending) },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center py-1 px-2">
              <span className="text-base font-bold text-[#16A34A]">{s.value}</span>
              <span className="text-[10px] text-gray-500 text-center">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-gray-800 text-sm mb-3">This Week</h2>
          <div className="flex items-end gap-2 h-24">
            {BARS.map((b) => (
              <div key={b.day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-[#16A34A] transition-all"
                  style={{ height: `${(b.amount / maxBar) * 80}px` }}
                />
                <span className="text-[10px] text-gray-400">{b.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent transactions */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800 text-sm">Recent Transactions</h2>
          </div>
          <div className="space-y-2">
            {earnings.slice(0, 8).reverse().map((e) => (
              <div key={e.id} className="flex items-center justify-between py-2 border-b last:border-0 border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <ArrowUpRight size={14} className="text-[#16A34A]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-800">Booking completed</p>
                    <p className="text-[11px] text-gray-400">{formatDate(e.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{formatCurrency(e.amount)}</p>
                  <Badge variant={e.status === 'paid' ? 'success' : e.status === 'pending' ? 'warning' : 'default'} className="text-[10px]">
                    {e.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button variant="secondary" className="w-full" size="lg">
          Withdraw Earnings ({formatCurrency(paid)})
        </Button>
      </div>
    </div>
  );
}
