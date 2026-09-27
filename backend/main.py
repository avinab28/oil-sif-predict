"""
FastAPI Server Entry Point for OIL SIF-PREDICT
Exposes clean REST APIs for single analysis, batch analysis, datasets, dashboards, and research evaluation.
Serves production frontend build when available.
"""
import os
import sys

# Ensure root directory is always on python path regardless of where command is run
CURRENT_FILE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(CURRENT_FILE_DIR)
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)
if CURRENT_FILE_DIR not in sys.path:
    sys.path.insert(0, CURRENT_FILE_DIR)


from fastapi import FastAPI, UploadFile, File, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional, List
import json
import os
import io
import csv

from backend.rules.hybrid_engine import evaluate_report_sif
from backend.evaluation.benchmark import run_evaluation_benchmark
from backend.rules.iogp_rules import IOGP_RULES
from backend.core.config import PROJECT_NAME, VERSION, DESCRIPTION, RESEARCH_DISCLAIMER, SYNTHETIC_DATA_PATH


from backend.api.ptw_simops import audit_ptw_compliance, check_simops_collision, PTWAuditRequest, SIMOPSCheckRequest
from backend.api.voice_multimodal import parse_voice_to_structured_safety, generate_ai_followup_questions, correlate_multimodal_vision, VoiceTranscriptRequest
from backend.api.converging_escalation import get_converging_precursors, get_sif_escalation_trends, get_ai_priority_queue
from backend.api.knowledge_graph import get_safety_knowledge_graph, get_cross_site_patterns
from backend.api.contractor_memory import get_contractor_scorecards, get_similar_historical_cases, generate_investigation_assistant_questions
from backend.rules.counterfactual import simulate_what_if_counterfactual, CounterfactualRequest

