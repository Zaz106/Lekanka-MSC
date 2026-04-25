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
        <h2 className={styles.title}>A Word From Those Who've Experienced Our Story</h2>
      </div>

      <div className={styles.carouselContainer}>
        <div className={styles.row}>
          <div className={styles.track}>
            {[...topRow, ...topRow].map((testimonial, i) => (
              <article key={`top-${i}`} className={styles.card} aria-hidden={i >= topRow.length || undefined}>
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
          <div className={`${styles.track} ${styles.trackReverse}`}>
            {[...bottomRow, ...bottomRow].map((testimonial, i) => (
              <article key={`bottom-${i}`} className={styles.card} aria-hidden={i >= bottomRow.length || undefined}>
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
