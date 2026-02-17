import { useState } from "react";
import logo from "../../assets/logo.png";

function Navbar({ onMenuClick }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className="navbar">
        <div className="nav-left">
          {/* MENU BUTTON → SIDEBAR */}
          <div
            className="menu-btn"
            onClick={onMenuClick}
            title="Open Menu"
          >
            ☰
          </div>

          <div className="brand">
            <img
              src={logo}
              alt="GaiaBreath logo"
              className="brand-logo"
            />
            <span className="brand-name">GaiaBreath</span>
          </div>
        </div>

        <nav className="nav-center">
          <a href="#">Home</a>
          <a href="#">About us</a>
          <a href="#">Contact</a>
        </nav>

        <div className="nav-right">
          <button
            className="login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        </div>
      </header>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div
          className="login-overlay"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="login-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Login</h3>

            <input type="file" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <div className="login-actions">
              <button className="btn-primary">Submit</button>
              <button
                className="btn-secondary"
                onClick={() => setShowLogin(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
