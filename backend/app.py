from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

from ai.rules.rule_engine import interpret_risk

app = Flask(__name__)
CORS(app)

# =========================
# GaiaBreath ML model
# =========================
model = joblib.load("ai/models/model.pkl")
scaler = joblib.load("ai/models/scaler.pkl")

# =========================
# AQI personalized model
# =========================
aqi_model = joblib.load("health_risk_model.pkl")
aqi_le = joblib.load("label_encoder.pkl")


@app.route("/", methods=["GET"])
def health():
    return jsonify({"status":"ok","message":"GaiaBreath AI running"})


# =========================
# OLD endpoint
# =========================
@app.route("/api/ai/predict", methods=["POST"])
def predict():
    data = request.json or {}

    aqi=float(data["aqi"])
    temperature=float(data["temperature"])
    humidity=float(data["humidity"])

    X=np.array([[aqi,temperature,humidity]])
    X_scaled=scaler.transform(X)

    risk_level=int(model.predict(X_scaled)[0])

    rule_data=interpret_risk(
        risk_level,
        aqi=aqi,
        temperature=temperature,
        humidity=humidity
    )

    return jsonify({
        "risk_level":risk_level,
        "risk_label":rule_data["label"],
        "health_effects":rule_data["health_effects"],
        "precautions":rule_data["precautions"],
        "outdoor_travel":rule_data["outdoor_travel"],
        "transport_recommendation":rule_data["transport"],
        "air_purifier_required":rule_data["purifier"]
    })


# =========================
# AQI PERSONALIZED
# =========================
def adjust_risk(risk,age):
    levels=["Low","Mild","Moderate","High","Severe"]

    if age<12 or age>50:
        if risk in levels and risk!="Severe":
            return levels[levels.index(risk)+1]

    return risk


def suggestion(risk):
    if risk=="Low":
        return "Safe outdoor activity"
    if risk=="Moderate":
        return "Limit outdoor exposure"
    if risk=="High":
        return "Avoid outdoor activity"
    if risk=="Severe":
        return "Stay indoors"
    return ""


@app.route("/api/aqi/predict",methods=["POST"])
def aqi_predict():

    data=request.json
    age=data.pop("age")

    sample=pd.DataFrame([data])

    pred=aqi_model.predict(sample)
    base=aqi_le.inverse_transform(pred)[0]

    final=adjust_risk(base,age)

    return jsonify({
        "base_risk":base,
        "final_risk":final,
        "suggestion":suggestion(final)
    })


if __name__=="__main__":
    app.run(debug=True)