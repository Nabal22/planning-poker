"use client";

import { SCALES } from "@/lib/types";
import type { Scale } from "@/lib/types";
import { useTheme } from "./ThemeContext";

interface Props {
  scale: Scale;
  selectedValue: string | null;
  onVote: (value: string) => void;
  revealed: boolean;
  disabled?: boolean;
}

export function VotingCards({ scale, selectedValue, onVote, revealed, disabled }: Props) {
  const theme = useTheme();
  const cards = SCALES[scale];
  const canVote = !disabled && !revealed;

  return (
    <div className="space-y-3">
      <p className="text-center text-xs font-medium uppercase tracking-widest text-gray-500">
        Votre estimation
      </p>
      <div className="flex flex-wrap justify-center gap-2.5">
        {cards.map((card) => {
          const isSelected = selectedValue === card;
          return (
            <button
              key={card}
              onClick={() => canVote && onVote(card)}
              disabled={!canVote}
              className={`
                relative h-20 w-14 rounded-xl border-2 text-xl font-bold
                transition-all duration-150 select-none
                ${isSelected
                  ? theme.vote.selected
                  : canVote
                    ? theme.vote.idle
                    : theme.vote.disabled
                }
              `}
            >
              {card}
            </button>
          );
        })}
      </div>
    </div>
  );
}
