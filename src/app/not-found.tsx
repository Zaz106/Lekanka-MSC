import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import SimpleFooter from "@/components/layout/SimpleFooter";

export const metadata: Metadata = {
  title: {
    absolute: "Page Not Found | Lekanka MSC",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main>
      <Header />
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minHeight: "60vh",
          padding: "8rem 2rem 6rem",
          gap: "1.5rem",
        }}
      >
        <span
          style={{
            fontSize: "1rem",
            color: "var(--accent)",
            border: "1px solid var(--accent)",
            borderRadius: "9999px",
            padding: "0.5rem 2.5rem",
          }}
        >
          404
        </span>
        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.1 }}>
          Page Not Found
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            maxWidth: "480px",
            lineHeight: 1.7,
            fontSize: "1.1rem",
          }}
        >
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: "0.5rem",
            backgroundColor: "var(--accent)",
            color: "#ffffff",
            borderRadius: "9999px",
            padding: "0.825rem 3rem",
            fontSize: "1rem",
            transition: "filter 0.3s ease",
          }}
        >
          Back to Home
        </Link>
      </section>
      <SimpleFooter />
    </main>
  );
}
