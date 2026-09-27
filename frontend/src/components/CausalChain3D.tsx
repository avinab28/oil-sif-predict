import React from 'react';
import { ArrowRight, AlertTriangle, ShieldX, Zap, Users, Flame, Skull } from 'lucide-react';

interface ChainNode {
  title: string;
  detail: string;
  type: 'act' | 'barrier' | 'hazard' | 'exposure' | 'sif';
}

export const CausalChain3D: React.FC<{ chain?: ChainNode[] }> = ({ chain }) => {
  const defaultChain: ChainNode[] = [
    { title: "Unsafe Act", detail: "Rigging sling slipped without secondary tethering on crane hook", type: "act" },
    { title: "Failed Barrier", detail: "Exclusion zone barricade absent; line-of-fire unprotected", type: "barrier" },
    { title: "High-Energy Hazard", detail: "500 kg suspended drill collar (14,700 Joules potential energy)", type: "hazard" },
    { title: "Personnel Exposure", detail: "Worker positioned 1.5m directly beneath load swing arc", type: "exposure" },
    { title: "Potential SIF Consequence", detail: "FATAL IMPACT / MASSIVE BLUNT TRAUMA", type: "sif" }
  ];

  const nodes = chain || defaultChain;

  return (
    <div className="bg-classic-charcoal text-white rounded-xl p-6 border border-classic-slate shadow-3d-md">
      <div className="flex justify-between items-center pb-4 mb-5 border-b border-classic-slate/80">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-classic-crimson font-bold px-2 py-0.5 rounded bg-classic-burgundy/40 border border-classic-wine/50">
            Systemic Causality Decomposition
          </span>
          <h3 className="text-base font-bold text-white tracking-tight mt-1.5 flex items-center gap-2">
            Safety Causal Chain Architecture
          </h3>
        </div>
        <span className="text-[11px] font-mono text-classic-warmgray hidden sm:inline">
          Unsafe Act &rarr; Barrier &rarr; Hazard &rarr; Exposure &rarr; Potential SIF
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {nodes.map((node, i) => {
          let badgeColor = "bg-slate-800 text-slate-300 border-slate-700";
          let icon = <AlertTriangle className="w-4 h-4 text-amber-400" />;

          if (node.type === 'act') {
            badgeColor = "bg-amber-950/80 text-amber-300 border-amber-800";
            icon = <AlertTriangle className="w-4 h-4 text-amber-400" />;
          } else if (node.type === 'barrier') {
            badgeColor = "bg-rose-950/80 text-rose-300 border-rose-800";
            icon = <ShieldX className="w-4 h-4 text-rose-400" />;
          } else if (node.type === 'hazard') {
            badgeColor = "bg-classic-burgundy text-white border-classic-wine";
            icon = <Zap className="w-4 h-4 text-amber-400" />;
          } else if (node.type === 'exposure') {
            badgeColor = "bg-slate-900 text-amber-300 border-amber-600/50";
            icon = <Users className="w-4 h-4 text-amber-400" />;
          } else if (node.type === 'sif') {
            badgeColor = "bg-classic-wine text-white border-classic-crimson shadow-wine-glow";
            icon = <Skull className="w-4 h-4 text-rose-300" />;
          }

          return (
            <div
              key={i}
              className={`p-3.5 rounded-lg border flex flex-col justify-between transition-all hover:scale-102 ${badgeColor}`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider opacity-80">
                    Step 0{i + 1}
                  </span>
                  {icon}
                </div>
                <div className="font-bold text-xs uppercase tracking-wide mb-1 text-white">
                  {node.title}
                </div>
                <p className="text-[11px] leading-relaxed opacity-90 font-mono">
                  {node.detail}
                </p>
              </div>

              {i < nodes.length - 1 && (
                <div className="hidden md:flex justify-end mt-3 text-classic-warmgray">
                  <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
