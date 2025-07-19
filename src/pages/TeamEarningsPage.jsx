import React from "react";
import { useTranslation } from 'react-i18next';
import teamEarnings from "../data/teamEarnings";
import "./KeyStatsPage.css";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const teamLogos = import.meta.glob('/src/assets/teams/*.png', { eager: true });

const sortedTeams = [...teamEarnings].sort((a, b) => a.earnings - b.earnings);

function TeamEarningsPage() {
  const { t } = useTranslation();

  const labels = sortedTeams.map(team => {
    const fileName = team.name.replace(/\s+/g, " ") + ".png";
    const logoKey = `/src/assets/teams/${fileName}`;
    const logo = teamLogos[logoKey]?.default;
    return logo ? `${team.name}` : team.name;
  });

  const dataValues = sortedTeams.map(team => team.earnings);

  const chartData = {
    labels,
    datasets: [
      {
        label: "CL Earnings ($M)", // Optional: you could also localize this label
        data: dataValues,
        borderColor: "#FFD700",
        backgroundColor: "transparent",
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 8,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false,
        external: function (context) {
          const tooltipModel = context.tooltip;
          const chart = context.chart;

          let tooltipEl = document.getElementById('chartjs-tooltip');

          if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'chartjs-tooltip';
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.background = '#1c1c1c';
            tooltipEl.style.border = '1px solid #FFD700';
            tooltipEl.style.borderRadius = '8px';
            tooltipEl.style.padding = '8px 12px';
            tooltipEl.style.pointerEvents = 'none';
            tooltipEl.style.color = 'white';
            tooltipEl.style.fontSize = '14px';
            tooltipEl.style.display = 'flex';
            tooltipEl.style.alignItems = 'center';
            tooltipEl.style.zIndex = 1000;
            document.body.appendChild(tooltipEl);
          }

          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
          }

          const index = tooltipModel.dataPoints?.[0]?.dataIndex;
          const team = sortedTeams[index];
          const fileName = team.name.replace(/\s+/g, " ") + ".png";
          const logoKey = `/src/assets/teams/${fileName}`;
          const logo = teamLogos[logoKey]?.default;

          tooltipEl.innerHTML = `
            <div style="display: flex; align-items: center;">
              <img src="${logo}" alt="${team.name}" style="width: 24px; height: 24px; margin-right: 8px; object-fit: contain;" />
              <span><strong>${t("teamEarningsPage.tooltipLabel", { team: team.name, earnings: team.earnings })}</strong></span>
            </div>
          `;

          const canvasRect = chart.canvas.getBoundingClientRect();
          tooltipEl.style.left = canvasRect.left + window.pageXOffset + tooltipModel.caretX + 'px';
          tooltipEl.style.top = canvasRect.top + window.pageYOffset + tooltipModel.caretY + 'px';
          tooltipEl.style.opacity = 1;
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ccc",
          callback: function (value, index) {
            const team = sortedTeams[index];
            return team.name;
          },
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
        grid: { color: "#444" },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ccc",
          callback: val => t("teamEarningsPage.yAxisLabel", { val })
        },
        grid: { color: "#444" },
      },
    },
  };

  return (
    <div className="key-stats-container">
      <h1 style={{ textAlign: "center", color: "#FFD700", fontSize: "2rem", marginBottom: "1.5rem" }}>
        {t("teamEarningsPage.title")}
      </h1>

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default TeamEarningsPage;
