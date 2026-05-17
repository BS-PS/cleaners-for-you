import Link from 'next/link';
import { ChevronRight, MapPin, Phone, Mail, Heart, LogOut } from 'lucide-react';
import { clients } from '@/lib/fixtures/clients';
import { cleaners } from '@/lib/fixtures/cleaners';
import { Stars } from '@/components/ui/stars';
import { formatDate } from '@/lib/utils';

const client = clients[0];
const saved = cleaners.filter((c) => client.savedCleaners.includes(c.id));

export default function ProfilePage() {
  return (
    <div className="bg-gray-50 pb-4">
      <div className="bg-[#1E3A8A] px-5 pt-3 pb-6">
        <div className="flex items-center gap-4">
          <img src={client.avatarUrl} alt={client.fullName} className="w-16 h-16 rounded-full object-cover border-2 border-white" />
          <div>
            <h1 className="text-white font-bold text-lg">{client.fullName}</h1>
            <p className="text-blue-200 text-xs mt-0.5">Member since {formatDate(client.joinedDate)}</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-3 space-y-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-800 text-sm">Contact</h2>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Phone size={14} className="text-gray-400" />{client.phone}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Mail size={14} className="text-gray-400" />{client.email}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-gray-800 text-sm mb-2">Addresses</h2>
          {client.addresses.map((a) => (
            <div key={a.id} className="flex items-start gap-2 py-2 border-b last:border-0 border-gray-50">
              <MapPin size={14} className="text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-700">{a.line1}</p>
                <p className="text-xs text-gray-400">{a.city} · {a.postcode}</p>
                <p className="text-xs text-gray-400 capitalize">{a.propertyType.replace(/-/g, ' ')}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-1">
            <Heart size={14} className="text-red-400" /> Saved Cleaners
          </h2>
          <div className="space-y-3">
            {saved.map((c) => (
              <Link key={c.id} href={`/client/cleaner/${c.id}`} className="flex items-center gap-3 hover:bg-gray-50 rounded-xl p-1 transition-colors">
                <img src={c.avatarUrl} alt={c.fullName} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{c.fullName}</p>
                  <div className="flex items-center gap-1">
                    <Stars rating={c.rating} size={10} />
                    <span className="text-xs text-gray-500">{c.rating}</span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-gray-400" />
              </Link>
            ))}
          </div>
        </div>

        {[
          { label: 'Payment Methods', icon: '💳' },
          { label: 'Notifications', icon: '🔔' },
          { label: 'Help & Support', icon: '❓' },
          { label: 'Terms & Privacy', icon: '📄' },
        ].map((item) => (
          <button key={item.label} className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 hover:bg-gray-50 transition-colors">
            <span>{item.icon}</span>
            <span className="flex-1 text-sm font-medium text-gray-700 text-left">{item.label}</span>
            <ChevronRight size={14} className="text-gray-400" />
          </button>
        ))}

        <button className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 text-red-500 hover:bg-red-50 transition-colors">
          <LogOut size={16} />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
