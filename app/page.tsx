import Link from 'next/link';
import { Smartphone, Briefcase, LayoutDashboard, Star, Shield, Clock } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-xl mb-4">
          <span className="text-3xl">🧹</span>
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">Cleaners For You</h1>
        <p className="text-navy-light mt-2 text-base font-medium">Trusted Cleaners In Minutes</p>
        <div className="flex items-center justify-center gap-5 mt-3 text-sm" style={{ color: '#93B4DC' }}>
          <span className="flex items-center gap-1.5"><Shield size={13} /> DBS Checked</span>
          <span className="flex items-center gap-1.5"><Star size={13} /> 4.9★ Avg</span>
          <span className="flex items-center gap-1.5"><Clock size={13} /> Book in Minutes</span>
        </div>
      </div>

      {/* Select label */}
      <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-2 mb-6">
        <p className="text-white/70 text-sm text-center">Select a portal to explore the demo</p>
      </div>

      {/* Portal cards */}
      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        <Link href="/client" className="group bg-white rounded-card p-5 shadow-card hover:shadow-lg transition-all hover:-translate-y-0.5 flex items-center gap-4">
          <div className="w-14 h-14 bg-navy-light rounded-2xl flex items-center justify-center group-hover:bg-navy transition-colors shrink-0">
            <Smartphone size={26} className="text-navy group-hover:text-white transition-colors" />
          </div>
          <div>
            <h2 className="text-base font-bold text-ctext">Client App</h2>
            <p className="text-cmuted text-xs mt-0.5">Book cleaners, track jobs, pay securely</p>
            <div className="flex gap-2 mt-2">
              <span className="text-[10px] bg-navy-light text-navy px-2 py-0.5 rounded-full font-medium">10 screens</span>
              <span className="text-[10px] bg-cgreen-light text-cgreen px-2 py-0.5 rounded-full font-medium">Emily Johnson</span>
            </div>
          </div>
        </Link>

        <Link href="/cleaner" className="group bg-white rounded-card p-5 shadow-card hover:shadow-lg transition-all hover:-translate-y-0.5 flex items-center gap-4">
          <div className="w-14 h-14 bg-cgreen-light rounded-2xl flex items-center justify-center group-hover:bg-cgreen transition-colors shrink-0">
            <Briefcase size={26} className="text-cgreen group-hover:text-white transition-colors" />
          </div>
          <div>
            <h2 className="text-base font-bold text-ctext">Cleaner App</h2>
            <p className="text-cmuted text-xs mt-0.5">Manage jobs, track earnings, set availability</p>
            <div className="flex gap-2 mt-2">
              <span className="text-[10px] bg-cgreen-light text-cgreen px-2 py-0.5 rounded-full font-medium">6 screens</span>
              <span className="text-[10px] bg-navy-light text-navy px-2 py-0.5 rounded-full font-medium">Sarah K. ⭐ 4.9</span>
            </div>
          </div>
        </Link>

        <Link href="/admin" className="group bg-white rounded-card p-5 shadow-card hover:shadow-lg transition-all hover:-translate-y-0.5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-navy transition-colors shrink-0" style={{ background: '#EBF0FB' }}>
            <LayoutDashboard size={26} className="text-navy group-hover:text-white transition-colors" />
          </div>
          <div>
            <h2 className="text-base font-bold text-ctext">Admin Dashboard</h2>
            <p className="text-cmuted text-xs mt-0.5">Approve cleaners, manage complaints, view revenue</p>
            <div className="flex gap-2 mt-2">
              <span className="text-[10px] bg-navy-light text-navy px-2 py-0.5 rounded-full font-medium">4 screens</span>
              <span className="text-[10px] bg-gray-100 text-cmuted px-2 py-0.5 rounded-full font-medium">£34,860 revenue</span>
            </div>
          </div>
        </Link>
      </div>

      <p className="text-white/30 text-xs mt-10">POC · Fake data · No auth required</p>
    </div>
  );
}
