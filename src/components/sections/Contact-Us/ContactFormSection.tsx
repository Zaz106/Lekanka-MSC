"use client";

import React, { useState, useEffect } from "react";
import "./ContactFormSection.css";
import Link from "next/link";
import { CONTACT_DETAILS } from "@/constants/navigation";

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
    hp_field: "", // Honeypot field
  });

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
    setIsLoading(true);
    setPopup(null);

    try {
      const res = await fetch("/api/send-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, loadTimestamp }),
      });

      if (res.ok) {
        setPopup("success");
        setFormData({
          firstName: "",
          lastName: "",
          province: "",
          phone: "",
          email: "",
          enquiryType: "",
          message: "",
          hp_field: "",
        });
      } else if (res.status === 429) {
        setPopup("rate-limited");
      } else {
        setPopup("error");
      }
    } catch {
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
                  href={CONTACT_DETAILS.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Johannesburg, South Africa
                </a>
                <a className="phone" href={`tel:${CONTACT_DETAILS.phoneTel}`}>
                  {CONTACT_DETAILS.phoneDisplay}
                </a>
                <a
                  className="email"
                  href={`mailto:${CONTACT_DETAILS.email}`}
                >
                  {CONTACT_DETAILS.email}
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

              {/* Honeypot field - hidden from users */}
              <div style={{ display: "none" }} aria-hidden="true">
                <input
                  type="text"
                  name="hp_field"
                  value={formData.hp_field}
                  onChange={handleChange}
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
