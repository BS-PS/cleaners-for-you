import Link from 'next/link';
import { Bell, CheckCircle, Clock, ChevronRight, Star } from 'lucide-react';
import { cleaners } from '@/lib/fixtures/cleaners';
import { bookings } from '@/lib/fixtures/bookings';
import { clients } from '@/lib/fixtures/clients';
import { services } from '@/lib/fixtures/services';
import { earnings } from '@/lib/fixtures/earnings';
import { formatCurrency, formatTime, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const sarah = cleaners[0];
const todaysBookings = bookings
  .filter((b) => b.cleanerId === sarah.id && ['in-progress', 'confirmed'].includes(b.status))
  .slice(0, 3);

const todayEarnings = earnings.filter((e) => {
  const d = new Date(e.date);
  const now = new Date();
  return d.toDateString() === now.toDateString();
});
const todayTotal = todayEarnings.reduce((s, e) => s + e.amount, 0);

export default function CleanerDashboard() {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="bg-[#16A34A] px-5 pt-3 pb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-green-200 text-xs">Good morning,</p>
            <h1 className="text-white font-bold text-lg">{sarah.fullName} 👋</h1>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span className="text-green-200 text-xs">{sarah.rating} · {sarah.completedJobs} jobs completed</span>
            </div>
          </div>
          <div className="relative">
            <img src={sarah.avatarUrl} alt={sarah.fullName} className="w-12 h-12 rounded-full border-2 border-white object-cover" />
            <Bell size={16} className="absolute -bottom-1 -right-1 bg-white text-gray-600 rounded-full p-0.5" />
          </div>
        </div>

        {/* Today stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Today's Jobs", value: todaysBookings.length.toString() },
            { label: "Today's Earn", value: formatCurrency(todayTotal || 36) },
            { label: 'Rating', value: `${sarah.rating}⭐` },
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
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Availability Status</p>
            <p className="text-sm font-bold text-[#16A34A]">Available for bookings</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-green-600">Online</span>
          </div>
        </div>

        {/* Upcoming jobs */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800 text-sm">Today's Schedule</h2>
            <Link href="/cleaner/jobs" className="text-xs text-[#16A34A] font-semibold">View all</Link>
          </div>
          {todaysBookings.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">No bookings today</p>
          ) : (
            <div className="space-y-3">
              {todaysBookings.map((b) => {
                const client = clients.find((c) => c.id === b.clientId)!;
                const service = services.find((s) => s.id === b.serviceId)!;
                return (
                  <Link key={b.id} href="/cleaner/jobs" className="flex items-center gap-3 hover:bg-gray-50 rounded-xl p-1 transition-colors">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      {b.status === 'in-progress' ? <Clock size={18} className="text-[#16A34A]" /> : <CheckCircle size={18} className="text-gray-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">{service.displayName}</p>
                      <p className="text-xs text-gray-500">{client.fullName} · {formatTime(b.scheduledStart)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#16A34A]">{formatCurrency(b.totalPrice)}</p>
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
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Available Jobs', href: '/cleaner/jobs', icon: '🔍', color: 'bg-blue-50' },
            { label: 'My Earnings', href: '/cleaner/earnings', icon: '💰', color: 'bg-green-50' },
            { label: 'My Reviews', href: '/cleaner/profile', icon: '⭐', color: 'bg-amber-50' },
            { label: 'Availability', href: '/cleaner/profile', icon: '📅', color: 'bg-purple-50' },
          ].map((item) => (
            <Link key={item.label} href={item.href}
              className={`${item.color} rounded-2xl p-4 flex items-center gap-2 hover:opacity-80 transition-opacity`}>
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-semibold text-gray-700">{item.label}</span>
              <ChevronRight size={12} className="text-gray-400 ml-auto" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
