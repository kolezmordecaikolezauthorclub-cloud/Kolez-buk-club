"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  BookOpen,
  CheckCircle2,
  CloudUpload,
  FileText,
  Image as ImageIcon,
  Loader2,
  Mail,
  AlertCircle,
  X,
} from "lucide-react";
import { BOOK_GENRES } from "@/lib/site";
import { forwardToInbox } from "@/lib/mail";
import { cn } from "@/lib/utils";
import {
  Eyebrow,
  GoldButton,
  OutlineButton,
  PageHero,
  Reveal,
} from "../shared";
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

/* ————— Validation schema ————— */

const MAX_COVER_MB = 5;
const MAX_SAMPLE_MB = 10;

const bookSchema = z
  .object({
    fullName: z.string().min(2, "Please enter your full name."),
    authorName: z.string().min(2, "Please enter the name you publish under."),
    email: z.string().email("Please enter a valid email address."),
    phone: z
      .string()
      .min(7, "Please enter a valid phone number.")
      .regex(/^[+0-9()\-\s]+$/, "Phone number can only contain digits, spaces, and + ( ) -"),
    bookTitle: z.string().min(2, "Please enter your book title."),
    genre: z.string().min(1, "Please select a genre."),
    description: z
      .string()
      .min(50, "Please write at least 50 characters so readers can understand your book.")
      .max(2000, "Please keep the description under 2000 characters."),
    publicationDate: z.string().optional(),
    bookWebsite: z
      .string()
      .optional()
      .refine((v) => !v || /^https?:\/\/.+\..+/.test(v.trim()), {
        message: "Website must start with http:// or https://",
      }),
    purchaseLink: z
      .string()
      .optional()
      .refine((v) => !v || /^https?:\/\/.+\..+/.test(v.trim()), {
        message: "Purchase link must start with http:// or https://",
      }),
    socialMedia: z.string().optional(),
    motivation: z
      .string()
      .min(30, "Please write at least 30 characters — tell us what you hope to achieve."),
    coverFile: z
      .instanceof(File)
      .refine((f) => f.size <= MAX_COVER_MB * 1024 * 1024, `Cover image must be ${MAX_COVER_MB}MB or less`)
      .refine(
        (f) => ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(f.type),
        "Cover must be a JPG, PNG, WEBP, or GIF image"
      )
      .optional()
      .nullable(),
    sampleFile: z
      .instanceof(File)
      .refine((f) => f.size <= MAX_SAMPLE_MB * 1024 * 1024, `Sample chapter must be ${MAX_SAMPLE_MB}MB or less`)
      .refine(
        (f) =>
          [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/epub+zip",
            "text/plain",
            "application/rtf",
            "text/rtf",
          ].includes(f.type) ||
          /\.(pdf|docx?|epub|txt|rtf)$/i.test(f.name),
        "Sample chapter must be a PDF, DOC, DOCX, EPUB, TXT, or RTF file"
      )
      .optional()
      .nullable(),
  });

type BookFormValues = z.infer<typeof bookSchema>;

/* ————— Field shell ————— */

