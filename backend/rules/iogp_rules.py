"""
IOGP Life-Saving Rules Domain Engine
Implements standard 10 IOGP Life-Saving Rules with safety taxonomy and confidence scoring.
"""

IOGP_RULES = {
    "Line of Fire": {
        "description": "Keep yourself and others out of the line of fire of moving equipment, pressurized fluid, dropped objects, and tensioned rigging.",
        "icon": "Crosshair",
        "keywords": ["line of fire", "drop zone", "pathway", "whip-check", "flange", "pressurized", "pressure test", "swung", "snapped", "hose", "flailed", "valve cover", "blew out"],
        "energy_types": ["Pressure", "Kinetic", "Dropped Object"]
    },
    "Safe Mechanical Lifting": {
        "description": "Plan lifting operations and control the area. Never walk under a suspended load.",
        "icon": "Anchor",
        "keywords": ["crane", "lifting", "suspended load", "hoist", "rigging", "sling", "shackle", "tagline", "spool piece", "drill collar", "boom", "drop zone", "barricade"],
        "energy_types": ["Gravity", "Suspended Mass", "Mechanical Tension"]
    },
    "Confined Space": {
        "description": "Obtain authorization before entering a confined space. Verify gas testing and ventilation.",
        "icon": "Box",
        "keywords": ["confined space", "tank", "vessel", "separator", "valve pit", "cellar", "gas test", "oxygen", "h2s", "toxic", "lel", "breathing difficulty", "purging", "multi-gas"],
        "energy_types": ["Atmospheric", "Toxic Gas", "Asphyxiation"]
    },
    "Energy Isolation": {
        "description": "Verify isolation and zero energy state before work begins. Apply Lockout/Tagout.",
        "icon": "ZapOff",
        "keywords": ["isolation", "loto", "lockout", "tagout", "padlock", "breaker", "electrical", "415v", "3.3kv", "live", "voltage", "energized", "mcc", "terminal"],
        "energy_types": ["Electrical", "Stored Energy", "High Voltage"]
    },
    "Working at Height": {
        "description": "Protect yourself against a fall when working at height. 100% tie-off required.",
        "icon": "ShieldAlert",
        "keywords": ["working at height", "derrick", "monkey board", "harness", "lanyard", "scaffold", "scaffolder", "fall", "elevation", "grating", "kickplate", "ladder", "pipe rack"],
        "energy_types": ["Gravitational Potential", "Elevation Fall"]
    },
    "Hot Work": {
        "description": "Identify and control flammable materials before initiating spark-producing hot work.",
        "icon": "Flame",
        "keywords": ["hot work", "welding", "welder", "cutting", "grinding", "spark", "flammable", "fire blanket", "hydrocarbon", "fire watch", "oxy-acetylene", "habitat"],
        "energy_types": ["Thermal", "Combustion", "Vapor Flash"]
    },
    "Bypassing Safety Controls": {
        "description": "Obtain authorization before overriding or disabling critical safety controls or interlocks.",
        "icon": "AlertTriangle",
        "keywords": ["bypassed", "override", "tampered", "disabled", "interlock", "safety valve", "alarm defeated", "inhibited"],
        "energy_types": ["Systemic Failure", "Defeated Barrier"]
    },
    "Driving Safety": {
        "description": "Follow safe driving rules: wear seatbelts, respect speed limits, avoid mobile phone distraction, chock wheels.",
        "icon": "Truck",
        "keywords": ["vehicle", "driving", "chock", "chocks", "speed", "seatbelt", "reverse", "parking bay", "road", "pickup"],
        "energy_types": ["Vehicular Kinetic"]
    },
    "Personal Protective Equipment": {
        "description": "Wear appropriate personal protective equipment designated for the task and environment.",
        "icon": "Glasses",
        "keywords": ["ppe", "goggles", "gloves", "apron", "face shield", "safety glasses", "hard hat", "boots"],
        "energy_types": ["Contact Hazard", "Chemical Splash"]
    },
    "Work Authorization / Other Controls": {
        "description": "Work with a valid permit and job safety analysis when required.",
        "icon": "FileCheck",
        "keywords": ["permit", "ptw", "jsa", "manual handling", "housekeeping", "audit", "briefing"],
        "energy_types": ["Administrative", "Ergonomic"]
    }
}

def detect_life_saving_rule(narrative: str):
    """Detects primary and secondary IOGP Life-Saving Rules with confidence."""
    lower_text = narrative.lower()
    scores = {}
    
    for rule_name, rule_data in IOGP_RULES.items():
        match_count = 0
        for kw in rule_data["keywords"]:
            if kw in lower_text:
                match_count += 1
        if match_count > 0:
            confidence = min(0.99, 0.45 + (match_count * 0.15))
            scores[rule_name] = round(confidence, 2)
            
    if not scores:
        return {
            "primary_rule": "Work Authorization / Other Controls",
            "confidence": 0.50,
            "description": IOGP_RULES["Work Authorization / Other Controls"]["description"],
            "secondary_rules": [],
            "lineage": ["Report Text", "General Oilfield Task", "Standard Work Authorization"]
        }
        
    sorted_rules = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    primary = sorted_rules[0]
    secondary = [{"rule": r[0], "confidence": r[1]} for r in sorted_rules[1:3]]
    
    # Generate visual lineage flow
    lineage = ["Safety Narrative"]
    rule_name = primary[0]
    if rule_name == "Safe Mechanical Lifting":
        lineage.extend(["Suspended Pipe/Component", "Drop Zone Perimeter", "Mechanical Lifting Protocol"])
    elif rule_name == "Line of Fire":
        lineage.extend(["High-Pressure / Kinetic Release", "Worker in Direct Path", "Line of Fire Exposure"])
    elif rule_name == "Confined Space":
        lineage.extend(["Enclosed Tank / Pit", "Toxic H2S / O2 Deficient Atmosphere", "Confined Space Entry Standard"])
    elif rule_name == "Energy Isolation":
        lineage.extend(["High-Voltage / Stored Fluid Circuit", "Unisolated Breaker / Valve", "Lockout-Tagout (LOTO)"])
    elif rule_name == "Working at Height":
        lineage.extend(["Elevated Derrick / Platform", "Missing 100% Tie-Off", "Fall Prevention Protocol"])
    elif rule_name == "Hot Work":
        lineage.extend(["Welding / Grinding Arc", "Hydrocarbon Vapor Pocket", "Hot Work Habitats & Gas Monitoring"])
    else:
        lineage.extend(["Safety Observation", "Barrier Verification", f"IOGP Rule: {rule_name}"])
        
    return {
        "primary_rule": primary[0],
        "confidence": primary[1],
        "description": IOGP_RULES[primary[0]]["description"],
        "secondary_rules": secondary,
        "lineage": lineage
    }
