'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import FlameSigil from './FlameSigil';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = setInterval(() => {
      const particle = document.createElement('div');
      particle.className = 'fire-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${3 + Math.random() * 2}s`;
      hero.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 5000);
    }, 300);

    return () => {
      clearInterval(interval);
      hero.querySelectorAll('.fire-particle').forEach((p) => p.remove());
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const content = hero.querySelector('.hero-content');
      if (content) {
        content.style.transform = `translateY(${window.scrollY * 0.25}px)`;
        content.style.opacity = `${Math.max(0, 1 - window.scrollY / 600)}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="hero flame-hero" ref={heroRef}>
      <div className="flame-hero-inner">
        <div className="hero-content">
          <FlameSigil className="flame-hero-sigil" />
          <h1 className="hero-title">Fire Performance Portfolio</h1>
          <p className="hero-subtitle">
            Movement meditation with fire &mdash; channelled flow, trance, and flame.
          </p>
          <div className="hero-cta-group">
            <a href="#contact" className="cta-button">
              Book a Performance
            </a>
          </div>
        </div>

        <div className="flame-hero-photo flame-frame">
          <div className="flame-frame-photo">
            <Image
              src="/gallery/PXL_20250704_215213959_exported_77369.jpg"
              alt="Wrenegade crouched low between two flaming swords at a night performance"
              fill
              priority
              sizes="(max-width: 899px) 100vw, 50vw"
              style={{ objectFit: 'cover', objectPosition: '50% 62%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
