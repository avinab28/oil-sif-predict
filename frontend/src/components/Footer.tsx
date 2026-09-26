import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-xs">
                OIL
              </div>
              <span className="text-white font-bold text-sm tracking-tight">OIL SIF-PREDICT</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A university research prototype developed for the Smart India Hackathon problem statement on AI/NLP detection of Serious Injury & Fatality (SIF) Precursors in Oil India Limited (OIL) safety reports.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-amber-400/90 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Safety Paradigm: Actual Consequence != Potential Consequence</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Core Research</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white transition-colors cursor-pointer">IOGP Life-Saving Rules</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">High-Energy Hazard Theory</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Barrier Failure Reasoning</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Token-Level Explainability (XAI)</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Governance & Notice</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Research Prototype for academic evaluation. Does not contain classified or proprietary OIL internal data. Uses calibrated synthetic benchmarks. Not for statutory HSE clearance.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <div>
            &copy; 2026 OIL SIF-PREDICT Research Team. Grounded in IOGP Safety Standards.
          </div>
          <div className="flex gap-4">
            <span>On-Premise Private Network Architecture Ready</span>
            <span>·</span>
            <span>Zero External Cloud Leakage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
