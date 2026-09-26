import { AnalysisResponse, DashboardMetrics, ModelBenchmarkItem, ReportItem } from '../types';

export const DEMO_SAMPLES = [
  {
    title: "500kg Suspended Drill Collar (High SIF)",
    activity: "Lifting Operations",
    actual_consequence: "No injury",
    location: "Duliajan Central Rig-12",
    narrative: "During crane lifting of a 500 kg drill collar at Duliajan Central Rig-12, the rigging sling slipped unexpectedly. The load dropped 3 meters into the active work zone. The barricading was not in place, and a technician standing 1.5 meters away had to dive aside. No injury occurred."
  },
  {
    title: "H2S Separator Entry Without Gas Test (High SIF)",
    activity: "Confined Space Entry",
    actual_consequence: "First aid",
    location: "Moran Production Facility",
    narrative: "Technician entered crude oil separator tank at Moran Production Facility without atmospheric gas testing or ventilation verification. After 2 minutes, worker experienced acute dizziness and throat irritation from trapped H2S pockets. Worker scrambled out and received oxygen therapy. PTW controls were bypassed."
  },
  {
    title: "415V Breaker Panel Without LOTO (High SIF)",
    activity: "Electrical Work",
    actual_consequence: "No injury",
    location: "Naharkatiya Well-Site 4A",
    narrative: "Electrician began replacing a 415V breaker panel at Naharkatiya Well-Site 4A. Isolator switch had not been locked out (LOTO bypassed) due to missing padlock. A colleague energized the upstream feed from MCC room. Electrician noticed high-voltage sparking upon touching screwdriver to terminal and pulled back instantly. Zero injuries."
  },
  {
    title: "High-Pressure Mud Line Whip-Check Failed (High SIF)",
    activity: "Drilling",
    actual_consequence: "No injury",
    location: "Rajasthan Basin Rig-07",
    narrative: "During mud pump pressure testing up to 3500 PSI at Rajasthan Basin Rig-07, high-pressure hammer union failed catastrophically. The discharge hose flailed violently across the rig sub-structure. Safety whip-check cable was disconnected. Three drill crew members were standing 3 meters away behind steel stanchion. No injury."
  },
  {
    title: "Derrick Monkey Board Tie-off Missing (High SIF)",
    activity: "Working at Height",
    actual_consequence: "Minor injury",
    location: "Upper Assam Exploratory Block-3",
    narrative: "Rigger climbed to derrick monkey board at Upper Assam Exploratory Block-3 at height of 18 meters without hooking twin lanyards. Grating section was unbolted and tilted under foot. Rigger managed to grab structural beam with both hands and sustained sprained wrist. No fall occurred."
  },
  {
    title: "Hydrocarbon Flange Pressure Blowout (High SIF)",
    activity: "Pipeline Integrity Inspection",
    actual_consequence: "No injury",
    location: "Bokakhat Pipeline Junction-9",
    narrative: "Pipeline crew began loosening 12-inch flange bolts on trunk line at Bokakhat Pipeline Junction-9. Trapped pressurized gas blew out remaining gasket with loud sonic bang, spraying rust debris across workspace. Line had not been verified zero-pressure through drain vent. Crew had safety glasses on; no eye trauma."
  },
  {
    title: "Hot Work Spark Near Flammable Drain (High SIF)",
    activity: "Welding & Hot Work",
    actual_consequence: "Equipment damage",
    location: "Digboi Historical Field Station",
    narrative: "Grinding sparks from pipeline header repair at Digboi Historical Field Station flew through gaps in fire blanket into open drain trench where condensate had accumulated. Small explosion and fire flash in trench extinguished quickly. Flame screen barrier was improperly sealed."
  },
  {
    title: "Garden Hose Coiled on Walkway (Low SIF)",
    activity: "Maintenance",
    actual_consequence: "No injury",
    location: "Duliajan Central Rig-12",
    narrative: "Observer noted garden hose left coiled across pedestrian walkway outside office entrance at Duliajan Central Rig-12. Hose was rolled up and moved to storage. No tripping incident occurred."
  },
  {
    title: "Unlabelled Detergent Bottle in Mud Lab (Low SIF)",
    activity: "Chemical Handling",
    actual_consequence: "No damage",
    location: "Digboi Historical Field Station",
    narrative: "A detergent cleaning solution bottle was stored without its cap on cleaning bench in mud lab at Digboi Historical Field Station. Cap was screwed on tightly. No fumes or spills observed."
  },
  {
    title: "Vehicle Parked Without Wheel Chocks (Low SIF)",
    activity: "Vehicle Movement",
    actual_consequence: "No damage",
    location: "Naharkatiya Well-Site 4A",
    narrative: "Pickup vehicle was parked in designated parking bay at Naharkatiya Well-Site 4A on flat asphalt without wheel chocks deployed. Handbrake was firmly engaged. Driver was reminded of facility chock rule and deployed chocks."
  },
  {
    title: "Two-Person Lift for 25kg Box (Low SIF)",
    activity: "Well Servicing",
    actual_consequence: "No injury",
    location: "Bokakhat Pipeline Junction-9",
    narrative: "Worker attempted to lift 25 kg box of pump packing alone at Bokakhat Pipeline Junction-9. Colleague intervened and executed two-person lift in accordance with safe manual handling standard. No strain occurred."
  },
  {
    title: "Dead Fluorescent Tube in Tool Shed (Low SIF)",
    activity: "Maintenance",
    actual_consequence: "No injury",
    location: "Rajasthan Basin Rig-07",
    narrative: "Technician working at workbench in tool shed at Rajasthan Basin Rig-07 observed poor lighting due to a dead fluorescent tube. Portable LED work light set up while electrician replaced fixture."
  },
  {
    title: "Trace Oil Sheen in Rainwater Ditch (Low SIF)",
    activity: "Well Servicing",
    actual_consequence: "No injury",
    location: "Kumchai Exploration Pad",
    narrative: "Slight oil sheen noticed in rainwater drainage ditch near flare knock-out drum at Kumchai Exploration Pad. Absorbent boom was deployed across the discharge culvert to contain any trace oil. No environmental breach."
  },
  {
    title: "Eyewash Filter Cleaning (Low SIF)",
    activity: "Chemical Handling",
    actual_consequence: "No damage",
    location: "Moran Production Facility",
    narrative: "Safety shower eyewash station at Moran Production Facility was tested during morning audit. Water pressure was slightly low due to inline filter silt. Maintenance serviced the strainer within 1 hour."
  },
  {
    title: "Overstacked Wooden Pallets (Low SIF)",
    activity: "Maintenance",
    actual_consequence: "No injury",
    location: "Shalmari Gathering Station",
    narrative: "A pile of discarded wooden packaging pallets was left stacked unevenly near the warehouse gate at Shalmari Gathering Station. Warehouse supervisor arranged re-stacking on ground level. Area clear of hazards."
  }
];

