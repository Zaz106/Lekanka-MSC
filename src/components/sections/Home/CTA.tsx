import Link from "next/link";
import { NAV } from "@/constants/navigation";
import styles from "./CTA.module.css";

const CTA = () => {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <h2 className={styles.title}>Turning Dreams Into<br />Construction</h2>
        <p className={styles.subtitle}>
          We are ready to start your next big project. Let's build something extraordinary together.
        </p>
        <Link href={NAV.contact} className={styles.ctaButton} scroll>
          Contact Us
        </Link>
      </div>
    </section>
  );
};

export default CTA;
