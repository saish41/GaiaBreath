import joblib
import numpy as np

# Load model & scaler
model = joblib.load("../models/model.pkl")
scaler = joblib.load("../models/scaler.pkl")

# Test samples (aqi, temp, humidity)
tests = [
    [40, 25, 50],     # Safe
    [90, 30, 60],     # Mild
    [130, 32, 65],    # Moderate
    [180, 35, 75],    # High
    [280, 38, 80]     # Severe
]

labels = ["Safe", "Mild", "Moderate", "High", "Severe"]

X = scaler.transform(tests)
preds = model.predict(X)

for t, p in zip(tests, preds):
    print(t, "→", labels[p])
