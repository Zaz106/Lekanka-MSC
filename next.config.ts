import type { NextConfig } from "next";

// ─────────────────────────────────────────────────────────────────────────────
// Static export — output goes to /out, uploaded to Hostking public_html.
//
// NOTE: headers() and rewrites() are Next.js server features and have NO
// effect when output:"export" is set. Security headers are applied instead
// via public/.htaccess which is copied into /out at build time.
// ─────────────────────────────────────────────────────────────────────────────

const nextConfig: NextConfig = {
  // Emit static HTML/CSS/JS to /out instead of a Node server.
  output: "export",

  // Generate /Contact-Us/index.html instead of /Contact-Us.html so Apache
  // serves them cleanly as directory URLs without extra rewrite rules.
  trailingSlash: true,

  images: {
    // Next.js Image Optimisation is a server feature — disabled for static export.
    // Images are served as-is; consider pre-optimising assets before build.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
