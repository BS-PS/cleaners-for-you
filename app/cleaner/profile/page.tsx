import { Shield, CheckCircle, Star, MapPin } from 'lucide-react';
import { cleaners } from '@/lib/fixtures/cleaners';
import { reviews } from '@/lib/fixtures/reviews';
import { Stars } from '@/components/ui/stars';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

const sarah = cleaners[0];
const myReviews = reviews.filter((r) => r.cleanerId === sarah.id);

const CALENDAR_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const AVAILABLE = [true, true, false, true, true, false, false];

export default function CleanerProfilePage() {
  return (
    <div className="bg-gray-50 pb-4">
      <div className="bg-[#16A34A] px-5 pt-3 pb-6">
        <div className="flex items-center gap-4">
          <img src={sarah.avatarUrl} alt={sarah.fullName} className="w-16 h-16 rounded-full object-cover border-2 border-white" />
          <div>
            <h1 className="text-white font-bold text-xl">{sarah.fullName}</h1>
            <div className="flex items-center gap-1">
              <Stars rating={sarah.rating} size={13} />
              <span className="text-green-200 text-xs">{sarah.rating} ({sarah.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={11} className="text-green-300" />
              <span className="text-green-200 text-xs">{sarah.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-3 space-y-3">
        {/* Verifications */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-gray-800 text-sm mb-2">Verifications</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="success"><CheckCircle size={10} className="mr-1" />DBS Checked</Badge>
            <Badge variant="info"><Shield size={10} className="mr-1" />Fully Insured</Badge>
            <Badge variant="success">Identity Verified</Badge>
          </div>
        </div>

        {/* Availability */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-gray-800 text-sm mb-3">Availability This Week</h2>
          <div className="grid grid-cols-7 gap-1">
            {CALENDAR_DAYS.map((d, i) => (
              <div key={d} className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-gray-400">{d}</span>
                <button className={`w-8 h-8 rounded-full text-xs font-semibold transition-colors ${AVAILABLE[i] ? 'bg-[#16A34A] text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {AVAILABLE[i] ? '✓' : '–'}
                </button>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3 border-[#16A34A] text-[#16A34A]">
            Update Availability
          </Button>
        </div>

        {/* Ratings breakdown */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800 text-sm">My Reviews</h2>
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="font-bold text-gray-900">{sarah.rating}</span>
              <span className="text-xs text-gray-400">/ 5</span>
            </div>
          </div>
          <div className="space-y-3">
            {myReviews.slice(0, 4).map((r) => (
              <div key={r.id} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-2 mb-1">
                  <Stars rating={r.rating} size={11} />
                  <span className="text-xs text-gray-400">{formatDate(r.createdAt)}</span>
                  {r.tip && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">+£{r.tip} tip</span>}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
