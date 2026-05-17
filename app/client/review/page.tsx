'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Star, Camera, CheckCircle } from 'lucide-react';
import { cleaners } from '@/lib/fixtures/cleaners';
import { Button } from '@/components/ui/button';

const sarah = cleaners[0];

export default function ReviewPage() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [tip, setTip] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center py-16">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={40} className="text-amber-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Thanks for your review!</h2>
        <p className="text-gray-500 text-sm mb-8">Your feedback helps other clients find great cleaners.</p>
        <Button className="w-full" onClick={() => router.push('/client')}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pb-4">
      <div className="bg-[#1E3A8A] px-5 pt-3 pb-4 flex items-center gap-3">
        <Link href="/client/bookings"><ChevronLeft size={20} className="text-white" /></Link>
        <h1 className="text-white font-bold text-base">How was your clean?</h1>
      </div>

      <div className="px-4 pt-4 space-y-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col items-center">
          <img src={sarah.avatarUrl} alt={sarah.fullName} className="w-16 h-16 rounded-full object-cover mb-3" />
          <h2 className="font-bold text-gray-900">{sarah.fullName}</h2>
          <p className="text-xs text-gray-400 mb-4">Regular Clean · Today</p>
          <div className="flex gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} onMouseEnter={() => setHovered(s)} onMouseLeave={() => setHovered(0)} onClick={() => setRating(s)}>
                <Star size={36} className={`transition-colors ${s <= (hovered || rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-sm font-semibold text-gray-600">
              {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][rating]}
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-2 text-sm">Add a comment</h2>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell others about your experience..."
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 resize-none focus:outline-none focus:border-[#1E3A8A]"
          />
          <button className="mt-2 flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600">
            <Camera size={14} />Add Photos
          </button>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-2 text-sm">Tip your cleaner (optional)</h2>
          <div className="flex gap-2">
            {[3, 5, 10, 15].map((t) => (
              <button key={t} onClick={() => setTip(tip === t ? null : t)}
                className={`flex-1 py-2 rounded-xl border text-sm font-semibold transition-colors ${tip === t ? 'bg-[#16A34A] text-white border-[#16A34A]' : 'border-gray-200 text-gray-600 hover:border-[#16A34A]'}`}>
                £{t}
              </button>
            ))}
          </div>
        </div>

        <Button className="w-full" size="lg" disabled={rating === 0} onClick={() => setSubmitted(true)}>
          Submit Review
        </Button>
      </div>
    </div>
  );
}
