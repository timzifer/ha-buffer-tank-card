import type { ActionConfig } from 'custom-card-helpers';

export type ProbeSide = 'left' | 'right' | 'alternating';

export type HeatExchangerPosition = 'top' | 'bottom';

export interface SensorConfig {
  entity: string;
  name?: string;
  position: number;
}

export interface HeatExchangerConfig {
  position?: HeatExchangerPosition;
  supply_entity?: string;
  return_entity?: string;
  enabled?: boolean | string;
  reverse_flow?: boolean | string;
  turns?: number;
  height_fraction?: number;
  flow_animation?: boolean;
  flow_speed?: number | string;
  flow_color?: string;
  name?: string;
}

export interface ColorStop {
  temperature: number;
  color: string;
}

export interface CardConfig {
  type: string;
  entity?: string;
  tank_height?: number;
  sensors?: SensorConfig[];
  min_temperature?: number;
  max_temperature?: number;
  colors?: ColorStop[];
  probe_side?: ProbeSide;
  show_stats?: boolean;
  show_thermocline?: boolean;
  heat_exchanger?: HeatExchangerConfig;
  name?: string;
  soc_entity?: string;
  average_entity?: string;
  delta_entity?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

export type CardMode = 'A' | 'B';

export interface ProbeData {
  entity?: string;
  name?: string;
  position_mm: number;
  temperature: number | null;
  virtual: boolean;
}

export interface HeatExchangerData {
  position: HeatExchangerPosition;
  enabled: boolean;
  reverse_flow: boolean;
  turns: number;
  height_fraction: number;
  supply_temperature: number | null;
  return_temperature: number | null;
  flow_animation: boolean;
  flow_speed: number;
  flow_color: string;
  name?: string;
}

export interface TankData {
  mode: CardMode;
  tank_height_mm: number;
  layers: number[];
  probes: ProbeData[];
  min_temperature: number;
  max_temperature: number;
  reference_temperature?: number;
  thermocline_position_mm: number | null;
  thermocline_thickness_mm: number | null;
  soc: number | null;
  average: number | null;
  delta: number | null;
  available: boolean;
  heat_exchanger?: HeatExchangerData;
  error?: string;
}
