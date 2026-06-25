'use client';

import * as React from 'react';
import { motion, useInView, useSpring, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  delay?: number;
}

export function CountUp({
  end,
  duration = 2,
  className,
  suffix = '',
  prefix = '',
  decimals = 0,
  delay = 0,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(decimals));
  const springCount = useSpring(count, { stiffness: 50, damping: 20 });

  React.useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const controls = animate(count, end, {
        duration,
        ease: 'easeOut',
      });
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, end, duration, delay, count]);

  return (
    <span ref={ref} className={cn('font-display tabular-nums', className)}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
