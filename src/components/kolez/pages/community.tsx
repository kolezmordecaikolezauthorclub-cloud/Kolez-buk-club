"use client";

import Image from "next/image";
import {
  PenLine,
  MessagesSquare,
  BookMarked,
  Star,
  Feather,
  Quote,
  CalendarDays,
  Users,
} from "lucide-react";
import {
  CtaBand,
  Eyebrow,
  FeatureCard,
  PageHero,
  Reveal,
} from "../shared";

const ACTIVITIES = [
  {
    icon: <PenLine className="h-5 w-5" aria-hidden />,
    title: "Author Conversations",
    text: "Live and asynchronous sessions where members talk with authors about the work, the process, and the obsessions behind it.",
  },
  {
    icon: <MessagesSquare className="h-5 w-5" aria-hidden />,
    title: "Book Discussions",
    text: "Moderated, spoiler-aware discussions that give every book a real conversation — thoughtful, curious, and open to disagreement.",
  },
  {
    icon: <BookMarked className="h-5 w-5" aria-hidden />,
    title: "Reading Activities",
    text: "Reading sprints, shared chapter milestones, and seasonal rhythms that keep books moving through the club together.",
  },
  {
    icon: <Star className="h-5 w-5" aria-hidden />,
    title: "Author Spotlights",
    text: "Featured introductions that present an author and their book to the whole community — their story, in their own words.",
  },
  {
    icon: <Quote className="h-5 w-5" aria-hidden />,
    title: "Reader Recommendations",
    text: "Member-to-member recommendations that pass books along the old way: by enthusiasm, not by algorithm.",
  },
  {
    icon: <Feather className="h-5 w-5" aria-hidden />,
    title: "Writing Conversations",
    text: "Honest talk about the craft — drafting, editing, publishing, and the realities of the writing life.",
  },
  {
    icon: <CalendarDays className="h-5 w-5" aria-hidden />,
    title: "Literary Events",
    text: "Author Q&As, themed reading seasons, and gatherings that give members something to look forward to.",
  },
  {
    icon: <Users className="h-5 w-5" aria-hidden />,
    title: "Community Gatherings",
    text: "Unstructured time around books — the conversations that slowly turn members into friends.",
  },
];

export function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="The Community"
        title={
          <>
            A Community Built{" "}
            <span className="gold-gradient-text italic">Around Stories.</span>
          </>
        }
        image="/images/community.jpg"
        imageAlt="A group of readers in conversation around books"
      >
        Kolez Buk Club is more than its books. It is the people, the arguments, the
        recommendations, and the friendships that grow around them.
      </PageHero>

      {/* ————— Intro ————— */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1360px] items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div>
            <Reveal>
              <Eyebrow>More Than a Shelf</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-4xl">
                Where Book People Find Their People.
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-6 space-y-5 text-[15.5px] leading-relaxed text-ink-muted">
                <p>
                  A book club ends when the meeting ends. A literary society does not — it
                  keeps the conversation alive between titles, between authors, and between
                  readers who would never have met anywhere else.
                </p>
                <p>
                  Inside the club you will find writers talking craft, readers (politely)
                  contesting endings, recommendations passed hand to hand like gifts, and
                  events that pull everyone toward the same page at the same time.
                </p>
                <p>
                  Join as a reader, an author, or both — either way you become part of
                  something larger than any single title: a standing society built on the
                  belief that stories are meant to be shared.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <div className="relative mx-auto max-w-[560px]">
              <div className="absolute -left-4 -top-4 h-full w-full border border-gold-500/40" aria-hidden />
              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <Image
                  src="/images/community.jpg"
                  alt="A lively book discussion among community members"
                  fill
                  sizes="(min-width: 1024px) 560px, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— Activities ————— */}
      <section className="bg-soft py-20 sm:py-24">
        <div className="mx-auto max-w-[1360px] px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow center>Inside the Club</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-[42px]">
                What Happens in the Community
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 text-[15.5px] leading-relaxed text-ink-muted sm:text-base">
                Eight kinds of activity keep the club alive — each one created to bring
                authors and readers closer to the books, and to each other.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ACTIVITIES.map((activity, i) => (
              <Reveal key={activity.title} delay={(i % 4) * 80}>
                <FeatureCard icon={activity.icon} title={activity.title}>
                  {activity.text}
                </FeatureCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        message="The conversation is already happening. The only thing missing is you."
        primaryLabel="Join the Community"
        primaryTo="/contact?intent=join"
        secondaryLabel="Submit Your Book"
        secondaryTo="/submit"
      />
    </>
  );
}
