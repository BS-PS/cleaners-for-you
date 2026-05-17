'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, CreditCard, AlertCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { label: 'Overview',         href: '/admin',            icon: LayoutDashboard },
  { label: 'Cleaner Approval', href: '/admin/cleaners',   icon: Users },
  { label: 'Payments',         href: '/admin/payments',   icon: CreditCard },
  { label: 'Complaints',       href: '/admin/complaints', icon: AlertCircle },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-cbg flex flex-col">
      {/* Top bar */}
      <header className="bg-navy text-white px-6 py-3 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
            <span className="text-lg">🧹</span>
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight">Cleaners For You</h1>
            <p className="text-navy-light text-xs">Admin Dashboard</p>
          </div>
        </div>
        <Link href="/" className="flex items-center gap-1.5 text-navy-light hover:text-white text-xs transition-colors">
          <ArrowLeft size={13} />Exit to Portal
        </Link>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-52 bg-white border-r border-cborder flex flex-col pt-4 shrink-0">
          <p className="text-[10px] font-semibold text-cmuted uppercase tracking-widest px-4 mb-2">Navigation</p>
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-r-2',
                  active
                    ? 'bg-navy-light text-navy border-navy'
                    : 'text-cmuted hover:bg-cbg border-transparent'
                )}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
