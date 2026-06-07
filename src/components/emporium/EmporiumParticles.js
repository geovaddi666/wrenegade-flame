'use client';

import { useEffect, useRef } from 'react';

export default function EmporiumParticles({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame;
    let flames = [];

    const resize = () => {
      const rect = (canvas.parentElement || canvas).getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    window.addEventListener('resize', resize);

    const spawnFlame = () => {
      const x = Math.random() * canvas.width;
      flames.push({
        x,
        y: canvas.height + 10,
        size: Math.random() * 3 + 1,
        speedY: Math.random() * 0.6 + 0.3,
        speedX: (Math.random() - 0.5) * 0.3,
        life: 1,
        decay: Math.random() * 0.004 + 0.002,
        hue: Math.random() * 40 + 260,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.18) spawnFlame();
      flames = flames.filter((f) => f.life > 0);
      flames.forEach((f) => {
        f.y -= f.speedY;
        f.x += f.speedX;
        f.life -= f.decay;
        f.size *= 0.998;
        const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * 6);
        gradient.addColorStop(0, `hsla(${f.hue}, 70%, 80%, ${f.life * 0.9})`);
        gradient.addColorStop(0.4, `hsla(${f.hue - 20}, 60%, 55%, ${f.life * 0.5})`);
        gradient.addColorStop(1, `hsla(${f.hue - 40}, 50%, 30%, 0)`);
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 6, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      animFrame = requestAnimationFrame(draw);
    };

    const startFrame = requestAnimationFrame(() => {
      resize();
      for (let i = 0; i < 30; i++) {
        spawnFlame();
        const f = flames[flames.length - 1];
        f.y = Math.random() * canvas.height;
        f.life = Math.random() * 0.6 + 0.4;
      }
      draw();
    });

    return () => {
      cancelAnimationFrame(startFrame);
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={`emporium-particles ${className}`} />;
}
