// Google Tag Manager event tracking utilities

// Extend the Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

// Push data to GTM dataLayer
export function pushToDataLayer(data: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push(data);
  }
}

// Track custom events (supports both GTM dataLayer and GA gtag)
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
) {
  // Push to GTM dataLayer (preferred method)
  pushToDataLayer({
    event: eventName,
    ...eventParams,
  });

  // Fallback to gtag if available (for direct GA tracking)
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
}

// Track page views (useful for client-side navigation)
export function trackPageView(url: string, title?: string) {
  // Push to GTM dataLayer
  pushToDataLayer({
    event: "page_view",
    page_path: url,
    page_title: title || document.title,
  });

  // Fallback to gtag
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", {
      page_path: url,
    });
  }
}

// Common event trackers
export const analytics = {
  // Track button clicks
  trackButtonClick: (buttonName: string, location?: string) => {
    trackEvent("button_click", {
      button_name: buttonName,
      location: location || "unknown",
    });
  },

  // Track form submissions
  trackFormSubmit: (formName: string) => {
    trackEvent("form_submit", {
      form_name: formName,
    });
  },

  // Track waitlist signups
  trackWaitlistSignup: (email: string) => {
    trackEvent("waitlist_signup", {
      method: "email",
      email_domain: email.split("@")[1] || "unknown",
    });
  },

  // Track external link clicks
  trackExternalLink: (url: string, linkText?: string) => {
    trackEvent("external_link_click", {
      url,
      link_text: linkText,
    });
  },

  // Track errors
  trackError: (errorMessage: string, errorLocation?: string) => {
    trackEvent("error", {
      error_message: errorMessage,
      error_location: errorLocation,
    });
  },
};
