"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRoomStore } from "@/store/useRoomStore";
import { connectSocket } from "@/lib/socket";
import { PokerTable, type PaperBallAnim } from "./PokerTable";
import { VotingCards } from "./VotingCards";
import { TicketPanel } from "./TicketPanel";
import { TicketDetail } from "./TicketDetail";
import { ResultsPanel } from "./ResultsPanel";
import { JiraConnector } from "./JiraConnector";
import { Modal } from "./Modal";
import { ToastContainer } from "./Toast";
import type { JiraTicket } from "@/lib/types";

interface Props {
  roomId: string;
  playerName: string;
  savedPlayerId?: string;
}

export function RoomView({ roomId, playerName, savedPlayerId }: Props) {
  const { room, playerId, setRoom, setPlayerId, setPlayerName, addToast, updatePlayerVoted, revealVotes, resetVotes: storeResetVotes, addPlayer } = useRoomStore();
  const socketRef = useRef(connectSocket());
  const [myVote, setMyVote] = useState<string | null>(null);
  const [jiraEnabled, setJiraEnabled] = useState(false);
  const [sendingToJira, setSendingToJira] = useState(false);
  const [jiraModalOpen, setJiraModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [paperBalls, setPaperBalls] = useState<PaperBallAnim[]>([]);
  const paperBallIdRef = useRef(0);


  const socket = socketRef.current;
  const currentPlayerId = playerId || socket.id || "";
  const isHost = room?.host === currentPlayerId;

  useEffect(() => {
    setPlayerName(playerName);
    const pid = savedPlayerId || socket.id || "";
    setPlayerId(pid);

    socket.emit("join-room", { roomId, playerName, playerId: savedPlayerId });

    socket.on("room-state", (r) => setRoom(r));
    socket.on("player-joined", (p) => {
      addPlayer(p);
      addToast(`${p.name} a rejoint la room`, "info");
    });
    socket.on("player-left", ({ name }) => addToast(`${name} s'est déconnecté`, "info"));
    socket.on("vote-received", ({ playerId: pid }) => updatePlayerVoted(pid));
    socket.on("votes-revealed", ({ votes }) => {
      revealVotes(votes);
      addToast("Votes révélés !", "info");
    });
    socket.on("votes-reset", () => { storeResetVotes(); setMyVote(null); });
    socket.on("kicked", () => {
      addToast("Vous avez été exclu de la room", "error");
      setTimeout(() => (window.location.href = "/"), 2000);
    });
    socket.on("error", ({ message }) => addToast(message, "error"));
    socket.on("paper-thrown", ({ fromId, toId }) => spawnPaperBall(fromId, toId));

    return () => {
      socket.off("room-state"); socket.off("player-joined"); socket.off("player-left");
      socket.off("vote-received"); socket.off("votes-revealed"); socket.off("votes-reset");
      socket.off("kicked"); socket.off("error"); socket.off("paper-thrown");
    };
  }, []);

  const getPlayerCenter = useCallback((pid: string) => {
    const el = document.querySelector(`[data-player-id="${pid}"]`);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }, []);

  const spawnPaperBall = useCallback((fromId: string, toId: string) => {
    const from = getPlayerCenter(fromId);
    const to = getPlayerCenter(toId);
    if (!from || !to) return;
    const id = ++paperBallIdRef.current;
    setPaperBalls((prev) => [...prev, { id, from, to }]);
  }, [getPlayerCenter]);

  const handleThrow = useCallback((toId: string) => {
    socket.emit("throw-paper", { roomId, fromId: currentPlayerId, toId });
  }, [roomId, currentPlayerId]);

  const handlePaperBallComplete = useCallback((id: number) => {
    setPaperBalls((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const handleVote = useCallback((value: string) => {
    if (!room) return;
    setMyVote(value);
    socket.emit("vote", { roomId, playerId: currentPlayerId, value });
  }, [room, roomId, currentPlayerId]);

  const handleReveal = () => socket.emit("reveal", { roomId });
  const handleReset = () => { setMyVote(null); socket.emit("reset-votes", { roomId }); };
  const handleNextTicket = () => socket.emit("next-ticket", { roomId });
  const handleSelectTicket = (idx: number) => socket.emit("select-ticket", { roomId, ticketIdx: idx });
  const handleSetFinalScore = (score: string) => socket.emit("set-final-score", { roomId, score });
  const handleKick = (pid: string) => socket.emit("kick-player", { roomId, playerId: pid });

  const handleTicketsLoaded = (tickets: JiraTicket[]) => {
    socket.emit("load-tickets", { roomId, tickets });
    setJiraEnabled(true);
    setJiraModalOpen(false);
    addToast(`${tickets.length} tickets chargés`, "success");
  };

  const handleSendToJira = async (score: string) => {
    if (!room) return;
    const ticket = room.tickets[room.currentTicketIdx];
    if (!ticket) return;
    const numScore = parseFloat(score);
    if (isNaN(numScore)) return;
    setSendingToJira(true);
    try {
      const res = await fetch("/api/jira/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issueKey: ticket.key, points: numScore }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      addToast(`✓ ${ticket.key} mis à jour dans Jira`, "success");
      const updatedTickets = [...room.tickets];
      updatedTickets[room.currentTicketIdx] = { ...ticket, estimatedPoints: score };
      socket.emit("load-tickets", { roomId, tickets: updatedTickets });
      setTimeout(() => socket.emit("next-ticket", { roomId }), 1500);
    } catch (e) {
      addToast(e instanceof Error ? e.message : "Erreur Jira", "error");
    } finally {
      setSendingToJira(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          <p className="text-gray-500 text-sm">Connexion à la room...</p>
        </div>
      </div>
    );
  }

  const currentTicket = room.tickets[room.currentTicketIdx] || null;
  const connectedPlayers = room.players.filter((p) => p.connected);
  const allVoted = connectedPlayers.length > 0 && connectedPlayers.every((p) => p.hasVoted);
  const someVoted = room.players.some((p) => p.hasVoted);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800/80 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-7 w-7" />
              <span className="font-bold text-indigo-400">Planning Poker</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isHost && (
              <button
                onClick={() => setJiraModalOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800/50 hover:border-indigo-500/50 hover:bg-indigo-500/10 px-3 py-1.5 text-sm text-gray-300 hover:text-indigo-300 transition-all"
              >
                <span className="font-bold text-blue-400 text-xs">J</span>
                {room.tickets.length > 0 ? `${room.tickets.length} tickets` : "Charger Jira"}
              </button>
            )}
            <button
              onClick={copyLink}
              title="Copier le lien d'invitation"
              className="group inline-flex items-center gap-2 rounded-lg bg-gray-800/50 hover:bg-gray-700 px-3 py-1.5 transition-colors leading-none"
            >
              {copied ? (
                <span className="text-sm font-medium text-green-400">Lien copié !</span>
              ) : (
                <>
                  <svg className="h-4 w-4 text-gray-400 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span className="text-sm leading-none text-gray-300 group-hover:text-white transition-colors">Inviter</span>
                  <span className="font-mono text-sm leading-none text-gray-500">{roomId}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
          {/* Main */}
          <div className="space-y-6">
            <PokerTable
              room={room}
              currentPlayerId={currentPlayerId}
              onKick={handleKick}
              onThrow={handleThrow}
              paperBalls={paperBalls}
              onPaperBallComplete={handlePaperBallComplete}
            />

            {currentTicket && (
              <TicketDetail
                ticket={currentTicket}
                ticketIdx={room.currentTicketIdx}
                totalTickets={room.tickets.length}
                finalScore={room.finalScore}
                onSendToJira={jiraEnabled ? handleSendToJira : undefined}
                sendingToJira={sendingToJira}
              />
            )}

            {!room.revealed && (
              <VotingCards
                scale={room.scale}
                selectedValue={myVote}
                onVote={handleVote}
                revealed={room.revealed}
              />
            )}

            {room.revealed && (
              <ResultsPanel
                room={room}
                isHost={isHost}
                onSetFinalScore={handleSetFinalScore}
                onResetVotes={handleReset}
                onNextTicket={handleNextTicket}
              />
            )}

            {isHost && !room.revealed && (
              <div className="flex justify-center pb-2">
                <button
                  onClick={handleReveal}
                  disabled={!someVoted}
                  className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                >
                  {allVoted ? "Révéler les votes" : `Forcer la révélation (${room.players.filter((p) => p.hasVoted).length}/${connectedPlayers.length})`}
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <TicketPanel
              tickets={room.tickets}
              currentIdx={room.currentTicketIdx}
              isHost={isHost}
              onSelect={handleSelectTicket}
            />
          </div>
        </div>
      </div>

      {/* Jira Modal */}
      <Modal
        open={jiraModalOpen}
        onClose={() => setJiraModalOpen(false)}
        title="Charger un sprint Jira"
        size="sm"
      >
        <JiraConnector onTicketsLoaded={handleTicketsLoaded} />
      </Modal>

      <ToastContainer />
    </div>
  );
}
