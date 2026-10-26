"use client";

import { useEffect, useState } from "react";

export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const [node, setNode] = useState<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!node || isInView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isInView, node, threshold]);

  return { ref: setNode, isInView };
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}
