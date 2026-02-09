"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const DESKTOP_PARTICLE_RANGE: [number, number] = [12, 18];
const MOBILE_PARTICLE_RANGE: [number, number] = [0, 10];
const FRAME_INTERVAL = 50;

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const randomIntBetween = (min: number, max: number) =>
  Math.floor(randomBetween(min, max + 1));

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
  const [particleCount, setParticleCount] = useState(0);
  const particleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const particleStates = useRef<ParticleState[]>([]);
  const visibleRef = useRef(true);
  const animationRef = useRef(0);

  const particles = useMemo<ParticleSpec[]>(
    () =>
      Array.from({ length: particleCount }).map((_, index) => ({
        id: index,
        size: randomBetween(2, 4),
        opacity: randomBetween(0.18, 0.38),
      })),
    [particleCount]
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
    const updateCount = () => {
      const width = window.innerWidth;
      const nextCount =
        width < 900
          ? randomIntBetween(...MOBILE_PARTICLE_RANGE)
          : randomIntBetween(...DESKTOP_PARTICLE_RANGE);
      setParticleCount(nextCount);
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
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

    let lastTime = 0;

    const update = (time: number) => {
      if (!visibleRef.current) return;
      if (time - lastTime < FRAME_INTERVAL) {
        animationRef.current = window.requestAnimationFrame(update);
        return;
      }
      lastTime = time;

      const width = window.innerWidth;
      const height = window.innerHeight;

      for (let index = 0; index < particleStates.current.length; index += 1) {
        const particle = particleStates.current[index];
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
      }

      animationRef.current = window.requestAnimationFrame(update);
    };

    const handleVisibility = () => {
      visibleRef.current = !document.hidden;
      if (!visibleRef.current) {
        window.cancelAnimationFrame(animationRef.current);
        return;
      }
      animationRef.current = window.requestAnimationFrame(update);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    animationRef.current = window.requestAnimationFrame(update);
    return () => {
      window.cancelAnimationFrame(animationRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reduceMotion, particles]);

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
