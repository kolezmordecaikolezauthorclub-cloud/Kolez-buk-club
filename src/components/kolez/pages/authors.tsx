"use client";

import Image from "next/image";
import {
  BookOpen,
  HeartHandshake,
  MessagesSquare,
  Lightbulb,
  Users,
  Sprout,
  CalendarDays,
  Handshake,
  BookMarked,
  PenLine,
} from "lucide-react";
import {
  CtaBand,
  Eyebrow,
  FeatureCard,
  GoldButton,
  OutlineButton,
  PageHero,
  Reveal,
} from "../shared";

const BENEFITS = [
  {
    icon: <BookOpen className="h-5 w-5" aria-hidden />,
    title: "Book Discovery",
    text: "Your book is introduced to a community of readers actively hunting for their next great find — presented as a discovery, never as an ad.",
  },
  {
    icon: <HeartHandshake className="h-5 w-5" aria-hidden />,
    title: "Reader Engagement",
    text: "Readers here do more than tap “like”. They sit with your story, react to its turns, and bring those reactions back to you.",
  },
  {
    icon: <PenLine className="h-5 w-5" aria-hidden />,
    title: "Author Conversations",
    text: "Talk about your craft, your process, and the ideas behind the story — with people who actually read the book first.",
  },
  {
    icon: <Lightbulb className="h-5 w-5" aria-hidden />,
    title: "Reader Feedback",
    text: "Honest, specific, and generous feedback from real readers — the kind of insight that is nearly impossible to buy.",
  },
  {
    icon: <MessagesSquare className="h-5 w-5" aria-hidden />,
    title: "Book Discussions",
    text: "Structured, moderated discussions give your book weeks of considered attention instead of one afternoon of noise.",
  },
  {
    icon: <Users className="h-5 w-5" aria-hidden />,
    title: "Author Networking",
    text: "Join a circle of writers who share what they have learned — the craft, the industry, and the long road.",
  },
  {
    icon: <CalendarDays className="h-5 w-5" aria-hidden />,
    title: "Literary Events",
    text: "Author sessions, reading seasons, and community events that keep your book in circulation between releases.",
  },
  {
    icon: <Handshake className="h-5 w-5" aria-hidden />,
    title: "Community Participation",
    text: "Be a member, not a guest. Support other authors' books and build a reputation that follows your next release.",
  },
];

export function AuthorsPage() {
  return (
    <>
      <PageHero
        eyebrow="For Authors"
        title={
          <>
            Build a Stronger Connection{" "}
            <span className="gold-gradient-text italic">with Your Readers.</span>
          </>
        }
        image="/images/hero-authors.jpg"
        imageAlt="A candlelit writing desk inside a classic library"
      >
        What every author actually wants is not another advertisement — it is readers who
        sit with the story, talk about it honestly, and carry it to others. That is
        precisely what the club is built to provide.
      </PageHero>

      {/* ————— Intro ————— */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[1360px] px-5 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>More Than a Promotion</Eyebrow>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-4xl">
                  Your Book Deserves More Than a Moment.
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-6 space-y-5 text-[15.5px] leading-relaxed text-ink-muted">
                  <p>
                    Launch week is a sugar rush: a burst of noise, then silence. Most books
                    spend their remaining life competing for scraps of attention — and most
                    authors never learn what their readers genuinely thought.
                  </p>
                  <p>
                    Kolez Buk Club replaces the moment with a relationship. Your book enters
                    a community that reads closely, discusses openly, and reviews honestly —
                    and it keeps working long after launch week, because readers here are
                    still arriving, still asking, still talking.
                  </p>
                  <p>
                    Every submission is read by real people and judged on the story alone.
                    We are not a pay-to-feature service; the only currency that matters here
                    is the quality of your book. Whether you are independently published or
                    traditionally printed, the club gives your work a home — and your readers
                    a place to find you.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <GoldButton to="/submit">Submit Your Book</GoldButton>
                  <OutlineButton to="/experience">See How It Works</OutlineButton>
                </div>
              </Reveal>
            </div>
            <Reveal delay={150}>
              <div className="relative mx-auto max-w-[520px]">
                <div className="absolute -left-4 -top-4 h-full w-full border border-gold-500/40" aria-hidden />
                <div className="relative aspect-[4/5] max-h-[600px] w-full overflow-hidden">
                  <Image
                    src="/images/author-writing.jpg"
                    alt="An author writing with a fountain pen in an open notebook"
                    fill
                    sizes="(min-width: 1024px) 520px, 92vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ————— Benefits grid ————— */}
      <section className="bg-soft py-20 sm:py-24">
        <div className="mx-auto max-w-[1360px] px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow center>Author Benefits</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-[42px]">
                What Kolez Buk Club Offers You
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 text-[15.5px] leading-relaxed text-ink-muted sm:text-base">
                Eight ways the club stands behind authors — from a careful first reading to
                the long-tail relationships that carry a book for years.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit, i) => (
              <Reveal key={benefit.title} delay={(i % 4) * 80}>
                <FeatureCard icon={benefit.icon} title={benefit.title}>
                  {benefit.text}
                </FeatureCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— What happens after you submit ————— */}
      <section className="texture-navy py-20 sm:py-24">
        <div className="mx-auto max-w-[1360px] px-5 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative mx-auto max-w-[520px]">
                <div className="absolute -right-4 -top-4 h-full w-full border border-gold-500/40" aria-hidden />
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src="/images/notebook-gold.jpg"
                    alt="An elegant navy and gold marbled notebook with a fountain pen"
                    fill
                    sizes="(min-width: 1024px) 520px, 92vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
            <div>
              <Reveal>
                <Eyebrow onDark>After You Submit</Eyebrow>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                  From Submission to Conversation
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-6 space-y-5 text-[15.5px] leading-relaxed text-white/70">
                  <p>
                    Submission starts with a careful human read. The Kolez team looks at your
                    story, your genre, and — most importantly — the readers it will speak to.
                    If the book fits the club&rsquo;s standard, its introduction is prepared
                    with the same care a good bookseller once gave a beloved recommendation.
                  </p>
                  <p>
                    From there, your book joins the club&rsquo;s discovery flow: introduced
                    to readers, taken up in reading activities, opened for discussion, and
                    reviewed with honesty. You are invited into every conversation as the
                    author — a participant, not a bystander.
                  </p>
                  <p>
                    And when the busiest weeks pass, the most valuable part remains: a
                    community of readers and fellow writers who know your name, your story,
                    and your next book.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-9">
                  <GoldButton to="/submit">Submit Your Book</GoldButton>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        message="Ready to place your book in front of readers who care about stories?"
        primaryLabel="Submit Your Book"
        primaryTo="/submit"
        secondaryLabel="Join the Club"
        secondaryTo="/contact?intent=join"
      />
    </>
  );
}
