"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAV, HOME_SCROLL_SECTION_KEY } from "@/constants/navigation";
import { NavHomeTopLink, NavSectionLink } from "@/components/layout/NavSectionLink";
import styles from "./Header.module.css";

// ─── Home section scroll helper (replaces HomePageHashScroll.tsx) ─────────────

const SCROLL_POLL_MS = 32;
const SCROLL_MAX_MS = 4000;

function scrollToHomeSection(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "auto", block: "start" });
  try { window.history.replaceState(null, "", `#${id}`); } catch { /* ignore */ }
  requestAnimationFrame(() => el.scrollIntoView({ behavior: "auto", block: "start" }));
  return true;
}

// ─── Header ───────────────────────────────────────────────────────────────────

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const isMenuOpenRef = useRef(false);
  const sectionScrollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
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

  // Hash/sessionStorage section scroll on home (replaces HomePageHashScroll)
  useEffect(() => {
    if (!isHome) return;

    const clearTimer = () => {
      if (sectionScrollTimerRef.current !== null) {
        clearInterval(sectionScrollTimerRef.current);
        sectionScrollTimerRef.current = null;
      }
    };
    const finish = () => {
      try { sessionStorage.removeItem(HOME_SCROLL_SECTION_KEY); } catch { /* ignore */ }
      clearTimer();
    };

    let id: string | null = null;
    try {
      const stored = sessionStorage.getItem(HOME_SCROLL_SECTION_KEY);
      if (stored) id = stored;
    } catch { /* private mode */ }

    if (!id) {
      const hash = window.location.hash;
      if (hash && hash.length > 1) id = hash.slice(1);
    }

    if (!id) return;

    if (scrollToHomeSection(id)) {
      finish();
    } else {
      const started = performance.now();
      sectionScrollTimerRef.current = setInterval(() => {
        if (scrollToHomeSection(id!)) { finish(); return; }
        if (performance.now() - started > SCROLL_MAX_MS) {
          try { sessionStorage.removeItem(HOME_SCROLL_SECTION_KEY); } catch { /* ignore */ }
          clearTimer();
        }
      }, SCROLL_POLL_MS);
    }

    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) scrollToHomeSection(hash.slice(1));
    };
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      clearTimer();
    };
  }, [isHome]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${showSolidHeader ? styles.scrolled : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <NavHomeTopLink className={styles.logo}>
            <Image
              src="/images/LMSC - Logo.png"
              alt="LMSC Construction"
              width={150}
              height={50}
              priority
              style={{ objectFit: "contain" }}
            />
          </NavHomeTopLink>
        </div>

        <nav className={styles.nav}>
          <NavHomeTopLink className={styles.navLink}>Home</NavHomeTopLink>
          <NavSectionLink href={NAV.about} sectionId="about" className={styles.navLink}>
            About Us
          </NavSectionLink>
          <NavSectionLink href={NAV.services} sectionId="services" className={styles.navLink}>
            Services
          </NavSectionLink>
          <NavSectionLink href={NAV.projects} sectionId="projects" className={styles.navLink}>
            Projects
          </NavSectionLink>
        </nav>

        <div className={styles.actions}>
          <Link href={NAV.contact} className={styles.contactBtn} scroll>
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
          <NavHomeTopLink className={styles.dropdownLink} onNavigate={toggleMenu}>
            Home
          </NavHomeTopLink>
          <NavSectionLink
            href={NAV.about}
            sectionId="about"
            className={styles.dropdownLink}
            onNavigate={toggleMenu}
          >
            About Us
          </NavSectionLink>
          <NavSectionLink
            href={NAV.services}
            sectionId="services"
            className={styles.dropdownLink}
            onNavigate={toggleMenu}
          >
            Services
          </NavSectionLink>
          <NavSectionLink
            href={NAV.projects}
            sectionId="projects"
            className={styles.dropdownLink}
            onNavigate={toggleMenu}
          >
            Projects
          </NavSectionLink>
          <Link
            href={NAV.contact}
            className={`${styles.dropdownLink} ${styles.dropdownLinkAccent}`}
            onClick={toggleMenu}
            scroll
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
