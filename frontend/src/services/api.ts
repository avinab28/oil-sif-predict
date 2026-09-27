import { AnalysisResponse, DashboardMetrics, ReportItem } from '../types';
import { localEvaluateReport, getLocalDashboardMetrics, getLocalBenchmarks, DEMO_SAMPLES } from './localEngine';

const API_BASE = 'http://localhost:8000';

export async function analyzeReport(narrative: string, actual_consequence = "No injury"): Promise<AnalysisResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ narrative, actual_consequence })
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    return localEvaluateReport(narrative, actual_consequence);
  }
}

export async function auditPTW(data: { activity_description: string; location: string; permit_type: string; controls_entered: string[] }) {
  try {
    const res = await fetch(`${API_BASE}/api/ptw/audit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      status: "REJECTED_MISSING_MANDATORY_CONTROLS",
      compliance_score: 42,
      mandatory_controls_missing: [
        "Continuous LEL & H2S Gas Testing at 15-min intervals",
        "Double Block and Bleed (DBB) isolation confirmation",
        "Spark arrestor and fire blanket containment on flange joints"
      ],
      prohibited_activities: [
        "Concurrent condensate transfer during hot work within 50m radius"
      ],
      dynamic_checklist: [
        { item: "Check explosive atmosphere with calibrated 4-gas detector (LEL < 1%)", required: true, verified: false },
        { item: "Depressurize and zero-energy tag LOTO valves #V-104 and #V-108", required: true, verified: false },
        { item: "Erect 10m flame-retardant welding habitat with positive pressurization", required: true, verified: false },
        { item: "Assign dedicated standby fire-watch with 50kg ABC dry powder extinguisher", required: true, verified: true }
      ],
      recommendations: "Hold permit issuance until Lockout/Tagout physical verification tags are signed by Area Authority."
    };
  }
}

export async function checkSIMOPS(data: { location: string; activities: any[] }) {
  try {
    const res = await fetch(`${API_BASE}/api/ptw/simops-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      clash_detected: true,
      severity: "CRITICAL_PROHIBITED",
      clash_reason: "Hot Work (Grinding/Welding) on Wellhead-4 overlaps with Flange Breaking / Hydrocarbon Sampling within 12 meters.",
      recommended_action: "Suspend Sampling Permit PTW-2026-902 until Hot Work completes and atmosphere is re-tested.",
      separation_distance_m: 12,
      min_required_distance_m: 30
    };
  }
}

export async function processVoice(data: { audio_transcript: string; language: string; site_id: string; reporter_role: string }) {
  try {
    const res = await fetch(`${API_BASE}/api/voice/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      structured_observation: {
        site_id: data.site_id,
        activity: "High-Pressure Mud Line Maintenance",
        hazard: "Whip-check cable missing on 3000 PSI vibrating hose",
        barrier_status: "Failed / Defeated",
        life_saving_rule: "Line of Fire & Energy Isolation",
        urgency: "HIGH",
        sif_potential: true
      },
      parsed_elements: {
        raw_text: data.audio_transcript,
        detected_language: data.language,
        confidence: 0.94
      }
    };
  }
}

export async function getFollowupQuestions(data: { activity: string; hazard: string; controls_missing: string[] }) {
  try {
    const res = await fetch(`${API_BASE}/api/voice/followup-questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      questions: [
        "Was the mud pump operating under pressure while personnel were standing within 3 meters?",
        "Was the safety sling hobble clamped and load-rated to 5,000 PSI?",
        "Has the area been barricaded to prevent other rig floor crew from entering the line of fire?"
      ]
    };
  }
}

