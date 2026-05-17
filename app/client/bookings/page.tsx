import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { bookings } from '@/lib/fixtures/bookings';
import { cleaners } from '@/lib/fixtures/cleaners';
import { services } from '@/lib/fixtures/services';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate, formatTime } from '@/lib/utils';
import type { BookingStatus } from '@/lib/types';

const CLIENT_ID = 'client-001';

const statusVariant: Record<BookingStatus, 'success' | 'info' | 'warning' | 'danger' | 'default'> = {
  completed: 'success',
  'in-progress': 'info',
  confirmed: 'info',
  pending: 'warning',
  cancelled: 'danger',
};

const statusLabel: Record<BookingStatus, string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  confirmed: 'Confirmed',
  pending: 'Pending',
  cancelled: 'Cancelled',
};

export default function BookingsPage() {
  const myBookings = bookings.filter((b) => b.clientId === CLIENT_ID)
    .sort((a, b) => new Date(b.scheduledStart).getTime() - new Date(a.scheduledStart).getTime());

  return (
    <div className="bg-gray-50 pb-4">
      <div className="bg-[#1E3A8A] px-5 pt-3 pb-4">
        <h1 className="text-white font-bold text-lg">Booking History</h1>
        <p className="text-blue-200 text-xs mt-0.5">{myBookings.length} bookings</p>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {myBookings.map((booking) => {
          const cleaner = cleaners.find((c) => c.id === booking.cleanerId)!;
          const service = services.find((s) => s.id === booking.serviceId)!;
          return (
            <div key={booking.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <img src={cleaner.avatarUrl} alt={cleaner.fullName} className="w-10 h-10 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-semibold text-gray-900 text-sm">{service.displayName}</span>
                    <Badge variant={statusVariant[booking.status]}>{statusLabel[booking.status]}</Badge>
                  </div>
                  <p className="text-xs text-gray-500">{cleaner.fullName}</p>
                  <p className="text-xs text-gray-400 mt-1">{formatDate(booking.scheduledStart)} · {formatTime(booking.scheduledStart)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-[#1E3A8A]">{formatCurrency(booking.totalPrice)}</span>
                    <div className="flex gap-2">
                      {booking.status === 'in-progress' && (
                        <Link href="/client/tracking" className="text-xs text-[#1E3A8A] font-semibold underline">Track</Link>
                      )}
                      {booking.status === 'completed' && (
                        <Link href="/client/review" className="text-xs text-[#16A34A] font-semibold underline">Review</Link>
                      )}
                      <button className="text-xs text-gray-400 underline">Rebook</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
