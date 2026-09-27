import React from 'react';
import { ShieldAlert, Activity, Database, BookOpen, Layers, Sparkles, Radio, Network, Users, FileCheck2, Mic } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  onOpenReportModal: () => void;
  isBackendConnected: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  demoMode,
  setDemoMode,
  onOpenReportModal,
  isBackendConnected
}) => {
  const lifecycleItems = [
    { id: 'lifecycle', label: '7-Stage Lifecycle', icon: Layers, highlight: true },
    { id: 'ptw', label: '1. Smart PTW', icon: FileCheck2 },
    { id: 'voice', label: '2. Voice & CCTV', icon: Mic },
    { id: 'engine', label: '3. SIF AI & What-If', icon: ShieldAlert },
    { id: 'converging', label: '4. Converging Radar', icon: Radio },
    { id: 'graph', label: '5. 3D Knowledge Graph', icon: Network },
    { id: 'contractor', label: '6. HSE & Contractors', icon: Users },
  ];

  const analyticsItems = [
    { id: 'dashboard', label: 'Analytics', icon: Activity },
    { id: 'dataset', label: 'OIL Dataset', icon: Database },
    { id: 'solution', label: 'Architecture', icon: Sparkles },
    { id: 'research', label: 'Research', icon: BookOpen }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF9]/95 backdrop-blur border-b border-[#E7E5E4] shadow-xs">
      {/* Top executive status ribbon */}
      <div className="bg-[#0A0B0D] text-[#D6D3D1] text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center tracking-wide border-b border-black">
        <div className="flex items-center gap-2.5">
          <span className="inline-block w-2 h-2 rounded-full bg-[#5B1527] ring-2 ring-[#781D35]/50 animate-pulse" />
          <span className="font-serif font-bold text-white tracking-wider">OIL INDIA LIMITED &bull; SIF-PREDICT</span>
          <span className="text-white/30 hidden md:inline">|</span>
          <span className="text-[#A8A29E] hidden md:inline text-[11px] font-sans">
            AI/NLP Serious Injury & Fatality Precursor Detection Platform (SIH-2024/2025)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10">
            <span className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span className="text-[11px] font-mono text-[#D6D3D1]">
              {isBackendConnected ? 'FastAPI 14/14 Online' : 'Client AI Mode'}
            </span>
          </div>

          <button
            onClick={onOpenReportModal}
            className="px-2.5 py-0.5 rounded bg-[#5B1527] hover:bg-[#781D35] text-white font-mono text-[10px] font-bold tracking-wider transition-colors shadow-3d-sm"
          >
            EXECUTIVE BRIEF
          </button>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center py-2.5 gap-3">
          {/* Brand */}
          <div
            onClick={() => setActiveTab('lifecycle')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-[#5B1527] border border-[#781D35] flex items-center justify-center text-white shadow-3d-sm group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-serif font-bold tracking-tight text-[#0A0B0D] group-hover:text-[#5B1527] transition-colors">
                  OIL SIF-PREDICT
                </span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#5B1527] text-white">
                  7-STAGE PROTOTYPE
                </span>
              </div>
              <p className="text-[11px] text-[#78716C] tracking-tight font-medium">
                Research Solution &bull; Oil India Limited Operational Safety
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-wrap items-center gap-1 overflow-x-auto pb-1 lg:pb-0">
            {lifecycleItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#5B1527] text-white shadow-3d-sm font-bold'
                      : item.highlight
                      ? 'text-[#5B1527] bg-[#5B1527]/10 hover:bg-[#5B1527]/20 border border-[#5B1527]/30 font-bold'
                      : 'text-[#44403C] hover:text-[#0A0B0D] hover:bg-[#E7E5E4]/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="h-4 w-px bg-[#D6D3D1] mx-1 hidden xl:block" />

            {analyticsItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0A0B0D] text-white shadow-3d-sm font-bold'
                      : 'text-[#57534E] hover:text-[#0A0B0D] hover:bg-[#E7E5E4]/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
