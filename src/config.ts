import type {
  CardConfig,
  CardMode,
  ColorStop,
  HeatExchangerConfig,
  SensorConfig,
} from './types';

export const DEFAULT_COLORS: readonly ColorStop[] = [
  { temperature: 20, color: '#011F9D' }, // Indigo Dye (very cold)
  { temperature: 25, color: '#0030C9' }, // Impact Blue
  { temperature: 30, color: '#659CFB' }, // Cornflower Blue
  { temperature: 35, color: '#CAE6FF' }, // Andrea (neutral)
  { temperature: 50, color: '#FB623A' }, // Premium Orange
  { temperature: 80, color: '#F12710' }, // Strong Vermillion (hot)
];
export const DEFAULT_MIN_TEMP = 20;
export const DEFAULT_MAX_TEMP = 80;
export const LAYER_COUNT = 100;

const HEX_COLOR_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export class ConfigError extends Error {}

export function detectMode(config: CardConfig): CardMode {
  if (config.entity) return 'A';
  if (config.sensors && config.tank_height) return 'B';
  throw new ConfigError(
    'Configure either `entity` (Mode A) or `sensors` + `tank_height` (Mode B).',
  );
}

function parseFlowSpeed(raw: unknown): number | string {
  if (typeof raw === 'number') {
    if (!Number.isFinite(raw) || raw < 0) {
      throw new ConfigError(
        '`heat_exchanger.flow_speed` must be a number in 0–1 (fraction) or 0–100 (percent), or an entity id.',
      );
    }
    return raw;
  }
  if (typeof raw === 'string' && raw.trim()) {
    return raw;
  }
  throw new ConfigError(
    '`heat_exchanger.flow_speed` must be a number (0–1 fraction or 0–100 percent) or an entity id string.',
  );
}

function validateHeatExchanger(raw: unknown): HeatExchangerConfig {
  if (!raw || typeof raw !== 'object') {
    throw new ConfigError('`heat_exchanger` must be an object.');
  }
  const r = raw as Record<string, unknown>;
  const out: HeatExchangerConfig = {};

  if (r.position !== undefined) {
    if (r.position !== 'top' && r.position !== 'bottom') {
      throw new ConfigError('`heat_exchanger.position` must be `top` or `bottom`.');
    }
    out.position = r.position;
  }
  if (r.supply_entity !== undefined) {
    if (typeof r.supply_entity !== 'string' || !r.supply_entity) {
      throw new ConfigError('`heat_exchanger.supply_entity` must be a non-empty string.');
    }
    out.supply_entity = r.supply_entity;
  }
  if (r.return_entity !== undefined) {
    if (typeof r.return_entity !== 'string' || !r.return_entity) {
      throw new ConfigError('`heat_exchanger.return_entity` must be a non-empty string.');
    }
    out.return_entity = r.return_entity;
  }
  if (r.enabled !== undefined) {
    if (typeof r.enabled === 'boolean') {
      out.enabled = r.enabled;
    } else if (typeof r.enabled === 'string' && r.enabled) {
      out.enabled = r.enabled;
    } else {
      throw new ConfigError(
        '`heat_exchanger.enabled` must be a boolean or a non-empty entity id.',
      );
    }
  }
  if (r.reverse_flow !== undefined) {
    if (typeof r.reverse_flow === 'boolean') {
      out.reverse_flow = r.reverse_flow;
    } else if (typeof r.reverse_flow === 'string' && r.reverse_flow) {
      out.reverse_flow = r.reverse_flow;
    } else {
      throw new ConfigError(
        '`heat_exchanger.reverse_flow` must be a boolean or a non-empty entity id.',
      );
    }
  }
  if (r.turns !== undefined) {
    if (typeof r.turns !== 'number' || !Number.isFinite(r.turns) || r.turns < 1) {
      throw new ConfigError('`heat_exchanger.turns` must be a number >= 1.');
    }
    out.turns = r.turns;
  }
  if (r.height_fraction !== undefined) {
    if (
      typeof r.height_fraction !== 'number' ||
      !Number.isFinite(r.height_fraction) ||
      r.height_fraction <= 0 ||
      r.height_fraction > 1
    ) {
      throw new ConfigError('`heat_exchanger.height_fraction` must be a number in (0, 1].');
    }
    out.height_fraction = r.height_fraction;
  }
  if (r.flow_animation !== undefined) {
    if (typeof r.flow_animation !== 'boolean') {
      throw new ConfigError('`heat_exchanger.flow_animation` must be a boolean.');
    }
    out.flow_animation = r.flow_animation;
  }
  if (r.flow_speed !== undefined) {
    out.flow_speed = parseFlowSpeed(r.flow_speed);
  }
  if (r.flow_color !== undefined) {
    if (typeof r.flow_color !== 'string' || !r.flow_color.trim()) {
      throw new ConfigError('`heat_exchanger.flow_color` must be a non-empty CSS color string.');
    }
    out.flow_color = r.flow_color;
  }
  if (r.name !== undefined) {
    if (typeof r.name !== 'string') {
      throw new ConfigError('`heat_exchanger.name` must be a string.');
    }
    out.name = r.name;
  }

  return out;
}

