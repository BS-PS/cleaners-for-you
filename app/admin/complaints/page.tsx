'use client';
import { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { complaints } from '@/lib/fixtures/complaints';
import { clients } from '@/lib/fixtures/clients';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import type { ComplaintStatus } from '@/lib/types';

const statusVariant: Record<ComplaintStatus, 'danger' | 'warning' | 'success' | 'info'> = {
  open: 'danger',
  'in-review': 'warning',
  resolved: 'success',
  escalated: 'danger',
};

const priorityVariant = { high: 'danger', medium: 'warning', low: 'default' } as const;

export default function ComplaintsPage() {
  const [filter, setFilter] = useState<ComplaintStatus | 'all'>('all');
  const filtered = filter === 'all' ? complaints : complaints.filter((c) => c.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Complaint Management</h1>
        <p className="text-gray-500 text-sm mt-1">{complaints.filter((c) => c.status === 'open').length} open · {complaints.filter((c) => c.status === 'escalated').length} escalated</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Open', value: complaints.filter((c) => c.status === 'open').length, color: 'text-red-600 bg-red-50', icon: AlertCircle },
          { label: 'In Review', value: complaints.filter((c) => c.status === 'in-review').length, color: 'text-amber-600 bg-amber-50', icon: Clock },
          { label: 'Escalated', value: complaints.filter((c) => c.status === 'escalated').length, color: 'text-red-800 bg-red-100', icon: TrendingUp },
          { label: 'Resolved', value: complaints.filter((c) => c.status === 'resolved').length, color: 'text-green-600 bg-green-50', icon: CheckCircle },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'open', 'in-review', 'escalated', 'resolved'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === f ? 'bg-[#1E3A8A] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1E3A8A]'}`}>
            {f === 'all' ? 'All' : f.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Complaints list */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="divide-y divide-gray-50">
          {filtered.map((complaint) => {
            const client = clients.find((c) => c.id === complaint.clientId)!;
            return (
              <div key={complaint.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-gray-900 text-sm">{client.fullName}</span>
                      <Badge variant={statusVariant[complaint.status]}>{complaint.status}</Badge>
                      <Badge variant={priorityVariant[complaint.priority] as 'danger' | 'warning' | 'default'}>
                        {complaint.priority} priority
                      </Badge>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
                        {complaint.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{complaint.description}</p>
                    <p className="text-xs text-gray-400 mt-1.5">
                      Submitted {formatDate(complaint.createdAt)} · {complaint.bookingId}
                      {complaint.assignedToAdminId && ` · Assigned to ${complaint.assignedToAdminId}`}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    {complaint.status === 'open' && (
                      <Button size="sm" variant="outline">Assign</Button>
                    )}
                    {complaint.status === 'in-review' && (
                      <Button size="sm" variant="secondary">Resolve</Button>
                    )}
                    {complaint.status === 'escalated' && (
                      <Button size="sm" variant="danger">Urgent</Button>
                    )}
                    {complaint.status === 'resolved' && (
                      <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                        <CheckCircle size={12} />Resolved
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
