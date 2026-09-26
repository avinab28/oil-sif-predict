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
    console.warn("Backend unavailable, using client-side safety engine:", err);
    return localEvaluateReport(narrative, actual_consequence);
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
    // Generate filtered slice from demo data
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
