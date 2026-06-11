import { countCat } from './scores';

export function smartReply(q: string, apps: string[]): string {
  const ql = q.toLowerCase();
  const n = apps.length;
  if (!n) return 'Import your apps first!';

  if (ql.includes('delet') || ql.includes('remov')) {
    const games = countCat(apps, ['games']);
    const idle = apps.filter((nm) => nm.toLowerCase().includes('idle'));
    return `For your ${n} apps, consider deleting: idle games (${idle.slice(0, 4).join(', ')}), duplicate apps, and anything unused. You have ${games} games — archiving the idle ones would help most.`;
  }
  if (ql.includes('distract')) {
    const DIST = ['TikTok', 'Instagram', 'Facebook', 'Twitter/X', 'Reddit'];
    const found = DIST.filter((a) => apps.includes(a));
    return `Your top distractions: ${found.join(', ')}. Set Screen Time limits — max 30 min/day for each social app.`;
  }
  if (ql.includes('organ') || ql.includes('folder')) {
    return `For ${n} apps: Create ${Math.ceil(n / 9)} themed folders. Page 1: Top 9 most-used apps + dock. Page 2: Folders (Finance, Social, Health, Work, Travel, Games, Deen, Tools). App Library: everything else. Your ${countCat(apps, ['crypto'])} crypto apps need their own folder.`;
  }
  if (ql.includes('say about') || ql.includes('profile')) {
    const c = countCat(apps, ['crypto']);
    const g = countCat(apps, ['games']);
    const s = countCat(apps, ['social', 'messaging']);
    const t = countCat(apps, ['travel']);
    return `Your ${n} apps: ${c} crypto/finance, ${g} games, ${s} social/messaging, ${t} travel. Profile: Multi-country digital power user — UK, Pakistan, UAE presence detected.`;
  }
  if (ql.includes('crypto')) return `You have ${countCat(apps, ['crypto'])} crypto apps. Keep Binance + CoinGlass + TradingView accessible. Move the rest to a Crypto folder.`;
  if (ql.includes('game')) return `You have ${countCat(apps, ['games'])} games. Move all to a Games folder on page 3+. Idle games especially are time sinks — archive or delete them.`;
  if (ql.includes('bank')) return 'You have UK banks (Barclays, HSBC, Lloyds), Pakistan banks (JazzCash, Easypaisa, Meezan, HBL) and UAE (Mashreq). Create separate folders: UK Finance, PK Finance, UAE Banking.';
  if (ql.includes('islam') || ql.includes('prayer')) {
    const islamic = ['Muslim Pro', 'MAWAQIT', 'Islam 360', 'Dhikr & Dua', 'IslamicDua'].filter((a) => apps.includes(a)).length;
    return `Your ${islamic} Islamic apps deserve a dedicated Deen folder. Add a prayer time widget to your lockscreen too.`;
  }
  return `Based on your ${n} apps: Multi-country power user. Ask me about: delete suggestions, organizing, crypto, games, banking, travel, Islamic apps, or your profile.`;
}
