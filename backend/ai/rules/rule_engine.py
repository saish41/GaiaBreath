def interpret_risk(risk_level, aqi, temperature, humidity):
    health_effects = []
    precautions = []

    # --- Base risk interpretation ---
    if risk_level == 0:
        label = "Safe"
        outdoor_travel = "Safe"
        transport = "Any"
        purifier = False

    elif risk_level == 1:
        label = "Mild Risk"
        outdoor_travel = "Generally safe"
        transport = "Any"
        purifier = False

    elif risk_level == 2:
        label = "Moderate Risk"
        outdoor_travel = "Caution advised"
        transport = "Public transport acceptable"
        purifier = False

    elif risk_level == 3:
        label = "High Risk"
        outdoor_travel = "Not recommended"
        transport = "Cab only"
        purifier = True

    else:
        label = "Severe Risk"
        outdoor_travel = "Avoid"
        transport = "Emergency only"
        purifier = True

    # --- PERSONALIZED HEALTH EFFECTS ---
    if aqi > 150:
        health_effects.append("Breathing discomfort and throat irritation")

    if aqi > 200:
        health_effects.append("High risk for asthma and respiratory patients")

    if temperature > 35:
        health_effects.append("Heat stress combined with polluted air")

    if humidity > 70:
        health_effects.append("High humidity worsens breathing difficulty")

    if not health_effects:
        health_effects.append("No noticeable health effects")

    # --- PERSONALIZED PRECAUTIONS ---
    if aqi > 150:
        precautions.append("Limit outdoor exposure")

    if aqi > 200:
        precautions.append("Wear an N95 mask")

    if temperature > 35:
        precautions.append("Stay hydrated and avoid midday outdoor activity")

    if humidity > 70:
        precautions.append("Ensure good indoor ventilation")

    if purifier:
        precautions.append("Use air purifier indoors")

    if not precautions:
        precautions.append("Normal activities are safe")

    return {
        "label": label,
        "health_effects": health_effects,
        "precautions": precautions,
        "outdoor_travel": outdoor_travel,
        "transport": transport,
        "purifier": purifier
    }
def interpret_risk(risk_level):
    if risk_level == 0:
        return {
            "label": "Safe",
            "health_effects": [
                "No noticeable health effects"
            ],
            "precautions": [
                "Normal activities are safe"
            ],
            "outdoor_travel": "Safe",
            "transport": "Any",
            "purifier": False
        }
    elif risk_level == 1:
        return {
            "label": "Mild Risk",
            "health_effects": [
                "Minor breathing discomfort for sensitive individuals"
            ],
            "precautions": [
                "Limit prolonged outdoor exertion if sensitive"
            ],
            "outdoor_travel": "Generally safe",
            "transport": "Any",
            "purifier": False
        }
    elif risk_level == 2:
        return {
            "label": "Moderate Risk",
            "health_effects": [
                "Breathing discomfort and throat irritation"
            ],
            "precautions": [
                "Limit outdoor exposure",
                "Consider wearing a mask"
            ],
            "outdoor_travel": "Caution advised",
            "transport": "Public transport acceptable",
            "purifier": False
        }
    elif risk_level == 3:
        return {
            "label": "High Risk",
            "health_effects": [
                "Increased respiratory symptoms",
                "High risk for asthma and respiratory patients"
            ],
            "precautions": [
                "Avoid outdoor activities",
                "Wear an N95 mask when outside"
            ],
            "outdoor_travel": "Not recommended",
            "transport": "Cab only",
            "purifier": True
        }
    else:
        return {
            "label": "Severe Risk",
            "health_effects": [
                "Severe respiratory distress",
                "Aggravation of heart or lung diseases"
            ],
            "precautions": [
                "Stay indoors with air purification",
                "Seek medical advice if symptoms occur"
            ],
            "outdoor_travel": "Avoid",
            "transport": "Emergency only",
            "purifier": True
        }
