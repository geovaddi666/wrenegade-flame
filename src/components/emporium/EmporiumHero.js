import EmporiumParticles from './EmporiumParticles';

export default function EmporiumHero() {
  return (
    <section className="emporium-hero">
      <EmporiumParticles />
      <div className="emporium-hero-content">
        <p className="emporium-eyebrow">Emporium Alchymia</p>
        <h1 className="emporium-hero-title">Creations of<br />Transmutation</h1>
        <p className="emporium-hero-subtitle">
          Each piece made once. Carrying the trace of its making.
        </p>
        <div className="emporium-hero-divider">
          <span className="emporium-divider-line" />
          <span className="emporium-divider-glyph">✦</span>
          <span className="emporium-divider-line" />
        </div>
        <p className="emporium-hero-body">
          These are not products. They are residue of a process —
          artefacts conjured through craft, intention, and the alchemy of making.
          Take what calls to you.
        </p>
      </div>
    </section>
  );
}
