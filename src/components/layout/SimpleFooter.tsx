import Image from "next/image";
import Link from "next/link";
import styles from "./SimpleFooter.module.css";

const SimpleFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.contentWrapper}>
        <div className={styles.footerBlock}>
          <div className={styles.top}>
            <div className={styles.brand}>
              <div className={styles.logo}>
                <Image
                  src="/images/LMSC - Logo.png"
                  alt="LMSC Logo"
                  width={120}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p>
                LMSC Construction delivers end-to-end building and civil solutions
                with the same commitment to quality, safety, and durability you see
                across our projects and services.
              </p>
            </div>
            <div className={styles.columns}>
              <div>
                <h4>Explore</h4>
                <Link href="/" className={styles.columnLink}>Home</Link>
                <Link
                  href="/#about"
                  className={styles.columnLink}
                >
                  About Us
                </Link>
                <Link
                  href="/#services"
                  className={styles.columnLink}
                >
                  Services
                </Link>
                <Link
                  href="/#projects"
                  className={styles.columnLink}
                >
                  Projects
                </Link>
              </div>
              <div>
                <h4>About</h4>
                <Link
                  href="/#about"
                  className={styles.columnLink}
                >
                  Our Story
                </Link>
                <Link
                  href="/#services"
                  className={styles.columnLink}
                >
                  What We Do
                </Link>
                <Link
                  href="/#projects"
                  className={styles.columnLink}
                >
                  Our Work
                </Link>
                <Link href="/Contact-Us" className={styles.columnLink}>
                  Contact Us
                </Link>
              </div>
              <div>
                <h4>Support</h4>
                <div className={styles.linkGroup}>
                  <Link href="/Contact-Us#faq" className={styles.columnLink}>
                    FAQ
                  </Link>
                  <Link href="/Legal" className={styles.columnLink}>
                    Terms of Service
                  </Link>
                  <Link href="/Legal" className={styles.columnLink}>
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.bottom}>
            <span>Copyright {currentYear}. All Rights Reserved</span>
            <span>
              Designed &amp; Maintained by{" "}
              <a href="https://www.voyagevisuals.co.za" target="_blank" rel="noreferrer">
                Voyage Visuals
              </a>
            </span>
            <div className={styles.bottomLinks}>
              <Link href="/Legal">Privacy Policy</Link>
              <Link href="/Legal">Terms and Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
