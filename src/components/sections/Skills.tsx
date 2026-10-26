"use client";

import { useMemo, useState } from "react";
import { SKILL_GROUPS } from "@/lib/data";

const families = SKILL_GROUPS.map((group) => group.name);

function symbol(name: string) {
  const words = name.replace(/[()./]/g, " ").split(/\s+/).filter(Boolean);
  if (words.length > 1) return `${words[0][0]}${words[1][0]}`.toUpperCase();
  return name.replace(/[^a-z0-9]/gi, "").slice(0, 2).toUpperCase();
}

export default function Skills() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(SKILL_GROUPS[0].skills[0]);
  const visibleSkills = useMemo(
    () => SKILL_GROUPS.flatMap((group) => group.skills),
    [],
  );
  const related = selected.projects;

  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-title">
      <div className="section-inner">
        <div className="section-heading section-heading-split">
          <div>
            <p className="section-tag">03 — Tools I work with</p>
            <h2 id="skills-title">A considered <i>toolkit.</i></h2>
          </div>
          <p className="heading-note">Technologies and practices listed in my résumé.</p>
        </div>
        <div className="skill-filters" role="group" aria-label="Filter skills by family">
          {["All", ...families].map((family) => (
            <button
              type="button"
              className={filter === family ? "selected" : ""}
              key={family}
              onClick={() => setFilter(family)}
            >
              {family}
            </button>
          ))}
        </div>
        <div className="skills-layout">
          <div className="skill-grid">
            {visibleSkills.map((skill, index) => (
              <button
                type="button"
                key={skill.name}
                className={`skill-tile ${selected.name === skill.name ? "is-selected" : ""} ${filter !== "All" && filter !== skill.family ? "is-dim" : ""}`}
                style={{ "--tile-index": index } as React.CSSProperties}
                onMouseEnter={() => setSelected(skill)}
                onFocus={() => setSelected(skill)}
                onClick={() => setSelected(skill)}
                aria-pressed={selected.name === skill.name}
              >
                <span className="skill-symbol">{symbol(skill.name)}</span>
                <span className="skill-name">{skill.name}</span>
                <span className="skill-number">{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
          <aside className="skill-inspector" aria-live="polite">
            <p className="mono-label">IN THE TOOLKIT</p>
            <span className="inspector-symbol">{symbol(selected.name)}</span>
            <h3>{selected.name}</h3>
            <p>{selected.family}</p>
            <div className="inspector-rule" />
            <p className="mono-label">PROJECTS</p>
            {related.length ? (
              <ul>{related.map((name) => <li key={name}>{name}</li>)}</ul>
            ) : (
              <p className="inspector-muted">No résumé project association listed.</p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
