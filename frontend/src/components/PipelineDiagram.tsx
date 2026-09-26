import React, { useState } from 'react';
import { ArrowRight, FileText, Binary, Search, Zap, ShieldAlert, Cpu, Award, Eye, Check } from 'lucide-react';

export const PipelineDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      title: "1. Report Ingestion",
      short: "Narrative Input",
      icon: FileText,
      input: "Raw Unsafe Act (UA), Unsafe Condition (UC), Near-Miss Text",
      process: "Ingests unstructured oilfield incident reports with zero injury or minor consequences.",
      output: "Raw narrative string + operational metadata"
    },
    {
      title: "2. Preprocessing",
      short: "Normalization",
      icon: Binary,
      input: "Raw narrative containing field shorthand",
      process: "Normalizes text and expands oilfield acronyms: LOTO, PTW, SWL, BOP, H2S, ESD.",
      output: "Standardized token stream with preserved technical semantics"
    },
    {
      title: "3. Entity Extraction",
      short: "Safety Entities",
      icon: Search,
      input: "Cleaned narrative tokens",
      process: "Extracts Person, Equipment (crane, pipe, valve), Stored Energy, Location, and Controls.",
      output: "Classified safety entities and spatial-operational context"
    },
    {
      title: "4. High-Energy Detection",
      short: "Hazard Energy",
      icon: Zap,
      input: "Extracted entities & physical parameters",
      process: "Evaluates threshold energy: suspended mass (>300kg), pressure (>500 PSI), high voltage (>415V), H2S toxic gas.",
      output: "High-Energy Hazard verification signal"
    },
    {
      title: "5. Barrier Failure Analysis",
      short: "Barriers Check",
      icon: ShieldAlert,
      input: "Physical & administrative control references",
      process: "Scans state of exclusion zones, LOTO padlocks, gas detectors, harness tie-offs, and relief valves.",
      output: "Barrier Status matrix: FAILED / AT RISK / EFFECTIVE + textual quote"
    },
    {
      title: "6. SIF Classification",
      short: "Hybrid SIF Logic",
      icon: Cpu,
      input: "Energy + Exposure + Barrier Failure + ML Classifier",
      process: "Computes calibrated SIF score fusing TF-IDF/ML probabilities with causal domain safety rules.",
      output: "SIF Potential: HIGH / MEDIUM / LOW (Calibrated Confidence %)"
    },
    {
      title: "7. IOGP Rule Mapping",
      short: "Life-Saving Rules",
      icon: Award,
      input: "Contextual narrative & hazard classification",
      process: "Maps incident to 10 IOGP Life-Saving Rules (Line of Fire, Safe Mechanical Lifting, Confined Space, etc.).",
      output: "Primary IOGP Rule + confidence score + diagnostic lineage flowchart"
    },
    {
      title: "8. Explainable AI & Analytics",
      short: "XAI & Dashboard",
      icon: Eye,
      input: "Multi-layered classification results",
      process: "Generates token-level span highlights, evidence checklist, and updates site precursor density analytics.",
      output: "Interactive visual evidence + executive briefing"
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 mb-5 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            End-to-End AI/NLP Research Pipeline Architecture
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any processing stage below to inspect its algorithmic logic, input data, and analytical output.
          </p>
        </div>
        <div className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 font-medium">
          8 Processing Layers · Grounded in IOGP
        </div>
      </div>

      {/* Horizontal Steps Diagram */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-6">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          const isSelected = activeStep === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-500/30'
                  : 'bg-slate-50/70 hover:bg-slate-100/80 border-slate-200/80 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-7 h-7 rounded flex items-center justify-center ${
                  isSelected ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-white text-slate-700 border border-slate-200'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className={`text-[10px] font-mono font-semibold ${isSelected ? 'text-amber-400' : 'text-slate-600'}`}>
                  0{idx + 1}
                </span>
              </div>
              <div className="font-bold text-xs leading-snug line-clamp-1">{st.short}</div>
              <div className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                {st.title.split('. ')[1]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Step Inspector Card */}
      <div className="bg-slate-50 rounded-lg border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-[11px] font-bold border border-amber-200">
            Stage {activeStep + 1} of 8
          </span>
          <h4 className="text-sm font-bold text-slate-900">
            {steps[activeStep].title}
          </h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-white p-3.5 rounded border border-slate-200">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 mb-1">
              Input
            </div>
            <p className="text-slate-800 font-medium">
              {steps[activeStep].input}
            </p>
          </div>
          
          <div className="bg-white p-3.5 rounded border border-slate-200">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 mb-1">
              Methodology / Processing
            </div>
            <p className="text-slate-800">
              {steps[activeStep].process}
            </p>
          </div>
          
          <div className="bg-white p-3.5 rounded border border-slate-200">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 mb-1">
              Output Delivered
            </div>
            <p className="text-slate-900 font-semibold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              {steps[activeStep].output}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
