"use client";

import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import type React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Texture ─────────────────────────────────────────────────────────────────

function makeFaceTexture(label: string): THREE.CanvasTexture {
  const S = 512;
  const el = document.createElement("canvas");
  el.width = S; el.height = S;
  const ctx = el.getContext("2d")!;

  const g = ctx.createRadialGradient(S * 0.37, S * 0.37, 10, S / 2, S / 2, S / 2 - 4);
  g.addColorStop(0, "#ffe880");
  g.addColorStop(0.4, "#d4a020");
  g.addColorStop(1, "#6a3c04");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, S / 2 - 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(120, 70, 4, 0.45)";
  ctx.lineWidth = 7;
  ctx.beginPath(); ctx.arc(S / 2, S / 2, S / 2 - 26, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(S / 2, S / 2, S / 2 - 46, 0, Math.PI * 2); ctx.stroke();

  ctx.font = "bold 118px Arial, Helvetica, sans-serif";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(40, 15, 0, 0.25)";
  ctx.fillText(label, S / 2 + 2, S / 2 + 3);
  ctx.fillStyle = "#3a1800";
  ctx.fillText(label, S / 2, S / 2);

  const tex = new THREE.CanvasTexture(el);
  tex.anisotropy = 4;
  return tex;
}

// ─── Draggable group: handles rotate + inertia + throw detection ──────────────

function DraggableGroup({
  children,
  onFlip,
  isFlipping,
  onCursorChange,
}: {
  children: React.ReactNode;
  onFlip: () => void;
  isFlipping: React.MutableRefObject<boolean>;
  onCursorChange: (cursor: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { gl } = useThree();
  const onFlipRef = useRef(onFlip);
  useEffect(() => { onFlipRef.current = onFlip; });
  const onCursorChangeRef = useRef(onCursorChange);
  useEffect(() => { onCursorChangeRef.current = onCursorChange; });

  const drag = useRef({
    active: false,
    lastX: 0, lastY: 0,
    lastDx: 0, lastDy: 0,
    totalMoved: 0,
    angVelX: 0, angVelY: 0,
  });

  useEffect(() => {
    const el = gl.domElement;

    const onDown = (e: PointerEvent) => {
      drag.current = {
        ...drag.current,
        active: true,
        lastX: e.clientX, lastY: e.clientY,
        lastDx: 0, lastDy: 0,
        totalMoved: 0,
        angVelX: 0, angVelY: 0,
      };
      onCursorChangeRef.current("grabbing");
      el.setPointerCapture(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.lastX;
      const dy = e.clientY - drag.current.lastY;
      drag.current.lastDx = dx;
      drag.current.lastDy = dy;
      drag.current.totalMoved += Math.hypot(dx, dy);
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;
      if (groupRef.current) {
        groupRef.current.rotation.x += dy * 0.009;
        groupRef.current.rotation.y += dx * 0.009;
      }
    };

    const onUp = () => {
      if (!drag.current.active) return;
      drag.current.active = false;
      onCursorChangeRef.current("grab");

      const speed = Math.hypot(drag.current.lastDx, drag.current.lastDy);
      const isClick = drag.current.totalMoved < 6;

      if ((isClick || speed > 9) && !isFlipping.current) {
        onFlipRef.current();
        drag.current.angVelX = 0;
        drag.current.angVelY = 0;
      } else {
        // Carry drag velocity into inertia
        drag.current.angVelX = drag.current.lastDy * 0.009;
        drag.current.angVelY = drag.current.lastDx * 0.009;
      }
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [gl, isFlipping]);

  useFrame(({ clock }) => {
    if (!groupRef.current || drag.current.active) return;

    // Apply inertia with damping
    groupRef.current.rotation.x += drag.current.angVelX;
    groupRef.current.rotation.y += drag.current.angVelY;
    drag.current.angVelX *= 0.89;
    drag.current.angVelY *= 0.89;
    if (Math.abs(drag.current.angVelX) < 0.0003) drag.current.angVelX = 0;
    if (Math.abs(drag.current.angVelY) < 0.0003) drag.current.angVelY = 0;

    // Idle micro-wobble when fully at rest
    const isResting = drag.current.angVelX === 0 && drag.current.angVelY === 0;
    if (isResting) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y += Math.sin(t * 0.55) * 0.0004;
      groupRef.current.rotation.x += Math.sin(t * 0.4 + 1) * 0.0003;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

// ─── Coin mesh: flip animation on x-axis only ─────────────────────────────────

function Coin({
  targetAngle,
  onComplete,
}: {
  targetAngle: number;
  onComplete: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const anim = useRef({ from: 0, to: 0, t0: -1, dur: 2.1, running: false, done: true });
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; });

  useEffect(() => {
    if (targetAngle !== anim.current.to) {
      anim.current = { from: anim.current.to, to: targetAngle, t0: -1, dur: 2.1, running: true, done: false };
    }
  }, [targetAngle]);

  const mats = useMemo(() => {
    const side = new THREE.MeshStandardMaterial({ color: "#a06c08", metalness: 0.98, roughness: 0.08 });
    const pile = new THREE.MeshStandardMaterial({ map: makeFaceTexture("PILE"), metalness: 0.72, roughness: 0.28 });
    const face = new THREE.MeshStandardMaterial({ map: makeFaceTexture("FACE"), metalness: 0.72, roughness: 0.28 });
    return [side, pile, face] as const;
  }, []);

  useEffect(() => () => {
    mats.forEach((m) => {
      if (m instanceof THREE.MeshStandardMaterial && m.map) m.map.dispose();
      m.dispose();
    });
  }, [mats]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const a = anim.current;
    if (a.running) {
      if (a.t0 < 0) a.t0 = clock.getElapsedTime();
      const raw = Math.min((clock.getElapsedTime() - a.t0) / a.dur, 1);
      const ease = 1 - Math.pow(1 - raw, 3);
      meshRef.current.rotation.x = Math.PI / 2 + a.from + (a.to - a.from) * ease;
      if (raw >= 1 && !a.done) {
        a.done = true;
        a.running = false;
        onCompleteRef.current();
      }
    } else {
      meshRef.current.rotation.x = Math.PI / 2 + a.to;
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1, 1, 0.13, 96]} />
      <primitive object={mats[0]} attach="material-0" />
      <primitive object={mats[1]} attach="material-1" />
      <primitive object={mats[2]} attach="material-2" />
    </mesh>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function CoinCanvas({
  targetAngle,
  onComplete,
  onFlip,
  isFlipping,
}: {
  targetAngle: number;
  onComplete: () => void;
  onFlip: () => void;
  isFlipping: boolean;
}) {
  const isFlippingRef = useRef(isFlipping);
  useEffect(() => { isFlippingRef.current = isFlipping; }, [isFlipping]);

  const [cursor, setCursor] = useState("grab");
  const handleCursorChange = useCallback((c: string) => setCursor(c), []);

  return (
    <Canvas camera={{ position: [0, 0, 2.8], fov: 44 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent", cursor }}>
      <directionalLight position={[4, 6, 5]} intensity={2.4} color="#fff6d8" />
      <pointLight position={[-4, 2, 3]} intensity={0.9} color="#c8d8ff" />
      <pointLight position={[1, -4, 2]} intensity={0.5} color="#f0a040" />
      <ambientLight intensity={0.35} />
      <DraggableGroup onFlip={onFlip} isFlipping={isFlippingRef} onCursorChange={handleCursorChange}>
        <Coin targetAngle={targetAngle} onComplete={onComplete} />
      </DraggableGroup>
    </Canvas>
  );
}
