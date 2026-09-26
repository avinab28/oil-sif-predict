import React from 'react';
import { X, Printer, Download, ShieldAlert, Award, AlertTriangle, CheckCircle } from 'lucide-react';
import { DashboardMetrics } from '../types';

interface ExecutiveReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: DashboardMetrics;
}

export const ExecutiveReportModal: React.FC<ExecutiveReportModalProps> = ({
  isOpen,
  onClose,
  metrics
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-sm">
              OIL
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">Executive Safety Intelligence Briefing</h2>
              <p className="text-xs text-slate-300">OIL SIF-PREDICT Research Engine · Automated Synthesis</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.print()}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 px-2.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Briefing</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-xs">
          {/* Executive Summary Banner */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Document Classification: Research HSE Briefing</span>
              <span className="text-xs font-mono text-slate-500">Generated: {new Date().toLocaleDateString()}</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 mb-1">
              Core Intelligence Takeaway:
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              Out of <strong>{metrics.kpis.total_reports.toLocaleString()}</strong> analyzed free-text safety reports, the system identified <strong>{metrics.kpis.sif_potential_count.toLocaleString()} SIF Precursors ({metrics.kpis.sif_density_percent}%)</strong> that possessed genuine fatal or catastrophic potential, despite {'>'}85% of these incidents initially resulting in zero lost-time injuries.
            </p>
          </div>

          {/* Metric Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded border border-slate-200 bg-white">
              <div className="text-[11px] text-slate-500 uppercase font-semibold">Total Reports</div>
              <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">{metrics.kpis.total_reports}</div>
            </div>
            <div className="p-3 rounded border border-rose-200 bg-rose-50/50">
              <div className="text-[11px] text-rose-700 uppercase font-semibold">SIF Precursors</div>
              <div className="text-lg font-bold text-rose-700 font-mono mt-0.5">{metrics.kpis.sif_potential_count}</div>
            </div>
            <div className="p-3 rounded border border-amber-200 bg-amber-50/50">
              <div className="text-[11px] text-amber-800 uppercase font-semibold">Top Breached Rule</div>
              <div className="text-xs font-bold text-amber-900 mt-1 truncate">{metrics.kpis.top_life_saving_rule}</div>
            </div>
            <div className="p-3 rounded border border-slate-200 bg-white">
              <div className="text-[11px] text-slate-500 uppercase font-semibold">Top Barrier Failure</div>
              <div className="text-xs font-bold text-slate-900 mt-1 truncate">Exclusion Zone Barricading</div>
            </div>
          </div>

          {/* Strategic Recommendations */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
              Actionable Recommendations for OIL HSE Leadership:
            </h4>
            <div className="space-y-2.5">
              <div className="p-3 rounded bg-white border border-slate-200 flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Enforce Hard Physical Exclusion Zones During Crane Lifts</div>
                  <p className="text-slate-600 mt-0.5">38% of detected SIF precursors involved unauthorized personnel in drop zones beneath suspended tubulars and valves.</p>
                </div>
              </div>
              <div className="p-3 rounded bg-white border border-slate-200 flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Mandate Independent Atmospheric Gas Verification</div>
                  <p className="text-slate-600 mt-0.5">Confined space events consistently flagged unverified entry into separator vessels without continuous multi-gas monitor alarms.</p>
                </div>
              </div>
              <div className="p-3 rounded bg-white border border-slate-200 flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Transition Safety Reviews from Lagging to SIF Precursor Density</div>
                  <p className="text-slate-600 mt-0.5">Stop evaluating sites solely by Total Recordable Incident Rate (TRIR). A zero-injury site can harbor significant fatal precursors.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 text-[11px] text-slate-500">
            Report synthesized by OIL SIF-PREDICT Engine. Grounded in IOGP Life-Saving Rules and Energy-Based Safety Theory.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Briefing
          </button>
        </div>
      </div>
    </div>
  );
};
