/** In-app routes and home-page section hashes (single source of truth for nav links). */
export const NAV = {
  home: "/",
  homeTop: "/#top",
  about: "/#about",
  services: "/#services",
  projects: "/#projects",
  contact: "/Contact-Us",
  contactFaq: "/Contact-Us#faq",
  legal: "/Legal",
} as const;

export const MAPS_JOHANNESBURG =
  "https://www.google.com/maps/search/?api=1&query=Johannesburg%2C+South+Africa";

/**
 * sessionStorage key: section `id` to scroll to after navigating from another route to `/`.
 * (Next.js client navigation often drops the hash before the home layout paints.)
 */
export const HOME_SCROLL_SECTION_KEY = "lmsc-home-section";

/** Contact block in the form (display + actionable URLs). */
export const CONTACT_DETAILS = {
  mapsUrl: MAPS_JOHANNESBURG,
  phoneDisplay: "+27 11 000 0000",
  phoneTel: "+27110000000",
  email: "hello@lmsc.co.za",
} as const;
