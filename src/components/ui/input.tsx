'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = 'text', id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-soft-ink/80 block font-serif-sc"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            'flex h-12 w-full rounded-xl border border-line/60 bg-milk/50 px-4 py-2 text-base text-soft-ink placeholder:text-ash-gray/60 transition-all duration-300',
            'focus-visible:outline-none focus-visible:border-faded-peach focus-visible:ring-2 focus-visible:ring-faded-peach/20 focus-visible:bg-milk',
            'hover:border-paper-brown/30',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-400/60 focus-visible:border-red-400 focus-visible:ring-red-400/20',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
