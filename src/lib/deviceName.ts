/** Normalize raw device / model slugs to Apple-style display names. */
export function normalizeDeviceName(raw: string): string {
  const s = String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, '');

  if (!s) return '';

  const known: Record<string, string> = {
    iphone: 'iPhone',
    ipad: 'iPad',
    mac: 'Mac',
    iphone16promax: 'iPhone 16 Pro Max',
    iphone16pro: 'iPhone 16 Pro',
    iphone16: 'iPhone 16',
    iphone15promax: 'iPhone 15 Pro Max',
    iphone15pro: 'iPhone 15 Pro',
    iphone15: 'iPhone 15',
    iphone14promax: 'iPhone 14 Pro Max',
    iphone14pro: 'iPhone 14 Pro',
    iphone14: 'iPhone 14',
    iphonese3: 'iPhone SE (3rd Gen)',
    ipadpro13m4: 'iPad Pro 13" M4',
    ipadpro11m4: 'iPad Pro 11" M4',
    ipadair13m2: 'iPad Air 13" M2',
    ipadmini7: 'iPad mini 7',
    mbp16m4: 'MacBook Pro 16" M4',
    mbp14m4: 'MacBook Pro 14" M4',
    mba15m3: 'MacBook Air 15" M3',
    mba13m3: 'MacBook Air 13" M3',
    imac24m3: 'iMac 24" M3',
    macmini: 'Mac mini M4',
  };

  if (known[s]) return known[s];

  // Generic: "iphone 16promax" / "iphone16 pro max" style
  let out = s
    .replace(/^iphone/, 'iPhone ')
    .replace(/^ipad/, 'iPad ')
    .replace(/^mbp/, 'MacBook Pro ')
    .replace(/^mba/, 'MacBook Air ')
    .replace(/^imac/, 'iMac ')
    .replace(/^macmini/, 'Mac mini ')
    .replace(/^mac/, 'Mac ');

  out = out
    .replace(/(\d+)(pro)(max)/g, '$1 Pro Max')
    .replace(/(\d+)(pro)/g, '$1 Pro')
    .replace(/(\d+)(air)/g, '$1 Air')
    .replace(/(\d+)(mini)/g, '$1 mini')
    .replace(/m(\d+)/g, 'M$1')
    .replace(/\s+/g, ' ')
    .trim();

  return out || raw;
}
