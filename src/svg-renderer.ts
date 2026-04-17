import { svg, SVGTemplateResult } from 'lit';
import type { CardConfig, ProbeData, TankData } from './types';
import {
  DEFAULT_COLOR_COLD,
  DEFAULT_COLOR_HOT,
  resolveProbeSide,
  resolveShowStats,
} from './config';
import { clamp, hexLerp } from './colors';

const VIEW_W = 200;
const VIEW_H = 400;
const TANK_X = 40;
const TANK_Y = 20;
const TANK_W = 120;
const TANK_H = 360;
const TANK_LEFT = TANK_X;
const TANK_RIGHT = TANK_X + TANK_W;
const TANK_TOP = TANK_Y;
const TANK_BOTTOM = TANK_Y + TANK_H;
const TANK_RX = 14;
const PROBE_TICK = 10;

export interface RenderOptions {
  gradientId: string;
  hatchId: string;
  showThermocline: boolean;
}

export function renderTank(
  data: TankData,
  config: CardConfig,
  opts: RenderOptions,
): SVGTemplateResult {
  const cold = config.color_cold ?? DEFAULT_COLOR_COLD;
  const hot = config.color_hot ?? DEFAULT_COLOR_HOT;
  const minT = data.min_temperature;
  const maxT = data.max_temperature;
  const sameRange = minT === maxT;
  const showStats = resolveShowStats(config);

  const stops = buildGradientStops(data.layers, minT, maxT, cold, hot, sameRange);
  const probeElements = renderProbes(data.probes, data.tank_height_mm, config);
  const thermocline = opts.showThermocline ? renderThermocline(data, opts.hatchId) : null;
  const stats = showStats ? renderStats(data) : null;

  return svg`
    <svg
      viewBox="0 0 ${VIEW_W} ${VIEW_H}"
      preserveAspectRatio="xMidYMid meet"
      class="buffer-tank-svg"
      role="img"
      aria-label="Buffer tank"
    >
      <defs>
        <linearGradient id="${opts.gradientId}" x1="0" y1="1" x2="0" y2="0">
          ${stops}
        </linearGradient>
        ${opts.showThermocline
          ? svg`
        <pattern id="${opts.hatchId}" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(0,0,0,0.35)" stroke-width="2" />
        </pattern>`
          : null}
      </defs>
      <rect
        x="${TANK_X}"
        y="${TANK_Y}"
        width="${TANK_W}"
        height="${TANK_H}"
        rx="${TANK_RX}"
        ry="${TANK_RX}"
        fill="url(#${opts.gradientId})"
        stroke="var(--primary-text-color, #222)"
        stroke-width="1.5"
      />
      ${thermocline}
      ${probeElements}
      ${stats}
    </svg>
  `;
}

function buildGradientStops(
  layers: number[],
  minT: number,
  maxT: number,
  cold: string,
  hot: string,
  sameRange: boolean,
): SVGTemplateResult[] {
  const n = layers.length;
  if (n === 0) return [];
  const stops: SVGTemplateResult[] = [];
  for (let i = 0; i < n; i++) {
    const temp = layers[i];
    let color: string;
    if (!Number.isFinite(temp)) {
      color = hexLerp(cold, hot, 0.5);
    } else if (sameRange) {
      color = hexLerp(cold, hot, 0.5);
    } else {
      const t = clamp((temp - minT) / (maxT - minT), 0, 1);
      color = hexLerp(cold, hot, t);
    }
    const offset = n === 1 ? 0 : i / (n - 1);
    stops.push(svg`<stop offset="${offset}" stop-color="${color}" />`);
  }
  return stops;
}

function positionToY(positionMm: number, tankHeightMm: number): number {
  const clamped = clamp(positionMm, 0, tankHeightMm);
  const frac = tankHeightMm > 0 ? clamped / tankHeightMm : 0;
  return TANK_TOP + TANK_H * (1 - frac);
}

