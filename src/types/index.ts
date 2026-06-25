export interface Couple {
  id: string;
  partner1Name: string;
  partner2Name: string;
  anniversary: string;
  coverImage?: string;
  story?: string;
  createdAt: string;
}

export interface MemoryPhoto {
  id: string;
  url: string;
  caption?: string;
  date?: string;
  location?: string;
}

export interface LoveLetter {
  id: string;
  title: string;
  content: string;
  date: string;
  from: string;
  to: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  image?: string;
  location?: string;
  category: 'milestone' | 'everyday' | 'trip' | 'gift' | 'other';
}

export interface Anniversary {
  id: string;
  title: string;
  date: string;
  type: 'yearly' | 'monthly' | 'custom';
  description?: string;
  emoji?: string;
}

export interface LoveSpace {
  id: string;
  couple: Couple;
  photos: MemoryPhoto[];
  letters: LoveLetter[];
  timeline: TimelineEvent[];
  anniversaries: Anniversary[];
  theme?: {
    primaryColor?: string;
    fontStyle?: 'classic' | 'modern' | 'romantic';
  };
}

export type CreationStep = 'names' | 'anniversary' | 'story' | 'finish';

export interface CreationFormData {
  partner1Name: string;
  partner2Name: string;
  anniversary: string;
  story: string;
}
