import React, { useState } from 'react';
import { analyzeReport } from '../services/api';
import { Card3D } from '../components/Card3D';
import { CausalChain3D } from '../components/CausalChain3D';
import { WhatIfSimulator } from '../components/WhatIfSimulator';
import { TokenHighlighter } from '../components/TokenHighlighter';
import { LifeSavingRuleCard } from '../components/LifeSavingRuleCard';
import { BarrierFailureTable } from '../components/BarrierFailureTable';
import { DEMO_SAMPLES } from '../services/localEngine';
import { ShieldAlert, Play, RefreshCw, Info, AlertTriangle } from 'lucide-react';
import { AnalysisResponse } from '../types';

export const EnginePage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'classifier' | 'whatif'>('classifier');
  const [selectedDemo, setSelectedDemo] = useState(DEMO_SAMPLES[0]);
  const [narrative, setNarrative] = useState(DEMO_SAMPLES[0].narrative);
  const [consequence, setConsequence] = useState(DEMO_SAMPLES[0].actual_consequence);
  const [location, setLocation] = useState(DEMO_SAMPLES[0].location);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSelectDemo = (demo: typeof DEMO_SAMPLES[0]) => {
    setSelectedDemo(demo);
    setNarrative(demo.narrative);
    setConsequence(demo.actual_consequence);
    setLocation(demo.location);
    setErrorMsg(null);
  };

  const handleAnalyze = async () => {
    if (!narrative.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await analyzeReport(narrative, consequence);
      setResult(res);
    } catch (e: any) {
      console.error("Analysis error:", e);
      setErrorMsg(e?.message || "Failed to process safety narrative.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to safely extract rule name
  const getRuleString = (rule: any): string => {
    if (!rule) return "Work Authorization & General Control";
    if (typeof rule === "string") return rule;
    return rule.primary_rule || "Work Authorization & General Control";
  };

  return (
    <div className="space-y-6">
      {/* Title & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-classic-border pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-classic-black">
            Stage 3 & 7: SIF Intelligence Engine & Counterfactual Sandbox
          </h2>
          <p className="text-xs text-classic-slate mt-0.5">
            NLP extraction of potential consequences, 3D barrier causal chains, and counterfactual "What-If" branch simulations
          </p>
        </div>

        <div className="inline-flex rounded-lg border border-classic-border bg-white p-1">
          <button
            onClick={() => setActiveSubTab('classifier')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeSubTab === 'classifier' ? 'bg-classic-wine text-white shadow-3d-sm' : 'text-classic-charcoal hover:text-classic-black'
            }`}
          >
            SIF NLP Classifier & 3D Causal Chain
          </button>
          <button
            onClick={() => setActiveSubTab('whatif')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeSubTab === 'whatif' ? 'bg-classic-wine text-white shadow-3d-sm' : 'text-classic-charcoal hover:text-classic-black'
            }`}
          >
            What-If Counterfactual Sandbox
          </button>
        </div>
      </div>

      {activeSubTab === 'whatif' ? (
        <WhatIfSimulator />
      ) : (
        <div className="space-y-6">
          {/* Preset Samples */}
          <div>
            <span className="text-xs font-mono font-bold text-classic-slate uppercase block mb-2">
              Representative Oil India Precursor Scenarios (Click to Load):
            </span>
            <div className="flex flex-wrap gap-2">
              {DEMO_SAMPLES.map((demo, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectDemo(demo)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedDemo.title === demo.title
                      ? 'bg-classic-wine text-white shadow-3d-sm font-bold'
                      : 'bg-white border border-classic-border text-classic-charcoal hover:border-classic-wine/40'
                  }`}
                >
                  {demo.activity} ({demo.location})
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Narrative */}
            <Card3D className="p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm">
              <h3 className="font-serif font-bold text-classic-black text-base mb-1">Free-Text Incident Report</h3>
              <p className="text-xs text-classic-slate mb-4">Unsafe Act / Unsafe Condition / Near-Miss narrative</p>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold text-classic-charcoal">Free-Text Observation:</label>
                    <span className="text-[10px] text-classic-slate font-mono">{narrative.length} chars</span>
                  </div>
                  <textarea
                    value={narrative}
                    onChange={(e) => setNarrative(e.target.value)}
                    rows={5}
                    placeholder="Enter observation narrative..."
                    className="w-full p-3 rounded-lg border border-classic-border bg-classic-ivory font-serif text-classic-black focus:outline-none focus:border-classic-wine leading-relaxed text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-classic-charcoal block mb-1">Reported Actual Consequence:</label>
                    <select
                      value={consequence}
                      onChange={(e) => setConsequence(e.target.value)}
                      className="w-full p-2.5 rounded border border-classic-border bg-classic-ivory font-serif text-xs"
                    >
                      <option value="No injury">No injury</option>
                      <option value="First aid">First aid</option>
                      <option value="Minor injury">Minor injury</option>
                      <option value="Medical treatment">Medical treatment</option>
                      <option value="Equipment damage">Equipment damage</option>
                      <option value="No damage">No damage</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-classic-charcoal block mb-1">Asset Location:</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-2.5 rounded border border-classic-border bg-classic-ivory font-serif text-xs"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-700 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  onClick={handleAnalyze}
                  disabled={loading || !narrative.trim()}
                  className="w-full py-2.5 bg-classic-black hover:bg-classic-wine text-white rounded-lg font-bold text-xs transition-all shadow-3d-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Evaluating SIF Potential & Energy Matrix...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Run Deep SIF Dissection →</span>
                    </>
                  )}
                </button>
              </div>
            </Card3D>

            {/* Output Findings Card */}
            <div className="space-y-4">
              {result ? (
                <Card3D className="p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm">
                  <div className="flex items-center justify-between border-b border-classic-border pb-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-classic-wine">
                      SIF Evaluation Results
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                      result.sif_potential || result.sif_potential_label === 'HIGH'
                        ? 'bg-red-100 text-red-900 border border-red-300'
                        : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}>
                      {result.sif_potential || result.sif_potential_label === 'HIGH'
                        ? 'POTENTIAL SIF PRECURSOR'
                        : 'NON-SIF INCIDENT'}
                    </span>
                  </div>

                  {/* Contrast Cards */}
                  <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                    <div className="p-2.5 bg-classic-ivory rounded border border-classic-border">
                      <span className="text-[10px] text-classic-slate uppercase block font-mono">Actual Consequence</span>
                      <span className="font-bold text-classic-black">{result.actual_consequence || consequence}</span>
                    </div>
                    <div className="p-2.5 bg-classic-ivory rounded border border-classic-border">
                      <span className="text-[10px] text-classic-slate uppercase block font-mono">Potential Consequence</span>
                      <span className="font-bold text-red-700">{result.potential_consequence}</span>
                    </div>
                    <div className="p-2.5 bg-classic-ivory rounded border border-classic-border">
                      <span className="text-[10px] text-classic-slate uppercase block font-mono">Calibrated Confidence</span>
                      <span className="font-bold text-classic-black font-mono">{result.confidence_percentage}%</span>
                    </div>
                    <div className="p-2.5 bg-classic-ivory rounded border border-classic-border">
                      <span className="text-[10px] text-classic-slate uppercase block font-mono">Operational Risk Level</span>
                      <span className={`font-bold ${result.risk_level === 'High' ? 'text-red-700' : 'text-classic-charcoal'}`}>
                        {result.risk_level || 'Medium'}
                      </span>
                    </div>
                  </div>

                  {/* Life Saving Rule Highlight */}
                  <div className="p-3 bg-classic-ivory border border-classic-border rounded-lg text-xs mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-classic-wine uppercase tracking-wider text-[10px]">
                        Applicable IOGP Life-Saving Rule:
                      </span>
                      <span className="font-mono text-[10px] text-classic-slate">
                        {Math.round((result.life_saving_rule?.confidence || 0.8) * 100)}% match
                      </span>
                    </div>
                    <div className="font-bold text-classic-black text-sm">
                      {getRuleString(result.life_saving_rule)}
                    </div>
                    {typeof result.life_saving_rule === 'object' && result.life_saving_rule?.description && (
                      <p className="text-classic-slate text-[11px] mt-1 leading-relaxed">
                        {result.life_saving_rule.description}
                      </p>
                    )}
                  </div>

                  {/* Research Phrasing Disclaimer */}
                  <div className="p-3 bg-classic-black text-white rounded-lg text-xs flex items-start gap-2">
                    <Info className="w-4 h-4 text-classic-wineLight shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-classic-wineLight block mb-0.5">Scientific Rationale:</span>
                      <p className="text-classic-warmgray text-[11px] leading-relaxed">
                        {result.academic_disclaimer || "The report exhibits physical energy or barrier characteristics associated with SIF potential."}
                      </p>
                    </div>
                  </div>
                </Card3D>
              ) : (
                <div className="h-full min-h-[350px] flex flex-col items-center justify-center p-8 bg-classic-ivory/50 rounded-xl border border-dashed border-classic-border text-center">
                  <ShieldAlert className="w-10 h-10 text-classic-wine/40 mb-3" />
                  <h4 className="font-serif font-bold text-classic-black text-sm">No Report Analyzed</h4>
                  <p className="text-xs text-classic-slate mt-1 max-w-sm">
                    Select a preset or enter free text and click "Run Deep SIF Dissection" to evaluate high-energy hazards.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Deep NLP Explainability, Life Saving Rule Card, and Barrier Table */}
          {result && (
            <div className="space-y-6 pt-4 border-t border-classic-border animate-in fade-in">
              <h3 className="font-serif font-bold text-classic-black text-lg">
                Deep NLP Explainability &amp; Barrier Failure Taxonomy
              </h3>

              {/* Token Highlighter */}
              {result.highlight_spans && (
                <TokenHighlighter
                  narrative={narrative}
                  spans={result.highlight_spans}
                  evidenceChecklist={result.evidence_checklist}
                />
              )}

              {/* Dual Row: IOGP Rule Card & Safety Barriers Table */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  {result.life_saving_rule && typeof result.life_saving_rule === 'object' && (
                    <LifeSavingRuleCard ruleData={result.life_saving_rule} />
                  )}
                </div>
                <div className="lg:col-span-2">
                  {result.barriers && (
                    <BarrierFailureTable barriers={result.barriers} />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 3D Causal Chain */}
          <CausalChain3D />
        </div>
      )}
    </div>
  );
};
