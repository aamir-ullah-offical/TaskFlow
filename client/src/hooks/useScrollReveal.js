import { useEffect, useRef } from 'react';

/**
 * useScrollReveal – attaches an IntersectionObserver to a container ref.
 * All children with [data-reveal] attribute gain the class "revealed" when
 * they enter the viewport, triggering CSS transition animations.
 *
 * @param {object} options   IntersectionObserver options override
 * @returns {React.Ref}      Ref to attach to the section container
 */
const useScrollReveal = (options = {}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const defaultOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px',
      ...options,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Once revealed, stop observing for performance
          observer.unobserve(entry.target);
        }
      });
    }, defaultOptions);

    // Observe all [data-reveal] children inside the container
    const targets = container.querySelectorAll('[data-reveal]');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [options]);

  return containerRef;
};

export default useScrollReveal;
