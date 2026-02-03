"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const PARTICLE_COUNT = 16;
const FRAME_INTERVAL = 50;

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

type ParticleSpec = {
  id: number;
  size: number;
  opacity: number;
};

type ParticleState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function AmbientOverlay() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const particleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const particleStates = useRef<ParticleState[]>([]);

  const particles = useMemo<ParticleSpec[]>(
    () =>
      Array.from({ length: PARTICLE_COUNT }).map((_, index) => ({
        id: index,
        size: randomBetween(2, 4),
        opacity: randomBetween(0.18, 0.38),
      })),
    []
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    particleStates.current = particles.map(() => ({
      x: randomBetween(0, window.innerWidth),
      y: randomBetween(0, window.innerHeight),
      vx: randomBetween(-0.18, 0.18),
      vy: randomBetween(-0.18, 0.18),
    }));

    particleStates.current.forEach((particle, index) => {
      const element = particleRefs.current[index];
      if (element) {
        element.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0)`;
      }
    });
  }, [particles]);

  useEffect(() => {
    if (reduceMotion) return undefined;

    let animationFrame = 0;
    let lastTime = 0;

    const update = (time: number) => {
      animationFrame = window.requestAnimationFrame(update);
      if (time - lastTime < FRAME_INTERVAL) return;
      lastTime = time;

      const width = window.innerWidth;
      const height = window.innerHeight;

      particleStates.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(width, particle.x));
        }

        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(height, particle.y));
        }

        const element = particleRefs.current[index];
        if (element) {
          element.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0)`;
        }
      });
    };

    animationFrame = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [reduceMotion]);

  return (
    <div
      className="ambient-overlay pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
      aria-hidden="true"
    >
      <div className="ambient-aurora">
        <span className="ambient-blob ambient-blob-one" />
        <span className="ambient-blob ambient-blob-two" />
        <span className="ambient-blob ambient-blob-three" />
      </div>

      <div className="ambient-scanner" />

      {!reduceMotion && (
        <div className="ambient-particles">
          {particles.map((particle, index) => (
            <span
              key={particle.id}
              ref={(element) => {
                particleRefs.current[index] = element;
              }}
              className="ambient-particle"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
