import React from 'react';
import { Trophy, Flame, Star, User, Settings } from 'lucide-react';
import './EdTech.css';

function Header({ userProgress, userStats }) {
  const { level, xp, streak, badges } = userStats;

  return (
    <header className="edtech-header">
      <div className="header-left">
        <div className="logo">
          <h1>CodeMaster</h1>
          <span className="subtitle">AI-Powered Learning</span>
        </div>
      </div>

      <div className="header-center">
        <div className="progress-section">
          <div className="level-info">
            <span className="level">Level {level}</span>
            <span className="xp">{xp}/1000 XP</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(xp / 1000) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="header-right">
        <div className="gamification-stats">
          <div className="stat-item">
            <Flame className="stat-icon streak" />
            <span className="stat-value">{streak}</span>
            <span className="stat-label">Streak</span>
          </div>
          <div className="stat-item">
            <Trophy className="stat-icon" />
            <span className="stat-value">{badges}</span>
            <span className="stat-label">Badges</span>
          </div>
          <div className="stat-item">
            <Star className="stat-icon" />
            <span className="stat-value">{level}</span>
            <span className="stat-label">Level</span>
          </div>
        </div>

        <div className="user-menu">
          <button className="user-btn">
            <User size={20} />
          </button>
          <button className="settings-btn">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;