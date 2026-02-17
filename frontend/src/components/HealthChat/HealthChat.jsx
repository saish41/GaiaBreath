import { useState } from "react";
import { askAqiBot } from "../../services/api";

function HealthAdvisor({ onClose }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!question.trim()) return;

    setLoading(true);
    const res = await askAqiBot(question);
    setAnswer(res.answer);
    setLoading(false);
  }

  return (
    <div className="healthadvisor-overlay" onClick={onClose}>
      <div
        className="healthadvisor-card"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>GaiaBreath HealthAdvisor 🌱</h2>

        <textarea
          placeholder="Ask about AQI, health impact, precautions..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          className="btn-primary"
          onClick={handleAsk}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {answer && (
          <div className="healthadvisor-answer">
            <p>{answer}</p>
          </div>
        )}

        <button
          className="healthadvisor-close"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default HealthAdvisor;
