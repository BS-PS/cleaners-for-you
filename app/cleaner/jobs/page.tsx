import Link from 'next/link';
import { MapPin, Clock, CheckCircle } from 'lucide-react';
import { bookings } from '@/lib/fixtures/bookings';
import { clients } from '@/lib/fixtures/clients';
import { services } from '@/lib/fixtures/services';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate, formatTime } from '@/lib/utils';

const CLEANER_ID = 'cleaner-001';

const allJobs = bookings
  .filter((b) => b.cleanerId === CLEANER_ID)
  .sort((a, b) => new Date(a.scheduledStart).getTime() - new Date(b.scheduledStart).getTime());

const available = bookings
  .filter((b) => b.status === 'pending' && b.cleanerId !== CLEANER_ID)
  .slice(0, 4);

export default function JobsPage() {
  return (
    <div className="bg-gray-50 pb-4">
      <div className="bg-[#16A34A] px-5 pt-3 pb-4">
        <h1 className="text-white font-bold text-lg">Available Jobs</h1>
        <p className="text-green-200 text-xs mt-0.5">{available.length} new jobs near you</p>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Available to accept */}
        <div>
          <h2 className="font-bold text-gray-800 text-sm mb-2">New Jobs Near You</h2>
          <div className="space-y-3">
            {available.map((b) => {
              const client = clients.find((c) => c.id === b.clientId)!;
              const service = services.find((s) => s.id === b.serviceId)!;
              const addr = client.addresses.find((a) => a.id === b.addressId) ?? client.addresses[0];
              return (
                <div key={b.id} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{service.displayName}</h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin size={11} className="text-gray-400" />
                        <span className="text-xs text-gray-500">{addr.city} · {addr.postcode}</span>
                      </div>
                    </div>
                    <span className="text-base font-bold text-[#16A34A]">{formatCurrency(b.totalPrice)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><Clock size={10} />{formatDate(b.scheduledStart)} · {formatTime(b.scheduledStart)}</span>
                    <span>{service.durationHours}hrs</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">Accept</Button>
                    <Button size="sm" variant="outline" className="flex-1">Decline</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* My upcoming */}
        <div>
          <h2 className="font-bold text-gray-800 text-sm mb-2">My Upcoming Jobs</h2>
          <div className="space-y-3">
            {allJobs.filter((b) => ['confirmed', 'in-progress'].includes(b.status)).map((b) => {
              const service = services.find((s) => s.id === b.serviceId)!;
              return (
                <div key={b.id} className="bg-white rounded-2xl p-3 shadow-sm flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${b.status === 'in-progress' ? 'bg-green-100' : 'bg-blue-100'}`}>
                    {b.status === 'in-progress' ? <Clock size={18} className="text-[#16A34A]" /> : <CheckCircle size={18} className="text-[#1E3A8A]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{service.displayName}</p>
                    <p className="text-xs text-gray-400">{formatDate(b.scheduledStart)} · {formatTime(b.scheduledStart)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#1E3A8A]">{formatCurrency(b.totalPrice)}</p>
                    <Badge variant={b.status === 'in-progress' ? 'success' : 'info'} className="text-[10px]">
                      {b.status === 'in-progress' ? 'Active' : 'Confirmed'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
