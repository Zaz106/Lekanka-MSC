import Image from "next/image";
import Link from "next/link";
import { NAV } from "@/constants/navigation";
import { NavHomeTopLink, NavSectionLink } from "@/components/layout/NavSectionLink";
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
                <NavHomeTopLink className={styles.columnLink}>Home</NavHomeTopLink>
                <NavSectionLink
                  href={NAV.about}
                  sectionId="about"
                  className={styles.columnLink}
                >
                  About Us
                </NavSectionLink>
                <NavSectionLink
                  href={NAV.services}
                  sectionId="services"
                  className={styles.columnLink}
                >
                  Services
                </NavSectionLink>
                <NavSectionLink
                  href={NAV.projects}
                  sectionId="projects"
                  className={styles.columnLink}
                >
                  Projects
                </NavSectionLink>
              </div>
              <div>
                <h4>About</h4>
                <NavSectionLink
                  href={NAV.about}
                  sectionId="about"
                  className={styles.columnLink}
                >
                  Our Story
                </NavSectionLink>
                <NavSectionLink
                  href={NAV.services}
                  sectionId="services"
                  className={styles.columnLink}
                >
                  What We Do
                </NavSectionLink>
                <NavSectionLink
                  href={NAV.projects}
                  sectionId="projects"
                  className={styles.columnLink}
                >
                  Our Work
                </NavSectionLink>
                <Link href={NAV.contact} className={styles.columnLink} scroll>
                  Contact Us
                </Link>
              </div>
              <div>
                <h4>Support</h4>
                <div className={styles.linkGroup}>
                  <Link href={NAV.contactFaq} className={styles.columnLink} scroll={false}>
                    FAQ
                  </Link>
                  <Link href={NAV.legal} className={styles.columnLink}>
                    Terms of Service
                  </Link>
                  <Link href={NAV.legal} className={styles.columnLink}>
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
              <Link href={NAV.legal}>Privacy Policy</Link>
              <Link href={NAV.legal}>Terms and Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