function Field({
  label,
  required = false,
  error,
  children,
  hint,
  className,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-[13px] font-semibold uppercase tracking-[0.12em] text-navy-950">
        {label}
        {required && <span className="ml-1 text-gold-600">*</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-xs leading-relaxed text-ink-muted">{hint}</p>}
      {error && (
        <p role="alert" className="flex items-center gap-1.5 text-xs font-medium text-destructive">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "h-11 rounded-sm border-input bg-white text-[15px] text-ink shadow-none transition-colors focus-visible:border-gold-500 focus-visible:ring-2 focus-visible:ring-gold-400/40";

/* ————— File drop zone ————— */

function FileDrop({
  accept,
  icon,
  label,
  hint,
  file,
  onFile,
  error,
}: {
  accept: string;
  icon: React.ReactNode;
  label: string;
  hint: string;
  file: File | null | undefined;
  onFile: (f: File | null) => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-2">
      <Label className="text-[13px] font-semibold uppercase tracking-[0.12em] text-navy-950">
        {label}
      </Label>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex w-full items-center gap-4 border border-dashed bg-white px-5 py-5 text-left transition-colors hover:border-gold-500 hover:bg-gold-100/30",
          error ? "border-destructive" : "border-input"
        )}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold-500/40 bg-gold-500/10 text-gold-600">
          {icon}
        </span>
        {file ? (
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-navy-950">{file.name}</span>
            <span className="block text-xs text-ink-muted">
              {(file.size / 1024 / 1024).toFixed(2)} MB — click to replace
            </span>
          </span>
        ) : (
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 text-sm font-semibold text-navy-950">
              <CloudUpload className="h-4 w-4 text-gold-600" aria-hidden />
              Click to upload
            </span>
            <span className="mt-0.5 block text-xs text-ink-muted">{hint}</span>
          </span>
        )}
        {file && (
          <span
            role="button"
            tabIndex={0}
            aria-label={`Remove ${file.name}`}
            onClick={(e) => {
              e.stopPropagation();
              onFile(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                onFile(null);
                if (inputRef.current) inputRef.current.value = "";
              }
            }}
            className="flex h-8 w-8 shrink-0 items-center justify-center border border-border text-ink-muted transition-colors hover:border-destructive hover:text-destructive"
          >
            <X className="h-4 w-4" aria-hidden />
          </span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden-file-input"
        aria-label={label}
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />
      {error && (
        <p role="alert" className="flex items-center gap-1.5 text-xs font-medium text-destructive">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

/* ————— Page ————— */

export function SubmitPage() {
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [submittedTitle, setSubmittedTitle] = useState("");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      fullName: "",
      authorName: "",
      email: "",
      phone: "",
      bookTitle: "",
      genre: "",
      description: "",
      publicationDate: "",
      bookWebsite: "",
      purchaseLink: "",
      socialMedia: "",
      motivation: "",
      coverFile: null,
      sampleFile: null,
    },
  });

  const genre = watch("genre");
  const coverFile = watch("coverFile");
  const sampleFile = watch("sampleFile");

  const onFile = (field: "coverFile" | "sampleFile", file: File | null) => {
    setValue(field, file, { shouldValidate: true });
  };

  const onSubmit = async (values: BookFormValues) => {
    setSubmitState("sending");
    setServerError("");
    try {
      const fd = new FormData();
      fd.append("fullName", values.fullName);
      fd.append("authorName", values.authorName);
      fd.append("email", values.email);
      fd.append("phone", values.phone);
      fd.append("bookTitle", values.bookTitle);
      fd.append("genre", values.genre);
      fd.append("description", values.description);
      fd.append("publicationDate", values.publicationDate ?? "");
      fd.append("bookWebsite", values.bookWebsite ?? "");
      fd.append("purchaseLink", values.purchaseLink ?? "");
      fd.append("socialMedia", values.socialMedia ?? "");
      fd.append("motivation", values.motivation);
      if (values.coverFile) fd.append("coverFile", values.coverFile);
      if (values.sampleFile) fd.append("sampleFile", values.sampleFile);

      const res = await fetch("/api/submit-book", { method: "POST", body: fd });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      // Best-effort: also forward the submission details to the club's Gmail
      // inbox. Uploaded files stay stored on the club server; the email
      // summarises the entry. Never blocks or breaks the success flow.
      void forwardToInbox(
        {
          Author: values.authorName,
          "Full Name": values.fullName,
          Email: values.email,
          Phone: values.phone,
          "Book Title": values.bookTitle,
          Genre: values.genre,
          Description: values.description,
          "Publication Date": values.publicationDate || "—",
          "Book Website": values.bookWebsite || "—",
          "Purchase Link": values.purchaseLink || "—",
          "Social Media": values.socialMedia || "—",
          "Why Join Kolez": values.motivation,
          Attachments:
            [
              values.coverFile ? "Book cover uploaded" : null,
              values.sampleFile ? "Sample chapter uploaded" : null,
            ]
              .filter(Boolean)
              .join("; ") || "None",
        },
        `Kolez Book Submission — ${values.bookTitle}`
      ).catch(() => undefined);

      setSubmittedTitle(values.bookTitle);
      setSubmitState("success");
      toast({
        title: "Book submitted",
        description: `Thank you — “${values.bookTitle}” has been sent to the Kolez team.`,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitState("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      toast({
        title: "Submission failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  /* ————— Success view ————— */
  if (submitState === "success") {
    return (
      <>
        <PageHero eyebrow="Submission Received" title="Thank You, Author.">
          Your book is on its way to the Kolez team.
        </PageHero>
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-2xl px-5">
            <div className="border border-gold-500/50 bg-white p-10 text-center shadow-[0_24px_60px_-30px_rgba(7,27,53,0.25)]">
              <CheckCircle2 className="mx-auto h-14 w-14 text-gold-500" aria-hidden />
              <h2 className="mt-6 font-display text-3xl font-bold text-navy-950">
                Your Book Has Been Submitted
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                Thank you for sharing <strong className="font-semibold text-navy-950">&ldquo;{submittedTitle}&rdquo;</strong>{" "}
                with Kolez Buk Club. Our team will review your submission and reach out to{" "}
                <strong className="font-semibold text-navy-950">{watch("email")}</strong> about
                the next steps — introducing your work to readers, discussions, and the
                community.
              </p>
              <div className="mx-auto mt-8 h-px w-24 bg-gold-500/60" aria-hidden />
              <p className="mt-8 font-display text-lg italic text-navy-800">
                &ldquo;Every great story deserves a community.&rdquo;
              </p>
              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <OutlineButton
                  onClick={() => {
                    reset();
                    setSubmitState("idle");
                  }}
                >
                  Submit Another Book
                </OutlineButton>
                <GoldButton to="/community">Explore the Community</GoldButton>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Author Submission"
        title="Share Your Book with Kolez Buk Club."
        image="/images/hero-authors.jpg"
        imageAlt="A candlelit writing desk in a library"
      >
        Tell us about your book — the story, the work behind it, and the readers you hope
        to reach. Every submission is read by a real person on the Kolez team.
      </PageHero>

      <section className="bg-soft py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1360px] gap-12 px-5 lg:grid-cols-3 lg:px-8">
          {/* ————— Form ————— */}
          <div className="lg:col-span-2">
            <Reveal>
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="border border-border bg-white p-7 shadow-[0_20px_60px_-30px_rgba(7,27,53,0.2)] sm:p-10"
              >
                {/* About you */}
                <fieldset>
                  <legend className="font-display text-2xl font-semibold text-navy-950">
                    01 — About You
                  </legend>
                  <div className="mt-7 grid gap-6 sm:grid-cols-2">
                    <Field label="Full Name" required error={errors.fullName?.message}>
                      <Input
                        {...register("fullName")}
                        placeholder="e.g. Jordan Ellery"
                        className={inputCls}
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Author Name" required error={errors.authorName?.message}>
                      <Input
                        {...register("authorName")}
                        placeholder="Name you publish under"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Email Address" required error={errors.email?.message}>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="you@example.com"
                        className={inputCls}
                        autoComplete="email"
                      />
                    </Field>
                    <Field label="Phone Number" required error={errors.phone?.message}>
                      <Input
                        {...register("phone")}
                        type="tel"
                        placeholder="+1 555 000 0000"
                        className={inputCls}
                        autoComplete="tel"
                      />
                    </Field>
                    <Field
                      label="Social Media"
                      error={errors.socialMedia?.message}
                      hint="Instagram, X, or other profiles (optional)"
                      className="sm:col-span-2"
                    >
                      <Input
                        {...register("socialMedia")}
                        placeholder="e.g. @yourhandle or profile links"
                        className={inputCls}
                      />
                    </Field>
                  </div>
                </fieldset>

                <div className="my-10 hairline-gold" aria-hidden />

                {/* About the book */}
                <fieldset>
                  <legend className="font-display text-2xl font-semibold text-navy-950">
                    02 — About the Book
                  </legend>
                  <div className="mt-7 grid gap-6 sm:grid-cols-2">
                    <Field label="Book Title" required error={errors.bookTitle?.message}>
                      <Input
                        {...register("bookTitle")}
                        placeholder="Your book's title"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Book Genre" required error={errors.genre?.message}>
                      <Select
                        value={genre || undefined}
                        onValueChange={(v) => setValue("genre", v, { shouldValidate: true })}
                      >
                        <SelectTrigger className={cn(inputCls, "w-full")}>
                          <SelectValue placeholder="Select a genre" />
                        </SelectTrigger>
                        <SelectContent>
                          {BOOK_GENRES.map((g) => (
                            <SelectItem key={g} value={g} className="rounded-sm">
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field
                      label="Book Description"
                      required
                      error={errors.description?.message}
                      hint="What is the book about? What should readers expect? (50–2000 characters)"
                      className="sm:col-span-2"
                    >
                      <Textarea
                        {...register("description")}
                        rows={6}
                        placeholder="Tell us about your book — its story, themes, and why it matters."
                        className="min-h-[140px] rounded-sm bg-white text-[15px] shadow-none focus-visible:border-gold-500 focus-visible:ring-2 focus-visible:ring-gold-400/40"
                      />
                    </Field>
                    <Field label="Publication Date" error={errors.publicationDate?.message}>
                      <Input
                        {...register("publicationDate")}
                        type="date"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Book Website" error={errors.bookWebsite?.message}>
                      <Input
                        {...register("bookWebsite")}
                        placeholder="https://…"
                        className={inputCls}
                      />
                    </Field>
                    <Field
                      label="Book Purchase Link"
                      error={errors.purchaseLink?.message}
                      className="sm:col-span-2"
                    >
                      <Input
                        {...register("purchaseLink")}
                        placeholder="https://… (where readers can buy the book)"
                        className={inputCls}
                      />
                    </Field>
                  </div>
                </fieldset>

                <div className="my-10 hairline-gold" aria-hidden />

                {/* Uploads */}
                <fieldset>
                  <legend className="font-display text-2xl font-semibold text-navy-950">
                    03 — Materials
                  </legend>
                  <div className="mt-7 grid gap-6 sm:grid-cols-2">
                    <FileDrop
                      label="Upload Book Cover"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      icon={<ImageIcon className="h-5 w-5" aria-hidden />}
                      hint={`JPG, PNG, WEBP or GIF — max ${MAX_COVER_MB}MB (optional)`}
                      file={coverFile}
                      onFile={(f) => onFile("coverFile", f)}
                      error={errors.coverFile?.message}
                    />
                    <FileDrop
                      label="Upload Sample Chapter"
                      accept=".pdf,.doc,.docx,.epub,.txt,.rtf,application/pdf,text/plain"
                      icon={<FileText className="h-5 w-5" aria-hidden />}
                      hint={`PDF, DOC, DOCX, EPUB, TXT or RTF — max ${MAX_SAMPLE_MB}MB (optional)`}
                      file={sampleFile}
                      onFile={(f) => onFile("sampleFile", f)}
                      error={errors.sampleFile?.message}
                    />
                  </div>
                </fieldset>

                <div className="my-10 hairline-gold" aria-hidden />

                {/* Motivation */}
                <fieldset>
                  <legend className="font-display text-2xl font-semibold text-navy-950">
                    04 — Your Intentions
                  </legend>
                  <div className="mt-7">
                    <Field
                      label="Why would you like to join Kolez Buk Club?"
                      required
                      error={errors.motivation?.message}
                      hint="Tell us what you hope to achieve — connection, feedback, discovery, community."
                    >
                      <Textarea
                        {...register("motivation")}
                        rows={5}
                        placeholder="What do you hope to achieve through the Kolez community?"
                        className="min-h-[120px] rounded-sm bg-white text-[15px] shadow-none focus-visible:border-gold-500 focus-visible:ring-2 focus-visible:ring-gold-400/40"
                      />
                    </Field>
                  </div>
                </fieldset>

                {submitState === "error" && serverError && (
                  <div
                    role="alert"
                    className="mt-8 flex items-start gap-3 border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    {serverError}
                  </div>
                )}

                <div className="mt-10 flex flex-col items-center gap-5 border-t border-border pt-8 sm:flex-row sm:justify-between">
                  <p className="text-xs leading-relaxed text-ink-muted">
                    <span className="text-gold-600">*</span> Required fields. By submitting,
                    you agree to be contacted about your submission.
                  </p>
                  <GoldButton type="submit" disabled={submitState === "sending"} className="min-w-[240px]">
                    {submitState === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <BookOpen className="h-4 w-4" aria-hidden />
                        Submit Your Book
                      </>
                    )}
                  </GoldButton>
                </div>
              </form>
            </Reveal>
          </div>

          {/* ————— Sidebar ————— */}
          <aside className="space-y-6">
            <Reveal delay={100}>
              <div className="texture-navy p-8 text-white">
                <h2 className="font-display text-2xl font-semibold">What Happens Next?</h2>
                <ol className="mt-7 space-y-6">
                  {[
                    {
                      n: "1",
                      t: "Review",
                      d: "Your book is read with care — story, genre, and the readers it will speak to.",
                    },
                    {
                      n: "2",
                      t: "Introduction",
                      d: "If it meets the club's standard, it is prepared for a proper introduction to the community.",
                    },
                    {
                      n: "3",
                      t: "Conversation",
                      d: "Readers discover the book, discussions gather, and honest reviews begin to arrive.",
                    },
                  ].map((step) => (
                    <li key={step.n} className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-400/50 font-display text-sm font-bold text-gold-400">
                        {step.n}
                      </span>
                      <span>
                        <span className="block font-semibold text-white">{step.t}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-white/65">
                          {step.d}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="border border-gold-500/40 bg-white p-8">
                <h3 className="font-display text-xl font-semibold text-navy-950">
                  Questions First?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Not sure whether the club is right for your book? Ask us — every message
                  is read by a real person on the Kolez team, and we would rather answer
                  questions than have you submit in the dark.
                </p>
                <OutlineButton to="/contact" className="mt-6 w-full">
                  Contact the Team
                </OutlineButton>
                <a
                  href="mailto:kolezmordecai.kolezauthorclub@gmail.com"
                  className="mt-5 flex items-center justify-center gap-2 text-sm text-ink-muted transition-colors hover:text-gold-600"
                >
                  <Mail className="h-4 w-4 text-gold-600" aria-hidden />
                  kolezmordecai.kolezauthorclub@gmail.com
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