function validateSensor(sensor: unknown, index: number): SensorConfig {
  if (!sensor || typeof sensor !== 'object') {
    throw new ConfigError(`sensors[${index}] must be an object.`);
  }
  const s = sensor as Record<string, unknown>;
  if (typeof s.entity !== 'string' || !s.entity) {
    throw new ConfigError(`sensors[${index}].entity is required.`);
  }
  if (typeof s.position !== 'number' || !Number.isFinite(s.position)) {
    throw new ConfigError(`sensors[${index}].position must be a number (mm from bottom).`);
  }
  const result: SensorConfig = { entity: s.entity, position: s.position };
  if (typeof s.name === 'string') result.name = s.name;
  return result;
}

function parseColorKey(key: unknown): number {
  if (typeof key === 'number' && Number.isFinite(key)) return key;
  if (typeof key === 'string') {
    const n = parseFloat(key);
    if (Number.isFinite(n)) return n;
  }
  throw new ConfigError(
    `colors keys must be numeric temperatures (e.g. \`35: "#CAE6FF"\`); got \`${String(key)}\`.`,
  );
}

function validateColors(raw: unknown): ColorStop[] {
  if (Array.isArray(raw)) {
    throw new ConfigError(
      '`colors` must be a map of temperature → hex color (e.g. `colors: { 20: "#011F9D", 35: "#CAE6FF", 80: "#F12710" }`). The legacy list form was removed.',
    );
  }
  if (!raw || typeof raw !== 'object') {
    throw new ConfigError(
      '`colors` must be a map of temperature → hex color (e.g. `colors: { 20: "#011F9D", 35: "#CAE6FF", 80: "#F12710" }`).',
    );
  }
  const entries = Object.entries(raw as Record<string, unknown>);
  if (entries.length < 2) {
    throw new ConfigError('`colors` must contain at least two temperature → color entries.');
  }
  const stops: ColorStop[] = entries.map(([key, value]) => {
    const temperature = parseColorKey(key);
    if (typeof value !== 'string' || !HEX_COLOR_RE.test(value)) {
      throw new ConfigError(
        `colors[${key}] must be a hex color string like "#1976d2" or "#abc".`,
      );
    }
    return { temperature, color: value };
  });
  stops.sort((a, b) => a.temperature - b.temperature);
  for (let i = 1; i < stops.length; i++) {
    if (stops[i].temperature === stops[i - 1].temperature) {
      throw new ConfigError(
        `colors contains duplicate temperature ${stops[i].temperature}. Use unique keys.`,
      );
    }
  }
  return stops;
}

