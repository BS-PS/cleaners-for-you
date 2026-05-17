import Link from 'next/link';
import { Bell, CheckCircle, Clock, ChevronRight, Star } from 'lucide-react';
import { cleaners } from '@/lib/fixtures/cleaners';
import { bookings } from '@/lib/fixtures/bookings';
import { clients } from '@/lib/fixtures/clients';
import { services } from '@/lib/fixtures/services';
import { earnings } from '@/lib/fixtures/earnings';
import { formatCurrency, formatTime } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const sarah = cleaners[0];
const todaysBookings = bookings
  .filter((b) => b.cleanerId === sarah.id && ['in-progress', 'confirmed'].includes(b.status))
  .slice(0, 3);
const todayEarnings = earnings.filter((e) => {
  const d = new Date(e.date); const now = new Date();
  return d.toDateString() === now.toDateString();
});
const todayTotal = todayEarnings.reduce((s, e) => s + e.amount, 0) || 36;

export default function CleanerDashboard() {
  return (
    <div className="bg-cbg">
      {/* Header */}
      <div className="bg-cgreen px-5 pt-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-green-200 text-xs">Good morning,</p>
            <h1 className="text-white font-bold text-lg">{sarah.fullName} 👋</h1>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={11} className="fill-camber text-camber" />
              <span className="text-green-200 text-xs">{sarah.rating} · {sarah.completedJobs} jobs completed</span>
            </div>
          </div>
          <div className="relative">
            <img src={sarah.avatarUrl} alt={sarah.fullName} className="w-12 h-12 rounded-full border-2 border-white object-cover" />
            <Bell size={14} className="absolute -bottom-1 -right-1 bg-white text-cgreen rounded-full p-0.5" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Today's Jobs",  value: todaysBookings.length.toString() },
            { label: "Today's Earn",  value: formatCurrency(todayTotal) },
            { label: 'Rating',        value: `${sarah.rating}⭐` },
          ].map((s) => (
            <div key={s.label} className="bg-white/20 rounded-xl p-2 text-center">
              <div className="text-white font-bold text-base">{s.value}</div>
              <div className="text-green-200 text-[10px]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 -mt-3 space-y-3">
        {/* Status */}
        <div className="bg-white rounded-card shadow-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-cmuted">Availability Status</p>
            <p className="text-sm font-bold text-cgreen">Available for bookings</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-cgreen rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-cgreen">Online</span>
          </div>
        </div>

        {/* Today's schedule */}
        <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-ctext text-sm">Today's Schedule</h2>
            <Link href="/cleaner/jobs" className="text-xs text-cblue font-semibold">View all</Link>
          </div>
          {todaysBookings.length === 0 ? (
            <p className="text-sm text-cmuted text-center py-4">No bookings today</p>
          ) : (
            <div className="space-y-3">
              {todaysBookings.map((b) => {
                const client = clients.find((c) => c.id === b.clientId)!;
                const service = services.find((s) => s.id === b.serviceId)!;
                return (
                  <Link key={b.id} href="/cleaner/jobs" className="flex items-center gap-3 hover:bg-cbg rounded-xl p-1.5 transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${b.status === 'in-progress' ? 'bg-cgreen-light' : 'bg-cbg'}`}>
                      {b.status === 'in-progress'
                        ? <Clock size={18} className="text-cgreen" />
                        : <CheckCircle size={18} className="text-cmuted" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-ctext">{service.displayName}</p>
                      <p className="text-xs text-cmuted">{client.fullName} · {formatTime(b.scheduledStart)}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-cgreen">{formatCurrency(b.totalPrice)}</p>
                      <Badge variant={b.status === 'in-progress' ? 'info' : 'default'} className="text-[10px]">
                        {b.status === 'in-progress' ? 'Active' : 'Upcoming'}
                      </Badge>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3 pb-4">
          {[
            { label: 'Available Jobs', href: '/cleaner/jobs',     icon: '🔍', bg: 'bg-navy-light' },
            { label: 'My Earnings',    href: '/cleaner/earnings', icon: '💰', bg: 'bg-cgreen-light' },
            { label: 'My Reviews',     href: '/cleaner/profile',  icon: '⭐', bg: 'bg-amber-50' },
            { label: 'Availability',   href: '/cleaner/profile',  icon: '📅', bg: 'bg-purple-50' },
          ].map((item) => (
            <Link key={item.label} href={item.href}
              className={`${item.bg} rounded-card p-4 flex items-center gap-2 hover:opacity-80 transition-opacity shadow-card`}>
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-semibold text-ctext flex-1">{item.label}</span>
              <ChevronRight size={12} className="text-cmuted" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
