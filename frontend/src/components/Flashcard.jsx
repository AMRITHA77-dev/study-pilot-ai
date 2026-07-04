import React from 'react';

export default function Flashcard({ front, back, isFlipped, onClick }) {
  return (
    <div className={`flashcard-stage-box ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
      <div className="flashcard-flipper-core">
        <div className="glass-panel flashcard-face front">
          <h3>Question Concept</h3>
          <p>{front}</p>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '24px' }}>Click node to flip card</span>
        </div>
        <div className="glass-panel flashcard-face back">
          <h3>Target Answer</h3>
          <p>{back}</p>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '24px' }}>Click node to return front</span>
        </div>
      </div>
    </div>
  );
}