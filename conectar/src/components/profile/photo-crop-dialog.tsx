"use client";
/* eslint-disable @next/next/no-img-element -- The editor previews a browser object URL before upload. */

import { useEffect, useRef, useState } from "react";
import { Check, Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/primitives";
import { cropAndCompressProfilePhoto } from "@/lib/photos/compress";

const FRAME_SIZE = 288;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

type Point = { x: number; y: number };
type DragState = Point & { pointerId: number; startX: number; startY: number };

function distance([first, second]: Point[]) {
  return Math.hypot(first.x - second.x, first.y - second.y);
}

export function PhotoCropDialog({ file, onCancel, onConfirm }: { file: File; onCancel: () => void; onConfirm: (file: File) => void }) {
  const [sourceUrl] = useState(() => URL.createObjectURL(file));
  const pointers = useRef(new Map<number, Point>());
  const drag = useRef<DragState | null>(null);
  const pinch = useRef<{ distance: number; zoom: number } | null>(null);
  const [dimensions, setDimensions] = useState<Point | null>(null);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => () => URL.revokeObjectURL(sourceUrl), [sourceUrl]);

  function constrain(nextOffset: Point, nextZoom: number) {
    if (!dimensions) return nextOffset;
    const scale = (FRAME_SIZE / Math.min(dimensions.x, dimensions.y)) * nextZoom;
    const maxX = Math.max(0, (dimensions.x * scale - FRAME_SIZE) / 2);
    const maxY = Math.max(0, (dimensions.y * scale - FRAME_SIZE) / 2);
    return { x: Math.min(maxX, Math.max(-maxX, nextOffset.x)), y: Math.min(maxY, Math.max(-maxY, nextOffset.y)) };
  }

  function changeZoom(nextZoom: number) {
    const boundedZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom));
    setZoom(boundedZoom);
    setOffset((current) => constrain(current, boundedZoom));
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const active = [...pointers.current.values()];
    if (active.length === 1) drag.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, x: offset.x, y: offset.y };
    if (active.length === 2) pinch.current = { distance: distance(active), zoom };
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const active = [...pointers.current.values()];
    if (active.length === 2 && pinch.current) {
      changeZoom(pinch.current.zoom * (distance(active) / pinch.current.distance));
      return;
    }
    if (drag.current?.pointerId === event.pointerId) {
      setOffset(constrain({ x: drag.current.x + event.clientX - drag.current.startX, y: drag.current.y + event.clientY - drag.current.startY }, zoom));
    }
  }

  function onPointerEnd(event: React.PointerEvent<HTMLDivElement>) {
    pointers.current.delete(event.pointerId);
    drag.current = null;
    pinch.current = null;
  }

  async function confirm() {
    if (!dimensions) return;
    setProcessing(true);
    setError("");
    try {
      const cropped = await cropAndCompressProfilePhoto(file, { offsetX: offset.x / FRAME_SIZE, offsetY: offset.y / FRAME_SIZE, zoom });
      onConfirm(cropped);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Não foi possível preparar a foto.");
      setProcessing(false);
    }
  }

  const imageScale = dimensions ? (FRAME_SIZE / Math.min(dimensions.x, dimensions.y)) * zoom : 1;
  return <div className="fixed inset-0 z-50 flex items-end bg-conectar-ink/55 sm:items-center sm:justify-center" role="dialog" aria-modal="true" aria-labelledby="photo-crop-title"><button type="button" aria-label="Cancelar enquadramento" className="absolute inset-0" onClick={onCancel} /><section className="relative w-full max-w-md rounded-t-3xl bg-white p-5 pb-[max(20px,env(safe-area-inset-bottom))] shadow-2xl sm:rounded-3xl"><div className="flex items-center justify-between"><div><h2 id="photo-crop-title" className="font-editorial text-2xl font-semibold text-conectar-ink">Enquadre sua foto</h2><p className="mt-1 text-sm text-conectar-muted">Arraste e use o zoom para ajustar o avatar.</p></div><button type="button" aria-label="Cancelar enquadramento" onClick={onCancel} className="grid size-11 place-items-center rounded-xl text-conectar-ink"><X className="size-5" /></button></div><div className="mx-auto mt-6 size-72 touch-none overflow-hidden rounded-full bg-conectar-green-100" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd}><img src={sourceUrl} alt="" draggable={false} onLoad={(event) => setDimensions({ x: event.currentTarget.naturalWidth, y: event.currentTarget.naturalHeight })} className="pointer-events-none max-w-none select-none" style={{ height: dimensions ? dimensions.y * imageScale : "auto", left: dimensions ? (FRAME_SIZE - dimensions.x * imageScale) / 2 + offset.x : 0, maxHeight: "none", maxWidth: "none", position: "relative", top: dimensions ? (FRAME_SIZE - dimensions.y * imageScale) / 2 + offset.y : 0, width: dimensions ? dimensions.x * imageScale : "auto" }} /></div><div className="mt-6 flex items-center gap-3"><button type="button" aria-label="Diminuir zoom" onClick={() => changeZoom(zoom - 0.1)} className="grid size-11 place-items-center rounded-xl border border-conectar-border-soft text-conectar-green-800"><Minus className="size-4" /></button><input aria-label="Zoom da foto" className="h-2 flex-1 accent-[#194828]" type="range" min={MIN_ZOOM} max={MAX_ZOOM} step="0.01" value={zoom} onChange={(event) => changeZoom(Number(event.target.value))} /><button type="button" aria-label="Aumentar zoom" onClick={() => changeZoom(zoom + 0.1)} className="grid size-11 place-items-center rounded-xl border border-conectar-green-800 text-conectar-green-800"><Plus className="size-4" /></button></div>{error && <p role="alert" className="mt-4 text-sm text-[#b94a48]">{error}</p>}<div className="mt-6 flex gap-3"><Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button><Button type="button" disabled={!dimensions || processing} onClick={confirm}>{processing ? "Preparando..." : "Usar esta foto"}<Check className="size-5" /></Button></div></section></div>;
}
