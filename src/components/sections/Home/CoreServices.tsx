import Image from "next/image";
import styles from "./CoreServices.module.css";

const CoreServices = () => {
  return (
    <section id="about" className={`container ${styles.section}`}>
      <div className={styles.header}>
        <span className={styles.subtitle}>About Us</span>
        <h2 className={styles.title}>Core Services Provided and Specialisations</h2>
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src="/images/Home-AboutUs-Image.webp"
          alt="Core Services"
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className={styles.textContent}>
        <p>
          We pride ourselves on offering integrated mining, supply, and
          construction solutions. From the initial planning stages to the final
          handover, our team ensures every project meets the highest standards
          of excellence. Our experienced professionals bring decades of
          collective knowledge to every site, ensuring safety, efficiency, and
          reliability.
        </p>
        <p>
          Whether it is commercial construction, industrial development,
          resource extraction, or large-scale civil engineering, our
          specialisations allow us to tackle complex challenges head-on. We
          utilise modern methodologies and state-of-the-art equipment to
          deliver results that stand the test of time.
        </p>
      </div>
    </section>
  );
};

export default CoreServices;
