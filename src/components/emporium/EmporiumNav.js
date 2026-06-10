'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function EmporiumNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

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
          <Link href="/emporium" className="em-nav-back" onClick={close}>
            Home
          </Link>
          <Link href="/emporium/about" className="em-nav-back" onClick={close}>
            About
          </Link>
          <Link href="/emporium/archive" className="em-nav-back" onClick={close}>
            Archive
          </Link>
          <Link href="/" className="em-nav-back" onClick={close}>
            Wrenegade Flame ↗
          </Link>
        </div>
      </div>
    </nav>
  );
}
