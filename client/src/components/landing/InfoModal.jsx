import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import styles from '../../pages/LandingPage.module.css';

/**
 * InfoModal – gorgeous full-screen overlay modal for footer pages.
 * - Blurred backdrop
 * - Slide-up + fade animation
 * - Sticky header with title + glowing X close button
 * - Scrollable body
 * - Closes on ESC key or backdrop click
 */
const InfoModal = ({ isOpen, onClose, title, badge, children }) => {
  const bodyRef = useRef(null);

  // Keyboard close + scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalBackdrop}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className={styles.modalPanel}>
        {/* ── Sticky modal header ────────────────────────────── */}
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            {badge && (
              <span className={styles.modalBadge}>{badge}</span>
            )}
            <h2 className={styles.modalTitle}>{title}</h2>
          </div>

          {/* Close button */}
          <button
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close"
            data-cursor-hover
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Scrollable body ────────────────────────────────── */}
        <div className={styles.modalBody} ref={bodyRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
