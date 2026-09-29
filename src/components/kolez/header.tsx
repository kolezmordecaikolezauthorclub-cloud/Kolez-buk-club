"use client";

import { useEffect, useState } from "react";
import { Menu, X, BookOpen, PenLine, Mail } from "lucide-react";
import { NAV_ITEMS, siteConfig } from "@/lib/site";
import { hrefFor } from "@/lib/router";
import { cn } from "@/lib/utils";
import { GoldButton, KolezLogo, OutlineButton } from "./shared";

export function SiteHeader({ currentRoute }: { currentRoute: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-gold-500/20 bg-navy-950/95 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-[0_14px_40px_-18px_rgba(7,27,53,0.85)]"
      )}
    >
      <div className="mx-auto flex h-[76px] max-w-[1360px] items-center justify-between gap-4 px-5 lg:px-8">
        <KolezLogo variant="light" />

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = currentRoute === item.key;
              return (
                <li key={item.key}>
                  <a
                    href={hrefFor(item.path)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative px-3 py-2 text-[13px] font-medium tracking-[0.06em] transition-colors duration-200",
                      active ? "text-gold-400" : "text-white/80 hover:text-white"
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-px origin-center bg-gold-400 transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <OutlineButton to="/submit" onDark className="hidden px-5 py-2.5 text-[11px] 2xl:inline-flex">
            Submit Your Book
          </OutlineButton>
          <GoldButton to="/contact?intent=join" className="px-5 py-2.5 text-[11px]">
            Join the Club
          </GoldButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-white transition-colors hover:border-gold-400/60 hover:text-gold-400 xl:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" aria-hidden />
    </header>

    {/* Mobile menu overlay — rendered outside <header> because the header's
        backdrop-filter creates a containing block that would trap the
        fixed-position overlay inside the 76px header bar. */}
    <div
        className={cn(
          "fixed inset-0 z-[60] xl:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div
          className={cn(
            "absolute inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col overflow-y-auto border-l border-gold-500/25 bg-navy-950 transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <KolezLogo variant="light" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-white transition-colors hover:border-gold-400/60 hover:text-gold-400"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="flex-1 px-6 py-6"
            onClick={() => setOpen(false)}
          >
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const active = currentRoute === item.key;
                return (
                  <li key={item.key}>
                    <a
                      href={hrefFor(item.path)}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between border-b border-white/5 py-3.5 font-display text-lg tracking-wide transition-colors",
                        active ? "text-gold-400" : "text-white/85 hover:text-gold-400"
                      )}
                    >
                      {item.label}
                      <span className="text-gold-500/60" aria-hidden>
                        →
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <GoldButton to="/contact?intent=join" className="w-full">
                Join the Club
              </GoldButton>
              <OutlineButton to="/submit" onDark className="w-full">
                Submit Your Book
              </OutlineButton>
            </div>

            <div className="mt-10 space-y-3 border-t border-white/10 pt-6 text-sm text-white/60">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-gold-400"
              >
                <Mail className="h-4 w-4 text-gold-400" />
                {siteConfig.email}
              </a>
              <p className="flex items-center gap-2.5">
                <BookOpen className="h-4 w-4 text-gold-400" />
                A community built around stories
              </p>
              <p className="flex items-center gap-2.5">
                <PenLine className="h-4 w-4 text-gold-400" />
                Est. for authors &amp; readers
              </p>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
