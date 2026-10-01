/**
 * Minimal structured logger.
 *
 * The project has no logging dependency and no OpenTelemetry setup, so this
 * follows the wide-event / canonical-log-line pattern with the smallest
 * surface that fits: one JSON object per line, emitted once per request.
 *
 *   logger.info("contact.request", { requestId, outcome: "ok", stored: true });
 *
 * Only two levels are used: `info` for normal operations (including expected
 * client-side validation rejections) and `error` for unexpected failures that
 * need attention. Dynamic values always go in the event's fields, never
 * interpolated into the event name.
 */

type Fields = Record<string, unknown>;

function emit(level: "info" | "error", event: string, fields: Fields): void {
  const record = { level, time: new Date().toISOString(), event, ...fields };
  const line = JSON.stringify(record);
  if (level === "error") console.error(line);
  else console.log(line);
}

export const logger = {
  info(event: string, fields: Fields = {}): void {
    emit("info", event, fields);
  },
  error(event: string, fields: Fields = {}): void {
    emit("error", event, fields);
  },
};

/** Structured error fields so a caught exception keeps its name, message and stack. */
export function errorContext(error: unknown): Fields {
  if (error instanceof Error) {
    return { name: error.name, message: error.message, stack: error.stack };
  }
  return { name: "NonError", message: String(error) };
}

/** Reuse an upstream correlation id (x-request-id) or mint one per inbound request. */
export function requestIdFrom(headers: Headers): string {
  return headers.get("x-request-id") ?? crypto.randomUUID();
}
