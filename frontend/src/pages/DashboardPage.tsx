import React, { useEffect, useState } from 'react';
import { Activity, ShieldAlert, AlertTriangle, Layers, TrendingUp, CheckCircle, BarChart3, PieChart } from 'lucide-react';
import { DashboardMetrics } from '../types';
import { getDashboardData } from '../services/api';
import { HotspotsTable } from '../components/HotspotsTable';

export const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getDashboardData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500 text-xs">
        Loading enterprise safety analytics...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
          Executive HSSE Dashboard
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
          SIF Precursor Analytics & Risk Trends
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Dynamic leading indicators computed directly across 2,800+ safety observations for Oil India Limited operations.
        </p>
      </div>

      {/* Top 7 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Reports</div>
          <div className="text-xl font-black text-slate-900 font-mono mt-1">{data.kpis.total_reports.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">UA / UC / Near-Miss</div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-rose-200 shadow-2xs bg-rose-50/20">
          <div className="text-[10px] font-bold uppercase tracking-wider text-rose-700">SIF Precursors</div>
          <div className="text-xl font-black text-rose-600 font-mono mt-1">{data.kpis.sif_potential_count.toLocaleString()}</div>
          <div className="text-[10px] text-rose-700 font-medium mt-0.5">Fatal Precursors</div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">High Risk Events</div>
          <div className="text-xl font-black text-slate-900 font-mono mt-1">{data.kpis.high_risk_count.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Zone 1 Critical</div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-amber-200 shadow-2xs bg-amber-50/20">
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Precursor Density</div>
          <div className="text-xl font-black text-amber-900 font-mono mt-1">{data.kpis.sif_density_percent}%</div>
          <div className="text-[10px] text-amber-800 mt-0.5">Leading Ratio</div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Top Hazard</div>
          <div className="text-xs font-bold text-slate-900 mt-2 truncate">{data.kpis.top_hazard}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">High Energy Mass</div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Top Breached Rule</div>
          <div className="text-xs font-bold text-indigo-900 mt-2 truncate">{data.kpis.top_life_saving_rule}</div>
          <div className="text-[10px] text-indigo-700 mt-0.5">IOGP Taxonomy</div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Barrier Breaches</div>
          <div className="text-xl font-black text-slate-900 font-mono mt-1">{data.kpis.critical_barrier_failures.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Exclusion / LOTO</div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: SIF Potential Distribution (Donut style) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              1. SIF Precursor Distribution
            </h3>
            <span className="text-[10px] font-mono text-slate-500">2,800 Total</span>
          </div>

          <div className="flex items-center justify-around py-4">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#E2E8F0" strokeWidth="4"></circle>
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#E11D48"
                  strokeWidth="4"
                  strokeDasharray={`${data.kpis.sif_density_percent} ${100 - data.kpis.sif_density_percent}`}
                  strokeDashoffset="0"
                ></circle>
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-black text-slate-900 font-mono">{data.kpis.sif_density_percent}%</span>
                <span className="block text-[9px] uppercase tracking-wider text-rose-700 font-bold">SIF Ratio</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-rose-600"></span>
                <div>
                  <div className="font-bold text-slate-800">SIF Precursor</div>
                  <div className="text-[11px] text-slate-500">{data.kpis.sif_potential_count} reports (38%)</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-300"></span>
                <div>
                  <div className="font-bold text-slate-800">Routine / Non-SIF</div>
                  <div className="text-[11px] text-slate-500">{data.kpis.total_reports - data.kpis.sif_potential_count} reports (62%)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 4: IOGP Life Saving Rules Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              2. Breached Life-Saving Rules
            </h3>
            <span className="text-[10px] font-mono text-slate-500">IOGP Standards</span>
          </div>

          <div className="space-y-2.5">
            {data.rule_distribution.slice(0, 5).map((r, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800 truncate pr-2">{r.name}</span>
                  <span className="font-mono text-slate-600 font-bold">{r.count}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full"
                    style={{ width: `${(r.count / 300) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 5: Barrier Failures Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              3. Critical Barrier Failures
            </h3>
            <span className="text-[10px] font-mono text-slate-500">Top Breaches</span>
          </div>

          <div className="space-y-2.5">
            {data.barrier_distribution.map((b, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800 truncate pr-2">{b.name}</span>
                  <span className="font-mono text-rose-600 font-bold">{b.count}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-rose-500 h-full rounded-full"
                    style={{ width: `${(b.count / 350) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity vs SIF Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Operational Activity vs SIF Precursor Risk Matrix
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Empirical breakdown of SIF density by oilfield task category.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {data.activity_matrix.map((act, i) => (
            <div key={i} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
              <div className="text-[11px] font-bold text-slate-800 truncate">{act.activity}</div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-lg font-black font-mono text-slate-900">{act.sif_rate}%</span>
                <span className="text-[10px] font-mono text-slate-500">{act.sif}/{act.total}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1 mt-1.5 overflow-hidden">
                <div 
                  className={`h-full ${act.sif_rate > 40 ? 'bg-rose-600' : 'bg-amber-500'}`}
                  style={{ width: `${act.sif_rate}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hotspots Component */}
      <HotspotsTable hotspots={data.site_hotspots} />
    </div>
  );
};
