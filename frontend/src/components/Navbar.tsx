import React from 'react';
import { ShieldAlert, Activity, Database, FileText, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

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
  const navItems = [
    { id: 'overview', label: 'Pipeline & Overview', icon: Layers },
    { id: 'engine', label: 'AI/NLP Engine', icon: ShieldAlert },
    { id: 'dashboard', label: 'Safety Analytics', icon: Activity },
    { id: 'dataset', label: 'Dataset Explorer', icon: Database },
    { id: 'research', label: 'Research & Evaluation', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      {/* Top micro-bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1 px-4 sm:px-8 flex justify-between items-center tracking-wide">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="font-medium text-white">Smart India Hackathon Prototype</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300 hidden sm:inline">Research Initiative for Oil India Limited (OIL)</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
            <span className="text-[11px] text-slate-300">
              {isBackendConnected ? 'FastAPI Backend Online' : 'Client-Side Engine Active'}
            </span>
          </div>
          <button 
            onClick={() => setDemoMode(!demoMode)}
            className="hover:text-amber-300 transition-colors text-[11px] font-medium flex items-center gap-1 cursor-pointer"
          >
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${demoMode ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
              DEMO MODE {demoMode ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('overview')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-600 via-orange-600 to-amber-500 flex items-center justify-center text-white shadow-sm ring-1 ring-amber-600/20 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-amber-700 transition-colors">
                  OIL SIF-PREDICT
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 tracking-tight font-medium">
                AI/NLP Precursor Detection Platform · Oil India Limited
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Header Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenReportModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Generate Briefing</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav strip */}
      <div className="md:hidden flex overflow-x-auto py-2 px-4 gap-2 border-t border-slate-200 bg-slate-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 rounded text-xs font-semibold cursor-pointer ${
                isActive ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
