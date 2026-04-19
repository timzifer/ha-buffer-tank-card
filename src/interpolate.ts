import { LAYER_COUNT } from './config';

export interface ProbeSample {
  position_mm: number;
  temperature: number;
}

interface PchipSegment {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  m0: number;
  m1: number;
  h: number;
}

/**
 * Build a `count`-length array of temperatures interpolated across the tank
 * height between the given probe samples using a monotone cubic (PCHIP)
 * spline. The interpolant passes exactly through each probe, never overshoots
 * beyond the probe values (Fritsch–Carlson monotonicity correction), and with
 * two samples reduces to a straight line. Positions above the highest probe /
 * below the lowest probe are clamped to the nearest probe value.
 *
 * The resulting array is ordered bottom-to-top: layers[0] = bottom.
 */
export function buildLayers(
  samples: ProbeSample[],
  tankHeightMm: number,
  count: number = LAYER_COUNT,
): number[] {
  const valid = sortValid(samples);

  const layers: number[] = new Array(count);
  if (valid.length === 0) {
    layers.fill(NaN);
    return layers;
  }
  if (valid.length === 1) {
    layers.fill(valid[0].temperature);
    return layers;
  }

  const segments = buildPchipSegments(valid);
  for (let i = 0; i < count; i++) {
    const y = (i / (count - 1)) * tankHeightMm;
    layers[i] = evalPchip(segments, valid, y);
  }
  return layers;
}

export function interpolateAt(samples: ProbeSample[], positionMm: number): number {
  const valid = sortValid(samples);
  if (valid.length === 0) return NaN;
  if (valid.length === 1) return valid[0].temperature;
  const segments = buildPchipSegments(valid);
  return evalPchip(segments, valid, positionMm);
}

function sortValid(samples: ProbeSample[]): ProbeSample[] {
  return samples
    .filter((s) => Number.isFinite(s.temperature) && Number.isFinite(s.position_mm))
    .slice()
    .sort((a, b) => a.position_mm - b.position_mm);
}

function buildPchipSegments(samples: ProbeSample[]): PchipSegment[] {
  const n = samples.length;
  const h: number[] = new Array(n - 1);
  const d: number[] = new Array(n - 1);
  for (let k = 0; k < n - 1; k++) {
    const span = samples[k + 1].position_mm - samples[k].position_mm;
    h[k] = span;
    d[k] = span > 0 ? (samples[k + 1].temperature - samples[k].temperature) / span : 0;
  }

  const m: number[] = new Array(n);
  if (n === 2) {
    m[0] = d[0];
    m[1] = d[0];
  } else {
    m[0] = d[0];
    m[n - 1] = d[n - 2];
    for (let k = 1; k < n - 1; k++) {
      const dPrev = d[k - 1];
      const dNext = d[k];
      if (dPrev === 0 || dNext === 0 || Math.sign(dPrev) !== Math.sign(dNext)) {
        m[k] = 0;
      } else {
        m[k] = (dPrev + dNext) / 2;
      }
    }
  }

  // Fritsch–Carlson monotonicity correction.
  for (let k = 0; k < n - 1; k++) {
    if (d[k] === 0) {
      m[k] = 0;
      m[k + 1] = 0;
      continue;
    }
    const alpha = m[k] / d[k];
    const beta = m[k + 1] / d[k];
    const s = alpha * alpha + beta * beta;
    if (s > 9) {
      const tau = 3 / Math.sqrt(s);
      m[k] = tau * alpha * d[k];
      m[k + 1] = tau * beta * d[k];
    }
  }

  const segs: PchipSegment[] = new Array(n - 1);
  for (let k = 0; k < n - 1; k++) {
    segs[k] = {
      x0: samples[k].position_mm,
      x1: samples[k + 1].position_mm,
      y0: samples[k].temperature,
      y1: samples[k + 1].temperature,
      m0: m[k],
      m1: m[k + 1],
      h: h[k],
    };
  }
  return segs;
}

function evalPchip(segs: PchipSegment[], samples: ProbeSample[], x: number): number {
  const first = samples[0];
  const last = samples[samples.length - 1];
  if (x <= first.position_mm) return first.temperature;
  if (x >= last.position_mm) return last.temperature;

  for (let k = 0; k < segs.length; k++) {
    const s = segs[k];
    if (x >= s.x0 && x <= s.x1) {
      if (s.h <= 0) return s.y0;
      const t = (x - s.x0) / s.h;
      const t2 = t * t;
      const t3 = t2 * t;
      const h00 = 2 * t3 - 3 * t2 + 1;
      const h10 = t3 - 2 * t2 + t;
      const h01 = -2 * t3 + 3 * t2;
      const h11 = t3 - t2;
      return h00 * s.y0 + s.h * h10 * s.m0 + h01 * s.y1 + s.h * h11 * s.m1;
    }
  }
  return last.temperature;
}
