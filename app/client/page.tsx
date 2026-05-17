import Link from 'next/link';
import { Bell, MapPin, ChevronRight, Shield, Clock, Sparkles } from 'lucide-react';
import { clients } from '@/lib/fixtures/clients';
import { services } from '@/lib/fixtures/services';
import { cleaners } from '@/lib/fixtures/cleaners';
import { formatCurrency } from '@/lib/utils';
import { Stars } from '@/components/ui/stars';

const client = clients[0];
const featured = cleaners.filter((c) => c.availabilityToday).slice(0, 3);

const serviceIcons: Record<string, React.ReactNode> = {
  Sparkles:   <Sparkles size={22} className="text-navy" />,
  ShieldCheck: <Shield size={22} className="text-navy" />,
  KeyRound:   <span className="text-xl">🔑</span>,
  Building2:  <span className="text-xl">🏢</span>,
};

export default function ClientHome() {
  return (
    <div className="bg-cbg">
      {/* Header */}
      <div className="bg-navy px-5 pt-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-navy-light text-xs">Good morning,</p>
            <h1 className="text-white font-bold text-lg">Hello, {client.fullName.split(' ')[0]} 👋</h1>
          </div>
          <div className="relative">
            <Bell size={22} className="text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-cred rounded-full text-white text-[10px] flex items-center justify-center font-bold">2</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
          <MapPin size={14} className="text-navy-light" />
          <span className="text-white text-xs">{client.addresses[0].line1}, {client.addresses[0].postcode}</span>
        </div>
      </div>

      {/* Services */}
      <div className="px-4 -mt-3 space-y-4">
        <div className="bg-white rounded-card shadow-card p-4">
          <h2 className="font-bold text-ctext mb-3 text-sm">What service do you need?</h2>
          <div className="grid grid-cols-2 gap-2">
            {services.map((s) => (
              <Link key={s.id} href={`/client/book?service=${s.id}`}
                className="flex flex-col items-center bg-navy-light rounded-xl p-3 gap-1 hover:bg-blue-100 transition-colors">
                {serviceIcons[s.iconKey]}
                <span className="text-xs font-semibold text-ctext text-center">{s.displayName}</span>
                <span className="text-xs text-navy font-bold">from {formatCurrency(s.basePrice)}/hr</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular pills */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-ctext text-sm">Popular Services</h2>
            <Link href="/client/book" className="text-xs text-cblue font-semibold">View all</Link>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {['Regular Clean', 'Deep Clean', 'End of Tenancy', 'Office'].map((label) => (
              <Link key={label} href="/client/book"
                className="shrink-0 bg-white border border-cborder rounded-full px-3 py-1.5 text-xs font-medium text-ctext hover:border-navy hover:text-navy transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Cleaners */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-ctext text-sm">Featured Cleaners</h2>
            <Link href="/client/book" className="text-xs text-cblue font-semibold">View all</Link>
          </div>
          <div className="space-y-2">
            {featured.map((cleaner) => (
              <Link key={cleaner.id} href={`/client/cleaner/${cleaner.id}`}
                className="flex items-center gap-3 bg-white rounded-card p-3 shadow-card hover:shadow transition-shadow">
                <img src={cleaner.avatarUrl} alt={cleaner.fullName} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-ctext text-sm">{cleaner.fullName}</span>
                    {cleaner.dbsChecked && <Shield size={12} className="text-cgreen" />}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Stars rating={cleaner.rating} size={11} />
                    <span className="text-xs text-cmuted">{cleaner.rating} ({cleaner.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-navy font-bold">{formatCurrency(cleaner.hourlyRate)}/hr</span>
                    <span className="text-xs text-cmuted">· {cleaner.location}</span>
                    <span className="text-[10px] bg-cgreen-light text-cgreen px-1.5 py-0.5 rounded-full flex items-center gap-0.5 font-medium">
                      <Clock size={9} />Available
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-cborder shrink-0" />
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
            <div key={b.label} className="bg-white rounded-card p-3 flex flex-col items-center gap-1 shadow-card">
              <span className="text-xl">{b.icon}</span>
              <span className="text-[10px] font-semibold text-cmuted text-center">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
