'use client';
import { useEffect, useState } from 'react';

const COLORS = ['#ff6b9d', '#ffd93d', '#6bcb77', '#4d96ff', '#c77dff', '#ff9f1c'];
const SHAPES = ['★', '●', '♥', '◆'];

export default function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<{ id: number; x: number; color: string; shape: string; delay: number }[]>([]);

  useEffect(() => {
    if (!active) return;
    const arr = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      delay: Math.random() * 0.8,
    }));
    setPieces(arr);
    const t = setTimeout(() => setPieces([]), 3000);
    return () => clearTimeout(t);
  }, [active]);

  if (!pieces.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece absolute text-xl font-bold"
          style={{
            left: `${p.x}%`,
            top: '-20px',
            color: p.color,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.shape}
        </span>
      ))}
    </div>
  );
}
