import { ACHIEVEMENTS } from "@/lib/data";

export default function Achievements() {
  return (
    <section className="section achievements-section" id="achievements" aria-labelledby="achievements-title">
      <div className="section-inner">
        <div className="section-heading section-heading-split">
          <div>
            <p className="section-tag">07 — Recognition</p>
            <h2 id="achievements-title">A note in <i>print.</i></h2>
          </div>
          <p className="heading-note">A publication listed in my résumé.</p>
        </div>
        <div className="achievement-card">
          <div className="achievement-top"><span className="achievement-mark" aria-hidden="true">P.</span><span>01 / 01</span></div>
          {ACHIEVEMENTS.map((item) => (
            <article key={item.title}>
              <div>
                <p className="mono-label">{item.caption}</p>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
              <span className="achievement-glyph" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
