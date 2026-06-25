'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface CursorGlowProps {
  className?: string;
  size?: number;
  color?: string;
}

export function CursorGlow({ className, size = 600, color = 'rgba(232, 184, 162, 0.08)' }: CursorGlowProps) {
  const glowRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const x = e.clientX - size / 2;
      const y = e.clientY - size / 2;
      glowRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  return (
    <div
      ref={glowRef}
      className={cn(
        'fixed top-0 left-0 pointer-events-none z-[1] transition-transform duration-100 ease-out hidden md:block',
        className
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        mixBlendMode: 'screen',
      }}
    />
  );
}
