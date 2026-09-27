import React from 'react';
import { ConvergingRadar } from '../components/ConvergingRadar';

export const ConvergingPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-classic-border pb-4">
        <h2 className="font-serif text-2xl font-bold text-classic-black">
          Stage 4: Converging Precursors Weak-Signal Radar
        </h2>
        <p className="text-xs text-classic-slate mt-0.5">
          Detecting low-level disparate anomalies across time, shifts, and assets that collectively signal impending catastrophic failure
        </p>
      </div>

      <ConvergingRadar />
    </div>
  );
};
