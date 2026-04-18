"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HOME_SCROLL_SECTION_KEY } from "@/constants/navigation";

type NavSectionLinkProps = {
  href: string;
  sectionId: string;
  className?: string;
  children: React.ReactNode;
  /** e.g. close mobile menu */
  onNavigate?: () => void;
};

/**
 * Hash links to home sections: when already on `/`, scroll in-page; otherwise Next navigates to `href`.
 */
export function NavSectionLink({
  href,
  sectionId,
  className,
  children,
  onNavigate,
}: NavSectionLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") {
      e.preventDefault();
      try {
        sessionStorage.setItem(HOME_SCROLL_SECTION_KEY, sectionId);
      } catch {
        /* private mode */
      }
      router.push("/", { scroll: false });
      // Close mobile menu after navigation is queued (avoids touch/click races with the dropdown)
      queueMicrotask(() => onNavigate?.());
      return;
    }
    onNavigate?.();
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", href);
  };

  return (
    <Link href={href} className={className} onClick={handleClick} scroll={false}>
      {children}
    </Link>
  );
}

type NavHomeTopLinkProps = {
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
};

/** "Home" / logo: on `/` scroll to top; otherwise navigate to `/`. */
export function NavHomeTopLink({ className, children, onNavigate }: NavHomeTopLinkProps) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (pathname !== "/") return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", "/");
  };

  return (
    <Link href="/" className={className} onClick={handleClick} scroll={false}>
      {children}
    </Link>
  );
}
