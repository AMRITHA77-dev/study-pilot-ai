import React from 'react';
import { FileText, Calendar } from 'lucide-react';

export default function UploadCard({ name, date, size }) {
  return (
    <div className="recent-upload-item">
      <div className="recent-upload-meta">
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
          <FileText size={18} />
        </div>
        <div>
          <div className="recent-upload-name" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '2px' }}>
            <span className="recent-upload-date" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={10} />{date}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{size}</span>
          </div>
        </div>
      </div>
    </div>
  );
}