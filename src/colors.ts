import type { ColorStop } from './types';

function parseHex(hex: string): [number, number, number] {
  let h = hex.trim();
  if (h.startsWith('#')) h = h.slice(1);
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (h.length !== 6) return [128, 128, 128];
  const num = parseInt(h, 16);
  if (Number.isNaN(num)) return [128, 128, 128];
  return [(num >> 16) & 0xff, (num >> 8) & 0xff, num & 0xff];
}

function toHex(c: number): string {
  return Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0');
}

export function clamp(x: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, x));
}

export function hexLerp(cold: string, hot: string, t: number): string {
  const [r1, g1, b1] = parseHex(cold);
  const [r2, g2, b2] = parseHex(hot);
  const k = clamp(t, 0, 1);
  return `#${toHex(r1 + (r2 - r1) * k)}${toHex(g1 + (g2 - g1) * k)}${toHex(b1 + (b2 - b1) * k)}`;
}

function fallbackColor(stops: ColorStop[]): string {
  if (stops.length === 0) return '#808080';
  return stops[Math.floor(stops.length / 2)].color;
}

export function temperatureToColor(temperature: number, stops: ColorStop[]): string {
  if (stops.length === 0) return '#808080';
  if (!Number.isFinite(temperature)) return fallbackColor(stops);
  if (stops.length === 1) return stops[0].color;

  if (temperature <= stops[0].temperature) return stops[0].color;
  const last = stops[stops.length - 1];
  if (temperature >= last.temperature) return last.color;

  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (temperature >= a.temperature && temperature <= b.temperature) {
      const span = b.temperature - a.temperature;
      if (span <= 0) return a.color;
      const t = (temperature - a.temperature) / span;
      return hexLerp(a.color, b.color, t);
    }
  }
  return last.color;
}
