import React, { useState } from 'react';
import { AlertTriangle, ChevronRight, X, ShieldAlert } from 'lucide-react';

export const AlertBanner: React.FC<{ onNavigateToEngine?: () => void }> = ({ onNavigateToEngine }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 border-b border-rose-200/80 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
          </span>
          <span className="px-1.5 py-0.2 rounded bg-rose-600 text-white font-bold text-[10px] uppercase tracking-wide shrink-0">
            Active Precursor Pattern
          </span>
          <p className="text-slate-800 truncate font-medium">
            <strong>Critical Alert:</strong> 3 near-miss reports at <strong>Duliajan Rig-12</strong> involve suspended tubulars and missing exclusion zone barricades.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {onNavigateToEngine && (
            <button
              onClick={onNavigateToEngine}
              className="text-rose-700 hover:text-rose-900 font-bold flex items-center gap-0.5 transition-colors cursor-pointer"
            >
              <span>Inspect in NLP Engine</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
