import { noChange } from 'lit';
import { AttributePart, directive, Directive, DirectiveParameters } from 'lit/directive.js';
import { fireEvent } from 'custom-card-helpers';

interface ActionHandlerOptions {
  hasHold?: boolean;
  hasDoubleClick?: boolean;
}

interface ActionHandlerElement extends HTMLElement {
  actionHandler?: {
    options: ActionHandlerOptions;
    start?: (ev: Event) => void;
    end?: (ev: Event) => void;
  };
}

class ActionHandler extends HTMLElement {
  public holdTime = 500;
  public ripple?: HTMLElement;
  protected timer?: number;
  protected held = false;
  private dblClickTimeout?: number;

  public bind(element: ActionHandlerElement, options: ActionHandlerOptions = {}): void {
    if (element.actionHandler && JSON.stringify(element.actionHandler.options) === JSON.stringify(options)) {
      return;
    }
    if (element.actionHandler) {
      element.removeEventListener('touchstart', element.actionHandler.start!);
      element.removeEventListener('touchend', element.actionHandler.end!);
      element.removeEventListener('touchcancel', element.actionHandler.end!);
      element.removeEventListener('mousedown', element.actionHandler.start!);
      element.removeEventListener('click', element.actionHandler.end!);
      element.removeEventListener('keyup', element.actionHandler.end!);
    }
    element.actionHandler = { options };

    element.actionHandler.start = (ev: Event): void => {
      this.held = false;
      if (options.hasHold) {
        this.timer = window.setTimeout(() => {
          this.held = true;
        }, this.holdTime);
      }
      ev.stopPropagation();
    };

    element.actionHandler.end = (ev: Event): void => {
      if (['touchend', 'touchcancel'].includes(ev.type) && this.timer === undefined) return;
      window.clearTimeout(this.timer);
      this.timer = undefined;
      if (this.held) {
        fireEvent(element, 'action', { action: 'hold' });
      } else if (options.hasDoubleClick) {
        if ((ev.type === 'click' && (ev as MouseEvent).detail < 2) || !this.dblClickTimeout) {
          this.dblClickTimeout = window.setTimeout(() => {
            this.dblClickTimeout = undefined;
            fireEvent(element, 'action', { action: 'tap' });
          }, 250);
        } else {
          window.clearTimeout(this.dblClickTimeout);
          this.dblClickTimeout = undefined;
          fireEvent(element, 'action', { action: 'double_tap' });
        }
      } else {
        fireEvent(element, 'action', { action: 'tap' });
      }
    };

    const handleEnter = (ev: KeyboardEvent): void => {
      if (ev.key !== 'Enter' && ev.key !== ' ') return;
      element.actionHandler?.end?.(ev);
    };

    element.addEventListener('touchstart', element.actionHandler.start, { passive: true });
    element.addEventListener('touchend', element.actionHandler.end);
    element.addEventListener('touchcancel', element.actionHandler.end);
    element.addEventListener('mousedown', element.actionHandler.start, { passive: true });
    element.addEventListener('click', element.actionHandler.end);
    element.addEventListener('keyup', handleEnter);
  }
}

if (!customElements.get('buffer-tank-action-handler')) {
  try {
    customElements.define('buffer-tank-action-handler', ActionHandler);
  } catch (err) {
    const msg = (err as { message?: string } | null)?.message ?? '';
    const isAlreadyDefined =
      (err instanceof DOMException && err.name === 'NotSupportedError') ||
      /already been used|already been defined|already defined/i.test(msg);
    if (!isAlreadyDefined) throw err;
  }
}

const getActionHandler = (): ActionHandler => {
  const body = document.body;
  let handler = body.querySelector<ActionHandler>('buffer-tank-action-handler');
  if (!handler) {
    handler = document.createElement('buffer-tank-action-handler') as ActionHandler;
    body.appendChild(handler);
  }
  return handler;
};

export const actionHandlerBind = (
  element: ActionHandlerElement,
  options: ActionHandlerOptions,
): void => {
  const handler = getActionHandler();
  handler.bind(element, options);
};

class ActionHandlerDirective extends Directive {
  render(_options: ActionHandlerOptions = {}): typeof noChange {
    return noChange;
  }
  update(part: AttributePart, [options]: DirectiveParameters<this>): typeof noChange {
    actionHandlerBind(part.element as ActionHandlerElement, options ?? {});
    return noChange;
  }
}

export const actionHandler = directive(ActionHandlerDirective);
