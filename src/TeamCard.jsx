import React from 'react';
import './TeamCard.css';

function TeamCard({ title, teamName, logoSrc, goals }) {
  return (
    <div className="team-card">
      <h2>{title}</h2>
      <img src={logoSrc} alt={`${teamName} logo`} className="team-logo" />
      <h3>{teamName}</h3>
      <p>Goals Scored: <strong>{goals}</strong></p>
    </div>
  );
}

export default TeamCard;
