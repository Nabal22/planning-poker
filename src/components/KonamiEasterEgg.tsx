"use client";

import { useEffect, useRef } from "react";
import { FallingCardsOverlay, useFallingCards } from "./FallingCardsOverlay";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function KonamiEasterEgg() {
  const { active, cards, trigger } = useFallingCards();
  const seqRef = useRef<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      seqRef.current = [...seqRef.current, e.key].slice(-KONAMI.length);
      if (seqRef.current.join(",") === KONAMI.join(",")) {
        seqRef.current = [];
        trigger();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [trigger]);

  return <FallingCardsOverlay active={active} cards={cards} />;
}
