"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ALL_ROUTES, PAGE_META, type RouteKey } from "@/lib/site";

interface HashRouteState {
  route: RouteKey;
  query: Record<string, string>;
}

function parseHash(hash: string): HashRouteState {
  let raw = hash.replace(/^#/, "");
  if (!raw.startsWith("/")) raw = "/" + raw;
  const [pathPart, queryPart] = raw.split("?");
  const query: Record<string, string> = {};
  if (queryPart) {
    for (const pair of queryPart.split("&")) {
      const [k, v] = pair.split("=");
      if (k) query[decodeURIComponent(k)] = decodeURIComponent(v ?? "");
    }
  }
  const clean = pathPart.replace(/\/+$/, "") || "/";
  const match = ALL_ROUTES.find((item) => item.path === clean);
  return { route: match ? match.key : "home", query };
}

/**
 * Lightweight hash-based router.
 * The sandbox only exposes the `/` route, so all pages live inside one
 * Next.js page and navigation happens via `#/path` hashes — which keeps
 * deep links, the browser back button, and scroll restoration working.
 */
export function useHashRoute(): HashRouteState {
  const [state, setState] = useState<HashRouteState>({ route: "home", query: {} });

  useEffect(() => {
    const update = () => setState(parseHash(window.location.hash));
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  return useMemo(() => state, [state.route, state.query]);
}

/** Navigate programmatically to a hash route. */
export function navigateTo(path: string) {
  const target = path.startsWith("/") ? path : `/${path}`;
  if (window.location.hash === `#${target}`) {
    // Same route requested again — just scroll to top.
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.location.hash = `#${target}`;
}

/** Build a hash href for a route path. */
export function hrefFor(path: string): string {
  return `#${path.startsWith("/") ? path : `/${path}`}`;
}

/** Apply per-page SEO title & description on every route change. */
export function usePageSeo(route: RouteKey) {
  useEffect(() => {
    const meta = PAGE_META[route];
    if (!meta) return;
    const apply = () => {
      document.title = meta.title;
      const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (desc) desc.setAttribute("content", meta.description);
      const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", meta.title);
      const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", meta.description);
    };
    apply();
    // Re-apply once hydration/metadata reconciliation settles (deep-link loads).
    const t = window.setTimeout(apply, 180);
    return () => window.clearTimeout(t);
  }, [route]);
}

/** Scroll to top whenever the route changes. */
export function useScrollTopOnRouteChange(route: RouteKey) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [route]);
}

export function useRouteUtils() {
  return useCallback((path: string) => hrefFor(path), []);
}
