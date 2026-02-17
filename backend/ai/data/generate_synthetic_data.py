import pandas as pd
import numpy as np
import random

NUM_SAMPLES = 5000

data = []

def base_risk_from_aqi(aqi):
    if aqi <= 50:
        return 0
    elif aqi <= 100:
        return 1
    elif aqi <= 150:
        return 2
    elif aqi <= 200:
        return 3
    else:
        return 4

for _ in range(NUM_SAMPLES):
    # Generate realistic AQI
    aqi = random.randint(20, 350)

    # Temperature (°C)
    temperature = round(random.uniform(5, 45), 1)

    # Humidity (%)
    humidity = round(random.uniform(15, 90), 1)

    # Base risk
    risk = base_risk_from_aqi(aqi)

    # Temperature effect
    if temperature > 35 or temperature < 10:
        risk += 1

    # Humidity effect
    if humidity > 70 or humidity < 20:
        risk += 1

    # Clamp risk between 0 and 4
    risk = min(max(risk, 0), 4)

    # Map risk to label
    risk_map = {
        0: "safe",
        1: "mild",
        2: "moderate",
        3: "high",
        4: "severe"
    }

    data.append({
        "aqi": aqi,
        "temperature": temperature,
        "humidity": humidity,
        "health_effect": risk_map[risk]
    })

df = pd.DataFrame(data)

# Save dataset
df.to_csv("dataset.csv", index=False)

print("Synthetic dataset generated successfully!")
print(df.head())
