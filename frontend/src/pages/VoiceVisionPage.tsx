import React, { useState } from 'react';
import { VoiceLogger } from '../components/VoiceLogger';
import { CCTVCorrelator } from '../components/CCTVCorrelator';

export const VoiceVisionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'voice' | 'vision'>('voice');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-classic-border pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-classic-black">
            Stage 2: Voice-to-Intelligence & CCTV Vision Correlator
          </h2>
          <p className="text-xs text-classic-slate mt-0.5">
            Vernacular audio reporting in Hinglish & Assamese combined with real-time CCTV hazard vs permit verification
          </p>
        </div>

        <div className="inline-flex rounded-lg border border-classic-border bg-white p-1">
          <button
            onClick={() => setActiveTab('voice')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'voice' ? 'bg-classic-wine text-white shadow-3d-sm' : 'text-classic-charcoal hover:text-classic-black'
            }`}
          >
            Multilingual Voice Logger
          </button>
          <button
            onClick={() => setActiveTab('vision')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'vision' ? 'bg-classic-wine text-white shadow-3d-sm' : 'text-classic-charcoal hover:text-classic-black'
            }`}
          >
            CCTV Vision Correlator
          </button>
        </div>
      </div>

      {activeTab === 'voice' ? <VoiceLogger /> : <CCTVCorrelator />}
    </div>
  );
};
