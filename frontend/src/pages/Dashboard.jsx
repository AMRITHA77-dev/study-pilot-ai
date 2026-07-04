import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, UploadCloud, HelpCircle, Layers, FileText, BarChart3, Clock, BrainCircuit, ArrowRight, CheckCircle2 } from 'lucide-react';
import StatCard from '../components/StatCard';
import FeatureCard from '../components/FeatureCard';
import '../styles/dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  const primaryFeatures = [
    { title: "Cognitive AI Chat", description: "Ask complex doubts, definitions, and questions directly from your uploaded material.", icon: MessageSquare, path: "/chat" },
    { title: "AI Quiz Studio", description: "Generate custom multiple-choice test questions directly from your file's topics.", icon: HelpCircle, path: "/quiz" },
    { title: "Flashcards Room", description: "Convert paragraphs into 3D flippable cards for rapid active recall memory practice.", icon: Layers, path: "/flashcards" },
  ];

  return (
    <motion.div className="page-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      
      {/* Dynamic Welcome Hero */}
      <div className="dashboard-hero">
        <h1 className="gradient-text">Welcome to StudyPilot AI</h1>
        <p>A precision-engineered orchestration platform that reads your study materials and automatically builds custom interactive learning workspaces.</p>
      </div>

      {/* --- NEW USER ONBOARDING WORKFLOW SECTION --- */}
      <h2 className="dashboard-section-title" style={{ color: '#818CF8', display: 'flex', alignItems: 'center', gap: '8px' }}>
        🚀 How to Use StudyPilot (Your 4-Step Learning Pipeline)
      </h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '16px', 
        marginBottom: '40px' 
      }}>
        <div className="glass-panel" style={{ padding: '20px', border: '1px dashed rgba(79, 70, 229, 0.4)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818CF8', marginBottom: '8px', textTransform: 'uppercase' }}>Step 1: Ingest</div>
          <h4 style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><UploadCloud size={16} /> Upload PDF</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>Go to Document Vault and upload your textbook chapter or research paper.</p>
          <button className="btn-secondary" onClick={() => navigate('/upload')} style={{ padding: '6px 12px', fontSize: '0.75rem', marginTop: '12px', width: '100%', justifyContent: 'center' }}>
            Go to Vault <ArrowRight size={12} />
          </button>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Step 2: Ask</div>
          <h4 style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><MessageSquare size={16} /> Query Doubts</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>Open Chat Engine to converse directly with your document and clarify complex topics.</p>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Step 3: Extract</div>
          <h4 style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><FileText size={16} /> Get Summary</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>Run Intel Summary to distill hundreds of pages down into a dense blueprint revision guide.</p>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Step 4: Test</div>
          <h4 style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><HelpCircle size={16} /> Active Recall</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>Spin up structural Quizzes and Flashcard decks to completely gamify your exam prep.</p>
        </div>
      </div>
      {/* --- END OF ONBOARDING SECTION --- */}

      <div className="stats-grid">
        <StatCard title="Knowledge Tokens" value="742.8 K" icon={BrainCircuit} color="#4F46E5" />
        <StatCard title="Active Vectors" value="1 Live Document" icon={CheckCircle2} color="#10B981" />
        <StatCard title="Compute Hours" value="38.4 hrs" icon={Clock} color="#7C3AED" />
        <StatCard title="Model Status" value="Gemini Connected" icon={BarChart3} color="#F59E0B" />
      </div>

      <h2 className="dashboard-section-title">Core Systems Nav Deck</h2>
      <div className="features-grid">
        {primaryFeatures.map((feat, idx) => (
          <FeatureCard key={idx} title={feat.title} description={feat.description} icon={feat.icon} onClick={() => navigate(feat.path)} />
        ))}
      </div>
    </motion.div>
  );
}