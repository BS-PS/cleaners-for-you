'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, CreditCard, AlertCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Cleaner Approval', href: '/admin/cleaners', icon: Users },
  { label: 'Payments', href: '/admin/payments', icon: CreditCard },
  { label: 'Complaints', href: '/admin/complaints', icon: AlertCircle },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top nav */}
      <header className="bg-[#1E3A8A] text-white px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧹</span>
          <div>
            <h1 className="font-bold text-base leading-tight">Cleaners For You</h1>
            <p className="text-blue-300 text-xs">Admin Dashboard</p>
          </div>
        </div>
        <Link href="/" className="flex items-center gap-1 text-blue-300 hover:text-white text-xs transition-colors">
          <ArrowLeft size={12} />Exit
        </Link>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-52 bg-white border-r border-gray-200 flex flex-col pt-4 shrink-0">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={cn('flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors', active ? 'bg-blue-50 text-[#1E3A8A] border-r-2 border-[#1E3A8A]' : 'text-gray-600 hover:bg-gray-50')}>
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
