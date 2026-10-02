/**
 * Kolez inbox delivery.
 *
 * Forwards website form submissions to the club's Gmail inbox
 * (kolezmordecai.kolezauthorclub@gmail.com) using FormSubmit's
 * form-to-email relay:
 *
 *  1. `forwardToInbox`  — AJAX request from the visitor's browser (primary path
 *     for text-only forms). Keeps the visitor on the page; returns true when the
 *     relay accepted the message for delivery.
 *  2. `fallbackFormSubmit` — classic full-page form POST. Used when the AJAX
 *     request is blocked, and to carry file attachments: the AJAX relay only
 *     accepts JSON, so uploaded files can only travel through this multipart
 *     form. The relay redirects back to the site with `?sent=1` so the page can
 *     show its success state.
 *
 * The database write in the API routes is a best-effort backup only: on hosts
 * without a persistent disk (e.g. Vercel's free tier) it is temporary, so the
 * relay is the delivery path that has to succeed.
 *
 * NOTE (one-time activation): the first submission triggers an activation
 * email from FormSubmit to the inbox owner, who must click the confirmation
 * link once. Afterwards every submission is delivered automatically.
 */

export const INBOX_EMAIL = "kolezmordecai.kolezauthorclub@gmail.com";

const RELAY_TIMEOUT_MS = 12_000;

/** Send form fields to the Kolez inbox from the visitor's browser. */
export async function forwardToInbox(
  fields: Record<string, string>,
  emailSubject: string
): Promise<boolean> {
  if (typeof window === "undefined") return false;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), RELAY_TIMEOUT_MS);

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${INBOX_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        ...fields,
        _subject: emailSubject,
        _template: "table",
        _captcha: "false",
      }),
    });
    if (!res.ok) return false;
    const data = (await res.json().catch(() => null)) as {
      success?: string | boolean;
    } | null;
    return data ? String(data.success).toLowerCase() === "true" : false;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fallback: post a hidden classic form straight to the relay. The browser
 * navigates away briefly and the relay redirects back to `?sent=1`, where the
 * page shows its success state.
 *
 * Pass `files` to attach uploads to the email. The AJAX relay accepts JSON only,
 * so the multipart form is the one delivery path that can carry a visitor's
 * uploaded files; FormSubmit rejects a submission whose attachments total more
 * than 10MB, which is why callers keep their uploads within that budget.
 */
export function fallbackFormSubmit(
  fields: Record<string, string>,
  emailSubject: string,
  returnHash = "#/contact",
  files: Array<{ name: string; file: File }> = []
): void {
  if (typeof window === "undefined") return;

  const form = document.createElement("form");
  form.method = "POST";
  form.action = `https://formsubmit.co/${INBOX_EMAIL}`;
  form.style.display = "none";
  if (files.length > 0) form.enctype = "multipart/form-data";

  const payload: Record<string, string> = {
    ...fields,
    _subject: emailSubject,
    _template: "table",
    _captcha: "false",
    _next: `${window.location.origin}/?sent=1${returnHash}`,
  };

  for (const [key, value] of Object.entries(payload)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  }

  for (const { name, file } of files) {
    const input = document.createElement("input");
    input.type = "file";
    input.name = name;
    const transfer = new DataTransfer();
    transfer.items.add(file);
    input.files = transfer.files;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}
