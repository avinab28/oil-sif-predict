import React, { useState } from 'react';
import { processVoice, getFollowupQuestions } from '../services/api';
import { Card3D } from './Card3D';

const PRESET_AUDIO_TRANSCRIPTS = [
  {
    label: "Hinglish (Rig Floor Pressure Hose)",
    lang: "Hinglish",
    text: "Mud pump line me vibration bahut zyada ho raha tha aur whip-check cable missing thi. Crew pass me hi khada tha without barricading.",
    site: "Digboi Drilling Rig #07",
    role: "Roughneck Assistant"
  },
  {
    label: "Hindi (Confined Space Gas Check)",
    lang: "Hindi",
    text: "Crude storage tank number char me cleaning chal rahi thi lekin continuous gas detector fail ho gaya tha aur blower off tha.",
    site: "Duliajan Gathering Station",
    role: "Maintenance Technician"
  },
  {
    label: "Assamese (Flange Gas Leak & Grinding)",
    lang: "Assamese",
    text: "Gas compressor unit ot flange or pora gas leakage asil, kintu usorot grinding kam soli asil kono barrier nohoi.",
    site: "Moran Gas Compressor #02",
    role: "Pipeline Inspector"
  },
  {
    label: "English (Derrick Crane Hoist Sling)",
    lang: "English",
    text: "Heavy drill collar lifting sling was frayed with broken strands. Crane operator hoisted load directly over active doghouse.",
    site: "Naharkatiya Well #14",
    role: "Drilling Supervisor"
  }
];

