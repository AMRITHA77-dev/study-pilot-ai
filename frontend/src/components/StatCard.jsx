import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ icon: Icon, title, value, color = '#4F46E5' }) {
  return (
    <motion.div className="glass-panel stat-card" whileHover={{ scale: 1.03 }}>
      <div className="stat-icon-wrapper" style={{ backgroundColor: `${color}15`, color: color }}>
        <Icon size={22} />
      </div>
      <div className="stat-info">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </motion.div>
  );
}