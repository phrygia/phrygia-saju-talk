"use client";

import React, { useEffect, useRef } from "react";

export default function StarCanvas({
  zIndex = -1,
}: {
  zIndex?: string | number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<any[]>([]);
  const sizeRef = useRef({ W: 0, H: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    function initStars() {
      const W = (canvas!.width = window.innerWidth);
      const H = (canvas!.height = window.innerHeight);

      sizeRef.current = { W, H };

      starsRef.current = Array.from({ length: 140 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random(),
        da:
          (Math.random() * 0.4 + 0.1) * (Math.random() < 0.5 ? 1 : -1) * 0.005,
      }));
    }

    function drawStars() {
      const { W, H } = sizeRef.current;
      const stars = starsRef.current;

      ctx!.clearRect(0, 0, W, H);

      const isLight = document.body.classList.contains("light");

      stars.forEach((s) => {
        s.a = Math.max(0.05, Math.min(1, s.a + s.da));
        if (s.a <= 0.05 || s.a >= 1) s.da *= -1;

        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = isLight
          ? `rgba(109,79,194,${s.a * 0.6})`
          : `rgba(200,180,255,${s.a * 0.7})`;
        ctx!.fill();
      });

      animationId = requestAnimationFrame(drawStars);
    }

    let animationId: number;
    initStars();
    drawStars();

    window.addEventListener("resize", initStars);

    return () => {
      window.removeEventListener("resize", initStars);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ zIndex }}
    />
  );
}
