'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowTextProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function GlowText({
  children,
  className,
  color = 'rgba(232, 184, 162, 0.6)',
  intensity = 'medium',
}: GlowTextProps) {
  const blurMap = {
    low: '8px',
    medium: '20px',
    high: '40px',
  };

  return (
    <motion.span
      initial={{ textShadow: `0 0 0 ${color}`, opacity: 0.8 }}
      animate={{ textShadow: `0 0 ${blurMap[intensity]} ${color}`, opacity: 1 }}
      transition={{
        duration: 3,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      className={cn(className)}
    >
      {children}
    </motion.span>
  );
}
