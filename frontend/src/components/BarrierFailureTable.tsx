import React from 'react';
import { BarrierEvidence } from '../types';
import { ShieldX, AlertTriangle, ShieldCheck } from 'lucide-react';

interface BarrierFailureTableProps {
  barriers: BarrierEvidence[];
}

export const BarrierFailureTable: React.FC<BarrierFailureTableProps> = ({ barriers }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
      <div className="pb-4 mb-4 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
          Safety Barrier Integrity Analysis
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Detection of physical, administrative, and engineered barrier states derived directly from report narrative text.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
              <th className="pb-2.5 font-bold">Barrier Description</th>
              <th className="pb-2.5 font-bold">Category</th>
              <th className="pb-2.5 font-bold">Integrity Status</th>
              <th className="pb-2.5 font-bold">Supporting Narrative Evidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {barriers.map((b, idx) => {
              let statusBadge = (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                  <ShieldX className="w-3 h-3" /> FAILED
                </span>
              );
              if (b.status === 'AT RISK') {
                statusBadge = (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    <AlertTriangle className="w-3 h-3" /> AT RISK
                  </span>
                );
              } else if (b.status === 'EFFECTIVE') {
                statusBadge = (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" /> EFFECTIVE
                  </span>
                );
              }

              return (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 font-semibold text-slate-900 pr-3">
                    {b.barrier}
                  </td>
                  <td className="py-3 text-slate-500 pr-3 font-medium">
                    {b.category}
                  </td>
                  <td className="py-3 pr-3">
                    {statusBadge}
                  </td>
                  <td className="py-3 font-mono text-[11px] text-slate-700 italic pr-2">
                    {b.evidence}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
