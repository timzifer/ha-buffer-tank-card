import type { CardConfig, CardMode, HeatExchangerConfig, SensorConfig } from './types';

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

export const DEFAULT_HX_TURNS = 6;
export const DEFAULT_HX_HEIGHT_FRACTION = 0.35;
export const DEFAULT_HX_POSITION: 'top' | 'bottom' = 'bottom';

export function resolveHeatExchangerDefaults(hx: HeatExchangerConfig): {
  position: 'top' | 'bottom';
  turns: number;
  height_fraction: number;
} {
  return {
    position: hx.position ?? DEFAULT_HX_POSITION,
    turns: hx.turns ?? DEFAULT_HX_TURNS,
    height_fraction: hx.height_fraction ?? DEFAULT_HX_HEIGHT_FRACTION,
  };
}
