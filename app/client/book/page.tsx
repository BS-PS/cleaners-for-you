'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/lib/fixtures/services';
import { cleaners } from '@/lib/fixtures/cleaners';
import { Button } from '@/components/ui/button';
import { Stars } from '@/components/ui/stars';
import { formatCurrency } from '@/lib/utils';

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

function buildCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (firstDay + 6) % 7;
  return { year, month, daysInMonth, offset, today: today.getDate() };
}

export default function BookPage() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState(services[0].id);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedCleaner, setSelectedCleaner] = useState<string | null>(null);
  const { month, year, daysInMonth, offset, today } = buildCalendar();
  const monthName = new Date(year, month).toLocaleString('en-GB', { month: 'long' });
  const available = cleaners.filter((c) => c.availabilityToday);
  const service = services.find((s) => s.id === selectedService)!;
  const totalPrice = service.basePrice * service.durationHours;

  return (
    <div className="bg-gray-50 pb-4">
      <div className="bg-[#1E3A8A] px-5 pt-3 pb-4 flex items-center gap-3">
        <Link href="/client"><ChevronLeft size={20} className="text-white" /></Link>
        <h1 className="text-white font-bold text-base">Book a Clean</h1>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Service */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-3 text-sm">Select Date</h2>
          <div className="flex items-center justify-between mb-2">
            <ChevronLeft size={18} className="text-gray-400" />
            <span className="text-sm font-semibold">{monthName} {year}</span>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAYS.map((d) => <div key={d} className="text-center text-[10px] font-semibold text-gray-400">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: offset }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const past = day < today;
              const selected = selectedDay === day;
              return (
                <button key={day} disabled={past}
                  onClick={() => setSelectedDay(day)}
                  className={`h-8 w-full rounded-full text-xs font-medium transition-colors ${selected ? 'bg-[#1E3A8A] text-white' : past ? 'text-gray-300' : 'hover:bg-blue-50 text-gray-700'}`}>
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Times */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-3 text-sm">Select Time</h2>
          <div className="grid grid-cols-3 gap-2">
            {TIMES.map((t) => (
              <button key={t} onClick={() => setSelectedTime(t)}
                className={`py-2 rounded-xl text-xs font-semibold border transition-colors ${selectedTime === t ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]' : 'border-gray-200 text-gray-600 hover:border-[#1E3A8A]'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Property */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-3 text-sm">Property Size</h2>
          <div className="grid grid-cols-2 gap-2">
            {services.map((s) => (
              <button key={s.id} onClick={() => setSelectedService(s.id)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-colors text-left ${selectedService === s.id ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]' : 'border-gray-200 text-gray-600 hover:border-[#1E3A8A]'}`}>
                <div>{s.displayName}</div>
                <div className={`font-bold mt-0.5 ${selectedService === s.id ? 'text-blue-200' : 'text-[#1E3A8A]'}`}>{formatCurrency(s.basePrice)}/hr</div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured cleaners */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-3 text-sm">Featured Cleaners</h2>
          <div className="space-y-3">
            {available.slice(0, 3).map((c) => (
              <button key={c.id} onClick={() => setSelectedCleaner(c.id)}
                className={`w-full flex items-center gap-3 p-2 rounded-xl border transition-colors ${selectedCleaner === c.id ? 'border-[#1E3A8A] bg-blue-50' : 'border-transparent hover:bg-gray-50'}`}>
                <img src={c.avatarUrl} alt={c.fullName} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold">{c.fullName}</span>
                    {c.dbsChecked && <Shield size={11} className="text-[#16A34A]" />}
                  </div>
                  <div className="flex items-center gap-1">
                    <Stars rating={c.rating} size={10} />
                    <span className="text-xs text-gray-500">{c.rating}</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-[#1E3A8A]">{formatCurrency(c.hourlyRate)}/hr</span>
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-gray-500">{service.displayName} ({service.durationHours}hrs)</span>
            <span className="font-bold text-gray-900">{formatCurrency(totalPrice)}</span>
          </div>
          <Button className="w-full" size="lg" onClick={() => router.push('/client/payment')}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
