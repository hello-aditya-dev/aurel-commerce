"use client";

export type CommerceEvent =
  | "product_view"
  | "add_to_cart"
  | "remove_from_cart"
  | "add_bundle"
  | "begin_quiz"
  | "complete_quiz"
  | "search"
  | "filter"
  | "newsletter_signup"
  | "checkout_click"
  | "project_cta_click";

interface AnalyticsPayload {
  [key: string]: unknown;
}

export function track(event: CommerceEvent, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;
  const data = {
    event,
    ts: Date.now(),
    page: window.location.pathname,
    ...payload,
  };
  window.dispatchEvent(new CustomEvent("aurel:analytics", { detail: data }));
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, payload);
  }
}
