"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  BookOpen,
} from "lucide-react";
import { CONTACT_SUBJECTS, siteConfig } from "@/lib/site";
import { forwardToInbox, fallbackFormSubmit } from "@/lib/mail";
import { cn } from "@/lib/utils";
import { Eyebrow, OutlineButton, PageHero, Reveal } from "../shared";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(1, "Please choose a subject."),
  message: z
    .string()
    .min(20, "Please write at least 20 characters so we can help you properly.")
    .max(2000, "Please keep your message under 2000 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const inputCls =
  "h-11 rounded-sm border-input bg-white text-[15px] text-ink shadow-none transition-colors focus-visible:border-gold-500 focus-visible:ring-2 focus-visible:ring-gold-400/40";

const SOCIAL_ICONS = { facebook: Facebook, instagram: Instagram, twitter: Twitter, linkedin: Linkedin, book: BookOpen } as const;

export function ContactPage({ intent }: { intent?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const { toast } = useToast();

  // Handle the return trip from the classic-form relay fallback
  // (?sent=1 is appended when FormSubmit redirects back to the site).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sent = new URLSearchParams(window.location.search).get("sent");
    if (sent === "1") {
      setState("success");
      window.history.replaceState(null, "", window.location.pathname + window.location.hash);
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: intent === "join" ? "Membership — Join the Club" : "",
      message: "",
    },
  });

  useEffect(() => {
    if (intent === "join") {
      setValue("subject", "Membership — Join the Club", { shouldValidate: false });
    }
  }, [intent, setValue]);

  const subject = watch("subject");

  const onSubmit = async (values: ContactFormValues) => {
    setState("sending");
    setServerError("");
    try {
      const emailSubject = `Kolez Contact — ${values.subject}`;

      // 1) Local backup copy (so no message is ever lost) + 2) delivery to the
      //    club's Gmail inbox — both run in parallel.
      const results = await Promise.allSettled([
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }),
        forwardToInbox(
          {
            Name: values.name,
            Email: values.email,
            Subject: values.subject,
            Message: values.message,
          },
          emailSubject
        ),
      ]);

      const forwarded =
        results[1].status === "fulfilled" && results[1].value === true;

      if (!forwarded) {
        // The browser relay is unreachable — hand off through a classic form
        // post; the relay redirects back with ?sent=1 which restores the
        // success state above.
        fallbackFormSubmit(
          {
            Name: values.name,
            Email: values.email,
            Subject: values.subject,
            Message: values.message,
          },
          emailSubject
        );
        return;
      }

      setState("success");
      toast({
        title: "Message sent",
        description: "Thank you for reaching out — the Kolez team will get back to you.",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setState("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      toast({
        title: "Message not sent",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&rsquo;s Start <span className="gold-gradient-text italic">a Conversation.</span>
          </>
        }
      >
        Questions about membership, your book, or life inside the club? Whatever it is,
        a real person on the Kolez team will read it and reply.
      </PageHero>

      <section className="bg-soft py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1360px] gap-10 px-5 lg:grid-cols-3 lg:px-8">
          {/* ————— Form ————— */}
          <div className="lg:col-span-2">
            <Reveal>
              {state === "success" ? (
                <div className="border border-gold-500/50 bg-white p-10 text-center shadow-[0_24px_60px_-30px_rgba(7,27,53,0.25)]">
                  <CheckCircle2 className="mx-auto h-14 w-14 text-gold-500" aria-hidden />
                  <h2 className="mt-6 font-display text-3xl font-bold text-navy-950">
                    Message Sent
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
                    Thank you for reaching out to Kolez Buk Club. A member of the team will
                    read your message and reply to{" "}
                    <strong className="font-semibold text-navy-950">
                      {watch("email") || "your email address"}
                    </strong>{" "}
                    as soon as possible.
                  </p>
                  <div className="mx-auto mt-8 h-px w-24 bg-gold-500/60" aria-hidden />
                  <div className="mt-8">
                    <OutlineButton
                      onClick={() => {
                        reset();
                        setState("idle");
                      }}
                    >
                      Send Another Message
                    </OutlineButton>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="border border-border bg-white p-7 shadow-[0_20px_60px_-30px_rgba(7,27,53,0.2)] sm:p-10"
                >
                  <h2 className="font-display text-2xl font-semibold text-navy-950">
                    Send Us a Message
                  </h2>
                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="c-name" className="text-[13px] font-semibold uppercase tracking-[0.12em] text-navy-950">
                        Name <span className="ml-1 text-gold-600">*</span>
                      </Label>
                      <Input
                        id="c-name"
                        {...register("name")}
                        placeholder="Your name"
                        className={inputCls}
                        autoComplete="name"
                      />
                      {errors.name && (
                        <p role="alert" className="flex items-center gap-1.5 text-xs font-medium text-destructive">
                          <AlertCircle className="h-3.5 w-3.5" aria-hidden />
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="c-email" className="text-[13px] font-semibold uppercase tracking-[0.12em] text-navy-950">
                        Email <span className="ml-1 text-gold-600">*</span>
                      </Label>
                      <Input
                        id="c-email"
                        {...register("email")}
                        type="email"
                        placeholder="you@example.com"
                        className={inputCls}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p role="alert" className="flex items-center gap-1.5 text-xs font-medium text-destructive">
                          <AlertCircle className="h-3.5 w-3.5" aria-hidden />
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="c-subject" className="text-[13px] font-semibold uppercase tracking-[0.12em] text-navy-950">
                        Subject <span className="ml-1 text-gold-600">*</span>
                      </Label>
                      <input type="hidden" {...register("subject")} />
                      <Select
                        value={subject || undefined}
                        onValueChange={(v) => setValue("subject", v, { shouldValidate: true })}
                      >
                        <SelectTrigger id="c-subject" className={cn(inputCls, "w-full")}>
                          <SelectValue placeholder="Choose a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {CONTACT_SUBJECTS.map((s) => (
                            <SelectItem key={s} value={s} className="rounded-sm">
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.subject && (
                        <p role="alert" className="flex items-center gap-1.5 text-xs font-medium text-destructive">
                          <AlertCircle className="h-3.5 w-3.5" aria-hidden />
                          {errors.subject.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="c-message" className="text-[13px] font-semibold uppercase tracking-[0.12em] text-navy-950">
                        Message <span className="ml-1 text-gold-600">*</span>
                      </Label>
                      <Textarea
                        id="c-message"
                        {...register("message")}
                        rows={7}
                        placeholder="Write your message here — we read every word."
                        className="min-h-[160px] rounded-sm bg-white text-[15px] shadow-none focus-visible:border-gold-500 focus-visible:ring-2 focus-visible:ring-gold-400/40"
                      />
                      {errors.message && (
                        <p role="alert" className="flex items-center gap-1.5 text-xs font-medium text-destructive">
                          <AlertCircle className="h-3.5 w-3.5" aria-hidden />
                          {errors.message.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {state === "error" && serverError && (
                    <div
                      role="alert"
                      className="mt-8 flex items-start gap-3 border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      {serverError}
                    </div>
                  )}

                  <div className="mt-9 flex flex-col items-center gap-5 border-t border-border pt-8 sm:flex-row sm:justify-between">
                    <p className="text-xs leading-relaxed text-ink-muted">
                      <span className="text-gold-600">*</span> Required fields
                    </p>
                    <button
                      type="submit"
                      disabled={state === "sending"}
                      className={cn(
                        "inline-flex min-w-[220px] items-center justify-center gap-2 rounded-sm bg-gold-500 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-950 transition-all duration-300 hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
                        state === "sending" && "opacity-70"
                      )}
                    >
                      {state === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" aria-hidden />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </Reveal>
          </div>

          {/* ————— Sidebar ————— */}
          <aside className="space-y-6">
            <Reveal delay={100}>
              <div className="texture-navy p-8 text-white">
                <h2 className="font-display text-2xl font-semibold">Reach Us Directly</h2>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-6 flex items-center gap-3 text-[15px] text-white/80 transition-colors hover:text-gold-400"
                >
                  <span className="flex h-10 w-10 items-center justify-center border border-gold-400/40 bg-gold-500/10 text-gold-400">
                    <Mail className="h-4 w-4" aria-hidden />
                  </span>
                  {siteConfig.email}
                </a>
                <p className="mt-7 border-t border-white/10 pt-6 text-sm leading-relaxed text-white/60">
                  We read every message personally — whether it is about membership, a book
                  submission, a partnership, or simply a hello. Expect a reply from a real
                  member of the team, not an autoresponder.
                </p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="border border-gold-500/40 bg-white p-8">
                <h3 className="font-display text-xl font-semibold text-navy-950">
                  Follow the Club
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Literary conversations, community updates, and announcements — follow
                  Kolez Buk Club on your favourite platforms.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {siteConfig.socials.map((social) => {
                    const Icon = SOCIAL_ICONS[social.icon as keyof typeof SOCIAL_ICONS] ?? BookOpen;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Kolez Buk Club on ${social.label}`}
                        className="flex h-11 w-11 items-center justify-center border border-border text-ink-muted transition-all duration-300 hover:border-gold-500/70 hover:text-gold-600"
                      >
                        <Icon className="h-4 w-4" aria-hidden />
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="border border-border bg-soft p-8">
                <Eyebrow>Quick Paths</Eyebrow>
                <div className="mt-5 flex flex-col gap-3">
                  <OutlineButton to="/submit" className="w-full">
                    Submit Your Book
                  </OutlineButton>
                  <OutlineButton to="/community" className="w-full">
                    Explore the Community
                  </OutlineButton>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
