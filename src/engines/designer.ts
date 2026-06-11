import { DRECS } from '@/data';

export type AestheticKey = keyof typeof DRECS;

export function getLayoutRecommendation(aesthetic: string): string {
  const key = aesthetic as AestheticKey;
  return DRECS[key] ?? DRECS.minimal;
}

export const AESTHETICS = [
  'minimal', 'cyber', 'luxury', 'creative', 'soft', 'nature', 'retro',
  'founder', 'islamic', 'crypto', 'photographer', 'student',
] as const;

export const IPHONE_MODELS = [
  { value: 'iphone16promax', label: 'iPhone 16 Pro Max — 6.9" · Dynamic Island' },
  { value: 'iphone16pro', label: 'iPhone 16 Pro — 6.3" · Dynamic Island' },
  { value: 'iphone16', label: 'iPhone 16 — 6.1" · Dynamic Island' },
  { value: 'iphone15promax', label: 'iPhone 15 Pro Max — 6.7" · Dynamic Island' },
  { value: 'iphone14', label: 'iPhone 14 — 6.1" · Notch' },
  { value: 'iphonese3', label: 'iPhone SE (3rd Gen) — 4.7" · Home Button' },
];

export const IPAD_MODELS = [
  { value: 'ipadpro13m4', label: 'iPad Pro 13" M4' },
  { value: 'ipadpro11m4', label: 'iPad Pro 11" M4' },
  { value: 'ipadair13m2', label: 'iPad Air 13" M2' },
  { value: 'ipadmini7', label: 'iPad mini 7' },
];

export const MAC_MODELS = [
  { value: 'mbp16m4', label: 'MacBook Pro 16" M4 Pro/Max' },
  { value: 'mbp14m4', label: 'MacBook Pro 14" M4 Pro/Max' },
  { value: 'mba15m3', label: 'MacBook Air 15" M3' },
  { value: 'mba13m3', label: 'MacBook Air 13" M3' },
  { value: 'imac24m3', label: 'iMac 24" M3' },
  { value: 'macmini', label: 'Mac mini M4' },
];
