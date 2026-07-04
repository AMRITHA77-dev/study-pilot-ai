import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Shuffle, Cpu } from 'lucide-react';
import { generateFlashcards } from '../api/api';
import Flashcard from '../components/Flashcard';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import '../styles/flashcards.css';

export default function Flashcards() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim() || loading) return;

    setLoading(true);
    setCards(null);
    try {
      const data = await generateFlashcards(topic.trim());
      setCards(data.flashcards || data.cards || data || []);
      setCurrentIndex(0);
      setIsFlipped(false);
      toast.success("Recall vectors compiled and loaded.");
    } catch (err) {
      toast.error("Network error. Loaded fallback alignment values.");
      setCards([
        { front: `Explain the architectural challenge of: ${topic}`, back: "Ensuring fault tolerance while maintaining highly optimized processing speeds." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="page-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flashcards-layout-hub">
        <div className="glass-panel" style={{ padding: '32px', width: '100%', marginBottom: '40px' }}>
          <h2>Memory Recall Vault</h2>
          <p style={{ color: 'var(--text-muted)' }}>Construct high-speed cognitive alignment flash arrays.</p>
          <form onSubmit={handleGenerate} className="quiz-input-row" style={{ marginTop: '20px' }}>
            <div className="form-group"><input type="text" className="form-input" placeholder="e.g., Computer Networks..." value={topic} onChange={(e) => setTopic(e.target.value)} disabled={loading} /></div>
            <button type="submit" className="btn-primary" style={{ height: '52px' }} disabled={loading || !topic.trim()}><Cpu size={18} /> Build Cards</button>
          </form>
        </div>

        {loading && <Loader message="Assembling active conceptual nodes..." />}

        {cards && !loading && cards.length > 0 && (
          <div style={{ width: '100%' }}>
            <Flashcard front={cards[currentIndex].front} back={cards[currentIndex].back} isFlipped={isFlipped} onClick={() => setIsFlipped(!isFlipped)} />
            <div className="flashcard-controls-panel">
              <button className="btn-secondary" onClick={() => { setCards([...cards].sort(() => Math.random() - 0.5)); setCurrentIndex(0); setIsFlipped(false); toast.success("Array shuffled."); }}><Shuffle size={16} /></button>
              <div className="flashcard-nav-cluster">
                <button className="flashcard-nav-btn" onClick={() => { setIsFlipped(false); setCurrentIndex(p => p - 1); }} disabled={currentIndex === 0}><ChevronLeft size={20} /></button>
                <span className="flashcard-counter-badge">{currentIndex + 1} / {cards.length}</span>
                <button className="flashcard-nav-btn" onClick={() => { setIsFlipped(false); setCurrentIndex(p => p + 1); }} disabled={currentIndex === cards.length - 1}><ChevronRight size={20} /></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}