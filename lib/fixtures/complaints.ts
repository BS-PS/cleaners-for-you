import type { Complaint } from '../types';

const c = (offsetDays: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  date.setHours(11, 0, 0, 0);
  return date.toISOString();
};

export const complaints: Complaint[] = [
  {
    id: 'complaint-001',
    bookingId: 'booking-007',
    clientId: 'client-004',
    category: 'no-show',
    description: 'Cleaner did not arrive for the scheduled booking and did not contact me to let me know. I took the afternoon off work.',
    status: 'resolved',
    priority: 'high',
    createdAt: c(-6),
    assignedToAdminId: 'admin-001',
  },
  {
    id: 'complaint-002',
    bookingId: 'booking-006',
    clientId: 'client-006',
    category: 'quality',
    description: 'Several areas of the office were not cleaned properly — under desks and the tops of cabinets were left dusty.',
    status: 'resolved',
    priority: 'low',
    createdAt: c(-5),
    assignedToAdminId: 'admin-002',
  },
  {
    id: 'complaint-003',
    bookingId: 'booking-003',
    clientId: 'client-003',
    category: 'punctuality',
    description: 'Cleaner arrived 45 minutes late without any prior notice. It disrupted my morning schedule significantly.',
    status: 'in-review',
    priority: 'medium',
    createdAt: c(-10),
    assignedToAdminId: 'admin-001',
  },
  {
    id: 'complaint-004',
    bookingId: 'booking-008',
    clientId: 'client-008',
    category: 'damage',
    description: 'A ceramic vase on the windowsill was knocked over and broken during the clean. The cleaner did not mention it.',
    status: 'escalated',
    priority: 'high',
    createdAt: c(-4),
    assignedToAdminId: 'admin-001',
  },
  {
    id: 'complaint-005',
    bookingId: 'booking-005',
    clientId: 'client-005',
    category: 'behaviour',
    description: 'The cleaner was on the phone for a large portion of the booking which I found unprofessional.',
    status: 'open',
    priority: 'medium',
    createdAt: c(-7),
  },
  {
    id: 'complaint-006',
    bookingId: 'booking-002',
    clientId: 'client-002',
    category: 'quality',
    description: 'Inside of the oven was not cleaned despite this being listed as part of the deep clean service.',
    status: 'in-review',
    priority: 'medium',
    createdAt: c(-12),
    assignedToAdminId: 'admin-002',
  },
  {
    id: 'complaint-007',
    bookingId: 'booking-001',
    clientId: 'client-001',
    category: 'other',
    description: "Cleaner left a window open in the bedroom when she left. Luckily I noticed before it rained but it's concerning.",
    status: 'open',
    priority: 'low',
    createdAt: c(-14),
  },
  {
    id: 'complaint-008',
    bookingId: 'booking-004',
    clientId: 'client-007',
    category: 'quality',
    description: 'The end-of-tenancy clean was good overall but the kitchen extractor fan was missed, which the landlord noted during inspection.',
    status: 'resolved',
    priority: 'medium',
    createdAt: c(-9),
    assignedToAdminId: 'admin-002',
  },
];
