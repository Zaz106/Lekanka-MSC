"use client";
import React, { useState } from "react";
import styles from "./ContactFaqSection.module.css";

const faqs = [
  {
    question: "How long does a typical construction project take?",
    answer:
      "Timelines depend on the scope and complexity of the build. Smaller renovations can be completed in a few weeks, while large commercial or civil projects may run for several months. We provide a detailed schedule during the planning phase and keep you updated at every milestone.",
  },
  {
    question: "What types of projects does LMSC take on?",
    answer:
      "We specialise in commercial construction, industrial development, civil engineering, mining and resource extraction operations, supply chain and procurement support, renovations, and ongoing site maintenance. If you're unsure whether your project fits, get in touch and we'll guide you through the options.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. LMSC is fully licensed, insured, and compliant with all relevant South African construction regulations and safety standards. We can provide documentation on request.",
  },
  {
    question: "Do you handle project management end-to-end?",
    answer:
      "Absolutely. From initial consultation and design coordination through to procurement, construction, and final handover, our team manages every stage of the project so you don't have to.",
  },
  {
    question: "How do you manage project budgets and timelines?",
    answer:
      "We provide transparent, itemised quotes upfront and track spend and progress throughout the build. Regular reporting ensures there are no surprises and that we deliver on time and on budget.",
  },
  {
    question: "Do you offer a warranty on your work?",
    answer:
      "Yes. All workmanship is backed by our quality guarantee, and we stand behind every project we deliver. Specific warranty terms are outlined in your contract before construction begins.",
  },
  {
    question: "Can you work on an existing site or building?",
    answer:
      "Definitely. We regularly work on renovations, refurbishments, and extensions of existing structures. We'll assess the site, plan around any operational constraints, and keep disruption to a minimum.",
  },
];

const ContactFaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className={`container ${styles.section}`}>
    <div className={styles.header}>
      <span className={styles.subtitle}>FAQ</span>
      <h2 className={styles.title}>You Have Questions, We Have Answers</h2>
    </div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${
                activeIndex === index ? styles.faqActive : ""
              }`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <span>{faq.question}</span>
                <span className={styles.faqPlusIcon} aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>
              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
};

export default ContactFaqSection;