export function validateConfig(config: unknown): CardConfig {
  if (!config || typeof config !== 'object') {
    throw new ConfigError('Invalid configuration object.');
  }
  const c = config as Record<string, unknown>;
  const out: CardConfig = { type: String(c.type ?? 'custom:buffer-tank-card') };

  if (typeof c.entity === 'string' && c.entity) {
    out.entity = c.entity;
  }

  if (c.sensors !== undefined) {
    if (!Array.isArray(c.sensors)) {
      throw new ConfigError('`sensors` must be a list.');
    }
    if (c.sensors.length < 1) {
      throw new ConfigError('`sensors` must contain at least one entry.');
    }
    out.sensors = c.sensors.map((s, i) => validateSensor(s, i));
  }

  if (c.tank_height !== undefined) {
    if (typeof c.tank_height !== 'number' || c.tank_height <= 0) {
      throw new ConfigError('`tank_height` must be a positive number (mm).');
    }
    out.tank_height = c.tank_height;
  }

  if (out.sensors && out.tank_height) {
    for (const s of out.sensors) {
      if (s.position < 0 || s.position > out.tank_height) {
        throw new ConfigError(
          `Sensor ${s.entity} position ${s.position} must be between 0 and tank_height (${out.tank_height}).`,
        );
      }
    }
  }

  if (c.min_temperature !== undefined) {
    if (typeof c.min_temperature !== 'number') {
      throw new ConfigError('`min_temperature` must be a number.');
    }
    out.min_temperature = c.min_temperature;
  }
  if (c.max_temperature !== undefined) {
    if (typeof c.max_temperature !== 'number') {
      throw new ConfigError('`max_temperature` must be a number.');
    }
    out.max_temperature = c.max_temperature;
  }

  if (c.color_hot !== undefined || c.color_cold !== undefined) {
    throw new ConfigError(
      '`color_hot` and `color_cold` were replaced by `colors` (map of temperature → hex color). Example: `colors: { 20: "#011F9D", 35: "#CAE6FF", 80: "#F12710" }`.',
    );
  }

  if (c.colors !== undefined) {
    out.colors = validateColors(c.colors);
  }

  if (c.probe_side !== undefined) {
    if (c.probe_side !== 'left' && c.probe_side !== 'right' && c.probe_side !== 'alternating') {
      throw new ConfigError('`probe_side` must be one of: left, right, alternating.');
    }
    out.probe_side = c.probe_side;
  }

  if (typeof c.show_stats === 'boolean') out.show_stats = c.show_stats;
  if (typeof c.show_thermocline === 'boolean') out.show_thermocline = c.show_thermocline;
  if (typeof c.name === 'string') out.name = c.name;

  for (const key of ['soc_entity', 'average_entity', 'delta_entity'] as const) {
    const v = c[key];
    if (v !== undefined) {
      if (typeof v !== 'string' || !v) {
        throw new ConfigError(`\`${key}\` must be a non-empty entity id string.`);
      }
      out[key] = v;
    }
  }

  if (c.heat_exchanger !== undefined) {
    out.heat_exchanger = validateHeatExchanger(c.heat_exchanger);
  }

  if (c.tap_action) out.tap_action = c.tap_action as CardConfig['tap_action'];
  if (c.hold_action) out.hold_action = c.hold_action as CardConfig['hold_action'];
  if (c.double_tap_action) out.double_tap_action = c.double_tap_action as CardConfig['double_tap_action'];

  // run detection to throw early if neither mode is configured
  detectMode(out);

  return out;
}

export function resolveColors(config: CardConfig): ColorStop[] {
  return config.colors ?? DEFAULT_COLORS.map((s) => ({ ...s }));
}

export function resolveProbeSide(config: CardConfig): 'left' | 'right' | 'alternating' {
  return config.probe_side ?? 'alternating';
}

export function resolveShowStats(config: CardConfig): boolean {
  return config.show_stats ?? true;
}

export const DEFAULT_HX_TURNS = 6;
export const DEFAULT_HX_HEIGHT_FRACTION = 0.35;
export const DEFAULT_HX_POSITION: 'top' | 'bottom' = 'bottom';
export const DEFAULT_HX_FLOW_ANIMATION = false;
export const DEFAULT_HX_FLOW_SPEED = 0.5;
export const DEFAULT_HX_FLOW_COLOR = 'rgba(255,255,255,0.55)';

// Minimum/maximum duration (seconds) at the ends of the 0–1 speed range.
export const FLOW_MIN_DURATION_S = 0.5;
export const FLOW_MAX_DURATION_S = 20;

/**
 * Normalize a raw numeric speed value to a 0–1 fraction.
 * Values ≤ 1 are treated as fractions, values > 1 as percentages (0–100).
 */
export function normalizeSpeedFraction(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  const fraction = value <= 1 ? value : value / 100;
  if (fraction <= 0) return 0;
  if (fraction >= 1) return 1;
  return fraction;
}

/**
 * Convert a 0–1 speed fraction into an animation duration in seconds.
 * 0 → stopped (returns FLOW_MAX_DURATION_S), 1 → FLOW_MIN_DURATION_S.
 */
export function speedFractionToDuration(fraction: number): number {
  const f = fraction <= 0 ? 0 : fraction >= 1 ? 1 : fraction;
  return FLOW_MAX_DURATION_S - f * (FLOW_MAX_DURATION_S - FLOW_MIN_DURATION_S);
}

export function resolveHeatExchangerDefaults(hx: HeatExchangerConfig): {
  position: 'top' | 'bottom';
  turns: number;
  height_fraction: number;
  flow_animation: boolean;
  flow_color: string;
} {
  return {
    position: hx.position ?? DEFAULT_HX_POSITION,
    turns: hx.turns ?? DEFAULT_HX_TURNS,
    height_fraction: hx.height_fraction ?? DEFAULT_HX_HEIGHT_FRACTION,
    flow_animation: hx.flow_animation ?? DEFAULT_HX_FLOW_ANIMATION,
    flow_color: hx.flow_color ?? DEFAULT_HX_FLOW_COLOR,
  };
}
