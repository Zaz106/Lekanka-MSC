import styles from "./LegalContent.module.css";

const LegalContent = () => {
  return (
    <section className={styles.section} aria-labelledby="legal-page-title">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Privacy</span>
          <h2 id="legal-page-title" className={styles.title}>
            Privacy Policy and Terms of Service
          </h2>
        </div>

        <p className={styles.lastUpdated}>Last updated: 18 April 2026</p>

        <div className={styles.prose}>
          <div className={styles.sectionBlock}>
            <h3 className={styles.sectionHeading}>1. Introduction</h3>
            <p>
              LMSC Construction (“we”, “us”, or “our”) operates this website to
              share information about our construction, civil, and related
              services. This page explains how we collect, use, and protect
              personal information when you use our site or contact us. By
              using the website, you agree to this policy and to our terms as
              described below.
            </p>
          </div>

          <div className={styles.sectionBlock}>
            <h3 className={styles.sectionHeading}>2. Information We Collect</h3>
            <p>We may collect the following types of information:</p>
            <ul className={styles.list}>
              <li>Full name</li>
              <li>Email address</li>
              <li>Telephone number</li>
              <li>Company name and role (if you provide them)</li>
              <li>Province or project location details you include in enquiries</li>
              <li>
                Technical data such as IP address, browser type, and general
                device information when you browse the site
              </li>
            </ul>
          </div>

          <div className={styles.sectionBlock}>
            <h3 className={styles.sectionHeading}>3. Use of Information</h3>
            <p>We use this information to:</p>
            <ul className={styles.list}>
              <li>Respond to enquiries, quotes, and project-related requests</li>
              <li>Communicate with you about services you have asked about</li>
              <li>Improve our website and understand how visitors use it</li>
              <li>Meet legal, safety, and regulatory obligations where applicable</li>
            </ul>
          </div>

          <div className={styles.sectionBlock}>
            <h3 className={styles.sectionHeading}>4. Sharing of Information</h3>
            <p>
              We do not sell your personal information. We may share information
              only when necessary with:
            </p>
            <ul className={styles.list}>
              <li>
                Professional advisers, insurers, or subcontractors involved in
                delivering a project you have engaged us for
              </li>
              <li>Service providers who host our website or email on our behalf</li>
              <li>Authorities when required by law or a valid legal process</li>
            </ul>
          </div>

          <div className={styles.sectionBlock}>
            <h3 className={styles.sectionHeading}>5. Data Security</h3>
            <p>
              We take reasonable technical and organisational measures to protect
              personal information against unauthorised access, loss, or misuse.
              No method of transmission over the internet is completely secure; we
              encourage you to use secure channels when sending sensitive details.
            </p>
          </div>

          <div className={styles.sectionBlock}>
            <h3 className={styles.sectionHeading}>6. Your Rights</h3>
            <p>
              Depending on applicable law, you may have the right to access,
              correct, or delete certain personal information we hold, or to object
              to or restrict certain processing. To exercise these rights, contact
              us using the details in section 9.
            </p>
          </div>

          <div className={styles.sectionBlock}>
            <h3 className={styles.sectionHeading}>7. Cookies</h3>
            <p>
              Our website may use cookies or similar technologies to support core
              functionality and analytics. You can control cookies through your
              browser settings. Restricting cookies may affect how some parts of
              the site work.
            </p>
          </div>

          <div className={styles.sectionBlock}>
            <h3 className={styles.sectionHeading}>8. Changes to This Policy</h3>
            <p>
              We may update this Privacy Policy and Terms of Service from time to
              time. The “Last updated” date at the top of this page will change
              when we do. Continued use of the site after changes means you accept
              the revised terms.
            </p>
          </div>

          <div className={styles.sectionBlock}>
            <h3 className={styles.sectionHeading}>9. Contact Information</h3>
            <p>
              For questions about this policy, your data, or these terms, contact
              us at:
            </p>
            <ul className={styles.contactList}>
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:hello@lmsc.co.za">
                  hello@lmsc.co.za
                </a>
              </li>
              <li>
                <strong>Phone:</strong>{" "}
                <a href="tel:+27110000000">
                  +27 11 000 0000
                </a>
              </li>
              <li>
                <strong>Address:</strong>{" "}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Johannesburg%2C+South+Africa"
                  target="_blank"
                  rel="noreferrer"
                >
                  Johannesburg, South Africa
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalContent;
