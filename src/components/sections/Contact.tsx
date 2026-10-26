"use client";

import { useState } from "react";
import { PROFILE } from "@/lib/data";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopyFailed(false);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopyFailed(true);
      window.setTimeout(() => setCopyFailed(false), 3000);
    }
  };

  return (
    <>
      <section className="section contact-section" id="contact" aria-labelledby="contact-title">
        <div className="section-inner">
          <p className="section-tag">08 — Get in touch</p>
          <div className="contact-heading">
            <h2 id="contact-title">Let&apos;s make<br /><i>something useful.</i></h2>
            <span className="contact-orbit" aria-hidden="true">AVAILABLE TO CONNECT · AVAILABLE TO CONNECT · </span>
          </div>
          <div className="contact-email-row">
            <a className="contact-email" href={PROFILE.emailHref}>{PROFILE.email}</a>
            <button type="button" className="copy-button" onClick={() => void copyEmail()} aria-live="polite">
              {copied ? "Copied ✓" : copyFailed ? "Copy unavailable" : "Copy email"}
            </button>
          </div>
          <div className="contact-meta">
            <a href={PROFILE.phoneHref}>{PROFILE.phone}</a>
            <span>{PROFILE.location}</span>
            <div>{PROFILE.links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>
            ))}</div>
          </div>
        </div>
      </section>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <span>Software Engineer · {PROFILE.location}</span>
        <span>Built with Next.js</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
