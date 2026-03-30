"use client";

import { THEMES, type ThemeId } from "@/lib/themes";

interface Props {
  current: ThemeId;
  onChange: (theme: ThemeId) => void;
}

export function ThemeSelector({ current, onChange }: Props) {
  const themes = Object.values(THEMES);

  return (
    <div className="flex items-center gap-1 rounded-lg bg-black/30 p-1">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          title={t.label}
          className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide transition-all ${
            current === t.id
              ? "bg-white/20 text-white ring-1 ring-white/30"
              : "text-white/40 hover:bg-white/10 hover:text-white/80"
          }`}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}
