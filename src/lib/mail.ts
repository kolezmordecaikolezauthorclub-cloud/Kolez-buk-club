/**
 * Kolez inbox delivery.
 *
 * Forwards website form submissions to the club's Gmail inbox
 * (kolezmordecai.kolezauthorclub@gmail.com) using FormSubmit's
 * form-to-email relay:
 *
 *  1. `forwardToInbox`  — AJAX request from the visitor's browser (primary path).
 *     Keeps the visitor on the page; returns true when the relay accepted the
 *     message for delivery.
 *  2. `fallbackFormSubmit` — classic full-page form POST (fallback path).
 *     Used when the AJAX request is blocked; the relay redirects back to the
 *     site with `?sent=1` so the page can show its success state.
 *
 * Every submission is ALSO saved to the local database by the API routes as a
 * backup, so no message can be lost even while the relay is not yet activated.
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
 * contact page shows its success state.
 */
export function fallbackFormSubmit(
  fields: Record<string, string>,
  emailSubject: string,
  returnHash = "#/contact"
): void {
  if (typeof window === "undefined") return;

  const form = document.createElement("form");
  form.method = "POST";
  form.action = `https://formsubmit.co/${INBOX_EMAIL}`;
  form.style.display = "none";

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

  document.body.appendChild(form);
  form.submit();
}
