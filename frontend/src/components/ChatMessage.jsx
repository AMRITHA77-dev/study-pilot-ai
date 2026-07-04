import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User } from 'lucide-react';

export default function ChatMessage({ sender, text }) {
  const isAi = sender === 'ai';
  return (
    <motion.div className={`chat-message-row ${sender}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div style={{ display: 'flex', gap: '14px', maxWidth: '80%', flexDirection: isAi ? 'row' : 'row-reverse' }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '8px',
          background: isAi ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' : 'rgba(255, 255, 255, 0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', flexShrink: 0, marginTop: '4px'
        }}>
          {isAi ? <Sparkles size={16} /> : <User size={16} />}
        </div>
        <div className="chat-bubble">{text}</div>
      </div>
    </motion.div>
  );
}