'use client';

import * as React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
}

export function ScrollProgress({
  className,
  color = '#B69B7D',
  height = 2,
  position = 'top',
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={cn(
        'fixed left-0 right-0 z-50 origin-left',
        position === 'top' ? 'top-0' : 'bottom-0',
        className
      )}
      style={{ scaleX, height, backgroundColor: color }}
    />
  );
}
