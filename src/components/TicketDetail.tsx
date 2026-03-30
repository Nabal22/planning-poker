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
        <div className="pt-1">
          <button
            onClick={() => !alreadySent && !sendingToJira && onSendToJira(finalScore)}
            disabled={alreadySent || sendingToJira}
            className={`w-full rounded-xl py-2.5 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              alreadySent
                ? theme.consensus
                : sendingToJira
                  ? `${theme.accent} opacity-60 cursor-wait`
                  : theme.accent
            }`}
          >
            {alreadySent ? (
              <>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Envoyé dans Jira ({ticket.estimatedPoints} pts)
              </>
            ) : sendingToJira ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Envoi en cours...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Envoyer {finalScore} pts → Jira
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
