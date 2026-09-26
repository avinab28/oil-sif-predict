import os

PROJECT_NAME = "OIL SIF-PREDICT"
VERSION = "1.0.0-research"
DESCRIPTION = "AI/NLP Engine for Detecting Serious Injury & Fatality Precursors in OIL Safety Reports"
RESEARCH_DISCLAIMER = "Research prototype developed for Oil India Limited (OIL). Evaluated on calibrated synthetic and open research benchmarks. Not a replacement for statutory HSE decisions."

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
SYNTHETIC_DATA_PATH = os.path.join(DATA_DIR, "synthetic_reports.json")
