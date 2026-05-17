export type ServiceType = 'regular' | 'deep' | 'end-of-tenancy' | 'office';

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

export type PaymentMethod = 'card' | 'apple-pay' | 'google-pay';

export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

export type ComplaintStatus = 'open' | 'in-review' | 'resolved' | 'escalated';

export type CleanerApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface Address {
  id: string;
  line1: string;
  line2?: string;
  city: string;
  postcode: string;
  propertyType:
    | '1-bed-flat'
    | '2-bed-flat'
    | '3-bed-house'
    | '4-bed-house'
    | 'office';
}

export interface Cleaner {
  id: string;
  fullName: string;
  avatarUrl: string;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  hourlyRate: number;
  bio: string;
  specialties: ServiceType[];
  dbsChecked: boolean;
  insuranceVerified: boolean;
  availabilityToday: boolean;
  location: string;
  completedJobs: number;
}

export interface CleanerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dbsUploadStatus: 'uploaded' | 'pending' | 'verified';
  insuranceUploadStatus: 'uploaded' | 'pending' | 'verified';
  referencesProvided: boolean;
  status: CleanerApplicationStatus;
  submittedAt: string;
}

export interface Client {
  id: string;
  fullName: string;
  avatarUrl: string;
  phone: string;
  email: string;
  addresses: Address[];
  savedCleaners: string[];
  joinedDate: string;
}

export interface Service {
  id: string;
  type: ServiceType;
  displayName: string;
  basePrice: number;
  durationHours: number;
  description: string;
  iconKey: string;
}

export interface Task {
  id: string;
  label: string;
  completed: boolean;
}

export interface Booking {
  id: string;
  clientId: string;
  cleanerId: string;
  serviceId: string;
  addressId: string;
  scheduledStart: string;
  scheduledEnd: string;
  status: BookingStatus;
  totalPrice: number;
  paymentId: string;
  createdAt: string;
  tasks: Task[];
  trackingEta?: number;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  processedAt: string;
  last4?: string;
}

export interface Review {
  id: string;
  bookingId: string;
  cleanerId: string;
  clientId: string;
  rating: number;
  comment: string;
  photos: string[];
  createdAt: string;
  tip?: number;
}

export interface Complaint {
  id: string;
  bookingId: string;
  clientId: string;
  category:
    | 'quality'
    | 'punctuality'
    | 'damage'
    | 'behaviour'
    | 'no-show'
    | 'other';
  description: string;
  status: ComplaintStatus;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  assignedToAdminId?: string;
}

export interface EarningsEntry {
  id: string;
  cleanerId: string;
  bookingId: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid' | 'withdrawn';
}

export interface AdminMetrics {
  totalCleaners: number;
  totalRevenue: number;
  activeBookings: number;
  pendingApplications: number;
  totalComplaints: number;
  openComplaints: number;
  bookingsThisWeek: number;
  revenueByWeek: Array<{ week: string; revenue: number }>;
}
