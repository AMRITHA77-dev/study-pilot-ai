import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, File, X } from 'lucide-react';
import { uploadPDF } from '../api/api';
import toast from 'react-hot-toast';
import '../styles/upload.css';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    if (e.type === "dragenter" || e.type === "dragover") setDragging(true);
    else if (e.type === "dragleave") setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const targetFile = e.dataTransfer.files[0];
      if (targetFile.type === "application/pdf") setFile(targetFile);
      else toast.error("System validation error: Source must be a PDF file structure.");
    }
  };

  const handleUpload = async () => {
    if (!file || uploading) return;
    setUploading(true);
    setProgress(0);
    try {
      await uploadPDF(file, (e) => {
        setProgress(Math.round((e.loaded * 100) / e.total));
      });
      toast.success("Document system ingestion track complete.");
      setFile(null);
    } catch (err) {
      toast.error("Pipeline push failure. Verify backend connection state.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div className="page-wrapper" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
      <div className="upload-container-layout">
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '8px' }}>Document Vault Pipeline</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Mount text frameworks into local knowledge matrix grids.</p>
        
        <div className={`upload-dropzone-box ${dragging ? 'dragging' : ''}`} onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} onClick={() => fileInputRef.current.click()}>
          <input type="file" className="file-input-hidden" ref={fileInputRef} accept="application/pdf" onChange={(e) => { if(e.target.files[0]) setFile(e.target.files[0]); }} />
          <UploadCloud className="upload-cloud-icon" />
          <h3>Drag operational PDF here</h3>
          <p>or select file path routes manually</p>
        </div>

        {file && (
          <motion.div className="glass-panel selected-file-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="file-icon-frame"><File size={20} /></div>
            <div className="file-details-grow">
              <div className="file-name-label">{file.name}</div>
              <div className="file-size-label">{(file.size / (1024 * 1024)).toFixed(2)} MB</div>
            </div>
            {!uploading && <X className="remove-file-action" onClick={() => setFile(null)} size={18} />}
          </motion.div>
        )}

        {uploading && (
          <div className="upload-progress-container">
            <div className="progress-track"><div className="progress-fill-bar" style={{ width: `${progress}%` }}></div></div>
            <div className="progress-percentage-txt">Pushing node payload: {progress}%</div>
          </div>
        )}

        {file && !uploading && <button className="btn-primary upload-trigger-btn" onClick={handleUpload}>Execute Ingestion Loop</button>}
      </div>
    </motion.div>
  );
}