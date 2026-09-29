"use client";

import { BookOpen, Facebook, Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import { NAV_ITEMS, siteConfig } from "@/lib/site";
import { hrefFor } from "@/lib/router";
import { KolezLogo } from "./shared";

const SOCIAL_ICONS: Record<string, typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  book: BookOpen,
};

export function SiteFooter() {
  const explore = NAV_ITEMS.filter((item) =>
    ["about", "authors", "readers", "experience", "community", "voices"].includes(item.key)
  );

  return (
    <footer className="mt-auto border-t border-gold-500/25 bg-navy-950 text-white">
      <div className="mx-auto max-w-[1360px] px-5 pb-10 pt-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <KolezLogo variant="light" />
            <p className="mt-5 max-w-sm font-display text-lg italic leading-relaxed text-white/80">
              &ldquo;{siteConfig.tagline}&rdquo;
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
              {siteConfig.supportingLine}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-6 inline-flex items-center gap-2.5 text-sm text-white/75 transition-colors hover:text-gold-400"
            >
              <Mail className="h-4 w-4 text-gold-400" aria-hidden />
              {siteConfig.email}
            </a>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-400">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {explore.map((item) => (
                <li key={item.key}>
                  <a
                    href={hrefFor(item.path)}
                    className="text-sm text-white/65 transition-colors hover:text-gold-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get involved */}
          <div className="lg:col-span-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-400">
              Get Involved
            </h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={hrefFor("/submit")} className="text-sm text-white/65 transition-colors hover:text-gold-400">
                  Submit Your Book
                </a>
              </li>
              <li>
                <a href={hrefFor("/contact?intent=join")} className="text-sm text-white/65 transition-colors hover:text-gold-400">
                  Join the Club
                </a>
              </li>
              <li>
                <a href={hrefFor("/contact")} className="text-sm text-white/65 transition-colors hover:text-gold-400">
                  Contact
                </a>
              </li>
            </ul>

            <h2 className="mt-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-400">
              Connect With Us
            </h2>
            <div className="mt-5 flex items-center gap-3">
              {siteConfig.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon] ?? BookOpen;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.name} on ${social.label}`}
                    className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 transition-all duration-300 hover:border-gold-400/70 hover:text-gold-400"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
          <p className="text-[13px] tracking-wide text-white/50">
            © 2018 Kolez Buk Club. All rights reserved.
          </p>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold-500/80">
            Discover · Connect · Discuss · Grow
          </p>
        </div>
      </div>
    </footer>
  );
}