app = FastAPI(
    title=PROJECT_NAME,
    version=VERSION,
    description=DESCRIPTION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SingleReportRequest(BaseModel):
    narrative: str
    actual_consequence: Optional[str] = "No injury"
    location: Optional[str] = "Duliajan Central Rig-12"
    activity: Optional[str] = "Lifting Operations"

def load_dataset():
    if not os.path.exists(SYNTHETIC_DATA_PATH):
        from backend.data.generator import generate_dataset
        generate_dataset()
    with open(SYNTHETIC_DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

@app.get("/api/health")
def health():
    return {
        "status": "online",
        "app": PROJECT_NAME,
        "version": VERSION,
        "disclaimer": RESEARCH_DISCLAIMER
    }

@app.post("/api/analyze")
def analyze_single_report(req: SingleReportRequest):
    if not req.narrative or len(req.narrative.strip()) < 10:
        raise HTTPException(status_code=400, detail="Narrative must be at least 10 characters.")
    result = evaluate_report_sif(req.narrative, req.actual_consequence)
    return result

@app.post("/api/upload")
async def upload_csv_reports(file: UploadFile = File(...)):
    contents = await file.read()
    try:
        decoded = contents.decode("utf-8")
        reader = csv.DictReader(io.StringIO(decoded))
        records = []
        for i, row in enumerate(reader):
            if i >= 50:
                break
            text = row.get("narrative", "") or row.get("Narrative", "") or row.get("description", "")
            if text:
                res = evaluate_report_sif(text, row.get("actual_consequence", "No injury"))
                records.append({
                    "row_index": i + 1,
                    "narrative": text,
                    "sif_potential": res["sif_potential"],
                    "sif_potential_label": res["sif_potential_label"],
                    "confidence": res["confidence_percentage"],
                    "rule": res["life_saving_rule"]["primary_rule"]
                })
        return {
            "status": "success",
            "processed_count": len(records),
            "sif_count": sum(1 for r in records if r["sif_potential"]),
            "preview_records": records
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse CSV: {str(e)}")

@app.get("/api/reports")
def get_reports(
    page: int = 1,
    limit: int = 20,
    search: Optional[str] = None,
    location: Optional[str] = None,
    activity: Optional[str] = None,
    sif_only: Optional[bool] = None,
    rule: Optional[str] = None
):
    dataset = load_dataset()
    filtered = dataset
    
    if search:
        s_lower = search.lower()
        filtered = [r for r in filtered if s_lower in r["narrative"].lower() or s_lower in r["report_id"].lower()]
        
    if location and location != "All":
        filtered = [r for r in filtered if r["location"] == location]
        
    if activity and activity != "All":
        filtered = [r for r in filtered if r["activity"] == activity]
        
    if rule and rule != "All":
        filtered = [r for r in filtered if r["life_saving_rule"] == rule]
        
    if sif_only is not None:
        filtered = [r for r in filtered if r["sif_potential"] == sif_only]
        
    total_count = len(filtered)
    start = (page - 1) * limit
    end = start + limit
    paginated = filtered[start:end]
    
    return {
        "total": total_count,
        "page": page,
        "limit": limit,
        "total_pages": (total_count + limit - 1) // limit,
        "reports": paginated
    }

@app.get("/api/dashboard")
def get_dashboard_metrics():
    dataset = load_dataset()
    total = len(dataset)
    sif_reports = [r for r in dataset if r["sif_potential"]]
    sif_count = len(sif_reports)
    high_risk_count = sum(1 for r in dataset if r.get("risk_level") in ["High", "Critical"])
    density = round((sif_count / total) * 100, 1) if total else 0
    
    # Top Hazard
    hazards = {}
    for r in dataset:
        h = r.get("hazard_type", "Other")
        hazards[h] = hazards.get(h, 0) + 1
    top_hazard = max(hazards.items(), key=lambda x: x[1])[0] if hazards else "Suspended Load"
    
    # Top Rule
    rules = {}
    for r in sif_reports:
        rl = r.get("life_saving_rule", "Other")
        rules[rl] = rules.get(rl, 0) + 1
    top_rule = max(rules.items(), key=lambda x: x[1])[0] if rules else "Safe Mechanical Lifting"
    
    # Site Precursor Density
    site_stats = {}
    for r in dataset:
        loc = r["location"]
        if loc not in site_stats:
            site_stats[loc] = {"total": 0, "sif": 0}
        site_stats[loc]["total"] += 1
        if r["sif_potential"]:
            site_stats[loc]["sif"] += 1
            
    hotspots = []
    for loc, s in site_stats.items():
        rate = round((s["sif"] / s["total"]) * 100, 1) if s["total"] else 0
        hotspots.append({
            "location": loc,
            "total_reports": s["total"],
            "sif_reports": s["sif"],
            "sif_density": rate
        })
    hotspots.sort(key=lambda x: x["sif_density"], reverse=True)
    
    # Barrier Failures
    barrier_counts = {}
    for r in sif_reports:
        b = r.get("barrier_type", "Exclusion Zone")
        barrier_counts[b] = barrier_counts.get(b, 0) + 1
    top_barriers = [{"name": k, "count": v} for k, v in sorted(barrier_counts.items(), key=lambda x: x[1], reverse=True)[:6]]
    
    # Activity vs SIF Matrix
    act_stats = {}
    for r in dataset:
        act = r["activity"]
        if act not in act_stats:
            act_stats[act] = {"total": 0, "sif": 0}
        act_stats[act]["total"] += 1
        if r["sif_potential"]:
            act_stats[act]["sif"] += 1
    activity_matrix = [
        {"activity": k, "total": v["total"], "sif": v["sif"], "sif_rate": round((v["sif"] / v["total"]) * 100, 1)}
        for k, v in act_stats.items()
    ]
    activity_matrix.sort(key=lambda x: x["sif_rate"], reverse=True)
    
    # Life Saving Rules Distribution
    rule_dist = [{"name": k, "count": v} for k, v in sorted(rules.items(), key=lambda x: x[1], reverse=True)]
    
    return {
        "kpis": {
            "total_reports": total,
            "sif_potential_count": sif_count,
            "high_risk_count": high_risk_count,
            "sif_density_percent": density,
            "top_hazard": top_hazard,
            "top_life_saving_rule": top_rule,
            "critical_barrier_failures": sum(b["count"] for b in top_barriers)
        },
        "sif_distribution": [
            {"name": "SIF Potential", "value": sif_count, "color": "#E11D48"},
            {"name": "Non-SIF / Routine", "value": total - sif_count, "color": "#10B981"}
        ],
        "site_hotspots": hotspots,
        "barrier_distribution": top_barriers,
        "activity_matrix": activity_matrix,
        "rule_distribution": rule_dist
    }

@app.get("/api/model-performance")
def get_model_performance():
    return run_evaluation_benchmark()

@app.get("/api/life-saving-rules")
def get_iogp_rules():
    return IOGP_RULES

@app.get("/api/alerts")
def get_active_alerts():
    return [
        {
            "id": "ALT-2026-0901",
            "priority": "HIGH PRIORITY",
            "title": "Persistent Drop Zone Infiltration Pattern Detected",
            "description": "3 near-miss reports in the past 14 days at Duliajan Rig-12 involve suspended tubulars and missing exclusion zone barricading.",
            "rule": "Safe Mechanical Lifting / Line of Fire",
            "confidence": "96%",
            "timestamp": "2 hours ago"
        },
        {
            "id": "ALT-2026-0902",
            "priority": "MEDIUM ALERT",
            "title": "Unverified Atmospheric Gas Checks in Vessel Pits",
            "description": "2 reports flagged confined space entry without continuous multi-gas detectors active.",
            "rule": "Confined Space",
            "confidence": "92%",
            "timestamp": "1 day ago"
        }
    ]

@app.get("/api/demo-samples")
def get_demo_samples():
    return [
        {
            "title": "500kg Suspended Drill Collar (High SIF)",
            "activity": "Lifting Operations",
            "actual_consequence": "No injury",
            "narrative": "During crane lifting of a 500 kg drill collar at Duliajan Central Rig-12, the rigging sling slipped unexpectedly. The load dropped 3 meters into the active work zone. The barricading was not in place, and a technician standing 1.5 meters away had to dive aside. No injury occurred."
        },
        {
            "title": "H2S Separator Entry Without Gas Test (High SIF)",
            "activity": "Confined Space Entry",
            "actual_consequence": "First aid",
            "narrative": "Technician entered crude oil separator tank at Moran Production Facility without atmospheric gas testing or ventilation verification. After 2 minutes, worker experienced acute dizziness and throat irritation from trapped H2S pockets. Worker scrambled out and received oxygen therapy. PTW controls were bypassed."
        },
        {
            "title": "415V Breaker Panel Without LOTO (High SIF)",
            "activity": "Electrical Work",
            "actual_consequence": "No injury",
            "narrative": "Electrician began replacing a 415V breaker panel at Naharkatiya Well-Site 4A. Isolator switch had not been locked out (LOTO bypassed) due to missing padlock. A colleague energized the upstream feed from MCC room. Electrician noticed high-voltage sparking upon touching screwdriver to terminal and pulled back instantly. Zero injuries."
        },
        {
            "title": "High-Pressure Mud Line Whip-Check Failed (High SIF)",
            "activity": "Drilling",
            "actual_consequence": "No injury",
            "narrative": "During mud pump pressure testing up to 3500 PSI at Rajasthan Basin Rig-07, high-pressure hammer union failed catastrophically. The discharge hose flailed violently across the rig sub-structure. Safety whip-check cable was disconnected. Three drill crew members were standing 3 meters away behind steel stanchion. No injury."
        },
        {
            "title": "Derrick Monkey Board Tie-off Missing (High SIF)",
            "activity": "Working at Height",
            "actual_consequence": "Minor injury",
            "narrative": "Rigger climbed to derrick monkey board at Upper Assam Exploratory Block-3 at height of 18 meters without hooking twin lanyards. Grating section was unbolted and tilted under foot. Rigger managed to grab structural beam with both hands and sustained sprained wrist. No fall occurred."
        },
        {
            "title": "Hydrocarbon Flange Pressure Blowout (High SIF)",
            "activity": "Pipeline Integrity Inspection",
            "actual_consequence": "No injury",
            "narrative": "Pipeline crew began loosening 12-inch flange bolts on trunk line at Bokakhat Pipeline Junction-9. Trapped pressurized gas blew out remaining gasket with loud sonic bang, spraying rust debris across workspace. Line had not been verified zero-pressure through drain vent. Crew had safety glasses on; no eye trauma."
        },
        {
            "title": "Hot Work Spark Near Flammable Drain (High SIF)",
            "activity": "Welding & Hot Work",
            "actual_consequence": "Equipment damage",
            "narrative": "Grinding sparks from pipeline header repair at Digboi Historical Field Station flew through gaps in fire blanket into open drain trench where condensate had accumulated. Small explosion and fire flash in trench extinguished quickly. Flame screen barrier was improperly sealed."
        },
        {
            "title": "Garden Hose Coiled on Walkway (Low SIF)",
            "activity": "Maintenance",
            "actual_consequence": "No injury",
            "narrative": "Observer noted garden hose left coiled across pedestrian walkway outside office entrance at Duliajan Central Rig-12. Hose was rolled up and moved to storage. No tripping incident occurred."
        },
        {
            "title": "Unlabelled Detergent Bottle in Mud Lab (Low SIF)",
            "activity": "Chemical Handling",
            "actual_consequence": "No damage",
            "narrative": "A detergent cleaning solution bottle was stored without its cap on cleaning bench in mud lab at Digboi Historical Field Station. Cap was screwed on tightly. No fumes or spills observed."
        },
        {
            "title": "Vehicle Parked Without Wheel Chocks (Low SIF)",
            "activity": "Vehicle Movement",
            "actual_consequence": "No damage",
            "narrative": "Pickup vehicle was parked in designated parking bay at Naharkatiya Well-Site 4A on flat asphalt without wheel chocks deployed. Handbrake was firmly engaged. Driver was reminded of facility chock rule and deployed chocks."
        },
        {
            "title": "Two-Person Lift for 25kg Box (Low SIF)",
            "activity": "Well Servicing",
            "actual_consequence": "No injury",
            "narrative": "Worker attempted to lift 25 kg box of pump packing alone at Bokakhat Pipeline Junction-9. Colleague intervened and executed two-person lift in accordance with safe manual handling standard. No strain occurred."
        },
        {
            "title": "Dead Fluorescent Tube in Tool Shed (Low SIF)",
            "activity": "Maintenance",
            "actual_consequence": "No injury",
            "narrative": "Technician working at workbench in tool shed at Rajasthan Basin Rig-07 observed poor lighting due to a dead fluorescent tube. Portable LED work light set up while electrician replaced fixture."
        },
        {
            "title": "Trace Oil Sheen in Rainwater Ditch (Low SIF)",
            "activity": "Well Servicing",
            "actual_consequence": "No injury",
            "narrative": "Slight oil sheen noticed in rainwater drainage ditch near flare knock-out drum at Kumchai Exploration Pad. Absorbent boom was deployed across the discharge culvert to contain any trace oil. No environmental breach."
        },
        {
            "title": "Eyewash Filter Cleaning (Low SIF)",
            "activity": "Chemical Handling",
            "actual_consequence": "No damage",
            "narrative": "Safety shower eyewash station at Moran Production Facility was tested during morning audit. Water pressure was slightly low due to inline filter silt. Maintenance serviced the strainer within 1 hour."
        },
        {
            "title": "Overstacked Wooden Pallets (Low SIF)",
            "activity": "Maintenance",
            "actual_consequence": "No injury",
            "narrative": "A pile of discarded wooden packaging pallets was left stacked unevenly near the warehouse gate at Shalmari Gathering Station. Warehouse supervisor arranged re-stacking on ground level. Area clear of hazards."
        }
    ]


# ==================== ADVANCED SAFETY LIFECYCLE ENDPOINTS ====================

@app.post("/api/ptw/audit")
def endpoint_ptw_audit(req: PTWAuditRequest):
    return audit_ptw_compliance(req)

@app.post("/api/ptw/simops-check")
def endpoint_simops_check(req: SIMOPSCheckRequest):
    return check_simops_collision(req)

@app.post("/api/voice/process")
def endpoint_voice_process(req: VoiceTranscriptRequest):
    return parse_voice_to_structured_safety(req)

@app.post("/api/voice/followup-questions")
def endpoint_followup_questions(payload: dict):
    narrative = payload.get("narrative", "")
    return generate_ai_followup_questions(narrative)

@app.post("/api/vision/correlate")
def endpoint_vision_correlate(payload: dict):
    narrative = payload.get("narrative", "")
    meta = payload.get("metadata", {})
    return correlate_multimodal_vision(narrative, meta)

@app.get("/api/converging/active")
def endpoint_converging_active():
    return get_converging_precursors()

@app.get("/api/escalation/trends")
def endpoint_escalation_trends():
    return get_sif_escalation_trends()

@app.get("/api/priority-queue")
def endpoint_priority_queue():
    return get_ai_priority_queue()

@app.get("/api/knowledge-graph")
def endpoint_knowledge_graph():
    return get_safety_knowledge_graph()

@app.get("/api/cross-site/patterns")
def endpoint_cross_site_patterns():
    return get_cross_site_patterns()

@app.get("/api/contractor/scorecards")
def endpoint_contractor_scorecards():
    return get_contractor_scorecards()

@app.get("/api/historical/similar")
def endpoint_historical_similar(hazard: str = "Suspended Load"):
    return get_similar_historical_cases(hazard)

@app.post("/api/investigation/questions")
def endpoint_investigation_questions(payload: dict):
    narrative = payload.get("narrative", "")
    return generate_investigation_assistant_questions(narrative)

@app.post("/api/counterfactual/simulate")
def endpoint_counterfactual_simulate(req: CounterfactualRequest):
    return simulate_what_if_counterfactual(req)

# ==============================================================================

# Serve static frontend build if present
frontend_dist = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "frontend", "dist")
if os.path.exists(frontend_dist):
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")
    print(f"Mounted frontend assets from {frontend_dist}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
