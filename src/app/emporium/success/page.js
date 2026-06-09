import Link from 'next/link';

export const metadata = {
  title: 'The creation is yours | Emporium Alchymia',
};

export default function SuccessPage() {
  return (
    <div className="emporium-page emporium-success">
      <div className="emporium-container emporium-success-content">
        <p className="emporium-eyebrow">Emporium Alchymia</p>
        <div className="emporium-success-glyph">✦</div>
        <h1 className="emporium-success-title">The creation is yours.</h1>
        <p className="emporium-success-body">
          A confirmation has been sent to your email. Your piece will be
          carefully packaged and dispatched within 3–5 days.
        </p>
        <p className="emporium-success-body">
          Questions or special requests —{' '}
          <a href="mailto:flame@wrenegade.co.uk">flame@wrenegade.co.uk</a>
        </p>
        <Link href="/emporium" className="emporium-success-link">
          Return to the Emporium
        </Link>
      </div>
    </div>
  );
}
