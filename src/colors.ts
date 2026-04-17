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

export function temperatureToColor(
  temperature: number,
  minTemp: number,
  maxTemp: number,
  cold: string,
  hot: string,
): string {
  if (!Number.isFinite(temperature)) return cold;
  if (maxTemp === minTemp) return hexLerp(cold, hot, 0.5);
  const t = (temperature - minTemp) / (maxTemp - minTemp);
  return hexLerp(cold, hot, clamp(t, 0, 1));
}
