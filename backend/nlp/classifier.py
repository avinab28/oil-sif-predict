"""
Machine Learning Classifier Pipeline
Trains and caches TF-IDF + Logistic Regression / SVM models for SIF precursor prediction.
"""

import os
import json
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.svm import LinearSVC
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import precision_recall_fscore_support, accuracy_score, roc_auc_score

MODELS = {}

def get_or_train_models(data_path=None):
    """Loads dataset and fits baseline models, caching them in memory."""
    global MODELS
    if "logistic_regression" in MODELS:
        return MODELS
        
    if data_path is None:
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        data_path = os.path.join(base_dir, "data", "synthetic_reports.json")
        
    if not os.path.exists(data_path):
        from backend.data.generator import generate_dataset
        generate_dataset(output_dir=os.path.dirname(data_path))
        
    with open(data_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    texts = [d["narrative"] for d in data]
    labels = [1 if d["sif_potential"] else 0 for d in data]
    
    X_train, X_test, y_train, y_test = train_test_split(texts, labels, test_size=0.25, random_state=42, stratify=labels)
    
    # 1. TF-IDF + Logistic Regression (calibrated with class weight for High Recall)
    pipe_lr = Pipeline([
        ("tfidf", TfidfVectorizer(max_features=4000, ngram_range=(1, 2), stop_words="english")),
        ("clf", LogisticRegression(class_weight={0: 1.0, 1: 1.5}, C=1.2, random_state=42))
    ])
    pipe_lr.fit(X_train, y_train)
    
    # 2. TF-IDF + Linear SVM
    pipe_svm = Pipeline([
        ("tfidf", TfidfVectorizer(max_features=4000, ngram_range=(1, 2), stop_words="english")),
        ("clf", LinearSVC(class_weight="balanced", C=1.0, random_state=42))
    ])
    pipe_svm.fit(X_train, y_train)
    
    MODELS["logistic_regression"] = pipe_lr
    MODELS["svm"] = pipe_svm
    MODELS["test_data"] = (X_test, y_test)
    print("Machine learning baseline pipelines successfully trained and cached.")
    return MODELS

def predict_ml(text: str):
    """Runs ML classifier inference."""
    models = get_or_train_models()
    lr = models["logistic_regression"]
    prob = lr.predict_proba([text])[0][1]
    is_sif = bool(prob >= 0.50)
    return {
        "ml_probability": round(float(prob), 3),
        "ml_prediction": is_sif
    }
