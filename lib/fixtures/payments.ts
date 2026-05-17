import type { Payment } from '../types';

const p = (offsetDays: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  date.setHours(8, 30, 0, 0);
  return date.toISOString();
};

export const payments: Payment[] = [
  { id: 'payment-001', bookingId: 'booking-001', amount: 36, method: 'card', status: 'paid', processedAt: p(-14), last4: '4242' },
  { id: 'payment-002', bookingId: 'booking-002', amount: 80, method: 'apple-pay', status: 'paid', processedAt: p(-12) },
  { id: 'payment-003', bookingId: 'booking-003', amount: 36, method: 'card', status: 'paid', processedAt: p(-10), last4: '1234' },
  { id: 'payment-004', bookingId: 'booking-004', amount: 120, method: 'card', status: 'paid', processedAt: p(-9), last4: '9876' },
  { id: 'payment-005', bookingId: 'booking-005', amount: 88, method: 'google-pay', status: 'paid', processedAt: p(-7) },
  { id: 'payment-006', bookingId: 'booking-006', amount: 54, method: 'card', status: 'paid', processedAt: p(-5), last4: '5555' },
  { id: 'payment-007', bookingId: 'booking-007', amount: 36, method: 'card', status: 'refunded', processedAt: p(-6), last4: '3333' },
  { id: 'payment-008', bookingId: 'booking-008', amount: 72, method: 'apple-pay', status: 'refunded', processedAt: p(-4) },
  { id: 'payment-009', bookingId: 'booking-009', amount: 80, method: 'card', status: 'paid', processedAt: p(-1), last4: '4242' },
  { id: 'payment-010', bookingId: 'booking-010', amount: 57, method: 'google-pay', status: 'paid', processedAt: p(-1) },
  { id: 'payment-011', bookingId: 'booking-011', amount: 40, method: 'card', status: 'pending', processedAt: p(1), last4: '7890' },
  { id: 'payment-012', bookingId: 'booking-012', amount: 120, method: 'apple-pay', status: 'pending', processedAt: p(2) },
  { id: 'payment-013', bookingId: 'booking-013', amount: 42, method: 'card', status: 'pending', processedAt: p(3), last4: '1111' },
  { id: 'payment-014', bookingId: 'booking-014', amount: 36, method: 'card', status: 'pending', processedAt: p(5), last4: '2222' },
  { id: 'payment-015', bookingId: 'booking-015', amount: 72, method: 'google-pay', status: 'pending', processedAt: p(7) },
  { id: 'payment-016', bookingId: 'booking-016', amount: 120, method: 'card', status: 'pending', processedAt: p(8), last4: '6666' },
  { id: 'payment-017', bookingId: 'booking-017', amount: 38, method: 'apple-pay', status: 'pending', processedAt: p(10) },
  { id: 'payment-018', bookingId: 'booking-018', amount: 72, method: 'card', status: 'pending', processedAt: p(11), last4: '8888' },
  { id: 'payment-019', bookingId: 'booking-019', amount: 36, method: 'card', status: 'pending', processedAt: p(12), last4: '4444' },
  { id: 'payment-020', bookingId: 'booking-020', amount: 54, method: 'google-pay', status: 'pending', processedAt: p(14) },
];
