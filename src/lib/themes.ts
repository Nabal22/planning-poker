export type ThemeId = "openclimat" | "casino" | "retro" | "xp" | "doom" | "matrix";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  label: string;
  page: string;
  header: string;
  headerBorder: string;
  headerText: string;
  headerBtn: string;
  table: {
    felt: string;
    text: string;
    textRevealed: string;
    progressOn: string;
    progressOff: string;
  };
  card: {
    notVoted: string;
    voted: string;
    revealed: string;
  };
  avatar: {
    self: string;
    other: string;
  };
  vote: {
    selected: string;
    idle: string;
    disabled: string;
  };
  accent: string;
  accentDisabled: string;
  panel: string;
  panelInner: string;
  scoreBtn: string;
  scoreBtnHover: string;
  distribution: string;
  finalScore: string;
  consensus: string;
  secondaryBtn: string;
  font: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  openclimat: {
    id: "openclimat",
    name: "OC",
    label: "OpenClimat",
    page: "bg-[#eef2f7] text-[#1a2b4a]",
    header: "bg-[#1a2b4a] shadow-md",
    headerBorder: "border-[#152340]",
    headerText: "text-white",
    headerBtn: "bg-white/10 text-white/90 hover:bg-white/20 hover:text-white border border-white/10",
    table: {
      felt: "bg-white border-2 border-[#1a2b4a]/15 shadow-[0_4px_20px_rgba(26,43,74,0.08)]",
      text: "text-[#6b7a94]",
      textRevealed: "text-[#1a2b4a]",
      progressOn: "bg-[#3b82f6]",
      progressOff: "bg-[#e2e8f0]",
    },
    card: {
      notVoted: "border-[#cbd5e1] bg-[#f8fafc] text-[#94a3b8]",
      voted: "border-[#3b82f6] bg-[#eff6ff] text-[#3b82f6]",
      revealed: "border-[#1a2b4a] bg-[#1a2b4a] text-white shadow-md shadow-[#1a2b4a]/20",
    },
    avatar: {
      self: "bg-[#3b82f6] text-white ring-[#93bbfd]",
      other: "bg-[#e2e8f0] text-[#475569] ring-[#cbd5e1]",
    },
    vote: {
      selected: "border-[#3b82f6] bg-[#3b82f6] text-white -translate-y-2 shadow-lg shadow-[#3b82f6]/25",
      idle: "border-[#cbd5e1] bg-white text-[#334155] hover:border-[#3b82f6]/50 hover:bg-[#f0f6ff] hover:-translate-y-1 hover:shadow-md cursor-pointer",
      disabled: "border-[#e2e8f0] bg-[#f8fafc] text-[#c0c6d0] cursor-not-allowed",
    },
    accent: "bg-[#3b82f6] text-white hover:bg-[#2563eb] shadow-md shadow-[#3b82f6]/20",
    accentDisabled: "opacity-40 cursor-not-allowed",
    panel: "bg-white border border-[#e2e8f0] shadow-sm",
    panelInner: "bg-[#f8fafc]",
    scoreBtn: "border border-[#cbd5e1] bg-white text-[#334155] hover:border-[#3b82f6] hover:bg-[#eff6ff] hover:text-[#3b82f6]",
    scoreBtnHover: "hover:-translate-y-0.5",
    distribution: "bg-[#3b82f6]",
    finalScore: "bg-[#eff6ff] border border-[#3b82f6]/30 text-[#1a2b4a]",
    consensus: "bg-[#f0fdf4] border border-[#22c55e]/30 text-[#16a34a]",
    secondaryBtn: "border border-[#cbd5e1] bg-white text-[#475569] hover:bg-[#f1f5f9]",
    font: "",
  },
  casino: {
    id: "casino",
    name: "Casino",
    label: "Casino Classique",
    page: "bg-[#1a0f0a] text-[#f5e6d0]",
    header: "bg-gradient-to-r from-[#2a1408] to-[#3a1a0a] backdrop-blur-sm",
    headerBorder: "border-[#6b3a1a]",
    headerText: "text-[#ffd700]",
    headerBtn: "bg-[#3a2010]/80 text-[#d4b896] hover:bg-[#4a2a15] hover:text-[#ffd700] border border-[#5a3015]",
    table: {
      felt: "bg-gradient-to-b from-[#1a5c2a] to-[#0e3d1a] border-[6px] border-[#5a3015] shadow-[inset_0_0_40px_rgba(0,0,0,0.4),0_0_20px_rgba(90,48,21,0.5)]",
      text: "text-[#88cc88]",
      textRevealed: "text-[#ffd700]",
      progressOn: "bg-[#ffd700]",
      progressOff: "bg-[#0e3d1a]",
    },
    card: {
      notVoted: "border-[#5a3015] bg-[#2a1408] text-[#8a6a4a]",
      voted: "border-[#ffd700] bg-[#3a2a10] text-[#ffd700]",
      revealed: "border-[#cc1122] bg-[#cc1122] text-white shadow-[0_0_15px_rgba(204,17,34,0.4)]",
    },
    avatar: {
      self: "bg-[#cc1122] text-white ring-[#ff3344]",
      other: "bg-[#3a2010] text-[#d4b896] ring-[#5a3015]",
    },
    vote: {
      selected: "border-[#ffd700] bg-[#3a2a10] text-[#ffd700] -translate-y-2 shadow-[0_0_20px_rgba(255,215,0,0.3)]",
      idle: "border-[#5a3015] bg-[#2a1408] text-[#d4b896] hover:border-[#ffd700]/60 hover:bg-[#3a2010] hover:-translate-y-1 hover:shadow-lg cursor-pointer",
      disabled: "border-[#3a2010] bg-[#1a0f0a] text-[#6a4a2a] cursor-not-allowed",
    },
    accent: "bg-[#cc1122] text-white hover:bg-[#aa0e1c] shadow-[0_0_15px_rgba(204,17,34,0.3)]",
    accentDisabled: "opacity-40 cursor-not-allowed",
    panel: "bg-[#2a1408]/80 border border-[#5a3015]",
    panelInner: "bg-[#1a0f0a]/80",
    scoreBtn: "border border-[#5a3015] bg-[#2a1408] text-[#d4b896] hover:border-[#ffd700] hover:bg-[#3a2a10]",
    scoreBtnHover: "hover:-translate-y-0.5 hover:shadow-[0_0_8px_rgba(255,215,0,0.2)]",
    distribution: "bg-[#cc1122]",
    finalScore: "bg-[#3a2a10]/50 border border-[#ffd700]/50",
    consensus: "bg-[#1a3a1a]/50 border border-[#44aa44]/50 text-[#66dd66]",
    secondaryBtn: "border border-[#5a3015] bg-[#2a1408] text-[#d4b896] hover:bg-[#3a2010]",
    font: "",
  },
  retro: {
    id: "retro",
    name: "Retro",
    label: "Retro 8-bit",
    page: "bg-[#0f0a1e] text-[#e0d0ff]",
    header: "bg-[#1a1030]/90 backdrop-blur-sm",
    headerBorder: "border-[#4d3a8e]",
    headerText: "text-[#ff44ff]",
    headerBtn: "bg-[#2a1a4e]/80 text-[#d0c0ff] hover:bg-[#3a2a6e] hover:text-[#ff44ff] border border-[#4d3a8e]",
    table: {
      felt: "bg-[#1a0a3e] border-4 border-[#ff44ff] shadow-[0_0_30px_rgba(255,0,255,0.3),inset_0_0_30px_rgba(0,255,255,0.1)]",
      text: "text-[#44ffff]",
      textRevealed: "text-[#ff66ff]",
      progressOn: "bg-[#44ff44]",
      progressOff: "bg-[#2a1a4e]",
    },
    card: {
      notVoted: "border-[#4d3a8e] bg-[#1a1030] text-[#7a6aae]",
      voted: "border-[#44ff44] bg-[#003300] text-[#44ff44]",
      revealed: "border-[#ff44ff] bg-[#5a1060] text-white shadow-[0_0_15px_rgba(255,0,255,0.5)]",
    },
    avatar: {
      self: "bg-[#ff44ff] text-white ring-[#ff88ff]",
      other: "bg-[#2a1a4e] text-[#d0c0ff] ring-[#4d3a8e]",
    },
    vote: {
      selected: "border-[#44ffff] bg-[#004a4a] text-[#44ffff] -translate-y-2 shadow-[0_0_20px_rgba(0,255,255,0.4)]",
      idle: "border-[#4d3a8e] bg-[#1a1030] text-[#d0c0ff] hover:border-[#44ffff] hover:bg-[#1a2040] hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(0,255,255,0.2)] cursor-pointer",
      disabled: "border-[#2a1a3e] bg-[#0f0a1e] text-[#4d3a8e] cursor-not-allowed",
    },
    accent: "bg-[#ff44ff] text-white hover:bg-[#dd22dd] shadow-[0_0_20px_rgba(255,0,255,0.3)]",
    accentDisabled: "opacity-40 cursor-not-allowed",
    panel: "bg-[#1a1030]/80 border border-[#4d3a8e]",
    panelInner: "bg-[#0f0a1e]/80",
    scoreBtn: "border border-[#4d3a8e] bg-[#1a1030] text-[#d0c0ff] hover:border-[#ff44ff] hover:bg-[#2a1040]",
    scoreBtnHover: "hover:-translate-y-0.5 hover:shadow-[0_0_10px_rgba(255,0,255,0.3)]",
    distribution: "bg-[#ff44ff]",
    finalScore: "bg-[#2a0040]/50 border border-[#ff44ff]/50",
    consensus: "bg-[#003300]/50 border border-[#44ff44]/50 text-[#44ff44]",
    secondaryBtn: "border border-[#4d3a8e] bg-[#1a1030] text-[#d0c0ff] hover:bg-[#2a1a4e]",
    font: "font-[family-name:var(--font-pixel)]",
  },
  xp: {
    id: "xp",
    name: "XP",
    label: "Windows XP",
    page: "bg-[#3a6ea5] text-[#000]",
    header: "bg-gradient-to-r from-[#0054e3] to-[#2889e9]",
    headerBorder: "border-[#0040a0]",
    headerText: "text-white",
    headerBtn: "bg-white/20 text-white hover:bg-white/30 border border-white/20",
    table: {
      felt: "bg-gradient-to-b from-[#ece9d8] to-[#d6d2c2] border-4 border-[#0054e3] shadow-[2px_2px_0_#0040a0] rounded-lg",
      text: "text-[#003399]",
      textRevealed: "text-[#006600]",
      progressOn: "bg-[#008800]",
      progressOff: "bg-[#c8c4b4]",
    },
    card: {
      notVoted: "border-[#9e9a8a] bg-[#ece9d8] text-[#888]",
      voted: "border-[#008800] bg-[#d8f0d8] text-[#006600]",
      revealed: "border-[#0054e3] bg-[#0054e3] text-white shadow-[2px_2px_0_#003399]",
    },
    avatar: {
      self: "bg-[#0054e3] text-white ring-[#2889e9]",
      other: "bg-[#d6d2c2] text-[#333] ring-[#9e9a8a]",
    },
    vote: {
      selected: "border-[#0054e3] bg-[#0054e3] text-white -translate-y-2 shadow-[2px_2px_0_#003399]",
      idle: "border-[#9e9a8a] bg-[#ece9d8] text-[#333] hover:border-[#0054e3] hover:bg-[#c8dcff] hover:-translate-y-1 cursor-pointer",
      disabled: "border-[#c8c4b4] bg-[#dddad0] text-[#aaa] cursor-not-allowed",
    },
    accent: "bg-[#0054e3] text-white hover:bg-[#0040a0] shadow-[2px_2px_0_#003399]",
    accentDisabled: "opacity-50 cursor-not-allowed",
    panel: "bg-[#ece9d8] border-2 border-[#9e9a8a] shadow-[2px_2px_0_#888]",
    panelInner: "bg-white/70",
    scoreBtn: "border border-[#9e9a8a] bg-[#ece9d8] text-[#333] hover:border-[#0054e3] hover:bg-[#c8dcff]",
    scoreBtnHover: "hover:-translate-y-0.5",
    distribution: "bg-[#008800]",
    finalScore: "bg-[#c8dcff] border-2 border-[#0054e3] text-[#003399]",
    consensus: "bg-[#d8f0d8] border-2 border-[#008800] text-[#006600]",
    secondaryBtn: "border border-[#9e9a8a] bg-[#ece9d8] text-[#333] hover:bg-[#d6d2c2]",
    font: "font-[family-name:var(--font-xp)]",
  },
  doom: {
    id: "doom",
    name: "DOOM",
    label: "DOOM",
    page: "bg-[#1a0000] text-[#ff6644]",
    header: "bg-[#2a0000]/95 backdrop-blur-sm",
    headerBorder: "border-[#880000]",
    headerText: "text-[#ffdd00]",
    headerBtn: "bg-[#440000]/80 text-[#dd8866] hover:bg-[#550000] hover:text-[#ffdd00] border border-[#880000]",
    table: {
      felt: "bg-gradient-to-b from-[#3a0000] to-[#1a0000] border-4 border-[#aa0000] shadow-[0_0_40px_rgba(255,0,0,0.2),inset_0_0_20px_rgba(255,0,0,0.1)]",
      text: "text-[#ee5533]",
      textRevealed: "text-[#ffaa00]",
      progressOn: "bg-[#ff5544]",
      progressOff: "bg-[#440000]",
    },
    card: {
      notVoted: "border-[#660000] bg-[#2a0000] text-[#884444]",
      voted: "border-[#ff5544] bg-[#440000] text-[#ff5544]",
      revealed: "border-[#ffaa00] bg-[#993300] text-[#ffdd00] shadow-[0_0_15px_rgba(255,100,0,0.5)]",
    },
    avatar: {
      self: "bg-[#dd0000] text-[#ffdd00] ring-[#ff5544]",
      other: "bg-[#440000] text-[#dd8866] ring-[#880000]",
    },
    vote: {
      selected: "border-[#ffaa00] bg-[#993300] text-[#ffdd00] -translate-y-2 shadow-[0_0_20px_rgba(255,100,0,0.4)]",
      idle: "border-[#880000] bg-[#2a0000] text-[#dd8866] hover:border-[#ff5544] hover:bg-[#440000] hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(255,0,0,0.3)] cursor-pointer",
      disabled: "border-[#550000] bg-[#1a0000] text-[#664444] cursor-not-allowed",
    },
    accent: "bg-[#dd0000] text-[#ffdd00] hover:bg-[#bb0000] shadow-[0_0_20px_rgba(255,0,0,0.3)]",
    accentDisabled: "opacity-40 cursor-not-allowed",
    panel: "bg-[#2a0000]/80 border border-[#880000]",
    panelInner: "bg-[#1a0000]/80",
    scoreBtn: "border border-[#880000] bg-[#2a0000] text-[#dd8866] hover:border-[#ff5544] hover:bg-[#440000]",
    scoreBtnHover: "hover:-translate-y-0.5 hover:shadow-[0_0_10px_rgba(255,0,0,0.3)]",
    distribution: "bg-[#dd0000]",
    finalScore: "bg-[#440000]/50 border border-[#ffaa00]/50",
    consensus: "bg-[#442200]/50 border border-[#ffaa00]/50 text-[#ffdd00]",
    secondaryBtn: "border border-[#880000] bg-[#2a0000] text-[#dd8866] hover:bg-[#440000]",
    font: "font-[family-name:var(--font-doom)]",
  },
  matrix: {
    id: "matrix",
    name: "Matrix",
    label: "Matrix",
    page: "bg-black text-[#33ff66]",
    header: "bg-[#0a0a0a]/95 backdrop-blur-sm",
    headerBorder: "border-[#0a3a0a]",
    headerText: "text-[#33ff66]",
    headerBtn: "bg-[#0a1a0a]/80 text-[#33ff66]/80 hover:bg-[#0a2a0a] hover:text-[#33ff66] border border-[#0a3a0a]",
    table: {
      felt: "bg-[#080808] border-4 border-[#33ff66]/30 shadow-[0_0_30px_rgba(0,255,65,0.1),inset_0_0_30px_rgba(0,255,65,0.05)]",
      text: "text-[#33ff66]/80",
      textRevealed: "text-[#33ff66]",
      progressOn: "bg-[#33ff66]",
      progressOff: "bg-[#0a1a0a]",
    },
    card: {
      notVoted: "border-[#0a3a0a] bg-[#080808] text-[#1a5a1a]",
      voted: "border-[#33ff66]/60 bg-[#0a2a0a] text-[#33ff66]",
      revealed: "border-[#33ff66] bg-[#0a3a0a] text-[#33ff66] shadow-[0_0_15px_rgba(0,255,65,0.4)]",
    },
    avatar: {
      self: "bg-[#33ff66] text-black ring-[#33ff66]/60",
      other: "bg-[#0a1a0a] text-[#33ff66]/80 ring-[#0a3a0a]",
    },
    vote: {
      selected: "border-[#33ff66] bg-[#0a3a0a] text-[#33ff66] -translate-y-2 shadow-[0_0_20px_rgba(0,255,65,0.3)]",
      idle: "border-[#0a3a0a] bg-[#080808] text-[#33ff66]/80 hover:border-[#33ff66]/50 hover:bg-[#0a2a0a] hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(0,255,65,0.2)] cursor-pointer",
      disabled: "border-[#0a2a0a] bg-[#050505] text-[#0a3a0a] cursor-not-allowed",
    },
    accent: "bg-[#33ff66] text-black font-bold hover:bg-[#22dd55] shadow-[0_0_20px_rgba(0,255,65,0.2)]",
    accentDisabled: "opacity-40 cursor-not-allowed",
    panel: "bg-[#080808]/90 border border-[#0a3a0a]",
    panelInner: "bg-black/80",
    scoreBtn: "border border-[#0a3a0a] bg-[#080808] text-[#33ff66]/80 hover:border-[#33ff66]/50 hover:bg-[#0a2a0a]",
    scoreBtnHover: "hover:-translate-y-0.5 hover:shadow-[0_0_10px_rgba(0,255,65,0.2)]",
    distribution: "bg-[#33ff66]",
    finalScore: "bg-[#0a2a0a]/50 border border-[#33ff66]/40",
    consensus: "bg-[#0a2a0a]/50 border border-[#33ff66]/60 text-[#33ff66]",
    secondaryBtn: "border border-[#0a3a0a] bg-[#080808] text-[#33ff66]/80 hover:bg-[#0a2a0a]",
    font: "font-[family-name:var(--font-matrix)]",
  },
};