function renderProbes(
  probes: ProbeData[],
  tankHeightMm: number,
  config: CardConfig,
): SVGTemplateResult[] {
  if (probes.length === 0) return [];
  const side = resolveProbeSide(config);
  const sorted = probes.slice().sort((a, b) => b.position_mm - a.position_mm);
  const elements: SVGTemplateResult[] = [];

  sorted.forEach((probe, i) => {
    let onLeft: boolean;
    if (side === 'left') onLeft = true;
    else if (side === 'right') onLeft = false;
    else onLeft = i % 2 === 0;

    const y = positionToY(probe.position_mm, tankHeightMm);
    const lineX1 = onLeft ? TANK_LEFT : TANK_RIGHT;
    const lineX2 = onLeft ? TANK_LEFT + PROBE_TICK : TANK_RIGHT - PROBE_TICK;
    const labelX = onLeft ? TANK_LEFT - 4 : TANK_RIGHT + 4;
    const textAnchor = onLeft ? 'end' : 'start';
    const label = formatProbeLabel(probe);

    elements.push(svg`
      <line
        x1="${lineX1}"
        y1="${y}"
        x2="${lineX2}"
        y2="${y}"
        stroke="var(--primary-text-color, #222)"
        stroke-width="1.5"
        stroke-dasharray="${probe.virtual ? '2 2' : 'none'}"
      />
      <text
        x="${labelX}"
        y="${y + 3}"
        text-anchor="${textAnchor}"
        font-size="9"
        fill="var(--primary-text-color, #222)"
        paint-order="stroke"
        stroke="var(--card-background-color, #fff)"
        stroke-width="2"
      >${label}</text>
    `);
  });

  return elements;
}

function formatProbeLabel(probe: ProbeData): string {
  const name = probe.name ?? probe.entity ?? 'Probe';
  const temp = probe.temperature;
  const tempStr = temp === null || !Number.isFinite(temp) ? 'n/a' : `${temp.toFixed(1)} °C`;
  return `${name}: ${tempStr}`;
}

function renderThermocline(data: TankData, hatchId: string): SVGTemplateResult | null {
  const pos = data.thermocline_position_mm;
  const thick = data.thermocline_thickness_mm;
  if (pos === null || thick === null || !Number.isFinite(pos) || !Number.isFinite(thick)) {
    return null;
  }
  if (thick <= 0 || data.tank_height_mm <= 0) return null;

  const scale = TANK_H / data.tank_height_mm;
  const heightPx = Math.max(2, thick * scale);
  const centerY = positionToY(pos, data.tank_height_mm);
  const y = centerY - heightPx / 2;
  const clampedY = Math.max(TANK_TOP, Math.min(TANK_BOTTOM - heightPx, y));

  return svg`
    <rect
      x="${TANK_X + 1}"
      y="${clampedY}"
      width="${TANK_W - 2}"
      height="${heightPx}"
      fill="url(#${hatchId})"
      pointer-events="none"
    />
  `;
}

function renderStats(data: TankData): SVGTemplateResult | null {
  const lines: string[] = [];
  if (data.mode === 'A' && data.soc !== null && Number.isFinite(data.soc)) {
    lines.push(`SoC: ${data.soc.toFixed(0)} %`);
  }
  if (data.average !== null) {
    lines.push(`Ø ${data.average.toFixed(1)} °C`);
  }
  if (data.delta !== null) {
    lines.push(`Δ ${data.delta.toFixed(1)} K`);
  }
  if (lines.length === 0) return null;

  const cx = TANK_X + TANK_W / 2;
  const baseY = TANK_TOP + TANK_H / 2 - ((lines.length - 1) * 18) / 2;

  return svg`
    <g font-family="var(--paper-font-body1_-_font-family, sans-serif)" text-anchor="middle"
       paint-order="stroke" stroke="#ffffff" stroke-width="3" fill="#000000">
      ${lines.map(
        (line, i) => svg`
          <text x="${cx}" y="${baseY + i * 18}" font-size="16" font-weight="600">${line}</text>
        `,
      )}
    </g>
  `;
}
