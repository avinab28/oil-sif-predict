import React, { useState } from 'react';
import { simulateCounterfactual } from '../services/api';
import { Card3D } from './Card3D';

export const WhatIfSimulator: React.FC = () => {
  const [scenario, setScenario] = useState("A 500 kg drilling swivel fell 4 meters into empty cellar grating while hoisting.");
  const [personnelInLine, setPersonnelInLine] = useState(false);
  const [secondaryBarrierFailed, setSecondaryBarrierFailed] = useState(false);
  const [highWind, setHighWind] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const res = await simulateCounterfactual({
        base_scenario: scenario,
        modified_factors: {
          personnel_in_line_of_fire: personnelInLine,
          secondary_barrier_failed: secondaryBarrierFailed,
          high_wind_dispersion: highWind
        }
      });
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <Card3D className="p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm">
          <h3 className="font-serif font-bold text-classic-black text-base mb-1">What-If Counterfactual Sandbox</h3>
          <p className="text-xs text-classic-slate mb-4">
            Simulates alternative causal branches: "What if personnel were standing 2 meters to the left?"
          </p>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-classic-charcoal block mb-1">Base Near-Miss Narrative:</label>
              <textarea
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                rows={3}
                className="w-full p-2.5 rounded border border-classic-border bg-classic-ivory font-serif text-classic-black"
              />
            </div>

            <div className="space-y-2.5 pt-2">
              <span className="font-bold text-classic-charcoal block">Counterfactual Permutations:</span>

              <label className="flex items-center gap-2.5 p-2.5 rounded border border-classic-border bg-classic-ivory cursor-pointer hover:border-classic-wine">
                <input
                  type="checkbox"
                  checked={personnelInLine}
                  onChange={(e) => setPersonnelInLine(e.target.checked)}
                  className="accent-classic-wine rounded"
                />
                <div>
                  <span className="font-bold text-classic-black block">Personnel in Line of Fire</span>
                  <span className="text-[10px] text-classic-slate">Simulate worker positioned inside the drop fall radius</span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded border border-classic-border bg-classic-ivory cursor-pointer hover:border-classic-wine">
                <input
                  type="checkbox"
                  checked={secondaryBarrierFailed}
                  onChange={(e) => setSecondaryBarrierFailed(e.target.checked)}
                  className="accent-classic-wine rounded"
                />
                <div>
                  <span className="font-bold text-classic-black block">Secondary Barrier Failure</span>
                  <span className="text-[10px] text-classic-slate">Simulate backup safety retaining sling breaking simultaneously</span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded border border-classic-border bg-classic-ivory cursor-pointer hover:border-classic-wine">
                <input
                  type="checkbox"
                  checked={highWind}
                  onChange={(e) => setHighWind(e.target.checked)}
                  className="accent-classic-wine rounded"
                />
                <div>
                  <span className="font-bold text-classic-black block">Adverse Meteorological Shift (High Wind / Rain)</span>
                  <span className="text-[10px] text-classic-slate">Wind gust causes dynamic swing and trajectory deflection</span>
                </div>
              </label>
            </div>

            <button
              onClick={handleSimulate}
              disabled={loading}
              className="w-full py-2.5 bg-classic-wine hover:bg-classic-wineLight text-white rounded-lg font-bold text-xs transition-all shadow-3d-sm mt-3"
            >
              {loading ? 'Simulating Dynamic Branches...' : 'Run Counterfactual Simulation &rarr;'}
            </button>
          </div>
        </Card3D>

        {/* Causal Outcome */}
        <div className="space-y-4">
          {result ? (
            <Card3D className="p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm">
              <div className="flex items-center justify-between border-b border-classic-border pb-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-classic-wine">
                  Counterfactual Outcome
                </span>
                <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                  result.sif_probability > 0.7 ? 'bg-red-100 text-red-900 border border-red-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  SIF Probability: {(result.sif_probability * 100).toFixed(0)}%
                </span>
              </div>

              <div className="text-sm font-bold text-classic-black mb-4">
                Projected Consequence: <span className="text-red-700">{result.simulation_outcome.replace(/_/g, ' ')}</span>
              </div>

              {/* Dynamic Causal Chain */}
              <div className="space-y-2 mb-4">
                <span className="text-xs font-bold text-classic-charcoal block">Dynamic Causal Chain:</span>
                {result.causal_chain.map((c: any, i: number) => (
                  <div key={i} className="p-2.5 bg-classic-ivory rounded border border-classic-border text-xs flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-classic-slate uppercase block">{c.stage}</span>
                      <span className="font-medium text-classic-black">{c.description}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.barrier_held ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {c.barrier_held ? 'Barrier Held' : 'Barrier Failed'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Interventions */}
              <div className="p-3 bg-classic-black text-white rounded-lg text-xs space-y-1">
                <span className="font-bold text-classic-wineLight block">Mandatory Barrier Reinforcements:</span>
                {result.interventions_to_break_chain.map((intv: string, idx: number) => (
                  <div key={idx} className="text-classic-warmgray text-[11px]">&bull; {intv}</div>
                ))}
              </div>
            </Card3D>
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-classic-ivory/50 rounded-xl border border-dashed border-classic-border text-center">
              <h4 className="font-serif font-bold text-classic-black text-sm">Ready to Simulate</h4>
              <p className="text-xs text-classic-slate mt-1 max-w-sm">
                Toggle the counterfactual permutations and click "Run Counterfactual Simulation" to evaluate the shifted causal outcome.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
