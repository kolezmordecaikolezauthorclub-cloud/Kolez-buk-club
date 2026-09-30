"use client";

import { Heart } from "lucide-react";
import { Reveal } from "./shared";
import { SocialMarquee } from "./social-marquee";

/**
 * "AS SEEN ON" — media badge strip (decorative, non-clickable, auto-scrolling).
 *
 * EDIT HERE: keep only outlets that have genuinely featured or covered the
 * club, and add new ones as they appear. Each badge is a white circle with
 * the outlet's wordmark (a few are brand-colored circles, like NBC / CBS).
 */

interface Outlet {
  name: string;
  text: string;
  bg?: string; // circle background (default white)
  fg?: string; // wordmark color (default near-black)
  serif?: boolean;
  italic?: boolean;
  underline?: boolean; // small red underline (AP style)
  heart?: boolean; // iHeart-style heart mark
}

const OUTLETS: Outlet[] = [
  { name: "Associated Press", text: "AP", serif: true, underline: true },
  { name: "NBC", text: "NBC", bg: "#2A5DB0", fg: "#FFFFFF" },
  { name: "Yahoo", text: "yahoo!", fg: "#5F01D1" },
  { name: "Bing", text: "b", fg: "#008373" },
  { name: "BuzzFeed", text: "BZ", fg: "#111111" },
  { name: "ABC", text: "abc", fg: "#111111" },
  { name: "CBS", text: "CBS", bg: "#0B0B0F", fg: "#FFFFFF" },
  { name: "FOX", text: "FOX", fg: "#0B3366" },
  { name: "Digital Journal", text: "DJ", serif: true, bg: "#0B0B0F", fg: "#FFFFFF" },
  { name: "The Wall Street Journal", text: "WSJ", serif: true, fg: "#111111" },
  { name: "MarketWatch", text: "MW", fg: "#03A64A" },
  { name: "Sports Illustrated", text: "SI", serif: true, italic: true, fg: "#E4002B" },
  { name: "iHeartRadio", text: "", bg: "#C6002B", heart: true },
];

function OutletBadge({ outlet }: { outlet: Outlet }) {
  const bg = outlet.bg ?? "#FFFFFF";
  const fg = outlet.fg ?? "#111111";

  return (
    <span
      title={outlet.name}
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-[0_10px_26px_-12px_rgba(0,0,0,0.65)] ring-1 ring-black/10"
      style={{ background: bg }}
      aria-hidden
    >
      {outlet.heart ? (
        <Heart className="h-5 w-5 fill-white text-white" />
      ) : (
        <span
          className={
            "flex flex-col items-center leading-none " +
            (outlet.serif
              ? "font-[Georgia,'Times_New_Roman',serif] font-bold "
              : "font-sans font-extrabold ") +
            (outlet.italic ? "italic" : "")
          }
          style={{ color: fg, fontSize: outlet.text.length > 3 ? 10.5 : 13, letterSpacing: "-0.01em" }}
        >
          <span>{outlet.text}</span>
          {outlet.underline ? (
            <span className="mt-[3px] block h-[2.5px] w-6 rounded-full" style={{ background: "#D0342C" }} />
          ) : null}
        </span>
      )}
    </span>
  );
}

export function SeenOn() {
  return (
    <section
      aria-label="As seen on"
      className="texture-navy relative overflow-hidden py-12 sm:py-14"
    >
      {/* Thin gold hairlines — matches the other dark sections */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-[1360px] px-5 lg:px-8">
        <Reveal>
          <h2 className="text-center font-display text-sm font-semibold uppercase tracking-[0.42em] text-white sm:text-lg">
            As Seen On
          </h2>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <div className="relative mt-9 overflow-hidden">
          {/* Edge fades into the dark navy background */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[5] hidden w-24 bg-gradient-to-r from-navy-950 to-transparent lg:block"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-[5] hidden w-24 bg-gradient-to-l from-navy-950 to-transparent lg:block"
            aria-hidden
          />
          <SocialMarquee>
            {OUTLETS.map((outlet) => (
              <OutletBadge key={outlet.name} outlet={outlet} />
            ))}
          </SocialMarquee>
        </div>
      </Reveal>
    </section>
  );
}
