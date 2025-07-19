import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Header() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="header">
      {/* Logo + Title */}
      <NavLink to="/" className="logo-area">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <h1 className="logo-text">Champions View</h1>
      </NavLink>

      {/* Navigation + Language Switch */}
      <div className="header-right">
        <nav className="main-nav">
          <NavLink to="/key-stats" className="nav-link">
            {t('nav.keyStats')}
          </NavLink>
          <NavLink to="/goals" className="nav-link">
            {t('nav.goals')}
          </NavLink>
          <NavLink to="/team-earnings" className="nav-link">
            {t('nav.teamEarnings')}
          </NavLink>
        </nav>

        <button className="lang-toggle" onClick={toggleLanguage}>
          {i18n.language === 'en' ? 'Français' : 'English'}
        </button>
      </div>
    </header>
  );
}

export default Header;
