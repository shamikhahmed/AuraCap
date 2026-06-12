/** Domain map for top apps — used with Google favicon service */
export const APP_ICON_DOMAINS: Record<string, string> = {
  Instagram: 'instagram.com',
  Facebook: 'facebook.com',
  TikTok: 'tiktok.com',
  Snapchat: 'snapchat.com',
  'Twitter/X': 'x.com',
  Threads: 'threads.net',
  LinkedIn: 'linkedin.com',
  Pinterest: 'pinterest.com',
  Reddit: 'reddit.com',
  WhatsApp: 'whatsapp.com',
  Telegram: 'telegram.org',
  Signal: 'signal.org',
  Discord: 'discord.com',
  Messenger: 'messenger.com',
  Slack: 'slack.com',
  Zoom: 'zoom.us',
  Notion: 'notion.so',
  Calendar: 'google.com',
  Todoist: 'todoist.com',
  YouTube: 'youtube.com',
  Netflix: 'netflix.com',
  'Disney+': 'disneyplus.com',
  Spotify: 'spotify.com',
  'Apple Music': 'apple.com',
  PayPal: 'paypal.com',
  Wise: 'wise.com',
  Revolut: 'revolut.com',
  Binance: 'binance.com',
  Coinbase: 'coinbase.com',
  Kraken: 'kraken.com',
  Amazon: 'amazon.com',
  'Uber Eats': 'ubereats.com',
  Deliveroo: 'deliveroo.com',
  Airbnb: 'airbnb.com',
  'Booking.com': 'booking.com',
  'Google Maps': 'google.com',
  Uber: 'uber.com',
  Gmail: 'gmail.com',
  Outlook: 'outlook.com',
  Safari: 'apple.com',
  Chrome: 'google.com',
  ChatGPT: 'openai.com',
  Claude: 'anthropic.com',
  Gemini: 'google.com',
  GitHub: 'github.com',
  'VS Code': 'code.visualstudio.com',
  Strava: 'strava.com',
  'Nike Run Club': 'nike.com',
  'MyFitnessPal': 'myfitnesspal.com',
  Duolingo: 'duolingo.com',
  Canva: 'canva.com',
  Figma: 'figma.com',
};

export function getAppIconUrl(name: string): string | null {
  const domain = APP_ICON_DOMAINS[name];
  if (!domain) return null;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

export function hasBundledIcon(name: string): boolean {
  return name in APP_ICON_DOMAINS;
}
