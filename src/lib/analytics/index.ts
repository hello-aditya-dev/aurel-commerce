"use client";

export type CommerceEvent =
  | "product_view"
  | "view_item_list"
  | "select_item"
  | "view_item"
  | "add_to_cart"
  | "remove_from_cart"
  | "view_cart"
  | "begin_checkout"
  | "add_shipping_info"
  | "purchase"
  | "add_bundle"
  | "begin_quiz"
  | "quiz_start"
  | "complete_quiz"
  | "quiz_complete"
  | "search"
  | "filter"
  | "newsletter_signup"
  | "newsletter_submit"
  | "contact_submit"
  | "checkout_click"
  | "project_cta_click"
  | "add_to_wishlist"
  | "remove_from_wishlist"
  | "compare_add"
  | "compare_remove"
  | "routine_builder_save"
  | "back_to_top"
  | "quick_view_open"
  | "share_cart"
  | "review_submit"
  | "wishlist_share"
  | "routine_export_pdf"
  | "qa_submit"
  | "qa_vote"
  | "compatibility_check"
  | "routine_save"
  | "routine_share"
  | "review_photo_add";

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
