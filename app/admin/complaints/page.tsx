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
  open: 'danger', 'in-review': 'warning', resolved: 'success', escalated: 'danger',
};
const priorityVariant = { high: 'danger', medium: 'warning', low: 'default' } as const;

export default function ComplaintsPage() {
  const [filter, setFilter] = useState<ComplaintStatus | 'all'>('all');
  const filtered = filter === 'all' ? complaints : complaints.filter((c) => c.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ctext">Complaint Management</h1>
        <p className="text-cmuted text-sm mt-1">
          {complaints.filter((c) => c.status === 'open').length} open ·{' '}
          {complaints.filter((c) => c.status === 'escalated').length} escalated
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Open',      value: complaints.filter((c) => c.status === 'open').length,      icon: AlertCircle,  bg: 'bg-red-100',      color: 'text-cred' },
          { label: 'In Review', value: complaints.filter((c) => c.status === 'in-review').length,  icon: Clock,        bg: 'bg-amber-100',    color: 'text-amber-700' },
          { label: 'Escalated', value: complaints.filter((c) => c.status === 'escalated').length,  icon: TrendingUp,   bg: 'bg-red-200',      color: 'text-red-800' },
          { label: 'Resolved',  value: complaints.filter((c) => c.status === 'resolved').length,   icon: CheckCircle,  bg: 'bg-cgreen-light', color: 'text-cgreen' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-card shadow-card border border-cborder p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg}`}>
              <s.icon size={18} className={s.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-ctext">{s.value}</p>
              <p className="text-xs text-cmuted">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'open', 'in-review', 'escalated', 'resolved'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filter === f ? 'bg-navy text-white' : 'bg-white text-cmuted border border-cborder hover:border-navy hover:text-navy'
            }`}>
            {f === 'all' ? 'All' : f.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-white rounded-card shadow-card border border-cborder">
        <div className="divide-y divide-cborder">
          {filtered.map((complaint) => {
            const client = clients.find((c) => c.id === complaint.clientId)!;
            return (
              <div key={complaint.id} className="px-5 py-4 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-ctext text-sm">{client.fullName}</span>
                    <Badge variant={statusVariant[complaint.status]}>{complaint.status}</Badge>
                    <Badge variant={priorityVariant[complaint.priority] as 'danger' | 'warning' | 'default'}>
                      {complaint.priority} priority
                    </Badge>
                    <span className="text-[10px] bg-navy-light text-navy px-2 py-0.5 rounded-full font-medium capitalize">
                      {complaint.category}
                    </span>
                  </div>
                  <p className="text-sm text-cmuted leading-relaxed">{complaint.description}</p>
                  <p className="text-xs text-cmuted mt-1.5">
                    {formatDate(complaint.createdAt)} · {complaint.bookingId}
                    {complaint.assignedToAdminId && ` · Assigned to ${complaint.assignedToAdminId}`}
                  </p>
                </div>
                <div className="shrink-0">
                  {complaint.status === 'open'       && <Button size="sm" variant="outline">Assign</Button>}
                  {complaint.status === 'in-review'  && <Button size="sm" variant="secondary">Resolve</Button>}
                  {complaint.status === 'escalated'  && <Button size="sm" variant="danger">Urgent</Button>}
                  {complaint.status === 'resolved'   && (
                    <span className="text-xs text-cgreen font-semibold flex items-center gap-1">
                      <CheckCircle size={12} />Resolved
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
