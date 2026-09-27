import React from 'react';
import { Card3D } from '../components/Card3D';

interface StageProps {
  number: number;
  stageName: string;
  tagline: string;
  tools: string[];
  description: string;
  highlightColor: string;
  actionTab: string;
  onNavigate: (tab: string) => void;
}

const StageCard: React.FC<StageProps> = ({
  number,
  stageName,
  tagline,
  tools,
  description,
  highlightColor,
  actionTab,
  onNavigate
}) => {
  return (
    <Card3D className="p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm flex flex-col justify-between hover:border-classic-wine transition-all">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-classic-black text-white">
            STAGE 0{number}
          </span>
          <span className="text-[11px] font-mono text-classic-wine uppercase font-bold tracking-wider">
            {tagline}
          </span>
        </div>

        <h3 className="font-serif font-bold text-classic-black text-lg mb-2">{stageName}</h3>
        <p className="text-xs text-classic-charcoal/80 mb-4 leading-relaxed font-sans">{description}</p>

        <div className="mb-4">
          <span className="text-[10px] font-mono text-classic-slate uppercase block mb-1.5 font-bold">
            Integrated AI Modules:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {tools.map((t, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 bg-classic-ivory border border-classic-border rounded text-classic-charcoal font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onNavigate(actionTab)}
        className="w-full py-2 bg-classic-ivory hover:bg-classic-wine hover:text-white border border-classic-border text-classic-charcoal rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-3d-sm"
      >
        <span>Open Operational Module</span>
        <span>&rarr;</span>
      </button>
    </Card3D>
  );
};

export const LifecyclePage: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const STAGES = [
    {
      number: 1,
      stageName: "BEFORE WORK: Smart PTW & SOP Compliance",
      tagline: "Proactive Gatekeeping",
      description: "Converts static safety requirements into real-time barrier verifications. Flags missing Lockout/Tagout, gas testing, and runs spatial SIMOPS collision analysis across permits.",
      tools: ["Smart PTW Compliance Auditor", "Dynamic Checklist Generator", "Spatial SIMOPS Matrix"],
      highlightColor: "wine",
      actionTab: "ptw"
    },
    {
      number: 2,
      stageName: "DURING WORK: Multilingual Voice & Vision",
      tagline: "Frontline Telemetry",
      description: "Eliminates reporting friction for ground crews. Captures spoken audio observations in Hinglish, Hindi, and Assamese, while cross-correlating CCTV computer vision with active permits.",
      tools: ["Hinglish/Assamese Voice Logger", "Audio Waveform Parser", "CCTV Permit Vision Correlator"],
      highlightColor: "wine",
      actionTab: "voice"
    },
    {
      number: 3,
      stageName: "AFTER OBSERVATION: SIF Intelligence & Causal Chain",
      tagline: "Root-Cause Dissection",
      description: "Classifies high-potential events regardless of zero actual injury. Simulates counterfactual What-If branches and maps 3D mechanical causal failure chains.",
      tools: ["DeepSeek-R1 / RoBERTa SIF NLP", "What-If Counterfactual Sandbox", "3D Interactive Causal Chain"],
      highlightColor: "wine",
      actionTab: "engine"
    },
    {
      number: 4,
      stageName: "ACROSS TIME: Weak-Signal Convergence Radar",
      tagline: "Temporal Foresight",
      description: "Correlates minor sub-threshold anomalies over days or shifts (e.g. minor pit bubbling + slight choke hissing) to detect impending catastrophic blowout escalations.",
      tools: ["Multi-Signal Weak Aggregator", "Risk Escalation Multiplier", "Temporal Horizon Predictor"],
      highlightColor: "wine",
      actionTab: "converging"
    },
    {
      number: 5,
      stageName: "ACROSS SITES: Safety Knowledge Graph",
      tagline: "Enterprise Memory",
      description: "A connected enterprise graph linking Assets, Activities, Hazards, Barriers, and Life-Saving Rules. Identifies systemic recurring failure patterns across Assam & Rajasthan fields.",
      tools: ["3D Safety Knowledge Graph", "Cross-Site Pattern Recognizer", "Barrier Failure Ontology"],
      highlightColor: "wine",
      actionTab: "graph"
    },
    {
      number: 6,
      stageName: "HSE ACTION: AI Prioritized Interventions",
      tagline: "Targeted Leadership",
      description: "Ranks high-risk operational assets algorithmically to schedule urgent HSE leadership inspections, paired with granular contractor safety risk scorecards.",
      tools: ["Priority Queue Algorithm", "Contractor Risk Index", "Golden Rule Adherence Matrix"],
      highlightColor: "wine",
      actionTab: "contractor"
    },
    {
      number: 7,
      stageName: "LEARNING: Validated Safety Memory & AI Interrogation",
      tagline: "Continuous Evolution",
      description: "Retains institutional memory of past high-potential events, automatically surfacing historical precedents and guiding safety officers through structured root-cause questioning.",
      tools: ["Historical Vector Retrieval", "Root-Cause Interrogation Assistant", "Audit-Ready Incident Briefs"],
      highlightColor: "wine",
      actionTab: "engine"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-8 bg-classic-black text-white rounded-2xl shadow-3d-md border border-classic-slate">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-classic-wine text-white text-xs font-mono font-bold uppercase mb-4">
            <span>Oil India Limited &bull; Smart Safety Ecosystem</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-3 text-white">
            The 7-Stage End-to-End Operational Safety Lifecycle
          </h1>
          <p className="text-sm text-classic-warmgray leading-relaxed font-sans">
            Moving beyond reactive lagging metrics. OIL SIF-PREDICT establishes an unbroken continuous intelligence loop — from pre-job permit issuance to frontline multilingual voice reporting, weak-signal temporal escalation, and enterprise-wide knowledge graph learning.
          </p>
        </div>

        {/* Lifecycle Flow Ribbon */}
        <div className="mt-8 pt-6 border-t border-classic-slate/50 grid grid-cols-2 md:grid-cols-7 gap-2 text-center">
          {STAGES.map((s, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(s.actionTab)}
              className="p-2.5 rounded-lg bg-classic-black/70 hover:bg-classic-wine transition-all border border-classic-slate/30 group text-left md:text-center"
            >
              <div className="text-[10px] font-mono font-bold text-classic-wineLight group-hover:text-white">
                0{s.number}
              </div>
              <div className="text-[11px] font-bold text-white mt-0.5 line-clamp-1">
                {s.tagline}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 7 Stage Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STAGES.map((s, idx) => (
          <StageCard key={idx} {...s} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
};
