/* eslint-disable @next/next/no-img-element */

export default function EmporiumHero() {
  return (
    <section className="emporium-hero">
      <div className="emporium-hero-content">
        <img
          src="/emporium/sigil-emporium.png"
          alt=""
          aria-hidden="true"
          className="emporium-hero-sigil"
        />
        <h1 className="emporium-hero-title">Artifacts of<br />Fire &amp; Magic</h1>
        <p className="emporium-hero-subtitle">
          Each piece unique. Never to be made again.
        </p>
        <div className="emporium-hero-divider">
          <span className="emporium-divider-line" />
          <span className="emporium-divider-glyph">✦</span>
          <span className="emporium-divider-line" />
        </div>
      </div>
    </section>
  );
}
