import React from 'react';
import { ContractorScorecard } from '../components/ContractorScorecard';

export const ContractorPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-classic-border pb-4">
        <h2 className="font-serif text-2xl font-bold text-classic-black">
          Stage 6: HSE AI Prioritized Interventions & Contractor Scorecards
        </h2>
        <p className="text-xs text-classic-slate mt-0.5">
          Dynamic risk rankings for leadership intervention and objective contractor safety performance metrics
        </p>
      </div>

      <ContractorScorecard />
    </div>
  );
};
