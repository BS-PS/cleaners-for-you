'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface Props {
  data: Array<{ week: string; revenue: number }>;
}

export function RevenueChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
        <XAxis dataKey="week" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `£${v}`} />
        <Tooltip formatter={(v) => [formatCurrency(Number(v)), 'Revenue']} />
        <Line type="monotone" dataKey="revenue" stroke="#1E3A8A" strokeWidth={2} dot={{ r: 3, fill: '#1E3A8A' }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
