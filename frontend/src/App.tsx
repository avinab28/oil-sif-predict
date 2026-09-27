import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AlertBanner } from './components/AlertBanner';
import { ExecutiveReportModal } from './components/ExecutiveReportModal';
import { HomePage } from './pages/HomePage';
import { SolutionPage } from './pages/SolutionPage';
import { DashboardPage } from './pages/DashboardPage';
import { DatasetPage } from './pages/DatasetPage';
import { ResearchPage } from './pages/ResearchPage';

// 7-Stage Lifecycle Pages
import { LifecyclePage } from './pages/LifecyclePage';
import { PTWPage } from './pages/PTWPage';
import { VoiceVisionPage } from './pages/VoiceVisionPage';
import { EnginePage } from './pages/EnginePage';
import { ConvergingPage } from './pages/ConvergingPage';
import { KnowledgeGraphPage } from './pages/KnowledgeGraphPage';
import { ContractorPage } from './pages/ContractorPage';

import { checkBackendHealth, getDashboardData } from './services/api';
import { DashboardMetrics } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('lifecycle');
  const [demoMode, setDemoMode] = useState<boolean>(true);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  useEffect(() => {
    checkBackendHealth().then(status => setIsBackendConnected(status));
    getDashboardData().then(d => setMetrics(d));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#0A0B0D] font-sans antialiased selection:bg-[#5B1527] selection:text-white">
      {/* Top Precursor Alert Ticker */}
      <AlertBanner onNavigateToEngine={() => setActiveTab('engine')} />

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        demoMode={demoMode}
        setDemoMode={setDemoMode}
        onOpenReportModal={() => setReportModalOpen(true)}
        isBackendConnected={isBackendConnected}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'lifecycle' && <LifecyclePage onNavigate={(tab) => setActiveTab(tab)} />}
        {activeTab === 'ptw' && <PTWPage />}
        {activeTab === 'voice' && <VoiceVisionPage />}
        {activeTab === 'engine' && <EnginePage />}
        {activeTab === 'converging' && <ConvergingPage />}
        {activeTab === 'graph' && <KnowledgeGraphPage />}
        {activeTab === 'contractor' && <ContractorPage />}
        {activeTab === 'dashboard' && <DashboardPage />}
        {activeTab === 'dataset' && <DatasetPage onInspectInEngine={() => setActiveTab('engine')} />}
        {activeTab === 'solution' && <SolutionPage onNavigateToEngine={() => setActiveTab('engine')} onSelectSample={() => setActiveTab('engine')} />}
        {activeTab === 'research' && <ResearchPage />}
        {activeTab === 'overview' && <HomePage onNavigate={(tab) => setActiveTab(tab)} onSelectSample={() => setActiveTab('engine')} />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Executive Report Modal */}
      {metrics && (
        <ExecutiveReportModal
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          metrics={metrics}
        />
      )}
    </div>
  );
};

export default App;
