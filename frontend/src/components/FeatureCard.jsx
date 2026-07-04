import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ icon: Icon, title, description, onClick }) {
  return (
    <motion.div
      className="glass-panel feature-card"
      whileHover={{ y: -6, scale: 1.02, backgroundColor: 'var(--bg-card-hover)', borderColor: 'rgba(79, 70, 229, 0.3)' }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <div className="feature-icon-wrapper"><Icon size={22} /></div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
}