import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os

# Paths
DATA_PATH = "../data/dataset.csv"
MODEL_PATH = "../models/model.pkl"
SCALER_PATH = "../models/scaler.pkl"

# Load data
df = pd.read_csv(DATA_PATH)

# Encode labels
label_map = {
    "safe": 0,
    "mild": 1,
    "moderate": 2,
    "high": 3,
    "severe": 4
}
df["risk_level"] = df["health_effect"].map(label_map)

# Features & target
X = df[["aqi", "temperature", "humidity"]]
y = df["risk_level"]

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Scale
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Model
model = RandomForestClassifier(
    n_estimators=200,
    random_state=42,
    class_weight="balanced"
)

model.fit(X_train_scaled, y_train)

# Evaluate
y_pred = model.predict(X_test_scaled)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# Save
joblib.dump(model, MODEL_PATH)
joblib.dump(scaler, SCALER_PATH)

print("Model and scaler saved successfully.")
