'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Phone, MessageCircle, Clock, MapPin } from 'lucide-react';
import { cleaners } from '@/lib/fixtures/cleaners';
import { Stars } from '@/components/ui/stars';

const sarah = cleaners[0];

export default function TrackingPage() {
  const [eta, setEta] = useState(12);

  useEffect(() => {
    const t = setInterval(() => setEta((e) => Math.max(0, e - 1)), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-[#1E3A8A] px-5 pt-3 pb-4 flex items-center gap-3 shrink-0">
        <Link href="/client"><ChevronLeft size={20} className="text-white" /></Link>
        <h1 className="text-white font-bold text-base">Live Tracking</h1>
      </div>

      {/* Map placeholder */}
      <div className="relative bg-slate-200 flex-1" style={{ minHeight: 280 }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Fake map grid */}
          <svg width="100%" height="100%" className="opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 20} x2="100%" y2={i * 20} stroke="#1E3A8A" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 30 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="100%" stroke="#1E3A8A" strokeWidth="0.5" />
            ))}
          </svg>
          {/* Route line */}
          <svg className="absolute inset-0 w-full h-full">
            <polyline points="60,200 100,170 150,140 200,120 240,100 270,85" stroke="#1E3A8A" strokeWidth="3" fill="none" strokeDasharray="8 4" />
            {/* Cleaner pin */}
            <circle cx="60" cy="200" r="10" fill="#1E3A8A" />
            <text x="55" y="204" fill="white" fontSize="10">🧹</text>
            {/* Destination pin */}
            <circle cx="270" cy="85" r="10" fill="#16A34A" />
            <text x="265" y="89" fill="white" fontSize="10">🏠</text>
          </svg>
        </div>
        {/* ETA chip */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
          <Clock size={14} className="text-[#1E3A8A]" />
          <span className="font-bold text-gray-900 text-sm">
            {eta === 0 ? 'Arrived!' : `Arriving in ${eta} min`}
          </span>
        </div>
      </div>

      {/* Cleaner card */}
      <div className="bg-white rounded-t-3xl -mt-4 px-5 pt-5 pb-4 shadow-xl shrink-0">
        <p className="text-xs text-gray-400 mb-3 text-center">Your cleaner is on the way</p>
        <div className="flex items-center gap-4 mb-4">
          <img src={sarah.avatarUrl} alt={sarah.fullName} className="w-14 h-14 rounded-full object-cover border-2 border-[#1E3A8A]" />
          <div className="flex-1">
            <h2 className="font-bold text-gray-900">{sarah.fullName}</h2>
            <div className="flex items-center gap-1 mt-0.5">
              <Stars rating={sarah.rating} size={12} />
              <span className="text-xs text-gray-500">{sarah.rating}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={10} className="text-gray-400" />
              <span className="text-xs text-gray-400">Cleaning in progress</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center hover:bg-blue-100">
              <Phone size={16} className="text-[#1E3A8A]" />
            </button>
            <button className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center hover:bg-blue-100">
              <MessageCircle size={16} className="text-[#1E3A8A]" />
            </button>
          </div>
        </div>

        {/* Status */}
        <div className="bg-gray-50 rounded-xl p-3 mb-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-500">Status</span>
            <span className="font-semibold text-[#16A34A]">Cleaning in progress</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Time elapsed</span>
            <span className="font-semibold text-gray-800">01:15:32</span>
          </div>
        </div>

        <button className="w-full text-center text-xs text-gray-400 underline">Contact Support</button>
      </div>
    </div>
  );
}
