"use client";

import React, { useEffect, useRef } from "react";

// Pre-defined contour levels for Marching Squares (normalized range ~ -0.7 to 0.7)
const ISO_LEVELS = [-0.62, -0.42, -0.22, -0.02, 0.18, 0.38, 0.58, 0.78];

interface Point {
  x: number;
  y: number;
}

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas === null || container === null) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (ctx === null) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check pointer type (touch/mobile vs fine pointer)
    const isMobileDevice =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

    // Grid configuration
    const cellSize = isMobileDevice ? 34 : 28;

    // Dimensions state stored in refs to avoid re-renders
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let dpr = 1;

    // Scalar field grid buffer (flattened 1D Float32Array for zero GC pressure)
    let grid: Float32Array = new Float32Array(0);

    // Mouse tracking and trailing state
    const TRAIL_LENGTH = 10;
    const trail: Point[] = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: -1000,
      y: -1000,
    }));
    let targetX = -1000;
    let targetY = -1000;
    let mouseIntensity = 0; // Smooth 0..1 transition
    let isMouseOverHero = false;

    // Animation and lifecycle control
    let animationFrameId: number | null = null;
    let isVisible = true;
    let time = 0;

    // Linear interpolation helper for Marching Squares edge crossings
    const lerpEdge = (
      valA: number,
      valB: number,
      iso: number,
      posA: number,
      posB: number
    ) => {
      const delta = valB - valA;
      if (Math.abs(delta) < 0.00001) return (posA + posB) * 0.5;
      const t = Math.max(0, Math.min(1, (iso - valA) / delta));
      return posA + t * (posB - posA);
    };

    // Resize handling with DPR limit Math.min(DPR, 2)
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.ceil(rect.width);
      height = Math.ceil(rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      cols = Math.ceil(width / cellSize) + 1;
      rows = Math.ceil(height / cellSize) + 1;
      grid = new Float32Array(cols * rows);

      if (prefersReducedMotion) {
        renderFrame(0);
      }
    };

    // Calculate organic 2D scalar field with smooth harmonic frequencies
    const computeField = (t: number) => {
      const scale1 = 0.0032;
      const scale2 = 0.0055;
      const scale3 = 0.0024;
      const cx = width * 0.45;
      const cy = height * 0.4;

      // Mouse influence bounding box check
      const hasMouseInfluence = mouseIntensity > 0.01 && isMobileDevice === false;
      const mouseRadius = 180;
      const mouseRadiusSq = mouseRadius * mouseRadius;

      for (let r = 0; r < rows; r++) {
        const y = r * cellSize;
        const rowOffset = r * cols;

        for (let c = 0; c < cols; c++) {
          const x = c * cellSize;

          // Multi-frequency harmonic elevation base
          let v =
            Math.sin(x * scale1 + t * 0.28) * Math.cos(y * scale1 + t * 0.22) +
            0.52 * Math.sin((x + y) * scale2 - t * 0.35) +
            0.38 * Math.cos((x * 0.85 - y * 1.15) * scale3 + t * 0.2) +
            0.28 * Math.sin(Math.hypot(x - cx, y - cy) * 0.004 - t * 0.25);

          // Gaussian perturbation from mouse trail
          if (hasMouseInfluence) {
            for (let i = 0; i < TRAIL_LENGTH; i++) {
              const pt = trail[i];
              const dx = x - pt.x;
              const dy = y - pt.y;
              const distSq = dx * dx + dy * dy;

              if (distSq < mouseRadiusSq) {
                const weight = Math.pow(1 - i / TRAIL_LENGTH, 1.4) * mouseIntensity;
                const influence = weight * 0.75 * Math.exp(-distSq / (2 * 55 * 55));
                v += influence;
              }
            }
          }

          grid[rowOffset + c] = v;
        }
      }
    };

    // Render single frame of Marching Squares
    const renderFrame = (t: number) => {
      computeField(t);

      ctx.clearRect(0, 0, width, height);

      // Base lines and Accent lines
      const baseLines: [number, number, number, number][] = [];
      const accentLines: [number, number, number, number, number][] = [];

      const cursorX = trail[0].x;
      const cursorY = trail[0].y;
      const accentRadius = 160;
      const accentRadiusSq = accentRadius * accentRadius;
      const checkAccent = mouseIntensity > 0.02 && isMobileDevice === false;

      // March through all cells and all contour levels
      for (let k = 0; k < ISO_LEVELS.length; k++) {
        const iso = ISO_LEVELS[k];

        for (let r = 0; r < rows - 1; r++) {
          const y0 = r * cellSize;
          const y1 = y0 + cellSize;
          const row0 = r * cols;
          const row1 = (r + 1) * cols;

          for (let c = 0; c < cols - 1; c++) {
            const x0 = c * cellSize;
            const x1 = x0 + cellSize;

            const v0 = grid[row0 + c]; // Top-Left
            const v1 = grid[row0 + c + 1]; // Top-Right
            const v2 = grid[row1 + c + 1]; // Bottom-Right
            const v3 = grid[row1 + c]; // Bottom-Left

            // 4-bit cell index
            let cellIndex = 0;
            if (v0 > iso) cellIndex |= 1;
            if (v1 > iso) cellIndex |= 2;
            if (v2 > iso) cellIndex |= 4;
            if (v3 > iso) cellIndex |= 8;

            if (cellIndex === 0 || cellIndex === 15) continue;

            // Interpolated edge coordinates
            // Top edge (v0 -> v1)
            const topX = lerpEdge(v0, v1, iso, x0, x1);
            const topY = y0;

            // Right edge (v1 -> v2)
            const rightX = x1;
            const rightY = lerpEdge(v1, v2, iso, y0, y1);

            // Bottom edge (v3 -> v2)
            const botX = lerpEdge(v3, v2, iso, x0, x1);
            const botY = y1;

            // Left edge (v0 -> v3)
            const leftX = x0;
            const leftY = lerpEdge(v0, v3, iso, y0, y1);

            // Helper to collect line segment
            const addSegment = (ax: number, ay: number, bx: number, by: number) => {
              baseLines.push([ax, ay, bx, by]);

              if (checkAccent) {
                const mx = (ax + bx) * 0.5;
                const my = (ay + by) * 0.5;
                const d2 = (mx - cursorX) * (mx - cursorX) + (my - cursorY) * (my - cursorY);
                if (d2 < accentRadiusSq) {
                  const dist = Math.sqrt(d2);
                  const strength = (1 - dist / accentRadius) * mouseIntensity;
                  accentLines.push([ax, ay, bx, by, strength]);
                }
              }
            };

            // Standard Marching Squares connection cases
            switch (cellIndex) {
              case 1:
              case 14:
                addSegment(leftX, leftY, topX, topY);
                break;
              case 2:
              case 13:
                addSegment(topX, topY, rightX, rightY);
                break;
              case 3:
              case 12:
                addSegment(leftX, leftY, rightX, rightY);
                break;
              case 4:
              case 11:
                addSegment(rightX, rightY, botX, botY);
                break;
              case 5: {
                // Saddle case with center sample
                const center = (v0 + v1 + v2 + v3) * 0.25;
                if (center > iso) {
                  addSegment(leftX, leftY, topX, topY);
                  addSegment(rightX, rightY, botX, botY);
                } else {
                  addSegment(leftX, leftY, botX, botY);
                  addSegment(topX, topY, rightX, rightY);
                }
                break;
              }
              case 6:
              case 9:
                addSegment(topX, topY, botX, botY);
                break;
              case 7:
              case 8:
                addSegment(leftX, leftY, botX, botY);
                break;
              case 10: {
                // Saddle case with center sample
                const center = (v0 + v1 + v2 + v3) * 0.25;
                if (center > iso) {
                  addSegment(topX, topY, rightX, rightY);
                  addSegment(leftX, leftY, botX, botY);
                } else {
                  addSegment(leftX, leftY, topX, topY);
                  addSegment(rightX, rightY, botX, botY);
                }
                break;
              }
            }
          }
        }
      }

      // Pass 1: Draw base topographic lines (Clean fine crisp stroke)
      ctx.beginPath();
      for (let i = 0; i < baseLines.length; i++) {
        const seg = baseLines[i];
        ctx.moveTo(seg[0], seg[1]);
        ctx.lineTo(seg[2], seg[3]);
      }
      ctx.strokeStyle = "rgba(255, 255, 255, 0.065)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Pass 2: Draw glowing emerald interaction lines over mouse trail (Fast, no shadowBlur)
      if (accentLines.length > 0) {
        for (let i = 0; i < accentLines.length; i++) {
          const [ax, ay, bx, by, strength] = accentLines[i];
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.strokeStyle = `rgba(16, 185, 129, ${Math.min(0.45, strength * 0.55)})`;
          ctx.lineWidth = 1.35;
          ctx.stroke();
        }
      }
    };

    // Smooth animation loop
    const animate = () => {
      if (isVisible === false) return;

      time += isMobileDevice ? 0.008 : 0.012;

      // Lerp mouse trail points smoothly (fluid elastic response)
      if (isMobileDevice === false) {
        if (isMouseOverHero) {
          mouseIntensity += (1 - mouseIntensity) * 0.08;
        } else {
          mouseIntensity += (0 - mouseIntensity) * 0.05;
        }

        // Head lerp
        trail[0].x += (targetX - trail[0].x) * 0.16;
        trail[0].y += (targetY - trail[0].y) * 0.16;

        // Tail segments follow with decay
        for (let i = 1; i < TRAIL_LENGTH; i++) {
          trail[i].x += (trail[i - 1].x - trail[i].x) * 0.12;
          trail[i].y += (trail[i - 1].y - trail[i].y) * 0.12;
        }
      }

      renderFrame(time);

      animationFrameId = requestAnimationFrame(animate);
    };

    // Pointer events on window with relative coordinate conversion
    const handlePointerMove = (e: PointerEvent) => {
      if (isMobileDevice) return;
      const rect = container.getBoundingClientRect();

      // Check if cursor is within Hero section
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
        isMouseOverHero = true;

        // Initialize trail on first entrance to prevent teleport jump
        if (trail[0].x < -500) {
          for (let i = 0; i < TRAIL_LENGTH; i++) {
            trail[i].x = targetX;
            trail[i].y = targetY;
          }
        }
      } else {
        isMouseOverHero = false;
      }
    };

    const handlePointerLeave = () => {
      isMouseOverHero = false;
    };

    // Visibility Observer to pause rAF when Hero is scrolled out
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible && animationFrameId === null && prefersReducedMotion === false) {
          animationFrameId = requestAnimationFrame(animate);
        } else if (isVisible === false && typeof animationFrameId === "number") {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      },
      { threshold: 0.05 }
    );

    // Tab visibility handling
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        if (typeof animationFrameId === "number") {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else {
        isVisible = true;
        if (animationFrameId === null && prefersReducedMotion === false) {
          animationFrameId = requestAnimationFrame(animate);
        }
      }
    };

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    resizeObserver.observe(container);
    intersectionObserver.observe(container);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    handleResize();

    if (prefersReducedMotion === false) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (typeof animationFrameId === "number") cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Vignette mask: soft fade at edges and subtle center breathing space */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      {/* Fade de transição inferior para o fundo #09090B */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#09090B] via-[#09090B]/60 to-transparent pointer-events-none" />

      {/* Fade suave superior para a barra de navegação */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#09090B] via-[#09090B]/40 to-transparent pointer-events-none" />
    </div>
  );
}
