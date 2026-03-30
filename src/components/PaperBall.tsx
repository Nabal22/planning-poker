"use client";

import { useEffect, useState } from "react";

interface Props {
  from: { x: number; y: number };
  to: { x: number; y: number };
  onComplete: () => void;
}

const DURATION = 600; // ms

export function PaperBall({ from, to, onComplete }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf: number;
    const animate = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      setProgress(t);
      if (t < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  // Parabolic arc
  const x = from.x + (to.x - from.x) * progress;
  const arc = -180 * (progress * (1 - progress)); // peak at midpoint
  const y = from.y + (to.y - from.y) * progress + arc;
  const rotation = progress * 720; // spin
  const scale = 0.6 + 0.4 * Math.sin(progress * Math.PI); // grow then shrink

  return (
    <div
      className="pointer-events-none fixed z-50"
      style={{
        left: x,
        top: y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
      }}
    >
      <img src="/paper-ball.png" alt="" className="h-8 w-8 drop-shadow-lg" draggable={false} />
    </div>
  );
}
