import React, { useState } from 'react';
import { analyzeReport } from '../services/api';
import { Card3D } from '../components/Card3D';
import { CausalChain3D } from '../components/CausalChain3D';
import { WhatIfSimulator } from '../components/WhatIfSimulator';
import { DEMO_SAMPLES } from '../services/localEngine';

export const EnginePage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'classifier' | 'whatif'>('classifier');
  const [selectedDemo, setSelectedDemo] = useState(DEMO_SAMPLES[0]);
  const [narrative, setNarrative] = useState(DEMO_SAMPLES[0].narrative);
  const [consequence, setConsequence] = useState(DEMO_SAMPLES[0].actual_consequence);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSelectDemo = (demo: typeof DEMO_SAMPLES[0]) => {
    setSelectedDemo(demo);
    setNarrative(demo.narrative);
    setConsequence(demo.actual_consequence);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!narrative.trim()) return;
    setLoading(true);
    try {
      const res = await analyzeReport(narrative, consequence);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
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
              Representative Oil India Precursor Scenarios:
            </span>
            <div className="flex flex-wrap gap-2">
              {DEMO_SAMPLES.map((demo, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectDemo(demo)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedDemo.title === demo.title
                      ? 'bg-classic-wine text-white shadow-3d-sm'
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
                  <label className="font-bold text-classic-charcoal block mb-1">Free-Text Observation:</label>
                  <textarea
                    value={narrative}
                    onChange={(e) => setNarrative(e.target.value)}
                    rows={5}
                    className="w-full p-3 rounded-lg border border-classic-border bg-classic-ivory font-serif text-classic-black focus:outline-none focus:border-classic-wine leading-relaxed"
                  />
                </div>

                <div>
                  <label className="font-bold text-classic-charcoal block mb-1">Reported Actual Consequence:</label>
                  <input
                    type="text"
                    value={consequence}
                    onChange={(e) => setConsequence(e.target.value)}
                    className="w-full p-2.5 rounded border border-classic-border bg-classic-ivory font-serif"
                  />
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={loading || !narrative.trim()}
                  className="w-full py-2.5 bg-classic-black hover:bg-classic-wine text-white rounded-lg font-bold text-xs transition-all shadow-3d-sm"
                >
                  {loading ? 'Evaluating SIF Potential & Energy Matrix...' : 'Run Deep SIF Dissection &rarr;'}
                </button>
              </div>
            </Card3D>

            {/* Output Findings */}
            <div className="space-y-4">
              {result ? (
                <Card3D className="p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm">
                  <div className="flex items-center justify-between border-b border-classic-border pb-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-classic-wine">
                      SIF Evaluation Results
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                      result.sif_potential ? 'bg-red-100 text-red-900 border border-red-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}>
                      {result.sif_potential ? 'POTENTIAL SIF PRECURSOR' : 'NON-SIF INCIDENT'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                    <div className="p-2.5 bg-classic-ivory rounded border border-classic-border">
                      <span className="text-[10px] text-classic-slate uppercase block font-mono">Actual Consequence</span>
                      <span className="font-bold text-classic-black">{result.actual_consequence}</span>
                    </div>
                    <div className="p-2.5 bg-classic-ivory rounded border border-classic-border">
                      <span className="text-[10px] text-classic-slate uppercase block font-mono">Potential Consequence</span>
                      <span className="font-bold text-red-700">{result.potential_consequence}</span>
                    </div>
                    <div className="p-2.5 bg-classic-ivory rounded border border-classic-border">
                      <span className="text-[10px] text-classic-slate uppercase block font-mono">Primary Hazard</span>
                      <span className="font-bold text-classic-black">{result.hazard_type}</span>
                    </div>
                    <div className="p-2.5 bg-classic-ivory rounded border border-classic-border">
                      <span className="text-[10px] text-classic-slate uppercase block font-mono">Life Saving Rule</span>
                      <span className="font-bold text-classic-wine">{result.life_saving_rule}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-classic-ivory border border-classic-border rounded-lg text-xs mb-4">
                    <span className="font-bold text-classic-black block mb-1">SIF Rationale:</span>
                    <p className="text-classic-charcoal text-[11px] leading-relaxed">{result.sif_rationale}</p>
                  </div>

                  <div className="p-3 bg-classic-black text-white rounded-lg text-xs">
                    <span className="font-bold text-classic-wineLight block mb-0.5">Recommended Barrier Interventions:</span>
                    <ul className="text-classic-warmgray text-[11px] space-y-0.5 list-disc list-inside">
                      {result.recommended_actions?.map((act: string, aIdx: number) => (
                        <li key={aIdx}>{act}</li>
                      ))}
                    </ul>
                  </div>
                </Card3D>
              ) : (
                <div className="h-full min-h-[350px] flex flex-col items-center justify-center p-8 bg-classic-ivory/50 rounded-xl border border-dashed border-classic-border text-center">
                  <h4 className="font-serif font-bold text-classic-black text-sm">No Report Analyzed</h4>
                  <p className="text-xs text-classic-slate mt-1 max-w-sm">
                    Select a preset or enter free text to run the SIF NLP classification model.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 3D Causal Chain */}
          <CausalChain3D />
        </div>
      )}
    </div>
  );
};
