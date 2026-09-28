"use client";

import * as React from "react";

const TOP = 150; // where the ribbon starts (px from page top)
const BOTTOM = 150; // how far above the page end it finishes

/**
 * A looping ribbon: x = cx + A·sin t, y = P·t + L·(1 − cos t).
 * When L > P the curve doubles back on itself, which gives the twists.
 * A whole number of loops is used so the ribbon ends exactly at the bottom.
 */
function buildPath(w: number, h: number) {
  const span = h - TOP - BOTTOM;
  const loops = Math.max(1, Math.round(span / (2 * Math.PI * 280)));
  const T = loops * 2 * Math.PI;
  const P = span / T;
  const L = P * 1.4;
  const A = Math.min(w * 0.36, 420);
  const cx = w / 2;

  let d = "";
  // running max of y and cumulative length (0..1) per sample, so scroll
  // position can be mapped to "how much of the ribbon to draw"
  const maxY: number[] = [];
  const cum: number[] = [];
  let px = 0;
  let py = 0;
  let total = 0;
  for (let t = 0; t <= T + 0.0001; t += 0.05) {
    const x = cx + A * Math.sin(t);
    const y = TOP + P * t + L * (1 - Math.cos(t));
    if (d) total += Math.hypot(x - px, y - py);
    d += `${d ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
    maxY.push(Math.max(y, maxY[maxY.length - 1] ?? y));
    cum.push(total);
    px = x;
    py = y;
  }
  return { d, maxY, cum: cum.map((c) => c / total) };
}

export default function ScrollArrow() {
  const pathRef = React.useRef<SVGPathElement>(null);
  const headRef = React.useRef<SVGGElement>(null);
  const [size, setSize] = React.useState({ w: 0, h: 0 });

  // track the page size (it changes as sections pin / images load)
  React.useEffect(() => {
    const measure = () =>
      setSize({ w: document.body.offsetWidth, h: document.body.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);

  const built = React.useMemo(
    () => (size.w && size.h ? buildPath(size.w, size.h) : null),
    [size.w, size.h],
  );
  const d = built?.d ?? "";

  React.useEffect(() => {
    const path = pathRef.current;
    const head = headRef.current;
    if (!path || !head || !built) return;
    const { maxY, cum } = built;

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;

    let shown = 0;
    let raf = 0;
    let running = false;

    // fraction of the ribbon whose tip first reaches ~65% down the viewport
    const target = () => {
      const y = window.scrollY + window.innerHeight * 0.65;
      let lo = 0;
      let hi = maxY.length - 1;
      if (y >= maxY[hi]) return 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (maxY[mid] >= y) hi = mid;
        else lo = mid + 1;
      }
      return cum[lo];
    };

    const draw = (f: number) => {
      const at = f * len;
      path.style.strokeDashoffset = `${len - at}`;
      const b = path.getPointAtLength(at);
      const a = path.getPointAtLength(Math.max(0, at - 3));
      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      head.setAttribute("transform", `translate(${b.x} ${b.y}) rotate(${angle})`);
      head.style.opacity = at > 4 ? "1" : "0";
    };

    const tick = () => {
      const tgt = target();
      shown += (tgt - shown) * 0.1;
      if (Math.abs(tgt - shown) < 0.0002) shown = tgt;
      draw(shown);
      if (shown !== tgt) raf = requestAnimationFrame(tick);
      else running = false;
    };

    const kick = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    kick();
    window.addEventListener("scroll", kick, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
    };
  }, [built]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {d && (
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${size.w} ${size.h}`}
          fill="none"
        >
          <defs>
            <linearGradient id="arrow-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#4f46e5" />
              <stop offset="1" stopColor="#7c4dff" />
            </linearGradient>
          </defs>
          <g opacity="0.5">
            <path
              ref={pathRef}
              d={d}
              stroke="url(#arrow-grad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDashoffset="99999"
            />
            <g ref={headRef} style={{ opacity: 0 }}>
              <path d="M-4,-11 L16,0 L-4,11 L1,0 Z" fill="#6d4df0" />
            </g>
          </g>
        </svg>
      )}
    </div>
  );
}
