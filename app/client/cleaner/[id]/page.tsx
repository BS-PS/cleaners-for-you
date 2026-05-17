import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Shield, CheckCircle, MapPin, Briefcase } from 'lucide-react';
import { cleaners } from '@/lib/fixtures/cleaners';
import { reviews } from '@/lib/fixtures/reviews';
import { Button } from '@/components/ui/button';
import { Stars } from '@/components/ui/stars';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function CleanerProfilePage({ params }: { params: { id: string } }) {
  const cleaner = cleaners.find((c) => c.id === params.id);
  if (!cleaner) notFound();
  const cleanerReviews = reviews.filter((r) => r.cleanerId === cleaner.id).slice(0, 4);

  return (
    <div className="bg-cbg pb-4">
      {/* Hero */}
      <div className="bg-navy px-5 pt-3 pb-8">
        <Link href="/client" className="inline-block mb-3">
          <ChevronLeft size={20} className="text-white" />
        </Link>
        <div className="flex items-center gap-4">
          <img src={cleaner.avatarUrl} alt={cleaner.fullName} className="w-16 h-16 rounded-full object-cover border-2 border-white" />
          <div>
            <h1 className="text-white font-bold text-xl">{cleaner.fullName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Stars rating={cleaner.rating} size={14} />
              <span className="text-navy-light text-xs">{cleaner.rating} ({cleaner.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={11} className="text-navy-light" />
              <span className="text-navy-light text-xs">{cleaner.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-3 space-y-3">
        {/* Stats */}
        <div className="bg-white rounded-card shadow-card p-4 grid grid-cols-3 divide-x divide-cborder">
          {[
            { label: 'Rate',     value: `${formatCurrency(cleaner.hourlyRate)}/hr` },
            { label: 'Jobs',     value: cleaner.completedJobs.toString() },
            { label: 'Exp',      value: `${cleaner.yearsExperience} yrs` },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center py-1">
              <span className="text-lg font-bold text-navy">{s.value}</span>
              <span className="text-xs text-cmuted">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Verification badges */}
        <div className="bg-white rounded-card shadow-card p-4 flex gap-2 flex-wrap">
          {cleaner.dbsChecked      && <Badge variant="success"><CheckCircle size={10} className="mr-1" />DBS Checked</Badge>}
          {cleaner.insuranceVerified && <Badge variant="info"><Shield size={10} className="mr-1" />Fully Insured</Badge>}
          {cleaner.availabilityToday && <Badge variant="success">Available Today</Badge>}
          {cleaner.specialties.map((s) => (
            <Badge key={s} variant="outline" className="capitalize">{s.replace(/-/g, ' ')}</Badge>
          ))}
        </div>

        {/* Bio */}
        <div className="bg-white rounded-card shadow-card p-4">
          <h2 className="font-bold text-ctext text-sm mb-2">About Me</h2>
          <p className="text-sm text-cmuted leading-relaxed">{cleaner.bio}</p>
        </div>

        {/* Services */}
        <div className="bg-white rounded-card shadow-card p-4">
          <h2 className="font-bold text-ctext text-sm mb-3">Services</h2>
          <div className="space-y-2">
            {cleaner.specialties.map((s) => (
              <div key={s} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase size={14} className="text-navy" />
                  <span className="text-sm text-ctext capitalize">{s.replace(/-/g, ' ')}</span>
                </div>
                <span className="text-sm font-bold text-navy">{formatCurrency(cleaner.hourlyRate)}/hr</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        {cleanerReviews.length > 0 && (
          <div className="bg-white rounded-card shadow-card p-4">
            <h2 className="font-bold text-ctext text-sm mb-3">Recent Reviews</h2>
            <div className="space-y-3">
              {cleanerReviews.map((r) => (
                <div key={r.id} className="border-b border-cborder pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Stars rating={r.rating} size={11} />
                    <span className="text-xs text-cmuted">{formatDate(r.createdAt)}</span>
                  </div>
                  <p className="text-xs text-cmuted leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <Link href="/client/payment">
          <Button className="w-full" size="lg">
            Book Now — {formatCurrency(cleaner.hourlyRate)}/hr
          </Button>
        </Link>
      </div>
    </div>
  );
}
