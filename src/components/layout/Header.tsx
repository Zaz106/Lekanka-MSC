"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

// ─── Header ───────────────────────────────────────────────────────────────────

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const isMenuOpenRef = useRef(false);
  isMenuOpenRef.current = isMenuOpen;

  const showSolidHeader = !isHome || isScrolled || isMenuOpen;

  // Scroll + click-outside handling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (isMenuOpenRef.current) setIsMenuOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pathname]);



  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${showSolidHeader ? styles.scrolled : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/images/LMSC - Logo.png"
              alt="LMSC Construction"
              width={150}
              height={50}
              priority
              style={{ objectFit: "contain" }}
            />
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/#about" className={styles.navLink}>
            About Us
          </Link>
          <Link href="/#services" className={styles.navLink}>
            Services
          </Link>
          <Link href="/#projects" className={styles.navLink}>
            Projects
          </Link>
        </nav>

        <div className={styles.actions}>
          <Link href="/Contact-Us" className={styles.contactBtn}>
            Contact Us
          </Link>
          <button
            className={`${styles.burgerBtn} ${isMenuOpen ? styles.menuOpen : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>
        </div>
      </div>

      <div className={`${styles.dropdown} ${isMenuOpen ? styles.dropdownOpen : ""}`}>
        <nav className={styles.dropdownNav}>
          <Link href="/" className={styles.dropdownLink} onClick={toggleMenu}>
            Home
          </Link>
          <Link
            href="/#about"
            className={styles.dropdownLink}
            onClick={toggleMenu}
          >
            About Us
          </Link>
          <Link
            href="/#services"
            className={styles.dropdownLink}
            onClick={toggleMenu}
          >
            Services
          </Link>
          <Link
            href="/#projects"
            className={styles.dropdownLink}
            onClick={toggleMenu}
          >
            Projects
          </Link>
          <Link
            href="/Contact-Us"
            className={`${styles.dropdownLink} ${styles.dropdownLinkAccent}`}
            onClick={toggleMenu}
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
