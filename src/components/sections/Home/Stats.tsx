"use client";

import CountUp from "@/components/ui/CountUp";
import styles from "./Stats.module.css";

const stats = [
  { to: 100, suffix: "+", label: "Projects Completed" },
  { to: 11, suffix: "+", label: "Years Experience" },
  { to: 100, suffix: "%", label: "Client Satisfaction" },
];

const Stats = () => {
  return (
    <section className={`container ${styles.section}`}>
      <div className={styles.grid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.card}>
            <p className={styles.value} aria-label={`${stat.to}${stat.suffix} ${stat.label}`}>
              <CountUp from={0} to={stat.to} duration={2} />
              <span aria-hidden="true">{stat.suffix}</span>
            </p>
            <p className={styles.label}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
