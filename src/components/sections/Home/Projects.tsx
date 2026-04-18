"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV } from "@/constants/navigation";
import styles from "./Projects.module.css";

const offerings = [
  {
    title: "Project 1",
    description:
      "This is a description of Project 1. It is a project that we did for a client. It is a project that we are proud of. It is a project that we are happy to show to the world.",
    image: "/images/Home-Project-Card1.webp",
  },
  {
    title: "Project 2",
    description:
      "This is a description of Project 2. It is a project that we did for a client. It is a project that we are proud of. It is a project that we are happy to show to the world.",
    image: "/images/Home-Project-Card2.webp",
  },
  {
    title: "Project 3",
    description:
      "This is a description of Project 3. It is a project that we did for a client. It is a project that we are proud of. It is a project that we are happy to show to the world.",
    image: "/images/Home-Project-Card3.webp",
  },
];

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={styles.linkIcon}
  >
    <path
      d="M4.5 12H19.5M19.5 12L14 6.5M19.5 12L14 17.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Offerings = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const checkScrollable = () => {
      setIsScrollable(el.scrollWidth > el.clientWidth + 1);
    };

    const handleScroll = () => {
      const cards = el.querySelectorAll<HTMLElement>(`.${styles.card}`);
      if (!cards.length) return;
      const scrollCenter = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardCenter - scrollCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };

    checkScrollable();
    handleScroll();

    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkScrollable);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScrollable);
    };
  }, []);

  const goToCard = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelectorAll<HTMLElement>(`.${styles.card}`)[i];
    if (!card) return;
    el.scrollTo({
      left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.subtitle}>Projects</span>
            <h2 className={styles.title}>
              Take a Look at Our Latest Projects
            </h2>
          </div>
          <Link href={NAV.contact} className={styles.getInTouch} scroll>
            Get In Touch <ArrowIcon />
          </Link>
        </div>

        <div className={styles.scroller} ref={scrollerRef}>
          <div className={styles.cards}>
            {offerings.map((offering, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={offering.image}
                    alt={offering.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className={styles.overlay} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{offering.title}</h3>
                  <p className={styles.cardDescription}>{offering.description}</p>
                  <Link href={NAV.contact} className={styles.readMore} scroll>
                    Explore More <ArrowIcon />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isScrollable && (
          <div className={styles.dots} role="tablist" aria-label="Offering carousel pagination">
            {offerings.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
                onClick={() => goToCard(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === activeIndex}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Offerings;
