"use client";

import { Info } from "lucide-react";
import { Eyebrow, Reveal } from "./shared";
import { TestimonialMarquee } from "./testimonial-marquee";

/**
 * PLACEHOLDER CONTENT NOTICE (also displayed visibly in the UI):
 * The cards below are fictional placeholder testimonials for the website
 * concept. They must be replaced with genuine author testimonials and must
 * not be presented as verified member reviews before the site is published.
 */
export function AuthorTestimonials() {
  return (
    <section
      aria-label="Author testimonials"
      className="texture-navy relative overflow-hidden py-20 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-[1360px] px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow onDark center>
              Author Testimonials
            </Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-[42px]">
              What Authors Are Saying
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mx-auto mt-6 flex max-w-2xl items-start justify-center gap-2.5 text-left text-[12.5px] leading-relaxed text-white/55">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-500/80" aria-hidden />
              <span>
                Placeholder testimonials shown for concept demonstration only — these are
                not verified member reviews. Genuine author testimonials will replace them
                before the website is published.
              </span>
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={220}>
        <div className="mt-12">
          <TestimonialMarquee />
        </div>
      </Reveal>
    </section>
  );
}
