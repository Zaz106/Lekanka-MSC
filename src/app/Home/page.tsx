import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Home/Hero";
import Stats from "@/components/sections/Home/Stats";
import CoreServices from "@/components/sections/Home/CoreServices";
import Offerings from "@/components/sections/Home/Offerings";
import Testimonials from "@/components/sections/Home/Testimonials";
import Projects from "@/components/sections/Home/Projects";
import CTA from "@/components/sections/Home/CTA";
import SimpleFooter from "@/components/layout/SimpleFooter";

export default function HomePage() {
  return (
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
  );
}
