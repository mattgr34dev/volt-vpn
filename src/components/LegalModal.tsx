import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LEGAL_DOCUMENTS, type LegalDocId } from '../types';

interface LegalModalProps {
  docId: LegalDocId;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ docId, onClose }) => {
  useEffect(() => {
    if (!docId) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [docId, onClose]);

  const doc = docId ? LEGAL_DOCUMENTS[docId] : null;

  return (
    <AnimatePresence>
      {doc && (
        <motion.div
          className="legal-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
            className="legal-modal-card"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="legal-modal-header">
              <div>
                <p className="legal-modal-eyebrow">{doc.updatedAt}</p>
                <h2 id="legal-modal-title" className="legal-modal-title">
                  {doc.title}
                </h2>
                <p className="legal-modal-caption">{doc.caption}</p>
              </div>
              <button
                type="button"
                className="legal-modal-close"
                onClick={onClose}
                aria-label="Закрыть окно"
              >
                ✕
              </button>
            </div>

            <div className="legal-modal-body">
              {doc.sections.map((sec) => (
                <div key={sec.heading} className="legal-modal-section">
                  <h3>{sec.heading}</h3>
                  <p>{sec.body}</p>
                </div>
              ))}
            </div>

            <div className="legal-modal-footer">
              <button
                type="button"
                className="legal-modal-done-btn"
                onClick={onClose}
              >
                Понятно
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