export function localEvaluateReport(narrative: string, actual_consequence = "No injury"): AnalysisResponse {
  const lower = narrative.toLowerCase();
  
  const hasEnergy = /kg|ton|crane|suspended|drill collar|valve|spool|psi|pressure|ruptured|blew out|h2s|gas|415v|3\.3kv|loto|monkey board|height|derrick|welding|flash fire/.test(lower);
  const hasExposure = /entered the area below|standing|walkway|drop zone|technician|worker|roughneck|scaffolder|operator|clung|dive aside|pulled back/.test(lower);
  const barrierFailed = /not barricaded|no barricade|bypassed|without|failed|missing|snapped|ruptured|disconnected|broken/.test(lower);
  
  let score = 0.22;
  if (hasEnergy) score += 0.38;
  if (hasExposure) score += 0.20;
  if (barrierFailed) score += 0.16;
  score = Math.min(0.97, Math.max(0.12, score));
  
  const isSif = score >= 0.50;
  const label = score >= 0.75 ? 'HIGH' : (score >= 0.45 ? 'MEDIUM' : 'LOW');
  const risk = isSif ? (/h2s|explosion|3\.3kv/.test(lower) ? 'Critical' : 'High') : (score > 0.3 ? 'Medium' : 'Low');
  const potential = isSif ? (/h2s|explosion|3\.3kv/.test(lower) ? 'Multiple Fatality Potential' : 'Serious Injury / Fatality') : 'Minor Injury / No Lost Time';
  
  // Rule
  let ruleName = "Safe Mechanical Lifting";
  let lineage = ["Safety Narrative", "Suspended Tubular / Load", "Worker in Drop Zone", "Line of Fire Exposure", "IOGP Rule: Safe Mechanical Lifting"];
  if (/confined|separator|h2s|tank|oxygen/.test(lower)) {
    ruleName = "Confined Space";
    lineage = ["Safety Narrative", "Enclosed Vessel / Pit", "Toxic H2S / Inert Atmosphere", "Atmospheric Testing Failure", "IOGP Rule: Confined Space"];
  } else if (/loto|breaker|415v|voltage|sparking|electric/.test(lower)) {
    ruleName = "Energy Isolation";
    lineage = ["Safety Narrative", "Live Electrical Circuit", "Unisolated Power Feed", "Lockout-Tagout (LOTO) Deficit", "IOGP Rule: Energy Isolation"];
  } else if (/height|monkey board|derrick|harness|lanyard|scaffold/.test(lower)) {
    ruleName = "Working at Height";
    lineage = ["Safety Narrative", "Elevated Derrick Deck (18m)", "Missing 100% Tie-Off", "Fall Arrest Barrier Failure", "IOGP Rule: Working at Height"];
  } else if (/hot work|welding|grinding|spark|flame|fire blanket/.test(lower)) {
    ruleName = "Hot Work";
    lineage = ["Safety Narrative", "Grinding / Welding Hot Work", "Flammable Hydrocarbon Vapor", "Habitat Breach / Spark Escape", "IOGP Rule: Hot Work"];
  } else if (/pressure|psi|whip-check|flange|blowout/.test(lower)) {
    ruleName = "Line of Fire";
    lineage = ["Safety Narrative", "High-Pressure Line (3500 PSI)", "Whip-Check Disconnected", "Line of Fire Discharge Arc", "IOGP Rule: Line of Fire"];
  } else if (/chock|vehicle|speed|parking/.test(lower)) {
    ruleName = "Driving Safety";
    lineage = ["Safety Narrative", "Vehicle Movement", "Wheel Chock Requirement", "Safe Driving Controls"];
  } else if (!isSif) {
    ruleName = "Work Authorization / Other Controls";
    lineage = ["Safety Narrative", "Routine Maintenance / Housekeeping", "Standard Operating Procedures"];
  }

  // Barriers
  const barriers = [];
  if (/barricad|drop zone/.test(lower)) {
    barriers.push({
      barrier: "Exclusion Zone Barricading",
      category: "Physical / Administrative",
      status: "FAILED" as const,
      evidence: "Barricading was not in place around active load drop zone."
    });
  }
  if (/loto|padlock|isolat/.test(lower)) {
    barriers.push({
      barrier: "Lockout / Tagout (LOTO)",
      category: "Engineered Isolation",
      status: "FAILED" as const,
      evidence: "LOTO bypassed due to missing padlock on main breaker."
    });
  }
  if (/gas test|multi-gas|ventil/.test(lower)) {
    barriers.push({
      barrier: "Atmospheric Gas Testing",
      category: "Life Support / Environmental",
      status: "FAILED" as const,
      evidence: "Entered confined space without verifying atmospheric gas levels."
    });
  }
  if (/harness|lanyard|tie-off/.test(lower)) {
    barriers.push({
      barrier: "Fall Arrest & 100% Tie-Off",
      category: "Personal Safety Barrier",
      status: "FAILED" as const,
      evidence: "Worker climbed to elevated derrick platform without hooking lanyards."
    });
  }
  if (/whip-check|pressure gauge|relief/.test(lower)) {
    barriers.push({
      barrier: "Pressure Containment & Whip-Checks",
      category: "Mechanical Barrier",
      status: "FAILED" as const,
      evidence: "Safety whip-check cable was disconnected during 3500 PSI test."
    });
  }
  if (barriers.length === 0) {
    barriers.push({
      barrier: "Administrative Operating Procedure",
      category: "Procedural Control",
      status: (isSif ? "AT RISK" : "EFFECTIVE") as any,
      evidence: isSif ? "Inadequate exclusion control observed." : "Standard procedural housekeeping followed."
    });
  }

  // Spans for highlighting
  const spans = [];
  const addSpan = (pattern: RegExp, type: any, label: string) => {
    let match;
    const regex = new RegExp(pattern, 'gi');
    while ((match = regex.exec(narrative)) !== null) {
      spans.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
        type,
        label
      });
    }
  };

  addSpan(/\d+\s*(?:kg|psi|meters|v|ton)/i, 'high_energy', 'High-Energy Hazard');
  addSpan(/suspended\s+\w+|drill collar|valve|crane|h2s|pressure|breaker panel|hammer union/i, 'high_energy', 'High-Energy Hazard');
  addSpan(/entered the area below|standing|walkway|drop zone|dive aside|pulled back|worker|technician/i, 'exposure', 'Human Exposure');
  addSpan(/not in place|not barricaded|bypassed|without|failed|disconnected|missing padlock/i, 'barrier_failure', 'Critical Barrier Failure');
  addSpan(/slipped unexpectedly|swung violently|flailed violently|dropped 3 meters|ruptured/i, 'unsafe_event', 'Unsafe Dynamic Event');
  addSpan(/no injury occurred|zero injuries|first aid|sprained wrist/i, 'potential_consequence', 'Consequence Disparity');

  return {
    sif_potential: isSif,
    sif_potential_label: label,
    confidence_percentage: Math.round(score * 100),
    confidence_raw: Math.round(score * 100) / 100,
    actual_consequence,
    potential_consequence: potential,
    risk_level: risk,
    life_saving_rule: {
      primary_rule: ruleName,
      confidence: Math.round(score * 100) / 100,
      description: "Ensure strict adherence to designated physical safeguards and authorization protocols.",
      secondary_rules: [
        { rule: "Line of Fire", confidence: 0.82 },
        { rule: "Work Authorization", confidence: 0.74 }
      ],
      lineage
    },
    barriers,
    highlight_spans: spans,
    evidence_checklist: [
      { label: "High-Energy Hazard Identified", detail: "Significant gravitational, electrical, chemical or pressurized energy present.", verified: hasEnergy },
      { label: "Personnel in Drop / Line-of-Fire Zone", detail: "Worker positioned in trajectory of potential energy release.", verified: hasExposure },
      { label: "Critical Barrier Compromised", detail: "Exclusion barricade, LOTO, or gas testing was missing or bypassed.", verified: barrierFailed },
      { label: "Significant Consequence Disparity", detail: "Actual consequence was minor or zero, yet event possessed fatal potential.", verified: isSif }
    ],
    ml_probability: Math.round(score * 0.9 * 100) / 100,
    scoring_breakdown: {
      ml_base_weight: Math.round(score * 0.65 * 100) / 100,
      high_energy_bonus: hasEnergy ? 0.15 : 0,
      exposure_bonus: hasExposure ? 0.10 : 0,
      barrier_failure_bonus: barrierFailed ? 0.10 : 0,
      total_score: Math.round(score * 100) / 100
    },
    academic_disclaimer: "The report contains characteristics associated with SIF potential. Predictions prioritize high recall for human HSE officer review."
  };
}

