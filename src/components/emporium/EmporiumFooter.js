/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function EmporiumFooter() {
  return (
    <footer className="em-footer">
      <div className="em-container">
        <img
          src="/emporium/sigil-rising-flame.png"
          alt=""
          aria-hidden="true"
          className="em-footer-sigil"
        />
        <div className="em-footer-mark">Emporium Alchymia</div>
        <p>
          Objects of fire and leather, made by hand. Enquiries to{' '}
          <a href="mailto:flame@wrenegade.co.uk">flame@wrenegade.co.uk</a>
        </p>
        <p className="em-footer-legal">
          <Link href="/emporium/privacy">Privacy Policy</Link>
          <Link href="/emporium/terms">Terms &amp; Conditions</Link>
        </p>
      </div>
    </footer>
  );
}
