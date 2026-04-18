import { LitElement, html, css, CSSResultGroup, TemplateResult, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import { handleAction, hasAction, ActionHandlerEvent } from 'custom-card-helpers';
import { actionHandler } from './action-handler';
import type { CardConfig, TankData } from './types';
import { ConfigError, validateConfig } from './config';
import { resolveTankData } from './data-source';
import { renderTank } from './svg-renderer';

const CARD_VERSION = '0.1.0';
const CARD_TAG = 'buffer-tank-card';

const globalAny = window as unknown as Record<string, unknown>;
const alreadyLoaded = globalAny.__bufferTankCardLoaded === true;
globalAny.__bufferTankCardLoaded = true;

if (!alreadyLoaded) {
  /* eslint-disable no-console */
  console.info(
    `%c buffer-tank-card %c v${CARD_VERSION} `,
    'background:#1976d2;color:#fff;padding:2px 6px;border-radius:3px 0 0 3px;font-weight:600;',
    'background:#d32f2f;color:#fff;padding:2px 6px;border-radius:0 3px 3px 0;',
  );

  const customCards = (globalAny.customCards ??= []) as Array<{
    type: string;
    name: string;
    description: string;
    preview?: boolean;
  }>;
  if (!customCards.some((c) => c.type === CARD_TAG)) {
    customCards.push({
      type: CARD_TAG,
      name: 'Buffer Tank Card',
      description: 'Visualizes a buffer/heat storage tank with a temperature gradient and probes.',
      preview: true,
    });
  }
}

let instanceCounter = 0;

export class BufferTankCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: CardConfig;
  @state() private _configError?: string;

  private readonly _gradientId = `btc-grad-${++instanceCounter}`;
  private readonly _hatchId = `btc-hatch-${instanceCounter}`;

  public static getStubConfig(): Partial<CardConfig> {
    return {
      tank_height: 2000,
      sensors: [
        { entity: 'sensor.probe_top', position: 1800 },
        { entity: 'sensor.probe_middle', position: 1000 },
        { entity: 'sensor.probe_bottom', position: 200 },
      ],
    };
  }

  public setConfig(config: unknown): void {
    try {
      this._config = validateConfig(config);
      this._configError = undefined;
    } catch (err) {
      this._config = undefined;
      this._configError = err instanceof ConfigError ? err.message : String(err);
      throw err;
    }
  }

  public getCardSize(): number {
    return 5;
  }

  protected render(): TemplateResult {
    if (this._configError || !this._config) {
      return this._renderWarning(this._configError ?? 'Invalid configuration.');
    }
    if (!this.hass) {
      return html`<ha-card><div class="empty">Loading…</div></ha-card>`;
    }

    let data: TankData;
    try {
      data = resolveTankData(this.hass, this._config);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return this._renderWarning(msg);
    }

    if (!data.available) {
      return this._renderCard(data, /*dim*/ true);
    }
    return this._renderCard(data, false);
  }

  private _renderCard(data: TankData, dim: boolean): TemplateResult {
    const config = this._config!;
    const showThermocline =
      data.mode === 'A' &&
      (config.show_thermocline ?? true) &&
      data.thermocline_position_mm !== null &&
      data.thermocline_thickness_mm !== null;

    return html`
      <ha-card
        class=${dim ? 'dimmed' : ''}
        .header=${config.name ?? nothing}
        @action=${this._handleAction}
        .actionHandler=${actionHandler({
          hasHold: hasAction(config.hold_action),
          hasDoubleClick: hasAction(config.double_tap_action),
        })}
        tabindex=${hasAction(config.tap_action) ? '0' : '-1'}
      >
        <div class="tank-wrapper">
          ${renderTank(data, config, {
            gradientId: this._gradientId,
            hatchId: this._hatchId,
            showThermocline,
          })}
          ${data.error
            ? html`<div class="overlay-error">${data.error}</div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private _renderWarning(message: string): TemplateResult {
    return html`<hui-warning>${message}</hui-warning>`;
  }

  private _handleAction = (ev: ActionHandlerEvent): void => {
    if (!this.hass || !this._config || !ev.detail?.action) return;
    handleAction(this, this.hass, this._config, ev.detail.action);
  };

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }
      ha-card {
        overflow: hidden;
        padding: 12px;
        position: relative;
      }
      ha-card.dimmed {
        opacity: 0.55;
      }
      .tank-wrapper {
        position: relative;
        width: 100%;
        max-width: 260px;
        margin: 0 auto;
      }
      .buffer-tank-svg {
        width: 100%;
        height: auto;
        display: block;
      }
      .overlay-error {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 4px;
        text-align: center;
        font-size: 12px;
        color: var(--error-color, #d32f2f);
        background: var(--card-background-color, rgba(255, 255, 255, 0.9));
        padding: 2px 6px;
        border-radius: 4px;
      }
      .empty {
        padding: 16px;
        text-align: center;
        color: var(--secondary-text-color, #666);
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'buffer-tank-card': BufferTankCard;
  }
}

if (!customElements.get(CARD_TAG)) {
  try {
    customElements.define(CARD_TAG, BufferTankCard);
  } catch (err) {
    if (!(err instanceof DOMException && err.name === 'NotSupportedError')) {
      throw err;
    }
  }
}
