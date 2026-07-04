import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, UploadCloud, HelpCircle, Layers, FileText, Compass } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/chat', label: 'Chat Engine', icon: MessageSquare },
    { path: '/upload', label: 'Document Vault', icon: UploadCloud },
    { path: '/quiz', label: 'AI Quiz Studio', icon: HelpCircle },
    { path: '/flashcards', label: 'Flashcards Room', icon: Layers },
    { path: '/summary', label: 'Intel Summary', icon: FileText },
  ];

  return (
    <aside className="glass-panel" style={{
      position: 'fixed', top: 0, left: 0, bottom: 0, width: 'var(--sidebar-width)',
      borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderBottom: 'none',
      background: 'var(--bg-sidebar)', display: 'flex', flexDirection: 'column', zIndex: 50
    }}>
      <div style={{
        height: 'var(--navbar-height)', display: 'flex', alignItems: 'center',
        padding: '0 24px', gap: '12px', borderBottom: '1px solid var(--border-glass)'
      }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF'
        }}>
          <Compass size={18} />
        </div>
        <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          StudyPilot <span style={{ color: 'var(--color-accent)' }}>AI</span>
        </span>
      </div>

      <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                borderRadius: '10px', fontSize: '0.925rem', fontWeight: 500,
                color: isActive ? '#FFF' : 'var(--text-muted)',
                background: isActive ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(124, 58, 237, 0.1) 100%)' : 'transparent',
                border: isActive ? '1px solid rgba(79, 70, 229, 0.25)' : '1px solid transparent',
                transition: 'all 0.2s ease'
              })}
            >
              <IconComponent size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-glass)', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        StudyPilot Core v1.0.0
      </div>
    </aside>
  );
}