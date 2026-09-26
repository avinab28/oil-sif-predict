export interface HighlightSpan {
  start: number;
  end: number;
  text: string;
  type: 'high_energy' | 'exposure' | 'barrier_failure' | 'unsafe_event' | 'potential_consequence';
  label: string;
}

export interface BarrierEvidence {
  barrier: string;
  category: string;
  status: 'FAILED' | 'AT RISK' | 'EFFECTIVE' | 'MISSING' | 'BYPASSED';
  evidence: string;
}

export interface LifeSavingRuleResult {
  primary_rule: string;
  confidence: number;
  description: string;
  secondary_rules: Array<{ rule: string; confidence: number }>;
  lineage: string[];
}

export interface AnalysisResponse {
  sif_potential: boolean;
  sif_potential_label: 'HIGH' | 'MEDIUM' | 'LOW';
  confidence_percentage: number;
  confidence_raw: number;
  actual_consequence: string;
  potential_consequence: string;
  risk_level: 'Critical' | 'High' | 'Medium' | 'Low';
  life_saving_rule: LifeSavingRuleResult;
  barriers: BarrierEvidence[];
  highlight_spans: HighlightSpan[];
  evidence_checklist: Array<{
    label: string;
    detail: string;
    verified: boolean;
  }>;
  ml_probability: number;
  scoring_breakdown: {
    ml_base_weight: number;
    high_energy_bonus: number;
    exposure_bonus: number;
    barrier_failure_bonus: number;
    total_score: number;
  };
  academic_disclaimer: string;
}

export interface ReportItem {
  report_id: string;
  date: string;
  location: string;
  activity: string;
  report_type: string;
  narrative: string;
  actual_consequence: string;
  potential_consequence: string;
  hazard_type: string;
  barrier_type: string;
  barrier_status: string;
  life_saving_rule: string;
  sif_potential: boolean;
  sif_confidence: number;
  risk_level: string;
  source: string;
}

export interface DashboardMetrics {
  kpis: {
    total_reports: number;
    sif_potential_count: number;
    high_risk_count: number;
    sif_density_percent: number;
    top_hazard: string;
    top_life_saving_rule: string;
    critical_barrier_failures: number;
  };
  sif_distribution: Array<{ name: string; value: number; color: string }>;
  site_hotspots: Array<{
    location: string;
    total_reports: number;
    sif_reports: number;
    sif_density: number;
  }>;
  barrier_distribution: Array<{ name: string; count: number }>;
  activity_matrix: Array<{
    activity: string;
    total: number;
    sif: number;
    sif_rate: number;
  }>;
  rule_distribution: Array<{ name: string; count: number }>;
}

export interface ModelBenchmarkItem {
  model_id: string;
  name: string;
  type: string;
  recall_focus: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  roc_auc: number;
  confusion_matrix: number[][];
}
