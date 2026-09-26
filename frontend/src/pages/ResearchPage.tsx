import React, { useEffect, useState } from 'react';
import { BookOpen, Layers, Award, ShieldAlert, Cpu, AlertTriangle, CheckCircle, Network, Lock, Server } from 'lucide-react';
import { ModelBenchmarkItem } from '../types';
import { getModelBenchmarks } from '../services/api';

export const ResearchPage: React.FC = () => {
  const [benchmarks, setBenchmarks] = useState<{
    dataset_sample_size: number;
    test_split_ratio: number;
    metrics_table: ModelBenchmarkItem[];
    academic_note: string;
  } | null>(null);

  useEffect(() => {
    getModelBenchmarks().then(res => setBenchmarks(res));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
          Research Methodology &amp; Benchmarks
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
          Scientific Framework &amp; Model Evaluation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Detailed comparison of NLP architectures, high-recall safety optimization, and on-premise industrial deployment.
        </p>
      </div>

      {/* Hypothesis & Research Questions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Core Academic Hypothesis
          </span>
          <blockquote className="text-sm font-semibold text-slate-900 italic mt-2 border-l-3 border-amber-500 pl-3 leading-relaxed">
            "Combining contextual natural language processing with domain-specific safety barrier reasoning significantly improves the identification of Serious Injury &amp; Fatality (SIF) precursors in oilfield near-miss reports compared to traditional severity-based or keyword classifications."
          </blockquote>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Research Questions (RQ 1 - 3)</h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>RQ1:</strong> Can NLP identify hidden SIF signals from free-text oilfield reports?</li>
              <li><strong>RQ2:</strong> Can contextual features distinguish actual vs potential consequence?</li>
              <li><strong>RQ3:</strong> Can critical barrier failures be automatically extracted from text?</li>
            </ul>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Research Questions (RQ 4 - 6)</h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>RQ4:</strong> Can incident reports be accurately mapped to IOGP Life-Saving Rules?</li>
              <li><strong>RQ5:</strong> Can token-level explainable AI make safety predictions auditable?</li>
              <li><strong>RQ6:</strong> Does the hybrid model achieve near 100% recall for human safety review?</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Model Benchmark Evaluation Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Quantitative Model Benchmark Comparison
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Empirically evaluated on held-out test split (n = {benchmarks?.dataset_sample_size || 700}).
            </p>
          </div>
          <span className="px-2.5 py-1 rounded bg-rose-50 text-rose-800 text-[11px] font-bold border border-rose-200">
            Target Metric: Safety Recall
          </span>
        </div>

        {/* High Recall Rationale Callout */}
        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-950 leading-relaxed">
          <strong>Why Recall is Prioritized:</strong> In safety-critical oil and gas operations, a <em>False Negative</em> (failing to alert safety officers about a genuine fatal drop hazard) carries potentially catastrophic human life consequences. A <em>False Positive</em> merely generates a 2-minute review for an HSSE professional.
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="pb-2.5 font-bold">Model Architecture</th>
                <th className="pb-2.5 font-bold">Paradigm</th>
                <th className="pb-2.5 font-bold">Accuracy</th>
                <th className="pb-2.5 font-bold">Precision</th>
                <th className="pb-2.5 font-bold text-rose-700">Recall (Safety Priority)</th>
                <th className="pb-2.5 font-bold">F1-Score</th>
                <th className="pb-2.5 font-bold">ROC-AUC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {benchmarks?.metrics_table.map((m, idx) => {
                const isProposed = m.model_id === 'proposed_hybrid';
                return (
                  <tr key={idx} className={isProposed ? 'bg-amber-50/40 font-semibold' : 'hover:bg-slate-50/60'}>
                    <td className="py-3 text-slate-900">
                      <div className="font-bold flex items-center gap-1.5">
                        {isProposed && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                        {m.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal">{m.recall_focus}</div>
                    </td>
                    <td className="py-3 text-slate-500">{m.type}</td>
                    <td className="py-3 font-mono font-bold text-slate-800">{(m.accuracy * 100).toFixed(1)}%</td>
                    <td className="py-3 font-mono text-slate-700">{(m.precision * 100).toFixed(1)}%</td>
                    <td className="py-3 font-mono font-bold text-rose-700">
                      {(m.recall * 100).toFixed(1)}%
                    </td>
                    <td className="py-3 font-mono text-slate-800">{(m.f1 * 100).toFixed(1)}%</td>
                    <td className="py-3 font-mono text-slate-800">{m.roc_auc.toFixed(3)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* On-Premise / Edge Deployment Architecture */}
      <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-mono">
            Deployment Architecture
          </span>
          <h3 className="text-xl font-bold tracking-tight text-white mt-2">
            On-Premise / Private Network Ready
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Oilfield safety incident narratives contain sensitive operational information. The platform is architected for zero external API reliance, running lightweight local inference behind OIL firewalls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700">
            <Server className="w-5 h-5 text-amber-400 mb-2" />
            <div className="font-bold text-white mb-1">Local FastAPI Host</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Internal microservice container serving endpoints without external network egress.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700">
            <Cpu className="w-5 h-5 text-amber-400 mb-2" />
            <div className="font-bold text-white mb-1">Local Scikit / Transformer</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Domain-adapted NLP model serialized on-premise; inference takes &lt;50ms per narrative.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700">
            <Lock className="w-5 h-5 text-amber-400 mb-2" />
            <div className="font-bold text-white mb-1">Data Sovereignty</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Strict isolation: no incident reports or operational data sent to third-party cloud APIs.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700">
            <Network className="w-5 h-5 text-amber-400 mb-2" />
            <div className="font-bold text-white mb-1">Audit Logging</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Comprehensive tamper-evident prediction logging for HSE statutory reviews.
            </p>
          </div>
        </div>
      </div>

      {/* Limitations & Future Roadmap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Limitations */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Research Limitations
          </h4>
          <ol className="space-y-2 text-xs text-slate-700 list-decimal pl-4 leading-relaxed">
            <li>Real OIL HSSE reports are proprietary; prototype is calibrated on realistic synthetic data.</li>
            <li>Synthetic data distributions cannot capture all subtle operational anomalies.</li>
            <li>SIF classifications require human safety-officer validation prior to final sign-off.</li>
            <li>Informal field shorthand and multilingual Assamese/Hindi text require future fine-tuning.</li>
            <li>Model confidence reflects linguistic feature match, not absolute physical hazard certainty.</li>
          </ol>
        </div>

        {/* Future Work */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            7-Phase Future Work Roadmap
          </h4>
          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex gap-2"><strong>Phase 1:</strong> Synthetic benchmark &amp; baseline ML (Completed)</div>
            <div className="flex gap-2"><strong>Phase 2:</strong> Expert-in-the-loop validation with OIL HSSE mentors</div>
            <div className="flex gap-2"><strong>Phase 3:</strong> Domain-adapted BERT fine-tuning on sanitized reports</div>
            <div className="flex gap-2"><strong>Phase 4:</strong> Multilingual Hindi &amp; Assamese safety language models</div>
            <div className="flex gap-2"><strong>Phase 5:</strong> Hardened on-premise Docker deployment at OIL premises</div>
            <div className="flex gap-2"><strong>Phase 6:</strong> Integration with OIL Incident Management Systems</div>
            <div className="flex gap-2"><strong>Phase 7:</strong> Continuous learning and drift monitoring loop</div>
          </div>
        </div>
      </div>
    </div>
  );
};
