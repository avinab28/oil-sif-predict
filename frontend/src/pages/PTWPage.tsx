import React, { useState } from 'react';
import { auditPTW } from '../services/api';
import { SIMOPSMatrix } from '../components/SIMOPSMatrix';
import { Card3D } from '../components/Card3D';

export const PTWPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'audit' | 'simops'>('audit');
  const [activity, setActivity] = useState("Replace 4-inch choke manifold valve on high pressure flowline.");
  const [permitType, setPermitType] = useState("Cold Work / Isolation");
  const [location, setLocation] = useState("Digboi Field - Wellpad #07");
  const [controls, setControls] = useState<string>("Manual valve isolation, safety glasses, cotton gloves");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAudit = async () => {
    setLoading(true);
    try {
      const res = await auditPTW({
        activity_description: activity,
        location: location,
        permit_type: permitType,
        controls_entered: controls.split(',').map(s => s.trim())
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
      {/* Page Title & Subtabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-classic-border pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-classic-black">
            Stage 1: Smart PTW & SIMOPS Collision Detector
          </h2>
          <p className="text-xs text-classic-slate mt-0.5">
            Automated permit compliance auditing, dynamic control verification, and spatial simultaneous operations clash prevention
          </p>
        </div>

        <div className="inline-flex rounded-lg border border-classic-border bg-white p-1">
          <button
            onClick={() => setActiveSubTab('audit')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeSubTab === 'audit' ? 'bg-classic-wine text-white shadow-3d-sm' : 'text-classic-charcoal hover:text-classic-black'
            }`}
          >
            Smart PTW & Dynamic Checklist
          </button>
          <button
            onClick={() => setActiveSubTab('simops')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeSubTab === 'simops' ? 'bg-classic-wine text-white shadow-3d-sm' : 'text-classic-charcoal hover:text-classic-black'
            }`}
          >
            SIMOPS Collision Matrix
          </button>
        </div>
      </div>

      {activeSubTab === 'simops' ? (
        <SIMOPSMatrix />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card3D className="p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm">
            <h3 className="font-serif font-bold text-classic-black text-base mb-1">Permit-to-Work Application Input</h3>
            <p className="text-xs text-classic-slate mb-4">Input job details to verify mandatory controls before permit issuance</p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-classic-charcoal block mb-1">Operational Location:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 rounded border border-classic-border bg-classic-ivory font-serif"
                />
              </div>

              <div>
                <label className="font-bold text-classic-charcoal block mb-1">Permit Classification:</label>
                <select
                  value={permitType}
                  onChange={(e) => setPermitType(e.target.value)}
                  className="w-full p-2.5 rounded border border-classic-border bg-classic-ivory"
                >
                  <option>Cold Work / Isolation</option>
                  <option>Hot Work (Open Flame / Welding)</option>
                  <option>Confined Space Entry</option>
                  <option>Heavy Mechanical Lifting</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-classic-charcoal block mb-1">Planned Activity Narrative:</label>
                <textarea
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 rounded border border-classic-border bg-classic-ivory font-serif text-classic-black"
                />
              </div>

              <div>
                <label className="font-bold text-classic-charcoal block mb-1">Controls Specified by Worker/Supervisor:</label>
                <input
                  type="text"
                  value={controls}
                  onChange={(e) => setControls(e.target.value)}
                  className="w-full p-2.5 rounded border border-classic-border bg-classic-ivory"
                />
                <span className="text-[10px] text-classic-slate">Comma-separated safety barriers</span>
              </div>

              <button
                onClick={handleAudit}
                disabled={loading}
                className="w-full py-2.5 bg-classic-wine hover:bg-classic-wineLight text-white rounded-lg font-bold text-xs transition-all shadow-3d-sm mt-2"
              >
                {loading ? 'Auditing Regulatory Standards...' : 'Execute Pre-Issuance PTW Audit &rarr;'}
              </button>
            </div>
          </Card3D>

          {/* Result Output */}
          <div className="space-y-4">
            {result ? (
              <Card3D className="p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm">
                <div className="flex items-center justify-between border-b border-classic-border pb-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-classic-wine">
                    Audit Status: {result.status}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                    result.compliance_score < 70 ? 'bg-red-100 text-red-900 border border-red-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}>
                    Score: {result.compliance_score}%
                  </span>
                </div>

                {/* Missing Mandatory Controls */}
                <div className="mb-4">
                  <span className="text-xs font-bold text-red-800 block mb-2">
                    &times; Mandatory Controls Missing (Violates OMR / DGMS Guidelines):
                  </span>
                  <div className="space-y-1.5">
                    {result.mandatory_controls_missing.map((c: string, i: number) => (
                      <div key={i} className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-900 font-medium">
                        &bull; {c}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dynamic Checklist */}
                <div className="mb-4">
                  <span className="text-xs font-bold text-classic-charcoal block mb-2">
                    Dynamic Pre-Job Actionable Checklist:
                  </span>
                  <div className="space-y-2">
                    {result.dynamic_checklist.map((item: any, i: number) => (
                      <div key={i} className="p-2.5 bg-classic-ivory rounded border border-classic-border text-xs flex items-center justify-between">
                        <span className="text-classic-black font-medium">{item.item}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                        }`}>
                          {item.verified ? 'VERIFIED' : 'PENDING SIGN-OFF'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-classic-black text-white rounded-lg text-xs">
                  <span className="font-bold text-classic-wineLight block mb-0.5">Authorizing Sign-Off Recommendation:</span>
                  <p className="text-classic-warmgray text-[11px]">{result.recommendations}</p>
                </div>
              </Card3D>
            ) : (
              <div className="h-full min-h-[350px] flex flex-col items-center justify-center p-8 bg-classic-ivory/50 rounded-xl border border-dashed border-classic-border text-center">
                <h4 className="font-serif font-bold text-classic-black text-sm">No Permit Evaluated</h4>
                <p className="text-xs text-classic-slate mt-1 max-w-sm">
                  Click "Execute Pre-Issuance PTW Audit" to review safety requirements against OIL SOP rules.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
