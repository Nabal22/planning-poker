"use client";

import { use, useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { RoomView } from "@/components/RoomView";

interface Props {
  paramsPromise: Promise<{ lang: string; roomId: string }>;
  savedName: string | null;
  lang: string;
}

const noopSubscribe = () => () => {};

export default function RoomPageClient({ paramsPromise, savedName, lang }: Props) {
  const { roomId } = use(paramsPromise);
  const router = useRouter();

  const savedPlayerId = useSyncExternalStore(
    noopSubscribe,
    () => localStorage.getItem(`planning-poker-player-id:${roomId}`) || undefined,
    () => undefined
  );

  useEffect(() => {
    if (!savedName) {
      router.replace(`/${lang}/app?room=${roomId}`);
    }
  }, [savedName, roomId, router, lang]);

  if (!savedName) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">
        Redirection...
      </div>
    );
  }

  return (
    <RoomView
      roomId={roomId}
      playerName={savedName}
      savedPlayerId={savedPlayerId}
    />
  );
}
