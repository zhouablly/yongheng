'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import type { LoveLetter } from '@/types';
import { cn, formatDate } from '@/lib/utils';

interface LetterCardProps {
  letter: LoveLetter;
  index?: number;
  className?: string;
  variant?: 'default' | 'featured';
}

export function LetterCard({ letter, index = 0, className, variant = 'default' }: LetterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      }}
      className={cn(
        'relative bg-milk/90 rounded-2xl p-6 md:p-8 shadow-sm border border-line/50',
        'hover:shadow-md transition-all duration-500 ease-out',
        variant === 'featured' && 'md:p-10',
        className
      )}
    >
      <div className="absolute top-4 right-4 font-display text-5xl text-faded-peach/30 select-none">
        "
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span className="font-display italic text-paper-brown text-sm">
          致 {letter.to}
        </span>
        <span className="font-display italic text-ash-gray text-xs">
          {formatDate(letter.date, 'short')}
        </span>
      </div>

      <h3 className="font-serif-sc text-lg md:text-xl text-soft-ink mb-4 font-medium">
        {letter.title}
      </h3>

      <div className="text-ash-gray text-sm md:text-base leading-relaxed whitespace-pre-line line-clamp-6">
        {letter.content}
      </div>

      <div className="mt-6 text-right">
        <span className="font-display italic text-paper-brown text-sm">
          —— {letter.from}
        </span>
      </div>

      <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-faded-peach/40 rounded-tl-2xl pointer-events-none" />
      <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-faded-peach/40 rounded-br-2xl pointer-events-none" />
    </motion.div>
  );
}
