import json
import random
import os
from datetime import datetime, timedelta

LOCATIONS = [
    "Duliajan Central Rig-12",
    "Digboi Historical Field Station",
    "Naharkatiya Well-Site 4A",
    "Bokakhat Pipeline Junction-9",
    "Rajasthan Basin Rig-07",
    "Upper Assam Exploratory Block-3",
    "Moran Production Facility",
    "Jorhat Compressor Station-2",
    "Kumchai Exploration Pad",
    "Shalmari Gathering Station"
]

ACTIVITIES = [
    "Drilling",
    "Well Servicing",
    "Maintenance",
    "Lifting Operations",
    "Welding & Hot Work",
    "Electrical Work",
    "Pipeline Integrity Inspection",
    "Excavation",
    "Confined Space Entry",
    "Working at Height",
    "Vehicle Movement",
    "Chemical Handling"
]

REPORT_TYPES = ["Near Miss", "Unsafe Condition", "Unsafe Act"]

HIGH_SIF_TEMPLATES = [
    {
        "activity": "Lifting Operations",
        "hazard": "Suspended Load",
        "rule": "Safe Mechanical Lifting",
        "barrier": "Exclusion Zone Barricading",
        "barrier_status": "Failed",
        "actual": "No injury",
        "potential": "Fatality",
        "narratives": [
            "During crane lifting of a {weight} kg drill collar at {loc}, the rigging sling slipped unexpectedly. The load dropped 3 meters into the active work zone. The barricading was not in place, and a technician standing 1.5 meters away had to dive aside. No injury occurred.",
            "A mobile crane was hoisting a {weight} kg spool piece at {loc}. The tagline snapped due to excessive wear and the pipe swung violently into the pathway where two workers were walking. No barricade or banksman was stationed. No one was hurt.",
            "Heavy valve weighing {weight} kg slipped out of the web sling during crane movement at {loc}. Load fell directly into the walkway. Personnel had entered the drop zone just seconds prior because no warning signs or physical barriers were deployed. Zero injury recorded."
        ]
    },
    {
        "activity": "Confined Space Entry",
        "hazard": "Toxic Gas & Oxygen Deficiency (H2S)",
        "rule": "Confined Space",
        "barrier": "Atmospheric Gas Testing",
        "barrier_status": "Failed",
        "actual": "First aid",
        "potential": "Multiple fatality potential",
        "narratives": [
            "Technician entered crude oil separator tank at {loc} without atmospheric gas testing or ventilation verification. After 2 minutes, worker experienced acute dizziness and throat irritation from trapped H2S pockets. Worker scrambled out and received oxygen therapy. PTW controls were bypassed.",
            "Two operators entered an underground valve pit at {loc} to conduct visual inspection. Gas monitor was left outside on the vehicle tailgate. Workers felt sudden shortness of breath due to nitrogen accumulation. Exited pit immediately without formal rescue deployed.",
            "Maintenance team entered crude storage vessel at {loc} without continuous multi-gas monitor. Flammable vapors were detected only after portable combustible meter alarmed at 45% LEL. Hot work permit had not verified pre-entry purging."
        ]
    },
    {
        "activity": "Electrical Work",
        "hazard": "High Voltage Electrical Energy",
        "rule": "Energy Isolation",
        "barrier": "Lockout / Tagout (LOTO)",
        "barrier_status": "Bypassed",
        "actual": "No injury",
        "potential": "Fatality",
        "narratives": [
            "Electrician began replacing a 415V breaker panel at {loc}. Isolator switch had not been locked out (LOTO bypassed) due to missing padlock. A colleague energized the upstream feed from MCC room. Electrician noticed high-voltage sparking upon touching screwdriver to terminal and pulled back instantly. Zero injuries.",
            "During pump motor maintenance at {loc}, mechanical technician unbolted motor coupling while 3.3kV main supply was still live. Lockout tagout was incomplete; breaker handle was tagged but not physically padlocked. Breaker remained closed. No shock sustained due to insulated dry matting.",
            "Instrument technician opened junction box at {loc} assuming circuit was isolated. Multimeter showed live 240V AC. Permit to Work isolation certificate was marked completed but actual breaker was never tripped. Technician avoided contact."
        ]
    },
    {
        "activity": "Working at Height",
        "hazard": "Fall from Height",
        "rule": "Working at Height",
        "barrier": "Fall Arrest Harness & Anchorage",
        "barrier_status": "Missing",
        "actual": "Minor injury",
        "potential": "Fatality",
        "narratives": [
            "Rigger climbed to derrick monkey board at {loc} at height of 18 meters without hooking twin lanyards. Grating section was unbolted and tilted under foot. Rigger managed to grab structural beam with both hands and sustained sprained wrist. No fall occurred.",
            "Scaffolder standing at 6-meter platform on mud tank at {loc} worked without safety harness 100% tie-off. Mid-rail kickplate was missing and scaffolder slipped on slick oily planks, arresting self on diagonal brace. Minor bruised shin, no loss of life.",
            "Painter working on pipe rack elevation (8 meters) at {loc} unhooked harness to bypass conduit obstruction. Step ladder shifted on wet surface. Worker clung to overhead pipe until co-workers brought extension ladder. No injury recorded."
        ]
    },
    {
        "activity": "Drilling",
        "hazard": "High Pressure Wellbore Fluid",
        "rule": "Line of Fire",
        "barrier": "Pressure Relief & Whip-Check",
        "barrier_status": "Failed",
        "actual": "No injury",
        "potential": "Fatality",
        "narratives": [
            "During mud pump pressure testing up to 3500 PSI at {loc}, high-pressure hammer union failed catastrophically. The discharge hose flailed violently across the rig sub-structure. Safety whip-check cable was disconnected. Three drill crew members were standing 3 meters away behind steel stanchion. No injury.",
            "Standpipe manifold valve pack ruptured under 2800 PSI circulating pressure at {loc}. Heavy steel valve cover blew off and struck mast leg 1 meter above driller console. No protective blast shield installed. Driller was inside cabin.",
            "Choke line connection blew out during high-pressure well integrity test at {loc}. Pressurized drilling fluid and metal fragments sprayed across the cellar. Exclusion perimeter was not demarcated. Roughneck was walking nearby but escaped unhit."
        ]
    },
    {
        "activity": "Welding & Hot Work",
        "hazard": "Flammable Gas Vapor & Fire",
        "rule": "Hot Work",
        "barrier": "Continuous Gas Monitoring & Spark Containment",
        "barrier_status": "Failed",
        "actual": "Equipment damage",
        "potential": "Multiple fatality potential",
        "narratives": [
            "Contract welder struck arc on structural skid at {loc} while an unvented gas bleed valve 4 meters away was venting hydrocarbon vapors. Flash fire occurred for 3 seconds across weld blanket. Fire watch extinguished flare using dry chemical. Continuous hydrocarbon detection was not stationed.",
            "Grinding sparks from pipeline header repair at {loc} flew through gaps in fire blanket into open drain trench where condensate had accumulated. Small explosion and fire flash in trench extinguished quickly. Flame screen barrier was improperly sealed.",
            "Oxy-acetylene cutting carried out adjacent to crude manifold at {loc}. Spark containment habitat was missing bottom skirt. Slag ignited oily rag pile underneath. Hot work permit lacked cold-cut verification for hazardous zone."
        ]
    },
    {
        "activity": "Pipeline Integrity Inspection",
        "hazard": "Pressurized Hydrocarbon Release",
        "rule": "Line of Fire",
        "barrier": "Positive Depressurization & Bleed-off",
        "barrier_status": "Failed",
        "actual": "No injury",
        "potential": "Serious injury",
        "narratives": [
            "Pipeline crew began loosening 12-inch flange bolts on trunk line at {loc}. Trapped pressurized gas blew out remaining gasket with loud sonic bang, spraying rust debris across workspace. Line had not been verified zero-pressure through drain vent. Crew had safety glasses on; no eye trauma.",
            "Pig receiver door at {loc} was partially unlatched while 40 PSI residual pressure remained locked in the barrel. Door swung open violently under pressure, shearing safety latch. Operator was positioned outside door swing arc by luck. Pressure gauge was broken and read zero.",
            "Excavator tooth struck 6-inch gas pipeline casing at {loc} during ditch clearance. Deep gouge formed on pipe wall. Trench excavation permit did not execute manual potholing / cable detection scan prior to machine dig. No rupture occurred."
        ]
    }
]

