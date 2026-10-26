"use client";

import { useEffect, useRef, useState } from "react";
import { TIMELINE } from "@/lib/data";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      setProgress(Math.min(1, Math.max(0, -rect.top / travel)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="section experience-section" id="experience" aria-labelledby="experience-title" ref={sectionRef}>
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-tag">06 — Experience & education</p>
          <h2 id="experience-title">A path of <i>practice.</i></h2>
        </div>
        <div className="timeline">
          <span className="timeline-rail" aria-hidden="true"><span style={{ transform: `scaleY(${progress})` }} /></span>
          {TIMELINE.map((item, index) => (
            <article className="timeline-item" key={`${item.title}-${item.period}`}>
              <span className="timeline-dot" aria-hidden="true" />
              <p className="timeline-period">{item.period}</p>
              <div className="timeline-main">
                <p className="timeline-type">{item.type === "experience" ? "EXPERIENCE" : "EDUCATION"}</p>
                <h3>{item.title}</h3>
                <p className="timeline-place">{item.place}{item.location ? ` · ${item.location}` : ""}</p>
                {item.details.length > 0 && (
                  <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                )}
              </div>
              <span className="timeline-count">0{index + 1}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
