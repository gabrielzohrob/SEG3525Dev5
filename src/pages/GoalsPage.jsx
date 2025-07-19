import React from "react";
import goalStats from "../data/goalStats";
import "./KeyStatsPage.css"; // Reuse table styling
import { useTranslation } from 'react-i18next';

// Import all player images eagerly
const playerImages = import.meta.glob('/src/assets/players/*.jpg', { eager: true });

const topGoalScorers = [...goalStats]
  .sort((a, b) => b.stats["2024-25"].goals - a.stats["2024-25"].goals)
  .slice(0, 10);

function GoalsPage() {
  const { t } = useTranslation();

  return (
    <div className="key-stats-container">
      <h1 style={{ textAlign: 'center', color: '#FFD700', fontSize: '2rem', marginBottom: '1.5rem' }}>
        {t("goalsPage.title")}
      </h1>
      <table className="key-stats-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{t("goalsPage.player")}</th>
            <th>{t("goalsPage.team")}</th>
            <th>{t("goalsPage.goals")}</th>
            <th>{t("goalsPage.rightFoot")}</th>
            <th>{t("goalsPage.leftFoot")}</th>
            <th>{t("goalsPage.head")}</th>
            <th>{t("goalsPage.other")}</th>
            <th>{t("goalsPage.insideArea")}</th>
            <th>{t("goalsPage.outsideArea")}</th>
            <th>{t("goalsPage.penalties")}</th>
            <th>{t("goalsPage.matches")}</th>
          </tr>
        </thead>
        <tbody>
          {topGoalScorers.map((player, index) => {
            const stats = player.stats["2024-25"];
            const imagePath = `/src/assets/players/${player.name}.jpg`;
            const playerImage = playerImages[imagePath]?.default || '';

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="player-cell">
                  {playerImage && (
                    <img
                      src={playerImage}
                      alt={player.name}
                      className="player-img"
                    />
                  )}
                  {player.name}
                </td>
                <td>{player.team}</td>
                <td style={{ color: '#FFD700', fontWeight: 'bold' }}>{stats.goals}</td>
                <td>{stats.rightFoot}</td>
                <td>{stats.leftFoot}</td>
                <td>{stats.head}</td>
                <td>{stats.other}</td>
                <td>{stats.insideArea}</td>
                <td>{stats.outsideArea}</td>
                <td>{stats.penalties}</td>
                <td>{stats.matches}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default GoalsPage;