import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import { generateSummary } from '../api/api';
import SummaryCard from '../components/SummaryCard';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import '../styles/summary.css';

export default function Summary() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim() || loading) return;

    setLoading(true);
    setSummaryData(null);
    try {
      const data = await generateSummary(topic.trim());
      setSummaryData({ topic: topic.trim(), content: data.summary || data.content || data });
      toast.success("Synopsis output compiled successfully.");
    } catch (err) {
      toast.error("Pipeline request anomaly. Injecting offline abstract fallback.");
      setSummaryData({
        topic: topic.trim(),
        content: `EXECUTIVE SUMMARY RUN: ${topic.toUpperCase()}\n\n1. OPERATIONAL ANALYSIS OVERVIEW\nThe targeted conceptual architecture maps critical runtime behaviors under strict workload limits. Primary structural bottlenecks reside inside horizontal messaging pipes and transactional persistence tracking nodes.`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="page-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="summary-view-container">
        <div className="glass-panel summary-generation-form">
          <h2>Intel Summary Engine</h2>
          <p style={{ color: 'var(--text-muted)' }}>Distill dense knowledge arrays down to high-density strategic insights.</p>
          <form onSubmit={handleGenerate} className="quiz-input-row" style={{ marginTop: '20px' }}>
            <div className="form-group"><input type="text" className="form-input" placeholder="e.g., Microservices Micro-Audit..." value={topic} onChange={(e) => setTopic(e.target.value)} disabled={loading} /></div>
            <button type="submit" className="btn-primary" style={{ height: '52px' }} disabled={loading || !topic.trim()}><Cpu size={18} /> Extract Abstract</button>
          </form>
        </div>
        {loading && <Loader message="Injecting distillation filters..." />}
        {summaryData && !loading && <SummaryCard topic={summaryData.topic} content={summaryData.content} />}
      </div>
    </motion.div>
  );
}