def get_safety_knowledge_graph():
    nodes = [
        # Sites
        {"id": "site_duliajan", "label": "Duliajan Central Rig-12", "category": "Site", "color": "#0F172A", "size": 24},
        {"id": "site_digboi", "label": "Digboi Historical Field", "category": "Site", "color": "#0F172A", "size": 22},
        {"id": "site_naharkatiya", "label": "Naharkatiya Well-Site 4A", "category": "Site", "color": "#0F172A", "size": 22},
        {"id": "site_rajasthan", "label": "Rajasthan Basin Rig-07", "category": "Site", "color": "#0F172A", "size": 22},
        
        # Activities
        {"id": "act_lifting", "label": "Lifting Operations", "category": "Activity", "color": "#70533C", "size": 18},
        {"id": "act_confined", "label": "Confined Space Entry", "category": "Activity", "color": "#70533C", "size": 18},
        {"id": "act_electrical", "label": "Electrical Maintenance", "category": "Activity", "color": "#70533C", "size": 18},
        {"id": "act_drilling", "label": "Drilling & High Pressure", "category": "Activity", "color": "#70533C", "size": 18},
        
        # Hazards
        {"id": "haz_suspended", "label": "Suspended Tubular Mass (>500kg)", "category": "Hazard", "color": "#8A1A2C", "size": 20},
        {"id": "haz_h2s", "label": "H2S Toxic Gas Pockets", "category": "Hazard", "color": "#8A1A2C", "size": 20},
        {"id": "haz_voltage", "label": "415V/3.3kV High Voltage", "category": "Hazard", "color": "#8A1A2C", "size": 20},
        {"id": "haz_pressure", "label": "3500 PSI Circulating Pressure", "category": "Hazard", "color": "#8A1A2C", "size": 20},
        
        # Barriers
        {"id": "bar_barricade", "label": "Drop Zone Exclusion Barricade", "category": "Barrier", "color": "#9E2A4B", "size": 16},
        {"id": "bar_gastest", "label": "Continuous Multi-Gas Monitor", "category": "Barrier", "color": "#9E2A4B", "size": 16},
        {"id": "bar_loto", "label": "Lockout/Tagout Padlock", "category": "Barrier", "color": "#9E2A4B", "size": 16},
        {"id": "bar_whipcheck", "label": "Safety Whip-Check Cable", "category": "Barrier", "color": "#9E2A4B", "size": 16},
        
        # SIF Rules
        {"id": "rule_lift", "label": "Safe Mechanical Lifting", "category": "SIF_Rule", "color": "#4A0E17", "size": 22},
        {"id": "rule_confined", "label": "Confined Space Standard", "category": "SIF_Rule", "color": "#4A0E17", "size": 22},
        {"id": "rule_isolation", "label": "Energy Isolation Protocol", "category": "SIF_Rule", "color": "#4A0E17", "size": 22},
        {"id": "rule_lineoffire", "label": "Line of Fire Rule", "category": "SIF_Rule", "color": "#4A0E17", "size": 22}
    ]
    
    links = [
        {"source": "site_duliajan", "target": "act_lifting"},
        {"source": "act_lifting", "target": "haz_suspended"},
        {"source": "haz_suspended", "target": "bar_barricade"},
        {"source": "bar_barricade", "target": "rule_lift"},
        
        {"source": "site_digboi", "target": "act_confined"},
        {"source": "act_confined", "target": "haz_h2s"},
        {"source": "haz_h2s", "target": "bar_gastest"},
        {"source": "bar_gastest", "target": "rule_confined"},
        
        {"source": "site_naharkatiya", "target": "act_electrical"},
        {"source": "act_electrical", "target": "haz_voltage"},
        {"source": "haz_voltage", "target": "bar_loto"},
        {"source": "bar_loto", "target": "rule_isolation"},
        
        {"source": "site_rajasthan", "target": "act_drilling"},
        {"source": "act_drilling", "target": "haz_pressure"},
        {"source": "haz_pressure", "target": "bar_whipcheck"},
        {"source": "bar_whipcheck", "target": "rule_lineoffire"}
    ]
    
    return {"nodes": nodes, "links": links}

def get_cross_site_patterns():
    return [
        {
            "pattern_name": "Recurrent Drop Zone Infiltration Across Drilling Assets",
            "hazard": "Suspended Tubular Handling",
            "sites_affected": ["Duliajan Central Rig-12", "Rajasthan Basin Rig-07", "Upper Assam Block-3"],
            "precursor_frequency": 42,
            "root_barrier": "Exclusion Zone Perimeter Tape Deficit",
            "systemic_insight": "Common contractor rigging crews rotate between Assam and Rajasthan using non-standardized barricade demarcation."
        },
        {
            "pattern_name": "LOTO Lockout Padlock Deficits During Emergency Pump Servicing",
            "hazard": "Live 415V MCC Switchboards",
            "sites_affected": ["Moran Production Facility", "Naharkatiya Well-Site 4A"],
            "precursor_frequency": 28,
            "root_barrier": "Missing Padlock Hardware in Field Utility Trucks",
            "systemic_insight": "Contract technicians carrying tags but lacking physical brass padlocks required by OIL safety standard."
        }
    ]
