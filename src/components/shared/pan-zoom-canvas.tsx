"use client";

import * as React from "react";
import { Minus, Plus, Maximize2, Hand, LocateFixed } from "lucide-react";
import { cn } from "@/lib/utils";

type Transform = { x: number; y: number; scale: number };

const MIN_SCALE = 0.35;
const MAX_SCALE = 2.75;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Map / schema-viewer style canvas: drag to pan, pinch or wheel to zoom.
 */
export function PanZoomCanvas({
  children,
  className,
  contentClassName,
  minScale = MIN_SCALE,
  maxScale = MAX_SCALE,
  initialScale = 0.85,
}: {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  minScale?: number;
  maxScale?: number;
  initialScale?: number;
}) {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [t, setT] = React.useState<Transform>({ x: 24, y: 24, scale: initialScale });
  const tRef = React.useRef(t);
  tRef.current = t;

  const dragRef = React.useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = React.useRef(false);
  const pinchRef = React.useRef<{
    dist: number;
    scale: number;
    midX: number;
    midY: number;
    x: number;
    y: number;
  } | null>(null);
  const [grabbing, setGrabbing] = React.useState(false);

  const zoomAt = React.useCallback(
    (clientX: number, clientY: number, nextScale: number) => {
      const el = viewportRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cur = tRef.current;
      const scale = clamp(nextScale, minScale, maxScale);
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      // Keep the point under the cursor stable while scaling
      const x = px - ((px - cur.x) / cur.scale) * scale;
      const y = py - ((py - cur.y) / cur.scale) * scale;
      setT({ x, y, scale });
    },
    [minScale, maxScale]
  );

  const fitContent = React.useCallback(() => {
    const vp = viewportRef.current;
    const content = contentRef.current;
    if (!vp || !content) return;
    const pad = 40;
    const vw = vp.clientWidth - pad * 2;
    const vh = vp.clientHeight - pad * 2;
    const cw = content.scrollWidth;
    const ch = content.scrollHeight;
    if (cw <= 0 || ch <= 0) return;
    const scale = clamp(Math.min(vw / cw, vh / ch), minScale, maxScale);
    const x = (vp.clientWidth - cw * scale) / 2;
    const y = (vp.clientHeight - ch * scale) / 2;
    setT({ x, y, scale });
  }, [minScale, maxScale]);

  const resetView = React.useCallback(() => {
    setT({ x: 24, y: 24, scale: initialScale });
  }, [initialScale]);

  // Fit once after mount (parent remounts via key when focus changes)
  React.useEffect(() => {
    const id = window.setTimeout(() => fitContent(), 40);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Always zoom inside the canvas (schema/map feel)
      e.preventDefault();
      const cur = tRef.current;
      const delta = -e.deltaY;
      const factor = Math.exp(delta * 0.0016);
      zoomAt(e.clientX, e.clientY, cur.scale * factor);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    // Don't start pan from interactive controls in the toolbar overlay
    const target = e.target as HTMLElement;
    if (target.closest("[data-panzoom-ui]")) return;

    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origX: tRef.current.x,
      origY: tRef.current.y,
      moved: false,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setGrabbing(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
    setT({
      x: drag.origX + dx,
      y: drag.origY + dy,
      scale: tRef.current.scale,
    });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragRef.current?.pointerId === e.pointerId) {
      if (dragRef.current.moved) suppressClickRef.current = true;
      dragRef.current = null;
      setGrabbing(false);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 2) return;
    const [a, b] = [e.touches[0], e.touches[1]];
    const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    pinchRef.current = {
      dist,
      scale: tRef.current.scale,
      midX: (a.clientX + b.clientX) / 2,
      midY: (a.clientY + b.clientY) / 2,
      x: tRef.current.x,
      y: tRef.current.y,
    };
    dragRef.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const pinch = pinchRef.current;
    if (!pinch || e.touches.length !== 2) return;
    e.preventDefault();
    const [a, b] = [e.touches[0], e.touches[1]];
    const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    const midX = (a.clientX + b.clientX) / 2;
    const midY = (a.clientY + b.clientY) / 2;
    const nextScale = clamp(pinch.scale * (dist / pinch.dist), minScale, maxScale);
    zoomAt(midX, midY, nextScale);
  };

  const onTouchEnd = () => {
    pinchRef.current = null;
  };

  const onDoubleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a,button,[data-panzoom-ui]")) return;
    zoomAt(e.clientX, e.clientY, tRef.current.scale * 1.35);
  };

  const pct = Math.round(t.scale * 100);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border-2 border-[#10164F]/18 bg-[#EAEDFF]/70 shadow-[0_24px_60px_-28px_rgba(16,22,79,0.3)]",
        className
      )}
    >
      {/* Toolbar */}
      <div
        data-panzoom-ui
        className="absolute left-3 top-3 z-20 flex flex-wrap items-center gap-1.5 rounded-2xl border-2 border-[#10164F]/15 bg-white/95 p-1.5 shadow-lg backdrop-blur"
      >
        <span className="hidden items-center gap-1.5 px-2 text-[10px] font-black uppercase tracking-wider text-[#10164F]/70 sm:inline-flex">
          <Hand className="h-3.5 w-3.5 text-[#304FFE]" /> Drag · Pinch · Scroll
        </span>
        <div className="mx-0.5 hidden h-6 w-px bg-[#10164F]/15 sm:block" />
        <ToolBtn label="Zoom out" onClick={() => {
          const el = viewportRef.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          zoomAt(r.left + r.width / 2, r.top + r.height / 2, t.scale / 1.2);
        }}>
          <Minus className="h-4 w-4" />
        </ToolBtn>
        <span className="min-w-[3.25rem] text-center text-xs font-black tabular-nums text-[#10164F]">
          {pct}%
        </span>
        <ToolBtn label="Zoom in" onClick={() => {
          const el = viewportRef.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          zoomAt(r.left + r.width / 2, r.top + r.height / 2, t.scale * 1.2);
        }}>
          <Plus className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn label="Fit to view" onClick={fitContent}>
          <Maximize2 className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn label="Reset view" onClick={resetView}>
          <LocateFixed className="h-4 w-4" />
        </ToolBtn>
      </div>

      <div
        ref={viewportRef}
        className={cn(
          "relative h-[min(78vh,880px)] w-full touch-none select-none overflow-hidden",
          "bg-[radial-gradient(circle_at_1px_1px,rgba(16,22,79,0.12)_1px,transparent_0)] bg-[size:22px_22px]",
          grabbing ? "cursor-grabbing" : "cursor-grab"
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onDoubleClick={onDoubleClick}
        onClickCapture={(e) => {
          if (suppressClickRef.current) {
            e.preventDefault();
            e.stopPropagation();
            suppressClickRef.current = false;
          }
        }}
      >
        <div
          ref={contentRef}
          className={cn("origin-top-left will-change-transform", contentClassName)}
          style={{
            transform: `translate(${t.x}px, ${t.y}px) scale(${t.scale})`,
          }}
        >
          {children}
        </div>
      </div>

      <p className="border-t border-[#10164F]/10 bg-white px-4 py-2 text-[11px] font-semibold text-[#10164F]/75">
        Hand-drag to pan · scroll / pinch to zoom · double-click to zoom in · Fit centers the bracket
      </p>
    </div>
  );
}

function ToolBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="flex h-9 w-9 items-center justify-center rounded-xl text-[#10164F] transition-colors hover:bg-[#EAEDFF] hover:text-[#304FFE]"
    >
      {children}
    </button>
  );
}