export const VoiceLogger: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_AUDIO_TRANSCRIPTS[0]);
  const [transcript, setTranscript] = useState(PRESET_AUDIO_TRANSCRIPTS[0].text);
  const [language, setLanguage] = useState(PRESET_AUDIO_TRANSCRIPTS[0].lang);
  const [site, setSite] = useState(PRESET_AUDIO_TRANSCRIPTS[0].site);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [followupQuestions, setFollowupQuestions] = useState<string[]>([]);

  const handlePresetSelect = (preset: typeof PRESET_AUDIO_TRANSCRIPTS[0]) => {
    setSelectedPreset(preset);
    setTranscript(preset.text);
    setLanguage(preset.lang);
    setSite(preset.site);
    setResult(null);
    setFollowupQuestions([]);
  };

  const handleSimulateRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
    }, 2200);
  };

  const handleProcessVoice = async () => {
    if (!transcript.trim()) return;
    setLoading(true);
    try {
      const res = await processVoice({
        audio_transcript: transcript,
        language: language,
        site_id: site,
        reporter_role: selectedPreset.role
      });
      setResult(res);

      if (res?.structured_observation) {
        const qRes = await getFollowupQuestions({
          activity: res.structured_observation.activity,
          hazard: res.structured_observation.hazard,
          controls_missing: ["Exclusion zone barrier", "Safety whip-check hobble"]
        });
        setFollowupQuestions(qRes.questions || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Preset Selector */}
      <div className="flex flex-wrap gap-2">
        {PRESET_AUDIO_TRANSCRIPTS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handlePresetSelect(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedPreset.label === p.label
                ? 'bg-classic-wine text-white shadow-3d-sm'
                : 'bg-white border border-classic-border text-classic-charcoal hover:border-classic-wine/40'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Audio & Transcript Input */}
        <Card3D className="p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif font-bold text-classic-black text-base">Multilingual Voice Input Stream</h3>
              <p className="text-xs text-classic-slate mt-0.5">Captures vernacular verbal reports from field floor workers</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-classic-ivory border border-classic-border text-classic-wine font-bold">
              {language}
            </span>
          </div>

          {/* Voice Waveform Simulator */}
          <div className="p-4 rounded-xl bg-classic-black text-white mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
                <span className="text-xs font-mono font-medium">
                  {isRecording ? 'RECORDING RIG AUDIO (24-BIT)...' : 'FIELD AUDIO BUFFER READY'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-classic-warmgray">{site}</span>
            </div>

            {/* Animated Audio Bars */}
            <div className="h-12 flex items-center justify-center gap-1.5 px-4 bg-classic-black/70 rounded-lg border border-classic-slate/30">
              {[40, 70, 95, 30, 85, 100, 60, 45, 90, 75, 40, 80, 95, 35, 60, 85, 50, 90, 100, 70, 45, 60].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-150 ${
                    isRecording ? 'bg-classic-wineLight animate-pulse' : 'bg-classic-slate/50'
                  }`}
                  style={{ height: isRecording ? `${h}%` : '20%' }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-classic-slate/30">
              <button
                onClick={handleSimulateRecord}
                disabled={isRecording}
                className="px-3 py-1.5 bg-classic-wine hover:bg-classic-wineLight text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors shadow-3d-sm"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                {isRecording ? 'Listening in Field...' : 'Simulate Mic Capture'}
              </button>
              <span className="text-[10px] text-classic-warmgray">ASR Models: Whisper-OIL / Hinglish-ASR</span>
            </div>
          </div>

          {/* Editable Transcript Area */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-classic-charcoal block">Spoken Verbal Narrative (Transcript):</label>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={4}
              className="w-full text-xs p-3 rounded-lg border border-classic-border bg-classic-ivory font-serif text-classic-black focus:outline-none focus:border-classic-wine"
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleProcessVoice}
              disabled={loading || !transcript.trim()}
              className="px-5 py-2 bg-classic-black text-white hover:bg-classic-wine rounded-lg text-xs font-bold transition-all shadow-3d-sm flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing Field Audio...
                </>
              ) : (
                'Extract Structured Safety Intelligence &rarr;'
              )}
            </button>
          </div>
        </Card3D>

        {/* Right: Structured Safety Output */}
        <div className="space-y-4">
          {result ? (
            <Card3D className="p-6 bg-white border border-classic-border rounded-xl shadow-3d-sm">
              <div className="flex items-center justify-between border-b border-classic-border pb-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-classic-wine">
                  NLP Extracted Safety Attributes
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-900 border border-red-200">
                  SIF POTENTIAL DETECTED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div className="p-3 bg-classic-ivory rounded-lg border border-classic-border">
                  <div className="text-[10px] font-mono text-classic-slate uppercase">Activity</div>
                  <div className="font-bold text-classic-black mt-0.5">{result.structured_observation?.activity}</div>
                </div>
                <div className="p-3 bg-classic-ivory rounded-lg border border-classic-border">
                  <div className="text-[10px] font-mono text-classic-slate uppercase">Hazard Identified</div>
                  <div className="font-bold text-classic-black mt-0.5">{result.structured_observation?.hazard}</div>
                </div>
                <div className="p-3 bg-classic-ivory rounded-lg border border-classic-border">
                  <div className="text-[10px] font-mono text-classic-slate uppercase">Barrier State</div>
                  <div className="font-bold text-red-700 mt-0.5">{result.structured_observation?.barrier_status}</div>
                </div>
                <div className="p-3 bg-classic-ivory rounded-lg border border-classic-border">
                  <div className="text-[10px] font-mono text-classic-slate uppercase">Life Saving Rule</div>
                  <div className="font-bold text-classic-wine mt-0.5">{result.structured_observation?.life_saving_rule}</div>
                </div>
              </div>

              {/* Dynamic Follow-up Safety Questions */}
              {followupQuestions.length > 0 && (
                <div className="mt-4 pt-3 border-t border-classic-border">
                  <h4 className="text-xs font-bold text-classic-black mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-classic-wine" />
                    AI Auto-Generated Interrogation Checklist (Spoken Follow-ups):
                  </h4>
                  <div className="space-y-2">
                    {followupQuestions.map((q, i) => (
                      <div key={i} className="p-2.5 bg-classic-ivory/80 rounded border border-classic-border text-xs text-classic-charcoal flex items-start gap-2">
                        <span className="font-mono text-[10px] font-bold text-classic-wine mt-0.5">Q{i + 1}.</span>
                        <span>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card3D>
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-classic-ivory/50 rounded-xl border border-dashed border-classic-border text-center">
              <div className="w-12 h-12 rounded-full bg-classic-wine/10 flex items-center justify-center text-classic-wine mb-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h4 className="font-serif font-bold text-classic-black text-sm">No Audio Processed Yet</h4>
              <p className="text-xs text-classic-slate mt-1 max-w-sm">
                Select a preset voice recording in Hinglish, Hindi, or Assamese, or click "Extract Structured Safety Intelligence".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
