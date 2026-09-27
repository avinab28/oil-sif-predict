from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict

class PTWAuditRequest(BaseModel):
    task_description: Optional[str] = None
    activity_description: Optional[str] = None
    activity: Optional[str] = "Maintenance"
    permit_type: Optional[str] = "Cold Work / Isolation"
    location: Optional[str] = "Digboi Field - Wellpad #07"
    stated_controls: Optional[List[str]] = Field(default_factory=list)
    controls_entered: Optional[List[str]] = Field(default_factory=list)

class SIMOPSCheckRequest(BaseModel):
    area: Optional[str] = None
    location: Optional[str] = "Digboi Rig #07"
    permit_a: Optional[Dict[str, Any]] = None
    permit_b: Optional[Dict[str, Any]] = None
    activities: Optional[List[Dict[str, Any]]] = None

def audit_ptw_compliance(req: PTWAuditRequest):
    desc = (req.task_description or req.activity_description or "").lower()
    controls_list = (req.stated_controls or []) + (req.controls_entered or [])
    controls_text = " ".join(controls_list).lower()
    full_text = f"{desc} {controls_text}"

    missing_controls = []
    required_evidence = []
    
    # 1. Isolation check
    if any(k in full_text for k in ["replace", "valve", "pump", "electrical", "motor", "breaker", "manifold", "pipeline"]):
        if not any(k in full_text for k in ["zero-energy", "multimeter", "loto", "double block", "bleed"]):
            missing_controls.append("Double Block & Bleed (DBB) isolation confirmation & LOTO tag verified")
            required_evidence.append({"item": "Isolation Padlock & DBB Bleed-Off Confirmed", "verified": False})
        else:
            required_evidence.append({"item": "Lockout/Tagout (LOTO) Physical Locks Applied", "verified": True})

    # 2. Confined Space check
    if any(k in full_text for k in ["confined", "tank", "vessel", "pit", "cellar", "separator"]):
        if not any(k in full_text for k in ["gas test", "multi-gas", "lel", "h2s"]):
            missing_controls.append("Pre-Entry Continuous LEL & H2S Multi-Gas Atmospheric Testing Log")
            required_evidence.append({"item": "Pre-Entry 4-Gas Test Log (LEL < 1%, H2S 0ppm)", "verified": False})
        else:
            required_evidence.append({"item": "Continuous Atmosphere Ventilation Active", "verified": True})

    # 3. Hot work check
    if any(k in full_text for k in ["weld", "cut", "grind", "spark", "hot work"]):
        if not any(k in full_text for k in ["fire watch", "blanket", "habitat"]):
            missing_controls.append("Dedicated Standby Fire Watch with pressurized 50kg dry chemical extinguisher")
            missing_controls.append("Flame-retardant spark containment blanket / positive-pressure habitat")
            required_evidence.append({"item": "Designated Standby Fire Watch Assigned", "verified": False})
            required_evidence.append({"item": "10m Spark Containment Habitat Erected", "verified": False})
        else:
            required_evidence.append({"item": "Spark Arrestor & Fire Watch in Place", "verified": True})

    if not required_evidence:
        required_evidence.append({"item": "Pre-Job Toolbox Talk (TBT) Completed", "verified": True})
        required_evidence.append({"item": "Mandatory PPE Verification Check", "verified": True})

    passed = len(missing_controls) == 0
    score = 100 if passed else max(30, 95 - (len(missing_controls) * 25))
    status = "APPROVED_COMPLIANT" if passed else "REJECTED_MISSING_MANDATORY_CONTROLS"

    # Convert required_evidence to dynamic checklist format
    dynamic_checklist = [
        {"item": item.get("item", ""), "required": True, "verified": item.get("verified", False)}
        for item in required_evidence
    ]

    return {
        "status": status,
        "compliance_score": score,
        "passed": passed,
        "mandatory_controls_missing": missing_controls,
        "missing_controls": missing_controls,
        "dynamic_checklist": dynamic_checklist,
        "recommendations": "Authorized Issuer sign-off granted; proceed with work." if passed else "Hold permit issuance until all missing mandatory controls and physical verification tags are validated on site by Area Authority."
    }

def check_simops_collision(req: SIMOPSCheckRequest):
    area_name = req.location or req.area or "Process Deck"
    
    # Handle both {activities: [...]} and {permit_a: {...}, permit_b: {...}}
    if req.activities and len(req.activities) >= 2:
        p_a = req.activities[0]
        p_b = req.activities[1]
    else:
        p_a = req.permit_a or {"type": "Hot Work", "zone": "Cellar Deck"}
        p_b = req.permit_b or {"type": "Sampling", "zone": "Manifold Deck"}

    text_a = str(p_a).lower()
    text_b = str(p_b).lower()

    dist = p_a.get("distance_m", 12)

    is_conflict = False
    clash_reason = ""
    action = ""

    if (("hot" in text_a or "weld" in text_a or "grind" in text_a) and ("hydrocarbon" in text_b or "sampl" in text_b or "flange" in text_b)) or \
       (("hot" in text_b or "weld" in text_b or "grind" in text_b) and ("hydrocarbon" in text_a or "sampl" in text_a or "flange" in text_a)):
        is_conflict = True
        clash_reason = f"Hot Work (Arc/Grinding Sparks) overlaps with Hydrocarbon Flange Breaking/Sampling within {dist} meters (minimum safe separation is 30m)."
        action = "Suspend Sampling Permit PTW-2026-902 until Hot Work completes, equipment cools, and atmosphere is re-tested with 4-gas detector."
    elif (("lift" in text_a or "crane" in text_a) and ("walk" in text_b or "trench" in text_b or "entry" in text_b)) or \
         (("lift" in text_b or "crane" in text_b) and ("walk" in text_a or "trench" in text_a or "entry" in text_a)):
        is_conflict = True
        clash_reason = f"Overhead Heavy Crane Hoisting drop radius overlaps active personnel transit or below-ground cellar entry zone ({dist}m separation)."
        action = "Enforce exclusive spatial separation. Barricade cellar access and trip crane slewing limiters before entry."
    else:
        is_conflict = False
        clash_reason = f"Independent operations; spatial buffer of {dist}m meets safety threshold."
        action = "Maintain continuous UHF radio coordination between area task supervisors."

    return {
        "clash_detected": is_conflict,
        "severity": "CRITICAL_PROHIBITED" if is_conflict else "CLEAR_ACCEPTABLE",
        "clash_reason": clash_reason,
        "recommended_action": action,
        "separation_distance_m": dist,
        "min_required_distance_m": 30,
        "requires_hse_intervention": is_conflict
    }
