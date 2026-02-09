"use client";

import { useEffect, useRef, useState } from "react";

const MIN_WIDTH = 640;
const DESKTOP_PARTICLE_RANGE: [number, number] = [12, 18];
const MOBILE_PARTICLE_RANGE: [number, number] = [0, 10];
const MAX_SPEED = 0.32;
const SPARK_INTERVAL_RANGE: [number, number] = [600, 1200];
const FRAME_INTERVAL = 50;
const SHADOW_BLUR = 2;
const CLEAR_FILL_DARK = "rgb(0, 0, 0)";
const CLEAR_FILL_LIGHT = "rgb(255, 255, 255)";

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const randomIntBetween = (min: number, max: number) =>
  Math.floor(randomBetween(min, max + 1));

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
  colorDark: string;
  colorLight: string;
  twinkle: number;
  boostUntil: number;
};

const createParticle = (width: number, height: number): Particle => {
  const baseHue =
    Math.random() > 0.5
      ? randomBetween(185, 210)
      : randomBetween(270, 300);

  return {
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    vx: randomBetween(-0.18, 0.18),
    vy: randomBetween(-0.18, 0.18),
    life: randomBetween(0.2, 1),
    size: randomBetween(1.2, 2.6),
    hue: baseHue,
    colorDark: `hsl(${baseHue}, 90%, 72%)`,
    colorLight: `hsl(${baseHue}, 90%, 60%)`,
    twinkle: randomBetween(0, Math.PI * 2),
    boostUntil: 0,
  };
};

export function SparkleTrailOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const isDarkRef = useRef(false);
  const overlayDimRef = useRef(false);
  const nextSparkRef = useRef(0);
  const visibleRef = useRef(true);
  const lastFrameRef = useRef(0);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateEnabled = () => {
      const shouldDisable = media.matches || window.innerWidth < MIN_WIDTH;
      setEnabled(!shouldDisable);
    };

    updateEnabled();

    if (media.addEventListener) {
      media.addEventListener("change", updateEnabled);
    } else {
      media.addListener(updateEnabled);
    }

    window.addEventListener("resize", updateEnabled);

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", updateEnabled);
      } else {
        media.removeListener(updateEnabled);
      }
      window.removeEventListener("resize", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const updateTheme = () => {
      isDarkRef.current = document.documentElement.classList.contains("dark");
    };

    const updateOverlayDim = () => {
      overlayDimRef.current = document.body.classList.contains("overlay-dim");
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      sizeRef.current = { width, height, dpr };

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);

      const particleCount =
        width < 900
          ? randomIntBetween(...MOBILE_PARTICLE_RANGE)
          : randomIntBetween(...DESKTOP_PARTICLE_RANGE);
      const nextParticles = new Array<Particle>(particleCount);
      for (let i = 0; i < particleCount; i += 1) {
        nextParticles[i] = createParticle(width, height);
      }
      particlesRef.current = nextParticles;
    };

    const startAnimation = () => {
      if (animationRef.current !== null) return;
      animationRef.current = window.requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (animationRef.current === null) return;
      window.cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    };

    const handleVisibility = () => {
      visibleRef.current = !document.hidden;
      if (visibleRef.current) {
        lastFrameRef.current = performance.now();
        startAnimation();
      } else {
        stopAnimation();
      }
    };

    const animate = (time: number) => {
      if (!visibleRef.current) return;
      if (time - lastFrameRef.current < FRAME_INTERVAL) {
        animationRef.current = window.requestAnimationFrame(animate);
        return;
      }
      lastFrameRef.current = time;

      const { width, height } = sizeRef.current;
      if (!width || !height) {
        animationRef.current = window.requestAnimationFrame(animate);
        return;
      }

      if (time > nextSparkRef.current) {
        const sparks = Math.random() > 0.6 ? 2 : 1;
        for (let i = 0; i < sparks; i += 1) {
          const index = Math.floor(Math.random() * particlesRef.current.length);
          const particle = particlesRef.current[index];
          if (particle) {
            particle.boostUntil = time + randomBetween(320, 520);
          }
        }
        nextSparkRef.current =
          time + randomBetween(SPARK_INTERVAL_RANGE[0], SPARK_INTERVAL_RANGE[1]);
      }

      const isDark = isDarkRef.current;
      const overlayAlpha = overlayDimRef.current ? 0.5 : 1;
      const fadeAlpha = isDark ? 0.08 : 0.06;
      const fade = fadeAlpha * overlayAlpha;
      const particleFill = isDark ? CLEAR_FILL_DARK : CLEAR_FILL_LIGHT;

      context.globalCompositeOperation = "source-over";
      context.fillStyle = particleFill;
      context.globalAlpha = fade;
      context.fillRect(0, 0, width, height);

      context.globalCompositeOperation = "lighter";
      context.shadowBlur = SHADOW_BLUR;

      for (let i = 0; i < particlesRef.current.length; i += 1) {
        const particle = particlesRef.current[i];

        particle.twinkle += 0.04;
        particle.life = (particle.life + 0.006) % 1;

        particle.vx += (Math.random() - 0.5) * 0.02;
        particle.vy += (Math.random() - 0.5) * 0.02;

        const speed = Math.hypot(particle.vx, particle.vy);
        if (speed > MAX_SPEED) {
          const scale = MAX_SPEED / speed;
          particle.vx *= scale;
          particle.vy *= scale;
        }

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

        const twinkle = 0.55 + 0.45 * Math.sin(particle.twinkle);
        const boost = time < particle.boostUntil ? 1.4 : 1;
        const alpha = (0.2 + twinkle * 0.4) * overlayAlpha;
        const baseColor = isDark ? particle.colorDark : particle.colorLight;

        context.shadowColor = baseColor;
        context.globalAlpha = alpha;
        context.fillStyle = baseColor;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.size * boost, 0, Math.PI * 2);
        context.fill();

        const streakLength = 6 * boost;
        const streakAlpha = alpha * 0.6;
        context.globalAlpha = streakAlpha;
        context.strokeStyle = baseColor;
        context.lineWidth = 0.6 * boost;
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(
          particle.x - particle.vx * streakLength,
          particle.y - particle.vy * streakLength
        );
        context.stroke();
      }

      context.shadowBlur = 0;
      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
      animationRef.current = window.requestAnimationFrame(animate);
    };

    updateTheme();
    updateOverlayDim();
    resizeCanvas();
    nextSparkRef.current =
      performance.now() + randomBetween(SPARK_INTERVAL_RANGE[0], SPARK_INTERVAL_RANGE[1]);

    const themeObserver = new MutationObserver(updateTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const overlayObserver = new MutationObserver(updateOverlayDim);
    overlayObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("visibilitychange", handleVisibility);

    lastFrameRef.current = performance.now();
    startAnimation();

    return () => {
      stopAnimation();
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibility);
      themeObserver.disconnect();
      overlayObserver.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full overflow-hidden"
      aria-hidden="true"
    />
  );
}
