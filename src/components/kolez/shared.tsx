"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { hrefFor } from "@/lib/router";
import { siteConfig, type RouteKey } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ————————————————— Logo lockup ————————————————— */

export function KolezMark({ className }: { className?: string }) {
  return (
    <Image
      src="/kolez-logo.svg"
      alt="Kolez Buk Club logo"
      width={44}
      height={44}
      className={cn("h-10 w-10", className)}
      priority
    />
  );
}

export function KolezLogo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <a
      href={hrefFor("/")}
      aria-label="Kolez Buk Club — Home"
      className="group inline-flex items-center gap-3"
    >
      <KolezMark className="transition-transform duration-300 group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[22px] font-bold tracking-[0.08em]",
            variant === "dark" ? "text-navy-950" : "text-white"
          )}
        >
          KOLEZ
        </span>
        <span
          className={cn(
            "mt-1 text-[9.5px] font-semibold uppercase tracking-[0.42em]",
            variant === "dark" ? "text-gold-600" : "text-gold-400"
          )}
        >
          Buk Club
        </span>
      </span>
    </a>
  );
}

/* ————————————————— Scroll reveal ————————————————— */

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", visible && "is-visible", className)}
    >
      {children}
    </Tag>
  );
}

/* ————————————————— Eyebrow label ————————————————— */

export function Eyebrow({
  children,
  onDark = false,
  center = false,
}: {
  children: ReactNode;
  onDark?: boolean;
  center?: boolean;
}) {
  return (
    <span
      className={cn(
        "eyebrow",
        onDark && "eyebrow--onDark",
        center && "eyebrow--center"
      )}
    >
      {children}
    </span>
  );
}

/* ————————————————— Buttons ————————————————— */

const baseBtn =
  "inline-flex items-center justify-center gap-2 rounded-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

export function GoldButton({
  children,
  to,
  onClick,
  type = "button",
  className,
  disabled,
}: {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}) {
  const cls = cn(
    baseBtn,
    "bg-gold-500 px-7 py-3.5 text-[12px] text-navy-950 shadow-[0_10px_30px_-12px_rgba(212,167,44,0.55)] hover:bg-gold-400 hover:shadow-[0_14px_34px_-12px_rgba(212,167,44,0.7)] active:translate-y-px",
    className
  );
  if (to) {
    return (
      <a href={hrefFor(to)} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}

export function OutlineButton({
  children,
  to,
  onClick,
  type = "button",
  onDark = false,
  className,
  disabled,
}: {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  onDark?: boolean;
  className?: string;
  disabled?: boolean;
}) {
  const cls = cn(
    baseBtn,
    "px-7 py-3.5 text-[12px] border",
    onDark
      ? "border-gold-400/70 text-gold-400 hover:bg-gold-400/10 hover:border-gold-400"
      : "border-navy-950/30 text-navy-950 hover:border-gold-600 hover:text-gold-600 hover:bg-gold-500/5",
    className
  );
  if (to) {
    return (
      <a href={hrefFor(to)} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}

/* ————————————————— Page hero (sub-pages) ————————————————— */

export function PageHero({
  eyebrow,
  title,
  children,
  image,
  imageAlt = "",
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="texture-navy relative overflow-hidden">
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/85 to-navy-950" />
        </>
      )}
      <div className="relative mx-auto max-w-4xl px-5 pb-20 pt-36 text-center sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-44">
        <Reveal>
          <Eyebrow onDark center>
            {eyebrow}
          </Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.12] text-white sm:text-5xl lg:text-[56px]">
            {title}
          </h1>
        </Reveal>
        {children && (
          <Reveal delay={200}>
            <div className="mx-auto mt-7 max-w-2xl text-[15px] leading-relaxed text-white/75 sm:text-base">
              {children}
            </div>
          </Reveal>
        )}
        <Reveal delay={280}>
          <div className="mx-auto mt-10 flex items-center justify-center gap-2" aria-hidden>
            <span className="h-px w-14 bg-gold-500/50" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold-400" />
            <span className="h-px w-14 bg-gold-500/50" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ————————————————— Feature card ————————————————— */

export function FeatureCard({
  icon,
  title,
  children,
  onDark = false,
  className,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative h-full border p-7 transition-all duration-300",
        onDark
          ? "border-white/10 bg-navy-800/60 hover:border-gold-400/50 hover:bg-navy-700/60"
          : "border-border bg-white hover:border-gold-500/60 hover:shadow-[0_18px_44px_-20px_rgba(7,27,53,0.28)]",
        className
      )}
    >
      <span
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden
      />
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center border transition-colors duration-300",
          onDark
            ? "border-gold-400/40 bg-gold-500/10 text-gold-400 group-hover:bg-gold-500/20"
            : "border-gold-500/40 bg-gold-500/10 text-gold-600 group-hover:bg-gold-500/20"
        )}
      >
        {icon}
      </div>
      <h3
        className={cn(
          "mt-5 font-display text-xl font-semibold tracking-wide",
          onDark ? "text-white" : "text-navy-950"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-3 text-[14.5px] leading-relaxed",
          onDark ? "text-white/70" : "text-ink-muted"
        )}
      >
        {children}
      </p>
    </div>
  );
}

/* ————————————————— CTA band ————————————————— */

export function CtaBand({
  message,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
}: {
  message?: string;
  primaryLabel: string;
  primaryTo: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}) {
  return (
    <section className="texture-navy relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:py-24">
        <Reveal>
          <p className="font-display text-2xl font-medium leading-snug text-white sm:text-[32px] sm:leading-[1.35]">
            {message ??
              "Great books deserve more than launch week. Put your story in front of readers who care."}
          </p>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GoldButton to={primaryTo}>{primaryLabel}</GoldButton>
            {secondaryLabel && secondaryTo && (
              <OutlineButton to={secondaryTo} onDark>
                {secondaryLabel}
              </OutlineButton>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
