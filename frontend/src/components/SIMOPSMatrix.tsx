import React, { useState } from 'react';
import { checkSIMOPS } from '../services/api';
import { Card3D } from './Card3D';

export const SIMOPSMatrix: React.FC = () => {
  const [siteLocation, setSiteLocation] = useState("Drilling Rig #07 (Digboi)");
  const [distance, setDistance] = useState(12);
  const [activityA, setActivityA] = useState("Hot Work (Cutting & Welding on Wellhead Deck)");
  const [activityB, setActivityB] = useState("Hydrocarbon Sampling & Flange Breaking (Separation Unit)");
  const [barrierHeld, setBarrierHeld] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async () => {
    setLoading(true);
    try {
      const res = await checkSIMOPS({
        location: siteLocation,
        activities: [
          { type: activityA, zone: "Cellar Deck", distance_m: distance },
          { type: activityB, zone: "Manifold Deck", barrier: barrierHeld ? "Pressurized Habitat" : "None" }
        ]
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Configuration */}
        <Card3D className="lg:col-span-1 p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm">
          <h3 className="font-serif font-bold text-classic-black text-base mb-1">SIMOPS Clash Configuration</h3>
          <p className="text-xs text-classic-slate mb-4">Simultaneous Operations spatial barrier conflict checker</p>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-classic-charcoal block mb-1">Operational Asset:</label>
              <select
                value={siteLocation}
                onChange={(e) => setSiteLocation(e.target.value)}
                className="w-full p-2 rounded border border-classic-border bg-classic-ivory font-serif"
              >
                <option>Drilling Rig #07 (Digboi)</option>
                <option>Gas Compressor Plant #03 (Duliajan)</option>
                <option>Moran Oil Gathering Station</option>
                <option>Naharkatiya Wellpad #12</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-classic-charcoal block mb-1">Operation 1 (Work Permit #1):</label>
              <select
                value={activityA}
                onChange={(e) => setActivityA(e.target.value)}
                className="w-full p-2 rounded border border-classic-border bg-classic-ivory text-xs"
              >
                <option>Hot Work (Cutting & Welding on Wellhead Deck)</option>
                <option>Heavy Derrick Lifting (Tubing String Hoisting)</option>
                <option>Radiography Non-Destructive Testing (Gamma Source)</option>
                <option>High Pressure Hydrotesting (5,000 PSI)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-classic-charcoal block mb-1">Operation 2 (Adjacent Simultaneous Task):</label>
              <select
                value={activityB}
                onChange={(e) => setActivityB(e.target.value)}
                className="w-full p-2 rounded border border-classic-border bg-classic-ivory text-xs"
              >
                <option>Hydrocarbon Sampling & Flange Breaking (Separation Unit)</option>
                <option>Confined Space Entry (Cellar Tank Cleaning)</option>
                <option>Electrical Switchgear Live Inspection</option>
                <option>Crude Oil Condensate Offloading</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-classic-charcoal">Spatial Separation Distance:</label>
                <span className="font-mono font-bold text-classic-wine">{distance} meters</span>
              </div>
              <input
                type="range"
                min="2"
                max="60"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full accent-classic-wine cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-classic-slate mt-0.5">
                <span>2m (Dangerous)</span>
                <span>30m (Safe Standard)</span>
                <span>60m (Exclusion)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="barrier"
                checked={barrierHeld}
                onChange={(e) => setBarrierHeld(e.target.checked)}
                className="accent-classic-wine rounded"
              />
              <label htmlFor="barrier" className="text-xs text-classic-charcoal">
                Engineered Fire Barrier / Habitat Active
              </label>
            </div>

            <button
              onClick={handleCheck}
              disabled={loading}
              className="w-full py-2.5 bg-classic-wine hover:bg-classic-wineLight text-white rounded-lg font-bold text-xs transition-all shadow-3d-sm mt-3"
            >
              {loading ? 'Evaluating Spatial Interference...' : 'Execute SIMOPS Clash Audit &rarr;'}
            </button>
          </div>
        </Card3D>

        {/* Right 2D/3D Spatial Clash Radar Canvas & Results */}
        <div className="lg:col-span-2 space-y-4">
          <Card3D className="p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm">
            <h4 className="font-serif font-bold text-classic-black text-sm mb-2 flex items-center justify-between">
              <span>Interactive Spatial Clearance Radar</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                distance < 30 ? 'bg-red-100 text-red-900 border border-red-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}>
                {distance < 30 ? 'CRITICAL PROXIMITY VIOLATION' : 'ACCEPTABLE BUFFER'}
              </span>
            </h4>

            {/* Radar Simulation Diagram */}
            <div className="relative h-64 rounded-xl bg-classic-black overflow-hidden flex items-center justify-center p-4 border border-classic-slate">
              {/* Concentric rings */}
              <div className="absolute w-56 h-56 rounded-full border border-classic-slate/30" />
              <div className="absolute w-40 h-40 rounded-full border border-classic-slate/40" />
              <div className="absolute w-24 h-24 rounded-full border border-dashed border-red-500/50 animate-pulse" />

              {/* Center point Operation A */}
              <div className="absolute flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-classic-wine border-2 border-white flex items-center justify-center text-[8px] font-bold text-white shadow-lg">
                  A
                </div>
                <span className="text-[9px] font-mono text-white/90 mt-1 bg-classic-black/80 px-1.5 py-0.5 rounded">
                  Permit 1 (Hot Work)
                </span>
              </div>

              {/* Orbiting point Operation B based on distance slider */}
              <div
                className="absolute flex flex-col items-center transition-all duration-300"
                style={{
                  transform: `translate(${Math.min(100, distance * 2.2)}px, -${Math.min(70, distance * 1.5)}px)`
                }}
              >
                <div className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white shadow-lg ${
                  distance < 30 ? 'bg-red-600 animate-ping' : 'bg-emerald-600'
                }`}>
                  B
                </div>
                <span className="text-[9px] font-mono text-white/90 mt-1 bg-classic-black/80 px-1.5 py-0.5 rounded">
                  Permit 2 ({distance}m)
                </span>
              </div>

              {/* Connecting line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${Math.min(100, distance * 2.2)}px)`}
                  y2={`calc(50% - ${Math.min(70, distance * 1.5)}px)`}
                  stroke={distance < 30 ? '#EF4444' : '#10B981'}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>

              <div className="absolute bottom-2 left-3 text-[10px] font-mono text-classic-warmgray">
                Exclusion Zone: 30m Radius Standard (OIL-HSE-SOP-04)
              </div>
            </div>

            {/* Results Display */}
            {result && (
              <div className="mt-4 p-4 rounded-xl border border-classic-border bg-classic-ivory animate-in fade-in">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-classic-wine uppercase tracking-wider">
                    SIMOPS Clash Verdict: {result.severity}
                  </span>
                  <span className="text-xs font-mono font-bold text-red-700">
                    Min Required: {result.min_required_distance_m}m vs Actual: {result.separation_distance_m}m
                  </span>
                </div>
                <p className="text-xs text-classic-charcoal mb-2 font-medium">
                  {result.clash_reason}
                </p>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-900 font-bold">
                  Recommended HSE Action: {result.recommended_action}
                </div>
              </div>
            )}
          </Card3D>
        </div>
      </div>
    </div>
  );
};
