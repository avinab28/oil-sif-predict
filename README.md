# OIL SIF-PREDICT: AI/NLP Engine for Detecting Serious Injury & Fatality Precursors

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688.svg)](https://fastapi.tiangolo.com/)
[![React 18](https://img.shields.io/badge/React-18-61DAFB.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Docker Ready](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)

> **Research Prototype for Oil India Limited (OIL)**  
> Developed for the Smart India Hackathon (SIH) Research Problem Statement:  
> *"AI/NLP Engine to Detect Serious Injury & Fatality (SIF) Precursors in OIL's Unsafe-Act / Unsafe-Condition and Near-Miss Reports."*

---

## 1. Foundational Research Principle

> ### **Actual Consequence != Potential Consequence**
>
> In oil and gas operations, whether a high-energy event causes zero injuries or multiple fatalities is often determined by fortune, millimeters of clearance, or a split-second movement rather than systemic safety controls.

### Real-World Oilfield Illustration:
```
Incident Narrative:
"A 500 kg drill collar fell from a height of 3 meters and landed in an empty walkway. No one was injured."

Traditional Lagging System:
├── Consequence: No Injury
├── Severity Score: Minor / Low
└── Outcome: Closed locally without management intervention.

OIL SIF-PREDICT Leading System:
├── High-Energy Hazard: Suspended 500 kg mass (gravitational potential)
├── Exposure: Active rig floor pedestrian pathway
├── Barrier Breach: Exclusion zone barricading absent
├── Potential Consequence: Fatality
├── IOGP Life-Saving Rule: Safe Mechanical Lifting / Line of Fire
└── SIF Potential: HIGH (94% Calibrated Confidence) -> IMMEDIATE BARRIER AUDIT
```

---

## 2. Research & AI/NLP Pipeline Architecture

The platform operationalizes an 8-layer hybrid intelligence pipeline combining Machine Learning with causal domain safety reasoning:

```
[ Unstructured Safety Report (UA / UC / Near-Miss) ]
                        │
                        ▼
       [ Stage 1: Text Preprocessing & Normalization ]
           (Expands acronyms: LOTO, PTW, SWL, BOP, H2S)
                        │
                        ▼
    [ Stage 2: Safety Entity & Physical Hazard Extraction ]
           (Mass, pressure, voltage, toxic atmosphere)
                        │
                        ▼
      [ Stage 3: High-Energy Hazard Detection & Thresholds ]
           (Gravitational, kinetic, stored pressure, electrical)
                        │
                        ▼
       [ Stage 4: Critical Safety Barrier Analysis Engine ]
           (Physical barriers, LOTO, gas testing, fall arrest)
                        │
                        ▼
        [ Stage 5: Hybrid SIF Potential Classification ]
           (Fuses ML Classifier with Domain Safety Logic)
                        │
                        ▼
      [ Stage 6: IOGP 9+1 Life-Saving Rule Mapping ]
           (Line of Fire, Mechanical Lifting, Confined Space, etc.)
                        │
                        ▼
      [ Stage 7: Explainable AI (XAI) Attribution ]
           (Token-level span highlighting + evidence checklist)
                        │
                        ▼
   [ Stage 8: Safety Intelligence & SIF Precursor Hotspots ]
```

---

## 3. High Recall Prioritization

In industrial safety analytics, **Recall is prioritized over raw precision**:
Recall = True Positives / (True Positives + False Negatives)

* **False Negative Cost**: Catastrophic (failing to flag a fatal suspended load drop precursor).
* **False Positive Cost**: Low (generating a 2-minute review for a qualified HSSE officer).

### Model Benchmark Evaluation (Held-Out Test Set, n=700):

| Model Architecture | Paradigm | Precision | Recall (Safety Target) | F1-Score | Accuracy | ROC-AUC |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Keyword Rules Baseline** | Heuristic Rules | 98.5% | 39.5% | 0.564 | 77.1% | 0.690 |
| **TF-IDF + Logistic Regression** | Supervised ML | 97.8% | 98.1% | 0.979 | 98.4% | 0.995 |
| **TF-IDF + Linear SVM** | Supervised ML | 98.5% | 98.1% | 0.983 | 98.7% | 0.996 |
| **Proposed Hybrid (NLP + Rules + XAI)** | Domain-Grounded Hybrid | **98.9%** | **99.6%** | **0.992** | **99.4%** | **0.998** |

---

## 4. Key Application Pages & Features

1. **Pipeline & Research Overview**:
   * Interactive 8-step pipeline visualizer with input/process/output inspection.
   * Conceptual contrast between traditional lagging severity and SIF precursor analytics.
2. **AI/NLP Analysis Engine**:
   * Single report analysis text area with **15 curated benchmark scenarios** (Drilling blowout, Crane drop, H2S confined space, LOTO electrical, Minor housekeeping).
   * CSV / Excel batch upload interface.
   * **SIF Classification Status**: Large badge (`HIGH` / `MEDIUM` / `LOW`), calibrated confidence %, actual vs potential consequence, risk zone.
   * **Explainable AI (XAI)**: Color-coded token highlight spans (High-Energy Hazard, Exposure, Barrier Failure, Unsafe Dynamic Event, Consequence Disparity).
   * **IOGP Life-Saving Rule Mapping**: Primary rule card with diagnostic lineage flowchart.
   * **Safety Barrier Table**: Status (`FAILED`, `AT RISK`, `EFFECTIVE`) with exact narrative evidence quotes.
3. **Safety Analytics Dashboard**:
   * 7 dynamic KPI cards calculated from dataset.
   * Visualizations: SIF Donut breakdown, Breached IOGP Rules, Barrier Failure distributions, and Operational Activity vs SIF Risk Matrix.
   * **SIF Precursor Hotspots**: Normalized density table:
     SIF Precursor Density = (SIF Reports / Total Reports) * 100
     Includes scientific sample size caveats to prevent bias from reporting volumes.
4. **Dataset Explorer**:
   * Searchable, filterable repository of 2,800+ realistic synthetic OIL-calibrated records.
   * Multi-facet filters, pagination, CSV download, and record detail inspector.
5. **Research & Evaluation**:
   * Research hypothesis, 6 research questions, dynamic model benchmark metrics, on-premise deployment architecture, limitations, and 7-phase roadmap.
6. **Executive Briefing Generator**:
   * One-click printable briefing summarizing top precursor risks, barrier failures, and strategic recommendations for OIL leadership.

---

## 5. Quickstart & Installation

### Option A: Local Full-Stack Run (FastAPI + Embedded UI)
1. **Clone the repository**:
   ```bash
   git clone https://github.com/avinab28/oil-sif-predict.git
   cd oil-sif-predict
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r backend/requirements.txt
   ```

3. **Generate synthetic dataset and train models**:
   ```bash
   python backend/data/generator.py
   ```

4. **Launch the server**:
   ```bash
   python backend/main.py
   ```
   Open your browser to: **`http://localhost:8000`**  
   *FastAPI automatically serves both the complete REST API (`/api/...`) and the interactive light-themed React frontend.*

---

### Option B: Frontend Live Development
```bash
cd frontend
npm install
npm run dev
```
Runs Vite hot-reloading development server on **`http://localhost:5173`**.

---

### Option C: Docker Deployment
```bash
docker-compose up --build
```
Access the application on port `8000`.

---

## 6. On-Premise & Edge Security Architecture

OIL safety narratives frequently reference sensitive operational assets and well locations. The platform is architected for strict intranet deployment:
* **Zero External Cloud Leakage**: Runs 100% locally with Scikit-learn and local transformer pipelines.
* **No Third-Party API Keys**: Operates completely offline without OpenAI, Anthropic, or external dependencies.
* **Tamper-Evident Audit Trails**: Structured JSON outputs for HSE statutory compliance.

---

## 7. Research Limitations & Governance

1. **Synthetic Data Calibration**: Developed and calibrated against realistic synthetic oilfield scenarios. Does not claim access to proprietary internal OIL HSSE records.
2. **Human-in-the-Loop Validation**: AI predictions serve as leading decision support for qualified safety officers; not a replacement for statutory HSE procedures.
3. **Multilingual Expansion**: Future phases will incorporate domain-adapted transformer fine-tuning for Assamese and Hindi oilfield terminology.

---

## 8. License

This project is licensed under the MIT License — see the LICENSE file for details.
