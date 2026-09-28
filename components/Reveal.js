"use client";

import { useEffect, useRef } from "react";

// `offset` shrinks the viewport's bottom edge (e.g. "-15%") so the element
// appears only once it has scrolled a bit into view.
export default function Reveal({ children, className = "", offset = "0px" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        // toggle (don't disconnect) so the animation replays on every pass
        el.classList.toggle("in", e.isIntersecting);
      },
      { threshold: 0.12, rootMargin: `0px 0px ${offset} 0px` }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [offset]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
