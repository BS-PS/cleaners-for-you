'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, CreditCard, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

const BOOKING_TOTAL = 90;

export default function PaymentPage() {
  const router = useRouter();
  const [method, setMethod] = useState<'card' | 'apple' | 'google'>('card');
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setPaid(true); }, 1500);
  };

  if (paid) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={40} className="text-[#16A34A]" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-500 text-sm mb-1">You paid {formatCurrency(BOOKING_TOTAL)}</p>
        <p className="text-gray-400 text-xs mb-8">Booking confirmed · Sarah K. is on her way</p>
        <div className="space-y-3 w-full">
          <Button className="w-full" onClick={() => router.push('/client/tracking')}>Track Your Cleaner</Button>
          <Button variant="outline" className="w-full" onClick={() => router.push('/client')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pb-4">
      <div className="bg-[#1E3A8A] px-5 pt-3 pb-4 flex items-center gap-3">
        <Link href="/client/book"><ChevronLeft size={20} className="text-white" /></Link>
        <h1 className="text-white font-bold text-base">Payment</h1>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-3 text-sm">Total</h2>
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-3xl font-bold text-gray-900">{formatCurrency(BOOKING_TOTAL)}</span>
            <span className="text-xs text-gray-400">View breakdown</span>
          </div>
          <div className="border-t border-gray-100 pt-3 mt-3 space-y-1.5">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Regular Clean (5hrs)</span><span>{formatCurrency(72)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Platform fee</span><span>{formatCurrency(9)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Insurance levy</span><span>{formatCurrency(9)}</span>
            </div>
          </div>
          <div className="mt-2 bg-green-50 rounded-lg px-3 py-2">
            <p className="text-xs text-green-700 font-medium">Promo code: WELCOME5 applied — £5 off ✓</p>
          </div>
        </div>

        {/* Payment method */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-3 text-sm">Payment Method</h2>
          <div className="space-y-2">
            {[
              { id: 'card', label: 'Card ending 4242', sub: 'Visa · Expires 04/27', icon: <CreditCard size={18} className="text-[#1E3A8A]" /> },
              { id: 'apple', label: 'Apple Pay', sub: 'Touch ID or Face ID', icon: <span className="text-lg">🍎</span> },
              { id: 'google', label: 'Google Pay', sub: 'Quick checkout', icon: <span className="text-lg">G</span> },
            ].map((m) => (
              <button key={m.id} onClick={() => setMethod(m.id as 'card' | 'apple' | 'google')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors ${method === m.id ? 'border-[#1E3A8A] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <span className="w-8 flex items-center justify-center">{m.icon}</span>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-900">{m.label}</div>
                  <div className="text-xs text-gray-400">{m.sub}</div>
                </div>
                {method === m.id && <CheckCircle size={16} className="ml-auto text-[#1E3A8A]" />}
              </button>
            ))}
          </div>
        </div>

        <Button className="w-full" size="lg" onClick={handlePay} disabled={loading}>
          {loading ? 'Processing...' : `Pay ${formatCurrency(BOOKING_TOTAL)}`}
        </Button>
        <p className="text-center text-xs text-gray-400">🔒 Payments are encrypted & secure</p>
      </div>
    </div>
  );
}