export async function correlateVision(data: { image_description: string; location: string; active_ptw_id: string }) {
  try {
    const res = await fetch(`${API_BASE}/api/vision/correlate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      correlation_status: "HAZARD_MISMATCH_DETECTED",
      sif_precursor_flag: true,
      findings: [
        "Worker observed grinding on pipe support without full face shield",
        "Active PTW specifies Hot Work Permit #PTW-8821 but gas detector is not visible within 2 meters",
        "Combustible oily rags spotted within 3 meters of active grinding sparks"
      ],
      recommended_mitigation: "HSE Officer should immediately initiate Stop Work Authority (SWA) and inspect barrier isolation."
    };
  }
}

export async function getActiveConverging() {
  try {
    const res = await fetch(`${API_BASE}/api/converging/active`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      active_clusters: [
        {
          cluster_id: "CLUST-DIGBOI-01",
          asset: "Drilling Rig #07 (Digboi Field)",
          risk_multiplier: 4.8,
          status: "HIGH_ESCALATION_ALERT",
          weak_signals: [
            { timestamp: "2026-09-25 14:20", text: "Minor gas bubbling detected in cellar pit during shift turnover", severity: "Low", category: "Well Control" },
            { timestamp: "2026-09-26 09:15", text: "Faint hissing sound near BOP choke manifold flange", severity: "Low", category: "Containment" },
            { timestamp: "2026-09-26 16:40", text: "H2S fixed sensor channel 3 flagged intermittent zero drift", severity: "Low", category: "Instrumentation" }
          ],
          projected_catastrophe: "Uncontrolled Wellbore Blowout / Flash Fire if high-pressure kick occurs"
        },
        {
          cluster_id: "CLUST-DULIAJAN-04",
          asset: "Gas Compressor Station #3 (Duliajan)",
          risk_multiplier: 3.5,
          status: "MODERATE_WARNING",
          weak_signals: [
            { timestamp: "2026-09-24 11:00", text: "Temporary bypass fitted on high-vibration lube oil pump", severity: "Low", category: "Mechanical" },
            { timestamp: "2026-09-26 18:30", text: "Contractor rigger spotted crossing red exclusion zone under overhead crane", severity: "Low", category: "Lifting" }
          ],
          projected_catastrophe: "Overhead load drop into pressurized gas header"
        }
      ]
    };
  }
}

export async function getEscalationTrends() {
  try {
    const res = await fetch(`${API_BASE}/api/escalation/trends`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      trend_points: [
        { month: "Apr 2026", near_misses: 142, sif_precursors: 18, actual_sif: 0 },
        { month: "May 2026", near_misses: 189, sif_precursors: 29, actual_sif: 1 },
        { month: "Jun 2026", near_misses: 165, sif_precursors: 22, actual_sif: 0 },
        { month: "Jul 2026", near_misses: 210, sif_precursors: 38, actual_sif: 1 },
        { month: "Aug 2026", near_misses: 245, sif_precursors: 46, actual_sif: 0 },
        { month: "Sep 2026", near_misses: 278, sif_precursors: 52, actual_sif: 0 }
      ]
    };
  }
}

export async function getKnowledgeGraph(category = "All") {
  try {
    const res = await fetch(`${API_BASE}/api/knowledge-graph?category=${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      nodes: [
        { id: "SITE_DIGBOI", label: "Digboi Drilling Rig #07", category: "Site" },
        { id: "SITE_DULIAJAN", label: "Duliajan Compressor Plant", category: "Site" },
        { id: "SITE_MORAN", label: "Moran Oil Gathering Station", category: "Site" },
        { id: "ACT_LIFTING", label: "Tubing Swabbing & Lifting", category: "Activity" },
        { id: "ACT_HOTWORK", label: "Flange Welding (Hot Work)", category: "Activity" },
        { id: "HAZ_STORED_ENERGY", label: "High-Pressure Surge / Whip", category: "Hazard" },
        { id: "HAZ_H2S_TOXIC", label: "H2S Sour Gas Release", category: "Hazard" },
        { id: "BAR_WHIPCHECK", label: "Hobble / Whip-Check Sling", category: "Barrier" },
        { id: "BAR_GASDETECTOR", label: "Calibrated 4-Gas Portable Monitor", category: "Barrier" },
        { id: "CON_FATALITY", label: "Potential Multiple Fatalities", category: "Consequence" },
        { id: "RUL_LIFESAVING", label: "LSR: Line of Fire & Isolation", category: "Rule" }
      ],
      links: [
        { source: "SITE_DIGBOI", target: "ACT_LIFTING", type: "OCCURS_AT" },
        { source: "SITE_DULIAJAN", target: "ACT_HOTWORK", type: "OCCURS_AT" },
        { source: "ACT_LIFTING", target: "HAZ_STORED_ENERGY", type: "INTRODUCES" },
        { source: "ACT_HOTWORK", target: "HAZ_H2S_TOXIC", type: "INTRODUCES" },
        { source: "HAZ_STORED_ENERGY", target: "BAR_WHIPCHECK", type: "SAFEGUARDED_BY" },
        { source: "HAZ_H2S_TOXIC", target: "BAR_GASDETECTOR", type: "SAFEGUARDED_BY" },
        { source: "BAR_WHIPCHECK", target: "CON_FATALITY", type: "PREVENTS" },
        { source: "BAR_GASDETECTOR", target: "CON_FATALITY", type: "PREVENTS" },
        { source: "CON_FATALITY", target: "RUL_LIFESAVING", type: "GOVERNED_BY" }
      ]
    };
  }
}

export async function getCrossSitePatterns() {
  try {
    const res = await fetch(`${API_BASE}/api/cross-site/patterns`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      patterns: [
        {
          pattern_title: "Recurrent Whip-Check Absence on Rig Mud Pumps",
          affected_sites: ["Digboi Rig #07", "Moran Rig #12", "Jorhat Rig #03"],
          total_occurrences_90d: 14,
          hazard: "High-pressure hose decoupling under 3,200 PSI",
          systemic_root_cause: "Subcontractor crews using improper wire ties instead of certified rated safety hobbles."
        },
        {
          pattern_title: "Incomplete LOTO on Flare Header Drain Valves",
          affected_sites: ["Duliajan Plant", "Naharkatiya OGS"],
          total_occurrences_90d: 8,
          hazard: "Toxic hydrocarbon gas backflow into open piping",
          systemic_root_cause: "Confusion over dual-locking protocol between electrical and mechanical maintenance leads."
        }
      ]
    };
  }
}

export async function getPriorityQueue() {
  try {
    const res = await fetch(`${API_BASE}/api/priority-queue`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      priority_queue: [
        {
          rank: 1,
          site: "Digboi Drilling Rig #07",
          precursor: "Cellar Gas Bubbles + Unchecked Choke Manifold Hiss",
          urgency: "IMMEDIATE_ACTION",
          recommended_intervention: "HSE Head & Asset Manager joint inspection within 4 hours; halt drilling operations pending pressure test."
        },
        {
          rank: 2,
          site: "Duliajan Compressor Station #3",
          precursor: "SIMOPS Clash: Hot Work during Condensate Sampling",
          urgency: "HIGH",
          recommended_intervention: "Revoke PTW-2026-902; mandate physical barrier distance audit."
        },
        {
          rank: 3,
          site: "Moran Wellhead Cluster #05",
          precursor: "Corroded Derrick Gin Pole Guy Line Anchor",
          urgency: "MEDIUM",
          recommended_intervention: "Replace anchor wire rope and perform NDT pull test prior to heavy casing run."
        }
      ]
    };
  }
}

export async function getContractorScorecards() {
  try {
    const res = await fetch(`${API_BASE}/api/contractor/scorecards`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      contractors: [
        {
          contractor_name: "Brahmaputra Rigging & Engineering Works",
          trade: "Heavy Rigging & Derrick Assembly",
          active_workers: 84,
          sif_precursor_rate: "12.4 per 1,000 hrs",
          repeat_violations: 5,
          golden_rule_score: 68,
          risk_status: "HIGH_RISK_WATCHLIST",
          top_issue: "Frequent line-of-fire violations and uninspected web slings"
        },
        {
          contractor_name: "Assam Well Services Ltd.",
          trade: "Well Workover & Coil Tubing",
          active_workers: 110,
          sif_precursor_rate: "4.1 per 1,000 hrs",
          repeat_violations: 1,
          golden_rule_score: 91,
          risk_status: "APPROVED_EXEMPLARY",
          top_issue: "Occasional delayed permit sign-off"
        },
        {
          contractor_name: "Northeast Pipeline Solutions",
          trade: "Flowline Welding & Hydrotesting",
          active_workers: 65,
          sif_precursor_rate: "8.7 per 1,000 hrs",
          repeat_violations: 3,
          golden_rule_score: 76,
          risk_status: "NEEDS_SUPERVISION",
          top_issue: "Hot work habitats lacking positive differential pressure"
        }
      ]
    };
  }
}

export async function simulateCounterfactual(data: { base_scenario: string; modified_factors: Record<string, boolean> }) {
  try {
    const res = await fetch(`${API_BASE}/api/counterfactual/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    const personnelInLine = data.modified_factors["personnel_in_line_of_fire"] ?? false;
    const secondaryBarrierFailed = data.modified_factors["secondary_barrier_failed"] ?? false;
    const highWind = data.modified_factors["high_wind_dispersion"] ?? false;

    let baseProb = 0.35;
    if (personnelInLine) baseProb += 0.45;
    if (secondaryBarrierFailed) baseProb += 0.15;
    if (highWind) baseProb += 0.05;
    const finalProb = Math.min(0.99, baseProb);

    return {
      simulation_outcome: finalProb > 0.7 ? "FATALITY_HIGHLY_PROBABLE" : (finalProb > 0.4 ? "SERIOUS_INJURY_PROBABLE" : "NEAR_MISS_CONTAINED"),
      sif_probability: Number(finalProb.toFixed(2)),
      causal_chain: [
        { stage: "Initiating Event", description: "Winch cable snapped under dynamic loading", barrier_held: false },
        { stage: "Primary Defense", description: "Secondary safety sling caught 40% of load weight", barrier_held: !secondaryBarrierFailed },
        { stage: "Personnel Positioning", description: personnelInLine ? "Personnel standing directly inside 45-degree snap-back zone" : "All personnel remained behind engineered barrier shields", barrier_held: !personnelInLine },
        { stage: "Final Consequence", description: finalProb > 0.7 ? "Direct blunt force trauma resulting in fatal crush injury" : "Deflected load struck empty grating; near miss recorded", barrier_held: finalProb <= 0.4 }
      ],
      interventions_to_break_chain: [
        "Enforce acoustic exclusion zone sensors that trip the winch power if human presence is detected",
        "Mandate synthetic plasma ropes that drop dead without snap-back recoil energy"
      ]
    };
  }
}

export async function getDashboardData(): Promise<DashboardMetrics> {
  try {
    const res = await fetch(`${API_BASE}/api/dashboard`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    return getLocalDashboardMetrics();
  }
}

export async function getReports(page = 1, limit = 20, filters?: any): Promise<{ total: number; reports: ReportItem[] }> {
  try {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (filters?.search) params.append('search', filters.search);
    if (filters?.location && filters.location !== 'All') params.append('location', filters.location);
    if (filters?.activity && filters.activity !== 'All') params.append('activity', filters.activity);
    if (filters?.rule && filters.rule !== 'All') params.append('rule', filters.rule);
    if (filters?.sifOnly) params.append('sif_only', 'true');

    const res = await fetch(`${API_BASE}/api/reports?${params.toString()}`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    const all = DEMO_SAMPLES.map((d, i) => ({
      report_id: `OIL-HSSE-2025-${10001 + i}`,
      date: '2025-05-14 10:30',
      location: d.location,
      activity: d.activity,
      report_type: 'Near Miss',
      narrative: d.narrative,
      actual_consequence: d.actual_consequence,
      potential_consequence: /drill|h2s|loto|whip-check|derrick|flange|grinding/.test(d.narrative.toLowerCase()) ? 'Fatality' : 'Minor injury',
      hazard_type: d.activity === 'Lifting Operations' ? 'Suspended Load' : (d.activity === 'Confined Space Entry' ? 'H2S Toxic Gas' : 'Stored Energy'),
      barrier_type: 'Exclusion Zone',
      barrier_status: 'Failed',
      life_saving_rule: d.activity === 'Lifting Operations' ? 'Safe Mechanical Lifting' : 'Line of Fire',
      sif_potential: /drill|h2s|loto|whip-check|derrick|flange|grinding/.test(d.narrative.toLowerCase()),
      sif_confidence: 0.94,
      risk_level: 'High',
      source: 'Synthetic Research Dataset'
    }));
    return { total: all.length, reports: all };
  }
}

export async function getModelBenchmarks() {
  try {
    const res = await fetch(`${API_BASE}/api/model-performance`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    return getLocalBenchmarks();
  }
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/`, { method: 'GET' });
    return res.ok;
  } catch {
    return false;
  }
}
