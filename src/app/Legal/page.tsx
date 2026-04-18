import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import SimpleFooter from "@/components/layout/SimpleFooter";
import LegalContent from "@/components/sections/Legal/LegalContent";
import CTA from "@/components/sections/Home/CTA";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms of Service | LMSC Construction",
  description:
    "Privacy policy and terms of service for LMSC Construction’s website and enquiries.",
};

export default function LegalPage() {
  return (
    <main>
      <Header />
      <LegalContent />
      <CTA />
      <SimpleFooter />
    </main>
  );
}
