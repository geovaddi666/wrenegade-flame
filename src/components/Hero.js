'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

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
      const offset = window.scrollY * 0.4;
      hero.style.backgroundPositionY = `${offset}px`;

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
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-content">
        <h1 className="hero-title">Wrenegade Flame</h1>
        <p className="hero-subtitle">
          Movement meditation with fire &mdash; channelled flow, trance, and flame.
        </p>
        <div className="hero-cta-group">
          <a href="#contact" className="cta-button">
            Book a Performance
          </a>
          <Link href="/emporium" className="cta-button">
            Emporium Alchymia
          </Link>
        </div>
      </div>
      <div className="hero-image">
        <Image
          src="/IMG_3832.jpg"
          alt="Fire Performance"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>
    </section>
  );
}
