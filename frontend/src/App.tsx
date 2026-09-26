import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AlertBanner } from './components/AlertBanner';
import { ExecutiveReportModal } from './components/ExecutiveReportModal';
import { HomePage } from './pages/HomePage';
import { AnalysisPage } from './pages/AnalysisPage';
import { DashboardPage } from './pages/DashboardPage';
import { DatasetPage } from './pages/DatasetPage';
import { ResearchPage } from './pages/ResearchPage';
import { checkBackendHealth, getDashboardData } from './services/api';
import { DashboardMetrics } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [demoMode, setDemoMode] = useState<boolean>(true);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [inspectedSample, setInspectedSample] = useState<{ narrative: string; actual: string } | null>(null);

  useEffect(() => {
    checkBackendHealth().then(status => setIsBackendConnected(status));
    getDashboardData().then(d => setMetrics(d));
  }, []);

  const handleSelectSampleAndNavigate = (narrative: string, actual: string) => {
    setInspectedSample({ narrative, actual });
    setActiveTab('engine');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
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
      <main className="flex-1 pt-6">
        {activeTab === 'overview' && (
          <HomePage
            onNavigate={(tab) => setActiveTab(tab)}
            onSelectSample={handleSelectSampleAndNavigate}
          />
        )}
        {activeTab === 'engine' && (
          <AnalysisPage
            initialNarrative={inspectedSample?.narrative}
            initialActual={inspectedSample?.actual}
          />
        )}
        {activeTab === 'dashboard' && <DashboardPage />}
        {activeTab === 'dataset' && (
          <DatasetPage
            onInspectInEngine={handleSelectSampleAndNavigate}
          />
        )}
        {activeTab === 'research' && <ResearchPage />}
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