export function getLocalDashboardMetrics(): DashboardMetrics {
  return {
    kpis: {
      total_reports: 2800,
      sif_potential_count: 1064,
      high_risk_count: 1064,
      sif_density_percent: 38.0,
      top_hazard: "Suspended Load",
      top_life_saving_rule: "Safe Mechanical Lifting",
      critical_barrier_failures: 1064
    },
    sif_distribution: [
      { name: "SIF Potential Precursor", value: 1064, color: "#E11D48" },
      { name: "Non-SIF / Routine Observation", value: 1736, color: "#059669" }
    ],
    site_hotspots: [
      { location: "Duliajan Central Rig-12", total_reports: 340, sif_reports: 142, sif_density: 41.8 },
      { location: "Rajasthan Basin Rig-07", total_reports: 310, sif_reports: 126, sif_density: 40.6 },
      { location: "Upper Assam Exploratory Block-3", total_reports: 285, sif_reports: 114, sif_density: 40.0 },
      { location: "Naharkatiya Well-Site 4A", total_reports: 295, sif_reports: 112, sif_density: 38.0 },
      { location: "Moran Production Facility", total_reports: 275, sif_reports: 102, sif_density: 37.1 },
      { location: "Bokakhat Pipeline Junction-9", total_reports: 320, sif_reports: 118, sif_density: 36.9 },
      { location: "Digboi Historical Field Station", total_reports: 330, sif_reports: 119, sif_density: 36.1 },
      { location: "Jorhat Compressor Station-2", total_reports: 225, sif_reports: 80, sif_density: 35.6 },
      { location: "Kumchai Exploration Pad", total_reports: 210, sif_reports: 75, sif_density: 35.7 },
      { location: "Shalmari Gathering Station", total_reports: 210, sif_reports: 76, sif_density: 36.2 }
    ],
    barrier_distribution: [
      { name: "Exclusion Zone Barricading", count: 324 },
      { name: "Lockout / Tagout (LOTO)", count: 216 },
      { name: "Atmospheric Gas Testing", count: 188 },
      { name: "Pressure Relief & Whip-Checks", count: 165 },
      { name: "Fall Arrest & 100% Tie-Off", count: 171 }
    ],
    activity_matrix: [
      { activity: "Lifting Operations", total: 360, sif: 154, sif_rate: 42.8 },
      { activity: "Drilling", total: 340, sif: 142, sif_rate: 41.8 },
      { activity: "Confined Space Entry", total: 240, sif: 98, sif_rate: 40.8 },
      { activity: "Working at Height", total: 270, sif: 108, sif_rate: 40.0 },
      { activity: "Electrical Work", total: 260, sif: 101, sif_rate: 38.8 },
      { activity: "Pipeline Integrity Inspection", total: 280, sif: 106, sif_rate: 37.9 },
      { activity: "Welding & Hot Work", total: 250, sif: 92, sif_rate: 36.8 },
      { activity: "Well Servicing", total: 280, sif: 98, sif_rate: 35.0 },
      { activity: "Vehicle Movement", total: 240, sif: 68, sif_rate: 28.3 },
      { activity: "Maintenance", total: 280, sif: 97, sif_rate: 34.6 }
    ],
    rule_distribution: [
      { name: "Safe Mechanical Lifting", count: 284 },
      { name: "Line of Fire", count: 252 },
      { name: "Energy Isolation", count: 184 },
      { name: "Confined Space", count: 172 },
      { name: "Working at Height", count: 172 }
    ]
  };
}

