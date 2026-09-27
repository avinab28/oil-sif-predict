import React, { useState } from 'react';
import { correlateVision } from '../services/api';
import { Card3D } from './Card3D';

export const CCTVCorrelator: React.FC = () => {
  const [activePermit, setActivePermit] = useState("PTW-2026-HOT-8821 (Hot Work Grinding on Cellar Deck)");
  const [cctvDescription, setCctvDescription] = useState("CCTV Camera 04 captured worker grinding metal pipe support. Worker is wearing helmet and safety glasses, but no full face shield is visible. No spark containment blanket or portable gas detector observed within 3m radius.");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCorrelate = async () => {
    setLoading(true);
    try {
      const res = await correlateVision({
        image_description: cctvDescription,
        location: "Digboi Rig #07 Cellar Deck",
        active_ptw_id: activePermit
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
        {/* Input */}
        <Card3D className="p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm">
          <h3 className="font-serif font-bold text-classic-black text-base mb-1">CCTV / Vision AI Permit Correlator</h3>
          <p className="text-xs text-classic-slate mb-4">
            Cross-verifies real-time rig camera feeds against issued Permit-to-Work conditions
          </p>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-classic-charcoal block mb-1">Active Site PTW Permit:</label>
              <select
                value={activePermit}
                onChange={(e) => setActivePermit(e.target.value)}
                className="w-full p-2.5 rounded border border-classic-border bg-classic-ivory font-serif"
              >
                <option>PTW-2026-HOT-8821 (Hot Work Grinding on Cellar Deck)</option>
                <option>PTW-2026-CONF-4412 (Confined Space Mud Tank Cleaning)</option>
                <option>PTW-2026-LIFT-9903 (Derrick Crown Block Swabbing)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-classic-charcoal block mb-1">CCTV Vision AI Detection Stream:</label>
              <textarea
                value={cctvDescription}
                onChange={(e) => setCctvDescription(e.target.value)}
                rows={4}
                className="w-full p-2.5 rounded border border-classic-border bg-classic-ivory font-serif text-classic-black"
              />
            </div>

            <button
              onClick={handleCorrelate}
              disabled={loading}
              className="w-full py-2.5 bg-classic-wine hover:bg-classic-wineLight text-white rounded-lg font-bold text-xs transition-all shadow-3d-sm"
            >
              {loading ? 'Correlating Vision Feed with PTW...' : 'Verify Vision vs PTW Controls &rarr;'}
            </button>
          </div>
        </Card3D>

        {/* Output */}
        <div className="space-y-4">
          {result ? (
            <Card3D className="p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm">
              <div className="flex items-center justify-between border-b border-classic-border pb-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-classic-wine">
                  Vision Verification Status
                </span>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-red-100 text-red-900 border border-red-300">
                  {result.correlation_status.replace(/_/g, ' ')}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <span className="text-xs font-bold text-classic-charcoal block">Discrepancies & Violations Detected:</span>
                {result.findings.map((f: string, i: number) => (
                  <div key={i} className="p-2.5 bg-red-50 border border-red-200 rounded text-xs text-red-900 flex items-start gap-2">
                    <span className="text-red-700 font-bold">&times;</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-classic-black text-white rounded-lg text-xs">
                <span className="font-bold text-classic-wineLight block mb-0.5">Enforcement Protocol:</span>
                <p className="text-classic-warmgray text-[11px]">{result.recommended_mitigation}</p>
              </div>
            </Card3D>
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-classic-ivory/50 rounded-xl border border-dashed border-classic-border text-center">
              <h4 className="font-serif font-bold text-classic-black text-sm">Vision Stream Ready</h4>
              <p className="text-xs text-classic-slate mt-1 max-w-sm">
                Click "Verify Vision vs PTW Controls" to cross-reference CCTV object detection against the active PTW.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
