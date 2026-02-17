function HeroBlock() {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>
          Every Breath,
          <br />
          <span>Protected by Intelligence</span>
        </h1>

        <p>
          GaiaBreath continuously monitors air quality and helps you
          understand what you breathe with real-time insights and
          intelligent analysis.
        </p>

        <div className="hero-buttons">
          <a href="/healthadvisor">
            <button className="btn-primary">HealthAdvisor</button>
          </a>
          <button className="btn-secondary">Our Mission</button>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
            alt="Clean air"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroBlock;
