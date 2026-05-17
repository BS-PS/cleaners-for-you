import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { earnings } from '@/lib/fixtures/earnings';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';

const weeklyTotal = earnings.reduce((s, e) => s + e.amount, 0);
const paid    = earnings.filter((e) => e.status === 'paid').reduce((s, e) => s + e.amount, 0);
const pending = earnings.filter((e) => e.status === 'pending').reduce((s, e) => s + e.amount, 0);

const BARS = [
  { day: 'Mon', amount: 36 }, { day: 'Tue', amount: 80 },
  { day: 'Wed', amount: 54 }, { day: 'Thu', amount: 120 },
  { day: 'Fri', amount: 90 }, { day: 'Sat', amount: 36 },
  { day: 'Sun', amount: 36 },
];
const maxBar = Math.max(...BARS.map((b) => b.amount));

export default function EarningsPage() {
  return (
    <div className="bg-cbg pb-4">
      <div className="bg-cgreen px-5 pt-4 pb-6">
        <h1 className="text-white font-bold text-lg">My Earnings</h1>
        <div className="mt-2">
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
        <div className="bg-white rounded-card shadow-card p-4 grid grid-cols-3 divide-x divide-cborder">
          {[
            { label: 'Total Jobs', value: earnings.length.toString() },
            { label: 'Paid Out',   value: formatCurrency(paid) },
            { label: 'Pending',    value: formatCurrency(pending) },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center py-1 px-2">
              <span className="text-base font-bold text-cgreen">{s.value}</span>
              <span className="text-[10px] text-cmuted text-center">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="bg-white rounded-card shadow-card p-4">
          <h2 className="font-bold text-ctext text-sm mb-3">This Week</h2>
          <div className="flex items-end gap-2 h-28">
            {BARS.map((b) => (
              <div key={b.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-cmuted font-semibold">{b.amount > 50 ? formatCurrency(b.amount) : ''}</span>
                <div className="w-full rounded-t-md bg-cgreen transition-all" style={{ height: `${(b.amount / maxBar) * 80}px` }} />
                <span className="text-[10px] text-cmuted">{b.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-card shadow-card p-4">
          <h2 className="font-bold text-ctext text-sm mb-3">Recent Transactions</h2>
          <div className="space-y-2">
            {earnings.slice(0, 8).reverse().map((e) => (
              <div key={e.id} className="flex items-center justify-between py-2 border-b last:border-0 border-cborder">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-cgreen-light rounded-full flex items-center justify-center">
                    <ArrowUpRight size={14} className="text-cgreen" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-ctext">Booking completed</p>
                    <p className="text-[11px] text-cmuted">{formatDate(e.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-ctext">{formatCurrency(e.amount)}</p>
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
