import { Star } from 'lucide-react';
import { starArray } from '@/lib/utils';

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  const stars = starArray(rating);
  return (
    <span className="inline-flex gap-0.5">
      {stars.map((v, i) => (
        <Star
          key={i}
          size={size}
          className={v === 1 ? 'fill-amber-400 text-amber-400' : v === 0.5 ? 'fill-amber-200 text-amber-400' : 'text-gray-300'}
        />
      ))}
    </span>
  );
}
