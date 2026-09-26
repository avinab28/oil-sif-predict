import React from 'react';
import { LifeSavingRuleResult } from '../types';
import { ArrowRight, Award, ChevronRight, ShieldCheck, Zap } from 'lucide-react';

interface LifeSavingRuleCardProps {
  ruleData: LifeSavingRuleResult;
}

export const LifeSavingRuleCard: React.FC<LifeSavingRuleCardProps> = ({ ruleData }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start pb-4 mb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              IOGP Standardized Taxonomy
            </span>
            <h3 className="text-base font-bold text-slate-900 tracking-tight mt-1.5">
              Detected Life-Saving Rule
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-600 font-medium">Model Match</span>
            <div className="text-sm font-bold text-indigo-600 font-mono">
              {Math.round(ruleData.confidence * 100)}%
            </div>
          </div>
        </div>

        {/* Primary Rule Hero */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-lg p-4 mb-4 shadow-2xs">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Primary Rule Applicable</span>
          </div>
          <div className="text-xl font-extrabold tracking-tight text-white mb-1.5">
            {ruleData.primary_rule.toUpperCase()}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {ruleData.description}
          </p>
        </div>

        {/* Visual Lineage Flowchart */}
        <div className="mb-4">
          <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
            Safety Lineage & Causality Path
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
            {ruleData.lineage.map((node, i) => (
              <React.Fragment key={i}>
                <span className={`px-2 py-1 rounded text-[11px] font-semibold ${
                  i === ruleData.lineage.length - 1
                    ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                    : 'bg-white text-slate-700 border border-slate-200 shadow-2xs'
                }`}>
                  {node}
                </span>
                {i < ruleData.lineage.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Secondary Rules */}
        {ruleData.secondary_rules && ruleData.secondary_rules.length > 0 && (
          <div>
            <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Secondary Overlapping Rules
            </div>
            <div className="flex flex-wrap gap-2">
              {ruleData.secondary_rules.map((sec, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs border border-slate-200"
                >
                  <span className="font-medium">{sec.rule}</span>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">
                    {Math.round(sec.confidence * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
        Taxonomy aligns with international IOGP 9+1 Life-Saving Rule standards for oil & gas operators.
      </div>
    </div>
  );
};
