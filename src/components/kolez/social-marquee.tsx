"use client";

import { useEffect, useRef, type ReactNode } from "react";

const AUTO_SPEED = 0.045; // px per ms (~45px/s) — matches the testimonial drift
const COPIES = 3; // extra copies keep the loop seamless even on ultra-wide screens

/**
 * Continuously left-drifting marquee strip — the JS rAF engine used by the
 * testimonial marquee, so it scrolls reliably in every browser/environment
 * (a pure-CSS animation can be disabled by OS "reduce motion" settings or
 * stale cached stylesheets).
 *
 * The content is decorative and non-interactive, so this strip intentionally
 * keeps drifting regardless of prefers-reduced-motion.
 *
 * Mechanic: the track holds three identical copies; the viewport's
 * scrollLeft is driven rightward (visual movement to the left) and wraps by
 * exactly one copy width, which is pixel-identical and therefore seamless.
 */
export function SocialMarquee({ children }: { children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;

      viewport.scrollLeft += AUTO_SPEED * dt;

      const oneCopy = track.scrollWidth / COPIES;
      if (oneCopy > 0 && viewport.scrollLeft >= oneCopy) {
        viewport.scrollLeft -= oneCopy;
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={viewportRef} className="no-scrollbar overflow-hidden">
      <div ref={trackRef} className="flex w-max items-center">
        {Array.from({ length: COPIES }).map((_, copy) => (
          <div
            key={copy}
            aria-hidden={copy > 0}
            className="flex items-center gap-14 pr-14 sm:gap-16 sm:pr-16"
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
