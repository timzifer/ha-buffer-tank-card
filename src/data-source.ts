import type { HomeAssistant } from 'custom-card-helpers';
import type { CardConfig, ProbeData, TankData } from './types';
import { detectMode, DEFAULT_MAX_TEMP, DEFAULT_MIN_TEMP, LAYER_COUNT } from './config';
import { buildLayers, ProbeSample } from './interpolate';

const UNAVAILABLE_STATES = new Set(['unavailable', 'unknown', 'none', '']);

function parseNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    if (UNAVAILABLE_STATES.has(value.toLowerCase())) return null;
    const n = parseFloat(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function statsForLayers(layers: number[]): { average: number | null; delta: number | null } {
  const finite = layers.filter((v) => Number.isFinite(v));
  if (finite.length === 0) return { average: null, delta: null };
  const sum = finite.reduce((a, b) => a + b, 0);
  const avg = sum / finite.length;
  const delta = Math.max(...finite) - Math.min(...finite);
  return { average: avg, delta };
}

export function resolveTankData(hass: HomeAssistant, config: CardConfig): TankData {
  const mode = detectMode(config);
  if (mode === 'A') return resolveModeA(hass, config);
  return resolveModeB(hass, config);
}

function baseErrorData(config: CardConfig, message: string): TankData {
  return {
    mode: config.entity ? 'A' : 'B',
    tank_height_mm: config.tank_height ?? 2000,
    layers: new Array(LAYER_COUNT).fill(NaN),
    probes: [],
    min_temperature: config.min_temperature ?? DEFAULT_MIN_TEMP,
    max_temperature: config.max_temperature ?? DEFAULT_MAX_TEMP,
    thermocline_position_mm: null,
    thermocline_thickness_mm: null,
    soc: null,
    average: null,
    delta: null,
    available: false,
    error: message,
  };
}

function resolveModeB(hass: HomeAssistant, config: CardConfig): TankData {
  const tankHeight = config.tank_height!;
  const probes: ProbeData[] = [];
  const samples: ProbeSample[] = [];

  for (const s of config.sensors ?? []) {
    const state = hass?.states?.[s.entity];
    const temp = state ? parseNumber(state.state) : null;
    probes.push({
      entity: s.entity,
      name: s.name ?? state?.attributes?.friendly_name ?? s.entity,
      position_mm: s.position,
      temperature: temp,
      virtual: false,
    });
    if (temp !== null) {
      samples.push({ position_mm: s.position, temperature: temp });
    }
  }

  const layers = buildLayers(samples, tankHeight, LAYER_COUNT);
  const stats = statsForLayers(layers);

  return {
    mode: 'B',
    tank_height_mm: tankHeight,
    layers,
    probes,
    min_temperature: config.min_temperature ?? DEFAULT_MIN_TEMP,
    max_temperature: config.max_temperature ?? DEFAULT_MAX_TEMP,
    thermocline_position_mm: null,
    thermocline_thickness_mm: null,
    soc: null,
    average: stats.average,
    delta: stats.delta,
    available: samples.length > 0,
    error: samples.length === 0 ? 'No probe has a valid temperature.' : undefined,
  };
}

function resolveModeA(hass: HomeAssistant, config: CardConfig): TankData {
  const entityId = config.entity!;
  const state = hass?.states?.[entityId];
  if (!state) {
    return baseErrorData(config, `Entity ${entityId} not found.`);
  }
  if (UNAVAILABLE_STATES.has(String(state.state).toLowerCase())) {
    return baseErrorData(config, `Entity ${entityId} is ${state.state}.`);
  }

  const attrs = state.attributes ?? {};
  const tankHeight = parseNumber(attrs.tank_height_mm);
  if (tankHeight === null || tankHeight <= 0) {
    return baseErrorData(
      config,
      `Entity ${entityId} is missing attribute tank_height_mm. Update the buffer tank integration.`,
    );
  }

  const rawLayers = Array.isArray(attrs.layers) ? attrs.layers : null;
  let layers: number[];
  if (rawLayers && rawLayers.length > 0) {
    layers = rawLayers.map((v: unknown) => {
      const n = parseNumber(v);
      return n === null ? NaN : n;
    });
  } else {
    layers = new Array(LAYER_COUNT).fill(NaN);
  }

  const probes: ProbeData[] = [];
  const rawProbes = Array.isArray(attrs.probes) ? attrs.probes : [];
  for (const p of rawProbes) {
    if (!p || typeof p !== 'object') continue;
    const pr = p as Record<string, unknown>;
    const position = parseNumber(pr.position_mm);
    if (position === null) continue;
    probes.push({
      entity:
        typeof pr.entity === 'string'
          ? pr.entity
          : typeof pr.entity_id === 'string'
            ? pr.entity_id
            : undefined,
      name: typeof pr.name === 'string' ? pr.name : undefined,
      position_mm: position,
      temperature: parseNumber(pr.temperature),
      virtual: Boolean(pr.virtual),
    });
  }

  const refTemp = parseNumber(attrs.reference_temperature);
  const minAttr = parseNumber(attrs.min_temperature);
  const maxAttr = parseNumber(attrs.max_temperature);
  const minTemp = config.min_temperature ?? minAttr ?? refTemp ?? DEFAULT_MIN_TEMP;
  const maxTemp = config.max_temperature ?? maxAttr ?? DEFAULT_MAX_TEMP;

  const soc = parseNumber(state.state);
  const stats = statsForLayers(layers);
  const tcPos = parseNumber(attrs.thermocline_position_mm);
  const tcThick = parseNumber(attrs.thermocline_thickness_mm);

  return {
    mode: 'A',
    tank_height_mm: tankHeight,
    layers,
    probes,
    min_temperature: minTemp,
    max_temperature: maxTemp,
    reference_temperature: refTemp ?? undefined,
    thermocline_position_mm: tcPos,
    thermocline_thickness_mm: tcThick,
    soc,
    average: stats.average,
    delta: stats.delta,
    available: layers.some((l) => Number.isFinite(l)),
    error: undefined,
  };
}
