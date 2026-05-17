import Link from 'next/link';
import { Bell, MapPin, ChevronRight, Star, Shield, Clock, Sparkles } from 'lucide-react';
import { clients } from '@/lib/fixtures/clients';
import { services } from '@/lib/fixtures/services';
import { cleaners } from '@/lib/fixtures/cleaners';
import { formatCurrency } from '@/lib/utils';
import { Stars } from '@/components/ui/stars';

const client = clients[0]; // Emily Johnson
const featured = cleaners.filter((c) => c.availabilityToday).slice(0, 3);

const serviceIcons: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles size={22} className="text-[#1E3A8A]" />,
  ShieldCheck: <Shield size={22} className="text-[#1E3A8A]" />,
  KeyRound: <span className="text-lg">🔑</span>,
  Building2: <span className="text-lg">🏢</span>,
};

export default function ClientHome() {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="bg-[#1E3A8A] px-5 pt-3 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-200 text-xs">Good morning,</p>
            <h1 className="text-white font-bold text-lg">{client.fullName} 👋</h1>
          </div>
          <div className="relative">
            <Bell size={22} className="text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">2</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
          <MapPin size={14} className="text-blue-200" />
          <span className="text-white text-sm">{client.addresses[0].line1}, {client.addresses[0].postcode}</span>
        </div>
      </div>

      {/* What service? */}
      <div className="px-4 -mt-3">
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <h2 className="font-bold text-gray-800 mb-3">What service do you need?</h2>
          <div className="grid grid-cols-2 gap-3">
            {services.map((s) => (
              <Link key={s.id} href={`/client/book?service=${s.id}`}
                className="flex flex-col items-center bg-blue-50 rounded-xl p-3 gap-1 hover:bg-blue-100 transition-colors">
                {serviceIcons[s.iconKey]}
                <span className="text-xs font-semibold text-gray-700 text-center">{s.displayName}</span>
                <span className="text-xs text-[#1E3A8A] font-bold">from {formatCurrency(s.basePrice)}/hr</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Services quick pills */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-gray-800">Popular Services</h2>
            <Link href="/client/book" className="text-xs text-[#1E3A8A] font-semibold">View all</Link>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['Regular Clean', 'Deep Clean', 'End of Tenancy', 'Office'].map((label) => (
              <Link key={label} href="/client/book" className="shrink-0 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-[#1E3A8A] hover:text-[#1E3A8A] transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Cleaners */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-gray-800">Featured Cleaners</h2>
            <Link href="/client/book" className="text-xs text-[#1E3A8A] font-semibold">View all</Link>
          </div>
          <div className="space-y-3">
            {featured.map((cleaner) => (
              <Link key={cleaner.id} href={`/client/cleaner/${cleaner.id}`}
                className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm hover:shadow transition-shadow">
                <img src={cleaner.avatarUrl} alt={cleaner.fullName} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900 text-sm">{cleaner.fullName}</span>
                    {cleaner.dbsChecked && <Shield size={12} className="text-[#16A34A]" />}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Stars rating={cleaner.rating} size={11} />
                    <span className="text-xs text-gray-500">{cleaner.rating} ({cleaner.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-[#1E3A8A] font-bold">{formatCurrency(cleaner.hourlyRate)}/hr</span>
                    <span className="text-xs text-gray-400">· {cleaner.location}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Clock size={9} />Available
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400 shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { icon: '🛡️', label: 'DBS Checked' },
            { icon: '🔒', label: 'Fully Insured' },
            { icon: '✅', label: 'Verified' },
          ].map((b) => (
            <div key={b.label} className="bg-white rounded-xl p-2 flex flex-col items-center gap-1 shadow-sm">
              <span className="text-lg">{b.icon}</span>
              <span className="text-[10px] font-semibold text-gray-600 text-center">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
