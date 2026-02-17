import { useState } from "react";
import { getHealthRisk } from "../services/api";
import "./HealthAdvisor.css";

function HealthAdvisor() {
  const [inputs, setInputs] = useState({
    aqi: "",
    temperature: "",
    humidity: "",
  });

  // ✅ SAFE DEFAULT SHAPE
  const [result, setResult] = useState({
    health_effects: [],
    precautions: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const analyze = async () => {
    setLoading(true);
    setResult({
      health_effects: [],
      precautions: [],
    });

    try {
      const data = await getHealthRisk({
        aqi: Number(inputs.aqi),
        temperature: Number(inputs.temperature),
        humidity: Number(inputs.humidity),
      });

      setResult(data);
    } catch (err) {
      console.error("Prediction error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="advisor-page">
      <div className="advisor-card">
        {/* HEADER */}
        <div className="advisor-header">
          <div className="ai-core" />
          <h2>GaiaBreath Health Advisor</h2>
          <p>AI-powered Air Quality Health Analysis</p>
        </div>

        {/* INPUTS */}
        <div className="advisor-inputs">
          <input
            name="aqi"
            placeholder="AQI"
            onChange={handleChange}
          />
          <input
            name="temperature"
            placeholder="Temperature (°C)"
            onChange={handleChange}
          />
          <input
            name="humidity"
            placeholder="Humidity (%)"
            onChange={handleChange}
          />

          <button onClick={analyze}>
            {loading ? "Analyzing..." : "Analyze Health Risk"}
          </button>
        </div>

        {/* RESULT */}
        {(result.risk_label || result.health_effects.length > 0) && (
          <div className="advisor-result">
            {result.risk_label && <h3>{result.risk_label}</h3>}

            <div className="result-block">
              <strong>Health Effects</strong>
              <ul>
                {Array.isArray(result.health_effects) &&
                  result.health_effects.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
              </ul>
            </div>

            <div className="result-block">
              <strong>Precautions</strong>
              <ul>
                {Array.isArray(result.precautions) &&
                  result.precautions.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
              </ul>
            </div>

            <div className="result-grid">
              <div>
                <span>Outdoor Travel</span>
                <p>{result.outdoor_travel || "—"}</p>
              </div>
              <div>
                <span>Transport</span>
                <p>{result.transport_recommendation || "—"}</p>
              </div>
              <div>
                <span>Air Purifier</span>
                <p>
                  {result.air_purifier_required
                    ? "Recommended"
                    : "Not Required"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HealthAdvisor;
