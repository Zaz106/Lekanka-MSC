import Image from "next/image";
import styles from "./Hero.module.css";
import { NAV } from "@/constants/navigation";
import { NavSectionLink } from "@/components/layout/NavSectionLink";

const Hero = () => {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.background}>
          <Image
            src="/images/Home-Hero-Image.webp"
            alt="Construction site"
            fill
            sizes="100vw"
            priority
            style={{ objectFit: "cover" }}
            quality={100}
          />
        <div className={styles.overlay} />
      </div>
      
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Turning Dreams Into Construction
          </h1>
          <p className={styles.subtitle}>
            We provide comprehensive construction solutions designed to meet the highest standards of quality, safety, and durability.
          </p>
          <NavSectionLink
            href={NAV.projects}
            sectionId="projects"
            className={styles.ctaButton}
          >
            Explore Projects
          </NavSectionLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;
