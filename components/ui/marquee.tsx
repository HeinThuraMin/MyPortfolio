import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  /** Scroll right instead of left */
  reverse?: boolean;
  /** Seconds for one full loop */
  duration?: number;
  /** Pause the loop while hovered */
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Infinite marquee: the content is rendered twice and both copies slide
 * left by exactly their own width, so the loop is seamless.
 */
export default function Marquee({
  children,
  reverse = false,
  duration = 40,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]",
        className,
      )}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "animate-marquee flex min-w-full shrink-0 items-center justify-around gap-4 pr-4",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
          style={{
            animationDuration: `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
