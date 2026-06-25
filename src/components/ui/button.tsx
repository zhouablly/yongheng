'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'relative inline-flex items-center justify-center font-medium transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper-brown/30 focus-visible:ring-offset-2 focus-visible:ring-offset-porcelain disabled:pointer-events-none disabled:opacity-50 overflow-hidden group';

    const variants = {
      primary:
        'bg-soft-ink text-milk hover:bg-soft-ink/90 shadow-lg shadow-soft-ink/10 hover:shadow-soft-ink/20 hover:-translate-y-0.5',
      secondary:
        'bg-faded-peach/20 text-soft-ink hover:bg-faded-peach/30 border border-faded-peach/30',
      ghost: 'hover:bg-soft-ink/5 text-soft-ink',
      outline:
        'border border-line text-soft-ink hover:bg-soft-ink/5 hover:border-paper-brown/40',
      text: 'text-soft-ink hover:text-paper-brown underline-offset-4 hover:underline',
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm rounded-full',
      md: 'h-11 px-6 text-sm rounded-full',
      lg: 'h-14 px-8 text-base rounded-full',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
