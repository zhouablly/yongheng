import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 统一的图片 URL 生成函数（外部 API）
export function img(
  prompt: string,
  size: 'landscape_4_3' | 'landscape_16_9' | 'portrait_4_3' | 'square' = 'landscape_4_3'
): string {
  return `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size}`;
}

// 通用 fallback 图片（使用更简单的 prompt，提高成功率）
export const FALLBACK_IMAGES = {
  hero: img('romantic sunset couple silhouette warm golden light film photography minimal', 'landscape_16_9'),
  portrait: img('portrait soft warm light film aesthetic minimal', 'portrait_4_3'),
  square: img('soft warm light gradient minimal film aesthetic', 'square'),
  landscape: img('dreamy soft light landscape film photography overexposed', 'landscape_4_3'),
};

export function formatDate(date: string | Date, format: 'full' | 'short' | 'year' | 'month-day' = 'full'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  switch (format) {
    case 'full':
      return `${year}年${month}月${day}日`;
    case 'short':
      return `${year}.${month}.${day}`;
    case 'year':
      return `${year}`;
    case 'month-day':
      return `${month}月${day}日`;
    default:
      return `${year}年${month}月${day}日`;
  }
}

export function daysTogether(anniversary: string | Date): number {
  const start = typeof anniversary === 'string' ? new Date(anniversary) : anniversary;
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function yearsTogether(anniversary: string | Date): number {
  const days = daysTogether(anniversary);
  return Math.floor(days / 365);
}

export function nextAnniversary(anniversary: string | Date): { date: Date; daysUntil: number; years: number } {
  const start = typeof anniversary === 'string' ? new Date(anniversary) : anniversary;
  const now = new Date();
  let next = new Date(now.getFullYear(), start.getMonth(), start.getDate());

  if (next < now) {
    next = new Date(now.getFullYear() + 1, start.getMonth(), start.getDate());
  }

  const daysUntil = Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const years = next.getFullYear() - start.getFullYear();

  return { date: next, daysUntil, years };
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function formatNumber(num: number): string {
  return num.toLocaleString('zh-CN');
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function daysUntil(dateStr: string | Date): number {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  const now = new Date();
  let next = new Date(now.getFullYear(), date.getMonth(), date.getDate());

  if (next < now) {
    next = new Date(now.getFullYear() + 1, date.getMonth(), date.getDate());
  }

  return Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}
