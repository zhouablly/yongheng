import * as React from 'react';
import { cn } from '@/lib/utils';

interface DividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'line' | 'dot' | 'fade';
}

export function Divider({ className, orientation = 'horizontal', variant = 'line' }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'w-px h-full',
          variant === 'line' && 'bg-gradient-to-b from-transparent via-line to-transparent',
          variant === 'fade' && 'bg-gradient-to-b from-transparent via-paper-brown/30 to-transparent',
          className
        )}
      />
    );
  }

  if (variant === 'dot') {
    return (
      <div className={cn('flex items-center justify-center gap-2 py-4', className)}>
        <div className="w-1 h-1 rounded-full bg-paper-brown/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-paper-brown/50" />
        <div className="w-1 h-1 rounded-full bg-paper-brown/40" />
      </div>
    );
  }

  if (variant === 'fade') {
    return (
      <div
        className={cn(
          'h-px w-full bg-gradient-to-r from-transparent via-line to-transparent',
          className
        )}
      />
    );
  }

  return <div className={cn('h-px w-full bg-line/60', className)} />;
}
