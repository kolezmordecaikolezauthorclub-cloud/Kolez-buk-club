import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import os from "os";
import path from "path";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_COVER_BYTES = 5 * 1024 * 1024;
const MAX_SAMPLE_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024;

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
    const sample = form.get("sampleFile");

    // Uploaded files ride to the club inbox as email attachments via the
    // FormSubmit relay, which caps their combined size at 10MB — reject
    // anything larger before it is stored or handed to the relay.
    const totalUploadBytes =
      (cover instanceof File ? cover.size : 0) +
      (sample instanceof File ? sample.size : 0);
    if (totalUploadBytes > MAX_TOTAL_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          error: "Book cover and sample chapter together must be 10MB or less.",
        },
        { status: 400 }
      );
    }

    if (cover instanceof File && cover.size > 0) {
      if (cover.size > MAX_COVER_BYTES) {
        return NextResponse.json(
          { ok: false, error: "Book cover exceeds the 5MB limit." },
          { status: 400 }
        );
      }
      const ext = COVER_TYPES[cover.type];
      if (!ext) {
        return NextResponse.json(
          { ok: false, error: "Book cover must be a JPG, PNG, WEBP, or GIF image." },
          { status: 400 }
        );
      }
      try {
        coverFileName = await saveFile(cover, "cover", ext);
      } catch (err) {
        // Storage is best-effort (e.g. ephemeral free hosting): the form
        // fields still reach the club inbox via the FormSubmit relay.
        console.error("[submit-book] cover storage unavailable:", err);
      }
    }

    if (sample instanceof File && sample.size > 0) {
      if (sample.size > MAX_SAMPLE_BYTES) {
        return NextResponse.json(
          { ok: false, error: "Sample chapter exceeds the 10MB limit." },
          { status: 400 }
        );
      }
      try {
        sampleFileName = await saveFile(sample, "sample", sanitizeExt(sample.name));
      } catch (err) {
        console.error("[submit-book] sample storage unavailable:", err);
      }
    }

    // Database backup is best-effort: on hosts without a persistent disk
    // (e.g. Vercel free tier) the insert may be unavailable, but the primary
    // delivery — the FormSubmit email relay, already activated — still carries
    // every field to the club inbox, so the submission must not fail.
    let stored = false;
    try {
      await db.bookSubmission.create({
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
    } catch (error) {
      console.error("[submit-book] database backup unavailable:", error);
    }

    return NextResponse.json({ ok: true, stored });
  } catch (error) {
    console.error("[submit-book] failed:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not process your submission right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
