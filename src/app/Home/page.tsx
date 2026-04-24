import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Home/Hero";
import Stats from "@/components/sections/Home/Stats";
import CoreServices from "@/components/sections/Home/CoreServices";
import Offerings from "@/components/sections/Home/Offerings";
import Testimonials from "@/components/sections/Home/Testimonials";
import Projects from "@/components/sections/Home/Projects";
import CTA from "@/components/sections/Home/CTA";
import SimpleFooter from "@/components/layout/SimpleFooter";

export const metadata: Metadata = {
  title: {
    absolute: "Lekanka MSC | Mining, Supply & Construction in South Africa",
  },
  description:
    "Lekanka MSC delivers integrated mining, supply, and construction solutions across South Africa — built on quality, safety, and 11+ years of experience.",
  alternates: {
    canonical: "https://www.lmsc.co.za/",
  },
  openGraph: {
    title: "Lekanka MSC | Mining, Supply & Construction in South Africa",
    description:
      "Lekanka MSC delivers integrated mining, supply, and construction solutions across South Africa — built on quality, safety, and 11+ years of experience.",
    url: "https://www.lmsc.co.za/",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Lekanka MSC — construction and mining site in South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lekanka MSC | Mining, Supply & Construction in South Africa",
    description:
      "Integrated mining, supply, and construction solutions across South Africa — quality, safety, and 11+ years of experience.",
    images: ["/images/og-home.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.lmsc.co.za/#business",
      name: "Lekanka Mining, Supply and Construction",
      alternateName: "LMSC",
      url: "https://www.lmsc.co.za",
      email: "info@lekankamsc.co.za",
      description:
        "End-to-end mining, supply, and construction solutions built on quality, safety, and reliability across South Africa.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Johannesburg",
        addressCountry: "ZA",
      },
      areaServed: { "@type": "Country", name: "South Africa" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Mining, Supply & Construction Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Commercial Construction",
              description:
                "Full-scope commercial builds from groundworks to final handover.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mining & Resource Extraction",
              description:
                "End-to-end resource extraction including site preparation, logistics, and environmental compliance.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Civil & Infrastructure Development",
              description:
                "Large-scale civil infrastructure with rigorous project controls and specialist subcontractor coordination.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Safety, Environmental & Regulatory Compliance",
              description:
                "Full compliance with South African construction regulations and safety standards.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.lmsc.co.za/#website",
      url: "https://www.lmsc.co.za",
      name: "Lekanka MSC",
      publisher: { "@id": "https://www.lmsc.co.za/#business" },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lmsc.co.za/#webpage",
      url: "https://www.lmsc.co.za/",
      name: "Lekanka MSC | Mining, Supply & Construction in South Africa",
      isPartOf: { "@id": "https://www.lmsc.co.za/#website" },
      about: { "@id": "https://www.lmsc.co.za/#business" },
      dateModified: "2026-04-24",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Header />
        <Hero />
        <Stats />
        <CoreServices />
        <Offerings />
        <Testimonials />
        <Projects />
        <CTA />
        <SimpleFooter />
      </main>
    </>
  );
}
