# OIL SIF-PREDICT: AI/NLP Engine for Detecting Serious Injury & Fatality Precursors

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688.svg)](https://fastapi.tiangolo.com/)
[![React 18](https://img.shields.io/badge/React-18-61DAFB.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Docker Ready](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)

> **Industrial Research Prototype for Oil India Limited (OIL)**  
> Developed for the Smart India Hackathon (SIH) Research Problem Statement:  
> *"AI/NLP Engine to Detect Serious Injury & Fatality (SIF) Precursors in OIL's Unsafe-Act / Unsafe-Condition and Near-Miss Reports."*

---

## 1. Foundational Research Principle

> ### **Actual Consequence != Potential Consequence**
>
> In high-hazard oil and gas upstream operations, whether an energy release causes zero injuries or multiple fatalities is often dictated by chance, millimeter clearance, or split-second movement rather than systemic controls.

### Real-World Oilfield Illustration:
```
Narrative: "A 500 kg drill collar fell from a height of 3 meters and landed in an empty walkway. No one was injured."

Traditional Lagging System:
├── Consequence: No Injury
├── Severity Score: Minor / Low
└── Outcome: Closed locally without leadership intervention.

OIL SIF-PREDICT Leading System:
├── High-Energy Hazard: Suspended 500 kg mass (gravitational potential)
├── Exposure: Active rig floor pedestrian pathway
├── Barrier Breach: Exclusion zone barricading absent
├── Potential Consequence: Fatality
├── IOGP Life-Saving Rule: Safe Mechanical Lifting / Line of Fire
└── SIF Potential: HIGH (94% Calibrated Confidence) -> IMMEDIATE BARRIER AUDIT
```

---

## 2. The 7-Stage End-to-End Operational Safety Lifecycle

OIL SIF-PREDICT moves beyond reactive report categorization into a continuous, enterprise-wide safety intelligence loop across 7 operational stages:

```
  BEFORE WORK              DURING WORK               AFTER OBSERVATION
 ┌──────────────┐         ┌──────────────┐          ┌─────────────────┐
 │  Smart PTW   │   ───►  │ Voice+Vision │   ───►   │ SIF Intelligence│
 └──────────────┘         └──────────────┘          └─────────────────┘
        ▲                                                    │
        │                                                    ▼
  LEARNING                 HSE ACTION               ACROSS TIME & SITES
 ┌──────────────┐         ┌──────────────┐          ┌─────────────────┐
 │Safety Memory │   ◄───  │ Prioritized  │   ◄───   │Converging Radar │
 │& AI RootCause│         │ Intervention │          │& Knowledge Graph│
 └──────────────┘         └──────────────┘          └─────────────────┘
```

### Stage 1: BEFORE WORK — Smart PTW & SIMOPS Collision Matrix
* **Smart PTW & Dynamic Checklist**: Converts static safety rules into pre-job actionable barrier checks. Flags missing Lockout/Tagout (LOTO), continuous LEL gas testing, or flame-retardant habitats.
* **Spatial SIMOPS Matrix**: Detects simultaneous operational clashes (e.g., Hot Work welding within 12 meters of active condensate sampling) and mandates spatial buffer enforcement.

### Stage 2: DURING WORK — Multilingual Voice & Computer Vision
* **Vernacular Spoken Safety Logger**: Enables frontline crews to dictate observations in Hinglish, Hindi, and Assamese. Auto-extracts structured activity, hazard, barrier status, and generates dynamic follow-up questions.
* **CCTV Vision Correlator**: Cross-verifies active CCTV rig feeds against issued permits to catch PPE non-compliance or missing gas detectors in real time.

### Stage 3: AFTER OBSERVATION — SIF NLP Engine & Causal Dissection
* **Hybrid NLP Precursor Classifier**: Calibrated energy matrix (DeepSeek-R1 / RoBERTa) extracting potential severity regardless of zero actual harm.
* **What-If Counterfactual Sandbox**: Simulates alternative causal branches ("What if secondary barrier broke? What if worker was in the snap-back zone?").
* **3D Causal Failure Chain**: Interactive 3D visualization showing exact points of barrier failure leading to potential catastrophe.

### Stage 4: ACROSS TIME — Converging Precursor Weak-Signal Radar
* **Weak Signal Aggregator**: Correlates independent sub-threshold anomalies across shifts (e.g. cellar bubbling + choke manifold hiss + sensor drift) to detect impending well control escalations.
* **Escalation Multiplier**: Quantifies cumulative risk escalation factors over 6-month horizons.

### Stage 5: ACROSS SITES — 3D Safety Knowledge Graph
* **Interactive 3D Graph Canvas**: Connects Sites &rarr; Activities &rarr; Hazards &rarr; Barriers &rarr; Consequences &rarr; Rules.
* **Cross-Site Recurrent Pattern Recognition**: Identifies systemic vulnerabilities repeating across Assam (Digboi, Duliajan, Moran) and Rajasthan assets.

### Stage 6: HSE ACTION — Prioritized Interventions & Contractor Scorecards
* **AI Prioritized Intervention Queue**: Algorithmic ranking prioritizing asset inspections for HSE Directors.
* **Contractor Safety Scorecards**: Objective risk rating, repeat violation tracking, and Golden Rule compliance indexes.

### Stage 7: LEARNING — Institutional Safety Memory & Root-Cause AI
* **Historical Precedent Retrieval**: Instant semantic matching with past near-misses and learnings.
* **AI Root-Cause Interrogation Assistant**: Contextual questions guiding safety investigators to uncover organizational latent failures.

---

## 3. Executive 3D Classic Aesthetic
The platform utilizes an executive, minimal color palette engineered for high-level operations review:
* **Background**: Clean Ivory / Alabaster (`#FAFAF9`)
* **Primary Contrast**: Carbon Black (`#0A0B0D`)
* **Accent / SIF Identity**: Deep Imperial Burgundy & Wine (`#5B1527`, `#781D35`)
* **Tertiary Focus**: Warm Industrial Bronze (`#785A44`)
* **Interactive 3D Effects**: Mouse-hover perspective tilt cards (`Card3D`), interactive 3D causal chain, and responsive HTML5 canvas knowledge graph.

---

## 4. How to Run Locally

The repository comes pre-bundled with production-compiled frontend assets in `frontend/dist/`. Running the Python backend serves both the complete 14-endpoint API and the interactive web application!

### Prerequisites
* Python 3.10, 3.11, or 3.12 installed.

### Option 1: One-Click Windows Startup (Easiest)
Simply double-click the included batch script in the root directory:
```bash
start.bat
```
This automatically verifies dependencies and launches the unified server at `http://localhost:8000`.

### Option 2: Command Line (Cross-Platform)
1. **Clone the repository**:
   ```bash
   git clone https://github.com/avinab28/oil-sif-predict.git
   cd oil-sif-predict
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r backend/requirements.txt
   ```

3. **Launch the platform**:
   ```bash
   python run.py
   ```
   *or:*
   ```bash
   python backend/main.py
   ```

4. **Access the application**:
   Open your browser to: **`http://localhost:8000`**

### Option 3: Frontend Development (Live Hot-Reload)
If you want to edit TypeScript or Tailwind components with live hot-reloading:
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173`**.

---

## 5. How to Deploy Online for Free

### Method A: Hugging Face Spaces (100% Free, Zero Card Required)
Hugging Face Spaces offers completely free CPU hosting for Python applications:
1. Create a free account at [huggingface.co](https://huggingface.co).
2. Click **New Space** &rarr; Select SDK: **Docker** or **Gradio/Streamlit**.
3. Choose **Docker Blank** &rarr; Connect your GitHub repository `avinab28/oil-sif-predict`.
4. Hugging Face automatically detects the included `Dockerfile` and builds the unified FastAPI + React app.
5. Your application is live at `https://huggingface.co/spaces/<username>/oil-sif-predict`!

### Method B: Render.com (Free Web Service)
1. Sign up on [render.com](https://render.com) using your GitHub account (avoids card prompt when selecting the Free Tier).
2. Click **New +** &rarr; **Web Service** &rarr; Select your repository.
3. Configure settings:
   - **Environment**: Python 3
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `python run.py`
   - **Plan**: Free ($0/month)
4. Click **Deploy Web Service**.

### Method C: Vercel (Frontend) + Free Backend (Railway / Koyeb)
* Deploy the `frontend/` folder directly to [Vercel](https://vercel.com) by setting Root Directory to `frontend`.
* Point `API_BASE` in `frontend/src/services/api.ts` to your free deployed backend endpoint.

### Method D: Docker Container
```bash
docker-compose up --build
```
Access on port `8000`.

---

## 6. Project Directory Structure

```
oil-sif-predict/
├── run.py                          # 1-click cross-platform server launcher
├── start.bat                       # 1-click Windows batch launcher
├── Dockerfile                      # Cloud container deployment manifest
├── docker-compose.yml              # Local container orchestration
├── backend/
│   ├── main.py                     # FastAPI application (14 REST endpoints + SPA static mount)
│   ├── requirements.txt            # Python dependencies (FastAPI, uvicorn, scikit-learn, etc.)
│   ├── api/
│   │   ├── ptw_simops.py           # Stage 1: PTW Compliance & SIMOPS Collision APIs
│   │   ├── voice_multimodal.py     # Stage 2: Multilingual Voice & CCTV Vision APIs
│   │   ├── converging_escalation.py# Stage 4: Weak-Signal Radar & Escalation APIs
│   │   ├── knowledge_graph.py      # Stage 5: 3D Knowledge Graph & Cross-Site Pattern APIs
│   │   └── contractor_memory.py    # Stage 6 & 7: Contractor Scorecards & Safety Memory APIs
│   ├── rules/
│   │   ├── counterfactual.py       # Stage 3: What-If Counterfactual Simulation Engine
│   │   ├── energy_matrix.py        # High-energy hazard boundary thresholds
│   │   ├── life_saving_rules.py    # IOGP 9 Life-Saving Rules mapping
│   │   └── barrier_taxonomy.py     # Bow-Tie prevention & mitigation barrier taxonomy
│   └── models/
│       ├── sif_classifier.py       # Dual-branch calibrated SIF NLP model
│       └── rule_matcher.py         # Deterministic domain rule validation
└── frontend/
    ├── dist/                       # Pre-compiled production React/Vite assets
    ├── package.json
    ├── tailwind.config.js          # Classic Ivory/Burgundy/Carbon theme tokens
    └── src/
        ├── App.tsx                 # Root application router across all 7 stages
        ├── components/
        │   ├── Card3D.tsx          # Interactive 3D mouse hover perspective tilt wrapper
        │   ├── CausalChain3D.tsx   # 3D interactive safety causal chain
        │   ├── KnowledgeGraph3D.tsx# HTML5 Canvas 3D knowledge graph
        │   ├── VoiceLogger.tsx     # Vernacular voice simulator with waveform bars
        │   ├── SIMOPSMatrix.tsx    # Spatial proximity radar & collision matrix
        │   ├── ConvergingRadar.tsx # Multi-signal weak precursor aggregator
        │   ├── ContractorScorecard.tsx # Contractor safety performance profiles
        │   ├── WhatIfSimulator.tsx # Counterfactual scenario toggler
        │   ├── CCTVCorrelator.tsx  # Vision AI vs PTW permit validator
        │   └── Navbar.tsx          # Executive classic Burgundy top navigation
        └── pages/
            ├── LifecyclePage.tsx   # 7-Stage End-to-End Safety Overview
            ├── PTWPage.tsx         # Stage 1: PTW & SIMOPS
            ├── VoiceVisionPage.tsx # Stage 2: Voice & Vision
            ├── EnginePage.tsx      # Stage 3: SIF Engine & What-If Sandbox
            ├── ConvergingPage.tsx  # Stage 4: Weak-Signal Radar
            ├── KnowledgeGraphPage.tsx # Stage 5: Knowledge Graph
            └── ContractorPage.tsx  # Stage 6: HSE Action & Contractors
```

---

## 7. SIH Problem Statement Alignment

| SIH Evaluation Criteria | OIL SIF-PREDICT Implementation |
|:---|:---|
| **Leading vs Lagging Indicator** | Evaluates potential severity independent of zero injury outcome. |
| **Real-Time Operational Interventions** | Smart PTW compliance audit + spatial SIMOPS clash prevention before work starts. |
| **Frontline Usability** | Hinglish, Hindi, and Assamese voice reporting reduces barrier for field crews. |
| **Systemic Risk Discovery** | 3D Safety Knowledge Graph uncovers cross-site recurrent patterns across Assam fields. |
| **Weak-Signal Convergence** | Temporal radar detects cumulative sub-threshold anomalies before blowouts occur. |
| **Enterprise Governance** | AI Prioritized Intervention queue & contractor safety risk scorecards for HSE leaders. |

---

## 8. License & Acknowledgments

This research prototype is developed for educational and research evaluation under the Smart India Hackathon.  
Distributed under the MIT License.
