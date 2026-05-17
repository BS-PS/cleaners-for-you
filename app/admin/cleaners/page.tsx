import { CheckCircle, XCircle, Clock, Shield } from 'lucide-react';
import { cleanerApplications } from '@/lib/fixtures/cleaners';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import type { CleanerApplicationStatus } from '@/lib/types';

const statusVariant: Record<CleanerApplicationStatus, 'success' | 'warning' | 'danger'> = {
  approved: 'success', pending: 'warning', rejected: 'danger',
};

const pending  = cleanerApplications.filter((a) => a.status === 'pending');
const reviewed = cleanerApplications.filter((a) => a.status !== 'pending');

export default function CleanerApprovalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ctext">Cleaner Applications</h1>
        <p className="text-cmuted text-sm mt-1">{pending.length} applications awaiting review</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending',  value: pending.length,  icon: Clock,        bg: 'bg-amber-100', color: 'text-amber-700' },
          { label: 'Approved', value: cleanerApplications.filter((a) => a.status === 'approved').length, icon: CheckCircle, bg: 'bg-cgreen-light', color: 'text-cgreen' },
          { label: 'Rejected', value: cleanerApplications.filter((a) => a.status === 'rejected').length, icon: XCircle,    bg: 'bg-red-100',      color: 'text-cred' },
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

      {/* Pending */}
      <div className="bg-white rounded-card shadow-card border border-cborder">
        <div className="px-5 py-4 border-b border-cborder">
          <h2 className="font-bold text-ctext">Pending Review</h2>
        </div>
        <div className="divide-y divide-cborder">
          {pending.map((app) => (
            <div key={app.id} className="px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-navy-light rounded-full flex items-center justify-center text-navy font-bold text-sm shrink-0">
                {app.fullName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-ctext text-sm">{app.fullName}</p>
                <p className="text-xs text-cmuted">{app.email} · {app.phone}</p>
                <div className="flex gap-2 mt-1.5 flex-wrap">
                  {[
                    { label: `DBS: ${app.dbsUploadStatus}`,       ok: app.dbsUploadStatus === 'verified' },
                    { label: `Insurance: ${app.insuranceUploadStatus}`, ok: app.insuranceUploadStatus === 'verified' },
                    { label: `Refs: ${app.referencesProvided ? 'Yes' : 'No'}`, ok: app.referencesProvided },
                  ].map((tag) => (
                    <span key={tag.label} className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-0.5 ${tag.ok ? 'bg-cgreen-light text-cgreen' : 'bg-gray-100 text-cmuted'}`}>
                      {tag.ok && <Shield size={8} />}{tag.label}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-cmuted mt-1">Applied {formatDate(app.submittedAt)}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" variant="secondary">Approve</Button>
                <Button size="sm" variant="outline">Reject</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviewed */}
      <div className="bg-white rounded-card shadow-card border border-cborder">
        <div className="px-5 py-4 border-b border-cborder">
          <h2 className="font-bold text-ctext">Recently Reviewed</h2>
        </div>
        <div className="divide-y divide-cborder">
          {reviewed.map((app) => (
            <div key={app.id} className="px-5 py-3 flex items-center gap-4">
              <div className="w-9 h-9 bg-cbg rounded-full flex items-center justify-center text-cmuted font-bold text-sm shrink-0">
                {app.fullName.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-ctext text-sm">{app.fullName}</p>
                <p className="text-xs text-cmuted">{app.email}</p>
              </div>
              <Badge variant={statusVariant[app.status]}>{app.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
