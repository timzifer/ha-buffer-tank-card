import { svg, SVGTemplateResult } from 'lit';
import type { CardConfig, ColorStop, HeatExchangerData, ProbeData, TankData } from './types';
import { resolveColors, resolveProbeSide, resolveShowStats } from './config';
import { clamp, temperatureToColor } from './colors';

function neutralColor(stops: ColorStop[]): string {
  if (stops.length === 0) return '#808080';
  return stops[Math.floor(stops.length / 2)].color;
}

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
  const colorStops = resolveColors(config);
  const showStats = resolveShowStats(config);

  const stops = buildGradientStops(data.layers, colorStops);
  const probeElements = renderProbes(data.probes, data.tank_height_mm, config);
  const thermocline = opts.showThermocline ? renderThermocline(data, opts.hatchId) : null;
  const heatExchanger = data.heat_exchanger
    ? renderHeatExchanger(data.heat_exchanger, colorStops, opts.coilGradientId)
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
  colorStops: ColorStop[],
): SVGTemplateResult[] {
  const n = layers.length;
  if (n === 0) return [];
  const fallback = neutralColor(colorStops);
  const stops: SVGTemplateResult[] = [];
  for (let i = 0; i < n; i++) {
    const temp = layers[i];
    const color = Number.isFinite(temp) ? temperatureToColor(temp, colorStops) : fallback;
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

interface PipeSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface CoilGeometry {
  regionTop: number;
  regionBottom: number;
  cx: number;
  rx: number;
  ry: number;
  pitch: number;
  strokeWidth: number;
  points: CoilPoint[];
  supplyPipe: PipeSegment;
  returnPipe: PipeSegment;
  flowPath: string;
  labelX: number;
}

const PIPE_END_X = VIEW_W - 8;

function buildCoilGeometry(hx: HeatExchangerData): CoilGeometry {
  const turns = Math.max(1, Math.round(hx.turns));
  const frac = clamp(hx.height_fraction, 0.05, 1);
  const margin = 14;
  const available = TANK_H - 2 * margin;
  const regionH = Math.max(40, Math.min(available, TANK_H * frac));
  const regionTop =
    hx.position === 'top' ? TANK_TOP + margin : TANK_BOTTOM - margin - regionH;
  const regionBottom = regionTop + regionH;

  const cx = TANK_X + TANK_W / 2;
  const rx = TANK_W * 0.38;
  const ry = Math.max(6, Math.min(18, regionH / (turns * 3)));
  const pitch = (regionH - 2 * ry) / turns;
  // Coil tube thickness: scale with turn pitch so turns don't visually merge,
  // clamped so it is always clearly visible.
  const strokeWidth = clamp(pitch * 0.55, 6, 12);

  const samplesPerTurn = 64;
  const total = turns * samplesPerTurn;
  const points: CoilPoint[] = [];
  for (let i = 0; i <= total; i++) {
    const t = i / samplesPerTurn;
    const theta = 2 * Math.PI * t;
    const x = cx + rx * Math.cos(theta);
    const y = regionTop + ry + t * pitch + ry * Math.sin(theta);
    points.push({ x, y, front: Math.sin(theta) > 0 });
  }

  // When the flow is reversed, the supply enters at the opposite end of the
  // coil and the animation traces the path in reverse.
  const flowOrder = hx.reverse_flow ? points.slice().reverse() : points;
  const supplyEnd = flowOrder[0];
  const returnEnd = flowOrder[flowOrder.length - 1];
  const supplyPipe: PipeSegment = {
    x1: supplyEnd.x,
    y1: supplyEnd.y,
    x2: PIPE_END_X,
    y2: supplyEnd.y,
  };
  const returnPipe: PipeSegment = {
    x1: returnEnd.x,
    y1: returnEnd.y,
    x2: PIPE_END_X,
    y2: returnEnd.y,
  };

  // Single continuous path from supply-pipe inlet through every coil sample
  // and out through the return pipe. Used by the flow animation overlay.
  const flowPoints: { x: number; y: number }[] = [
    { x: supplyPipe.x2, y: supplyPipe.y2 },
    { x: supplyPipe.x1, y: supplyPipe.y1 },
    ...flowOrder,
    { x: returnPipe.x2, y: returnPipe.y2 },
  ];
  const flowPath = pointsToPath(flowPoints);

  return {
    regionTop,
    regionBottom,
    cx,
    rx,
    ry,
    pitch,
    strokeWidth,
    points,
    supplyPipe,
    returnPipe,
    flowPath,
    labelX: PIPE_END_X,
  };
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

function formatTemperature(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return 'n/a';
  return `${value.toFixed(1)} °C`;
}

function pipePath(p: PipeSegment): string {
  return `M${p.x1.toFixed(2)} ${p.y1.toFixed(2)} L${p.x2.toFixed(2)} ${p.y2.toFixed(2)}`;
}

function renderHeatExchanger(
  hx: HeatExchangerData,
  colorStops: ColorStop[],
  gradientId: string,
): SVGTemplateResult {
  const geom = buildCoilGeometry(hx);
  const {
    regionTop,
    regionBottom,
    points,
    strokeWidth,
    supplyPipe,
    returnPipe,
    flowPath,
    labelX,
  } = geom;
  const { front, back } = splitCoilPaths(points);

  // Darker outline sits under the fill to add depth and keep the coil
  // readable on top of the tank gradient.
  const outlineWidth = strokeWidth + 1.5;
  const backStroke = strokeWidth * 0.95;
  const backOutline = outlineWidth * 0.95;

  const supplyPipeD = pipePath(supplyPipe);
  const returnPipeD = pipePath(returnPipe);

  // Place each pipe label on the side that points away from the coil body:
  // the pipe nearer the top of the coil region gets its label above, the
  // pipe nearer the bottom gets its label below.
  const supplyAbove = supplyPipe.y1 <= returnPipe.y1;
  const supplyLabelY = supplyAbove
    ? supplyPipe.y1 - strokeWidth / 2 - 3
    : supplyPipe.y1 + strokeWidth / 2 + 10;
  const returnLabelY = supplyAbove
    ? returnPipe.y1 + strokeWidth / 2 + 10
    : returnPipe.y1 - strokeWidth / 2 - 3;

  if (!hx.enabled) {
    const frameStroke = 'var(--primary-text-color, #444)';
    return svg`
      <g class="buffer-tank-hx buffer-tank-hx--disabled" pointer-events="none">
        ${back.map(
          (d) => svg`
          <path
            d="${d}"
            fill="none"
            stroke="${frameStroke}"
            stroke-width="${backStroke}"
            stroke-linecap="round"
            stroke-dasharray="3 3"
            opacity="0.55"
          />`,
        )}
        ${front.map(
          (d) => svg`
          <path
            d="${d}"
            fill="none"
            stroke="${frameStroke}"
            stroke-width="${strokeWidth}"
            stroke-linecap="round"
            opacity="0.85"
          />`,
        )}
        <path
          d="${supplyPipeD}"
          fill="none"
          stroke="${frameStroke}"
          stroke-width="${strokeWidth}"
          stroke-linecap="round"
          opacity="0.85"
        />
        <path
          d="${returnPipeD}"
          fill="none"
          stroke="${frameStroke}"
          stroke-width="${strokeWidth}"
          stroke-linecap="round"
          opacity="0.85"
        />
      </g>
    `;
  }

  const supplyT = hx.supply_temperature;
  const returnT = hx.return_temperature;
  const mid = neutralColor(colorStops);
  const supplyColor =
    supplyT !== null && Number.isFinite(supplyT)
      ? temperatureToColor(supplyT, colorStops)
      : mid;
  const returnColor =
    returnT !== null && Number.isFinite(returnT)
      ? temperatureToColor(returnT, colorStops)
      : mid;
  const outlineColor = 'var(--primary-text-color, #222)';

  const flowOverlay = hx.flow_animation
    ? svg`
      <path
        class="buffer-tank-hx__flow"
        d="${flowPath}"
        fill="none"
        stroke="${hx.flow_color}"
        stroke-width="${Math.max(1.5, strokeWidth * 0.38)}"
        stroke-linecap="round"
        style="--btc-flow-duration: ${hx.flow_speed}s"
      />`
    : null;

  // Gradient runs top→bottom along the coil region. Under normal flow the
  // supply pipe exits at the top, so stop 0 = supplyColor. When reversed, the
  // supply exits at the bottom, so the stops swap.
  const topColor = hx.reverse_flow ? returnColor : supplyColor;
  const bottomColor = hx.reverse_flow ? supplyColor : returnColor;

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
        <stop offset="0" stop-color="${topColor}" />
        <stop offset="1" stop-color="${bottomColor}" />
      </linearGradient>
    </defs>
    <g class="buffer-tank-hx" pointer-events="none">
      ${back.map(
        (d) => svg`
        <path
          d="${d}"
          fill="none"
          stroke="${outlineColor}"
          stroke-width="${backOutline}"
          stroke-linecap="round"
          opacity="0.6"
        />`,
      )}
      ${back.map(
        (d) => svg`
        <path
          d="${d}"
          fill="none"
          stroke="url(#${gradientId})"
          stroke-width="${backStroke}"
          stroke-linecap="round"
          opacity="0.95"
        />`,
      )}
      ${front.map(
        (d) => svg`
        <path
          d="${d}"
          fill="none"
          stroke="${outlineColor}"
          stroke-width="${outlineWidth}"
          stroke-linecap="round"
          opacity="0.55"
        />`,
      )}
      ${front.map(
        (d) => svg`
        <path
          d="${d}"
          fill="none"
          stroke="url(#${gradientId})"
          stroke-width="${strokeWidth}"
          stroke-linecap="round"
          opacity="1"
        />`,
      )}
      <path
        d="${supplyPipeD}"
        fill="none"
        stroke="${outlineColor}"
        stroke-width="${outlineWidth}"
        stroke-linecap="round"
        opacity="0.55"
      />
      <path
        d="${supplyPipeD}"
        fill="none"
        stroke="${supplyColor}"
        stroke-width="${strokeWidth}"
        stroke-linecap="round"
      />
      <path
        d="${returnPipeD}"
        fill="none"
        stroke="${outlineColor}"
        stroke-width="${outlineWidth}"
        stroke-linecap="round"
        opacity="0.55"
      />
      <path
        d="${returnPipeD}"
        fill="none"
        stroke="${returnColor}"
        stroke-width="${strokeWidth}"
        stroke-linecap="round"
      />
      ${flowOverlay}
      <text
        x="${labelX}"
        y="${supplyLabelY}"
        text-anchor="end"
        font-size="9"
        font-weight="600"
        fill="var(--primary-text-color, #222)"
        paint-order="stroke"
        stroke="var(--card-background-color, #fff)"
        stroke-width="2"
      >${formatTemperature(supplyT)}</text>
      <text
        x="${labelX}"
        y="${returnLabelY}"
        text-anchor="end"
        font-size="9"
        font-weight="600"
        fill="var(--primary-text-color, #222)"
        paint-order="stroke"
        stroke="var(--card-background-color, #fff)"
        stroke-width="2"
      >${formatTemperature(returnT)}</text>
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
