import type { LoveSpace, Couple } from '@/types';
import { generateId } from './utils';

const STORAGE_KEY = 'yongheng-spaces';

export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function getAllSpaces(): LoveSpace[] {
  if (!isBrowser()) return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getSpaceById(id: string): LoveSpace | null {
  const spaces = getAllSpaces();
  return spaces.find((s) => s.id === id) || null;
}

export function createSpace(couple: Omit<Couple, 'id' | 'createdAt'>): LoveSpace {
  const newSpace: LoveSpace = {
    id: generateId(),
    couple: {
      ...couple,
      id: generateId(),
      createdAt: new Date().toISOString(),
    },
    photos: [],
    letters: [],
    timeline: [],
    anniversaries: [
      {
        id: generateId(),
        title: '在一起纪念日',
        date: couple.anniversary,
        type: 'yearly',
        emoji: '💕',
      },
    ],
  };

  const spaces = getAllSpaces();
  spaces.push(newSpace);
  saveSpaces(spaces);
  return newSpace;
}

export function updateSpace(id: string, updates: Partial<LoveSpace>): LoveSpace | null {
  const spaces = getAllSpaces();
  const index = spaces.findIndex((s) => s.id === id);
  if (index === -1) return null;

  spaces[index] = { ...spaces[index], ...updates };
  saveSpaces(spaces);
  return spaces[index];
}

export function deleteSpace(id: string): boolean {
  const spaces = getAllSpaces();
  const filtered = spaces.filter((s) => s.id !== id);
  if (filtered.length === spaces.length) return false;
  saveSpaces(filtered);
  return true;
}

function saveSpaces(spaces: LoveSpace[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(spaces));
  } catch (e) {
    console.error('Failed to save spaces:', e);
  }
}

export function getRecentSpaceId(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem('yongheng-recent-space');
}

export function setRecentSpaceId(id: string): void {
  if (!isBrowser()) return;
  localStorage.setItem('yongheng-recent-space', id);
}
