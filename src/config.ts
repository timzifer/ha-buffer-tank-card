import type { CardConfig, CardMode, SensorConfig } from './types';

export const DEFAULT_COLOR_HOT = '#d32f2f';
export const DEFAULT_COLOR_COLD = '#1976d2';
export const DEFAULT_MIN_TEMP = 20;
export const DEFAULT_MAX_TEMP = 80;
export const LAYER_COUNT = 100;

export class ConfigError extends Error {}

export function detectMode(config: CardConfig): CardMode {
  if (config.entity) return 'A';
  if (config.sensors && config.tank_height) return 'B';
  throw new ConfigError(
    'Configure either `entity` (Mode A) or `sensors` + `tank_height` (Mode B).',
  );
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

  if (typeof c.color_hot === 'string') out.color_hot = c.color_hot;
  if (typeof c.color_cold === 'string') out.color_cold = c.color_cold;

  if (c.probe_side !== undefined) {
    if (c.probe_side !== 'left' && c.probe_side !== 'right' && c.probe_side !== 'alternating') {
      throw new ConfigError('`probe_side` must be one of: left, right, alternating.');
    }
    out.probe_side = c.probe_side;
  }

  if (typeof c.show_stats === 'boolean') out.show_stats = c.show_stats;
  if (typeof c.show_thermocline === 'boolean') out.show_thermocline = c.show_thermocline;
  if (typeof c.name === 'string') out.name = c.name;

  if (c.tap_action) out.tap_action = c.tap_action as CardConfig['tap_action'];
  if (c.hold_action) out.hold_action = c.hold_action as CardConfig['hold_action'];
  if (c.double_tap_action) out.double_tap_action = c.double_tap_action as CardConfig['double_tap_action'];

  // run detection to throw early if neither mode is configured
  detectMode(out);

  return out;
}

export function resolveColors(config: CardConfig): { hot: string; cold: string } {
  return {
    hot: config.color_hot ?? DEFAULT_COLOR_HOT,
    cold: config.color_cold ?? DEFAULT_COLOR_COLD,
  };
}

export function resolveProbeSide(config: CardConfig): 'left' | 'right' | 'alternating' {
  return config.probe_side ?? 'alternating';
}

export function resolveShowStats(config: CardConfig): boolean {
  return config.show_stats ?? true;
}
