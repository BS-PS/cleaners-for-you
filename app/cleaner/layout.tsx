'use client';
import { CleanerBottomNav } from '@/components/BottomNav';

export default function CleanerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative mx-auto w-[390px] bg-white rounded-[40px] shadow-2xl border-4 border-gray-800 overflow-hidden flex flex-col" style={{ minHeight: 820 }}>
        <div className="flex items-center justify-between px-6 pt-3 pb-1 bg-white shrink-0">
          <span className="text-xs font-bold">9:41</span>
          <div className="w-28 h-5 bg-gray-900 rounded-full" />
          <span className="text-xs font-bold">●●● 100%</span>
        </div>
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: 700 }}>
          {children}
        </div>
        <CleanerBottomNav />
      </div>
    </div>
  );
}
