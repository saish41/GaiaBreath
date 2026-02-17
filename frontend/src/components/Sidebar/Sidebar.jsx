import { useNavigate } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <aside
        className="sidebar sidebar-open"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="sidebar-title">MENU</h2>

        <div className="sidebar-item">🗺️ AQI Map</div>

        {/* ✅ THIS IS THE ONLY IMPORTANT CHANGE */}
        <div
          className="sidebar-item"
          onClick={() => {
            navigate("/healthadvisor");
            onClose();
          }}
          style={{ cursor: "pointer" }}
        >
          🤖 Health Advisor
        </div>

        <div className="sidebar-item">📊 Community Dashboard</div>
        <div className="sidebar-item">🧑‍⚕️ Health Report</div>
        <div className="sidebar-item">⚡ IoT AQI Report</div>

        <button className="sidebar-close" onClick={onClose}>
          Close Menu
        </button>
      </aside>
    </div>
  );
}

export default Sidebar;
