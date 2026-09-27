from pydantic import BaseModel
from typing import List, Optional

class PTWAuditRequest(BaseModel):
    task_description: str
    activity: str = "Maintenance"
    location: str = "Area A - Compressor Skid 3"
    stated_controls: List[str] = []

class SIMOPSCheckRequest(BaseModel):
    area: str = "Area A - Main Process Skid"
    permit_a: dict
    permit_b: dict

def audit_ptw_compliance(req: PTWAuditRequest):
    desc = req.task_description.lower()
    missing_controls = []
    required_evidence = []
    
    # 1. Isolation check
    if any(k in desc for k in ["replace", "valve", "pump", "electrical", "motor", "breaker"]):
        if "zero-energy" not in desc and "multimeter" not in desc and "verified" not in desc:
            missing_controls.append({
                "control": "Energy Isolation & Zero-Energy State Verification",
                "severity": "CRITICAL",
                "reason": "Isolation stated or implied, but objective zero-energy verification evidence (physical lockout + test-before-touch) is missing."
            })
            required_evidence.append({"item": "Isolation Breaker / Padlock Applied", "status": "CONFIRMED" if "isolat" in desc else "PENDING"})
            required_evidence.append({"item": "Zero-Energy Potential Test (Voltmeter / Pressure Bleed-off)", "status": "MISSING"})

    # 2. Confined Space check
    if any(k in desc for k in ["confined", "tank", "vessel", "pit", "separator"]):
        if "gas test" not in desc and "multi-gas" not in desc:
            missing_controls.append({
                "control": "Pre-Entry Atmospheric Gas Testing",
                "severity": "CRITICAL",
                "reason": "Confined vessel entry planned without documented multi-gas test results (O2 > 19.5%, H2S 0.0 ppm, LEL 0%)."
            })
            required_evidence.append({"item": "Pre-Entry 4-Gas Test Log", "status": "MISSING"})
            required_evidence.append({"item": "Continuous Ventilation Verification", "status": "MISSING"})

    # 3. Hot work check
    if any(k in desc for k in ["weld", "cut", "grind", "spark", "hot work"]):
        if "fire watch" not in desc and "blanket" not in desc:
            missing_controls.append({
                "control": "Fire Watch & Spark Containment Habitat",
                "severity": "HIGH",
                "reason": "Spark-producing activity requires designated fire watch with pressurized extinguisher and flame-retardant blanket."
            })
            required_evidence.append({"item": "Fire Watch Personnel Assigned", "status": "MISSING"})
            required_evidence.append({"item": "Combustible Gas Test within 15m", "status": "MISSING"})

    passed = len(missing_controls) == 0
    return {
        "status": "PERMIT_APPROVED" if passed else "PERMIT_CHECK_FAILED",
        "passed": passed,
        "compliance_score": 100 if passed else max(30, 95 - (len(missing_controls) * 35)),
        "missing_controls": missing_controls,
        "dynamic_checklist": required_evidence,
        "recommended_action": "Authorized Issuer Sign-off Permitted" if passed else "Mandatory Permit Issuer Review & Barrier Rectification Required"
    }

def check_simops_collision(req: SIMOPSCheckRequest):
    p_a = req.permit_a
    p_b = req.permit_b
    
    act_a = p_a.get("activity", "").lower()
    act_b = p_b.get("activity", "").lower()
    type_a = p_a.get("permit_type", "").lower()
    type_b = p_b.get("permit_type", "").lower()
    
    is_conflict = False
    interaction_hazard = ""
    recommendation = ""
    
    # Clash 1: Hot Work vs Hydrocarbon / Fuel Transfer
    if (("hot work" in type_a or "weld" in act_a) and ("hydrocarbon" in act_b or "fuel" in act_b or "flange" in act_b)) or        (("hot work" in type_b or "weld" in act_b) and ("hydrocarbon" in act_a or "fuel" in act_a or "flange" in act_a)):
        is_conflict = True
        interaction_hazard = "Ignition Source (Hot Work Arc/Sparks) + Flammable Vapor Cloud Risk (Hydrocarbon Transfer)"
        recommendation = "SUSPEND Simultaneous Execution. Reschedule Hot Work until hydrocarbon line transfer and degassing is 100% complete and verified."

    # Clash 2: Heavy Crane Lift vs Ground Personnel / Trench Excavation
    elif (("lift" in act_a or "crane" in act_a) and ("trench" in act_b or "walk" in act_b or "pit" in act_b)) or          (("lift" in act_b or "crane" in act_b) and ("trench" in act_a or "walk" in act_a or "pit" in act_a)):
        is_conflict = True
        interaction_hazard = "Suspended Heavy Load Drop Zone overlaps active below-ground excavation crew with restricted escape path."
        recommendation = "Enforce exclusive spatial separation. Evacuate trench personnel during crane hoisting operations."
        
    else:
        is_conflict = False
        interaction_hazard = "Independent activity envelopes; no direct thermodynamic or spatial clash detected."
        recommendation = "Maintain standard radio communication between permit holders."

    return {
        "status": "SIMOPS_CONFLICT" if is_conflict else "SIMOPS_CLEAR",
        "has_conflict": is_conflict,
        "area": req.area,
        "permit_a": p_a,
        "permit_b": p_b,
        "potential_interaction": interaction_hazard,
        "recommended_action": recommendation,
        "requires_hse_intervention": is_conflict
    }
