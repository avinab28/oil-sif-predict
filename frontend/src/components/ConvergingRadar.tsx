import React, { useState, useEffect } from 'react';
import { getActiveConverging, getEscalationTrends } from '../services/api';
import { Card3D } from './Card3D';

export const ConvergingRadar: React.FC = () => {
  const [clusters, setClusters] = useState<any[]>([]);
  const [trends, setTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const cRes = await getActiveConverging();
        const tRes = await getEscalationTrends();
        setClusters(cRes.active_clusters || []);
        setTrends(tRes.trend_points || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="p-4 bg-classic-black text-white rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="font-serif font-bold text-base text-white">Temporal Weak-Signal Convergence Engine</h3>
          <p className="text-xs text-classic-warmgray mt-0.5">
            Aggregates independent sub-threshold anomalies across shifts to predict high-consequence escalation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-red-950/80 border border-red-800 text-red-200 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            2 Active High-Risk Convergences
          </span>
        </div>
      </div>

      {/* Active Clusters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clusters.map((c, idx) => (
          <Card3D key={idx} className="p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm">
            <div className="flex items-center justify-between border-b border-classic-border pb-3 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-classic-slate">{c.cluster_id}</span>
                <h4 className="font-serif font-bold text-classic-black text-sm">{c.asset}</h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-classic-slate">Risk Multiplier</span>
                <div className="text-base font-bold text-classic-wine">{c.risk_multiplier}x Normal</div>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-xs font-bold text-classic-charcoal block mb-2">Converging Weak Signals:</span>
              <div className="space-y-2">
                {c.weak_signals.map((s: any, sIdx: number) => (
                  <div key={sIdx} className="p-2.5 bg-classic-ivory rounded border border-classic-border text-xs flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium text-classic-black">{s.text}</div>
                      <div className="text-[10px] text-classic-slate mt-0.5">{s.timestamp} &bull; Category: {s.category}</div>
                    </div>
                    <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-100 text-amber-900 rounded border border-amber-200 shrink-0">
                      {s.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs">
              <span className="font-bold text-red-900 block mb-0.5">Projected Catastrophic Outcome:</span>
              <p className="text-red-800 text-[11px] leading-relaxed">{c.projected_catastrophe}</p>
            </div>
          </Card3D>
        ))}
      </div>

      {/* Escalation Trends */}
      <Card3D className="p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm">
        <h4 className="font-serif font-bold text-classic-black text-sm mb-4">
          SIF Precursor Escalation Rate vs Actual Severe Incidents (6-Month Horizon)
        </h4>
        <div className="grid grid-cols-6 gap-3 text-center">
          {trends.map((t, i) => (
            <div key={i} className="p-3 bg-classic-ivory rounded-lg border border-classic-border">
              <div className="text-xs font-mono font-bold text-classic-slate mb-2">{t.month}</div>
              <div className="text-lg font-bold text-classic-wine mb-1">{t.sif_precursors}</div>
              <div className="text-[10px] text-classic-slate">Precursors Detected</div>
              <div className="mt-2 pt-2 border-t border-classic-border/60 text-[10px] font-bold text-red-700">
                {t.actual_sif} Actual SIF
              </div>
            </div>
          ))}
        </div>
      </Card3D>
    </div>
  );
};
