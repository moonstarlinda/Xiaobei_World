import React, { useEffect, useRef, useState } from 'react';

type Spark = { id: number; x: number; y: number; dx: number; dy: number; color: string; delay: number; duration: number; glyph: string; kind: 'star' | 'flower'; size: number };
const colors = ['#f2b9c8', '#a9d5e8', '#ffd98a', '#fffaf1'];
const glyphs = ['★', '✦', '✧', '•'];
const flowers = ['✿', '❀', '✾', '✽', '❁'];

export const BirthdayWish: React.FC = () => {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const nextId = useRef(0);
  useEffect(() => {
    const makeWish = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest('input, textarea, select')) return;
      const isCakeWish = Boolean((event.target as HTMLElement).closest('.birthday-cake'));
      const batch = Array.from({ length: isCakeWish ? 12 : 9 }, (_, index) => {
        const angle = (Math.PI * 2 * index) / 12 + (Math.random() - .5) * .35;
        const distance = 65 + Math.random() * 55;
        return {
          id: nextId.current++, x: event.clientX, y: event.clientY,
          dx: isCakeWish ? Math.cos(angle) * distance : (index - 4) * 11 + (Math.random() - .5) * 18,
          dy: isCakeWish ? Math.sin(angle) * distance : -95,
          color: colors[index % colors.length], delay: Math.random() * 120,
          duration: isCakeWish ? 1.2 + Math.random() * .55 : 1.15,
          glyph: isCakeWish ? flowers[index % flowers.length] : glyphs[index % glyphs.length],
          kind: isCakeWish ? 'flower' as const : 'star' as const,
          size: isCakeWish ? 1.25 + Math.random() * .55 : .85 + Math.random() * .3,
        };
      });
      setSparks((current) => [...current.slice(-45), ...batch]);
      window.setTimeout(() => {
        const ids = new Set(batch.map(({ id }) => id));
        setSparks((current) => current.filter(({ id }) => !ids.has(id)));
      }, isCakeWish ? 2000 : 1300);
    };
    window.addEventListener('pointerdown', makeWish);
    return () => window.removeEventListener('pointerdown', makeWish);
  }, []);
  return <div className="birthday-wish-layer" aria-hidden="true">{sparks.map((spark) =>
    <span key={spark.id} className={`birthday-click-spark birthday-click-${spark.kind}`} style={{ left: spark.x, top: spark.y, color: spark.color, fontSize: `${spark.size}rem`, animationDelay: `${spark.delay}ms`, animationDuration: `${spark.duration}s`, '--spark-x': `${spark.dx}px`, '--spark-y': `${spark.dy}px` } as React.CSSProperties}>{spark.glyph}</span>
  )}</div>;
};
