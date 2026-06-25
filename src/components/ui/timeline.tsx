'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import type { TimelineEvent } from '@/types';
import { cn, formatDate } from '@/lib/utils';

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const categoryColors = {
  milestone: 'bg-faded-peach',
  everyday: 'bg-sea-glass',
  trip: 'bg-mist-blue',
  gift: 'bg-sun-wash',
  other: 'bg-paper-brown',
};

const categoryLabels = {
  milestone: '重要时刻',
  everyday: '日常',
  trip: '旅行',
  gift: '礼物',
  other: '其他',
};

export function Timeline({ events, className }: TimelineProps) {
  const sorted = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className={cn('relative', className)}>
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-line to-transparent md:-translate-x-1/2" />

      <div className="space-y-12 md:space-y-16">
        {sorted.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: (index % 2) * 0.1,
            }}
            className={cn(
              'relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-12',
              index % 2 === 0 ? 'md:text-right' : 'md:[&>*:first-child]:order-2'
            )}
          >
            <div className={cn('md:px-8', index % 2 === 0 ? 'md:text-right' : 'md:text-left')}>
              <span
                className={cn(
                  'inline-block text-xs px-3 py-1 rounded-full mb-2 font-medium',
                  categoryColors[event.category] + '/20',
                  'text-soft-ink/70'
                )}
              >
                {categoryLabels[event.category]}
              </span>
              <h3 className="text-xl font-serif-sc font-medium text-soft-ink mb-2">
                {event.title}
              </h3>
              {event.description && (
                <p className="text-ash-gray text-sm leading-relaxed">{event.description}</p>
              )}
              <p className="text-xs text-paper-brown mt-3 font-display italic">
                {formatDate(event.date)}
              </p>
            </div>

            <div
              className={cn(
                'absolute left-4 md:left-1/2 top-2 md:top-3 -translate-x-1/2 md:-translate-x-1/2',
                'w-3 h-3 rounded-full border-2 border-milk z-10',
                categoryColors[event.category]
              )}
            />

            <div className="hidden md:block" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
