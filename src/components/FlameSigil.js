// The rising-flame sigil, drawn as a mask so it can be painted in ember gold.
// The outer span carries the glow; the inner span is masked to the sigil's shape.
export default function FlameSigil({ className = '' }) {
  return (
    <span className={`flame-sigil ${className}`} aria-hidden="true">
      <span className="flame-sigil-mark" />
    </span>
  );
}