LOW_SIF_TEMPLATES = [
    {
        "activity": "Maintenance",
        "hazard": "Housekeeping & Minor Trip Hazard",
        "rule": "Personal Protective Equipment",
        "barrier": "Housekeeping Procedure",
        "barrier_status": "Weak",
        "actual": "No injury",
        "potential": "Minor injury",
        "narratives": [
            "Observer noted garden hose left coiled across pedestrian walkway outside office entrance at {loc}. Hose was rolled up and moved to storage. No tripping incident occurred.",
            "Minor oil drip from valve packing gland noticed on concrete pad at {loc}. Drip tray placed underneath and area wiped with absorbent pad. No slip hazard to foot traffic.",
            "A pile of discarded wooden packaging pallets was left stacked unevenly near the warehouse gate at {loc}. Warehouse supervisor arranged re-stacking on ground level. Area clear of hazards."
        ]
    },
    {
        "activity": "Chemical Handling",
        "hazard": "Minor Chemical Splash",
        "rule": "Personal Protective Equipment",
        "barrier": "PPE (Safety Goggles / Face Shield)",
        "barrier_status": "Effective",
        "actual": "No damage",
        "potential": "No significant consequence",
        "narratives": [
            "During routine battery water topping at {loc}, worker was wearing full chemical apron, face shield, and rubber gloves. A droplet of distilled water splashed onto apron. Proper PPE prevented any contact.",
            "A detergent cleaning solution bottle was stored without its cap on cleaning bench in mud lab at {loc}. Cap was screwed on tightly. No fumes or spills observed.",
            "Safety shower eyewash station at {loc} was tested during morning audit. Water pressure was slightly low due to inline filter silt. Maintenance serviced the strainer within 1 hour."
        ]
    },
    {
        "activity": "Vehicle Movement",
        "hazard": "Low Speed Vehicle Parking",
        "rule": "Driving Safety",
        "barrier": "Wheel Chocks",
        "barrier_status": "Weak",
        "actual": "No damage",
        "potential": "Minor injury",
        "narratives": [
            "Pickup vehicle was parked in designated parking bay at {loc} on flat asphalt without wheel chocks deployed. Handbrake was firmly engaged. Driver was reminded of facility chock rule and deployed chocks.",
            "Security patrol vehicle was driven at 22 km/h in a 20 km/h posted zone along {loc} perimeter road. Driver counselled by safety officer; speed compliance reaffirmed.",
            "Utility pickup truck backed into designated loading dock at {loc} without sound alarm functioning properly. Banksman directed the reverse movement safely. Vehicle sent for beeper repair."
        ]
    },
    {
        "activity": "Well Servicing",
        "hazard": "Ergonomics / Manual Handling",
        "rule": "Work Authorization / Other Controls",
        "barrier": "Lifting Ergonomic Guidelines",
        "barrier_status": "Effective",
        "actual": "No injury",
        "potential": "Minor injury",
        "narratives": [
            "Worker attempted to lift 25 kg box of pump packing alone at {loc}. Colleague intervened and executed two-person lift in accordance with safe manual handling standard. No strain occurred.",
            "Technician working at workbench in tool shed at {loc} observed poor lighting due to a dead fluorescent tube. Portable LED work light set up while electrician replaced fixture.",
            "Slight oil sheen noticed in rainwater drainage ditch near flare knock-out drum at {loc}. Absorbent boom was deployed across the discharge culvert to contain any trace oil. No environmental breach."
        ]
    }
]

