"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;

    let disposed = false;
    const play = async () => {
      try {
        await video.play();
        if (!disposed) setSoundOn(!video.muted);
      } catch {
        video.muted = true;
        if (!disposed) setSoundOn(false);
        try {
          await video.play();
        } catch {
          if (!disposed) setSoundOn(false);
        }
      }
    };
    video.muted = false;
    void play();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.35) {
          video.pause();
        } else {
          void play();
        }
      },
      { threshold: [0, 0.35, 0.7, 1] },
    );
    observer.observe(hero);
    return () => {
      disposed = true;
      observer.disconnect();
      video.pause();
    };
  }, []);

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !soundOn;
    video.muted = !next;
    setSoundOn(next);
    if (next) {
      try {
        await video.play();
      } catch {
        video.muted = true;
        setSoundOn(false);
      }
    }
  };

  return (
    <section className="hero" id="top" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> Software Engineer · Hayward, CA</p>
        <h1 id="hero-title">Software <em>Engineer.</em></h1>
        <p className="hero-intro">Tejas Bhosale <span>—</span> Building scalable backend services and responsive web interfaces.</p>
        <div className="hero-actions">
          <a className="button button-dark" href="#work">Explore work <span aria-hidden="true">↘</span></a>
          <a className="button button-line" href="#contact">Let&apos;s talk <span aria-hidden="true">↗</span></a>
          <a className="button button-line" href={PROFILE.resume} download>Résumé <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div className="hero-visual" aria-label="Portrait video of Tejas Bhosale">
        <span className="hero-outline" aria-hidden="true">TEJAS</span>
        <video
          ref={videoRef}
          className="hero-video"
          muted
          loop
          playsInline
          preload="auto"
          poster="/portrait-bust.webp"
          aria-label="Tejas Bhosale introducing himself"
        >
          <source src="/hero/hero.webm" type="video/webm" />
          <source src="/hero/hero.mp4" type="video/mp4" />
        </video>
        <button
          type="button"
          className="sound-button"
          onClick={() => void toggleSound()}
          aria-label={soundOn ? "Mute introduction video" : "Play introduction video with sound"}
          title={soundOn ? "Mute" : "Play with sound"}
        >
          <span aria-hidden="true">{soundOn ? "Ⅱ" : "▶"}</span>
        </button>
      </div>
      <div className="hero-bottom">
        <span>Backend systems · Web applications</span>
        <a href="#about" aria-label="Scroll to about section">Scroll to explore <span aria-hidden="true">↓</span></a>
        <span>01 / 08</span>
      </div>
    </section>
  );
}
