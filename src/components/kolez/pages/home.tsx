"use client";

import Image from "next/image";
import {
  BookOpen,
  Compass,
  MessagesSquare,
  Sprout,
  PenLine,
  HeartHandshake,
  Library,
  Lightbulb,
  Coffee,
  Award,
  Users,
  MessagesSquare as Chat,
  Search,
  Link2,
  BookMarked,
  Feather,
  ArrowRight,
  Star,
} from "lucide-react";
import {
  CtaBand,
  Eyebrow,
  FeatureCard,
  GoldButton,
  OutlineButton,
  Reveal,
} from "../shared";
import { AuthorTestimonials } from "../author-testimonials";
import { SeenOn } from "../seen-on";

const HERO_WORDMARKS = ["Discover", "Connect", "Discuss", "Grow"] as const;

export function HomePage() {
  return (
    <>
      {/* ————————————— HERO ————————————— */}
      <section className="texture-navy relative flex min-h-[92svh] items-center overflow-hidden">
        <Image
          src="/images/hero-home.jpg"
          alt="A warm lamplight library filled with books — the home of Kolez Buk Club"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/70 to-navy-950" aria-hidden />

        <div className="relative mx-auto w-full max-w-[1360px] px-5 pb-24 pt-36 text-center lg:px-8 lg:pt-40">
          <Reveal>
            <Eyebrow onDark center>
              A Curated Literary Community
            </Eyebrow>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mx-auto mt-7 max-w-5xl font-display text-[40px] font-bold leading-[1.08] text-white sm:text-6xl lg:text-[72px]">
              Where Authors, Readers, and{" "}
              <span className="gold-gradient-text italic">Great Stories</span>{" "}
              Come Together.
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mx-auto mt-8 max-w-2xl text-[15px] leading-relaxed text-white/75 sm:text-lg">
              Kolez Buk Club is a reading society with a simple conviction — a good book
              should never fade away the week it launches. We place independent authors in
              front of a devoted community of readers for structured discovery, honest
              discussion, and reviews that give a story a long life.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <GoldButton to="/contact?intent=join" className="w-full sm:w-auto">
                Join the Club
              </GoldButton>
              <OutlineButton to="/submit" onDark className="w-full sm:w-auto">
                Submit Your Book
              </OutlineButton>
            </div>
          </Reveal>

          <Reveal delay={480}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-14">
              {HERO_WORDMARKS.map((word, i) => (
                <span key={word} className="flex items-center gap-8 sm:gap-14">
                  {i > 0 && (
                    <span className="hidden h-1.5 w-1.5 rotate-45 bg-gold-500/60 sm:block" aria-hidden />
                  )}
                  <span className="text-[11px] font-semibold uppercase tracking-[0.38em] text-white/60">
                    {word}
                  </span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy-950 to-transparent"
          aria-hidden
        />
      </section>

      {/* ————————————— MORE THAN A BOOK CLUB ————————————— */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-[1360px] items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div>
            <Reveal>
              <Eyebrow>The Kolez Community</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-[42px]">
                More Than a Book Club
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 text-[15.5px] leading-relaxed text-ink-muted sm:text-base">
                Anywhere can list a book. Far fewer places give it what it actually needs —
                readers who will sit with it, talk about it honestly, and carry it to other
                readers. That is the work of Kolez Buk Club: helping worthy books find their
                audience, and keeping that audience close.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: <Compass className="h-5 w-5" aria-hidden />,
                  title: "Discover",
                  text: "Meet books and authors you would never have found on your own — introduced with care, not pushed by an algorithm.",
                },
                {
                  icon: <Link2 className="h-5 w-5" aria-hidden />,
                  title: "Connect",
                  text: "Bring authors and readers into the same conversation, where real relationships can form.",
                },
                {
                  icon: <MessagesSquare className="h-5 w-5" aria-hidden />,
                  title: "Discuss",
                  text: "Give every story the discussion it deserves — thoughtful, curious, and unhurried.",
                },
                {
                  icon: <Sprout className="h-5 w-5" aria-hidden />,
                  title: "Grow",
                  text: "Turn one good reading experience into a lasting relationship between a writer and their audience.",
                },
              ].map((f, i) => (
                <Reveal key={f.title} delay={i * 90}>
                  <div className="group flex h-full gap-4 border border-border bg-white p-5 transition-all duration-300 hover:border-gold-500/60 hover:shadow-[0_16px_38px_-20px_rgba(7,27,53,0.25)]">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-gold-500/40 bg-gold-500/10 text-gold-600 transition-colors group-hover:bg-gold-500/20">
                      {f.icon}
                    </span>
                    <span>
                      <span className="block font-display text-lg font-semibold text-navy-950">
                        {f.title}
                      </span>
                      <span className="mt-1.5 block text-[13.5px] leading-relaxed text-ink-muted">
                        {f.text}
                      </span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={150} className="relative">
            <div className="relative mx-auto max-w-[520px]">
              <div className="absolute -left-4 -top-4 h-full w-full border border-gold-500/40" aria-hidden />
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/writing-desk.jpg"
                  alt="A writing desk with notebooks, a fountain pen, and a warm cup of coffee"
                  fill
                  sizes="(min-width: 1024px) 520px, 92vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-7 -right-3 max-w-[240px] border border-gold-500/30 bg-navy-950 px-6 py-5 shadow-xl sm:-right-7">
                <p className="font-display text-[15px] italic leading-snug text-white">
                  &ldquo;Every great story deserves a community.&rdquo;
                </p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-400">
                  The Kolez Belief
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————————————— OUR IMPACT ————————————— */}
      <section className="texture-navy relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
          aria-hidden
        />
        <div className="mx-auto max-w-[1360px] px-5 py-16 sm:py-20 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-center lg:gap-0">
            {/* — Stat 1 · 300+ high quality review clusters — */}
            <Reveal className="flex flex-col items-center text-center lg:px-16">
              <div className="flex items-center gap-1.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
                ))}
              </div>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-gold-400/90">
                Over
              </p>
              <p className="gold-gradient-text font-display text-6xl font-bold leading-none sm:text-7xl">
                300+
              </p>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90">
                High Quality
              </p>
              <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90">
                Review Clusters
              </p>
            </Reveal>

            <div className="hidden h-28 w-px bg-white/10 lg:block" aria-hidden />

            {/* — Stat 2 · 500+ authors helped — */}
            <Reveal
              delay={140}
              className="flex flex-col items-center gap-7 sm:flex-row sm:gap-8 lg:px-16"
            >
              {/* Five very small portraits of supported authors */}
              <div className="flex -space-x-3.5">
                <Image
                  src="/images/impact-1.jpg"
                  alt="An author supported by Kolez Buk Club"
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full border-2 border-gold-500/70 object-cover shadow-lg"
                />
                <Image
                  src="/images/impact-2.jpg"
                  alt="An author supported by Kolez Buk Club"
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full border-2 border-gold-500/70 object-cover shadow-lg"
                />
                <Image
                  src="/images/impact-3.jpg"
                  alt="An author supported by Kolez Buk Club"
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full border-2 border-gold-500/70 object-cover shadow-lg"
                />
                <Image
                  src="/images/impact-4.jpg"
                  alt="An author supported by Kolez Buk Club"
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full border-2 border-gold-500/70 object-cover shadow-lg"
                />
                <Image
                  src="/images/impact-5.jpg"
                  alt="An author supported by Kolez Buk Club"
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full border-2 border-gold-500/70 object-cover shadow-lg"
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="gold-gradient-text font-display text-6xl font-bold leading-none sm:text-7xl">
                  500+
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90">
                  Authors Helped
                </p>
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.34em] text-gold-400/90">
                  2018 — 2026
                </p>
              </div>
            </Reveal>
          </div>

          {/* — Supporting line — */}
          <Reveal delay={200}>
            <div className="mx-auto mt-12 max-w-2xl border-t border-white/10 pt-9 text-center sm:mt-14">
              <p className="font-display text-xl italic leading-relaxed text-white/90 sm:text-2xl sm:leading-relaxed">
                Since 2018, Kolez Buk Club has supported{" "}
                <span className="text-gold-400">500+ authors</span> and over{" "}
                <span className="text-gold-400">300+ high quality review clusters</span> —
                through book discovery, meaningful conversations, and a community
                built around great stories.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————————————— FOR AUTHORS ————————————— */}
      <section className="bg-soft py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow center>For Authors</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-[42px]">
                Your Book Deserves More Than a Moment.
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 text-[15.5px] leading-relaxed text-ink-muted sm:text-base">
                Publishing a book is only the beginning. Once launch week passes, most
                titles are left to fight for attention alone — and most authors never learn
                what their readers genuinely thought. Kolez Buk Club offers a different
                path: a community that takes your book seriously, reads it properly,
                discusses it openly, and tells you the truth. Placement here is earned by
                merit, and attention here is given with intention.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal delay={0}>
              <FeatureCard
                icon={<BookOpen className="h-5 w-5" aria-hidden />}
                title="Book Discovery"
              >
                Introduce your work to readers actively seeking new stories — presented as a discovery, never an ad.
              </FeatureCard>
            </Reveal>
            <Reveal delay={80}>
              <FeatureCard
                icon={<HeartHandshake className="h-5 w-5" aria-hidden />}
                title="Reader Engagement"
              >
                Readers do more than notice your work; they sit with it, question it, and respond to it.
              </FeatureCard>
            </Reveal>
            <Reveal delay={160}>
              <FeatureCard
                icon={<MessagesSquare className="h-5 w-5" aria-hidden />}
                title="Book Discussions"
              >
                Structured discussions give your book weeks of conversation, not a single day of noise.
              </FeatureCard>
            </Reveal>
            <Reveal delay={0}>
              <FeatureCard
                icon={<Lightbulb className="h-5 w-5" aria-hidden />}
                title="Reader Feedback"
              >
                Honest reactions from people who truly read the story — the rarest kind of insight.
              </FeatureCard>
            </Reveal>
            <Reveal delay={80}>
              <FeatureCard
                icon={<Users className="h-5 w-5" aria-hidden />}
                title="Author Community"
              >
                Stand among fellow writers who understand the journey and share what they have learned.
              </FeatureCard>
            </Reveal>
            <Reveal delay={160}>
              <FeatureCard
                icon={<Sprout className="h-5 w-5" aria-hidden />}
                title="Long Term Connection"
              >
                The conversation does not end when the promotion does. Relationships here compound.
              </FeatureCard>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="mt-12 text-center">
              <GoldButton to="/submit">Submit Your Book</GoldButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————————————— FOR READERS ————————————— */}
      <section className="texture-navy py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow onDark center>
                For Readers
              </Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-[42px]">
                Discover Stories Worth Talking About.
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 text-[15.5px] leading-relaxed text-white/70 sm:text-base">
                There is a particular loneliness to loving books in a place that scrolls
                past them. Kolez Buk Club is a home for readers who want more — more
                meaning in what they read, more honesty in how they talk about it, and a
                real connection to the people who write it. Every book you meet here was
                chosen because someone believed in it.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal delay={0}>
              <FeatureCard
                onDark
                icon={<Library className="h-5 w-5" aria-hidden />}
                title="Discover New Books"
              >
                Find titles chosen for their quality and heart — stories that may never surface on a bestseller feed.
              </FeatureCard>
            </Reveal>
            <Reveal delay={80}>
              <FeatureCard
                onDark
                icon={<PenLine className="h-5 w-5" aria-hidden />}
                title="Meet Authors"
              >
                Meet the minds behind the stories and ask the questions you have always wanted to ask.
              </FeatureCard>
            </Reveal>
            <Reveal delay={160}>
              <FeatureCard
                onDark
                icon={<Chat className="h-5 w-5" aria-hidden />}
                title="Join Discussions"
              >
                Talk about ideas, characters, and craft with people who take stories seriously.
              </FeatureCard>
            </Reveal>
            <Reveal delay={0}>
              <FeatureCard
                onDark
                icon={<Feather className="h-5 w-5" aria-hidden />}
                title="Share Your Voice"
              >
                Your honest review is not background noise here — it shapes how a book travels.
              </FeatureCard>
            </Reveal>
            <Reveal delay={80}>
              <FeatureCard
                onDark
                icon={<Users className="h-5 w-5" aria-hidden />}
                title="Meet Other Readers"
              >
                Find your people: readers whose shelves and judgments you will learn to trust.
              </FeatureCard>
            </Reveal>
            <Reveal delay={160}>
              <FeatureCard
                onDark
                icon={<Coffee className="h-5 w-5" aria-hidden />}
                title="Take Part in Events"
              >
                Reading seasons, author sessions, and gatherings that give your reading a rhythm.
              </FeatureCard>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="mt-12 text-center">
              <GoldButton to="/contact?intent=join">Join the Community</GoldButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————————————— HOW KOLEZ WORKS ————————————— */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow center>How It Works</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-[42px]">
                How Kolez Works
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 text-[15.5px] leading-relaxed text-ink-muted sm:text-base">
                Every book that enters the club follows the same deliberate path — a
                journey designed to give stories the kind of attention no algorithm can
                fake, and few platforms are willing to give.
              </p>
            </Reveal>
          </div>

          <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { n: "01", t: "Discover", d: "A book is submitted and thoughtfully reviewed by the Kolez team before it ever reaches the community." },
              { n: "02", t: "Connect", d: "The right readers are brought to the right story — introduced as a discovery worth their time." },
              { n: "03", t: "Read", d: "Members read properly and at their own pace. Depth over speed is the unwritten rule." },
              { n: "04", t: "Discuss", d: "The club gathers around the book — questions, interpretations, and honest debate." },
              { n: "05", t: "Engage", d: "The author joins the conversation and hears what readers truly think." },
              { n: "06", t: "Grow", d: "Reviews, recommendations, and relationships carry the book far beyond its first week." },
            ].map((step, i) => (
              <li key={step.n}>
                <Reveal delay={(i % 3) * 100}>
                  <div className="group border-t-2 border-border pt-7 transition-colors duration-300 hover:border-gold-500">
                    <span className="font-display text-5xl font-bold text-gold-500/35 transition-colors duration-300 group-hover:text-gold-500/70">
                      {step.n}
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-semibold text-navy-950">
                      {step.t}
                    </h3>
                    <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-ink-muted">
                      {step.d}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={120}>
            <div className="mt-14 flex justify-center">
              <OutlineButton to="/experience">
                Explore the Kolez Experience
                <ArrowRight className="h-4 w-4" aria-hidden />
              </OutlineButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————————————— WHY KOLEZ ————————————— */}
      <section className="bg-soft py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1360px] px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow center>Why Kolez Buk Club?</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-[42px]">
                Built Around People. Connected by Stories.
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 text-[15.5px] leading-relaxed text-ink-muted sm:text-base">
                The scarcest resource in publishing is not money — it is attention. Books
                create conversations, and conversations create connections; Kolez Buk Club
                exists to make sure deserving stories get both.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal delay={0}>
              <FeatureCard
                icon={<PenLine className="h-5 w-5" aria-hidden />}
                title="Authors"
              >
                A place where your work is read closely, discussed honestly, and remembered.
              </FeatureCard>
            </Reveal>
            <Reveal delay={80}>
              <FeatureCard
                icon={<BookMarked className="h-5 w-5" aria-hidden />}
                title="Readers"
              >
                A place to discover books chosen with care — and the voices behind them.
              </FeatureCard>
            </Reveal>
            <Reveal delay={160}>
              <FeatureCard
                icon={<Users className="h-5 w-5" aria-hidden />}
                title="Community"
              >
                A society of people who still believe stories are worth talking about.
              </FeatureCard>
            </Reveal>
            <Reveal delay={240}>
              <FeatureCard
                icon={<MessagesSquare className="h-5 w-5" aria-hidden />}
                title="Conversation"
              >
                Discussion with real substance — the kind that changes how you see a book.
              </FeatureCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ————————————— AUTHOR TESTIMONIALS ————————————— */}
      <AuthorTestimonials />

      {/* ————————————— AS SEEN ON ————————————— */}
      <SeenOn />

      {/* ————————————— FINAL CTA ————————————— */}
      <CtaBand
        primaryLabel="Join the Club"
        primaryTo="/contact?intent=join"
        secondaryLabel="Submit Your Book"
        secondaryTo="/submit"
      />
    </>
  );
}
