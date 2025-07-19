import React, { useState, useRef } from "react";
import playerStats from '../data/keyStats';
import "./KeyStatsPage.css";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

import { useTranslation } from "react-i18next";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Import all player images eagerly
const playerImages = import.meta.glob('/src/assets/players/*.jpg', { eager: true });

function KeyStatsPage() {
  const { t } = useTranslation();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const chartRef = useRef(null);

  const handleRowClick = (player) => {
    setSelectedPlayer(player);
    setTimeout(() => {
      chartRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const chartData = selectedPlayer
    ? {
        labels: [
          t("keyStats.minutes"),
          t("keyStats.matches"),
          t("keyStats.goals"),
          t("keyStats.assists"),
          t("keyStats.distance"),
        ],
        datasets: [
          {
            label: selectedPlayer.name,
            data: [
              selectedPlayer.stats["2024-25"].minutes,
              selectedPlayer.stats["2024-25"].matches,
              selectedPlayer.stats["2024-25"].goals,
              selectedPlayer.stats["2024-25"].assists,
              selectedPlayer.stats["2024-25"].distance,
            ],
            backgroundColor: ['#FFD700', '#1E90FF', '#32CD32', '#FF69B4', '#FFA500'],
            borderRadius: 6,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#ccc' },
        grid: { color: '#333' }
      },
      x: {
        ticks: { color: '#ccc' },
        grid: { color: '#333' }
      }
    }
  };

  return (
    <div className="key-stats-container">
      <h1>{t("keyStats.title")}</h1>
      <table className="key-stats-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{t("keyStats.player")}</th>
            <th>{t("keyStats.team")}</th>
            <th>{t("keyStats.minutes")}</th>
            <th>{t("keyStats.matches")}</th>
            <th>{t("keyStats.goals")}</th>
            <th>{t("keyStats.assists")}</th>
            <th>{t("keyStats.distance")}</th>
          </tr>
        </thead>
        <tbody>
          {playerStats.map((player, index) => {
            const stat = player.stats["2024-25"];
            const imagePath = `/src/assets/players/${player.name}.jpg`;
            const playerImage = playerImages[imagePath]?.default || '';

            return (
              <tr key={index} onClick={() => handleRowClick(player)} style={{ cursor: 'pointer' }}>
                <td>{index + 1}</td>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img
                    src={playerImage}
                    alt={player.name}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      flexShrink: 0,
                      transform: 'translateY(3px)',
                    }}
                  />
                  {player.name}
                </td>
                <td>{player.team}</td>
                <td>{stat.minutes}</td>
                <td>{stat.matches}</td>
                <td>{stat.goals}</td>
                <td>{stat.assists}</td>
                <td>{stat.distance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Bar Chart Section */}
      {selectedPlayer && (
        <div ref={chartRef} style={{ marginTop: '3rem' }}>
          <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '1rem' }}>
            {t("keyStats.statsFor")} {selectedPlayer.name}
          </h2>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
}

export default KeyStatsPage;
