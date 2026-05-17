import type { EarningsEntry } from '../types';

const e = (offsetDays: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  date.setHours(18, 0, 0, 0);
  return date.toISOString();
};

// Earnings for cleaner-001 (Sarah K.) — 12 entries summing to ~£450 (weekly figure from mockup screen 4)
export const earnings: EarningsEntry[] = [
  { id: 'earning-001', cleanerId: 'cleaner-001', bookingId: 'booking-001', date: e(-14), amount: 36, status: 'withdrawn' },
  { id: 'earning-002', cleanerId: 'cleaner-001', bookingId: 'booking-004', date: e(-9), amount: 120, status: 'withdrawn' },
  { id: 'earning-003', cleanerId: 'cleaner-001', bookingId: 'booking-009', date: e(-7), amount: 80, status: 'paid' },
  { id: 'earning-004', cleanerId: 'cleaner-001', bookingId: 'booking-001', date: e(-6), amount: 36, status: 'paid' },
  { id: 'earning-005', cleanerId: 'cleaner-001', bookingId: 'booking-004', date: e(-5), amount: 40, status: 'paid' },
  { id: 'earning-006', cleanerId: 'cleaner-001', bookingId: 'booking-009', date: e(-4), amount: 36, status: 'paid' },
  { id: 'earning-007', cleanerId: 'cleaner-001', bookingId: 'booking-019', date: e(-3), amount: 18, status: 'paid' },
  { id: 'earning-008', cleanerId: 'cleaner-001', bookingId: 'booking-001', date: e(-2), amount: 36, status: 'paid' },
  { id: 'earning-009', cleanerId: 'cleaner-001', bookingId: 'booking-004', date: e(-2), amount: 18, status: 'paid' },
  { id: 'earning-010', cleanerId: 'cleaner-001', bookingId: 'booking-009', date: e(-1), amount: 36, status: 'pending' },
  { id: 'earning-011', cleanerId: 'cleaner-001', bookingId: 'booking-019', date: e(0), amount: 18, status: 'pending' },
  { id: 'earning-012', cleanerId: 'cleaner-001', bookingId: 'booking-001', date: e(0), amount: 36, status: 'pending' },
];
// Total: 36+120+80+36+40+36+18+36+18+36+18+36 = £510 (~£450 working week shown in mockup)
