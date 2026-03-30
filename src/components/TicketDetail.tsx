"use client";

import type { JiraTicket } from "@/lib/types";
import { useTheme } from "./ThemeContext";

interface Props {
  ticket: JiraTicket | null;
  ticketIdx: number;
  totalTickets: number;
  finalScore?: string;
  onSendToJira?: (score: string) => Promise<void>;
  sendingToJira?: boolean;
}

export function TicketDetail({ ticket, ticketIdx, totalTickets, finalScore, onSendToJira, sendingToJira }: Props) {
  const theme = useTheme();
  if (!ticket) return null;

  const alreadySent = !!ticket.estimatedPoints;

  return (
    <div className={`rounded-2xl p-5 space-y-3 ${theme.panel}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${theme.finalScore}`}>
              {ticket.key}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${theme.panelInner}`}>
              {ticket.status}
            </span>
            {totalTickets > 1 && (
              <span className="text-xs opacity-50">
                {ticketIdx + 1} / {totalTickets}
              </span>
            )}
          </div>
          <h2 className="font-semibold leading-snug">{ticket.summary}</h2>
        </div>

        {ticket.currentPoints != null && (
          <div className="shrink-0 text-center">
            <div className="text-[10px] opacity-50 mb-0.5">Actuel</div>
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center text-sm font-bold ${theme.scoreBtn}`}>
              {ticket.currentPoints}
            </div>
          </div>
        )}
      </div>

      {ticket.description && (
        <p className="text-xs opacity-60 leading-relaxed line-clamp-2 border-t border-current/10 pt-3">
          {ticket.description}
        </p>
      )}

      {ticket.assignee && (
        <p className="text-xs opacity-50 flex items-center gap-1.5">
          <span className={`h-4 w-4 rounded-full flex items-center justify-center text-[9px] ${theme.avatar.other}`}>
            {ticket.assignee[0]}
          </span>
          {ticket.assignee}
        </p>
      )}

      {/* Send to Jira */}
      {finalScore && onSendToJira && (
        <div className={`rounded-xl border border-current/10 overflow-hidden mt-1`}>
          <div className={`flex items-center justify-between px-4 py-3 ${theme.panelInner}`}>
            {/* Score */}
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-lg font-bold ${theme.finalScore}`}>
                {finalScore}
              </div>
              <div>
                <div className="text-xs font-semibold">Score final</div>
                <div className="text-xs opacity-40">
                  {alreadySent ? `Synchronisé · ${ticket.estimatedPoints} pts` : "Prêt à synchroniser"}
                </div>
              </div>
            </div>

            {/* Action */}
            {alreadySent ? (
              <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg ${theme.consensus}`}>
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Envoyé
              </div>
            ) : (
              <button
                onClick={() => !sendingToJira && onSendToJira(finalScore)}
                disabled={sendingToJira}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${theme.accent} ${sendingToJira ? "opacity-60 cursor-wait" : ""}`}
              >
                {sendingToJira ? (
                  <>
                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Envoi…
                  </>
                ) : (
                  <>
                    <span className="font-bold text-[11px] opacity-80">J</span>
                    Envoyer vers Jira
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
