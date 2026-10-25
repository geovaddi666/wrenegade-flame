'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function EmporiumNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const pathname = usePathname() || '';

  // Which section we're in, so its link can glow.
  const section = pathname.startsWith('/emporium/about')
    ? 'about'
    : pathname.startsWith('/emporium/archive')
    ? 'archive'
    : 'emporium';
  const linkClass = (name) =>
    section === name ? 'em-nav-back em-nav-active' : 'em-nav-back';

  return (
    <nav className="em-nav">
      <div className="em-nav-inner">
        <Link href="/emporium" className="em-logo-link" onClick={close}>
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

        <button
          className="em-nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={isOpen ? 'em-hamburger em-hamburger-open' : 'em-hamburger'}>
            <span className="em-hamburger-bar"></span>
            <span className="em-hamburger-bar"></span>
            <span className="em-hamburger-bar"></span>
          </span>
        </button>

        <div className={isOpen ? 'em-nav-links em-nav-links-open' : 'em-nav-links'}>
          <Link href="/emporium" className={linkClass('emporium')} onClick={close}>
            Emporium
          </Link>
          {/* About is hidden from the nav for now; the page still exists at /emporium/about.
              To bring it back, uncomment this link.
          <Link href="/emporium/about" className={linkClass('about')} onClick={close}>
            About
          </Link>
          */}
          <Link href="/emporium/archive" className={linkClass('archive')} onClick={close}>
            Archive
          </Link>
          <Link
            href="/"
            className="nav-portal-link"
            aria-label="Return to the portal"
            title="Return to the portal"
            onClick={close}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/portal/portal-icon.webp" alt="" width={44} height={44} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
