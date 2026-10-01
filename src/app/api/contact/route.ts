import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { errorContext, logger, requestIdFrom } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().min(2, "Name is required.").max(160),
  email: z.string().email("A valid email is required.").max(200),
  subject: z.string().min(1, "Subject is required.").max(200),
  message: z.string().min(20, "Message must be at least 20 characters.").max(2000),
});

export async function POST(req: NextRequest) {
  // One wide event per request: build it as the handler progresses and emit it
  // once on the way out, so success, validation rejection and failure paths all
  // land in a single queryable record.
  const requestId = requestIdFrom(req.headers);
  const startedAt = Date.now();
  const event: Record<string, unknown> = { route: "POST /api/contact", requestId };
  let status = 500;

  try {
    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);

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

    // Database backup is best-effort: on hosts without a persistent disk
    // (e.g. Vercel free tier) it may be unavailable, but the primary delivery
    // — the FormSubmit email relay, already activated — is unaffected, and
    // the contact UI shows success based on the relay only.
    try {
      const stored = await db.contactMessage.create({ data: parsed.data });
      event.stored = true;
      event.messageId = stored.id;
    } catch (error) {
      event.stored = false;
      event.dbError = errorContext(error);
    }

    status = 200;
    event.outcome = "ok";
    return NextResponse.json({ ok: true });
  } catch (error) {
    status = 500;
    event.outcome = "error";
    event.error = errorContext(error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not send your message right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  } finally {
    event.status = status;
    event.durationMs = Date.now() - startedAt;
    if (status >= 500) logger.error("contact.request", event);
    else logger.info("contact.request", event);
  }
}
