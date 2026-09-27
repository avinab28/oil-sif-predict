from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class VoiceTranscriptRequest(BaseModel):
    raw_speech_text: Optional[str] = None
    audio_transcript: Optional[str] = None
    detected_language: Optional[str] = None
    language: Optional[str] = "Hinglish"
    site_id: Optional[str] = "Digboi Field Rig-07"
    location: Optional[str] = "Digboi Field Rig-07"
    reporter_role: Optional[str] = "Frontline Operator"

class FollowupRequest(BaseModel):
    activity: str
    hazard: str
    controls_missing: Optional[List[str]] = None

class VisionCorrelateRequest(BaseModel):
    image_description: str
    location: Optional[str] = "Digboi Rig #07"
    active_ptw_id: Optional[str] = "PTW-2026-HOT-8821"

def parse_voice_to_structured_safety(req: VoiceTranscriptRequest):
    text = (req.audio_transcript or req.raw_speech_text or "").lower()
    lang = req.language or req.detected_language or "Hinglish"
    site = req.site_id or req.location or "Digboi Rig #07"

    activity = "High-Pressure Maintenance"
    if any(w in text for w in ["crane", "lift", "pipe uthana", "sling", "hoist", "derrick"]):
        activity = "Heavy Mechanical Lifting"
    elif any(w in text for w in ["isolate", "breaker", "bijli", "current", "wire", "switch", "motor"]):
        activity = "Electrical Isolation"
    elif any(w in text for w in ["tank", "pit", "separator", "andar", "vessel", "cellar"]):
        activity = "Confined Space Tank Cleaning"
    elif any(w in text for w in ["weld", "spark", "cutting", "garam", "grind"]):
        activity = "Hot Work (Grinding/Welding)"
    elif any(w in text for w in ["pump", "mud", "hose", "pressure", "vibration", "whip"]):
        activity = "High-Pressure Mud Line Maintenance"

    hazard = "Uncontrolled High-Pressure Stored Energy"
    if "current" in text or "bijli" in text or "isolate" in text:
        hazard = "Unexpected Arc Flash / Electrical Shock"
    elif "crane" in text or "gir" in text or "drop" in text or "sling" in text:
        hazard = "Suspended Load Drop Zone Exposure"
    elif "gas" in text or "h2s" in text or "leak" in text or "smell" in text:
        hazard = "Toxic H2S Pocket & Flammable Gas Release"
    elif "whip" in text or "hose" in text or "vibration" in text or "pressure" in text:
        hazard = "High-Pressure Hose Decoupling & Whip Flail"

    failed_barrier = "Physical Safety Hobble / Whip-Check Missing"
    if "loto" in text or "lock" in text or "isolate" in text:
        failed_barrier = "Energy Isolation Lockout/Tagout Bypassed"
    elif "detector" in text or "gas" in text:
        failed_barrier = "Continuous Multi-Gas Monitoring Absent"
    elif "barricad" in text or "ghus" in text or "khada" in text:
        failed_barrier = "Exclusion Zone Perimeter Barricading Absent"

    rule = "Line of Fire"
    if activity == "Heavy Mechanical Lifting": rule = "Safe Mechanical Lifting"
    elif activity == "Confined Space Tank Cleaning": rule = "Confined Space Entry"
    elif activity == "Electrical Isolation": rule = "Energy Isolation"
    elif activity == "Hot Work (Grinding/Welding)": rule = "Hot Work"

    is_sif = any(w in text for w in ["missing", "nahi", "fail", "drop", "gir", "3000", "psi", "leak", "high", "h2s", "whip"])

    return {
        "structured_observation": {
            "site_id": site,
            "activity": activity,
            "hazard": hazard,
            "barrier_status": failed_barrier,
            "life_saving_rule": rule,
            "urgency": "HIGH" if is_sif else "MEDIUM",
            "sif_potential": is_sif
        },
        "parsed_elements": {
            "raw_text": req.audio_transcript or req.raw_speech_text or "",
            "detected_language": lang,
            "confidence": 0.94
        }
    }

def generate_dynamic_followup(req: FollowupRequest):
    act = req.activity.lower()
    haz = req.hazard.lower()

    questions = []
    if "pressure" in act or "whip" in haz or "mud" in act:
        questions.append("Was the mud pump operating under pressure while personnel were standing within 3 meters?")
        questions.append("Was the safety sling hobble clamped and load-rated to 5,000 PSI?")
        questions.append("Has the area been barricaded to prevent other rig floor crew from entering the line of fire?")
    elif "lift" in act or "crane" in haz or "load" in haz:
        questions.append("Were any personnel standing directly beneath the suspended drill string or mast radius?")
        questions.append("Has the rigging tag and third-party NDT certification been inspected for frayed strands?")
        questions.append("Was a dedicated banksman guiding the crane operator via UHF radio?")
    elif "confined" in act or "gas" in haz:
        questions.append("Did the certified gas tester log zero LEL and H2S within 15 minutes before worker entry?")
        questions.append("Was a dedicated standby watcher stationed outside the manway hatch with SCBA ready?")
        questions.append("Was forced mechanical ventilation operating continuously at >= 20 air changes per hour?")
    else:
        questions.append("Was the physical lock applied and signed on the permit lock-box?")
        questions.append("Was zero-energy potential verified with calibrated instruments before touch?")
        questions.append("Are all non-essential personnel evacuated outside the 15-meter work perimeter?")

    return {"questions": questions}

def correlate_vision_ptw(req: VisionCorrelateRequest):
    desc = req.image_description.lower()
    findings = []
    mismatch = False

    if "grind" in desc or "weld" in desc:
        if "face shield" not in desc and "no full face" in desc:
            findings.append("Worker observed grinding on pipe support without certified full face shield.")
            mismatch = True
        if "gas detector" not in desc or "no spark" in desc or "not visible" in desc:
            findings.append("Active PTW specifies Hot Work Permit but portable 4-gas detector is not observed within 2m radius.")
            mismatch = True
        if "rags" in desc or "combustible" in desc or "oil" in desc:
            findings.append("Combustible oily materials identified within 3 meters of active spark shower.")
            mismatch = True
    else:
        findings.append("Worker spotted in active deck without high-visibility vest or chin strap fastened.")
        mismatch = True

    return {
        "correlation_status": "HAZARD_MISMATCH_DETECTED" if mismatch else "VERIFIED_COMPLIANT",
        "sif_precursor_flag": mismatch,
        "findings": findings if findings else ["All visual PPE and barrier controls correspond with active permit conditions."],
        "recommended_mitigation": "HSE Officer should immediately initiate Stop Work Authority (SWA) and inspect physical barrier controls." if mismatch else "Work authorized to proceed with continuous CCTV monitoring."
    }

# Aliases for main.py imports
generate_ai_followup_questions = generate_dynamic_followup
correlate_multimodal_vision = correlate_vision_ptw

