import React, { useState, useEffect } from 'react';
import { getContractorScorecards, getPriorityQueue } from '../services/api';
import { Card3D } from './Card3D';

export const ContractorScorecard: React.FC = () => {
  const [contractors, setContractors] = useState<any[]>([]);
  const [priorityQueue, setPriorityQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const cRes = await getContractorScorecards();
        const pRes = await getPriorityQueue();
        setContractors(cRes.contractors || []);
        setPriorityQueue(pRes.priority_queue || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      {/* Priority HSE Interventions Queue */}
      <Card3D className="p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm">
        <div className="flex items-center justify-between border-b border-classic-border pb-3 mb-4">
          <div>
            <h3 className="font-serif font-bold text-classic-black text-base">HSE AI Prioritized Intervention Queue</h3>
            <p className="text-xs text-classic-slate">Algorithmic risk ranking for HSE leadership inspections</p>
          </div>
          <span className="px-3 py-1 bg-classic-wine text-white text-xs font-bold rounded-lg shadow-3d-sm">
            Top Priority Assets
          </span>
        </div>

        <div className="space-y-3">
          {priorityQueue.map((item, idx) => (
            <div key={idx} className="p-3.5 bg-classic-ivory rounded-lg border border-classic-border flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-classic-black text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  #{item.rank}
                </span>
                <div>
                  <div className="font-serif font-bold text-classic-black text-xs">{item.site}</div>
                  <div className="text-[11px] text-classic-slate mt-0.5">Precursor: {item.precursor}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  item.urgency === 'IMMEDIATE_ACTION' ? 'bg-red-100 text-red-900 border border-red-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  {item.urgency}
                </span>
                <div className="text-xs text-classic-charcoal max-w-sm font-medium">
                  {item.recommended_intervention}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card3D>

      {/* Contractor Scorecards */}
      <div>
        <h4 className="font-serif font-bold text-classic-black text-base mb-4">
          Contractor Safety Performance & Risk Index
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contractors.map((c, i) => (
            <Card3D key={i} className="p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    c.risk_status === 'HIGH_RISK_WATCHLIST'
                      ? 'bg-red-100 text-red-900 border border-red-300'
                      : (c.risk_status === 'APPROVED_EXEMPLARY' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300')
                  }`}>
                    {c.risk_status.replace(/_/g, ' ')}
                  </span>
                  <span className="font-mono text-xs font-bold text-classic-wine">
                    {c.golden_rule_score}% Score
                  </span>
                </div>

                <h5 className="font-serif font-bold text-classic-black text-sm">{c.contractor_name}</h5>
                <p className="text-xs text-classic-slate mt-0.5">{c.trade}</p>

                <div className="grid grid-cols-2 gap-2 my-4 text-xs">
                  <div className="p-2 bg-classic-ivory rounded border border-classic-border">
                    <span className="text-[10px] text-classic-slate block">Precursor Rate</span>
                    <span className="font-bold text-classic-black">{c.sif_precursor_rate}</span>
                  </div>
                  <div className="p-2 bg-classic-ivory rounded border border-classic-border">
                    <span className="text-[10px] text-classic-slate block">Repeat Violations</span>
                    <span className="font-bold text-red-700">{c.repeat_violations} Flagged</span>
                  </div>
                </div>

                <div className="text-xs text-classic-charcoal mb-4">
                  <span className="font-bold text-classic-slate block text-[10px] uppercase">Primary Area of Concern:</span>
                  <span className="font-medium">{c.top_issue}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-classic-border text-[11px] text-classic-slate flex justify-between items-center">
                <span>Active Personnel: {c.active_workers}</span>
                <button className="text-classic-wine font-bold hover:underline">Full Audit &rarr;</button>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </div>
  );
};
