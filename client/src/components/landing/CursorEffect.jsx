import { useEffect } from 'react';
import useCursorEffect from '../../hooks/useCursorEffect';
import styles from '../../pages/LandingPage.module.css';

/**
 * CursorEffect – renders a custom two-layer cursor (dot + ring) that follows
 * the mouse. Scales and glows when hovering interactive elements.
 * Automatically hidden on touch/mobile devices via CSS.
 */
const CursorEffect = () => {
  const { x, y, isHovering, isClicking } = useCursorEffect();

  // Hide native cursor on desktop
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (!isTouchDevice) {
      document.body.style.cursor = 'none';
    }
    return () => {
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        className={`${styles.cursorDot} ${isHovering ? styles.cursorDotHover : ''} ${isClicking ? styles.cursorDotClick : ''}`}
        style={{ transform: `translate(${x - 4}px, ${y - 4}px)` }}
        aria-hidden="true"
      />
      {/* Outer ring */}
      <div
        className={`${styles.cursorRing} ${isHovering ? styles.cursorRingHover : ''} ${isClicking ? styles.cursorRingClick : ''}`}
        style={{ transform: `translate(${x - 20}px, ${y - 20}px)` }}
        aria-hidden="true"
      />
    </>
  );
};

export default CursorEffect;
