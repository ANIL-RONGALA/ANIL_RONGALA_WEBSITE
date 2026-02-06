"use client";

import { usePerf } from "@/app/providers";
import { AmbientOverlay } from "@/components/AmbientOverlay";
import { SparkleTrailOverlay } from "@/components/SparkleTrailOverlay";

export function EffectsOverlays() {
  const { effectsEnabled } = usePerf();

  if (!effectsEnabled) return null;

  return (
    <>
      <AmbientOverlay />
      <SparkleTrailOverlay />
    </>
  );
}

