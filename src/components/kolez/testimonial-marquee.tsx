"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { AUTHOR_TESTIMONIALS, type AuthorTestimonial } from "./testimonials-data";

/**
 * Testimonial cards — genuine feedback collected from authors and clients
 * who have taken part in the club.
 */

const AUTO_SPEED = 0.045; // px per ms (~45px/s) — slow, premium drift
const MANUAL_GRACE_MS = 750; // auto-scroll pause after user interaction

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TestimonialCard({ t }: { t: AuthorTestimonial }) {
  return (
    <figure className="relative flex h-full w-[320px] shrink-0 flex-col rounded-2xl border border-gold-500/25 bg-white p-7 shadow-[0_18px_44px_-24px_rgba(7,27,53,0.4)] sm:w-[400px] sm:p-8 lg:w-[440px]">
      {/* Thin gold accent */}
      <span
        className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600"
        aria-hidden
      />
      <Quote className="h-6 w-6 text-gold-500/60" aria-hidden />
      <blockquote className="mt-4 flex-1 text-[14.5px] leading-[1.75] text-navy-800 sm:text-[15px]">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3.5 border-t border-border pt-5">
        {/* Professional author avatar placeholder (initials) */}
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-950 font-display text-sm font-bold tracking-wider text-gold-400 ring-1 ring-gold-500/40"
          aria-hidden
        >
          {initialsOf(t.name)}
        </span>
        <span>
          <span className="block font-display text-[16px] font-semibold text-navy-950">
            {t.name}
          </span>
          <span className="mt-0.5 block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-gold-600">
            {t.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Horizontally auto-scrolling, seamlessly looping strip of testimonial cards.
 * - Continuous smooth drift to the left (rAF-driven), pauses on hover of the
 *   enclosing page section and during touch/wheel/pointer interaction.
 * - Manual navigation via left/right arrow buttons (exactly one card step).
 * - Natively swipeable on touch devices (overflow scroll).
 * - Honors prefers-reduced-motion (auto-drift disabled, arrows still work).
 */
export function TestimonialMarquee({
  items = AUTHOR_TESTIMONIALS,
}: {
  items?: AuthorTestimonial[];
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const manualUntilRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!root || !viewport || !track) return;

    // Pause when hovering anywhere over the enclosing page section.
    const hoverTarget = (root.closest("section") as HTMLElement | null) ?? root;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let hoverPaused = false;

    const step = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;

      if (!reducedMotion && !hoverPaused && now >= manualUntilRef.current) {
        viewport.scrollLeft += AUTO_SPEED * dt;
      }

      // Seamless wrap point — track holds two identical copies, so the half
      // width is exactly one copy. Jumping by ±half is visually invisible.
      const half = track.scrollWidth / 2;
      if (half > 0) {
        if (viewport.scrollLeft >= half) viewport.scrollLeft -= half;
        else if (viewport.scrollLeft <= 0.5 && !reducedMotion) viewport.scrollLeft += half;
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onEnter = () => { hoverPaused = true; };
    const onLeave = () => { hoverPaused = false; };
    const onInteract = () => { manualUntilRef.current = performance.now() + MANUAL_GRACE_MS; };

    hoverTarget.addEventListener("mouseenter", onEnter);
    hoverTarget.addEventListener("mouseleave", onLeave);
    viewport.addEventListener("pointerdown", onInteract, { passive: true });
    viewport.addEventListener("touchstart", onInteract, { passive: true });
    viewport.addEventListener("wheel", onInteract, { passive: true });
    viewport.addEventListener("touchend", onInteract, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      hoverTarget.removeEventListener("mouseenter", onEnter);
      hoverTarget.removeEventListener("mouseleave", onLeave);
      viewport.removeEventListener("pointerdown", onInteract);
      viewport.removeEventListener("touchstart", onInteract);
      viewport.removeEventListener("wheel", onInteract);
      viewport.removeEventListener("touchend", onInteract);
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const firstCard = track.querySelector<HTMLElement>("figure");
    if (!firstCard) return;
    const gap =
      parseFloat(getComputedStyle(firstCard.parentElement ?? track).columnGap || "20") || 20;
    const stepPx = firstCard.offsetWidth + gap;
    const half = track.scrollWidth / 2;
    let target = viewport.scrollLeft + dir * stepPx;
    if (target >= half) target -= half;
    if (target < 0) target += half;
    viewport.scrollTo({ left: target, behavior: "smooth" });
    manualUntilRef.current = performance.now() + MANUAL_GRACE_MS + 450;
  };

  return (
    <div ref={rootRef} className="relative">
      {/* Edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[5] hidden w-20 bg-gradient-to-r from-navy-950 to-transparent lg:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[5] hidden w-20 bg-gradient-to-l from-navy-950 to-transparent lg:block"
        aria-hidden
      />

      {/* Arrows — desktop */}
      <button
        type="button"
        aria-label="Scroll testimonials left"
        onClick={() => nudge(-1)}
        className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/50 bg-navy-900/90 text-gold-400 shadow-lg backdrop-blur transition-all duration-300 hover:bg-gold-500 hover:text-navy-950 lg:flex"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <button
        type="button"
        aria-label="Scroll testimonials right"
        onClick={() => nudge(1)}
        className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/50 bg-navy-900/90 text-gold-400 shadow-lg backdrop-blur transition-all duration-300 hover:bg-gold-500 hover:text-navy-950 lg:flex"
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>

      {/* Swipeable / auto-scrolling viewport */}
      <div
        ref={viewportRef}
        className="no-scrollbar overflow-x-auto overscroll-x-contain"
      >
        <div ref={trackRef} className="flex w-max items-stretch">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex items-stretch gap-4 py-2 pr-4 sm:gap-5 sm:pr-5"
            >
              {items.map((t, i) => (
                <TestimonialCard key={`${copy}-${i}`} t={t} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows — mobile (below the strip) */}
      <div className="mt-7 flex items-center justify-center gap-4 lg:hidden">
        <button
          type="button"
          aria-label="Scroll testimonials left"
          onClick={() => nudge(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/50 bg-navy-900/90 text-gold-400 transition-all duration-300 active:bg-gold-500 active:text-navy-950"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          aria-label="Scroll testimonials right"
          onClick={() => nudge(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/50 bg-navy-900/90 text-gold-400 transition-all duration-300 active:bg-gold-500 active:text-navy-950"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
