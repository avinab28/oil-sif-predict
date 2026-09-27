import React, { useState, useEffect } from 'react';
import { getCrossSitePatterns } from '../services/api';
import { KnowledgeGraph3D } from '../components/KnowledgeGraph3D';
import { Card3D } from '../components/Card3D';

export const KnowledgeGraphPage: React.FC = () => {
  const [patterns, setPatterns] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await getCrossSitePatterns();
        setPatterns(res.patterns || []);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-8">
      <div className="border-b border-classic-border pb-4">
        <h2 className="font-serif text-2xl font-bold text-classic-black">
          Stage 5: 3D Safety Knowledge Graph & Cross-Site Patterns
        </h2>
        <p className="text-xs text-classic-slate mt-0.5">
          Interconnecting Assets, Activities, Hazards, Barriers, and Life-Saving Rules to uncover systemic vulnerabilities across operational fields
        </p>
      </div>

      {/* 3D Graph Canvas */}
      <KnowledgeGraph3D />

      {/* Cross-Site Systemic Patterns */}
      <div>
        <h3 className="font-serif font-bold text-classic-black text-lg mb-4">
          Enterprise Cross-Site Recurrent Failure Patterns
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {patterns.map((p, i) => (
            <Card3D key={i} className="p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm">
              <div className="flex items-center justify-between border-b border-classic-border pb-3 mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-classic-wine font-bold">
                  {p.total_occurrences_90d} Incidents in Last 90 Days
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  SYSTEMIC RISK
                </span>
              </div>

              <h4 className="font-serif font-bold text-classic-black text-sm mb-2">{p.pattern_title}</h4>

              <div className="text-xs text-classic-charcoal mb-3">
                <span className="font-bold text-classic-slate block text-[10px] uppercase">Affected Operational Sites:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {p.affected_sites.map((site: string, sIdx: number) => (
                    <span key={sIdx} className="px-2 py-0.5 bg-classic-ivory border border-classic-border rounded text-[11px] font-mono">
                      {site}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-classic-ivory border border-classic-border rounded-lg text-xs space-y-1">
                <span className="font-bold text-classic-wine block text-[11px]">Systemic Root Cause Identified:</span>
                <p className="text-classic-charcoal text-[11px] leading-relaxed">{p.systemic_root_cause}</p>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </div>
  );
};
