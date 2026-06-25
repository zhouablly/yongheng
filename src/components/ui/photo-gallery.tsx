'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import type { MemoryPhoto } from '@/types';
import { cn, formatDate, FALLBACK_IMAGES } from '@/lib/utils';
import { SmartImage } from '@/components/ui/smart-image';

interface PhotoGalleryProps {
  photos: MemoryPhoto[];
  className?: string;
  columns?: 2 | 3 | 4;
}

export function PhotoGallery({ photos, className, columns = 3 }: PhotoGalleryProps) {
  const cols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-3 md:gap-4', cols[columns], className)}>
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: (index % columns) * 0.08,
          }}
          className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer card-hover"
        >
          <SmartImage
            src={photo.url}
            alt={photo.caption || '照片'}
            fill
            fallbackSrc={FALLBACK_IMAGES.landscape}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-soft-ink/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-milk opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
            {photo.caption && (
              <p className="text-sm font-medium mb-1">{photo.caption}</p>
            )}
            {(photo.date || photo.location) && (
              <p className="text-xs text-milk/70 font-display italic">
                {photo.date && formatDate(photo.date, 'short')}
                {photo.date && photo.location && ' · '}
                {photo.location}
              </p>
            )}
          </div>
          <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
}
