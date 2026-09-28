"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

interface TextBlockAnimationProps {
  children: React.ReactElement | React.ReactElement[];
  /** Color of the wiping block */
  blockColor?: string;
  /** Reveal when scrolled into view (otherwise plays on mount) */
  animateOnScroll?: boolean;
  /** Delay before the first line, in seconds */
  delay?: number;
  /** Delay between lines, in seconds */
  stagger?: number;
  /** Duration of each half of the wipe, in seconds */
  duration?: number;
  className?: string;
}

/**
 * Reveals each line of its children with a colored block that wipes in,
 * uncovers the text, then wipes out. Children must be elements (h1, p, ...).
 */
export default function TextBlockAnimation({
  children,
  blockColor = "#7c4dff",
  animateOnScroll = true,
  delay = 0,
  stagger = 0.12,
  duration = 0.45,
  className,
}: TextBlockAnimationProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const splits: SplitText[] = [];
      const tweens: gsap.core.Timeline[] = [];
      let cancelled = false;

      const run = () => {
        if (cancelled) return;
        const targets = Array.from(container.children) as HTMLElement[];

        targets.forEach((el) => {
          const split = SplitText.create(el, { type: "lines", linesClass: "tba-line" });
          splits.push(split);

          const centered = getComputedStyle(el).textAlign === "center";
          const tl = gsap.timeline({
            delay,
            paused: animateOnScroll,
          });

          split.lines.forEach((line, i) => {
            // wrap each line so the block hugs the text width
            const wrapper = document.createElement("div");
            wrapper.style.cssText = "position:relative;overflow:hidden;width:fit-content;max-width:100%" + (centered ? ";margin-inline:auto" : "");
            line.parentNode?.insertBefore(wrapper, line);
            wrapper.appendChild(line);

            const block = document.createElement("div");
            block.style.cssText = `position:absolute;inset:0;background:${blockColor};transform:scaleX(0);transform-origin:left center`;
            wrapper.appendChild(block);

            gsap.set(line, { opacity: 0 });

            const at = i * stagger;
            tl.to(block, { scaleX: 1, duration, ease: "power4.inOut" }, at)
              .set(line, { opacity: 1 }, at + duration)
              .set(block, { transformOrigin: "right center" }, at + duration)
              .to(block, { scaleX: 0, duration, ease: "power4.inOut" }, at + duration);
          });

          tweens.push(tl);

          if (animateOnScroll) {
            // replay every time the text enters view (from either direction)
            // and rewind it once it has fully left, so it is hidden again
            const rewind = () => tl.pause(0);
            const replay = () => tl.restart(true);
            ScrollTrigger.create({
              trigger: el,
              start: "top 90%",
              end: "bottom top",
              onEnter: replay,
              onEnterBack: replay,
              onLeave: rewind,
              onLeaveBack: rewind,
            });
          }
        });
      };

      // wait for web fonts so line breaks are measured correctly
      document.fonts.ready.then(run);

      return () => {
        cancelled = true;
        tweens.forEach((t) => t.kill());
        splits.forEach((s) => {
          // unwrap our wrappers before SplitText restores the original markup
          s.lines.forEach((line) => {
            const wrapper = line.parentElement;
            if (wrapper && wrapper !== container) {
              wrapper.replaceWith(line);
            }
          });
          s.revert();
        });
      };
    },
    { scope: containerRef, dependencies: [blockColor, animateOnScroll, delay, stagger, duration] },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
