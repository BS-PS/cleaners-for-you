import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 'service-001',
    type: 'regular',
    displayName: 'Regular Clean',
    basePrice: 18,
    durationHours: 2,
    description: 'Routine weekly or fortnightly clean covering all main living areas.',
    iconKey: 'Sparkles',
  },
  {
    id: 'service-002',
    type: 'deep',
    displayName: 'Deep Clean',
    basePrice: 20,
    durationHours: 4,
    description: 'Thorough top-to-bottom clean including inside appliances and detailed scrubbing.',
    iconKey: 'ShieldCheck',
  },
  {
    id: 'service-003',
    type: 'end-of-tenancy',
    displayName: 'End of Tenancy',
    basePrice: 20,
    durationHours: 6,
    description: 'Full vacate clean to meet landlord and letting agent standards.',
    iconKey: 'KeyRound',
  },
  {
    id: 'service-004',
    type: 'office',
    displayName: 'Office Clean',
    basePrice: 18,
    durationHours: 3,
    description: 'Professional workplace cleaning for offices, studios, and commercial spaces.',
    iconKey: 'Building2',
  },
];
