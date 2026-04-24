import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import SimpleFooter from "@/components/layout/SimpleFooter";
import ContactFormSection from "@/components/sections/Contact-Us/ContactFormSection";
import ContactFaqSection from "@/components/sections/Contact-Us/ContactFaqSection";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Lekanka MSC | Construction & Mining Enquiries",
  },
  description:
    "Get in touch with Lekanka MSC for mining, supply, and construction enquiries. Based in Johannesburg and serving projects across South Africa.",
  alternates: {
    canonical: "https://www.lmsc.co.za/Contact-Us/",
  },
  openGraph: {
    title: "Contact Lekanka MSC | Construction & Mining Enquiries",
    description:
      "Get in touch with Lekanka MSC for mining, supply, and construction enquiries. Based in Johannesburg and serving projects across South Africa.",
    url: "https://www.lmsc.co.za/Contact-Us/",
    images: [
      {
        url: "/images/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Lekanka MSC — Construction and Mining Specialists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Lekanka MSC | Construction & Mining Enquiries",
    description:
      "Get in touch with Lekanka MSC for mining, supply, and construction enquiries across South Africa.",
    images: ["/images/og-contact.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": "https://www.lmsc.co.za/Contact-Us/#faqpage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How long does a typical construction project take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Timelines depend on the scope and complexity of the build. Smaller renovations can be completed in a few weeks, while large commercial or civil projects may run for several months. We provide a detailed schedule during the planning phase and keep you updated at every milestone.",
          },
        },
        {
          "@type": "Question",
          name: "What types of projects does LMSC take on?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We specialise in commercial construction, industrial development, civil engineering, mining and resource extraction operations, supply chain and procurement support, renovations, and ongoing site maintenance.",
          },
        },
        {
          "@type": "Question",
          name: "Are you licensed and insured?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. LMSC is fully licensed, insured, and compliant with all relevant South African construction regulations and safety standards. We can provide documentation on request.",
          },
        },
        {
          "@type": "Question",
          name: "Do you handle project management end-to-end?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. From initial consultation and design coordination through to procurement, construction, and final handover, our team manages every stage of the project so you don't have to.",
          },
        },
        {
          "@type": "Question",
          name: "How do you manage project budgets and timelines?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We provide transparent, itemised quotes upfront and track spend and progress throughout the build. Regular reporting ensures there are no surprises and that we deliver on time and on budget.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer a warranty on your work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All workmanship is backed by our quality guarantee, and we stand behind every project we deliver. Specific warranty terms are outlined in your contract before construction begins.",
          },
        },
        {
          "@type": "Question",
          name: "Can you work on an existing site or building?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Definitely. We regularly work on renovations, refurbishments, and extensions of existing structures. We'll assess the site, plan around any operational constraints, and keep disruption to a minimum.",
          },
        },
      ],
    },
    {
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
          name: "Contact Us",
          item: "https://www.lmsc.co.za/Contact-Us/",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lmsc.co.za/Contact-Us/#webpage",
      url: "https://www.lmsc.co.za/Contact-Us/",
      name: "Contact Lekanka MSC | Construction & Mining Enquiries",
      isPartOf: { "@id": "https://www.lmsc.co.za/#website" },
      dateModified: "2026-04-24",
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Header />
        <ContactFormSection />
        <ContactFaqSection />
        <SimpleFooter />
      </main>
    </>
  );
}
