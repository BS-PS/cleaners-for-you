'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ClientBottomNav } from '@/components/BottomNav';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cbg flex flex-col items-center justify-center p-6">
      {/* Back to portal */}
      <div className="w-full max-w-[390px] mb-2 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-1 text-xs text-cmuted hover:text-navy transition-colors">
          <ArrowLeft size={12} /> Portal Home
        </Link>
      </div>
      {/* Phone shell */}
      <div
        className="relative w-[390px] bg-white rounded-shell shadow-shell border-4 border-gray-800 overflow-hidden flex flex-col"
        style={{ minHeight: 820 }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1 bg-navy shrink-0">
          <span className="text-xs font-bold text-white">9:41</span>
          <div className="w-24 h-5 bg-gray-900 rounded-full" />
          <span className="text-xs font-bold text-white">100%</span>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ maxHeight: 700 }}>
          {children}
        </div>
        <ClientBottomNav />
      </div>
    </div>
  );
}
