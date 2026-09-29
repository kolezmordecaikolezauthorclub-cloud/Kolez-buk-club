"use client";

import { Eyebrow, Reveal } from "./shared";
import { TestimonialMarquee } from "./testimonial-marquee";

/**
 * Author testimonials — genuine feedback collected from authors and clients
 * who have taken part in the club.
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
