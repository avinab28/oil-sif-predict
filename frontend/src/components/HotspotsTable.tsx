import React from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';

interface HotspotItem {
  location: string;
  total_reports: number;
  sif_reports: number;
  sif_density: number;
}

interface HotspotsTableProps {
  hotspots: HotspotItem[];
}

export const HotspotsTable: React.FC<HotspotsTableProps> = ({ hotspots }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            SIF Precursor Hotspots & Site Density Analysis
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Normalized density ratio to avoid false conclusions driven solely by high reporting volumes.
          </p>
        </div>
        <div className="bg-slate-100 border border-slate-200 px-3 py-1 rounded text-[11px] font-mono font-semibold text-slate-700">
          SIF Density = SIF Reports / Total Reports
        </div>
      </div>

      {/* Mandatory Scientific Caveat Alert */}
      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-snug">
          <strong className="font-semibold">Research Quality Caveat:</strong> High precursor density does not automatically indicate that a site is objectively more dangerous. Field reporting maturity, observation culture, and statistical sample size directly influence density metrics.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
              <th className="pb-2.5 font-bold">Operational Site Location</th>
              <th className="pb-2.5 font-bold">Total Reports</th>
              <th className="pb-2.5 font-bold">SIF Precursors</th>
              <th className="pb-2.5 font-bold">SIF Precursor Density</th>
              <th className="pb-2.5 font-bold">Visual Proportion</th>
              <th className="pb-2.5 font-bold">Sample Significance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {hotspots.map((item, idx) => {
              const isHigh = item.sif_density > 40;
              return (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 font-bold text-slate-900 pr-3">
                    {item.location}
                  </td>
                  <td className="py-3 font-mono text-slate-600 pr-3">
                    {item.total_reports}
                  </td>
                  <td className="py-3 font-mono font-bold text-rose-600 pr-3">
                    {item.sif_reports}
                  </td>
                  <td className="py-3 pr-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                      isHigh ? 'bg-rose-100 text-rose-900' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {item.sif_density.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 pr-4 w-40">
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                      <div 
                        className={`h-full ${isHigh ? 'bg-rose-600' : 'bg-amber-500'}`}
                        style={{ width: `${Math.min(100, item.sif_density * 2)}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-3 text-[11px] text-slate-500">
                    {item.total_reports >= 300 ? 'Robust Sample (n > 300)' : 'Moderate Sample (n < 300)'}
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
