import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import { generateQuiz } from '../api/api';
import QuizCard from '../components/QuizCard';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import '../styles/quiz.css';

export default function Quiz() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim() || loading) return;

    setLoading(true);
    setQuizzes(null);
    try {
      const data = await generateQuiz(topic.trim());
      setQuizzes(data.quiz || data.questions || data || []);
      toast.success("Examination vector matrix built successfully.");
    } catch (err) {
      toast.error("Matrix generation failure. Serving local cached mock framework.");
      setQuizzes([
        { question: `What is the primary operational complexity constraint regarding ${topic}?`, options: ["Asynchronous process isolation barriers", "Linear resource scanning overhead bounds", "Volatile cache block eviction indexes", "Synchronous database lock contention rates"], answer: "Asynchronous process isolation barriers" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="page-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="quiz-view-wrapper">
        <div className="glass-panel quiz-generator-box">
          <h2>AI Quiz Studio</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Compile evaluation instances from a topic seed vector.</p>
          <form onSubmit={handleGenerate} className="quiz-input-row">
            <div className="form-group">
              <input type="text" className="form-input" placeholder="e.g., Quantum Cryptography, Distributed Systems..." value={topic} onChange={(e) => setTopic(e.target.value)} disabled={loading} />
            </div>
            <button type="submit" className="btn-primary" style={{ height: '52px' }} disabled={loading || !topic.trim()}><Cpu size={18} /> Compile Quiz</button>
          </form>
        </div>
        {loading && <Loader message="Generating assessment blocks..." />}
        {quizzes && !loading && (
          <div className="quiz-cards-stack">
            {quizzes.map((quiz, idx) => <QuizCard key={idx} index={idx} question={quiz.question} options={quiz.options} answer={quiz.answer} />)}
          </div>
        )}
      </div>
    </motion.div>
  );
}