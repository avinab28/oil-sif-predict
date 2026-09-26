import re

ACRONYM_MAP = {
    "LOTO": "Lockout Tagout energy isolation",
    "PTW": "Permit to Work authorization",
    "SWL": "Safe Working Load capacity",
    "BOP": "Blowout Preventer pressure barrier",
    "H2S": "Hydrogen Sulfide toxic gas",
    "ESD": "Emergency Shutdown system",
    "PPE": "Personal Protective Equipment",
    "LEL": "Lower Explosive Limit combustible gas",
    "JSA": "Job Safety Analysis",
    "SCBA": "Self Contained Breathing Apparatus",
    "MCC": "Motor Control Center electrical room"
}

def clean_and_normalize(text: str) -> str:
    """Cleans narrative text and expands common oilfield HSE acronyms."""
    if not text:
        return ""
    cleaned = text.strip()
    # Normalize whitespaces
    cleaned = re.sub(r"\s+", " ", cleaned)
    return cleaned

def expand_acronyms(text: str) -> str:
    """Expands domain acronyms to ensure context preservation in NLP models."""
    words = text.split()
    expanded = []
    for w in words:
        clean_w = re.sub(r"[^A-Za-z0-9]", "", w).upper()
        if clean_w in ACRONYM_MAP:
            expanded.append(f"{w} ({ACRONYM_MAP[clean_w]})")
        else:
            expanded.append(w)
    return " ".join(expanded)
