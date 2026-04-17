import React from 'react';
import { Trophy, Medal, Star, Award, Zap, Target, Flame } from 'lucide-react';
import './EdTech.css';

function GamificationPanel({ userStats, recentAchievements }) {
  const { badges, streak, points, level } = userStats;

  const badgeTypes = [
    { id: 'first-lesson', name: 'First Steps', icon: Star, description: 'Complete your first lesson', earned: true },
    { id: 'streak-7', name: 'Week Warrior', icon: Flame, description: '7 day learning streak', earned: true },
    { id: 'perfect-score', name: 'Perfectionist', icon: Target, description: 'Score 100% on a lesson', earned: false },
    { id: 'speed-demon', name: 'Speed Demon', icon: Zap, description: 'Complete lesson in under 5 minutes', earned: false },
    { id: 'mentor', name: 'Mentor', icon: Award, description: 'Help 5 other learners', earned: false },
    { id: 'master', name: 'Code Master', icon: Trophy, description: 'Reach level 10', earned: false }
  ];

  return (
    <div className="gamification-panel">
      <div className="panel-header">
        <h3>Achievements & Badges</h3>
        <div className="stats-overview">
          <div className="stat-card">
            <Trophy className="stat-icon" />
            <div className="stat-info">
              <span className="stat-number">{badges}</span>
              <span className="stat-label">Badges</span>
            </div>
          </div>
          <div className="stat-card">
            <Flame className="stat-icon" />
            <div className="stat-info">
              <span className="stat-number">{streak}</span>
              <span className="stat-label">Day Streak</span>
            </div>
          </div>
          <div className="stat-card">
            <Star className="stat-icon" />
            <div className="stat-info">
              <span className="stat-number">{points}</span>
              <span className="stat-label">Points</span>
            </div>
          </div>
        </div>
      </div>

      <div className="badges-grid">
        {badgeTypes.map(badge => {
          const BadgeIcon = badge.icon;
          return (
            <div key={badge.id} className={`badge-item ${badge.earned ? 'earned' : 'locked'}`}>
              <div className="badge-icon">
                <BadgeIcon size={32} />
              </div>
              <div className="badge-info">
                <h4>{badge.name}</h4>
                <p>{badge.description}</p>
              </div>
              {badge.earned && <div className="earned-indicator">✓</div>}
            </div>
          );
        })}
      </div>

      {recentAchievements && recentAchievements.length > 0 && (
        <div className="recent-achievements">
          <h4>Recent Achievements</h4>
          <div className="achievements-list">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <div className="achievement-icon">
                  <Trophy size={20} />
                </div>
                <div className="achievement-info">
                  <span className="achievement-title">{achievement.title}</span>
                  <span className="achievement-date">{achievement.date}</span>
                </div>
                <span className="achievement-points">+{achievement.points} XP</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="motivation-section">
        <div className="motivation-card">
          <h4>Keep it up! 🔥</h4>
          <p>You're on a {streak} day learning streak. Complete today's lesson to maintain it!</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '75%' }}></div>
          </div>
          <span className="progress-text">3/4 lessons completed today</span>
        </div>
      </div>
    </div>
  );
}

export default GamificationPanel;