import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import os from "os";
import path from "path";
import { db } from "@/lib/db";
import { errorContext, logger, requestIdFrom } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_COVER_BYTES = 5 * 1024 * 1024;
const MAX_SAMPLE_BYTES = 10 * 1024 * 1024;

const COVER_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

const SAMPLE_EXTS = [".pdf", ".doc", ".docx", ".epub", ".txt", ".rtf"];

const schema = z.object({
  fullName: z.string().min(2).max(160),
  authorName: z.string().min(2).max(160),
  email: z.string().email().max(200),
  phone: z.string().min(7).max(40),
  bookTitle: z.string().min(1).max(300),
  genre: z.string().min(1).max(100),
  description: z.string().min(50).max(2000),
  publicationDate: z.string().max(40).optional().or(z.literal("")),
  bookWebsite: z.string().max(500).optional().or(z.literal("")),
  purchaseLink: z.string().max(500).optional().or(z.literal("")),
  socialMedia: z.string().max(500).optional().or(z.literal("")),
  motivation: z.string().min(30).max(2000),
});

function str(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function sanitizeExt(name: string): string {
  const ext = path.extname(name).toLowerCase();
  return SAMPLE_EXTS.includes(ext) ? ext : ".bin";
}

async function saveFile(file: File, prefix: string, ext: string): Promise<string> {
  // OS temp dir (cross-platform) — writable on every host, including
  // read-only-filesystem serverless platforms such as Vercel.
  const uploadsDir = path.join(os.tmpdir(), "uploads");
  await mkdir(uploadsDir, { recursive: true });
  const fileName = `${prefix}-${randomUUID()}${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadsDir, fileName), bytes);
  return fileName;
}

export async function POST(req: NextRequest) {
  // One wide event per request: build it as the handler progresses and emit it
  // once on the way out, so validation, partial file-storage failures, the
  // database backup outcome and hard failures all land in a single record.
  const requestId = requestIdFrom(req.headers);
  const startedAt = Date.now();
  const event: Record<string, unknown> = { route: "POST /api/submit-book", requestId };
  let status = 500;

  try {
    const form = await req.formData();

    const parsed = schema.safeParse({
      fullName: str(form, "fullName"),
      authorName: str(form, "authorName"),
      email: str(form, "email"),
      phone: str(form, "phone"),
      bookTitle: str(form, "bookTitle"),
      genre: str(form, "genre"),
      description: str(form, "description"),
      publicationDate: str(form, "publicationDate"),
      bookWebsite: str(form, "bookWebsite"),
      purchaseLink: str(form, "purchaseLink"),
      socialMedia: str(form, "socialMedia"),
      motivation: str(form, "motivation"),
    });

    if (!parsed.success) {
      status = 400;
      event.outcome = "invalid";
      // Field paths only — never the submitted values, which carry PII.
      event.invalidFields = parsed.error.issues.map((issue) => issue.path.join("."));
      return NextResponse.json(
        { ok: false, error: "Please review the form — some fields need attention." },
        { status: 400 }
      );
    }
    const data = parsed.data;

    // Optional file uploads
    let coverFileName: string | null = null;
    let sampleFileName: string | null = null;

    const cover = form.get("coverFile");
    if (cover instanceof File && cover.size > 0) {
      event.coverAttached = true;
      if (cover.size > MAX_COVER_BYTES) {
        status = 400;
        event.outcome = "invalid";
        event.invalidFields = ["coverFile"];
        return NextResponse.json(
          { ok: false, error: "Book cover exceeds the 5MB limit." },
          { status: 400 }
        );
      }
      const ext = COVER_TYPES[cover.type];
      if (!ext) {
        status = 400;
        event.outcome = "invalid";
        event.invalidFields = ["coverFile"];
        return NextResponse.json(
          { ok: false, error: "Book cover must be a JPG, PNG, WEBP, or GIF image." },
          { status: 400 }
        );
      }
      try {
        coverFileName = await saveFile(cover, "cover", ext);
        event.coverStored = true;
        event.coverFileName = coverFileName;
      } catch (err) {
        // Storage is best-effort (e.g. ephemeral free hosting): the form
        // fields still reach the club inbox via the FormSubmit relay.
        event.coverStored = false;
        event.coverStorageError = errorContext(err);
      }
    }

    const sample = form.get("sampleFile");
    if (sample instanceof File && sample.size > 0) {
      event.sampleAttached = true;
      if (sample.size > MAX_SAMPLE_BYTES) {
        status = 400;
        event.outcome = "invalid";
        event.invalidFields = ["sampleFile"];
        return NextResponse.json(
          { ok: false, error: "Sample chapter exceeds the 10MB limit." },
          { status: 400 }
        );
      }
      try {
        sampleFileName = await saveFile(sample, "sample", sanitizeExt(sample.name));
        event.sampleStored = true;
        event.sampleFileName = sampleFileName;
      } catch (err) {
        event.sampleStored = false;
        event.sampleStorageError = errorContext(err);
      }
    }

    // Database backup is best-effort: on hosts without a persistent disk
    // (e.g. Vercel free tier) the insert may be unavailable, but the primary
    // delivery — the FormSubmit email relay, already activated — still carries
    // every field to the club inbox, so the submission must not fail.
    let stored = false;
    try {
      const record = await db.bookSubmission.create({
        data: {
          fullName: data.fullName,
          authorName: data.authorName,
          email: data.email,
          phone: data.phone,
          bookTitle: data.bookTitle,
          genre: data.genre,
          description: data.description,
          publicationDate: data.publicationDate || null,
          bookWebsite: data.bookWebsite || null,
          purchaseLink: data.purchaseLink || null,
          socialMedia: data.socialMedia || null,
          motivation: data.motivation,
          coverFileName,
          sampleFileName,
        },
      });
      stored = true;
      event.stored = true;
      event.submissionId = record.id;
    } catch (error) {
      event.stored = false;
      event.dbError = errorContext(error);
    }

    status = 200;
    event.outcome = "ok";
    return NextResponse.json({ ok: true, stored });
  } catch (error) {
    status = 500;
    event.outcome = "error";
    event.error = errorContext(error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not process your submission right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  } finally {
    event.status = status;
    event.durationMs = Date.now() - startedAt;
    if (status >= 500) logger.error("submit-book.request", event);
    else logger.info("submit-book.request", event);
  }
}
