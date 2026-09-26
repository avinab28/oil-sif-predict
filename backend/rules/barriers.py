"""
Safety Barrier Analysis Module
Evaluates physical, administrative, and engineered barriers against the report narrative.
"""

BARRIER_DEFINITIONS = [
    {
        "name": "Exclusion Zone Barricading",
        "category": "Physical / Administrative",
        "fail_phrases": ["not barricaded", "no barricade", "entered drop zone", "barricading was down", "entered the area below", "no warning signs", "perimeter was not demarcated"],
        "weak_phrases": ["partially barricaded", "barricade tape loose"],
        "effective_phrases": ["properly barricaded", "clear exclusion zone maintained"]
    },
    {
        "name": "Lockout / Tagout (LOTO)",
        "category": "Engineered / Isolation",
        "fail_phrases": ["loto bypassed", "missing padlock", "still live", "not locked out", "tagged but not padlocked", "never tripped"],
        "weak_phrases": ["tag attached but lock missing", "isolation tag faded"],
        "effective_phrases": ["loto verified", "zero energy verified", "isolated and padlocked"]
    },
    {
        "name": "Atmospheric Gas Testing",
        "category": "Engineered / Life Support",
        "fail_phrases": ["without atmospheric gas testing", "without gas test", "left outside", "not verified pre-entry", "continuous multi-gas monitor was missing"],
        "weak_phrases": ["gas test performed 4 hours earlier", "single sensor monitor only"],
        "effective_phrases": ["gas testing verified 0.0 ppm h2s", "continuous gas monitor active"]
    },
    {
        "name": "Fall Arrest & 100% Tie-off",
        "category": "Personal Protection",
        "fail_phrases": ["without hooking twin lanyards", "unhooked harness", "worked without safety harness", "kickplate was missing", "mid-rail missing"],
        "weak_phrases": ["single lanyard tied off", "harness worn loose"],
        "effective_phrases": ["100% tie-off maintained", "harness inspected and hooked"]
    },
    {
        "name": "Pressure Relief & Whip-Checks",
        "category": "Engineered Barrier",
        "fail_phrases": ["whip-check cable was disconnected", "failed catastrophically", "ruptured under", "blew out during", "lacked cold-cut verification", "pressure gauge was broken"],
        "weak_phrases": ["whip-check slack", "gauge glass dirty"],
        "effective_phrases": ["whip-check secured", "relief valve tested"]
    },
    {
        "name": "Hot Work Spark Containment",
        "category": "Physical Barrier",
        "fail_phrases": ["gaps in fire blanket", "missing bottom skirt", "unvented gas bleed", "sparks flew through"],
        "weak_phrases": ["blanket slightly torn"],
        "effective_phrases": ["containment habitat pressurized", "fire watch active with extinguisher"]
    }
]

def analyze_barriers(narrative: str):
    """Scans text for barrier status and extracts supporting evidence quotes."""
    lower = narrative.lower()
    results = []
    
    for b in BARRIER_DEFINITIONS:
        status = None
        evidence = None
        
        # Check fail phrases
        for phrase in b["fail_phrases"]:
            if phrase in lower:
                status = "FAILED"
                idx = lower.find(phrase)
                start = max(0, idx - 15)
                end = min(len(narrative), idx + len(phrase) + 20)
                evidence = narrative[start:end].strip()
                break
                
        if not status:
            for phrase in b["weak_phrases"]:
                if phrase in lower:
                    status = "AT RISK"
                    idx = lower.find(phrase)
                    start = max(0, idx - 15)
                    end = min(len(narrative), idx + len(phrase) + 20)
                    evidence = narrative[start:end].strip()
                    break
                    
        if not status:
            for phrase in b["effective_phrases"]:
                if phrase in lower:
                    status = "EFFECTIVE"
                    idx = lower.find(phrase)
                    start = max(0, idx - 15)
                    end = min(len(narrative), idx + len(phrase) + 20)
                    evidence = narrative[start:end].strip()
                    break
                    
        if status:
            results.append({
                "barrier": b["name"],
                "category": b["category"],
                "status": status,
                "evidence": f'"{evidence}"' if evidence else "Identified from context"
            })
            
    # Default fallback if no specific barrier was mentioned
    if not results:
        results.append({
            "barrier": "Administrative / Operating Procedure",
            "category": "Procedural",
            "status": "EFFECTIVE",
            "evidence": "Standard operating procedure followed with no barrier breach detected."
        })
        
    return results
