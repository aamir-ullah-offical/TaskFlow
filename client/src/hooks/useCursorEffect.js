import { useState, useEffect, useCallback } from 'react';

/**
 * useCursorEffect – tracks mouse position and hover state for a custom cursor overlay.
 * Returns { x, y, isHovering, isClicking } to drive CursorEffect.jsx.
 */
const useCursorEffect = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const handleMouseMove = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp   = useCallback(() => setIsClicking(false), []);

  const handleMouseEnterInteractive = useCallback(() => setIsHovering(true), []);
  const handleMouseLeaveInteractive = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    // Hover detection – attach to all interactive elements
    const selectors = 'a, button, [data-cursor-hover], input, textarea, label';

    const addListeners = () => {
      const els = document.querySelectorAll(selectors);
      els.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      return els;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    let els = addListeners();

    // Re-scan DOM when new elements might be added (light MutationObserver)
    const observer = new MutationObserver(() => {
      els.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      els = addListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      els.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseEnterInteractive, handleMouseLeaveInteractive]);

  return { ...position, isHovering, isClicking };
};

export default useCursorEffect;
