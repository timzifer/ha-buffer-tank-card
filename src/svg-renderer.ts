import { svg, SVGTemplateResult } from 'lit';
import type { CardConfig, HeatExchangerData, ProbeData, TankData } from './types';
import {
  DEFAULT_COLOR_COLD,
  DEFAULT_COLOR_HOT,
  resolveProbeSide,
  resolveShowStats,
} from './config';
import { clamp, hexLerp, temperatureToColor } from './colors';

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
  coilGradientId: string;
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
  const heatExchanger = data.heat_exchanger
    ? renderHeatExchanger(data.heat_exchanger, minT, maxT, cold, hot, opts.coilGradientId)
    : null;
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
      ${heatExchanger}
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
    const name = probe.name ?? probe.entity ?? 'Probe';
    const temp = probe.temperature;
    const tempStr =
      temp === null || !Number.isFinite(temp) ? 'n/a' : `${temp.toFixed(1)} °C`;

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
        y="${y - 1}"
        text-anchor="${textAnchor}"
        font-size="9"
        fill="var(--primary-text-color, #222)"
        paint-order="stroke"
        stroke="var(--card-background-color, #fff)"
        stroke-width="2"
      >${name}</text>
      <text
        x="${labelX}"
        y="${y + 9}"
        text-anchor="${textAnchor}"
        font-size="9"
        font-weight="600"
        fill="var(--primary-text-color, #222)"
        paint-order="stroke"
        stroke="var(--card-background-color, #fff)"
        stroke-width="2"
      >${tempStr}</text>
    `);
  });

  return elements;
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

interface CoilPoint {
  x: number;
  y: number;
  front: boolean;
}

function buildCoilGeometry(hx: HeatExchangerData): {
  regionTop: number;
  regionBottom: number;
  cx: number;
  rx: number;
  ry: number;
  points: CoilPoint[];
} {
  const turns = Math.max(1, Math.round(hx.turns));
  const frac = clamp(hx.height_fraction, 0.05, 1);
  const margin = 10;
  const available = TANK_H - 2 * margin;
  const regionH = Math.max(40, Math.min(available, TANK_H * frac));
  const regionTop =
    hx.position === 'top' ? TANK_TOP + margin : TANK_BOTTOM - margin - regionH;
  const regionBottom = regionTop + regionH;

  const cx = TANK_X + TANK_W / 2;
  const rx = TANK_W * 0.36;
  const ry = Math.max(4, Math.min(10, regionH / (turns * 4)));
  const pitch = (regionH - 2 * ry) / turns;

  const samplesPerTurn = 48;
  const total = turns * samplesPerTurn;
  const points: CoilPoint[] = [];
  for (let i = 0; i <= total; i++) {
    const t = i / samplesPerTurn;
    const theta = 2 * Math.PI * t;
    const x = cx + rx * Math.cos(theta);
    const y = regionTop + ry + t * pitch + ry * Math.sin(theta);
    points.push({ x, y, front: Math.sin(theta) > 0 });
  }
  return { regionTop, regionBottom, cx, rx, ry, points };
}

function pointsToPath(pts: { x: number; y: number }[]): string {
  return pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ');
}

function splitCoilPaths(points: CoilPoint[]): { front: string[]; back: string[] } {
  const front: string[] = [];
  const back: string[] = [];
  if (points.length === 0) return { front, back };

  let runFront = points[0].front;
  let run: CoilPoint[] = [points[0]];
  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    if (p.front === runFront) {
      run.push(p);
    } else {
      run.push(p);
      (runFront ? front : back).push(pointsToPath(run));
      run = [p];
      runFront = p.front;
    }
  }
  if (run.length > 1) {
    (runFront ? front : back).push(pointsToPath(run));
  }
  return { front, back };
}

function renderHeatExchanger(
  hx: HeatExchangerData,
  minT: number,
  maxT: number,
  cold: string,
  hot: string,
  gradientId: string,
): SVGTemplateResult {
  const geom = buildCoilGeometry(hx);
  const { regionTop, regionBottom, points } = geom;
  const { front, back } = splitCoilPaths(points);

  if (!hx.enabled) {
    const frameStroke = 'var(--primary-text-color, #444)';
    return svg`
      <g class="buffer-tank-hx buffer-tank-hx--disabled" opacity="0.45" pointer-events="none">
        ${back.map(
          (d) => svg`
          <path
            d="${d}"
            fill="none"
            stroke="${frameStroke}"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-dasharray="2 2"
            opacity="0.55"
          />`,
        )}
        ${front.map(
          (d) => svg`
          <path
            d="${d}"
            fill="none"
            stroke="${frameStroke}"
            stroke-width="1.6"
            stroke-linecap="round"
          />`,
        )}
      </g>
    `;
  }

  const supplyT = hx.supply_temperature;
  const returnT = hx.return_temperature;
  const mid = hexLerp(cold, hot, 0.5);
  const supplyColor =
    supplyT !== null && Number.isFinite(supplyT)
      ? temperatureToColor(supplyT, minT, maxT, cold, hot)
      : mid;
  const returnColor =
    returnT !== null && Number.isFinite(returnT)
      ? temperatureToColor(returnT, minT, maxT, cold, hot)
      : mid;

  return svg`
    <defs>
      <linearGradient
        id="${gradientId}"
        gradientUnits="userSpaceOnUse"
        x1="0"
        y1="${regionTop}"
        x2="0"
        y2="${regionBottom}"
      >
        <stop offset="0" stop-color="${supplyColor}" />
        <stop offset="1" stop-color="${returnColor}" />
      </linearGradient>
    </defs>
    <g class="buffer-tank-hx" pointer-events="none">
      ${back.map(
        (d) => svg`
        <path
          d="${d}"
          fill="none"
          stroke="url(#${gradientId})"
          stroke-width="3"
          stroke-linecap="round"
          opacity="0.4"
        />`,
      )}
      ${front.map(
        (d) => svg`
        <path
          d="${d}"
          fill="none"
          stroke="url(#${gradientId})"
          stroke-width="4"
          stroke-linecap="round"
          opacity="0.95"
        />`,
      )}
      ${front.map(
        (d) => svg`
        <path
          d="${d}"
          fill="none"
          stroke="var(--primary-text-color, #222)"
          stroke-width="0.6"
          stroke-linecap="round"
          opacity="0.35"
        />`,
      )}
    </g>
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
