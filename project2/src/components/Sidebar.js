import React from 'react';
import { CheckCircle, Circle, Lock, Play, BookOpen, Code, Database, Globe } from 'lucide-react';
import './EdTech.css';

function Sidebar({ currentLesson, onLessonSelect }) {
  const learningPath = [
    {
      module: 'JavaScript Fundamentals',
      icon: Code,
      lessons: [
        { id: 1, title: 'Variables & Data Types', status: 'completed', difficulty: 'beginner' },
        { id: 2, title: 'Functions & Scope', status: 'completed', difficulty: 'beginner' },
        { id: 3, title: 'Arrays & Objects', status: 'in-progress', difficulty: 'beginner' },
        { id: 4, title: 'DOM Manipulation', status: 'locked', difficulty: 'intermediate' }
      ]
    },
    {
      module: 'React Basics',
      icon: Globe,
      lessons: [
        { id: 5, title: 'Components & JSX', status: 'locked', difficulty: 'intermediate' },
        { id: 6, title: 'State & Props', status: 'locked', difficulty: 'intermediate' },
        { id: 7, title: 'Hooks Introduction', status: 'locked', difficulty: 'intermediate' }
      ]
    },
    {
      module: 'Backend Development',
      icon: Database,
      lessons: [
        { id: 8, title: 'Node.js Basics', status: 'locked', difficulty: 'advanced' },
        { id: 9, title: 'Express Framework', status: 'locked', difficulty: 'advanced' },
        { id: 10, title: 'Database Design', status: 'locked', difficulty: 'advanced' }
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="status-icon completed" />;
      case 'in-progress':
        return <Play className="status-icon in-progress" />;
      case 'locked':
        return <Lock className="status-icon locked" />;
      default:
        return <Circle className="status-icon" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'difficulty-beginner';
      case 'intermediate':
        return 'difficulty-intermediate';
      case 'advanced':
        return 'difficulty-advanced';
      default:
        return '';
    }
  };

  return (
    <aside className="edtech-sidebar">
      <div className="sidebar-header">
        <h2>Learning Path</h2>
        <p>Your personalized journey</p>
      </div>

      <div className="learning-path">
        {learningPath.map((module, moduleIndex) => {
          const ModuleIcon = module.icon;
          return (
            <div key={moduleIndex} className="module-section">
              <div className="module-header">
                <ModuleIcon className="module-icon" />
                <h3>{module.module}</h3>
              </div>

              <div className="lessons-list">
                {module.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    className={`lesson-item ${lesson.status} ${getDifficultyColor(lesson.difficulty)} ${currentLesson === lesson.id ? 'active' : ''}`}
                    onClick={() => lesson.status !== 'locked' && onLessonSelect(lesson.id)}
                    disabled={lesson.status === 'locked'}
                  >
                    {getStatusIcon(lesson.status)}
                    <div className="lesson-info">
                      <span className="lesson-title">{lesson.title}</span>
                      <span className="lesson-difficulty">{lesson.difficulty}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <div className="progress-summary">
          <div className="progress-circle">
            <span>35%</span>
          </div>
          <div className="progress-text">
            <strong>3/12</strong> lessons completed
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;