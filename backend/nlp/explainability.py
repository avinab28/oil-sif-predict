"""
Explainable AI (XAI) Token Highlighter & Evidence Generator
Produces exact character spans for color-coded inline highlighting and reasoning checklists.
"""

import re

ENTITY_PATTERNS = [
    {
        "type": "high_energy",
        "label": "High-Energy Hazard",
        "patterns": [
            r"\d+\s*(?:kg|ton|tonne|lbs)?\s*(?:drill collar|valve|pipe|spool piece|load)",
            r"suspended\s+(?:pipe|load|drill collar|valve|casing)",
            r"\d+\s*psi",
            r"h2s|hydrogen sulfide|flammable vapors?|toxic gas|nitrogen accumulation",
            r"415v|3\.3kv|high[ -]voltage|live\s+240v|breaker panel",
            r"crude oil separator|valve pit|storage vessel",
            r"derrick monkey board|height of \d+\s*meters|elevation",
            r"hammer union|standpipe manifold|choke line",
            r"hydrocarbon vapors?|crude manifold"
        ]
    },
    {
        "type": "exposure",
        "label": "Human Exposure",
        "patterns": [
            r"entered the area below",
            r"standing 1\.5 meters away",
            r"dive aside",
            r"pathway where two workers were walking",
            r"entered the drop zone",
            r"walkway",
            r"technician entered",
            r"two operators entered",
            r"workers? felt sudden shortness of breath",
            r"pulled back instantly",
            r"inside the exclusion zone",
            r"standing 3 meters away",
            r"worker clung to overhead pipe",
            r"positioned outside door swing"
        ]
    },
    {
        "type": "barrier_failure",
        "label": "Critical Barrier Failure",
        "patterns": [
            r"barricading was not in place",
            r"no barricade or banksman was stationed",
            r"no warning signs or physical barriers",
            r"without atmospheric gas testing",
            r"gas monitor was left outside",
            r"ptw controls were bypassed",
            r"loto bypassed",
            r"missing padlock",
            r"breaker remained closed",
            r"without hooking twin lanyards",
            r"worked without safety harness",
            r"kickplate was missing",
            r"whip-check cable was disconnected",
            r"no protective blast shield installed",
            r"exclusion perimeter was not demarcated",
            r"gaps in fire blanket",
            r"missing bottom skirt",
            r"not been verified zero-pressure",
            r"pressure gauge was broken"
        ]
    },
    {
        "type": "unsafe_event",
        "label": "Unsafe Event / Release",
        "patterns": [
            r"rigging sling slipped",
            r"tagline snapped",
            r"swung violently",
            r"valve weighing \d+ kg slipped",
            r"dropped \d+ meters",
            r"fell directly",
            r"high-voltage sparking",
            r"flashing fire|flash fire occurred",
            r"failed catastrophically",
            r"flapped violently|flailed violently",
            r"valve pack ruptured",
            r"connection blew out",
            r"door swung open violently",
            r"trapped pressurized gas blew out"
        ]
    },
    {
        "type": "potential_consequence",
        "label": "Potential Consequence",
        "patterns": [
            r"no injury occurred",
            r"zero injury recorded",
            r"no one was hurt",
            r"acute dizziness",
            r"shortness of breath",
            r"sprained wrist",
            r"minor bruised shin",
            r"small explosion",
            r"no fall occurred",
            r"zero injuries"
        ]
    }
]

def extract_highlight_spans(text: str):
    """Finds all non-overlapping highlighted spans in the text."""
    spans = []
    
    for category in ENTITY_PATTERNS:
        cat_type = category["type"]
        cat_label = category["label"]
        for pattern in category["patterns"]:
            for match in re.finditer(pattern, text, re.IGNORECASE):
                spans.append({
                    "start": match.start(),
                    "end": match.end(),
                    "text": match.group(),
                    "type": cat_type,
                    "label": cat_label
                })
                
    # Sort and remove overlapping spans
    spans.sort(key=lambda s: (s["start"], -(s["end"] - s["start"])))
    non_overlapping = []
    last_end = 0
    for s in spans:
        if s["start"] >= last_end:
            non_overlapping.append(s)
            last_end = s["end"]
            
    return non_overlapping

def generate_evidence_checklist(narrative: str, is_sif: bool, rule: str):
    """Generates an explainable human-readable checklist of SIF signals detected."""
    lower = narrative.lower()
    checklist = []
    
    has_energy = any(w in lower for w in ["kg", "crane", "suspended", "psi", "h2s", "gas", "volt", "415v", "derrick", "height", "ruptured", "flame", "fire"])
    has_exposure = any(w in lower for w in ["entered", "standing", "worker", "technician", "walkway", "drop zone", "crew", "roughneck", "scaffolder", "operator"])
    has_barrier = any(w in lower for w in ["not", "no barricade", "bypassed", "without", "failed", "missing", "snapped", "ruptured", "disconnected", "broken"])
    has_unexpected = any(w in lower for w in ["slipped", "swung", "dropped", "blew out", "flailed", "sparking", "dizziness", "burst", "snapped"])
    
    if has_energy:
        checklist.append({"label": "High-Energy Hazard Identified", "detail": "Substantial stored/kinetic/gravitational or chemical energy present in the environment.", "verified": True})
    else:
        checklist.append({"label": "High-Energy Source Absent", "detail": "Observation involves low stored energy or routine housekeeping.", "verified": False})
        
    if has_exposure:
        checklist.append({"label": "Personnel in Zone of Vulnerability", "detail": "Workers were positioned inside or adjacent to the potential line of fire / drop perimeter.", "verified": True})
    else:
        checklist.append({"label": "No Human Exposure", "detail": "Personnel remained physically separated outside the hazardous zone.", "verified": False})
        
    if has_barrier:
        checklist.append({"label": "Critical Safety Barrier Breach", "detail": "Physical guarding, LOTO, gas testing, or barricading failed, was absent, or was bypassed.", "verified": True})
    else:
        checklist.append({"label": "Controls Maintained", "detail": "Standard barrier envelopes remained intact.", "verified": False})
        
    if has_unexpected:
        checklist.append({"label": "Unplanned Energy Release / Dynamic Event", "detail": "Uncontrolled movement, pressure discharge, or electrical exposure occurred.", "verified": True})
        
    if is_sif:
        checklist.append({"label": "Consequence Disparity Verified", "detail": "Actual consequence was minor/zero, but potential consequence meets Serious Injury & Fatality criteria.", "verified": True})
        
    return checklist
