"use client";

import Image from "next/image";
import { Compass, Link2, BookOpen, MessagesSquare, HeartHandshake, Sprout } from "lucide-react";
import {
  CtaBand,
  Eyebrow,
  GoldButton,
  OutlineButton,
  PageHero,
  Reveal,
} from "../shared";

const STAGES = [
  {
    n: "01",
    icon: <Compass className="h-5 w-5" aria-hidden />,
    title: "Discover",
    lead: "A book is accepted into the club and prepared for its introduction.",
    detail:
      "Every journey begins with a careful read. The Kolez team reviews each submission by hand — story, genre, and the readers it will reach — and prepares an introduction that treats the book as a discovery worth sharing, not an ad to be scrolled past.",
  },
  {
    n: "02",
    icon: <Link2 className="h-5 w-5" aria-hidden />,
    title: "Connect",
    lead: "The right readers are brought to the right story.",
    detail:
      "Connection is the heart of the club. Readers meet the book through curated introductions and shared reading activities; authors meet the people their words have reached — the most meaningful audience a writer can have.",
  },
  {
    n: "03",
    icon: <BookOpen className="h-5 w-5" aria-hidden />,
    title: "Read",
    lead: "The club gives the book its most valuable gift: time.",
    detail:
      "No rushing and no skimming. Every reader is encouraged to live inside the story at its own pace, because a reading club and a promotional channel are two very different things — and we only ever intend to be the first one.",
  },
  {
    n: "04",
    icon: <MessagesSquare className="h-5 w-5" aria-hidden />,
    title: "Discuss",
    lead: "Private reading becomes shared experience.",
    detail:
      "Discussion is where the club comes alive. Readers gather around characters, ideas, and craft, carrying their questions to the author and hearing answers that change how the book reads. Honest debate is welcome here; empty applause is not.",
  },
  {
    n: "05",
    icon: <HeartHandshake className="h-5 w-5" aria-hidden />,
    title: "Engage",
    lead: "The author hears what readers truly think.",
    detail:
      "Engagement is where authors feel the club's value most directly: honest reactions, specific feedback, and genuine interaction from people who have actually spent nights inside the story.",
  },
  {
    n: "06",
    icon: <Sprout className="h-5 w-5" aria-hidden />,
    title: "Grow",
    lead: "Momentum that outlives the moment.",
    detail:
      "Reviews accumulate, recommendations travel, and relationships continue. Authors grow a readership that follows them to the next book; readers grow shelves and friendships. The story does not end with a cycle — it compounds.",
  },
];

export function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="The Journey"
        title="The Kolez Experience"
        image="/images/notebook-gold.jpg"
        imageAlt="A navy and gold marbled notebook with a fountain pen"
      >
        How a book moves through the club — six deliberate stages that
        carry a story from first discovery to lasting recognition.
      </PageHero>

      {/* ————— Intro ————— */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <Eyebrow center>From First Page to Lasting Connection</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-[42px]">
              One Journey. Every Stage Deliberate.
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-6 space-y-5 text-[15.5px] leading-relaxed text-ink-muted">
              <p>
                For an author, the journey begins the day a manuscript is submitted and
                unfolds into discovery, discussion, and a readership that stays. For the
                book, it begins with a careful first read — and matures into conversation,
                recognition, and a life that outlives launch week.
              </p>
              <p>
                Every book passes through the same six stages. Each one is deliberate and
                human, designed to give stories the one thing no algorithm can manufacture:
                real attention from real people.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— Timeline ————— */}
      <section className="bg-soft py-20 sm:py-24">
        <div className="mx-auto max-w-[1000px] px-5 lg:px-8">
          <ol className="relative space-y-10 before:absolute before:bottom-8 before:left-[27px] before:top-8 before:w-px before:bg-gradient-to-b before:from-gold-500/10 before:via-gold-500/60 before:to-gold-500/10 sm:before:left-[35px]">
            {STAGES.map((stage, i) => (
              <li key={stage.n} className="relative">
                <Reveal delay={i * 60}>
                  <div className="flex gap-6 sm:gap-10">
                    {/* Node */}
                    <div className="relative z-10 flex flex-col items-center">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold-500/50 bg-navy-950 font-display text-lg font-bold text-gold-400 shadow-[0_0_0_6px_rgba(245,246,248,1)] sm:h-[70px] sm:w-[70px] sm:text-xl">
                        {stage.n}
                      </span>
                    </div>
                    {/* Card */}
                    <article className="group relative flex-1 border border-border bg-white p-7 transition-all duration-300 hover:border-gold-500/60 hover:shadow-[0_20px_48px_-22px_rgba(7,27,53,0.3)] sm:p-9">
                      <span
                        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 transition-transform duration-500 group-hover:scale-x-100"
                        aria-hidden
                      />
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="flex h-10 w-10 items-center justify-center border border-gold-500/40 bg-gold-500/10 text-gold-600">
                          {stage.icon}
                        </span>
                        <h3 className="font-display text-2xl font-semibold tracking-wide text-navy-950 sm:text-[28px]">
                          {stage.title}
                        </h3>
                      </div>
                      <p className="mt-4 font-display text-[17px] italic leading-snug text-navy-800">
                        {stage.lead}
                      </p>
                      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">
                        {stage.detail}
                      </p>
                    </article>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ————— Band with image ————— */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1360px] items-center gap-12 px-5 lg:grid-cols-5 lg:px-8">
          <Reveal className="lg:col-span-2">
            <div className="relative mx-auto max-w-[420px]">
              <div className="absolute -left-4 -top-4 h-full w-full border border-gold-500/40" aria-hidden />
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/images/books-stack.jpg"
                  alt="A neat stack of navy hardcover books"
                  fill
                  sizes="(min-width: 1024px) 420px, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-3">
            <Reveal>
              <Eyebrow>The Result</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-4xl">
                A Premium Experience, Built Around People.
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 text-[15.5px] leading-relaxed text-ink-muted">
                The Kolez experience is deliberately unhurried. We favor depth over volume:
                fewer introductions, given more care; real conversations, kept alive longer;
                relationships, allowed to compound. That is why the club feels less like a
                platform and more like a society of people who believe stories matter.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <GoldButton to="/submit">Submit Your Book</GoldButton>
                <OutlineButton to="/contact">Contact Us</OutlineButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        message="Six stages. One club. Countless stories waiting to be discovered."
        primaryLabel="Submit Your Book"
        primaryTo="/submit"
        secondaryLabel="Contact Us"
        secondaryTo="/contact"
      />
    </>
  );
}
