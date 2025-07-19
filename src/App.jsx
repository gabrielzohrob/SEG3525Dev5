import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import keyStats from './data/keyStats.js';
import Header from './components/Header.jsx';
import KeyStatsPage from './pages/KeyStatsPage';
import TeamEarningsPage from './pages/TeamEarningsPage';
import GoalsPage from './pages/GoalsPage';
import winnerLogo from '/src/assets/home/psg.png';
import runnerUpLogo from '/src/assets/home/IntM.png';
import totsImage from './assets/home/tots.png';
import './TeamCard.css';

import { useTranslation } from 'react-i18next';

function Dashboard({ season }) {
  const { t } = useTranslation();

  return (
    <main className="main-content">
      <h1 className="dashboard-title">
        {t("dashboard.title", { season })}
      </h1>

      <div className="card-container">
        {/* Winner Card */}
        <div className="team-card winner">
          <h2>{t("dashboard.winner")}</h2>
          <img
            src={winnerLogo}
            alt="Winner Logo"
            className="team-logo"
          />
          <h3 className="team-name">Paris St. Germain</h3>
          <p className="team-goals">
            {t("dashboard.teamGoals", { goals: 35 })}
          </p>
        </div>

        {/* Runner-Up Card */}
        <div className="team-card runnerup">
          <h2>{t("dashboard.runnerUp")}</h2>
          <img
            src={runnerUpLogo}
            alt="Runner-Up Logo"
            className="team-logo"
          />
          <h3 className="team-name">Inter Milan</h3>
          <p className="team-goals">
            {t("dashboard.teamGoals", { goals: 26 })}
          </p>
        </div>
      </div>

      <div className="team-of-season">
        <h2 className="section-title">{t("dashboard.teamOfSeason")}</h2>
        <img
          src={totsImage}
          alt="Team of the Season"
          className="season-img"
        />
      </div>
    </main>
  );
}


function App() {
  const [season] = useState("2024-25");
  const [stat, setStat] = useState("goals");

  return (
    <>
      <Header activeStat={stat} onStatChange={setStat} />
      <div className="app-layout">
        <Routes>
          <Route path="/" element={<Dashboard season={season} />} />
          <Route path="/key-stats" element={<KeyStatsPage data={keyStats} season={season} />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/team-earnings" element={<TeamEarningsPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;