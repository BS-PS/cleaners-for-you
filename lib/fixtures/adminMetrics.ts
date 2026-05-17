import type { AdminMetrics } from '../types';

const weekLabel = (weeksAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - weeksAgo * 7);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}`;
};

export const adminMetrics: AdminMetrics = {
  totalCleaners: 1248,
  totalRevenue: 34860,
  activeBookings: 512,
  pendingApplications: 842,
  totalComplaints: 24,
  openComplaints: 8,
  bookingsThisWeek: 137,
  revenueByWeek: [
    { week: weekLabel(11), revenue: 2100 },
    { week: weekLabel(10), revenue: 2450 },
    { week: weekLabel(9), revenue: 2280 },
    { week: weekLabel(8), revenue: 2750 },
    { week: weekLabel(7), revenue: 2600 },
    { week: weekLabel(6), revenue: 3100 },
    { week: weekLabel(5), revenue: 2900 },
    { week: weekLabel(4), revenue: 3300 },
    { week: weekLabel(3), revenue: 3150 },
    { week: weekLabel(2), revenue: 3500 },
    { week: weekLabel(1), revenue: 3340 },
    { week: weekLabel(0), revenue: 3390 },
  ],
};
