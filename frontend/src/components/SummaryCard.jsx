import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, ClipboardCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SummaryCard({ topic, content }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Summary text copied to clipboard matrix!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `StudyPilot-Summary-${topic.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Summary file download initialized.");
  };

  return (
    <motion.div className="glass-panel summary-output-card" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
      <div className="summary-header-actions">
        <div className="summary-title-block">
          <h2>{topic}</h2>
          <div className="summary-timestamp">Generated Engine Abstract</div>
        </div>
        <div className="summary-actions-cluster">
          <button className="summary-icon-action-btn" onClick={handleCopy} title="Copy Content">
            {copied ? <ClipboardCheck size={18} style={{ color: '#10B981' }} /> : <Copy size={18} />}
          </button>
          <button className="summary-icon-action-btn" onClick={handleDownload} title="Download File">
            <Download size={18} />
          </button>
        </div>
      </div>
      <div className="summary-rich-body">{content}</div>
    </motion.div>
  );
}