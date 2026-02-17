import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import HeroBlock from "../components/HeroBlock/HeroBlock";
import MissionBlock from "../components/MissionBlock/MissionBlock";
import FeaturesBlock from "../components/FeaturesBlock/FeaturesBlock";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="landing-bg">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="hero-wrapper">
        <HeroBlock />
      </main>

      <MissionBlock />
      <FeaturesBlock />
    </div>
  );
}

export default Home;
