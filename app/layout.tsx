import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cleaners For You — POC',
  description: 'UK Cleaning Marketplace Demo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
