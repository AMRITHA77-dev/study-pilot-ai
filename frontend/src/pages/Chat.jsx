import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal } from 'lucide-react';
import { chat } from '../api/api';
import ChatMessage from '../components/ChatMessage';
import toast from 'react-hot-toast';
import '../styles/chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const result = await chat(userMessage);
      setMessages(prev => [...prev, { sender: 'ai', text: result.reply || result.response }]);
    } catch (err) {
      toast.error("Inference node failure. Running fallback simulation.");
      setMessages(prev => [...prev, { sender: 'ai', text: `Integrated query frame parsed locally: "${userMessage}". Please check backend endpoint configurations at http://127.0.0.1:8000.` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="chat-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {messages.length === 0 ? (
        <div className="chat-empty-state">
          <div className="chat-empty-icon"><Terminal size={28} /></div>
          <h2>Cognitive Processing Interface</h2>
          <p>Mount active query frameworks to pull structural metadata analysis fields from live pipeline contexts.</p>
        </div>
      ) : (
        <div className="chat-messages-scroll">
          {messages.map((msg, idx) => <ChatMessage key={idx} sender={msg.sender} text={msg.text} />)}
          {loading && (
            <div className="chat-message-row ai">
              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}><Terminal size={16} /></div>
                <div className="chat-bubble">
                  <div className="typing-indicator"><span className="typing-dot"></span><span className="typing-dot"></span><span className="typing-dot"></span></div>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}
      <div className="chat-input-wrapper">
        <form className="chat-form" onSubmit={handleSend}>
          <textarea className="chat-input-field" placeholder="Type query vector script... (Press Enter to route payload)" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); } }} disabled={loading} />
          <button type="submit" className="chat-send-btn" disabled={loading || !input.trim()}><Send size={16} /></button>
        </form>
      </div>
    </motion.div>
  );
}