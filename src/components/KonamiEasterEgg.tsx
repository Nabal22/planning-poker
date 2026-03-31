"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const CARDS = ["A♠", "K♥", "Q♦", "J♣", "10♠", "9♥", "8♦", "7♣", "5♠", "3♥", "2♦", "A♣", "K♠", "Q♥", "J♦"];

interface FallingCard {
  id: number;
  card: string;
  x: number;
  delay: number;
  duration: number;
  rotation: number;
  size: number;
}

export function KonamiEasterEgg() {
  const [active, setActive] = useState(false);
  const [cards, setCards] = useState<FallingCard[]>([]);
  const seqRef = useRef<string[]>([]);
  const idRef = useRef(0);

  const trigger = useCallback(() => {
    setActive(true);
    const newCards: FallingCard[] = [];
    for (let i = 0; i < 40; i++) {
      newCards.push({
        id: ++idRef.current,
        card: CARDS[Math.floor(Math.random() * CARDS.length)],
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 3,
        rotation: -180 + Math.random() * 360,
        size: 0.7 + Math.random() * 0.6,
      });
    }
    setCards(newCards);
    setTimeout(() => { setActive(false); setCards([]); }, 6000);
  }, []);

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

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {cards.map((c) => (
        <div
          key={c.id}
          className="absolute -top-16 animate-[konamiFall_linear_forwards]"
          style={{
            left: `${c.x}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
          }}
        >
          <div
            className="bg-white text-black rounded-lg border-2 border-gray-300 shadow-lg flex items-center justify-center font-bold select-none"
            style={{
              width: `${3 * c.size}rem`,
              height: `${4.2 * c.size}rem`,
              fontSize: `${1.1 * c.size}rem`,
              transform: `rotate(${c.rotation}deg)`,
              color: c.card.includes("♥") || c.card.includes("♦") ? "#cc1122" : "#1a1a1a",
            }}
          >
            {c.card}
          </div>
        </div>
      ))}

      <style>{`
        @keyframes konamiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        .animate-\\[konamiFall_linear_forwards\\] {
          animation-name: konamiFall;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
}
