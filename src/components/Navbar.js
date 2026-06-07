'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (!isHomePage) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const scrollPos = window.scrollY + window.innerHeight / 3;
      let current = NAV_LINKS[0].id;
      for (const link of NAV_LINKS) {
        const section = document.getElementById(link.id);
        if (section && section.offsetTop <= scrollPos) {
          current = link.id;
        }
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleLinkClick = (e, id) => {
    if (isHomePage) {
      e.preventDefault();
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  // Emporium has its own shell (EmporiumNav); hide the shared navbar there.
  if (pathname.startsWith('/emporium')) {
    return null;
  }

  return (
    <nav className={scrolled ? 'navbar navbar-scrolled' : 'navbar'}>
      <div className="navbar-container">
        <a
          href={isHomePage ? '#home' : '/'}
          className="navbar-logo"
          onClick={(e) => isHomePage && handleLinkClick(e, 'home')}
        >
          Wrenegade Flame
        </a>

        <button
          className="navbar-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={isOpen ? 'hamburger hamburger-open' : 'hamburger'}>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </span>
        </button>

        <ul className={isOpen ? 'navbar-links navbar-links-open' : 'navbar-links'}>
          {NAV_LINKS.map((link) => (
            <li key={link.id} className="navbar-item">
              {isHomePage ? (
                <a
                  href={`#${link.id}`}
                  className={
                    activeSection === link.id
                      ? 'navbar-link navbar-link-active'
                      : 'navbar-link'
                  }
                  onClick={(e) => handleLinkClick(e, link.id)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={`/#${link.id}`}
                  className="navbar-link"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
          <li className="navbar-item">
            <Link
              href="/emporium"
              className={
                pathname.startsWith('/emporium')
                  ? 'navbar-link navbar-emporium-link navbar-emporium-active'
                  : 'navbar-link navbar-emporium-link'
              }
              onClick={() => setIsOpen(false)}
            >
              Emporium
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
