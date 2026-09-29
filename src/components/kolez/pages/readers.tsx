"use client";

import Image from "next/image";
import {
  Library,
  PenLine,
  MessagesSquare,
  Feather,
  Users,
  CalendarDays,
  Sparkles,
  BookOpen,
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

const EXPERIENCES = [
  {
    icon: <Library className="h-5 w-5" aria-hidden />,
    title: "Discover New Books",
    text: "Find books hand-chosen for this community — titles that may never surface on a trending feed, each one introduced with a reason to read it.",
  },
  {
    icon: <PenLine className="h-5 w-5" aria-hidden />,
    title: "Meet Authors",
    text: "Meet the people behind the stories — their process, their obsessions, and the questions their books were trying to answer.",
  },
  {
    icon: <MessagesSquare className="h-5 w-5" aria-hidden />,
    title: "Join Book Discussions",
    text: "Conversations about characters, ideas, and craft that are given room to breathe — guided, spoiler-aware, and genuinely deep.",
  },
  {
    icon: <Feather className="h-5 w-5" aria-hidden />,
    title: "Share Reviews",
    text: "Write honest reviews that matter. Your words help fellow readers decide — and help authors understand the people they write for.",
  },
  {
    icon: <CalendarDays className="h-5 w-5" aria-hidden />,
    title: "Participate in Literary Events",
    text: "Reading seasons, author sessions, and community gatherings that give your reading life a rhythm worth keeping.",
  },
  {
    icon: <Users className="h-5 w-5" aria-hidden />,
    title: "Connect with Other Readers",
    text: "Meet readers whose tastes sharpen yours — the kind of friends whose recommendations you learn to trust.",
  },
  {
    icon: <Sparkles className="h-5 w-5" aria-hidden />,
    title: "Discover New Literary Voices",
    text: "Encounter emerging and independent authors early — and be able to say you were reading them before everyone else.",
  },
];

export function ReadersPage() {
  return (
    <>
      <PageHero
        eyebrow="For Readers"
        title={
          <>
            A Community for People{" "}
            <span className="gold-gradient-text italic">Who Love to Read.</span>
          </>
        }
        image="/images/hero-readers.jpg"
        imageAlt="A cozy reading nook by a bright window"
      >
        Somewhere between the bestseller feeds and the endless scroll, there is a quieter
        room — full of readers who take books seriously. You have just found it.
      </PageHero>

      {/* ————— Intro ————— */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[1360px] px-5 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative order-2 mx-auto max-w-[520px] lg:order-1">
                <div className="absolute -right-4 -top-4 h-full w-full border border-gold-500/40" aria-hidden />
                <div className="relative aspect-[4/5] max-h-[600px] w-full overflow-hidden">
                  <Image
                    src="/images/reading-moody.jpg"
                    alt="A reader absorbed in a book in warm, moody light"
                    fill
                    sizes="(min-width: 1024px) 520px, 92vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
            <div className="order-1 lg:order-2">
              <Reveal>
                <Eyebrow>The Reader Experience</Eyebrow>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-4xl">
                  Reading Is Better When It Is Shared.
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-6 space-y-5 text-[15.5px] leading-relaxed text-ink-muted">
                  <p>
                    Finishing a great book is a strange feeling — the story ends, and the
                    first thing you want to do is talk about it. Most places offer you a
                    comment box and move on. Kolez Buk Club was built for exactly that
                    moment, and for every moment after it.
                  </p>
                  <p>
                    As a member, you will encounter books selected for their craft and
                    heart, meet the authors behind them, and join discussions with the kind
                    of depth that is getting rare online — honest, curious, and unhurried.
                    You will find readers who love what you love, and readers who will
                    challenge you to love more.
                  </p>
                  <p>
                    And something more: your voice matters here. Your reactions, questions,
                    and reviews genuinely shape how a book travels through the community —
                    and how its author sees their own work.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <GoldButton to="/contact?intent=join">Join the Club</GoldButton>
                  <OutlineButton to="/community">Explore the Community</OutlineButton>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ————— What readers can do ————— */}
      <section className="bg-soft py-20 sm:py-24">
        <div className="mx-auto max-w-[1360px] px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow center>Your Membership</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-[42px]">
                What Awaits You Inside the Club
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 text-[15.5px] leading-relaxed text-ink-muted sm:text-base">
                Seven ways to experience Kolez Buk Club as a reader — each one designed to
                bring you closer to books chosen with care, the people who wrote them, and
                the people who love them.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EXPERIENCES.slice(0, 4).map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <FeatureCard icon={item.icon} title={item.title}>
                  {item.text}
                </FeatureCard>
              </Reveal>
            ))}
            {EXPERIENCES.slice(4).map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="sm:col-span-1">
                <FeatureCard icon={item.icon} title={item.title}>
                  {item.text}
                </FeatureCard>
              </Reveal>
            ))}
            <Reveal delay={240}>
              <div className="flex h-full flex-col items-start justify-center border border-gold-500/40 bg-navy-950 p-7">
                <BookOpen className="h-6 w-6 text-gold-400" aria-hidden />
                <p className="mt-4 font-display text-xl italic leading-snug text-white">
                  &ldquo;Every book you read becomes part of the community&rsquo;s
                  story.&rdquo;
                </p>
                <div className="mt-6 flex-1" />
                <GoldButton to="/contact?intent=join" className="mt-6 w-full">
                  Join the Club
                </GoldButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        message="Your next favorite book — and the people to talk about it with — are waiting."
        primaryLabel="Join the Club"
        primaryTo="/contact?intent=join"
        secondaryLabel="Discover the Experience"
        secondaryTo="/experience"
      />
    </>
  );
}
