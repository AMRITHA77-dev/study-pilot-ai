import React from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, User } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    const segment = path.substring(1);
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <nav className="glass-panel" style={{
      position: 'fixed', top: 0, right: 0, left: 'var(--sidebar-width)',
      height: 'var(--navbar-height)', borderRadius: 0, borderTop: 'none',
      borderLeft: 'none', borderRight: 'none', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between', padding: '0 40px',
      zIndex: 40, background: 'rgba(11, 17, 32, 0.8)', backdropFilter: 'blur(12px)'
    }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }} className="gradient-text">
        {getPageTitle()}
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'rgba(79, 70, 229, 0.1)', border: '1px solid rgba(79, 70, 229, 0.2)',
          padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, color: '#818CF8'
        }}>
          <Sparkles size={14} />
          <span>Pro Account</span>
        </div>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)'
        }}>
          <User size={18} />
        </div>
      </div>
    </nav>
  );
}