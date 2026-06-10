import EmporiumParticles from './EmporiumParticles';

export default function EmporiumHero() {
  return (
    <section className="emporium-hero">
      <EmporiumParticles />
      <div className="emporium-hero-content">
        <p className="emporium-eyebrow">Emporium Alchymia</p>
        <h1 className="emporium-hero-title">Artifacts of<br />Transmutation</h1>
        <p className="emporium-hero-subtitle">
          Each piece unique. Never to be made again.
        </p>
        <div className="emporium-hero-divider">
          <span className="emporium-divider-line" />
          <span className="emporium-divider-glyph">✦</span>
          <span className="emporium-divider-line" />
        </div>
        <p className="emporium-hero-body">
          These are not just objects. They are products of alchemy.
          Proof of transmutation.
        </p>
      </div>
    </section>
  );
}
