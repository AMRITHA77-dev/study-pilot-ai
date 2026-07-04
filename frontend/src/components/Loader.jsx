import React from 'react';
import { motion } from 'framer-motion';

export default function Loader({ message = "Processing intelligence data..." }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', width: '100%' }}>
      <motion.div
        style={{ width: '50px', height: '50px', border: '4px solid rgba(255, 255, 255, 0.05)', borderTop: '4px solid var(--color-primary)', borderRight: '4px solid var(--color-accent)', borderRadius: '50%' }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>{message}</p>
    </div>
  );
}