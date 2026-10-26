"use client";

import Image from "next/image";
import { useState } from "react";
import { PROFILE } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  const [flipped, setFlipped] = useState(false);
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-tag">02 — A little about me</p>
          <h2 id="about-title">The person behind <i>the work.</i></h2>
        </div>
        <div className="about-grid">
          <Reveal className="about-copy">
            <p className="about-hello">Hi, I&apos;m Tejas.</p>
            <p className="about-lead">
              Designed and developed scalable backend services using Java and Spring Boot.
            </p>
            <p className="body-copy">
              Most recently at Angular Minds, I designed Java and Spring Boot services for high-concurrency production workloads and built modular REST APIs.
            </p>
            <div className="about-links">
              <a className="button button-dark" href={PROFILE.resume} download>Résumé <span aria-hidden="true">↓</span></a>
              {PROFILE.links.slice(0, 2).map((link) => (
                <a className="button button-line" href={link.href} key={link.label} target="_blank" rel="noreferrer">
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal className="id-card-wrap" delay={100}>
            <button
              type="button"
              className={`id-card ${flipped ? "is-flipped" : ""}`}
              onClick={() => setFlipped((value) => !value)}
              aria-label={flipped ? "Show front of profile card" : "Show back of profile card"}
              aria-pressed={flipped}
            >
              <span className="id-card-inner">
                <span className="id-face id-front">
                  <span className="id-header">PROFILE <span>TB</span></span>
                  <span className="portrait-frame"><Image src="/portrait-bust.webp" alt="Portrait of Tejas Bhosale" width={240} height={300} /></span>
                  <span className="id-name">{PROFILE.name}</span>
                  <span className="id-role">{PROFILE.role}</span>
                  <span className="id-bottom"><span>HAYWARD, CA</span><span>2025 — 2027</span></span>
                </span>
                <span className="id-face id-back">
                  <span className="id-back-mark">TB</span>
                  <span className="mono-label">A SHORT PROFILE</span>
                  <span className="id-back-text">Software Engineer<br />M.S. Computer Science<br />California State University East Bay</span>
                  <span className="id-back-note">Tap or press to return</span>
                </span>
              </span>
            </button>
            <span className="card-hint">A small introduction, both sides ↗</span>
          </Reveal>
          <Reveal className="quick-facts" delay={180}>
            <p className="mono-label">QUICK FACTS</p>
            <dl>
              <div><dt>Based in</dt><dd>{PROFILE.location}</dd></div>
              <div><dt>Currently</dt><dd>M.S. Computer Science</dd></div>
              <div><dt>School</dt><dd>California State University East Bay</dd></div>
              <div><dt>Email</dt><dd><a href={PROFILE.emailHref}>{PROFILE.email}</a></dd></div>
            </dl>
            <blockquote>“Designed and developed scalable backend services using Java and Spring Boot.”</blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
