"use client";

import { Star, BadgeCheck } from "lucide-react";
import {
  CtaBand,
  Eyebrow,
  PageHero,
  Reveal,
} from "../shared";
import { TestimonialMarquee } from "../testimonial-marquee";

export function VoicesPage() {
  return (
    <>
      <PageHero eyebrow="Testimonials" title="What Our Community Says">
        A dedicated room for the voices of Kolez Buk Club — the writers who share their
        books here, and the readers who bring those books to life.
      </PageHero>

      {/* ————— Featured real testimonial ————— */}
      <section className="texture-navy relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent"
          aria-hidden
        />
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:py-24 lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 border border-gold-500/50 bg-gold-500/10 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-gold-400">
              <BadgeCheck className="h-4 w-4" aria-hidden />
              Real Community Review
            </span>
          </Reveal>

          <Reveal delay={100}>
            <figure className="mt-10">
              <div
                className="flex items-center justify-center gap-1.5"
                aria-label="Rated five out of five stars"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" aria-hidden />
                ))}
              </div>
              <blockquote className="mx-auto mt-8 max-w-3xl font-display text-[21px] italic leading-relaxed text-white sm:text-[26px] sm:leading-relaxed">
                &ldquo;Joining Kolez Buk Club changed what my book meant to me. Within
                weeks, real readers were reading my story, asking questions, and discussing
                it with a care I never expected. The reviews were honest and detailed, the
                conversations genuine, and the encouragement constant. I did not just find
                readers here — I found a community that treats every author&rsquo;s work
                like it truly matters.&rdquo;
              </blockquote>
              <figcaption className="mt-10 flex flex-col items-center gap-3">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/50 bg-navy-800 font-display text-base font-bold tracking-wider text-gold-400"
                  aria-hidden
                >
                  GA
                </span>
                <span>
                  <span className="block font-display text-lg font-semibold text-white">
                    Grace Adeyemi
                  </span>
                  <span className="mt-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.3em] text-gold-400">
                    Author · Early Club Member
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ————— Scrolling author voices (placeholder reviews) ————— */}
      <section className="texture-navy relative overflow-hidden pb-20 sm:pb-24">
        <div className="mx-auto max-w-[1360px] px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow onDark center>
                Author Voices
              </Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-[42px]">
                From the Writers
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mx-auto mt-6 max-w-2xl text-[15.5px] leading-relaxed text-white/70">
                A continuously growing record of author experiences from inside the club —
                swipe through it, use the arrows, or simply let the stories drift by.
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

      {/* ————— Invitation ————— */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <Eyebrow center>Your Voice Here</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-4xl">
              This Page Is Waiting for Your Story.
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 text-[15.5px] leading-relaxed text-ink-muted">
              As members read, discuss, and connect, their experiences will fill this page
              with genuine voices. Join the club, be part of the story, and perhaps one day
              your words will appear here for the next generation of authors and readers.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        primaryLabel="Join the Club"
        primaryTo="/contact?intent=join"
        secondaryLabel="Submit Your Book"
        secondaryTo="/submit"
      />
    </>
  );
}