def generate_dataset(num_records=2800, output_dir=None):
    if output_dir is None:
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        output_dir = os.path.join(base_dir, "data")
    os.makedirs(output_dir, exist_ok=True)
    
    records = []
    start_date = datetime(2025, 1, 1)
    
    num_high = int(num_records * 0.38)
    num_low = num_records - num_high
    report_counter = 10001
    
    for _ in range(num_high):
        tpl = random.choice(HIGH_SIF_TEMPLATES)
        loc = random.choice(LOCATIONS)
        weight = random.choice([350, 500, 750, 1200, 2400, 4500])
        narrative = random.choice(tpl["narratives"]).format(loc=loc, weight=weight)
        report_date = start_date + timedelta(days=random.randint(0, 450), hours=random.randint(6, 21), minutes=random.randint(0, 59))
        confidence = round(random.uniform(0.86, 0.98), 2)
        
        records.append({
            "report_id": f"OIL-HSSE-{report_date.year}-{report_counter}",
            "date": report_date.strftime("%Y-%m-%d %H:%M"),
            "location": loc,
            "activity": tpl["activity"],
            "report_type": random.choice(REPORT_TYPES),
            "narrative": narrative,
            "actual_consequence": tpl["actual"],
            "potential_consequence": tpl["potential"],
            "hazard_type": tpl["hazard"],
            "barrier_type": tpl["barrier"],
            "barrier_status": tpl["barrier_status"],
            "life_saving_rule": tpl["rule"],
            "sif_potential": True,
            "sif_confidence": confidence,
            "risk_level": "Critical" if tpl["potential"] == "Multiple fatality potential" else "High",
            "source": "Synthetic Research Dataset (OIL Calibrated)"
        })
        report_counter += 1
        
    for _ in range(num_low):
        tpl = random.choice(LOW_SIF_TEMPLATES)
        loc = random.choice(LOCATIONS)
        narrative = random.choice(tpl["narratives"]).format(loc=loc)
        report_date = start_date + timedelta(days=random.randint(0, 450), hours=random.randint(6, 21), minutes=random.randint(0, 59))
        confidence = round(random.uniform(0.08, 0.32), 2)
        
        records.append({
            "report_id": f"OIL-HSSE-{report_date.year}-{report_counter}",
            "date": report_date.strftime("%Y-%m-%d %H:%M"),
            "location": loc,
            "activity": tpl["activity"],
            "report_type": random.choice(REPORT_TYPES),
            "narrative": narrative,
            "actual_consequence": tpl["actual"],
            "potential_consequence": tpl["potential"],
            "hazard_type": tpl["hazard"],
            "barrier_type": tpl["barrier"],
            "barrier_status": tpl["barrier_status"],
            "life_saving_rule": tpl["rule"],
            "sif_potential": False,
            "sif_confidence": confidence,
            "risk_level": "Low" if tpl["potential"] == "No significant consequence" else "Medium",
            "source": "Synthetic Research Dataset (OIL Calibrated)"
        })
        report_counter += 1
        
    random.shuffle(records)
    
    # Save as JSON
    json_path = os.path.join(output_dir, "synthetic_reports.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(records, f, indent=2)
        
    # Also save as CSV
    import csv
    csv_path = os.path.join(output_dir, "synthetic_reports.csv")
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(records[0].keys()))
        writer.writeheader()
        writer.writerows(records)
        
    print(f"Generated {len(records)} synthetic reports at {json_path}")
    return records

if __name__ == "__main__":
    generate_dataset()
