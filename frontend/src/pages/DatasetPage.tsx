import React, { useState, useEffect } from 'react';
import { Database, Search, Filter, Download, Upload, Eye, X, Check, ShieldAlert } from 'lucide-react';
import { ReportItem } from '../types';
import { getReports } from '../services/api';

export const DatasetPage: React.FC<{ onInspectInEngine: (narrative: string, actual: string) => void }> = ({ onInspectInEngine }) => {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedActivity, setSelectedActivity] = useState<string>('All');
  const [selectedRule, setSelectedRule] = useState<string>('All');
  const [sifOnly, setSifOnly] = useState<boolean>(false);
  const [selectedModalReport, setSelectedModalReport] = useState<ReportItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchReports = async () => {
    setLoading(true);
    const res = await getReports(page, 15, {
      search,
      location: selectedLocation,
      activity: selectedActivity,
      rule: selectedRule,
      sifOnly
    });
    setReports(res.reports);
    setTotal(res.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, [page, selectedLocation, selectedActivity, selectedRule, sifOnly]);

  const handleDownloadCsv = () => {
    const headers = ["report_id", "date", "location", "activity", "narrative", "actual_consequence", "potential_consequence", "sif_potential", "sif_confidence", "life_saving_rule"];
    const rows = reports.map(r => [
      r.report_id,
      r.date,
      `"${r.location}"`,
      `"${r.activity}"`,
      `"${r.narrative.replace(/"/g, '""')}"`,
      `"${r.actual_consequence}"`,
      `"${r.potential_consequence}"`,
      r.sif_potential,
      r.sif_confidence,
      `"${r.life_saving_rule}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `OIL_SIF_Dataset_Export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-16">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
          Synthetic Exploration Repository
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
          Safety Incident Dataset Explorer
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Search, filter, and inspect 2,800+ realistic oilfield safety observation reports generated for SIF research.
        </p>
      </div>

      {/* Mandatory Dataset Origin Disclaimer Banner */}
      <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-700 flex items-center justify-between">
        <div>
          <strong>Dataset Source:</strong> Synthetic Research Benchmark (Calibrated for Oil &amp; Gas E&amp;P Operations). Not proprietary OIL internal data.
        </div>
        <button
          onClick={handleDownloadCsv}
          className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-50 text-slate-700 rounded border border-slate-300 font-semibold cursor-pointer text-xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search narrative text or report ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchReports()}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded bg-slate-50 text-slate-800"
            />
          </div>

          {/* Location */}
          <div>
            <select
              value={selectedLocation}
              onChange={(e) => { setSelectedLocation(e.target.value); setPage(1); }}
              className="w-full p-1.5 text-xs border border-slate-300 rounded bg-white text-slate-800"
            >
              <option value="All">All Locations</option>
              <option value="Duliajan Central Rig-12">Duliajan Central Rig-12</option>
              <option value="Digboi Historical Field Station">Digboi Field Station</option>
              <option value="Naharkatiya Well-Site 4A">Naharkatiya Well-Site 4A</option>
              <option value="Bokakhat Pipeline Junction-9">Bokakhat Pipeline Junction</option>
              <option value="Rajasthan Basin Rig-07">Rajasthan Basin Rig-07</option>
              <option value="Moran Production Facility">Moran Production Facility</option>
            </select>
          </div>

          {/* Activity */}
          <div>
            <select
              value={selectedActivity}
              onChange={(e) => { setSelectedActivity(e.target.value); setPage(1); }}
              className="w-full p-1.5 text-xs border border-slate-300 rounded bg-white text-slate-800"
            >
              <option value="All">All Activities</option>
              <option value="Lifting Operations">Lifting Operations</option>
              <option value="Drilling">Drilling</option>
              <option value="Confined Space Entry">Confined Space Entry</option>
              <option value="Electrical Work">Electrical Work</option>
              <option value="Working at Height">Working at Height</option>
              <option value="Pipeline Integrity Inspection">Pipeline Integrity</option>
            </select>
          </div>

          {/* SIF Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setSifOnly(!sifOnly); setPage(1); }}
              className={`w-full py-1.5 px-3 rounded text-xs font-bold border transition-colors cursor-pointer ${
                sifOnly
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {sifOnly ? 'SIF Only (Active)' : 'Show All Reports'}
            </button>
          </div>
        </div>
      </div>

      {/* Dataset Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 font-bold">Report ID</th>
                <th className="py-3 px-4 font-bold">Location</th>
                <th className="py-3 px-4 font-bold">Activity</th>
                <th className="py-3 px-4 font-bold">Narrative Excerpt</th>
                <th className="py-3 px-4 font-bold">Actual Consequence</th>
                <th className="py-3 px-4 font-bold">SIF Precursor</th>
                <th className="py-3 px-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900 whitespace-nowrap">
                    {r.report_id}
                  </td>
                  <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                    {r.location}
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap font-medium">
                    {r.activity}
                  </td>
                  <td className="py-3 px-4 max-w-md truncate text-slate-700 font-mono text-[11px]">
                    {r.narrative}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                      {r.actual_consequence}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      r.sif_potential
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {r.sif_potential ? 'SIF POTENTIAL' : 'ROUTINE'}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedModalReport(r)}
                        className="p-1 rounded hover:bg-slate-100 text-slate-600 cursor-pointer"
                        title="View Full Report Record"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onInspectInEngine(r.narrative, r.actual_consequence)}
                        className="text-[11px] font-bold text-amber-700 hover:text-amber-800 underline cursor-pointer"
                      >
                        Inspect
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-600">
          <div>
            Showing <strong>{reports.length}</strong> of <strong>{total}</strong> records
          </div>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 bg-white border border-slate-300 rounded font-semibold disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>
            <span className="px-3 py-1 font-mono">Page {page}</span>
            <button
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 bg-white border border-slate-300 rounded font-semibold cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Record Inspector Modal */}
      {selectedModalReport && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-2xl w-full p-6 space-y-4">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono text-slate-500 font-bold">RECORD DETAILS</span>
                <h3 className="text-base font-bold text-slate-900">{selectedModalReport.report_id}</h3>
              </div>
              <button onClick={() => setSelectedModalReport(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200 font-mono text-xs text-slate-800 leading-relaxed">
              "{selectedModalReport.narrative}"
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Location</div>
                <div className="font-semibold text-slate-900">{selectedModalReport.location}</div>
              </div>
              <div className="p-2.5 rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Activity</div>
                <div className="font-semibold text-slate-900">{selectedModalReport.activity}</div>
              </div>
              <div className="p-2.5 rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Actual Consequence</div>
                <div className="font-semibold text-slate-800">{selectedModalReport.actual_consequence}</div>
              </div>
              <div className="p-2.5 rounded border border-rose-200 bg-rose-50/50">
                <div className="text-[10px] text-rose-800 uppercase font-bold">Potential Consequence</div>
                <div className="font-semibold text-rose-900">{selectedModalReport.potential_consequence}</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => {
                  onInspectInEngine(selectedModalReport.narrative, selectedModalReport.actual_consequence);
                  setSelectedModalReport(null);
                }}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold cursor-pointer"
              >
                Inspect in AI/NLP Engine
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
