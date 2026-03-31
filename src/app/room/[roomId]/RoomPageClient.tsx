"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { RoomView } from "@/components/RoomView";

interface Props {
  paramsPromise: Promise<{ roomId: string }>;
}

export default function RoomPageClient({ paramsPromise }: Props) {
  const { roomId } = use(paramsPromise);
  const searchParams = useSearchParams();
  const router = useRouter();

  const nameFromQuery = searchParams.get("name");

  const [playerName] = useState<string | null>(() => {
    const nameFromStorage = typeof window !== "undefined"
      ? localStorage.getItem("planning-poker-player-name")
      : null;
    return nameFromQuery || nameFromStorage;
  });

  const [savedPlayerId] = useState<string | undefined>(() => {
    if (typeof window === "undefined") return undefined;
    return localStorage.getItem(`planning-poker-player-id:${roomId}`) || undefined;
  });

  useEffect(() => {
    if (!playerName) {
      router.replace(`/?room=${roomId}`);
      return;
    }
    if (nameFromQuery) {
      localStorage.setItem("planning-poker-player-name", nameFromQuery);
    }
  }, [playerName, roomId, nameFromQuery, router]);

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
