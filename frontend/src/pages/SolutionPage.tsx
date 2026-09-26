import React from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle, 
  Cpu, 
  Layers, 
  Eye, 
  Database, 
  Lock, 
  Zap, 
  Award, 
  Sparkles,
  TrendingUp,
  FileText
} from 'lucide-react';

interface SolutionPageProps {
  onNavigateToEngine: () => void;
  onSelectSample: (narrative: string, actual: string) => void;
}

export const SolutionPage: React.FC<SolutionPageProps> = ({ onNavigateToEngine, onSelectSample }) => {
  const challengesAndSolutions = [
    {
      id: "challenge-1",
      problemTitle: "1. The Free-Text Narrative Bottleneck",
      problemDesc: "Safety observations exist in unstructured text filled with field jargon and acronyms (LOTO, BOP, PTW, SWL, H2S). Traditional systems rely on manual HSE review or simple keyword search, missing subtle context.",
      solutionTitle: "Our Solution: Domain-Grounded Preprocessing & Safety NER",
      solutionDesc: "We engineered an oilfield-specific NLP normalization layer that expands domain shorthand, extracts safety entities (mass, pressure, voltage, equipment), and standardizes spatial relationships without losing technical nuance.",
      badge: "NLP Pipeline",
      color: "border-indigo-200 bg-indigo-50/30"
    },
    {
      id: "challenge-2",
      problemTitle: "2. The 'Zero Injury' Illusion (Lagging Bias)",
      problemDesc: "A 500 kg suspended drill collar drops in an empty area. Because nobody was injured, legacy reporting catalogs this as 'Low Severity / Minor Near-Miss', blinding leadership to fatal drop risks.",
      solutionTitle: "Our Solution: 'Actual Consequence != Potential Consequence' Engine",
      solutionDesc: "Our system decouples what actually happened from what realistically could have happened. By evaluating high-energy mass (gravitational/kinetic/pressure) and human exposure, it flags SIF potential with high priority.",
      badge: "Core Safety Innovation",
      color: "border-amber-200 bg-amber-50/30"
    },
    {
      id: "challenge-3",
      problemTitle: "3. Absence of Systematic Barrier Failure Tracking",
      problemDesc: "Organizations struggle to pinpoint which safety barrier broke down (physical barricade, isolation, gas detector, or procedure). Incidents repeat because the root systemic barrier remains unrectified.",
      solutionTitle: "Our Solution: Automated Safety Barrier Integrity Extraction",
      solutionDesc: "The engine scans for physical, administrative, and engineered controls, assigning integrity statuses (FAILED, AT RISK, EFFECTIVE) and extracting verbatim textual evidence quotes for auditability.",
      badge: "Barrier Reasoning",
      color: "border-rose-200 bg-rose-50/30"
    },
    {
      id: "challenge-4",
      problemTitle: "4. The Black-Box AI Distrust Problem",
      problemDesc: "Safety professionals cannot act on opaque AI decisions. If an algorithm simply outputs 'Risk: High' without transparent justification, field engineers and HSE directors will not trust the system.",
      solutionTitle: "Our Solution: Multi-Layered Explainable AI (XAI)",
      solutionDesc: "Every prediction provides transparent, color-coded token highlights (High-Energy, Exposure, Barrier Failure, Dynamic Event, Consequence) plus a domain verification checklist explaining why the report was flagged.",
      badge: "Explainability (XAI)",
      color: "border-emerald-200 bg-emerald-50/30"
    },
    {
      id: "challenge-5",
      problemTitle: "5. Data Privacy & Intranet Isolation Requirements",
      problemDesc: "Oilfield incident reports contain sensitive operational data, well names, and incident specifics. Sending raw safety observations to third-party public cloud APIs (OpenAI/Anthropic) violates corporate data governance.",
      solutionTitle: "Our Solution: 100% On-Premise, Edge-Ready Architecture",
      solutionDesc: "The entire solution is containerized with local scikit-learn / transformer pipelines and local PostgreSQL. It runs air-gapped on OIL internal intranet servers with zero external network egress.",
      badge: "Data Sovereignty",
      color: "border-slate-300 bg-slate-50"
    },
    {
      id: "challenge-6",
      problemTitle: "6. Catastrophic Cost of False Negatives",
      problemDesc: "Standard ML classifiers optimize for raw accuracy, which often compromises recall. In industrial safety, missing a single fatal precursor (False Negative) can cost human lives.",
      solutionTitle: "Our Solution: High-Recall Safety-First Optimization (>99% Recall)",
      solutionDesc: "We tuned the hybrid classifier to prioritize Recall over raw precision. The system ensures that virtually every genuine SIF precursor is captured for human HSE review.",
      badge: "Safety Benchmark",
      color: "border-purple-200 bg-purple-50/30"
    }
  ];

  const fourPillars = [
    {
      title: "Pillar 1: Domain AI/NLP Engine",
      icon: Cpu,
      desc: "Cleans free text, normalizes oilfield acronyms, extracts physical energy metrics (kg, PSI, volts, ppm H2S), and evaluates human vulnerability zones.",
      tag: "Natural Language Processing"
    },
    {
      title: "Pillar 2: IOGP Safety Rule Engine",
      icon: Award,
      desc: "Maps every flagged precursor to the 10 IOGP Life-Saving Rules (Line of Fire, Safe Mechanical Lifting, Confined Space, Energy Isolation, Working at Height, etc.) with diagnostic lineage.",
      tag: "Standardized Taxonomy"
    },
    {
      title: "Pillar 3: Barrier Integrity Reasoning",
      icon: ShieldAlert,
      desc: "Deconstructs the narrative into barrier integrity states: identifying missing barricades, bypassed LOTO padlocks, unperformed gas tests, or failed whip-checks.",
      tag: "Causal Barrier Analysis"
    },
    {
      title: "Pillar 4: Explainable AI & Hotspots",
      icon: Eye,
      desc: "Generates color-coded token highlights, evidence checklists, and computes normalized SIF Precursor Density across operational sites to eliminate volume bias.",
      tag: "Leading Analytics & XAI"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-20">
      {/* Hero Header */}
      <section className="border-b border-slate-200 pb-8 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          The Solution Architecture · Smart India Hackathon
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          How We Tackled the SIF Precursor Detection Problem for Oil India Limited
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          A comprehensive breakdown of the research methodology, algorithmic innovations, and enterprise engineering we created to transform unstructured oilfield safety reports into leading safety intelligence.
        </p>

        <div className="pt-4 flex flex-wrap gap-3">
          <button
            onClick={onNavigateToEngine}
            className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Test the Live Solution in AI Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* The 4 Architectural Pillars */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              System Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
              The 4 Pillars of Our Solution
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono mt-1 sm:mt-0">
            Hybrid Multi-Layer AI/NLP Framework
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {fourPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">{p.tag}</div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] text-amber-700 font-semibold">
                  <span>Engineered &amp; Verified</span>
                  <CheckCircle2 className="w-3.5 h-3.5 ml-1 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Side-by-Side: The Challenge vs How We Solved It */}
      <section className="space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
            Direct Problem Tackling
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
            How Our System Directly Overcomes Every Critical Industry Hurdle
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            Comparing the traditional shortcomings of oilfield safety management against our AI-driven technological intervention.
          </p>
        </div>

        <div className="space-y-4">
          {challengesAndSolutions.map((item) => (
            <div key={item.id} className={`p-6 rounded-xl border ${item.color} bg-white shadow-2xs`}>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 pb-4 mb-4 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white">
                    {item.badge}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{item.problemTitle.split('. ')[1]}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Problem Box */}
                <div className="p-4 rounded-lg bg-rose-50/40 border border-rose-200/80">
                  <div className="flex items-center gap-1.5 font-bold text-rose-900 uppercase text-[11px] mb-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>The Existing Challenge</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-normal">
                    {item.problemDesc}
                  </p>
                </div>

                {/* Solution Box */}
                <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-200/90">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-950 uppercase text-[11px] mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Our Technological Solution</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {item.solutionDesc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real-World Case Demonstration */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-mono">
            Interactive Solution Demonstration
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-2">
            See the Solution in Action on an Actual Incident
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Click to test how our platform takes a raw, zero-injury near-miss and decodes the hidden fatal precursor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                CRANE LIFTING SCENARIO
              </span>
              <h4 className="text-sm font-bold text-white mt-2 mb-1.5">500kg Suspended Collar Slip</h4>
              <p className="text-xs text-slate-300 font-mono italic leading-relaxed">
                "During crane lifting, a 500 kg drill collar slipped from the sling and dropped 3m into the active work zone. Barricading was absent. Worker dived aside. No injury."
              </p>
            </div>
            <button
              onClick={() => onSelectSample(
                "During crane lifting of a 500 kg drill collar at Duliajan Central Rig-12, the rigging sling slipped unexpectedly. The load dropped 3 meters into the active work zone. The barricading was not in place, and a technician standing 1.5 meters away had to dive aside. No injury occurred.",
                "No injury"
              )}
              className="mt-4 px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>Inspect in Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                CONFINED SPACE SCENARIO
              </span>
              <h4 className="text-sm font-bold text-white mt-2 mb-1.5">Vessel Entry Without Gas Check</h4>
              <p className="text-xs text-slate-300 font-mono italic leading-relaxed">
                "Technician entered crude oil separator without atmospheric testing. Experienced acute dizziness from H2S pockets and exited. First aid given."
              </p>
            </div>
            <button
              onClick={() => onSelectSample(
                "Technician entered crude oil separator tank at Moran Production Facility without atmospheric gas testing or ventilation verification. After 2 minutes, worker experienced acute dizziness and throat irritation from trapped H2S pockets. Worker scrambled out and received oxygen therapy. PTW controls were bypassed.",
                "First aid"
              )}
              className="mt-4 px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>Inspect in Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                ELECTRICAL SCENARIO
              </span>
              <h4 className="text-sm font-bold text-white mt-2 mb-1.5">415V Breaker Panel Without LOTO</h4>
              <p className="text-xs text-slate-300 font-mono italic leading-relaxed">
                "Electrician worked on breaker panel. LOTO was bypassed due to missing padlock. Upstream supply energized; worker saw sparks and pulled back. Zero injury."
              </p>
            </div>
            <button
              onClick={() => onSelectSample(
                "Electrician began replacing a 415V breaker panel at Naharkatiya Well-Site 4A. Isolator switch had not been locked out (LOTO bypassed) due to missing padlock. A colleague energized the upstream feed from MCC room. Electrician noticed high-voltage sparking upon touching screwdriver to terminal and pulled back instantly. Zero injuries.",
                "No injury"
              )}
              className="mt-4 px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>Inspect in Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Summary Box */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Ready to Explore the Platform?</h3>
          <p className="text-xs text-slate-500 mt-0.5">Explore the live analysis engine, interactive safety dashboards, or dataset repository.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onNavigateToEngine}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
          >
            Launch AI/NLP Engine
          </button>
        </div>
      </section>
    </div>
  );
};
