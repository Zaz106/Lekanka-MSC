import type { NextConfig } from "next";

// next/font/google self-hosts fonts at build time — no external font requests at runtime
const cspHeader = [
  "default-src 'self'",
  // unsafe-inline: Next.js injects __NEXT_DATA__ and hydration scripts inline
  // unsafe-eval: GSAP animation engine requires it at runtime
  // va.vercel-scripts.com: Vercel Analytics loads its script from this origin at runtime
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  // Vercel Analytics loads from va.vercel-scripts.com and sends beacons to vitals.vercel-insights.com
  "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: cspHeader,
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    qualities: [100, 75],
    // Adding 1536 lets Next.js serve a tighter fit for ~1477px viewports
    // instead of jumping straight to 1920px (saves ~23 KiB per Lighthouse)
    deviceSizes: [640, 750, 828, 1080, 1200, 1536, 1920, 2048, 3840],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/pages",
      },
    ];
  },
};

export default nextConfig;
