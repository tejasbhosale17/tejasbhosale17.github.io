"use client";

import { useState } from "react";
import { PROJECTS } from "@/lib/data";

export default function Work() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section work-section" id="work" aria-labelledby="work-title">
      <div className="section-inner">
        <div className="section-heading section-heading-split">
          <div>
            <p className="section-tag">04 — Selected work</p>
            <h2 id="work-title">Things I&apos;ve <i>built.</i></h2>
          </div>
          <p className="heading-note">Project descriptions and details from my résumé.</p>
        </div>
        <div className="project-list">
          {PROJECTS.map((project, index) => (
            <article className={`project-panel ${open === index ? "is-open" : ""}`} key={project.id}>
              <button
                type="button"
                className="project-trigger"
                aria-expanded={open === index}
                onClick={() => setOpen((current) => current === index ? -1 : index)}
              >
                <span className="project-index">0{index + 1}</span>
                <span className="project-trigger-title">{project.title}</span>
                <span className="project-date">{project.date}</span>
                <span className="project-toggle" aria-hidden="true">{open === index ? "−" : "+"}</span>
              </button>
              <div className="project-content" hidden={open !== index}>
                <div className="project-description">
                  <p>{project.description}</p>
                  <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                  <div className="tech-chips">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
                  {project.href && (
                    <a className="project-link" href={project.href} target="_blank" rel="noreferrer">
                      View on GitHub <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
                <div className={`illustration illustration-${project.id}`} aria-label={`Illustrative interface concept for ${project.title}`}>
                  <div className="illustration-window">
                    <div className="window-top"><span /><span /><span /><i>ILLUSTRATIVE UI</i></div>
                    <div className="window-content">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <div className="mock-row" key={tech}>
                          <span className="mock-index">0{techIndex + 1}</span>
                          <span className={`mock-bar mock-bar-${techIndex + 1}`} />
                          <span className="mock-pill" />
                        </div>
                      ))}
                      <div className="mock-footer"><span>REQUEST</span><span>STATUS&nbsp; · &nbsp;READY</span></div>
                    </div>
                  </div>
                  <span className="illustration-caption">Illustrative UI · not a product screenshot</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
