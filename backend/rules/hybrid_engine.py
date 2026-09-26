"""
Hybrid SIF Classification Engine
Fuses ML Classifier Probability + Safety Rule Engine + Barrier Detection + Hazard Weighting.
"""

from backend.nlp.classifier import predict_ml
from backend.rules.iogp_rules import detect_life_saving_rule
from backend.rules.barriers import analyze_barriers
from backend.nlp.explainability import extract_highlight_spans, generate_evidence_checklist

def evaluate_report_sif(narrative: str, actual_consequence: str = "No injury"):
    """
    Evaluates free-text safety report and outputs full explainable SIF precursor intelligence.
    Demonstrates: Actual Consequence != Potential Consequence.
    """
    lower = narrative.lower()
    
    # 1. Machine Learning Baseline Probability
    ml_res = predict_ml(narrative)
    ml_prob = ml_res["ml_probability"]
    
    # 2. IOGP Life-Saving Rule Mapping
    rule_data = detect_life_saving_rule(narrative)
    
    # 3. Safety Barrier Analysis
    barriers = analyze_barriers(narrative)
    barrier_failed = any(b["status"] in ["FAILED", "AT RISK"] for b in barriers)
    
    # 4. Energy & Exposure Heuristics
    has_high_energy = any(w in lower for w in [
        "kg", "ton", "crane", "suspended", "drill collar", "valve", "spool",
        "psi", "3500", "2800", "pressure", "ruptured", "blew out",
        "h2s", "confined", "gas test", "separator", "415v", "3.3kv", "loto",
        "monkey board", "18 meters", "8 meters", "derrick", "welding", "flash fire"
    ])
    
    has_exposure = any(w in lower for w in [
        "entered the area below", "standing", "walkway", "drop zone",
        "technician", "worker", "roughneck", "scaffolder", "operator",
        "inside", "clung", "dive aside", "pulled back"
    ])
    
    # 5. Hybrid Calibration Scoring
    # SIF Score = ML probability + Domain Weightings
    score = ml_prob * 0.65
    if has_high_energy:
        score += 0.15
    if has_exposure:
        score += 0.10
    if barrier_failed:
        score += 0.10
        
    score = min(0.99, max(0.04, score))
    
    # Classify SIF Potential
    is_sif = score >= 0.52
    if has_high_energy and has_exposure and barrier_failed:
        is_sif = True
        score = max(score, 0.88)
        
    # Rating category
    if score >= 0.75:
        sif_potential_label = "HIGH"
        risk_level = "High"
    elif score >= 0.45:
        sif_potential_label = "MEDIUM"
        risk_level = "Medium"
    else:
        sif_potential_label = "LOW"
        risk_level = "Low"
        
    # Determine Potential Consequence
    if is_sif:
        if any(w in lower for w in ["h2s", "fire", "explosion", "3.3kv", "confined"]):
            potential_consequence = "Multiple Fatality Potential"
            risk_level = "Critical"
        else:
            potential_consequence = "Serious Injury / Fatality"
    else:
        potential_consequence = "Minor Injury / No Lost Time"
        
    # XAI Spans and Evidence Checklist
    spans = extract_highlight_spans(narrative)
    checklist = generate_evidence_checklist(narrative, is_sif, rule_data["primary_rule"])
    
    return {
        "sif_potential": is_sif,
        "sif_potential_label": sif_potential_label,
        "confidence_percentage": int(round(score * 100)),
        "confidence_raw": round(score, 3),
        "actual_consequence": actual_consequence,
        "potential_consequence": potential_consequence,
        "risk_level": risk_level,
        "life_saving_rule": rule_data,
        "barriers": barriers,
        "highlight_spans": spans,
        "evidence_checklist": checklist,
        "ml_probability": ml_prob,
        "scoring_breakdown": {
            "ml_base_weight": round(ml_prob * 0.65, 3),
            "high_energy_bonus": 0.15 if has_high_energy else 0.0,
            "exposure_bonus": 0.10 if has_exposure else 0.0,
            "barrier_failure_bonus": 0.10 if barrier_failed else 0.0,
            "total_score": round(score, 3)
        },
        "academic_disclaimer": "The report contains characteristics associated with SIF potential. Predictions prioritize high recall to alert safety personnel."
    }
