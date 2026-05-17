import { CheckCircle, XCircle, Clock, Shield, FileText } from 'lucide-react';
import { cleanerApplications } from '@/lib/fixtures/cleaners';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import type { CleanerApplicationStatus } from '@/lib/types';

const statusVariant: Record<CleanerApplicationStatus, 'success' | 'warning' | 'danger'> = {
  approved: 'success',
  pending: 'warning',
  rejected: 'danger',
};

export default function CleanerApprovalPage() {
  const pending = cleanerApplications.filter((a) => a.status === 'pending');
  const reviewed = cleanerApplications.filter((a) => a.status !== 'pending');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cleaner Applications</h1>
        <p className="text-gray-500 text-sm mt-1">{pending.length} applications awaiting review</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending', value: pending.length, icon: Clock, color: 'text-amber-600 bg-amber-50' },
          { label: 'Approved', value: cleanerApplications.filter((a) => a.status === 'approved').length, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
          { label: 'Rejected', value: cleanerApplications.filter((a) => a.status === 'rejected').length, icon: XCircle, color: 'text-red-600 bg-red-50' },
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

      {/* Pending applications */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Pending Review</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {pending.map((app) => (
            <div key={app.id} className="px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-[#1E3A8A] font-bold text-sm">
                {app.fullName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">{app.fullName}</p>
                <p className="text-xs text-gray-500">{app.email} · {app.phone}</p>
                <div className="flex gap-2 mt-1.5">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${app.dbsUploadStatus === 'verified' ? 'bg-green-100 text-green-700' : app.dbsUploadStatus === 'uploaded' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                    <Shield size={8} className="inline mr-0.5" />DBS: {app.dbsUploadStatus}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${app.insuranceUploadStatus === 'verified' ? 'bg-green-100 text-green-700' : app.insuranceUploadStatus === 'uploaded' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                    Insurance: {app.insuranceUploadStatus}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${app.referencesProvided ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    Refs: {app.referencesProvided ? 'Yes' : 'No'}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">Applied {formatDate(app.submittedAt)}</p>
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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Recently Reviewed</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {reviewed.map((app) => (
            <div key={app.id} className="px-5 py-3 flex items-center gap-4">
              <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold text-sm">
                {app.fullName.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{app.fullName}</p>
                <p className="text-xs text-gray-400">{app.email}</p>
              </div>
              <Badge variant={statusVariant[app.status]}>{app.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
