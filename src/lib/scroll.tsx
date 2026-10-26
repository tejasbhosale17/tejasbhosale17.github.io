"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "./hooks";

export function ScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
