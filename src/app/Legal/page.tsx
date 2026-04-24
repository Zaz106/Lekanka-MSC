import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import SimpleFooter from "@/components/layout/SimpleFooter";
import LegalContent from "@/components/sections/Legal/LegalContent";
import CTA from "@/components/sections/Home/CTA";

export const metadata: Metadata = {
  title: {
    absolute: "Privacy Policy & Terms of Service | Lekanka MSC",
  },
  description:
    "Read Lekanka MSC's privacy policy and terms of service governing how we collect, use, and protect information from our website visitors.",
  alternates: {
    canonical: "https://www.lmsc.co.za/Legal/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.lmsc.co.za/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Privacy Policy & Terms",
      item: "https://www.lmsc.co.za/Legal/",
    },
  ],
};

export default function LegalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Header />
        <LegalContent />
        <CTA />
        <SimpleFooter />
      </main>
    </>
  );
}