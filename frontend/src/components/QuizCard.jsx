import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

export default function QuizCard({ index, question, options, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const prefixes = ['A', 'B', 'C', 'D'];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowAnswer(true); // Automatically show explanation/result on click
  };

  return (
    <motion.div className="glass-panel quiz-card-item" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="quiz-question-header">
        <div>
          <div className="quiz-question-number">Question {index + 1}</div>
          <h3 className="quiz-question-text">{question}</h3>
        </div>
      </div>
      
      <div className="quiz-options-list">
        {options.map((option, idx) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === answer;
          
          // Determine clean active state background colors
          let borderStyle = '1px solid var(--border-glass)';
          let bgStyle = 'rgba(255, 255, 255, 0.02)';
          
          if (isSelected) {
            if (isCorrect) {
              bgStyle = 'rgba(16, 185, 129, 0.15)'; // Bright green for correct pick
              borderStyle = '1px solid #10B981';
            } else {
              bgStyle = 'rgba(239, 68, 68, 0.15)';  // Crimson red for wrong pick
              borderStyle = '1px solid #EF4444';
            }
          } else if (showAnswer && isCorrect) {
            // Highlight the true answer if user guessed wrong
            bgStyle = 'rgba(16, 185, 129, 0.08)';
            borderStyle = '1px dashed #10B981';
          }

          return (
            <div 
              key={idx} 
              className="quiz-option-node"
              onClick={() => handleOptionClick(option)}
              style={{
                background: bgStyle,
                border: borderStyle,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: isSelected ? 'scale(1.01)' : 'none'
              }}
            >
              <span className="quiz-option-prefix" style={{
                background: isSelected ? 'rgba(255,255,255,0.15)' : 'rgba(255, 255, 255, 0.05)',
                color: '#FFF'
              }}>
                {prefixes[idx]}
              </span>
              <span style={{ color: '#F8FAFC', fontWeight: isSelected ? '600' : '400' }}>{option}</span>
            </div>
          );
        })}
      </div>

      <div className="quiz-action-footer">
        <button className="reveal-answer-toggle-btn" onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? <><EyeOff size={16} /> Hide Answer Key</> : <><Eye size={16} /> Reveal Valid Answer</>}
        </button>

        {showAnswer && (
          <motion.div 
            className="quiz-answer-alert" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: selectedOption === answer ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              borderColor: selectedOption === answer ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: selectedOption === answer ? '#10B981' : '#EF4444'
            }}
          >
            {selectedOption === answer ? (
              <><CheckCircle2 size={16} /> <span>Excellent! Correct Choice: <strong>{answer}</strong></span></>
            ) : (
              <><AlertCircle size={16} /> <span>Incorrect. Target Valid Answer is: <strong>{answer}</strong></span></>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}