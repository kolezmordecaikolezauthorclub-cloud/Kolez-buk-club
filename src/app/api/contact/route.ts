import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().min(2, "Name is required.").max(160),
  email: z.string().email("A valid email is required.").max(200),
  subject: z.string().min(1, "Subject is required.").max(200),
  message: z.string().min(20, "Message must be at least 20 characters.").max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Please review the form — some fields need attention." },
        { status: 400 }
      );
    }

    // Database backup is best-effort: on hosts without a persistent disk
    // (e.g. Vercel free tier) it may be unavailable, but the primary delivery
    // — the FormSubmit email relay, already activated — is unaffected, and
    // the contact UI shows success based on the relay only.
    try {
      await db.contactMessage.create({ data: parsed.data });
    } catch (error) {
      console.error("[contact] database backup unavailable:", error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] failed:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not send your message right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
