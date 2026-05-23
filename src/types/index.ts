export type Screen =
  | 'home'
  | 'yearDetail'
  | 'comparison'
  | 'archive'
  | 'hotspots'
  | 'manage'
  | 'uploadFlow';

export type MemoryType =
  | 'Match'
  | 'Event'
  | 'Athletics'
  | 'Concert'
  | 'Opening'
  | 'Demolition'
  | 'Tournament'
  | 'Other';

export interface YearData {
  year: number;
  eraName: string;
  eraSubtitle: string;
  description: string;
  keyMoments: string[];
}

export interface Submission {
  id: string;
  year: number;
  title: string;
  memory: string;
  type: MemoryType;
  author: string;
  authorInitials: string;
  likes: number;
  photo?: string;
}

export interface Era {
  id: string;
  label: string;
  range: string;
  description: string;
  years: number[];
}

export interface HotspotSection {
  id: string;
  name: string;
  x: number;
  y: number;
  currentEra: string;
  description: string;
  periods: { label: string; active: boolean }[];
}

export interface Tweaks {
  showStatusBar: boolean;
  grain: boolean;
  theme: 'dark';
  accent: string;
}
