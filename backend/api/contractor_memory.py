def get_contractor_scorecards():
    return [
        {
            "contractor_id": "CNT-OIL-01",
            "contractor_name": "Apex Drilling & Workover Services",
            "active_sites": ["Duliajan Central Rig-12", "Kumchai Exploration Pad"],
            "total_observations": 184,
            "sif_precursor_count": 28,
            "sif_precursor_rate": "15.2%",
            "top_recurring_hazard": "Suspended Tubular Handling",
            "primary_barrier_failure": "Exclusion Zone Barricading (14 breaches)",
            "corrective_action_closure_rate": "72%",
            "supervision_status": "ENHANCED_SUPERVISION_RECOMMENDED",
            "status_color": "amber",
            "rationale": "High recurring line-of-fire breaches under crane loads across 2 active assets."
        },
        {
            "contractor_id": "CNT-OIL-02",
            "contractor_name": "Brahmaputra Pipeline & Mechanical Ltd",
            "active_sites": ["Bokakhat Pipeline Junction-9", "Moran Facility"],
            "total_observations": 210,
            "sif_precursor_count": 12,
            "sif_precursor_rate": "5.7%",
            "top_recurring_hazard": "Pressurized Flange Maintenance",
            "primary_barrier_failure": "Positive Bleed Verification",
            "corrective_action_closure_rate": "96%",
            "supervision_status": "STANDARD_SUPERVISION",
            "status_color": "emerald",
            "rationale": "Prompt closure of corrective actions; zero recurring LOTO breaches."
        },
        {
            "contractor_id": "CNT-OIL-03",
            "contractor_name": "Eastern Electrical Power Solutions",
            "active_sites": ["Naharkatiya Well-Site 4A", "Digboi Field"],
            "total_observations": 95,
            "sif_precursor_count": 22,
            "sif_precursor_rate": "23.1%",
            "top_recurring_hazard": "415V MCC Breakers & Junctions",
            "primary_barrier_failure": "LOTO Lockout Hardware Missing",
            "corrective_action_closure_rate": "58%",
            "supervision_status": "MANDATORY_SAFETY_AUDIT_REQUIRED",
            "status_color": "rose",
            "rationale": "Critical isolation failures recorded 3 times in past 60 days. Immediate vendor management intervention required."
        }
    ]

def get_similar_historical_cases(hazard: str = "Suspended Load"):
    return [
        {
            "case_id": "OIL-HIST-2023-041",
            "title": "700kg Drill Pipe Dropped During Hoisting at Digboi",
            "actual_outcome": "Near-Miss (Personnel cleared drop zone 2 seconds prior)",
            "potential_outcome": "Double Fatality",
            "validated_corrective_action": "Mandatory interlocked gate barriers replacing loose barricade tape; remote release hooks standardized.",
            "relevance_score": "96% Semantic Similarity"
        },
        {
            "case_id": "OIL-HIST-2022-118",
            "title": "Tagline Snapped on 12-inch Spool at Moran",
            "actual_outcome": "Minor shin bruise",
            "potential_outcome": "Crush Injury / Permanent Disability",
            "validated_corrective_action": "Taglines upgraded to synthetic braided non-conductive rope with quarterly load certification.",
            "relevance_score": "88% Semantic Similarity"
        }
    ]

def generate_investigation_assistant_questions(narrative: str):
    return [
        {"step": "Phase 1: Physical Energy Verification", "question": "What was the exact verified load weight and drop height at the moment of sling shift?"},
        {"step": "Phase 2: Barrier Integrity Audit", "question": "Who was designated as the Banksman/Rigger-in-charge, and was 360-degree perimeter barricade confirmed?"},
        {"step": "Phase 3: Management of Change", "question": "Was there an unapproved substitution of web sling rigging gear prior to the lift?"},
        {"step": "Phase 4: Human Factors & Ergonomics", "question": "Did ambient noise or blind-spot crane operator obstruction contribute to line-of-fire entry?"}
    ]
