function FeaturesBlock() {
  return (
    <section className="features-section">
      <h2>Features of GaiaBreathAI</h2>

      <div className="features-grid">
        <div className="feature-card green">
          <span className="feature-icon">🗺️</span>
          <h3>Live AQI Map</h3>
          <p>Continuous tracking of air quality in real time.</p>
        </div>

        <div className="feature-card teal">
          <span className="feature-icon">🔔</span>
          <h3>Personal Safety Alerts</h3>
          <p>Instant notifications when air quality drops.</p>
        </div>

        <div className="feature-card blue">
          <span className="feature-icon">🤖</span>
          <h3>AI Chat Bot</h3>
          <p>AI-powered health advice based on AQI levels.</p>
        </div>

        <div className="feature-card mint">
          <span className="feature-icon">⚙️</span>
          <h3>IoT AQI Monitoring</h3>
          <p>IoT devices monitor live AQI data around you.</p>
        </div>

        <div className="feature-card rose">
          <span className="feature-icon">❤️</span>
          <h3>Health Reports</h3>
          <p>Daily exposure reports and health insights.</p>
        </div>

        <div className="feature-card slate">
          <span className="feature-icon">💬</span>
          <h3>Community Dashboard</h3>
          <p>Share updates and learn about local air quality.</p>
        </div>
      </div>
    </section>
  );
}

export default FeaturesBlock;
