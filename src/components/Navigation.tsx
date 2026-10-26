"use client";

import { useEffect, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);
      if (scrollY < 80) setActive("");
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = NAV.map(({ href }) => document.querySelector(href)).filter(
      (section): section is Element => section !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" style={{ transform: `scaleX(${progress / 100})` }} />
      <header className={`nav-wrap ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label={`${PROFILE.name}, back to top`}>
          <span className="brand-mark">{PROFILE.initials}</span>
          <span className="brand-name">{PROFILE.name}</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV.map((item) => (
            <a key={item.href} className={active === item.href.slice(1) ? "active" : ""} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
          <span aria-hidden="true" className="menu-glyph">{menuOpen ? "×" : "+"}</span>
        </button>
      </header>
      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {NAV.map((item, index) => (
            <a
              href={item.href}
              key={item.href}
              tabIndex={menuOpen ? 0 : -1}
              style={{ "--item-index": index } as React.CSSProperties}
              onClick={() => setMenuOpen(false)}
            >
              <span>0{index + 1}</span>{item.label}<span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <p>{PROFILE.location}</p>
      </div>
    </>
  );
}
