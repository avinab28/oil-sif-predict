import React, { useState } from 'react';
import { HighlightSpan } from '../types';
import { Info, CheckCircle2 } from 'lucide-react';

interface TokenHighlighterProps {
  narrative: string;
  spans: HighlightSpan[];
  evidenceChecklist: Array<{ label: string; detail: string; verified: boolean }>;
}

export const TokenHighlighter: React.FC<TokenHighlighterProps> = ({
  narrative,
  spans,
  evidenceChecklist
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Highlights', bg: 'bg-slate-100', text: 'text-slate-800' },
    { id: 'high_energy', label: 'High-Energy Hazard', bg: 'bg-rose-100', text: 'text-rose-900', border: 'border-rose-300' },
    { id: 'exposure', label: 'Human Exposure', bg: 'bg-amber-100', text: 'text-amber-900', border: 'border-amber-300' },
    { id: 'barrier_failure', label: 'Barrier Failure', bg: 'bg-red-100', text: 'text-red-900', border: 'border-red-400' },
    { id: 'unsafe_event', label: 'Unsafe Dynamic Event', bg: 'bg-purple-100', text: 'text-purple-900', border: 'border-purple-300' },
    { id: 'potential_consequence', label: 'Consequence Disparity', bg: 'bg-blue-100', text: 'text-blue-900', border: 'border-blue-300' }
  ];

  // Helper to render segmented narrative
  const renderHighlightedNarrative = () => {
    if (!spans || spans.length === 0) {
      return <p className="text-slate-700 leading-relaxed text-sm">{narrative}</p>;
    }

    // Filter spans if necessary
    const activeSpans = filterType === 'all' ? spans : spans.filter(s => s.type === filterType);
    if (activeSpans.length === 0) {
      return <p className="text-slate-700 leading-relaxed text-sm">{narrative}</p>;
    }

    // Sort spans by start
    const sorted = [...activeSpans].sort((a, b) => a.start - b.start);
    const elements: React.ReactNode[] = [];
    let currentIdx = 0;

    sorted.forEach((span, i) => {
      // Preceding text
      if (span.start > currentIdx) {
        elements.push(
          <span key={`text-${i}`} className="text-slate-700">
            {narrative.substring(currentIdx, span.start)}
          </span>
        );
      }

      // Highlighted chunk
      let colorClass = 'bg-slate-200 text-slate-900';
      if (span.type === 'high_energy') colorClass = 'bg-rose-100 text-rose-950 border-b-2 border-rose-500 font-medium px-1 rounded-xs';
      else if (span.type === 'exposure') colorClass = 'bg-amber-100 text-amber-950 border-b-2 border-amber-500 font-medium px-1 rounded-xs';
      else if (span.type === 'barrier_failure') colorClass = 'bg-red-100 text-red-950 border-b-2 border-red-600 font-medium px-1 rounded-xs';
      else if (span.type === 'unsafe_event') colorClass = 'bg-purple-100 text-purple-950 border-b-2 border-purple-500 font-medium px-1 rounded-xs';
      else if (span.type === 'potential_consequence') colorClass = 'bg-blue-100 text-blue-950 border-b-2 border-blue-500 font-medium px-1 rounded-xs';

      elements.push(
        <mark
          key={`span-${i}`}
          title={`${span.label}: "${span.text}"`}
          className={`${colorClass} transition-colors mx-0.5 cursor-help inline-block`}
        >
          {narrative.substring(span.start, span.end)}
        </mark>
      );

      currentIdx = span.end;
    });

    // Remainder text
    if (currentIdx < narrative.length) {
      elements.push(
        <span key="text-end" className="text-slate-700">
          {narrative.substring(currentIdx)}
        </span>
      );
    }

    return <div className="text-sm leading-relaxed tracking-normal">{elements}</div>;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-4 border-b border-slate-100 gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            Why Was This Report Flagged? (Explainable AI Attribution)
          </h3>
          <p className="text-xs text-slate-500">
            Transparent token-level highlight attribution decomposing the unstructured report into core safety constructs.
          </p>
        </div>
      </div>

      {/* Filter Chips / Legend */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilterType(c.id)}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-all border cursor-pointer ${
              filterType === c.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                : `${c.bg} ${c.text} border-slate-200/80 hover:opacity-80`
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Highlighted text container */}
      <div className="p-4 bg-slate-50/80 rounded-lg border border-slate-200 font-normal mb-6">
        {renderHighlightedNarrative()}
      </div>

      {/* Evidence Checklist Panel */}
      <div className="border-t border-slate-100 pt-5">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-500" />
          Verified SIF Precursor Indicators
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {evidenceChecklist.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border flex items-start gap-2.5 ${
                item.verified
                  ? 'bg-emerald-50/60 border-emerald-200/80 text-emerald-950'
                  : 'bg-slate-50 border-slate-200 text-slate-500 opacity-60'
              }`}
            >
              <div className="mt-0.5">
                <CheckCircle2 className={`w-4 h-4 ${item.verified ? 'text-emerald-600' : 'text-slate-400'}`} />
              </div>
              <div>
                <div className="text-xs font-bold">{item.label}</div>
                <div className="text-[11px] text-slate-600 mt-0.5 leading-snug">{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
