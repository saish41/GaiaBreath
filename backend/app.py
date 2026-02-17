from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

from ai.rules.rule_engine import interpret_risk

app = Flask(__name__)
CORS(app)

# Load ML artifacts
model = joblib.load("ai/models/model.pkl")
scaler = joblib.load("ai/models/scaler.pkl")


@app.route("/", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "message": "GaiaBreath AI service running"
    })


@app.route("/api/ai/predict", methods=["POST"])
def predict():
    data = request.json or {}

    try:
        aqi = float(data["aqi"])
        temperature = float(data["temperature"])
        humidity = float(data["humidity"])
    except Exception:
        return jsonify({"error": "Invalid or missing inputs"}), 400

    # Prepare input
    X = np.array([[aqi, temperature, humidity]])
    X_scaled = scaler.transform(X)

    # ML prediction
    risk_level = int(model.predict(X_scaled)[0])

    # Rule-based interpretation
    rule_data = interpret_risk(
    risk_level,
    aqi=aqi,
    temperature=temperature,
    humidity=humidity
)


    # ✅ FULL CONSISTENT RESPONSE
    return jsonify({
        "risk_level": risk_level,
        "risk_label": rule_data["label"],
        "health_effects": rule_data["health_effects"],
        "precautions": rule_data["precautions"],
        "outdoor_travel": rule_data["outdoor_travel"],
        "transport_recommendation": rule_data["transport"],
        "air_purifier_required": rule_data["purifier"]
    })


if __name__ == "__main__":
    app.run(debug=True)
