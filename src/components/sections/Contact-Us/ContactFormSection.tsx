"use client";

import React, { useState, useEffect, useRef } from "react";
import "./ContactFormSection.css";
import Link from "next/link";

// ─── Config ──────────────────────────────────────────────────────────────────
// External Resend API — hosted on Vercel, called from the static site.
// Verify the deployment URL at: https://vercel.com/zaz106s-projects/lekanka-msc-post-api-endpoint
const API_URL = "https://lekanka-msc-post-api-endpoint.vercel.app/api/send-email";

// Minimum milliseconds between form submissions (client-side guard).
const RATE_LIMIT_MS = 60_000;
// Minimum time (ms) a real user takes to complete the form — bots are faster.
const BOT_FILL_MS = 2_000;

// ─── Types ───────────────────────────────────────────────────────────────────
type PopupState = "success" | "error" | "rate-limited" | null;

// ─── Popup Modal ─────────────────────────────────────────────────────────────
const SubmitPopup = ({
  state,
  onClose,
}: {
  state: PopupState;
  onClose: () => void;
}) => {
  if (!state) return null;

  const isSuccess = state === "success";
  const isRateLimited = state === "rate-limited";

  const iconPath = isSuccess
    ? "M5 13l4 4L19 7"
    : isRateLimited
      ? "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      : "M6 18L18 6M6 6l12 12";

  const modalClass = isSuccess
    ? "popup-success"
    : isRateLimited
      ? "popup-rate-limited"
      : "popup-error";

  const title = isSuccess
    ? "Message Sent!"
    : isRateLimited
      ? "Too Many Attempts"
      : "Something Went Wrong";

  const message = isSuccess
    ? "Thank you for contacting LMSC Construction. Our team will respond as soon as possible."
    : isRateLimited
      ? "You've submitted several enquiries in a short time. Please wait a few minutes and try again."
      : "We couldn't send your message. Please try again or email us at hello@lmsc.co.za";

  const btnLabel = isSuccess ? "Great, thanks!" : "Close";

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className={`popup-modal ${modalClass}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
      >
        <div className="popup-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
          </svg>
        </div>
        <h3 id="popup-title" className="popup-title">
          {title}
        </h3>
        <p className="popup-message">{message}</p>
        <button className="popup-close-btn" onClick={onClose}>
          {btnLabel}
        </button>
      </div>
    </div>
  );
};

// ─── Contact Form ─────────────────────────────────────────────────────────────
const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    province: "",
    phone: "",
    email: "",
    enquiryType: "",
    message: "",
  });

  // Uncontrolled ref for honeypot — bots set DOM values directly without
  // triggering React's synthetic onChange, so a controlled input would always
  // read "" even when a bot has filled it. Using a ref we read the real DOM value.
  const honeypotRef = useRef<HTMLInputElement>(null);

  const [loadTimestamp, setLoadTimestamp] = useState<number>(0);

  useEffect(() => {
    setLoadTimestamp(Date.now());
  }, []);

  // Scroll handling (replaces ContactPageScroll.tsx): reset to top on load,
  // or jump to #faq if the URL hash requests it.
  useEffect(() => {
    const apply = () => {
      if (window.location.hash === "#faq") {
        document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };
    apply();
    const t = window.setTimeout(apply, 0);
    window.addEventListener("hashchange", apply);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", apply);
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState<PopupState>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnquiryType = (type: string) => {
    setFormData({ ...formData, enquiryType: type });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPopup(null);

    // ── Honeypot check ─────────────────────────────────────────────────────
    // Bots fill every visible field. Real users never touch this hidden input.
    if (honeypotRef.current?.value) {
      // Silently "succeed" — don't tell bots they were caught.
      setPopup("success");
      return;
    }

    // ── Bot-speed check ────────────────────────────────────────────────────
    // A real person can't read and fill the form in under 2 seconds.
    if (loadTimestamp > 0 && Date.now() - loadTimestamp < BOT_FILL_MS) {
      setPopup("success");
      return;
    }

    // ── Client-side rate limit ─────────────────────────────────────────────
    const lastSent = Number(localStorage.getItem("lmsc_last_sent") ?? 0);
    if (Date.now() - lastSent < RATE_LIMIT_MS) {
      setPopup("rate-limited");
      return;
    }

    // ── Client-side email validation ───────────────────────────────────────
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(formData.email)) {
      setPopup("error");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName:    formData.firstName,
          lastName:     formData.lastName,
          email:        formData.email,
          phone:        formData.phone,
          province:     formData.province,
          enquiryType:  formData.enquiryType || "General Enquiry",
          message:      formData.message,
          _honeypot:    "",
        }),
      });

      if (res.ok) {
        localStorage.setItem("lmsc_last_sent", String(Date.now()));
        setPopup("success");
        setFormData({
          firstName: "",
          lastName: "",
          province: "",
          phone: "",
          email: "",
          enquiryType: "",
          message: "",
        });
      } else {
        setPopup("error");
      }
    } catch {
      // Never expose raw error details to the user.
      setPopup("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ─── Popup ─── */}
      <SubmitPopup state={popup} onClose={() => setPopup(null)} />

      <section className="contact-form-section">
        <div className="contact-form-container">
          <div className="contact-info">
            <h2>
              You Have Questions,
              <br />
              We Have Answers
            </h2>
            <p className="contact-info-text">
              Whether you found us through our projects, services, or about
              pages, this is the best place to reach LMSC Construction. Tell us
              about your build, timeline, and location—we will point you to the
              right team.
            </p>

            <div className="contact-details">
              <div className="contact-column">
                <h3>Get in Touch</h3>
                <a
                  className="location"
                  href="https://www.google.com/maps/search/?api=1&query=Johannesburg%2C+South+Africa"
                  target="_blank"
                  rel="noreferrer"
                >
                  Johannesburg, South Africa
                </a>
                <a className="phone" href="tel:+27110000000">
                  +27 11 000 0000
                </a>
                <a
                  className="email"
                  href="mailto:hello@lmsc.co.za"
                >
                  hello@lmsc.co.za
                </a>

                <div className="contact-social-links">
                  <Link
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </Link>
                  <Link
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </Link>
                  <Link
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                  </Link>
                </div>
              </div>

              <div className="contact-column">
                <h3>Across This Site</h3>
                <p>Construction &amp; operations</p>
                <p>Mining &amp; resource extraction</p>
                <p>Safety, environmental &amp; regulatory</p>
                <p>Commercial &amp; civil projects</p>
                <p>Project planning &amp; handover</p>
                <p>Ongoing site support</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form">
              <h3>Tell Us What You Need</h3>
              <p className="form-subtitle">
                LMSC delivers comprehensive construction solutions with the
                same focus on quality, safety, and durability you see throughout
                our site—share the details below and we will follow up.
              </p>

              <div className="form-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  maxLength={60}
                  disabled={isLoading}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  maxLength={60}
                  disabled={isLoading}
                />
              </div>

              <div className="form-row">
                <input
                  type="text"
                  name="province"
                  placeholder="Province"
                  value={formData.province}
                  onChange={handleChange}
                  required
                  maxLength={80}
                  disabled={isLoading}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  maxLength={30}
                  disabled={isLoading}
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="full-width"
                maxLength={254}
                disabled={isLoading}
              />

              <div className="enquiry-type">
                <label>Type of Inquiry</label>
                <div className="enquiry-buttons">
                  {["General", "Quote request", "Site visit", "Other"].map(
                    (type) => (
                      <button
                        key={type}
                        type="button"
                        className={formData.enquiryType === type ? "active" : ""}
                        onClick={() => handleEnquiryType(type)}
                        disabled={isLoading}
                      >
                        {type}
                      </button>
                    ))}
                </div>
              </div>

              <div className="message-field-wrapper">
                <textarea
                  name="message"
                  placeholder="Describe your project, site location, and how we can help…"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  maxLength={2000}
                  disabled={isLoading}
                />
                <p className="char-counter">{formData.message.length} / 2000</p>
              </div>

              {/* Honeypot — positioned off-screen so it's invisible to humans but
                  reachable by bots. Uncontrolled so bots that set DOM values
                  directly (without firing React events) are still detected. */}
              <div
                style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
                aria-hidden="true"
              >
                <input
                  ref={honeypotRef}
                  type="text"
                  name="_honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading || !formData.enquiryType}
              >
                {isLoading ? "Sending…" : "Submit enquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactFormSection;
