"use client";

import { use, useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { RoomView } from "@/components/RoomView";

interface Props {
  paramsPromise: Promise<{ roomId: string }>;
}

const noopSubscribe = () => () => {};

export default function RoomPageClient({ paramsPromise }: Props) {
  const { roomId } = use(paramsPromise);
  const router = useRouter();

  const playerName = useSyncExternalStore(
    noopSubscribe,
    () => localStorage.getItem("planning-poker-player-name"),
    () => null
  );

  const savedPlayerId = useSyncExternalStore(
    noopSubscribe,
    () => localStorage.getItem(`planning-poker-player-id:${roomId}`) || undefined,
    () => undefined
  );

  useEffect(() => {
    if (!playerName) {
      router.replace(`/?room=${roomId}`);
    }
  }, [playerName, roomId, router]);

  if (!playerName) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">
        Redirection...
      </div>
    );
  }

  return (
    <RoomView
      roomId={roomId}
      playerName={playerName}
      savedPlayerId={savedPlayerId}
    />
  );
}
