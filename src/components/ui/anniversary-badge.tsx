'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import type { Anniversary } from '@/types';
import { cn, daysUntil } from '@/lib/utils';

interface AnniversaryBadgeProps {
  anniversary: Anniversary;
  index?: number;
  className?: string;
}

export function AnniversaryBadge({ anniversary, index = 0, className }: AnniversaryBadgeProps) {
  const daysLeft = daysUntil(anniversary.date);
  const isSoon = daysLeft <= 30;
  const isToday = daysLeft === 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
      className={cn(
        'relative flex flex-col items-center justify-center p-4 md:p-5 rounded-2xl bg-milk/80 border border-line/50',
        'hover:shadow-md transition-all duration-500 ease-out',
        isSoon && 'border-faded-peach/40 bg-faded-peach/5',
        isToday && 'border-sun-wash/60 bg-sun-wash/10',
        className
      )}
    >
      <div className="text-3xl md:text-4xl mb-2">{anniversary.emoji}</div>
      <p className="font-serif-sc text-sm md:text-base text-soft-ink font-medium text-center mb-1">
        {anniversary.title}
      </p>
      <p className="text-xs text-ash-gray font-display italic">
        {isToday
          ? '就是今天！'
          : isSoon
          ? `还有 ${daysLeft} 天`
          : `${daysLeft} 天后`}
      </p>
    </motion.div>
  );
}
