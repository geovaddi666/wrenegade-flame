'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Portal.module.css';

// The three thresholds. `speed` is degrees per second, `dir` the spin direction.
const DOORS = [
  { key: 'emporium', name: 'Emporium', href: '/emporium', img: '/portal/emporium.webp',
    alt: 'Emporium: a violet and gold spiral', speed: 4.6, dir: -1 },
  { key: 'fire', name: 'Flame', href: '/flame', img: '/portal/fire.webp',
    alt: 'Flame: a fire and ice vortex', speed: 6.2, dir: 1 },
  { key: 'flow', name: 'Flow', href: '/flow', img: '/portal/flow.webp',
    alt: 'Flow: a water and fire yin-yang', speed: 5.4, dir: 1 },
];

// Ambient embers. Placed with a fixed seed so the server and browser render the
// same markup; CSS hides the last few on narrow screens.
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const EMBERS = (() => {
  const rand = seeded(20261019);
  return Array.from({ length: 11 }, (_, i) => ({
    id: i,
    size: 2 + rand() * 4,
    left: 6 + rand() * 88,
    bottom: -6 + rand() * 12,
    duration: 9 + rand() * 10,
    delay: -rand() * 14,
  }));
})();

export default function Portal() {
  const router = useRouter();
  const spinRefs = useRef([]);
  const spinners = useRef([]);
  const [entering, setEntering] = useState(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    reducedRef.current = reduced;

    spinners.current = DOORS.map((d) => {
      const base = d.speed * d.dir;
      return { angle: Math.random() * 360, base, speed: base, target: base };
    });

    if (reduced) {
      spinners.current.forEach((s, i) => {
        const el = spinRefs.current[i];
        if (el) el.style.transform = `rotate(${s.angle}deg)`;
      });
      return;
    }

    let frameId;
    let last = performance.now();
    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      spinners.current.forEach((s, i) => {
        s.speed += (s.target - s.speed) * Math.min(dt * 3.2, 1); // ease toward target
        s.angle = (s.angle + s.speed * dt) % 360;
        const el = spinRefs.current[i];
        if (el) el.style.transform = `rotate(${s.angle}deg)`;
      });
      frameId = requestAnimationFrame(frame);
    };
    frameId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Approaching a door quickens its spin; leaving lets it settle.
  const quicken = (i) => {
    const s = spinners.current[i];
    if (s) s.target = s.base * 5.5;
  };
  const settle = (i) => {
    const s = spinners.current[i];
    if (s) s.target = s.base;
  };

  // Bloom toward the viewer, then pass through.
  const enter = (e, door) => {
    if (reducedRef.current || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    if (entering) return;
    setEntering(door.key);
    setTimeout(() => router.push(door.href), 650);
  };

  const enteringDoor = DOORS.find((d) => d.key === entering);

  return (
    <main className={`${styles.stage} ${entering ? styles.leaving : ''}`}>
      {DOORS.map((door, i) => (
        <Link
          key={door.key}
          href={door.href}
          className={`${styles.door} ${styles[door.key]} ${entering === door.key ? styles.entering : ''}`}
          aria-label={`Enter ${door.name}`}
          onPointerEnter={() => quicken(i)}
          onPointerLeave={() => settle(i)}
          onFocus={() => quicken(i)}
          onBlur={() => settle(i)}
          onClick={(e) => enter(e, door)}
        >
          <span className={styles.aura} />
          <span className={styles.spin} ref={(el) => (spinRefs.current[i] = el)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={door.img} alt={door.alt} width={760} height={760} />
          </span>
          <span className={styles.label}>{door.name}</span>
        </Link>
      ))}

      <div className={styles.welcome}>
        <h1 className={styles.welcomeTitle}>Welcome to the portal</h1>
        <p className={styles.hint}>
          {enteringDoor ? (
            <>entering <b>{enteringDoor.name}</b></>
          ) : (
            <>three thresholds &mdash; <b>Flame</b> &middot; <b>Flow</b> &middot; <b>Emporium</b></>
          )}
        </p>
      </div>

      {EMBERS.map((m) => (
        <span
          key={m.id}
          className={styles.ember}
          style={{
            width: `${m.size}px`,
            height: `${m.size}px`,
            left: `${m.left}%`,
            bottom: `${m.bottom}%`,
            animationDuration: `${m.duration}s`,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}
    </main>
  );
}
