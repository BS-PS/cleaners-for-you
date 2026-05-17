import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `£${amount.toFixed(2).replace(/\.00$/, '')}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function starArray(rating: number): (1 | 0.5 | 0)[] {
  return [1, 2, 3, 4, 5].map((i) => {
    if (rating >= i) return 1;
    if (rating >= i - 0.5) return 0.5;
    return 0;
  });
}
