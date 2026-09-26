import React from 'react';
import { ShieldAlert, ArrowRight, Zap, AlertTriangle, Layers, BookOpen, Activity, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { PipelineDiagram } from '../components/PipelineDiagram';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onSelectSample: (narrative: string, actual: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectSample }) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/60 border-b border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            SIH Problem Statement: Unsafe-Act / Near-Miss Free-Text Intelligence
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            AI-Powered Detection of <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-900">
              Serious Injury & Fatality Precursors
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Transforming unstructured oilfield safety narratives into actionable leading safety intelligence. 
            Engineered specifically to identify high-energy hazards and barrier breaches before catastrophic outcomes occur.
          </p>

          {/* Core Action CTAs */}
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onNavigate('engine')}
              className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Analyze Safety Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Activity className="w-4 h-4 text-indigo-600" />
              <span>View Safety Analytics</span>
            </button>
            <button
              onClick={() => onNavigate('research')}
              className="px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-300 shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>Explore Research</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-3 bg-white rounded-lg border border-slate-200/90 shadow-2xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Synthetic Dataset</div>
              <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">2,800+</div>
              <div className="text-[10px] text-slate-600">Calibrated OIL-like reports</div>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200/90 shadow-2xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Life-Saving Rules</div>
              <div className="text-xl font-bold text-indigo-700 font-mono mt-0.5">10 Rules</div>
              <div className="text-[10px] text-slate-600">IOGP standardized mapping</div>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200/90 shadow-2xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Recall Target</div>
              <div className="text-xl font-bold text-rose-700 font-mono mt-0.5">&gt;99%</div>
              <div className="text-[10px] text-slate-600">Prioritizing human review</div>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200/90 shadow-2xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Deployment</div>
              <div className="text-xl font-bold text-emerald-700 font-mono mt-0.5">On-Prem</div>
              <div className="text-[10px] text-slate-600">Zero external cloud leakage</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Core Concept: Actual vs Potential Consequence */}
        <section className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8">
          <div className="max-w-3xl mb-6">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
              Foundational Safety Principle
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-2">
              Actual Consequence &ne; Potential Consequence
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Traditional safety reporting relies on lagging indicators (e.g., lost time injuries or medical treatments). When an incident causes no injury purely due to fortune, conventional systems categorize it as minor. <strong>OIL SIF-PREDICT</strong> identifies the underlying fatal precursor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional System */}
            <div className="p-5 rounded-lg border border-slate-200 bg-slate-50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-600">Traditional HSE Approach</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">Lagging Metric</span>
                </div>
                <div className="p-3 bg-white rounded border border-slate-200 font-mono text-xs text-slate-700 italic mb-4">
                  "A 500 kg drill collar fell from a height of 3 meters and landed in an empty walkway. No one was injured."
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Assigned Severity:</span>
                    <strong className="text-slate-800">Minor / Near Miss</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Investigation Priority:</span>
                    <strong className="text-slate-800">Low (No Lost Time)</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Management Escalation:</span>
                    <strong className="text-slate-500">None (Closed Locally)</strong>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-rose-700 font-medium">
                &times; Fails to prevent repeat fatal drop events.
              </div>
            </div>

            {/* OIL SIF-PREDICT */}
            <div className="p-5 rounded-lg border border-rose-200 bg-rose-50/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-rose-200">
                  <span className="text-xs font-bold uppercase tracking-wide text-rose-900">OIL SIF-PREDICT Engine</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white">Leading Indicator</span>
                </div>
                <div className="p-3 bg-white rounded border border-rose-200 font-mono text-xs text-slate-800 italic mb-4">
                  "A 500 kg drill collar fell from a height of 3 meters and landed in an empty walkway. No one was injured."
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-rose-100">
                    <span className="text-slate-600">High-Energy Hazard:</span>
                    <strong className="text-rose-900">500 kg Suspended Mass (3m)</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-rose-100">
                    <span className="text-slate-600">Barrier Compromise:</span>
                    <strong className="text-rose-900">Exclusion Zone Barricading</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-rose-100">
                    <span className="text-slate-600">IOGP Life-Saving Rule:</span>
                    <strong className="text-indigo-900">Safe Mechanical Lifting / Line of Fire</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-600">SIF Potential:</span>
                    <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-[11px]">HIGH (94% Conf.)</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-200 flex justify-between items-center text-[11px]">
                <span className="text-emerald-700 font-bold">&check; Escalates critical barrier failure immediately.</span>
                <button
                  onClick={() => onSelectSample("During crane lifting of a 500 kg drill collar at Duliajan Central Rig-12, the rigging sling slipped unexpectedly. The load dropped 3 meters into the active work zone. The barricading was not in place, and a technician standing 1.5 meters away had to dive aside. No injury occurred.", "No injury")}
                  className="text-indigo-700 hover:text-indigo-900 font-bold underline cursor-pointer"
                >
                  Test Sample &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Research Pipeline Diagram Component */}
        <section>
          <PipelineDiagram />
        </section>

        {/* Problem Statement & Research Gap Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
              The Operational Problem
            </span>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight mt-2 mb-3">
              Unstructured Free-Text vs Traditional Dashboards
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed space-y-2">
              Oil India Limited (OIL) generates thousands of Unsafe Act (UA), Unsafe Condition (UC), and Near-Miss reports annually across exploration, drilling rigs, gathering stations, and pipeline networks in Assam, Rajasthan, and beyond.
            </p>
            <div className="mt-4 space-y-2.5 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                <span><strong>Free-Text Complexity:</strong> The true hazard context is buried in free-text narratives with oilfield acronyms (LOTO, BOP, PTW, H2S).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                <span><strong>Subjective Severity Scoring:</strong> Reporters often mark near-misses as "Low Severity" because nobody was injured.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                <span><strong>Manual Review Bottlenecks:</strong> Safety officers cannot thoroughly audit thousands of text descriptions weekly.</span>
              </div>
            </div>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-8">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              The Research Paradigm Shift
            </span>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight mt-2 mb-3">
              Transitioning from Lagging to Leading Safety AI
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs">
                <div className="font-bold text-slate-700 mb-1">Traditional Question:</div>
                <div className="text-slate-500 font-mono italic">"What happened and how many days were lost?"</div>
              </div>

              <div className="p-3 bg-indigo-50/60 rounded border border-indigo-200 text-xs">
                <div className="font-bold text-indigo-950 mb-1">Proposed SIF-PREDICT Intelligence:</div>
                <div className="text-indigo-900 font-mono">
                  1. "What could realistically have happened?"<br/>
                  2. "Which critical safety barrier failed or was bypassed?"<br/>
                  3. "Which IOGP Life-Saving Rule governs this hazard?"<br/>
                  4. "What exact words justify this prediction?"
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
