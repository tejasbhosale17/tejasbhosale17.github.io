import { CERTIFICATIONS } from "@/lib/data";

export default function Certifications() {
  return (
    <section className="section certification-section" id="certifications" aria-labelledby="certifications-title">
      <div className="section-inner certification-layout">
        <div className="certification-intro">
          <p className="section-tag">05 — Learning</p>
          <h2 id="certifications-title">Always <i>learning.</i></h2>
          <p>{String(CERTIFICATIONS.length).padStart(2, "0")} certification{CERTIFICATIONS.length === 1 ? "" : "s"} listed</p>
        </div>
        <ol className="certification-list">
          {CERTIFICATIONS.map((certification, index) => (
            <li key={certification.title} tabIndex={0}>
              <span className="cert-number">0{index + 1}</span>
              <span className="cert-name">{certification.title}<small>{certification.issuer} · {certification.date}</small></span>
              <span className="cert-arrow" aria-hidden="true">↗</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
