import { LAYER_COUNT } from './config';

export interface ProbeSample {
  position_mm: number;
  temperature: number;
}

/**
 * Build a `count`-length array of temperatures linearly interpolated across the
 * tank height between the given probe samples. Positions above the highest
 * probe / below the lowest probe are clamped to the nearest probe value.
 *
 * The resulting array is ordered bottom-to-top: layers[0] = bottom.
 */
export function buildLayers(
  samples: ProbeSample[],
  tankHeightMm: number,
  count: number = LAYER_COUNT,
): number[] {
  const valid = samples
    .filter((s) => Number.isFinite(s.temperature) && Number.isFinite(s.position_mm))
    .slice()
    .sort((a, b) => a.position_mm - b.position_mm);

  const layers: number[] = new Array(count);
  if (valid.length === 0) {
    layers.fill(NaN);
    return layers;
  }
  if (valid.length === 1) {
    layers.fill(valid[0].temperature);
    return layers;
  }

  for (let i = 0; i < count; i++) {
    const y = (i / (count - 1)) * tankHeightMm;
    layers[i] = interpolateAt(valid, y);
  }
  return layers;
}

export function interpolateAt(samples: ProbeSample[], positionMm: number): number {
  if (samples.length === 0) return NaN;
  if (positionMm <= samples[0].position_mm) return samples[0].temperature;
  const last = samples[samples.length - 1];
  if (positionMm >= last.position_mm) return last.temperature;

  for (let i = 0; i < samples.length - 1; i++) {
    const a = samples[i];
    const b = samples[i + 1];
    if (positionMm >= a.position_mm && positionMm <= b.position_mm) {
      const span = b.position_mm - a.position_mm;
      if (span <= 0) return a.temperature;
      const t = (positionMm - a.position_mm) / span;
      return a.temperature + (b.temperature - a.temperature) * t;
    }
  }
  return last.temperature;
}
