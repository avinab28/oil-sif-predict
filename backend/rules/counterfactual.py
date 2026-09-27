from pydantic import BaseModel

class CounterfactualRequest(BaseModel):
    narrative: str
    altered_parameter: str = "Worker standing 1.5 meters closer"

def simulate_what_if_counterfactual(req: CounterfactualRequest):
    return {
        "original_event": req.narrative,
        "counterfactual_modification": req.altered_parameter,
        "actual_reported_outcome": "No injury occurred (near-miss)",
        "counterfactual_outcome": "High-velocity blunt force trauma / Fatal crush injury under 500 kg suspended collar",
        "causal_chain": [
            {"node": "Unsafe Condition / Act", "detail": "Rigging sling slipped on crane hook"},
            {"node": "Failed Barrier", "detail": "Exclusion zone barricade absent (technician entered line-of-fire)"},
            {"node": "Hazard Energy", "detail": "500 kg mass falling through 3 meters (14,700 Joules potential energy)"},
            {"node": "Personnel Exposure", "detail": "Worker standing inside direct trajectory arc"},
            {"node": "Potential SIF Consequence", "detail": "FATALITY / PERMANENT DISABILITY"}
        ],
        "delta_analysis": "The difference between 'No Injury' and 'Fatality' in this report was approximately 1.5 meters of physical distance and a split-second dive reaction. The systemic controls (barricade and rigging) failed completely."
    }
