def get_converging_precursors():
    return [
        {
            "id": "CONV-2026-GAS-01",
            "status": "CRITICAL_ALERT",
            "pattern_title": "Converging Gas-Release Precursor Indicators",
            "location": "Bokakhat Pipeline Junction-9 (Manifold Area B)",
            "time_window": "8-hour operating window",
            "converged_reports_count": 3,
            "weak_signals": [
                {
                    "worker": "Field Operator (08:15)",
                    "observation": "Minor bubbling observed in drain trench near crude manifold B.",
                    "isolated_severity": "Low / Routine"
                },
                {
                    "worker": "Maintenance Technician (11:40)",
                    "observation": "Subtle hissing sound noticed near 12-inch isolation flange.",
                    "isolated_severity": "Low / Housekeeping"
                },
                {
                    "worker": "HSE Inspector (14:10)",
                    "observation": "Faint hydrocarbon odor detected downwind during walkaround.",
                    "isolated_severity": "Low / Observation"
                }
            ],
            "synthesized_intelligence": "Three individually dismissed 'minor' observations converge into an active, escalating flange gasket seal degradation. Immediate high-pressure release potential.",
            "recommended_action": "HSE engineering team dispatched for ultrasonic leak detection and preemptive depressurization."
        }
    ]

def get_sif_escalation_trends():
    return {
        "hazard_category": "Energy Isolation & Lockout Deficits",
        "location": "Rajasthan Basin Exploratory Area",
        "timeline": [
            {"month": "January", "precursor_count": 3, "level": "Low"},
            {"month": "February", "precursor_count": 5, "level": "Moderate"},
            {"month": "March", "precursor_count": 9, "level": "Critical Escalation"}
        ],
        "trend_summary": "Precursor frequency tripled across 90 days. Indicates organizational drift in LOTO verification protocols before any fatal shock or arc-flash has occurred.",
        "alert_level": "ESCALATING_PRECURSOR_TREND"
    }

def get_ai_priority_queue():
    return [
        {
            "queue_rank": 1,
            "report_id": "OIL-HQ-9901",
            "title": "500kg Suspended Drill Collar Slipped into Active Way",
            "urgency": "IMMEDIATE REVIEW",
            "sif_score": 94,
            "hazard": "Suspended Load",
            "rule": "Safe Mechanical Lifting",
            "timestamp": "18 mins ago"
        },
        {
            "queue_rank": 2,
            "report_id": "OIL-HQ-9902",
            "title": "Confined Tank Entry Without Verified H2S Gas Testing",
            "urgency": "HIGH PRIORITY",
            "sif_score": 92,
            "hazard": "Toxic Atmosphere",
            "rule": "Confined Space",
            "timestamp": "45 mins ago"
        },
        {
            "queue_rank": 3,
            "report_id": "OIL-HQ-9903",
            "title": "415V Breaker Panel Replaced Without Physical Lockout",
            "urgency": "HIGH PRIORITY",
            "sif_score": 89,
            "hazard": "Live Electricity",
            "rule": "Energy Isolation",
            "timestamp": "1 hour ago"
        },
        {
            "queue_rank": 4,
            "report_id": "OIL-HQ-9904",
            "title": "High-Pressure Mud Hose Whip-Check Unlatched",
            "urgency": "MODERATE PRIORITY",
            "sif_score": 85,
            "hazard": "Stored Fluid Pressure",
            "rule": "Line of Fire",
            "timestamp": "3 hours ago"
        }
    ]
