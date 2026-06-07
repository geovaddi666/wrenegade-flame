import Link from 'next/link';
import Image from 'next/image';

export default function EmporiumNav() {
  return (
    <nav className="em-nav">
      <div className="em-nav-inner">
        <Link href="/emporium" className="em-logo-link">
          <Image
            src="/emporium/emporium-mark.png"
            alt="Emporium Alchymia"
            width={60}
            height={60}
            className="em-nav-logo"
            style={{ objectFit: 'contain' }}
            priority
          />
        </Link>
        <Link href="/emporium" className="em-nav-back">
          Home
        </Link>
        <Link href="/emporium/about" className="em-nav-back">
          About
        </Link>
        <Link href="/" className="em-nav-back">
          Wrenegade Flame ↗
        </Link>
      </div>
    </nav>
  );
}
