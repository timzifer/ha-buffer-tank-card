import type { ActionConfig } from 'custom-card-helpers';

export type ProbeSide = 'left' | 'right' | 'alternating';

export interface SensorConfig {
  entity: string;
  name?: string;
  position: number;
}

export interface CardConfig {
  type: string;
  entity?: string;
  tank_height?: number;
  sensors?: SensorConfig[];
  min_temperature?: number;
  max_temperature?: number;
  color_hot?: string;
  color_cold?: string;
  probe_side?: ProbeSide;
  show_stats?: boolean;
  show_thermocline?: boolean;
  name?: string;
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
  error?: string;
}
