"use client";

import * as React from "react";
import { Minus, Plus, Maximize2, Hand, LocateFixed } from "lucide-react";
import { cn } from "@/lib/utils";

type Transform = { x: number; y: number; scale: number };

const MIN_SCALE = 0.4;
const MAX_SCALE = 2.8;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function nearlyEqual(a: Transform, b: Transform) {
  return (
    Math.abs(a.x - b.x) < 0.15 &&
    Math.abs(a.y - b.y) < 0.15 &&
    Math.abs(a.scale - b.scale) < 0.0008
  );
}

/**
 * Map / schema-viewer style canvas: drag to pan, pinch or wheel to zoom.
 * Zoom uses a smooth ease toward the target; pan stays 1:1 while dragging.
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

  const currentRef = React.useRef<Transform>({ x: 24, y: 24, scale: initialScale });
  const targetRef = React.useRef<Transform>({ x: 24, y: 24, scale: initialScale });
  const rafRef = React.useRef(0);
  const [t, setT] = React.useState<Transform>(currentRef.current);

  const dragRef = React.useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = React.useRef(false);
  const pinchRef = React.useRef<{ dist: number; scale: number } | null>(null);
  const [grabbing, setGrabbing] = React.useState(false);

  const stopLoop = React.useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  const startLoop = React.useCallback(() => {
    if (rafRef.current) return;
    const tick = () => {
      const cur = currentRef.current;
      const tg = targetRef.current;
      // Smooth ease-out toward target (feels like map / Figma zoom)
      const ease = 0.22;
      const next: Transform = {
        x: cur.x + (tg.x - cur.x) * ease,
        y: cur.y + (tg.y - cur.y) * ease,
        scale: cur.scale + (tg.scale - cur.scale) * ease,
      };
      if (nearlyEqual(next, tg)) {
        currentRef.current = tg;
        setT(tg);
        rafRef.current = 0;
        return;
      }
      currentRef.current = next;
      setT(next);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const commitInstant = React.useCallback((next: Transform) => {
    stopLoop();
    const clamped = { ...next, scale: clamp(next.scale, minScale, maxScale) };
    currentRef.current = clamped;
    targetRef.current = clamped;
    setT(clamped);
  }, [minScale, maxScale, stopLoop]);

  const commitAnimated = React.useCallback(
    (next: Transform) => {
      targetRef.current = { ...next, scale: clamp(next.scale, minScale, maxScale) };
      startLoop();
    },
    [minScale, maxScale, startLoop]
  );

  const zoomAt = React.useCallback(
    (clientX: number, clientY: number, nextScale: number, animate = true) => {
      const el = viewportRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cur = animate ? targetRef.current : currentRef.current;
      const scale = clamp(nextScale, minScale, maxScale);
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      const x = px - ((px - cur.x) / cur.scale) * scale;
      const y = py - ((py - cur.y) / cur.scale) * scale;
      const next = { x, y, scale };
      if (animate) commitAnimated(next);
      else commitInstant(next);
    },
    [minScale, maxScale, commitAnimated, commitInstant]
  );

  const fitContent = React.useCallback(() => {
    const vp = viewportRef.current;
    const content = contentRef.current;
    if (!vp || !content) return;
    const pad = 48;
    const vw = vp.clientWidth - pad * 2;
    const vh = vp.clientHeight - pad * 2;
    const cw = content.scrollWidth;
    const ch = content.scrollHeight;
    if (cw <= 0 || ch <= 0) return;
    const scale = clamp(Math.min(vw / cw, vh / ch), minScale, maxScale);
    const x = (vp.clientWidth - cw * scale) / 2;
    const y = (vp.clientHeight - ch * scale) / 2;
    commitAnimated({ x, y, scale });
  }, [minScale, maxScale, commitAnimated]);

  const resetView = React.useCallback(() => {
    commitAnimated({ x: 24, y: 24, scale: initialScale });
  }, [initialScale, commitAnimated]);

  React.useEffect(() => {
    const id = window.setTimeout(() => fitContent(), 50);
    return () => {
      window.clearTimeout(id);
      stopLoop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const cur = targetRef.current;
      const factor = Math.exp(-e.deltaY * 0.00135);
      zoomAt(e.clientX, e.clientY, cur.scale * factor, true);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest("[data-panzoom-ui]")) return;

    stopLoop();
    currentRef.current = { ...targetRef.current };
    setT(currentRef.current);

    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origX: currentRef.current.x,
      origY: currentRef.current.y,
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
    commitInstant({
      x: drag.origX + dx,
      y: drag.origY + dy,
      scale: currentRef.current.scale,
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
    pinchRef.current = { dist, scale: targetRef.current.scale };
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
    zoomAt(midX, midY, pinch.scale * (dist / pinch.dist), true);
  };

  const onTouchEnd = () => {
    pinchRef.current = null;
  };

  const onDoubleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a,button,[data-panzoom-ui]")) return;
    zoomAt(e.clientX, e.clientY, targetRef.current.scale * 1.4, true);
  };

  const centerZoom = (factor: number) => {
    const el = viewportRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    zoomAt(r.left + r.width / 2, r.top + r.height / 2, targetRef.current.scale * factor, true);
  };

  const pct = Math.round(t.scale * 100);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border-2 border-[#10164F]/25 bg-[#EAEDFF] shadow-[0_24px_60px_-28px_rgba(16,22,79,0.35)]",
        className
      )}
    >
      <div
        data-panzoom-ui
        className="absolute left-3 top-3 z-20 flex flex-wrap items-center gap-1.5 rounded-2xl border-2 border-[#10164F]/20 bg-white p-1.5 shadow-lg"
      >
        <span className="hidden items-center gap-1.5 px-2 text-[10px] font-black uppercase tracking-wider text-[#10164F] sm:inline-flex">
          <Hand className="h-3.5 w-3.5 text-[#304FFE]" /> Drag · Pinch · Scroll
        </span>
        <div className="mx-0.5 hidden h-6 w-px bg-[#10164F]/20 sm:block" />
        <ToolBtn label="Zoom out" onClick={() => centerZoom(1 / 1.25)}>
          <Minus className="h-4 w-4" />
        </ToolBtn>
        <span className="min-w-[3.5rem] rounded-lg bg-[#EAEDFF] px-2 py-1 text-center text-xs font-black tabular-nums text-[#10164F]">
          {pct}%
        </span>
        <ToolBtn label="Zoom in" onClick={() => centerZoom(1.25)}>
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
          "relative h-[min(80vh,920px)] w-full touch-none select-none overflow-hidden",
          "bg-[radial-gradient(circle_at_1px_1px,rgba(16,22,79,0.14)_1px,transparent_0)] bg-[size:20px_20px]",
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
            transform: `translate3d(${t.x}px, ${t.y}px, 0) scale(${t.scale})`,
          }}
        >
          {children}
        </div>
      </div>

      <p className="border-t-2 border-[#10164F]/15 bg-white px-4 py-2.5 text-[11px] font-bold text-[#10164F]">
        Drag to pan · scroll / pinch to zoom · double-click zooms in · Fit frames the whole bracket
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
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-[#10164F] transition-colors hover:border-[#304FFE]/30 hover:bg-[#EAEDFF] hover:text-[#304FFE]"
    >
      {children}
    </button>
  );
}
