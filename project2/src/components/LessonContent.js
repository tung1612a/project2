import React, { useState } from 'react';
import { CheckCircle, X, RotateCcw, Lightbulb, Target, Clock } from 'lucide-react';
import './EdTech.css';

function LessonContent({ lessonId }) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showHint, setShowHint] = useState(false);

  // Mock lesson data
  const lessonData = {
    1: {
      title: 'Variables & Data Types',
      description: 'Learn the fundamentals of JavaScript variables and data types',
      exercises: [
        {
          type: 'multiple-choice',
          question: 'What keyword is used to declare a variable in JavaScript?',
          options: ['var', 'let', 'const', 'all of the above'],
          correct: 3,
          hint: 'JavaScript has three ways to declare variables: var, let, and const'
        },
        {
          type: 'code-completion',
          question: 'Complete the code to declare a string variable:',
          code: 'let message = "_____";',
          answer: '"Hello World"',
          hint: 'Strings in JavaScript are enclosed in quotes'
        }
      ]
    },
    2: {
      title: 'Functions & Scope',
      description: 'Understanding JavaScript functions and variable scope',
      exercises: [
        {
          type: 'multiple-choice',
          question: 'What is the scope of a variable declared with "let" inside a function?',
          options: ['Global', 'Function', 'Block', 'Module'],
          correct: 1,
          hint: 'Variables declared with let have block scope'
        }
      ]
    },
    3: {
      title: 'Arrays & Objects',
      description: 'Working with complex data structures in JavaScript',
      exercises: [
        {
          type: 'code-completion',
          question: 'Create an array with three fruits:',
          code: 'const fruits = [_____, _____, _____];',
          answer: '"apple", "banana", "orange"',
          hint: 'Arrays are created using square brackets []'
        }
      ]
    }
  };

  const currentLesson = lessonData[lessonId] || lessonData[1];
  const exercises = currentLesson.exercises;

  const handleAnswer = (exerciseIndex, answer) => {
    setUserAnswers({
      ...userAnswers,
      [exerciseIndex]: answer
    });
  };

  const checkAnswer = (exerciseIndex) => {
    const exercise = exercises[exerciseIndex];
    const userAnswer = userAnswers[exerciseIndex];

    if (exercise.type === 'multiple-choice') {
      return userAnswer === exercise.correct;
    } else if (exercise.type === 'code-completion') {
      return userAnswer?.toLowerCase().trim() === exercise.answer.toLowerCase().trim();
    }
    return false;
  };

  const renderExercise = (exercise, index) => {
    const isAnswered = userAnswers[index] !== undefined;
    const isCorrect = isAnswered && checkAnswer(index);

    return (
      <div key={index} className="exercise-card">
        <div className="exercise-header">
          <h4>Exercise {index + 1}</h4>
          <div className="exercise-meta">
            <span className="exercise-type">{exercise.type.replace('-', ' ')}</span>
            {isAnswered && (
              <span className={`exercise-status ${isCorrect ? 'correct' : 'incorrect'}`}>
                {isCorrect ? <CheckCircle size={16} /> : <X size={16} />}
              </span>
            )}
          </div>
        </div>

        <div className="exercise-content">
          <p className="exercise-question">{exercise.question}</p>

          {exercise.type === 'multiple-choice' && (
            <div className="options-grid">
              {exercise.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  className={`option-btn ${userAnswers[index] === optionIndex ? 'selected' : ''} ${isAnswered && optionIndex === exercise.correct ? 'correct' : ''}`}
                  onClick={() => handleAnswer(index, optionIndex)}
                  disabled={isAnswered}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {exercise.type === 'code-completion' && (
            <div className="code-exercise">
              <pre className="code-block">
                <code>{exercise.code.replace('_____', userAnswers[index] || '_____')}</code>
              </pre>
              <input
                type="text"
                placeholder="Enter your answer..."
                value={userAnswers[index] || ''}
                onChange={(e) => handleAnswer(index, e.target.value)}
                disabled={isAnswered}
                className="code-input"
              />
            </div>
          )}

          <div className="exercise-actions">
            <button
              className="hint-btn"
              onClick={() => setShowHint(!showHint)}
            >
              <Lightbulb size={16} />
              Hint
            </button>
            {isAnswered && (
              <button
                className="retry-btn"
                onClick={() => {
                  setUserAnswers({...userAnswers, [index]: undefined});
                  setShowHint(false);
                }}
              >
                <RotateCcw size={16} />
                Try Again
              </button>
            )}
          </div>

          {showHint && (
            <div className="hint-box">
              <Lightbulb size={16} />
              <p>{exercise.hint}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <main className="lesson-content">
      <div className="lesson-header">
        <div className="lesson-info">
          <h2>{currentLesson.title}</h2>
          <p>{currentLesson.description}</p>
        </div>
        <div className="lesson-progress">
          <div className="progress-stats">
            <div className="stat">
              <Target size={16} />
              <span>{Object.keys(userAnswers).length}/{exercises.length} completed</span>
            </div>
            <div className="stat">
              <Clock size={16} />
              <span>~15 min</span>
            </div>
          </div>
        </div>
      </div>

      <div className="exercises-container">
        {exercises.map((exercise, index) => renderExercise(exercise, index))}
      </div>

      <div className="lesson-navigation">
        <button
          className="nav-btn prev"
          disabled={currentExercise === 0}
          onClick={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
        >
          Previous
        </button>
        <div className="exercise-dots">
          {exercises.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentExercise ? 'active' : ''}`}
              onClick={() => setCurrentExercise(index)}
            />
          ))}
        </div>
        <button
          className="nav-btn next"
          disabled={currentExercise === exercises.length - 1}
          onClick={() => setCurrentExercise(Math.min(exercises.length - 1, currentExercise + 1))}
        >
          Next
        </button>
      </div>
    </main>
  );
}

export default LessonContent;