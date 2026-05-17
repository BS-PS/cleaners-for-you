'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Search, User, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function ClientBottomNav() {
  const pathname = usePathname();
  const items: NavItem[] = [
    { label: 'Home', href: '/client', icon: <Home size={20} /> },
    { label: 'Book', href: '/client/book', icon: <Search size={20} /> },
    { label: 'Bookings', href: '/client/bookings', icon: <Calendar size={20} /> },
    { label: 'Profile', href: '/client/profile', icon: <User size={20} /> },
  ];
  return <BottomNav items={items} pathname={pathname} />;
}

export function CleanerBottomNav() {
  const pathname = usePathname();
  const items: NavItem[] = [
    { label: 'Dashboard', href: '/cleaner', icon: <Home size={20} /> },
    { label: 'Jobs', href: '/cleaner/jobs', icon: <Search size={20} /> },
    { label: 'Earnings', href: '/cleaner/earnings', icon: <LayoutDashboard size={20} /> },
    { label: 'Profile', href: '/cleaner/profile', icon: <User size={20} /> },
  ];
  return <BottomNav items={items} pathname={pathname} />;
}

function BottomNav({ items, pathname }: { items: NavItem[]; pathname: string }) {
  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 flex">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn('flex-1 flex flex-col items-center py-2 gap-0.5 text-xs transition-colors', active ? 'text-[#1E3A8A]' : 'text-gray-400 hover:text-gray-600')}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
