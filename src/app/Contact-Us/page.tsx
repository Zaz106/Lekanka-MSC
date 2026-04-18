import Header from "@/components/layout/Header";
import SimpleFooter from "@/components/layout/SimpleFooter";
import ContactFormSection from "@/components/sections/Contact-Us/ContactFormSection";
import ContactFaqSection from "@/components/sections/Contact-Us/ContactFaqSection";

export default function ContactPage() {
  return (
    <main>
      <Header />
      <ContactFormSection />
      <ContactFaqSection />
      <SimpleFooter />
    </main>
  );
}
