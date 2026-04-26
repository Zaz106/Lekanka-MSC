"use client";

import { useEffect, useRef } from "react";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    name: "Sipho Maseko",
    text: "LMSC delivered our retail fit-out ahead of schedule and kept communication clear from day one.",
  },
  {
    name: "Aaliyah Naidoo",
    text: "From planning to handover, the workmanship and site coordination were consistently professional.",
  },
  {
    name: "Daniel Khoza",
    text: "Their team handled strict compliance requirements without delays and kept our operations running.",
  },
  {
    name: "Thandi Mokoena",
    text: "The final build quality is excellent, and the snag list was resolved quickly and thoroughly.",
  },
  {
    name: "Jason Petersen",
    text: "Excellent project controls and transparent reporting made budget tracking easy for our board.",
  },
  {
    name: "Mariam Daniels",
    text: "Their safety-first approach on site gave our team confidence throughout the full construction cycle.",
  },
  {
    name: "Lerato Dlamini",
    text: "We appreciated how smoothly they coordinated specialist subcontractors and sequencing on a tight timeline.",
  },
  {
    name: "Andrew Jacobs",
    text: "LMSC transformed our concept into a practical, durable facility that exceeded our expectations.",
  },
];

const Testimonials = () => {
  const topTrackRef = useRef<HTMLDivElement>(null);
  const bottomTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject duplicates client-side so static HTML only contains each testimonial once.
    // The marquee @keyframes uses translateX(-50%), which requires the track to be 2× wide.
    [topTrackRef, bottomTrackRef].forEach((ref) => {
      const track = ref.current;
      if (!track) return;
      const originals = Array.from(track.children);
      originals.forEach((child) => {
        const clone = child.cloneNode(true) as HTMLElement;
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });
      track.classList.add(styles.trackAnimating);
    });
  }, []);

  const topRow = testimonials.slice(0, 4);
  const bottomRow = testimonials.slice(4);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <section className={`container ${styles.section}`}>
      <div className={styles.header}>
        <span className={styles.subtitle}>Testimonials</span>
        <h2 className={styles.title}>A Word From Those Who&apos;ve Experienced Our Story</h2>
      </div>

      <div className={styles.carouselContainer}>
        <div className={styles.row}>
          <div className={styles.track} ref={topTrackRef}>
            {topRow.map((testimonial, i) => (
              <article key={i} className={styles.card}>
                <div className={styles.userInfo}>
                  <span className={styles.avatarPlaceholder}>{getInitials(testimonial.name)}</span>
                  <span className={styles.userName}>{testimonial.name}</span>
                </div>
                <p className={styles.text}>{testimonial.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={`${styles.track} ${styles.trackReverse}`} ref={bottomTrackRef}>
            {bottomRow.map((testimonial, i) => (
              <article key={i} className={styles.card}>
                <div className={styles.userInfo}>
                  <span className={styles.avatarPlaceholder}>{getInitials(testimonial.name)}</span>
                  <span className={styles.userName}>{testimonial.name}</span>
                </div>
                <p className={styles.text}>{testimonial.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
