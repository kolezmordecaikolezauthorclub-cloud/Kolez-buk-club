"use client";

import Image from "next/image";
import {
  Compass,
  Link2,
  MessagesSquare,
  Sprout,
  BookOpen,
  Feather,
  Quote,
} from "lucide-react";
import {
  CtaBand,
  Eyebrow,
  FeatureCard,
  PageHero,
  Reveal,
} from "../shared";

const BELIEFS = [
  "The best marketing a book can have is a reader who finished it.",
  "Authors deserve honest readers, not empty applause.",
  "Readers deserve curation, not another endless feed.",
  "A single deep conversation outweighs a thousand impressions.",
];

const PILLARS = [
  {
    icon: <Compass className="h-5 w-5" aria-hidden />,
    title: "Discovery",
    text: "We look for books that deserve more attention than the market gave them — and we put them in front of readers who are genuinely looking.",
  },
  {
    icon: <Link2 className="h-5 w-5" aria-hidden />,
    title: "Connection",
    text: "We bring authors and readers into the same conversation — so that admiration can turn into acquaintance.",
  },
  {
    icon: <MessagesSquare className="h-5 w-5" aria-hidden />,
    title: "Discussion",
    text: "Our discussions are deliberate — moderated, curious, and honest — because shallow praise helps nobody.",
  },
  {
    icon: <Sprout className="h-5 w-5" aria-hidden />,
    title: "Growth",
    text: "A feature here is not a moment — it is momentum. Conversations become relationships, and relationships become readers who follow an author to their next book.",
  },
];

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="About Kolez Buk Club"
        image="/images/library-ladder.jpg"
        imageAlt="A bright literary library with tall shelves and a rolling ladder"
      >
        Kolez Buk Club began with a simple observation: wonderful books were being
        published every day, and most of them were fading away unread. We exist to change
        that — one story, one reader, and one honest conversation at a time.
      </PageHero>

      {/* ————— Origin ————— */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1360px] items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-[500px]">
              <div className="absolute -right-4 -top-4 h-full w-full border border-gold-500/40" aria-hidden />
              <div className="relative aspect-[3/4] max-h-[560px] w-full overflow-hidden">
                <Image
                  src="/images/portrait-book.jpg"
                  alt="An antique open book beside a fountain pen in warm candlelight"
                  fill
                  sizes="(min-width: 1024px) 500px, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow>Why We Exist</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-4xl">
                A Club Built Around the Love of Books
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-6 space-y-5 text-[15.5px] leading-relaxed text-ink-muted">
                <p>
                  Every book begins its life alone — one person, one desk, one stubborn
                  manuscript. What happens next decides everything. A book that is read
                  closely, argued over, and recommended by hand can outlive its own launch
                  by years; a book that is merely listed can vanish in a week.
                </p>
                <p>
                  Kolez Buk Club was founded to stand in that gap. We are a literary
                  club devoted to four commitments: <strong className="font-semibold text-navy-950">discovery</strong>,
                  helping books find the readers they were written for; <strong className="font-semibold text-navy-950">connection</strong>,
                  putting authors and readers in the same conversation; <strong className="font-semibold text-navy-950">discussion</strong>,
                  giving stories the scrutiny and celebration they deserve; and <strong className="font-semibold text-navy-950">growth</strong>,
                  turning single encounters into relationships that last.
                </p>
                <p>
                  We are not a bookstore, and we are not for sale. Every book in the club
                  earned its place the same way: on merit.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ————— Mission & Vision ————— */}
      <section className="bg-soft py-20 sm:py-24">
        <div className="mx-auto max-w-[1360px] px-5 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="texture-navy relative h-full overflow-hidden border border-navy-800 p-9 sm:p-12">
                <Quote className="absolute right-8 top-8 h-10 w-10 text-gold-500/25" aria-hidden />
                <Eyebrow onDark>Our Mission</Eyebrow>
                <p className="mt-6 font-display text-2xl font-medium leading-snug text-white sm:text-[26px]">
                  &ldquo;To give deserving books a real reading life — and to give authors
                  and readers a place where those books can be discovered, discussed, and
                  remembered.&rdquo;
                </p>
                <div className="mt-8 h-px w-20 bg-gold-500/60" aria-hidden />
              </article>
            </Reveal>
            <Reveal delay={120}>
              <article className="relative h-full border border-gold-500/40 bg-white p-9 sm:p-12">
                <Quote className="absolute right-8 top-8 h-10 w-10 text-gold-500/25" aria-hidden />
                <Eyebrow>Our Vision</Eyebrow>
                <p className="mt-6 font-display text-2xl font-medium leading-snug text-navy-950 sm:text-[26px]">
                  &ldquo;A literary society known for its judgment and its warmth — where
                  independent stories outlive their launch week because a club stood
                  behind them.&rdquo;
                </p>
                <div className="mt-8 h-px w-20 bg-gold-500/60" aria-hidden />
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ————— What we believe ————— */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[1360px] px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow center>Our Values</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-[42px]">
                What We Believe
              </h2>
            </Reveal>
          </div>

          <div className="mx-auto mt-14 max-w-4xl">
            <ul className="grid gap-5 sm:grid-cols-2">
              {BELIEFS.map((belief, i) => (
                <li key={belief}>
                  <Reveal delay={i * 90}>
                    <div className="group flex h-full items-start gap-5 border border-border bg-soft p-7 transition-all duration-300 hover:border-gold-500/60 hover:bg-white hover:shadow-[0_16px_38px_-20px_rgba(7,27,53,0.22)]">
                      <span className="font-display text-3xl font-bold leading-none text-gold-500/50 transition-colors group-hover:text-gold-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-display text-lg italic leading-snug text-navy-950">
                        &ldquo;{belief}&rdquo;
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ————— Straight answers: how the club runs ————— */}
      <section className="bg-white pb-4">
        <div className="mx-auto max-w-[1360px] px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow center>Straight Answers</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-4xl">
                How the Club Runs
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 text-[15.5px] leading-relaxed text-ink-muted sm:text-base">
                No fine print and no games. If you are wondering what powers this club
                — and what it asks of the books it features — here is the honest answer.
              </p>
            </Reveal>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="h-full border border-gold-500/40 bg-white p-8 sm:p-10">
                <h3 className="font-display text-xl font-semibold text-navy-950">
                  What the Club Is Not
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                  Not a paid-placement promotion service. There are no slots to buy and no
                  queues to jump — every book is selected on the strength of its story, and
                  nothing else. That rule is what keeps the club&rsquo;s trust, and the
                  trust is what makes a feature here worth having.
                </p>
              </article>
            </Reveal>
            <Reveal delay={120}>
              <article className="h-full border border-gold-500/40 bg-white p-8 sm:p-10">
                <h3 className="font-display text-xl font-semibold text-navy-950">
                  How the Club Is Sustained
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                  By the club&rsquo;s own resources and the volunteers who keep it
                  running. Because attention here is never for sale, our selections
                  never are either. Merit is the only currency the club recognises.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ————— Four pillars ————— */}
      <section className="bg-soft py-20 sm:py-24">
        <div className="mx-auto max-w-[1360px] px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow center>What We Focus On</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-[42px]">
                Discovery. Connection. Discussion. Growth.
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 text-[15.5px] leading-relaxed text-ink-muted sm:text-base">
                These four commitments shape everything we do — from how a book is chosen
                and introduced, to the way conversations are hosted and relationships are
                kept alive long after the first meeting.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 90}>
                <FeatureCard icon={pillar.icon} title={pillar.title}>
                  {pillar.text}
                </FeatureCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <div className="mx-auto mt-16 max-w-4xl border-t border-gold-500/30 pt-10 text-center">
              <p className="font-display text-xl italic leading-relaxed text-navy-800 sm:text-2xl">
                &ldquo;A book that is truly read once is worth more than a book that is
                scrolled past a thousand times.&rdquo;
              </p>
              <div className="mt-6 flex items-center justify-center gap-3 text-gold-600">
                <BookOpen className="h-4 w-4" aria-hidden />
                <Feather className="h-4 w-4" aria-hidden />
                <BookOpen className="h-4 w-4" aria-hidden />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        primaryLabel="Submit Your Book"
        primaryTo="/submit"
        secondaryLabel="Contact Us"
        secondaryTo="/contact"
      />
    </>
  );
}