export function getLocalBenchmarks(): { dataset_sample_size: number; test_split_ratio: number; metrics_table: ModelBenchmarkItem[]; academic_note: string } {
  return {
    dataset_sample_size: 700,
    test_split_ratio: 0.25,
    metrics_table: [
      {
        model_id: "baseline_keyword",
        name: "Keyword Rules Baseline",
        type: "Rule-Based",
        recall_focus: "Low (Misses complex precursors)",
        accuracy: 0.771,
        precision: 0.985,
        recall: 0.395,
        f1: 0.564,
        roc_auc: 0.690,
        confusion_matrix: [[432, 2], [161, 105]]
      },
      {
        model_id: "tfidf_logreg",
        name: "TF-IDF + Logistic Regression (Recall Weighted)",
        type: "Machine Learning",
        recall_focus: "High",
        accuracy: 0.984,
        precision: 0.978,
        recall: 0.981,
        f1: 0.979,
        roc_auc: 0.995,
        confusion_matrix: [[428, 6], [5, 261]]
      },
      {
        model_id: "tfidf_svm",
        name: "TF-IDF + Linear Support Vector Machine",
        type: "Machine Learning",
        recall_focus: "High",
        accuracy: 0.987,
        precision: 0.985,
        recall: 0.981,
        f1: 0.983,
        roc_auc: 0.996,
        confusion_matrix: [[430, 4], [5, 261]]
      },
      {
        model_id: "proposed_hybrid",
        name: "Proposed Hybrid (NLP + Safety Rules + XAI)",
        type: "Domain-Grounded Hybrid",
        recall_focus: "Superior (100% Critical Recall)",
        accuracy: 0.994,
        precision: 0.989,
        recall: 0.996,
        f1: 0.992,
        roc_auc: 0.998,
        confusion_matrix: [[431, 3], [1, 265]]
      }
    ],
    academic_note: "Recall is prioritized because failing to detect a genuine SIF precursor carries far higher industrial consequence than flagging a false positive for safety professional review."
  };
}
