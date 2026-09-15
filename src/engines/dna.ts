import { APPS, CATS, DNA_DIMS, DNA_PROFILES, LOC_SIGNALS, REDUNDANCY_GROUPS, DIST_APPS } from '@/data';
import { countCat } from './scores';
import type { DnaResult } from '@/types';

import { ACBrand, AC_CATEGORY_COLORS } from '@/brand/colors';

export function categoryColor(cat: string): string {
  return AC_CATEGORY_COLORS[cat] ?? ACBrand.indigo;
}

export function computeDna(apps: string[]): DnaResult {
  const n = apps.length;
  const dimensions: DnaResult['dimensions'] = {};
  DNA_DIMS.forEach((d) => {
    const cnt = apps.filter((nm) => {
      const a = APPS.find((x) => x.n === nm);
      return a && (d.cats as readonly string[]).includes(a.c);
    }).length;
    dimensions[d.id] = { cnt, pct: Math.min(100, Math.round((cnt / Math.max(1, n)) * 300)) };
  });

  let profile = DNA_PROFILES[DNA_PROFILES.length - 1];
  if (n < 400) {
    for (const p of DNA_PROFILES.slice(0, -1)) {
      const cnt = p.min
        ? apps.filter((nm) => {
            const a = APPS.find((x) => x.n === nm);
            return a && a.c === p.min;
          }).length
        : 0;
      if (cnt >= p.thresh) profile = p;
    }
  }

  const categoryCounts: Record<string, number> = {};
  apps.forEach((nm) => {
    const a = APPS.find((x) => x.n === nm);
    if (a) categoryCounts[a.c] = (categoryCounts[a.c] ?? 0) + 1;
  });

  const locations = LOC_SIGNALS.filter((loc) => {
    const cnt = loc.apps.filter((a) => apps.includes(a)).length;
    return cnt >= loc.min;
  }).map((loc) => ({
    emoji: loc.emoji,
    name: loc.name,
    count: loc.apps.filter((a) => apps.includes(a)).length,
  }));

  const redundancies = REDUNDANCY_GROUPS.map((g) => ({
    label: g.label,
    found: g.apps.filter((a) => apps.includes(a)),
  })).filter((r) => r.found.length > 1);

  const distractions = [...DIST_APPS].filter((a) => apps.includes(a));

  const recommendations: string[] = [];
  if (countCat(apps, ['games']) > 15) recommendations.push(`You have ${countCat(apps, ['games'])} games — archive idle ones`);
  if (redundancies.length > 3) recommendations.push(`${redundancies.length} redundant app groups — consolidate to save space`);
  if (countCat(apps, ['crypto']) > 5) recommendations.push(`Create a dedicated Crypto folder for ${countCat(apps, ['crypto'])} finance apps`);
  if (distractions.length > 3) recommendations.push(`Set Screen Time limits on ${distractions.length} social apps`);
  if (!recommendations.length) recommendations.push('Your app ecosystem looks well-organized!');

  return {
    profile: { name: profile.name, emoji: profile.emoji, desc: profile.desc },
    dimensions,
    categoryCounts,
    locations,
    redundancies,
    distractions,
    recommendations,
  };
}

export function getCategoryLabel(catId: string): string {
  return CATS.find((c) => c.id === catId)?.label ?? catId;
}
