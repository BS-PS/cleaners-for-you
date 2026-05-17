'use client';
import { cn } from '@/lib/utils';

export function PhoneShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('relative mx-auto w-[375px] min-h-[780px] bg-white rounded-[40px] shadow-2xl border-4 border-gray-800 overflow-hidden flex flex-col', className)}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1 bg-inherit">
        <span className="text-xs font-semibold">9:41</span>
        <div className="w-24 h-5 bg-gray-800 rounded-full" />
        <div className="flex gap-1 items-center">
          <span className="text-xs">●●●</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {children}
      </div>
    </div>
  );
}
