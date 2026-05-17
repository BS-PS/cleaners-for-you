'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface Props {
  data: Array<{ week: string; revenue: number }>;
}

export function RevenueChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `£${v}`} />
        <Tooltip
          contentStyle={{ borderRadius: 10, border: '1px solid #E5E7EB', fontSize: 12 }}
          formatter={(v) => [formatCurrency(Number(v)), 'Revenue']}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#1B3A6B"
          strokeWidth={2.5}
          dot={{ r: 3, fill: '#1B3A6B', strokeWidth: 0 }}
          activeDot={{ r: 5, fill: '#2D5BE3' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
