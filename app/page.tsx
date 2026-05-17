import Link from 'next/link';
import { Smartphone, Briefcase, LayoutDashboard, Star, Shield, Clock } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] via-[#1e40af] to-[#4C1D95] flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-xl mb-4">
          <span className="text-3xl">🧹</span>
        </div>
        <h1 className="text-4xl font-bold text-white">Cleaners For You</h1>
        <p className="text-blue-200 mt-2 text-lg">Trusted Cleaners In Minutes</p>
        <div className="flex items-center justify-center gap-4 mt-3 text-blue-200 text-sm">
          <span className="flex items-center gap-1"><Shield size={14} /> DBS Checked</span>
          <span className="flex items-center gap-1"><Star size={14} /> 4.9★ Avg</span>
          <span className="flex items-center gap-1"><Clock size={14} /> Book in Minutes</span>
        </div>
      </div>

      {/* POC label */}
      <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 mb-8">
        <p className="text-white/80 text-sm text-center">Select a portal to explore the demo</p>
      </div>

      {/* Portal cards */}
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        <Link href="/client" className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center gap-4">
          <div className="w-14 h-14 bg-[#EFF6FF] rounded-2xl flex items-center justify-center group-hover:bg-[#1E3A8A] transition-colors">
            <Smartphone size={28} className="text-[#1E3A8A] group-hover:text-white transition-colors" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Client App</h2>
            <p className="text-gray-500 text-sm">Book cleaners, track jobs, pay securely</p>
            <div className="flex gap-2 mt-1">
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">10 screens</span>
              <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Emily Johnson</span>
            </div>
          </div>
        </Link>

        <Link href="/cleaner" className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center gap-4">
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center group-hover:bg-[#16A34A] transition-colors">
            <Briefcase size={28} className="text-[#16A34A] group-hover:text-white transition-colors" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Cleaner App</h2>
            <p className="text-gray-500 text-sm">Manage jobs, track earnings, set availability</p>
            <div className="flex gap-2 mt-1">
              <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">6 screens</span>
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Sarah K. ⭐ 4.9</span>
            </div>
          </div>
        </Link>

        <Link href="/admin" className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center gap-4">
          <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:bg-[#4C1D95] transition-colors">
            <LayoutDashboard size={28} className="text-[#4C1D95] group-hover:text-white transition-colors" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Admin Dashboard</h2>
            <p className="text-gray-500 text-sm">Approve cleaners, manage complaints, view revenue</p>
            <div className="flex gap-2 mt-1">
              <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">4 screens</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">£34,860 revenue</span>
            </div>
          </div>
        </Link>
      </div>

      <p className="text-white/40 text-xs mt-10">POC · Fake data · No auth required</p>
    </div>
  );
}
